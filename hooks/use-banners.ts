"use client"

import { createBanner, deleteBanner, getAllBanners, getHomeBanners, updateBanner } from "@/actions/banner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Banner {
  id: string;
  title?: string;
  link?: string;
  imageUrl: string;
  previewImageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  productIds: string[];
}
export interface Banner2 {
  id: string;
  imageUrl: string;
  link: string;
}
interface CreateBannerData {
  title?: string;
  link?: string;
  imageUrl?: string;
  previewImageUrl?: string;
  isActive: boolean;
  productIds?: string[];
}

interface UpdateBannerData extends Partial<CreateBannerData> {}

// Server action types
interface ServerResponse<T> {
  data?: T;
  error?: string;
}

// Fetch banner products
export const useFetchBannerProducts = () => {
  const bannerQuery = useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      const response = await getAllBanners();
      if (!response) {
        throw new Error("Banners not found");
      }
      return response.data;
    },
  });

  return {
    banners: bannerQuery.data,
    isLoading: bannerQuery.isPending,
    error: bannerQuery.error,
  };
};

// Delete a banner
export const useDeleteBanner = () => {
  const queryClient = useQueryClient();

  const deleteBannerMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteBanner(id);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    onSuccess: (deletedBanner) => {
      queryClient.setQueryData(['banners'], (oldData: Banner[] = []) =>
        oldData.filter((banner) => banner.id !== deletedBanner.id)
      );
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      toast('Banner deleted successfully');
    },
    onError: (error: Error) => {
      toast(error.message || 'Failed to delete banner');
    },
  });

  return {
    deleteBanner: deleteBannerMutation.mutate,
    isDeleting: deleteBannerMutation.isPending,
    error: deleteBannerMutation.error,
  };
};

// Create a banner
export const useCreateBanner = () => {
  const queryClient = useQueryClient();

  const createBannerMutation = useMutation({
    mutationFn: async (data: CreateBannerData) => {
      const response = await createBanner(data);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    onSuccess: (newBanner) => {
      queryClient.setQueryData(['banners'], (oldData: Banner[] = []) => [
        ...oldData,
        newBanner,
      ]);
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      toast('Banner created successfully');
    },
    onError: (error: Error) => {
      toast(error.message || 'Failed to create banner');
    },
  });

  return {
    createBanner: createBannerMutation.mutate,
    isCreating: createBannerMutation.isPending,
    error: createBannerMutation.error,
  };
};

// Update a banner
export const useUpdateBanner = () => {
  const queryClient = useQueryClient();

  const updateBannerMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateBannerData }) => {
      const response = await updateBanner(id, data);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ['banners'] });
      
      const previousBanners = queryClient.getQueryData<Banner[]>(['banners']);

      if (previousBanners) {
        queryClient.setQueryData<Banner[]>(['banners'], old => {
          if (!old) return [];
          return old.map(banner => {
            if (banner.id === id) {
              return {
                ...banner,
                ...data,
                updatedAt: new Date().toISOString(),
              };
            }
            return banner;
          });
        });
      }

      return { previousBanners };
    },
    onError: (err, variables, context) => {
      if (context?.previousBanners) {
        queryClient.setQueryData(['banners'], context.previousBanners);
      }
      toast(err.message || 'Failed to update banner');
    },
    onSuccess: (updatedBanner, { id }) => {
      queryClient.setQueryData(['banners', id], updatedBanner);
      
      queryClient.setQueryData<Banner[]>(['banners'], old => {
        if (!old) return [updatedBanner];
        return old.map(banner => banner.id === id ? updatedBanner : banner);
      });
      
      toast('Banner updated successfully');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
    }
  });

  return {
    updateBanner: updateBannerMutation.mutate,
    isUpdating: updateBannerMutation.isPending,
    error: updateBannerMutation.error,
  };
};

export const useHomeBanners = () => {
  const bannerQuery = useQuery({
    queryKey: ['home-banners'],
    queryFn: async () => {
      const response = await getHomeBanners();
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as Banner[];
    },
  });

  return {
    banners: bannerQuery.data,
    isLoadingHomeBanner: bannerQuery.isPending,
    error: bannerQuery.error,
    refetch: bannerQuery.refetch
  };
};