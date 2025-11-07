"use client"
import FormHeader from "@/components/back-end/FormHeader";
import NewCategoryForm from "@/components/form-inputs/NewCategoryForm";
import { useFetchCategory } from "@/hooks/use-categories";
import {useFetchDepartments } from "@/hooks/use-departments";
import React from "react";

interface Params {
  id: string;
}

export default function UpdateCategory({ params: { id } }: { params: Params }) {
  const { departments} = useFetchDepartments();
  const { category , isLoading  } = useFetchCategory(id);
  if(isLoading){
    return(
      <div className=' w-full h-screen flex justify-center items-center'>
      <span className="loader"></span>
     </div>
    )
  }
  return (
    <div>
      <FormHeader title="Update category" />
      <NewCategoryForm departments={departments} updateData={category}/>
    </div>
  );
}
