"use client"
import FormHeader from "@/components/back-end/FormHeader";
import NewDepartmentsForm from "@/components/form-inputs/NewDepartmentsForm";
import { useFetchDepartment } from "@/hooks/use-departments";
import React from "react";

interface Params {
  id: string;
}

export default function UpdateCategory({ params: { id } }: { params: Params }) {
    const {department , isLoading} = useFetchDepartment(id);
    
    if(isLoading){
      return(
        <div className=' w-full h-screen flex justify-center items-center'>
        <span className="loader"></span>
       </div>
      )
    }
  return (
    <div>
      <FormHeader title="Update Department" />
      <NewDepartmentsForm updateData={department} />
    </div>
  );
}
