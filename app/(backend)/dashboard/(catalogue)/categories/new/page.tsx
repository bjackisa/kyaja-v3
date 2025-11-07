"use client"
import FormHeader from "@/components/back-end/FormHeader";
import NewCategoryForm from "@/components/form-inputs/NewCategoryForm";
import { useFetchDepartments } from "@/hooks/use-departments";

export default function NewCategory() {
    const { departments , isLoading } = useFetchDepartments();
    if(isLoading){
      return(
        <div className=' w-full h-screen flex justify-center items-center'>
        <span className="loader"></span>
       </div>
      )
    }
  return (
    <div>
      <FormHeader title="New category" />
      <NewCategoryForm departments={departments}/>
    </div>
  );
}
