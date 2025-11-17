"use server";

import db from "@/lib/db";
import { cache } from "react";

export interface IProductDetail {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  productImages: string[];
  description: string | null;
  isActive: boolean;
  isWholesale: boolean;
  sku: string | null;
  barcode: string | null;
  productCode: string | null;
  unit: string | null;
  productPrice: number;
  salePrice: number;
  wholesalePrice: number | null;
  wholesaleQty: number | null;
  productStock: number | null;
  qty: number | null;
  tags: string[];
  categoryId: string | null;
  subCategoryId: string | null;
  departmentId: string;
  type: string | null;
  createdAt: Date;
  subCategory: { title: string };
}

export interface ISimilarProduct {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  productPrice: number;
  salePrice: number;
}

export interface IProductDetailResponse {
  product: IProductDetail | null;
  similarProducts: ISimilarProduct[];
  error?: string;
}



export const getSimilarProducts = cache(async (subCategoryId: string, currentProductId: string) => {
  try {
    const products = await db.product.findMany({
      where: {
        categoryId:subCategoryId, 
        id: { not: currentProductId }, 
        isActive: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        productPrice: true,
        salePrice: true,
        productStock: true,
        isDiscount:true,
        discount:true
      },
      take: 5, 
      orderBy: { createdAt: 'desc' },
    });

    return products;
  } catch (error) {
    console.error('Failed to fetch similar products:', error);
    throw new Error('Failed to fetch similar products');
  }
});



export const getProductDetail = cache(async (slug: string) => {
  try {
    const product = await db.product.findUnique({
      where: { 
        slug,
        isActive: true 
      },
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        productImages: true,
        description: true,
        productPrice: true,
        salePrice: true,
        productStock: true,
        isDiscount: true,
        discount: true,
        salesCount: true,
        averageRating: true,
        department: {
          select: {
            id: true,
            title: true,
            slug: true,
          }
        },
        category: {
          select: {
            id: true,
            title: true,
            slug: true,
          }
        },
        subCategory: {
          select: {
            id: true,
            title: true,
            slug: true,
          }
        },
        categoryId: true,
        subCategoryId: true,
        departmentId: true,
      }
    });

    return product;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw new Error('Failed to fetch product');
  }
});