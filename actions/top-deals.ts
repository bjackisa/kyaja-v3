"use server";

import db from "@/lib/db";

export interface TopDealsProduct {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  productPrice: number;
  salePrice: number;
  tags: string[];
  productStock: number;
  isDiscount: boolean;
  discount?: number;
}

export interface TopDealsResponse {
  data: TopDealsProduct[];
  nextCursor?: string | null;
  hasMore: boolean;
}

export async function getTopDeals(
  cursor?: string | null,
  limit: number = 10
): Promise<TopDealsResponse> {
  try {
    const products = await db.product.findMany({
      where: {
        isActive: true,
        type: "topdeals",
        productStock: {
          gt: 0,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit + 1, // Take one extra to determine if there are more
      skip: cursor ? 1 : 0, // Skip the cursor item
      cursor: cursor ? { id: cursor } : undefined,
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        productPrice: true,
        salePrice: true,
        tags: true,
        productStock: true,
        isDiscount: true,
        discount: true,
      },
    });

    const hasMore = products.length > limit;
    const data = hasMore ? products.slice(0, -1) : products;
    const nextCursor = hasMore ? data[data.length - 1]?.id : null;

    return {
      data: data as TopDealsProduct[],
      nextCursor,
      hasMore,
    };
  } catch (error) {
    console.error("Error fetching top deals:", error);
    return {
      data: [],
      nextCursor: null,
      hasMore: false,
    };
  }
}
