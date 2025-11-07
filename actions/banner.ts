"use server";

import db from "@/lib/db";

export interface CreateBannerData {
  title?: string;
  link?: string;
  imageUrl?: string;
  previewImageUrl?: string;
  isActive: boolean;
  productIds?: string[];
}

interface UpdateBannerData extends Partial<CreateBannerData> {}

interface ServerResponse<T> {
  data?: T;
  error?: string;
}

export interface ITopDealsProduct {
  imageUrl: string;
  productPrice: number;
  slug: string;
}

export interface ITopDealsResponse {
  error?: string;
  data: ITopDealsProduct[];
}
// Create a new banner
export async function createBanner(data: CreateBannerData): Promise<any> {
  try {
    const banner = await db.banner.create({
      data: {
        title: data.title,
        link: data.link,
        imageUrl:
          data.imageUrl ||
          "https://utfs.io/f/aa568418-002c-40a1-b13f-a0fd7eef1353-9w6i5v.svg",
        previewImageUrl: data.previewImageUrl,
        isActive: data.isActive,
        productIds: data.productIds || [],
      },
    });

    return { data: banner };
  } catch (error) {
    console.error("Failed to create banner:", error);
    return { error: "Failed to create banner" };
  }
}

// Get a banner by ID
export async function getBannerById(id: string): Promise<ServerResponse<any>> {
  try {
    const banner = await db.banner.findUnique({
      where: { id },
    });

    if (!banner) {
      return { error: "Banner not found" };
    }

    return { data: banner };
  } catch (error) {
    console.error("Failed to get banner:", error);
    return { error: "Failed to get banner" };
  }
}

// Update a banner
export async function updateBanner(
  id: string,
  data: UpdateBannerData
): Promise<ServerResponse<any>> {
  try {
    const banner = await db.banner.update({
      where: { id },
      data: {
        title: data.title,
        link: data.link,
        imageUrl: data.imageUrl,
        previewImageUrl: data.previewImageUrl,
        isActive: data.isActive,
        productIds: data.productIds,
      },
    });

    return { data: banner };
  } catch (error) {
    console.error("Failed to update banner:", error);
    return { error: "Failed to update banner" };
  }
}

// Delete a banner
export async function deleteBanner(id: string): Promise<ServerResponse<any>> {
  try {
    const banner = await db.banner.delete({
      where: { id },
    });

    return { data: banner };
  } catch (error) {
    console.error("Failed to delete banner:", error);
    return { error: "Failed to delete banner" };
  }
}

// Get all banners
export async function getAllBanners(): Promise<any> {
  try {
    const banners = await db.banner.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return { data: banners };
  } catch (error) {
    console.error("Failed to get banners:", error);
    return { error: "Failed to get banners" };
  }
}

// Get all banners
export async function getHomeBanners(): Promise<any> {
  try {
    const banners = await db.banner.findMany({
      where: {
        isActive: true, // Only fetch active banners
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        imageUrl: true,
      },
    });

    return { data: banners };
  } catch (error) {
    console.error("Failed to get banners:", error);
    return { error: "Failed to get banners" };
  }
}

export async function getBannerProducts(bannerId: string) {
  try {
    const banner = await db.banner.findUnique({
      where: { id: bannerId },
    });

    if (!banner) {
      throw new Error("Banner not found");
    }

    const products = await db.product.findMany({
      where: {
        id: {
          in: banner.productIds,
        },
      },
    });

    return { banner, products };
  } catch (error) {
    console.error("Failed to get banner products:", error);
    return { banner: null, products: [] };
  }
}

export const getTopDealsProducts = async (): Promise<ITopDealsResponse> => {
  try {
    const products = await db.product.findMany({
      where: {
        type: "flash",
        isActive: true,
      },
      select: {
        imageUrl: true,
        productPrice: true,
        slug: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 12,
    });

    return {
      data: products.map((product) => ({
        ...product,
        imageUrl:
          product.imageUrl ||
          "https://utfs.io/f/aa568418-002c-40a1-b13f-a0fd7eef1353-9w6i5v.svg",
      })),
    };
  } catch (error) {
    console.error("Failed to fetch top deals products:", error);
    return {
      error: "Failed to fetch top deals products",
      data: [],
    };
  }
};
