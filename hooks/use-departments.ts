"use client"
import { createDepartment, deleteDepartment, getActiveDepartments, getAllDepartments, getDepartmentById, getDepartmentBySlug, getSubBySlug, updateDepartment } from "@/actions/departments";
import { Department } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"
type ActiveDepartment={
  id:string,
  title:string,
  imageUrl: string,
  slug: string,
}
// Fetch all departments
export const useFetchDepartments = () => {
  const departmentsQuery = useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const data = await getAllDepartments();
      return data || [];
    },
  });

  return {
    departments: departmentsQuery.data || [],
    isLoading: departmentsQuery.isPending,
    error: departmentsQuery.error,
    refetch: departmentsQuery.refetch,
  };
};

// Fetch a single department
export const useFetchDepartment = (departmentId: string) => {
  const departmentQuery = useQuery({
    queryKey: ['departments', departmentId],
    queryFn: async () => {
      const data = await getDepartmentById(departmentId);
      return data;
    },
    enabled: !!departmentId,
  });

  return {
    department: departmentQuery.data,
    isLoading: departmentQuery.isPending,
    error: departmentQuery.error,
  };
};

// Delete a department
export const useDeleteDepartment = () => {
    const queryClient = useQueryClient();
  
    const deleteDepartmentMutation = useMutation({
      mutationFn: async (id: string) => {
        return await deleteDepartment(id);
      },
      onSuccess: (deletedDepartment) => {
        queryClient.setQueryData(['departments'], (oldData: Department[]) =>
          oldData.filter((dept) => dept.id !== deletedDepartment.id)
        );
        queryClient.invalidateQueries({ queryKey: ['departments'] });
  
        toast('Department deleted successfully');
      },
      onError: () => {
        toast('An error occurred while deleting the department');
      },
    });
  
    return {
      deleteDepartment: deleteDepartmentMutation.mutate,
      isDeleting: deleteDepartmentMutation.isPending,
      error: deleteDepartmentMutation.error,
    };
  };
 
  // Create a department
  export const useCreateDepartment = () => {
    const queryClient = useQueryClient();
  
    const createDepartmentMutation = useMutation({
      mutationFn: async (department: Partial<Department>) => {
        const result = await createDepartment(department);       
        return result;
      },
      onSuccess: (newDepartment) => {
        queryClient.setQueryData(["departments"], (oldData: Department[] = []) => [
          ...oldData,
          newDepartment,
        ]);
        queryClient.invalidateQueries({ queryKey: ["departments"] });
        toast.success("Department created successfully");
      },
      onError: (error: Error) => {
        toast.error(error.message || "An error occurred while creating the department");
      },
    });
  
    return {
      createDepartment: createDepartmentMutation.mutate,
      isCreating: createDepartmentMutation.isPending,
      error: createDepartmentMutation.error,
    };
  };

// Update a department
export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();

  const updateDepartmentMutation = useMutation({
    mutationFn: async ({ id, department }: { id: string; department: Partial<Department> }) => {
      return await updateDepartment(id, department);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      toast('Department updated successfully');
    },
    onError: () => {
      toast('An error occurred while updating the department');
    },
  });

  return {
    updateDepartment: updateDepartmentMutation.mutate,
    isUpdating: updateDepartmentMutation.isPending,
    error: updateDepartmentMutation.error,
  };
};
export const useDepartmentDetails = (slug: string) => {
  return useQuery({
    queryKey: ['department', slug],
    queryFn: () => getDepartmentBySlug(slug),
    enabled: !!slug,
  });
}
export const useSubCatDetails = (slug: string) => {
  return useQuery({
    queryKey: ['sub-categories', slug],
    queryFn: () => getSubBySlug(slug),
    enabled: !!slug,
  });
}

export const useActiveDepartment = () => {
  return useQuery<ActiveDepartment[]>({
    queryKey: ['active-department'],
    queryFn: () => getActiveDepartments(),
  });
};