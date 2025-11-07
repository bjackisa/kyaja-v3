"use server";
import db from "@/lib/db";

// Custom types for SubCategory
export interface ISubCategory {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  description: string | null;
  isActive: boolean;
  categoryId: string | null;
  createdAt: Date;
}

// Type for creating a new subcategory
export interface ICreateSubCategory {
  title: string;
  slug: string;
  imageUrl?: string;
  description?: string;
  isActive?: boolean;
  categoryId: string;
}

// Type for updating a subcategory
export interface IUpdateSubCategory extends Partial<ICreateSubCategory> {}

// Response types
export interface ISubCategoryResponse {
  error?: string;
  data: ISubCategory | null;
}

export interface ISubCategoriesResponse {
  error?: string;
  data: ISubCategory[];
}

// Fetch all subcategories
export const getAllSubCategories = async (): Promise<ISubCategoriesResponse> => {
  try {
    const subcategories = await db.subCategory.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        isActive: true,
        categoryId: true,
        createdAt: true,
        description: true,
        category: {
          select: {
            title: true, // Include the category title
          },
        },
      },
    });

    return {
      data: subcategories.map((subcategory) => ({
        ...subcategory,
        categoryTitle: subcategory.category?.title || null, // Extract category title
        imageUrl: subcategory.imageUrl || null,
        description: subcategory.description || null,
        categoryId: subcategory.categoryId || null,
      })),
    };
  } catch (error) {
    return {
      error: "Failed to fetch subcategories",
      data: [],
    };
  }
};


// Fetch a single subcategory by ID
export const getSubCategoryById = async (id: string): Promise<ISubCategoryResponse> => {
  try {
    const subcategory = await db.subCategory.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        description: true,
        isActive: true,
        categoryId: true,
        createdAt: true,
        // updatedAt: true,
      },
    });

    if (!subcategory) return { data: null };

    return { 
      data: {
        ...subcategory,
        imageUrl: subcategory.imageUrl || null,
        description: subcategory.description || null,
        categoryId: subcategory.categoryId || null,
      }
    };
  } catch (error) {
    return {
      error: 'Failed to fetch subcategory',
      data: null
    };
  }
};

// Delete a subcategory by ID
export const deleteSubCategory = async (id: string): Promise<ISubCategoryResponse> => {
  try {
    const subcategory = await db.subCategory.delete({
      where: { id },
    });

    return { 
      data: {
        ...subcategory,
        imageUrl: subcategory.imageUrl || null,
        description: subcategory.description || null,
        categoryId: subcategory.categoryId || null,
      }
    };
  } catch (error) {
    return {
      error: 'Failed to delete subcategory',
      data: null
    };
  }
};

// Create a subcategory
export const createSubCategory = async (subcategory: ICreateSubCategory): Promise<ISubCategoryResponse> => {
  try {
    if (!subcategory.title || !subcategory.slug || !subcategory.categoryId) {
      throw new Error("Title, slug, and category ID are required to create a subcategory.");
    }

    const newSubCategory = await db.subCategory.create({
      data: {
        title: subcategory.title,
        slug: subcategory.slug,
        imageUrl: subcategory.imageUrl || "https://utfs.io/f/aa568418-002c-40a1-b13f-a0fd7eef1353-9w6i5v.svg",
        description: subcategory.description || null,
        isActive: subcategory.isActive ?? true,
        categoryId: subcategory.categoryId,
      },
    });

    return { 
      data: {
        ...newSubCategory,
        imageUrl: newSubCategory.imageUrl || null,
        description: newSubCategory.description || null,
        categoryId: newSubCategory.categoryId || null,
      }
    };
  } catch (error) {
    return {
      error: 'Failed to create subcategory',
      data: null
    };
  }
};

// Update a subcategory
export const updateSubCategory = async (id: string, data: IUpdateSubCategory): Promise<ISubCategoryResponse> => {
  try {
    const updatedSubCategory = await db.subCategory.update({
      where: { id },
      data: {
        ...data,
        categoryId: data.categoryId || null,
      },
    });

    return { 
      data: {
        ...updatedSubCategory,
        imageUrl: updatedSubCategory.imageUrl || null,
        description: updatedSubCategory.description || null,
        categoryId: updatedSubCategory.categoryId || null,
      }
    };
  } catch (error) {
    console.log(error);
    return {
      error: 'Failed to update subcategory',
      data: null
    };
  }
};