
"use client"
import FormHeader from "@/components/back-end/FormHeader";
import NewSubCategoryForm from "@/components/form-inputs/NewSubCategoryForm";
import { useFetchCategories } from "@/hooks/use-categories";
import { useFetchSubCategory } from "@/hooks/use-sub-categories";

import React from "react";

export default function UpdateCategory({ params: { id } }:any) {
    const {subcategory,isLoading }=useFetchSubCategory(id)
    const {categories}=useFetchCategories()
  
  if(isLoading){
    return(
      <div className=' w-full h-screen flex justify-center items-center'>
      <span className="loader"></span>
     </div>
    )
  }
  return (
    <div>
      <FormHeader title="Update Sub category" />
      <NewSubCategoryForm updateData={subcategory} categories={categories} />
    </div>
  );
}
