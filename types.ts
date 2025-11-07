import { UserRole } from "@prisma/client"; 

interface CustomUser {
  id: string;
  name?: string;
  email?: string;
  role?: UserRole;
  status?: boolean;
  image?: string;
  emailVerified?: boolean;
}

interface CustomToken extends CustomUser {
  picture?: string;
}

interface CustomSession {
  user: CustomUser;
}
// Types for Product, Category, and SubCategory
export type ProductTypes = {
  id: string;
  barcode: string;
  imageUrl: string;
  categoryId: string;
  description: string;
  subCategoryId: string;
  isActive: boolean;
  isWholesale: boolean;
  productCode: string;
  productPrice: number;
  salePrice: number;
  sku: string;
  slug: string;
  tags: string[];
  title: string;
  type: string;
  unit: string;
  wholesalePrice: number;
  wholesaleQty: number;
  productStock: number;
  qty: number;
  productImages: string[];
  createdAt: Date;
  updatedAt: Date;
  category?: Category | null; // Make category optional
  subCategory?: SubCategory | null; // Make subCategory optional
};

export type SubCategory = {
  id: string; // Assuming each subcategory has a unique ID
  name: string; // The name of the subcategory
  slug: string; // The slug for the subcategory
  categoryId: string; // The ID of the parent category
  createdAt: Date; // Assuming you have createdAt field
  updatedAt: Date; // Assuming you have updatedAt field
  products: ProductTypes[]; // Array of products in this subcategory
};

// types.ts (or wherever you define your types)

// Banner type definition
export type Banner = {
  id?: string;
  title?: string; // Ensure this is included in the data
  link?: string;
  imageUrl: string;
  previewImageUrl?: string;
  isActive?: boolean;
  productIds?: string[];
  createdAt?: string; // If you have these fields in your data
  updatedAt?: string;
  position?: number; // Add if needed

};

// Category type definition
export type Category = {
  id: string;
  title: string; // Ensure this is included in the data
  slug: string;
  imageUrl?: string;
  description?: string;
  isActive: boolean;
  icon?: string;
  createdAt: Date; // Ensure this is included
  updatedAt: Date;
  subCategories: SubCategory[]; // Ensure subCategories property exists if needed
  products: ProductTypes[]; // Ensure products property exists if needed
};
export type NewCategory = {
  id: string;
  title: string; // Ensure this is included in the data
  slug: string;
  imageUrl?: string;
  description?: string;
  isActive: boolean;
  icon?: string;
  createdAt: Date; // Ensure this is included
  updatedAt: Date;
  products: ProductTypes[]; // Ensure products property exists if needed
};
export type Department = {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  productPrice: number;
  salePrice: number;
}

export interface ProductResponse {
  data: Product[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface CategoryProduct extends Product {
  category: {
    slug: string;
  };
}

export interface ProductTypes2 {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  productImages: string[];
  description?: string;
  isActive: boolean;
  isWholesale: boolean;
  sku?: string;
  barcode?: string;
  productCode?: string;
  unit?: string;
  productPrice: number;
  salePrice: number;
  wholesalePrice?: number;
  wholesaleQty?: number;
  productStock?: number;
  qty?: number;
  tags: string[];
  categoryId?: string;
  subCategoryId?: string;
  departmentId: string;
  type?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface ProductResponse2 {
  data: ProductTypes2[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface UseCategoryProductsReturn {
  data?: import('@tanstack/react-query').InfiniteData<ProductResponse2>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  loadMoreRef: (node?: Element | null) => void;
}
// types/next-auth.d.ts
// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       name?: string;
//       email?: string;
//       image?: string;
//       role?: string; // Add the role property
//     };
//   }
// }
