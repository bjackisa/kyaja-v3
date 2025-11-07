"use client"
import { getFeaturedDepartments, getTopRatedDepartments } from "@/actions/home-categories";
import { useQueries } from "@tanstack/react-query";

export type SimpleDepartment = {
    id: string;
    title: string;
    imageUrl: string;
    slug?: string;
  };
  
  export type DepartmentSection = {
    title: string;
    departments: SimpleDepartment[];
  };

// Hook to fetch all department sections
export const useDepartmentSections = () => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ['departments', 'featured'],
        queryFn: () => getFeaturedDepartments(10),
      },
      {
        queryKey: ['departments', 'topRated'],
        queryFn: () => getTopRatedDepartments(10),
      }
    ],
  });

  const isLoading = queries.some(query => query.isPending);
  const error = queries.find(query => query.error)?.error;

  const sections: DepartmentSection[] = [
    {
      title: "New & Featured Departments",
      departments: queries[0].data || [],
    },
    {
      title: "Top Rated Collections",
      departments: queries[1].data || [],
    },
    
   
  ];

  return {
    sections,
    isLoading,
    error,
  };
};