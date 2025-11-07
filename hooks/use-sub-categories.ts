"use client"

import { createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategoryById, ISubCategory, ICreateSubCategory, IUpdateSubCategory, updateSubCategory } from "@/actions/sub-categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Fetch all subcategories
export const useFetchSubCategories = () => {
  const subCategoriesQuery = useQuery({
    queryKey: ['subcategories'],
    queryFn: async () => {
      const response = await getAllSubCategories();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
  });

  return {
    subcategories: subCategoriesQuery.data || [],
    isLoading: subCategoriesQuery.isPending,
    error: subCategoriesQuery.error,
    refetch: subCategoriesQuery.refetch,
  };
};

// Fetch a single subcategory
export const useFetchSubCategory = (subcategoryId: string) => {
  const subcategoryQuery = useQuery({
    queryKey: ['subcategories', subcategoryId],
    queryFn: async () => {
      const response = await getSubCategoryById(subcategoryId);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    enabled: !!subcategoryId,
  });

  return {
    subcategory: subcategoryQuery.data,
    isLoading: subcategoryQuery.isPending,
    error: subcategoryQuery.error,
  };
};

// Delete a subcategory
export const useDeleteSubCategory = () => {
  const queryClient = useQueryClient();

  const deleteSubCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteSubCategory(id);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    onSuccess: (deletedSubCategory) => {
      if (deletedSubCategory) {
        queryClient.setQueryData(['subcategories'], (oldData: ISubCategory[] = []) =>
          oldData.filter((subcat) => subcat.id !== deletedSubCategory.id)
        );
        queryClient.invalidateQueries({ queryKey: ['subcategories'] });
        toast('Subcategory deleted successfully');
      }
    },
    onError: (error: Error) => {
      toast(error.message || 'An error occurred while deleting the subcategory');
    },
  });

  return {
    deleteSubCategory: deleteSubCategoryMutation.mutate,
    isDeleting: deleteSubCategoryMutation.isPending,
    error: deleteSubCategoryMutation.error,
  };
};

// Create a subcategory
export const useCreateSubCategory = () => {
  const queryClient = useQueryClient();

  const createSubCategoryMutation = useMutation({
    mutationFn: async (subcategory: ICreateSubCategory) => {
      const response = await createSubCategory(subcategory);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    onMutate: async (newSubCategory) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['subcategories'] });

      // Snapshot the previous value
      const previousSubCategories = queryClient.getQueryData<ISubCategory[]>(['subcategories']);

      // Optimistically update to the new value
      queryClient.setQueryData<ISubCategory[]>(['subcategories'], old => {
        const optimisticSubCategory = {
          ...newSubCategory,
          id: 'temp-id-' + Date.now(),
          createdAt: new Date(),
          updatedAt: new Date(),
          imageUrl: newSubCategory.imageUrl || "https://utfs.io/f/aa568418-002c-40a1-b13f-a0fd7eef1353-9w6i5v.svg",
        } as ISubCategory;
        return [...(old || []), optimisticSubCategory];
      });

      return { previousSubCategories };
    },
    onError: (err, newSubCategory, context) => {
      // If the mutation fails, revert back to the previous value
      if (context?.previousSubCategories) {
        queryClient.setQueryData(['subcategories'], context.previousSubCategories);
      }
      toast(err.message || 'Failed to create subcategory');
    },
    onSuccess: (newSubCategory) => {
      queryClient.invalidateQueries({ queryKey: ['subcategories'] });
      toast('Subcategory created successfully');
    },
  });

  return {
    createSubCategory: createSubCategoryMutation.mutate,
    isCreating: createSubCategoryMutation.isPending,
    error: createSubCategoryMutation.error,
  };
};

// Update a subcategory
export const useUpdateSubCategory = () => {
  const queryClient = useQueryClient();

  const updateSubCategoryMutation = useMutation({
    mutationFn: async ({ id, subcategory }: { id: string; subcategory: IUpdateSubCategory }) => {
      const response = await updateSubCategory(id, subcategory);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    onMutate: async ({ id, subcategory }) => {
      await queryClient.cancelQueries({ queryKey: ['subcategories'] });
      const previousSubCategories = queryClient.getQueryData<ISubCategory[]>(['subcategories']);

      queryClient.setQueryData<ISubCategory[]>(['subcategories'], old => {
        if (!old) return [];
        return old.map(subcat => {
          if (subcat.id === id) {
            return {
              ...subcat,
              ...subcategory,
              updatedAt: new Date(),
            };
          }
          return subcat;
        });
      });

      return { previousSubCategories };
    },
    onError: (err, variables, context) => {
      if (context?.previousSubCategories) {
        queryClient.setQueryData(['subcategories'], context.previousSubCategories);
      }
      toast(err.message || 'Failed to update subcategory');
    },
    onSuccess: (updatedSubCategory) => {
      queryClient.invalidateQueries({ queryKey: ['subcategories'] });
      toast('Subcategory updated successfully');
    },
  });

  return {
    updateSubCategory: updateSubCategoryMutation.mutate,
    isUpdating: updateSubCategoryMutation.isPending,
    error: updateSubCategoryMutation.error,
  };
};