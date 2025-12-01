"use server";
import { FALLBACK_IMAGE_URL } from "@/lib/constants";
import db from "@/lib/db";

export interface IProduct {
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
  isDiscount: boolean;
  tags: string[];
  categoryId: string | null;
  subCategoryId: string | null;
  departmentId: string;
  type: string | null;
  createdAt: Date;
}
export interface IProduct2 {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  productPrice: number;
  salePrice: number;
  wholesalePrice: number | null;
  wholesaleQty: number | null;
  productStock: number | null;
  qty: number | null;
  createdAt: Date;
  category?: string;
}
export interface Product {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  productPrice: number;
  salePrice: number;
  category?: string;
  productStock?: number;
  isDiscount?: boolean;
  discount?: number;
}

export interface PaginatedProductsResponse {
  products: Product[];
  nextCursor: string | null;
  hasMore: boolean;
}
// Type for creating a new product
export interface ICreateProduct {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  productImages?: string[];
  description?: string;
  isActive?: boolean;
  isWholesale: boolean;
  productPrice: number;
  salePrice: number;
  wholesalePrice?: number;
  wholesaleQty?: number;
  productStock?: number;
  qty?: number;
  tags?: string[];
  categoryId?: string;
  subCategoryId?: string;
  departmentId: string;
  type?: string;
  unit?: string;
  productCode?: string;
  isDiscount: boolean;
  discount: number;
}

// Type for updating a product
export interface IUpdateProduct extends Partial<ICreateProduct> {}

// Response types
export interface IProductResponse {
  error?: string;
  data: IProduct2 | null;
}
export interface IProductResponse2 {
  error?: string;
  data: IProduct | null;
}

export interface IProductsResponse {
  error?: string;
  data: IProduct2[];
}

// Fetch all products
export const getAllProducts = async (): Promise<IProductsResponse> => {
  try {
    const products = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: {
          select: {
            title: true,
          },
        },
      },
    });

    return {
      data: products.map((product) => ({
        id: product.id,
        title: product.title,
        slug: product.slug,
        imageUrl: product.imageUrl || FALLBACK_IMAGE_URL,
        productPrice: product.productPrice,
        salePrice: product.salePrice,
        wholesalePrice: product.wholesalePrice || null,
        wholesaleQty: product.wholesaleQty || null,
        productStock: product.productStock || null,
        qty: product.qty || null,
        createdAt: product.createdAt,
        category: product.category?.title || null,
      })),
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return {
      error: "Failed to fetch products",
      data: [],
    };
  }
};

// Fetch a single product by ID
export const getProductById = async (
  id: string
): Promise<IProductResponse2> => {
  try {
    const product = await db.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) return { data: null };

    return {
      data: {
        ...product,
        imageUrl: product.imageUrl || FALLBACK_IMAGE_URL,
        wholesalePrice: product.wholesalePrice || null,
        wholesaleQty: product.wholesaleQty || null,
        productStock: product.productStock || null,
        qty: product.qty || null,
      },
    };
  } catch (error) {
    return {
      error: "Failed to fetch product",
      data: null,
    };
  }
};

// Delete a product
export const deleteProduct = async (id: string): Promise<IProductResponse> => {
  try {
    const product = await db.product.delete({
      where: { id },
    });

    return {
      data: {
        ...product,
        imageUrl: product.imageUrl || FALLBACK_IMAGE_URL,
        wholesalePrice: product.wholesalePrice || null,
        wholesaleQty: product.wholesaleQty || null,
        productStock: product.productStock || null,
        qty: product.qty || null,
      },
    };
  } catch (error) {
    return {
      error: "Failed to delete product",
      data: null,
    };
  }
};

// Create a product
export const createProduct = async (
  product: ICreateProduct
): Promise<IProductResponse> => {
  try {
    if (!product.title || !product.slug) {
      throw new Error("Title and slug are required to create a product.");
    }

    const newProduct = await db.product.create({
      data: {
        title: product.title,
        slug: product.slug,
        imageUrl: product.imageUrl || FALLBACK_IMAGE_URL,
        productImages: product.productImages || [FALLBACK_IMAGE_URL],
        description: product.description || null,
        isActive: product.isActive ?? true,
        isWholesale: product.isWholesale,
        productPrice: product.productPrice,
        salePrice: product.salePrice,
        wholesalePrice: product.wholesalePrice || null,
        wholesaleQty: product.wholesaleQty || null,
        productStock: product.productStock || null,
        qty: product.qty || null,
        tags: product.tags || [],
        categoryId: product.categoryId || null,
        subCategoryId: product.subCategoryId || null,
        departmentId: product.departmentId,
        type: product.type || "topdeals",
        unit: product.unit || null,
        isDiscount: product.isDiscount,
        discount: product.discount,
        productCode: product.productCode || null,
      },
    });

    return { data: newProduct };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create product",
      data: null,
    };
  }
};

export const updateProduct = async (id: string, data: any): Promise<any> => {
  try {
    const {
      categoryId,
      subCategoryId,
      departmentId,
      brandId,
      vendorId,
      createdAt,
      updatedAt,
      category,
      subCategory,
      department,
      brand,
      vendor,
      orderItems,
      sales,
      ...updateData
    } = data;

    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        ...updateData,
        category: categoryId
          ? {
              connect: { id: categoryId },
            }
          : undefined,
        subCategory: subCategoryId
          ? {
              connect: { id: subCategoryId },
            }
          : undefined,
        department: departmentId
          ? {
              connect: { id: departmentId },
            }
          : undefined,
        brand: brandId
          ? {
              connect: { id: brandId },
            }
          : brandId === null
          ? {
              disconnect: true,
            }
          : undefined,
        vendor: vendorId
          ? {
              connect: { id: vendorId },
            }
          : vendorId === null
          ? {
              disconnect: true,
            }
          : undefined,
      },
      include: {
        category: true,
        subCategory: true,
        department: true,
        brand: true,
        vendor: true,
      },
    });

    return { data: updatedProduct };
  } catch (error) {
    console.error("Update error:", error);
    return {
      error: "Failed to update product",
      data: null,
    };
  }
};

export const getPaginatedProducts = async (
  departmentSlug: string,
  cursor?: string,
  limit: number = 4
): Promise<PaginatedProductsResponse> => {
  try {
    const products = await db.product.findMany({
      where: {
        department: {
          slug: departmentSlug,
        },
        isActive: true,
        productStock: {
          gt: 1,
        },
      },
      take: limit + 1,
      ...(cursor && {
        skip: 1,
        cursor: {
          id: cursor,
        },
      }),
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        productPrice: true,
        salePrice: true,
        productStock: true,
        isDiscount: true,
        discount: true,
        category: {
          select: {
            title: true,
          },
        },
      },
    });

    const hasMore = products.length > limit;
    const nextCursor = hasMore ? products[limit - 1].id : null;
    const paginatedProducts = hasMore ? products.slice(0, limit) : products;

    return {
      products: paginatedProducts.map((product) => ({
        ...product,
        category: product.category?.title,
      })),
      nextCursor,
      hasMore,
    };
  } catch (error) {
    console.error("Failed to fetch paginated products:", error);
    return {
      products: [],
      nextCursor: null,
      hasMore: false,
    };
  }
};
export const getPaginatedSubProducts = async (
  departmentSlug: string,
  cursor?: string,
  limit: number = 4
): Promise<PaginatedProductsResponse> => {
  try {
    const products = await db.product.findMany({
      where: {
        subCategory: {
          slug: departmentSlug,
        },
        isActive: true,
      },
      take: limit + 1,
      ...(cursor && {
        skip: 1,
        cursor: {
          id: cursor,
        },
      }),
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        productPrice: true,
        salePrice: true,
        isDiscount: true,
        discount: true,
        category: {
          select: {
            title: true,
          },
        },
      },
    });

    const hasMore = products.length > limit;
    const nextCursor = hasMore ? products[limit - 1].id : null;
    const paginatedProducts = hasMore ? products.slice(0, limit) : products;

    return {
      products: paginatedProducts.map((product) => ({
        ...product,
        category: product.category?.title,
      })),
      nextCursor,
      hasMore,
    };
  } catch (error) {
    console.error("Failed to fetch paginated products:", error);
    return {
      products: [],
      nextCursor: null,
      hasMore: false,
    };
  }
};

export const getCategoryProducts = async (
  categorySlug: string,
  cursor?: string,
  limit: number = 4
): Promise<PaginatedProductsResponse> => {
  try {
    const category = await db.category.findUnique({
      where: {
        slug: categorySlug,
        isActive: true,
      },
    });
    if (!category) {
      return {
        products: [],
        nextCursor: null,
        hasMore: false,
      };
    }

    const products = await db.product.findMany({
      where: {
        categoryId: category.id,
        isActive: true,
        productStock: {
          gt: 1,
        },
      },
      take: limit + 1,
      ...(cursor && {
        skip: 1,
        cursor: {
          id: cursor,
        },
      }),
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        productPrice: true,
        salePrice: true,
        isDiscount: true,
        discount: true,
        category: {
          select: {
            title: true,
          },
        },
      },
    });

    const hasMore = products.length > limit;
    const nextCursor = hasMore ? products[limit - 1].id : null;
    const paginatedProducts = hasMore ? products.slice(0, limit) : products;

    return {
      products: paginatedProducts.map((product) => ({
        ...product,
        category: product.category?.title,
      })),
      nextCursor,
      hasMore,
    };
  } catch (error) {
    console.error("Failed to fetch paginated products:", error);
    return {
      products: [],
      nextCursor: null,
      hasMore: false,
    };
  }
};
