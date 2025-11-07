"use server";
import db from "@/lib/db";

// Custom types for Category
export interface ICategory {
  id: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  description: string | null;
  isActive: boolean;
  departmentId?: string | null;
  createdAt: Date;
}

// Type for creating a new category
export interface ICreateCategory {
  title: string;
  slug: string;
  imageUrl?: string;
  description?: string;
  isActive?: boolean;
  departmentId?: string;
}

// Type for updating a category
export interface IUpdateCategory extends Partial<ICreateCategory> {}

// Response types
export interface ICategoryResponse {
  error?: string;
  data: ICategory | null;
}

export interface ICategoriesResponse {
  error?: string;
  data: ICategory[];
}
export interface ICategory {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
}

export interface IDepartment {
  id: string;
  title: string;
  categories: ICategory[];
}
// Fetch all categories
export const getAllCategories = async (): Promise<ICategoriesResponse> => {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        departmentId: true,
        description: true,
      },
    });

    return {
      data: categories.map((category) => ({
        ...category,
        imageUrl: category.imageUrl || null,
        description: category.description || null,
        updatedAt: category.updatedAt || null,
      })),
    };
  } catch (error) {
    return {
      error: "Failed to fetch categories",
      data: [],
    };
  }
};
export const getAllSubCategoriesForCat = async (): Promise<any> => {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
      },
      take: 8,
    });

    return {
      categories,
    };
  } catch (error) {
    return {
      error: "Failed to fetch categories",
      data: [],
    };
  }
};

// Fetch a single category by ID
export const getCategoryById = async (
  id: string
): Promise<ICategoryResponse> => {
  try {
    const category = await db.category.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        description: true,
        isActive: true,
        departmentId: true,
        createdAt: true,
      },
    });

    if (!category) return { data: null };

    return {
      data: {
        ...category,
        imageUrl: category.imageUrl || null,
        description: category.description || null,
        departmentId: category.departmentId || null,
      },
    };
  } catch (error) {
    return {
      error: "Failed to fetch category",
      data: null,
    };
  }
};

// Delete a category by ID
export const deleteCategory = async (
  id: string
): Promise<ICategoryResponse> => {
  try {
    const category = await db.category.delete({
      where: { id },
    });

    return {
      data: {
        ...category,
        imageUrl: category.imageUrl || null,
        description: category.description || null,
        departmentId: category.departmentId || null,
      },
    };
  } catch (error) {
    return {
      error: "Failed to delete category",
      data: null,
    };
  }
};

// Create a category
export const createCategory = async (
  category: ICreateCategory
): Promise<ICategoryResponse> => {
  try {
    if (!category.title || !category.slug) {
      throw new Error("Title and slug are required to create a category.");
    }

    const newCategory = await db.category.create({
      data: {
        title: category.title,
        slug: category.slug,
        imageUrl:
          category.imageUrl ||
          "https://utfs.io/f/aa568418-002c-40a1-b13f-a0fd7eef1353-9w6i5v.svg",
        description: category.description || null,
        isActive: category.isActive ?? true,
        departmentId: category.departmentId || null,
      },
    });

    return {
      data: {
        ...newCategory,
        imageUrl: newCategory.imageUrl || null,
        description: newCategory.description || null,
        departmentId: newCategory.departmentId || null,
      },
    };
  } catch (error) {
    return {
      error: "Failed to create category",
      data: null,
    };
  }
};

// Update a category
export const updateCategory = async (
  id: string,
  data: IUpdateCategory
): Promise<ICategoryResponse> => {
  console.log(data, id, "updating data");
  try {
    const updatedCategory = await db.category.update({
      where: { id },
      data: {
        ...data,
        departmentId: data.departmentId || null,
      },
    });

    return {
      data: {
        ...updatedCategory,
        imageUrl: updatedCategory.imageUrl || null,
        description: updatedCategory.description || null,
        departmentId: updatedCategory.departmentId || null,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update category",
      data: null,
    };
  }
};

export async function getDepartmentsWithCategories(page = 0, limit = 4) {
  try {
    const departmentsWithCounts = await db.department.findMany({
      where: {
        categories: {
          some: {},
        },
      },
      select: {
        id: true,
        title: true,
        _count: {
          select: {
            categories: true,
          },
        },
      },
    });

    const departmentIds = departmentsWithCounts
      .filter((dept) => dept._count.categories >= 4)
      .map((dept) => dept.id);

    const departments = await db.department.findMany({
      where: {
        id: {
          in: departmentIds,
        },
      },
      select: {
        id: true,
        title: true,
        categories: {
          where: {
            isActive: true,
          },
          select: {
            id: true,
            title: true,
            slug: true,
            imageUrl: true,
          },
          skip: page * limit,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    // Ensure proper typing for the return value
    return {
      data: departments
        .filter(
          (dept) => Array.isArray(dept.categories) && dept.categories.length > 0
        )
        .map((dept) => ({
          ...dept,
          categories: dept.categories.map((cat) => ({
            id: cat.id,
            title: cat.title,
            slug: cat.slug,
            imageUrl: cat.imageUrl || "",
          })),
        })),
    };
  } catch (error) {
    console.error("Error fetching departments:", error);
    return {
      error: "Failed to fetch departments with categories",
      data: [],
    };
  }
}

export const getCategoriesExceptDepartment = async (
  currentDepartmentSlug: string
) => {
  const categories = await db.category.findMany({
    where: {
      department: {
        slug: {
          not: currentDepartmentSlug,
        },
      },
    },
    select: {
      id: true,
      title: true,
      imageUrl: true,
      slug: true,
    },
    take: 7,
    orderBy: {
      createdAt: "desc",
    },
  });

  return categories;
};
export const getCategoryBySlug = async (slug: string) => {
  try {
    const subCatgories = await db.category.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        subCategories: {
          where: {
            isActive: true,
          },
          select: {
            id: true,
            title: true,
            slug: true,
            imageUrl: true,
          },
        },
      },
    });
    // console.log(subCatgories)
    return subCatgories;
  } catch (error) {
    console.log(error);
  }
};
export const getCategoriesExcept = async (currentDepartmentSlug: string) => {
  try {
    const categories = await db.category.findMany({
      where: {
        slug: {
          not: currentDepartmentSlug,
        },
      },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        slug: true,
      },
      take: 7, // Limit the results to 7 categories
      orderBy: {
        createdAt: "desc", // Sort categories by the most recently created
      },
    });

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
export const getActiveCategories = async () => {
  try {
    const categories = await db.category.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        slug: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
