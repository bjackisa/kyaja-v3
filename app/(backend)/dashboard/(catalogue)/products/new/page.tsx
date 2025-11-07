"use client"
import FormHeader from "@/components/back-end/FormHeader";
import NewProductForm from "@/components/form-inputs/NewProductForm";
import Unauthorized from "@/components/Unauthorized";
import { useFetchCategories } from "@/hooks/use-categories";
import { useFetchDepartments } from "@/hooks/use-departments";
import { useFetchSubCategories } from "@/hooks/use-sub-categories";
import { useSession } from "next-auth/react";
import React from "react";

export default function NewProduct() {
    const {categories}=useFetchCategories()
    const {subcategories , isLoading}=useFetchSubCategories()
     const { departments } = useFetchDepartments();
  
    const{ data: Session }=useSession()
    
      const user = Session?.user;
      const role = user?.role;
      if (role === "USER") {
        return(
          <Unauthorized/>
        )
      }
      if(isLoading){
        return(
          <div className=' w-full h-screen flex justify-center items-center'>
          <span className="loader"></span>
         </div>
        )
      }

  return (
    <div>
      <FormHeader title="New Product" />
      <NewProductForm categories={categories} subCategories={subcategories} departments={departments} />
    </div>
  );
}
