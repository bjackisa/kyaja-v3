"use client"

import { createCategory, deleteCategory, getActiveCategories, getAllCategories, getAllSubCategoriesForCat, getCategoriesExcept, getCategoriesExceptDepartment, getCategoryById, getCategoryBySlug, getDepartmentsWithCategories, ICategory, ICreateCategory, IUpdateCategory, updateCategory } from "@/actions/category";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type ActiveCategory={
  id:string,
  title:string,
  imageUrl: string,
  slug: string,
}
// Fetch all categories
export const useFetchCategories = () => {
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await getAllCategories();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
  });

  return {
    categories: categoriesQuery.data || [],
    isLoading: categoriesQuery.isPending,
    error: categoriesQuery.error,
    refetch: categoriesQuery.refetch,
  };
};
export const useFetchCategoriesForCat = () => {
  const categoriesQuery = useQuery({
    queryKey: ['categories-sub'],
    queryFn: async () => {
      const response = await getAllSubCategoriesForCat();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
  });

  return {
    categories: categoriesQuery.data || [],
    isLoading: categoriesQuery.isPending,
    error: categoriesQuery.error,
    refetch: categoriesQuery.refetch,
  };
};

// Fetch a single category
export const useFetchCategory = (categoryId: string) => {
  const categoryQuery = useQuery({
    queryKey: ['categories', categoryId],
    queryFn: async () => {
      const response = await getCategoryById(categoryId);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    enabled: !!categoryId,
  });

  return {
    category: categoryQuery.data,
    isLoading: categoryQuery.isPending,
    error: categoryQuery.error,
  };
};

// Delete a category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteCategory(id);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    onSuccess: (deletedCategory) => {
      if (deletedCategory) {
        queryClient.setQueryData(['categories'], (oldData: ICategory[] = []) =>
          oldData.filter((cat) => cat.id !== deletedCategory.id)
        );
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        toast('Category deleted successfully');
      }
    },
    onError: (error: Error) => {
      toast(error.message || 'An error occurred while deleting the category');
    },
  });

  return {
    deleteCategory: deleteCategoryMutation.mutate,
    isDeleting: deleteCategoryMutation.isPending,
    error: deleteCategoryMutation.error,
  };
};

// Create a category
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation({
    mutationFn: async (category: ICreateCategory) => {
      const response = await createCategory(category);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    onSuccess: (newCategory) => {
      if (newCategory) {

        queryClient.setQueryData(['categories'], (oldData: ICategory[] = []) => [
          ...oldData,
          newCategory,
        ]);
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        toast('Category created successfully');
      }
    },
    onError: (error: Error) => {
      toast(error.message || 'An error occurred while creating the category');
    },
  });

  return {
    createCategory: createCategoryMutation.mutate,
    isCreating: createCategoryMutation.isPending,
    error: createCategoryMutation.error,
  };
};

// Update a category
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  const updateCategoryMutation = useMutation({
    mutationFn: async ({ id, category }: { id: string; category: IUpdateCategory }) => {
      const response = await updateCategory(id, category);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    onMutate: async ({ id, category }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['categories'] });

      // Snapshot the previous value
      const previousCategories = queryClient.getQueryData<ICategory[]>(['categories']);

      // Optimistically update the cache
      if (previousCategories) {
        queryClient.setQueryData<ICategory[]>(['categories'], old => {
          if (!old) return [];
          return old.map(cat => {
            if (cat.id === id) {
              return {
                ...cat,
                ...category,
                id: cat.id,
                createdAt: cat.createdAt,
                updatedAt: new Date().toISOString(),
              };
            }
            return cat;
          });
        });

        // Also update individual category cache if it exists
        queryClient.setQueryData(['categories', id], old => {
          if (!old) return null;
          return {
            ...old  as any,
            ...category,
            updatedAt: new Date().toISOString(),
          };
        });
      }

      // Return context with the previous categories
      return { previousCategories };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, revert back to the previous value
      if (context?.previousCategories) {
        queryClient.setQueryData(['categories'], context.previousCategories);
      }
      toast(err.message || 'Failed to update category');
    },
    onSuccess: (updatedCategory, { id }) => {
      // Update the individual category cache with the server response
      queryClient.setQueryData(['categories', id], updatedCategory);
      
      // Update the categories list with the server response
      queryClient.setQueryData<ICategory[]>(['categories'], old => {
        if (!old) return [updatedCategory];
        return old.map(cat => cat.id === id ? updatedCategory : cat);
      });
      
      toast('Category updated successfully');
    },
    onSettled: () => {
      // Always refetch after error or success to ensure cache consistency
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    }
  });

  return {
    updateCategory: updateCategoryMutation.mutate,
    isUpdating: updateCategoryMutation.isPending,
    error: updateCategoryMutation.error,
  };
};

export const useDepartmentCategories = () => {
  return useInfiniteQuery({
    queryKey: ['departments-with-categories'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getDepartmentsWithCategories(pageParam);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    getNextPageParam: (lastPage, pages) => {
      // If no more departments, return undefined
      return lastPage.length > 0 ? pages.length : undefined;
    },
    initialPageParam: 0,
  });
};

export const useCategoryDetails = (slug: string) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => getCategoryBySlug(slug),
    enabled: !!slug,
  });
};
export const useOtherCategories = (currentDepartmentSlug: string) => {
  return useQuery({
    queryKey: ['categories', 'other', currentDepartmentSlug],
    queryFn: () => getCategoriesExceptDepartment(currentDepartmentSlug),
    enabled: !!currentDepartmentSlug,
  });
};
export const useOtherCategoriesExceptCurrentCat = (currentDepartmentSlug: string) => {
  return useQuery({
    queryKey: ['categories', 'other', currentDepartmentSlug],
    queryFn: () => getCategoriesExcept(currentDepartmentSlug),
    enabled: !!currentDepartmentSlug,
  });
};

export const useCategories = () => {
  return useQuery<ActiveCategory[]>({
    queryKey: ['active-categories'],
    queryFn: () => getActiveCategories(),
  });
};