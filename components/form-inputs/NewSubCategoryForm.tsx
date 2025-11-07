import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import ImageUploader from "./ImageUploader";
import SubmitButton from "./SubmitButton";
import { useCreateSubCategory, useUpdateSubCategory } from "@/hooks/use-sub-categories";

export default function NewSubCategoryForm({
  updateData = {},
  categories,
}: any) {
  const id = updateData?.id ?? "";
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...updateData,
    },
  });
  const initialImageUrls = updateData?.imageUrl ? [updateData.imageUrl] : [];
  const [imageUrls, setImageUrls] = useState<string[]>(initialImageUrls);
  const { createSubCategory , isCreating } = useCreateSubCategory();
  const { updateSubCategory, isUpdating } = useUpdateSubCategory();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const formData = {
      title: data.title,
      slug: data.title.toLowerCase().replace(/ /g, "-"),
      imageUrl:
        imageUrls[0] || "https://utfs.io/f/aa568418-002c-40a1-b13f-a0fd7eef1353-9w6i5v.svg",
      categoryId: data.categoryId,
    };

    setLoading(true);
    try {
      if (id) {
        await updateSubCategory({ id, subcategory: formData });
      } else {
        await createSubCategory(formData);
      }
      router.push("/dashboard/sub-categories");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Sub Category Title"
          name="title"
          register={register}
          errors={errors}
        />
        <SelectInput
          label="Select Category"
          name="categoryId"
          register={register}
          errors={errors}
          className="w-full"
          options={categories}
        />
        <ImageUploader
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
          endpoint="subCategoryUploader"
          label="Sub-Category Image"
        />
      </div>
   
       <SubmitButton
              isLoading={isCreating || isUpdating}
              buttonTitle={id ? "Update Sub Category" : "Create Sub Category"}
              loadingButtonTitle={`${
                id ? "Updating" : "Creating"
              } Category please wait...`}
            />
    </form>
  );
}
