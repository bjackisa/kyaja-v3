"use client"

import { getTopDealsProducts } from "@/actions/banner";
import { createProduct, deleteProduct, getAllProducts, getProductById, IProduct, ICreateProduct, updateProduct, getCategoryProducts, getPaginatedSubProducts } from "@/actions/product-server";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPaginatedProducts } from '@/actions/product-server';
import { getProductDetail, getSimilarProducts } from "@/actions/product-detail";

// Fetch all products
export const useFetchProducts = () => {
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await getAllProducts();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
  });

  return {
    products: productsQuery.data || [],
    isLoading: productsQuery.isPending,
    error: productsQuery.error,
    refetch: productsQuery.refetch,
  };
};

// Fetch a single product
export const useFetchProduct = (productId: string) => {
  const productQuery = useQuery({
    queryKey: ['products', productId],
    queryFn: async () => {
      const response = await getProductById(productId);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    enabled: !!productId,
  });

  return {
    product: productQuery.data,
    isLoading: productQuery.isPending,
    error: productQuery.error,
  };
};

// Delete a product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteProduct(id);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    onSuccess: (deletedProduct) => {
      if (deletedProduct) {
        queryClient.setQueryData(['products'], (oldData: IProduct[] = []) =>
          oldData.filter((prod) => prod.id !== deletedProduct.id)
        );
        queryClient.invalidateQueries({ queryKey: ['products'] });
        toast.success('Product deleted successfully');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'An error occurred while deleting the product');
    },
  });

  return {
    deleteProduct: deleteProductMutation.mutate,
    isDeleting: deleteProductMutation.isPending,
    error: deleteProductMutation.error,
  };
};

// Create a product with optimistic update
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: async (product: ICreateProduct) => {
      const response = await createProduct(product);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    onMutate: async (newProduct) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });

      const previousProducts = queryClient.getQueryData<IProduct[]>(['products']);
      queryClient.invalidateQueries({ queryKey: ['products'] });

      return { previousProducts };
    },
    onError: (err, newProduct, context) => {
      queryClient.setQueryData(['products'], context?.previousProducts);
      toast.error(err.message || 'Failed to create product');
    },
    onSuccess: (newProduct) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
    },
  });

  return {
    createProduct: createProductMutation.mutate,
    isCreating: createProductMutation.isPending,
    error: createProductMutation.error,
  };
};

// Update a product with optimistic update
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, product }: any) => {
      const response = await updateProduct(id, product);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    onMutate: async ({ id, product }) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ['products'] });
      
      // Snapshot the previous value
      const previousProducts = queryClient.getQueryData<any[]>(['products']);

      // Perform optimistic update
      queryClient.setQueryData<any[]>(['products'], old => {
        if (!old) return [];
        return old.map(prod => {
          if (prod.id === id) {
            return {
              ...prod,
              ...product,
              // Handle relations properly in the optimistic update
              category: product.categoryId 
                ? { id: product.categoryId } 
                : prod.category,
              subCategory: product.subCategoryId 
                ? { id: product.subCategoryId }
                : prod.subCategory,
              department: product.departmentId 
                ? { id: product.departmentId }
                : prod.department,
              updatedAt: new Date(),
            };
          }
          return prod;
        });
      });

      // Also update the individual product cache if it exists
      const previousProduct = queryClient.getQueryData<any>(['product', id]);
      if (previousProduct) {
        queryClient.setQueryData(['product', id], {
          ...previousProduct,
          ...product,
          // Handle relations
          category: product.categoryId 
            ? { id: product.categoryId }
            : previousProduct.category,
          subCategory: product.subCategoryId 
            ? { id: product.subCategoryId }
            : previousProduct.subCategory,
          department: product.departmentId 
            ? { id: product.departmentId }
            : previousProduct.department,
          updatedAt: new Date(),
        });
      }

      return { previousProducts, previousProduct };
    },
    onError: (err, variables, context) => {
      // Revert the optimistic update
      if (context?.previousProducts) {
        queryClient.setQueryData(['products'], context.previousProducts);
      }
      if (context?.previousProduct) {
        queryClient.setQueryData(['product', variables.id], context.previousProduct);
      }
      toast.error(err.message || 'Failed to update product');
    },
    onSuccess: (updatedProduct, variables) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
      toast.success('Product updated successfully');
    },
  });

  return {
    updateProduct: updateProductMutation.mutate,
    isUpdating: updateProductMutation.isPending,
    error: updateProductMutation.error,
  };
};


export const useTopDealsProducts = () => {
  const topDealsQuery = useQuery({
    queryKey: ['topDeals'],
    queryFn: async () => {
      const response = await getTopDealsProducts();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: false // Prevent unnecessary refetches
  });

  return {
    topDeals: topDealsQuery.data || [],
    isLoadingTopDeals: topDealsQuery.isPending,
    error: topDealsQuery.error,
    refetch: topDealsQuery.refetch
  };
};



export function useInfiniteProducts(departmentSlug: string) {
  return useInfiniteQuery({
    queryKey: ['products', departmentSlug],
    queryFn: async ({ pageParam }) => {
      return getPaginatedProducts(departmentSlug, pageParam);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 1000 * 60 * 5,
  });
}
export function useInfiniteSubProducts(departmentSlug: string) {
  return useInfiniteQuery({
    queryKey: ['sub-products', departmentSlug],
    queryFn: async ({ pageParam }) => {
      return getPaginatedSubProducts(departmentSlug, pageParam);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 1000 * 60 * 5,
  });
}
export function useInfiniteCategoryProducts(categorySlug: string) {
  return useInfiniteQuery({
    queryKey: ['category-products', categorySlug],
    queryFn: async ({ pageParam }) => {
      return getCategoryProducts(categorySlug, pageParam);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 1000 * 60 * 5,
    retry: 3, // Add retry attempts
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export const productKeys = {
  all: ['products'] as const,
  detail: (slug: string) => [...productKeys.all, 'detail', slug] as const,
  similar: (subCategoryId: string) => [...productKeys.all, 'similar', subCategoryId] as const,
};

export function useProductQuery(slug: string) {
  return useQuery({
    queryKey: productKeys.detail(slug),
    queryFn: () => getProductDetail(slug),
    staleTime: 1000 * 60 * 5, 
    retry: 1,
  });
}

export function useSimilarProductsQuery(subCategoryId: string, currentProductId: string) {
  return useQuery({
    queryKey: productKeys.similar(subCategoryId),
    queryFn: () => getSimilarProducts(subCategoryId, currentProductId),
    staleTime: 1000 * 60 * 5,
    enabled: !!subCategoryId && !!currentProductId, 
    retry: 1,
  });
}