"use client"
import FormHeader from "@/components/back-end/FormHeader";
import NewProductForm from "@/components/form-inputs/NewProductForm";
import Unauthorized from "@/components/Unauthorized";
import { useFetchCategories } from "@/hooks/use-categories";
import { useFetchDepartments } from "@/hooks/use-departments";
import { useFetchProduct } from "@/hooks/use-products";
import { useFetchSubCategories } from "@/hooks/use-sub-categories";
import { useSession } from "next-auth/react";
import React from "react";

export default  function UpdateProduct({ params: { id } }:any) {
const {categories}=useFetchCategories()
const {product , isLoading}=useFetchProduct(id)
    const {subcategories , isLoading:isLoadingSubCat}=useFetchSubCategories()
         const { departments } = useFetchDepartments();
    
    const{ data: Session }=useSession()
    
      const user = Session?.user;
      const role = user?.role;
      if (role === "USER") {
        return(
          <Unauthorized/>
        )
      }
      if(isLoading || isLoadingSubCat){
        return(
          <div className=' w-full h-screen flex justify-center items-center'>
          <span className="loader"></span>
         </div>
        )
      }

  return (
    <div>
      <FormHeader title="Update Product" />
      <NewProductForm
        updateData={product}
        categories={categories}
        subCategories={subcategories}
        departments={departments}
      />
    </div>
  );
}
