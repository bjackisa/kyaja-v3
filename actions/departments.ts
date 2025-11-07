"use server";
import db from "@/lib/db";
import { Department } from "@prisma/client";
// import { Department } from "@prisma/client";

// Fetch all departments
export const getAllDepartments = async () => {
  return await db.department.findMany({
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
    },
  });
};

// Fetch a single department by ID
export const getDepartmentById = async (id: string) => {
  return await db.department.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      slug: true,
      imageUrl: true,
      description: true,
      isActive: true,
    },
  });
};

// Delete a department by ID
export const deleteDepartment = async (id: string) => {
  return await db.department.delete({
    where: { id },
  });
};
export const createDepartment = async (department: Partial<Department>) => {
  if (!department.title || !department.slug) {
    throw new Error("Title and slug are required to create a department.");
  }

  try {
    const newDepartment = await db.department.create({
      data: {
        title: department.title,
        slug: department.slug,
        imageUrl:
          department.imageUrl ||
          "https://utfs.io/f/aa568418-002c-40a1-b13f-a0fd7eef1353-9w6i5v.svg",
        description: department.description || null,
        isActive: department.isActive ?? true,
        icons: department.icons || null,
      },
    });

    // If successful, return the new department
    return newDepartment;
  } catch (error) {
    console.error("Department creation error:", error);
    // Throw the error instead of returning an error object
    throw new Error(
      error instanceof Error ? error.message : "Failed to create department"
    );
  }
};

// Update a department
export const updateDepartment = async (
  id: string,
  data: Partial<Department>
) => {
  return await db.department.update({
    where: { id },
    data,
  });
};

export const getDepartmentBySlug = async (slug: string) => {
  return await db.department.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      slug: true,
      imageUrl: true,
      isActive: true,
      categories: {
        select: {
          id: true,
          title: true,
          slug: true,
          imageUrl: true,
          departmentId: true,
          _count: {
            select: {
              products: true,
            },
          },
        },
      },
    },
  });
};
export const getSubBySlug = async (slug: string) => {
  return await db.subCategory.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      slug: true,
      imageUrl: true,
      isActive: true,
    },
  });
};

export const getActiveDepartments = async () => {
  try {
    const departments = await db.department.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        description: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return departments;
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
};
