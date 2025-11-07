"use server";
import db from "@/lib/db";

// Fetch featured departments (newest ones)
export const getFeaturedDepartments = async (limit: number = 10) => {
  return await db.department.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      title: true,
      imageUrl: true,
      slug:true
    }
  });
};

// Fetch top rated departments (you might want to add a rating field to your schema)
export const getTopRatedDepartments = async (limit: number = 10) => {
  return await db.department.findMany({
    where: { 
      isActive: true,
      // Exclude IDs from featured departments to avoid repetition
      NOT: {
        id: {
          in: (await getFeaturedDepartments()).map(d => d.id)
        }
      }
    },
    // You might want to add orderBy rating when you have that field
    orderBy: { title: "asc" },
    take: limit,
    select: {
      id: true,
      title: true,
      imageUrl: true,
      slug:true
    }
  });
};

// Fetch popular departments (could be based on number of products or views)
export const getPopularDepartments = async (limit: number = 10) => {
  const featuredIds = (await getFeaturedDepartments()).map(d => d.id);
  const topRatedIds = (await getTopRatedDepartments()).map(d => d.id);

  return await db.department.findMany({
    where: { 
      isActive: true,
      NOT: {
        id: {
          in: [...featuredIds, ...topRatedIds]
        }
      }
    },
    orderBy: { title: "desc" },
    take: limit,
    select: {
      id: true,
      title: true,
      imageUrl: true,
      slug:true
    }
  });
};

// Fetch recommended departments (could be personalized in the future)
export const getRecommendedDepartments = async (limit: number = 10) => {
  const existingIds = [
    ...(await getFeaturedDepartments()).map(d => d.id),
    ...(await getTopRatedDepartments()).map(d => d.id),
    ...(await getPopularDepartments()).map(d => d.id)
  ];

  return await db.department.findMany({
    where: { 
      isActive: true,
      NOT: {
        id: {
          in: existingIds
        }
      }
    },
    // You could add more sophisticated ordering here
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: {
      id: true,
      title: true,
      imageUrl: true,
      slug:true
    }
  });
};