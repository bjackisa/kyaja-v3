"use client";

import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ImageUploader from "./ImageUploader";
import SubmitButton from "./SubmitButton";
import TextareaInput from "./TextAreaInput";
import TextInput from "./TextInput";
import ToggleInput from "./ToggleInput";
import SelectInput from "./SelectInput";
import { ICategory, ICreateCategory, IUpdateCategory } from "@/actions/category";
import { useCreateCategory, useUpdateCategory } from "@/hooks/use-categories";

interface NewCategoryFormProps {
  updateData?: Partial<ICategory>;
  departments?: any;
}

export default function NewCategoryForm({
  updateData = {},
  departments = [],
}: NewCategoryFormProps) {
  const initialImageUrl = updateData?.imageUrl ?? "";
  const id = updateData?.id ?? "";
  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl);
  // console.log(imageUrl , "these are image urls")
  const router = useRouter();
  const { createCategory, isCreating } = useCreateCategory();
  const { updateCategory, isUpdating } = useUpdateCategory();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateCategory>({
    defaultValues: {
      isActive: true,
      ...updateData,
    },
  });

  function redirect() {
    router.push("/dashboard/categories");
  }

  async function onSubmit(data: any) {
    const slug = generateSlug(data.title);
    const categoryData = {
      ...data,
      slug,
      imageUrl,
    };
    const { id: _, ...filteredData } = data;
    const updatedData = { ...filteredData, imageUrl };
    console.log(updatedData , "this the data")
    try {
      if (id) {
        // Update existing category
        await updateCategory({
          id,
          category: updatedData as IUpdateCategory,
        });
      } else {
        // Create new category
        await createCategory(categoryData);
        reset();
        setImageUrl("");
      }
      // redirect();
    } catch (error) {
      console.error("Failed to save category:", error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Category Title"
          name="title"
          register={register}
          errors={errors}
          required
        />
        <SelectInput
          label="Select Department"
          name="departmentId"
          register={register}
          errors={errors}
          className="w-full"
          options={departments}
        />
        <TextareaInput
          label="Category Description"
          name="description"
          register={register}
          errors={errors}
        />
        <ImageUploader
          imageUrls={imageUrl ? [imageUrl] : []} 
          setImageUrls={(urls) => setImageUrl(Array.isArray(urls) ? urls[0] : "")}
          endpoint="subCategoryUploader"
          label="Category Image"
        />
        <ToggleInput
          label="Publish your Category"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
      </div>

      <SubmitButton
        isLoading={isCreating || isUpdating}
        buttonTitle={id ? "Update Category" : "Create Category"}
        loadingButtonTitle={`${
          id ? "Updating" : "Creating"
        } Category please wait...`}
      />
    </form>
  );
}
