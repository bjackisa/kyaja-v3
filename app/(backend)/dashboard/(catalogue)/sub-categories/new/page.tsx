"use client"
import FormHeader from "@/components/back-end/FormHeader";
import NewSubCategoryForm from "@/components/form-inputs/NewSubCategoryForm";
import { useFetchCategories } from "@/hooks/use-categories";


export default function NewSubCategory() {
  const {categories , isLoading}=useFetchCategories()

  if(isLoading){
    return(
      <div className=' w-full h-screen flex justify-center items-center'>
      <span className="loader"></span>
     </div>
    )
  }
  return (
    <div>
      <FormHeader title="New Sub Category" />
      <NewSubCategoryForm categories={categories} />
    </div>
  );
}
