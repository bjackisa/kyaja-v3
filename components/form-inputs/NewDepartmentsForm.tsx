"use client";
import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ImageInput from "./ImageInput";
import SubmitButton from "./SubmitButton";
import TextareaInput from "./TextAreaInput";
import TextInput from "./TextInput";
import ToggleInput from "./ToggleInput";

import { useCreateDepartment, useUpdateDepartment } from "@/hooks/use-departments";

export default function NewDepartmentsForm({ updateData = {} }: any) {
  const router=useRouter()
  
  const { updateDepartment, isUpdating } = useUpdateDepartment();
  const { createDepartment, isCreating } = useCreateDepartment();
  const initialImageUrl = updateData?.imageUrl ?? "";
  const initialDescription = updateData?.description ?? "";
  const id = updateData?.id ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
      description:initialDescription,
      ...updateData,
    },
  });

  async function onSubmit(data: any) {
    setIsLoading(true)
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;
    const { id: _, createdAt: __, ...filteredData } = data;
    try {
      setIsLoading(true)
      if (id) {
        data.id = id;
        await updateDepartment({ id, department: filteredData });
        router.push("/dashboard/departments")
      } else {
        await createDepartment(data);
        // setImageUrl("");
        reset(); 
        
        router.push("/dashboard/departments")

      }
    } catch (error) {
      console.error(error);
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Department Title"
          name="title"
          register={register}
          errors={errors}
        />

        <TextareaInput
          label="Department Description"
          name="description"
          register={register}
          errors={errors}
        />

        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="categoryImageUploader"
          label="Department Image"
        />
        <ToggleInput
          label="Publish your Department"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
      </div>

      <SubmitButton
        isLoading={isLoading}
        buttonTitle={id ? "Update Department" : "Create Department"}
        loadingButtonTitle={
          id
            ? "Updating Department, please wait..."
            : "Creating Department, please wait..."
        }
      />
    </form>
  );
}
