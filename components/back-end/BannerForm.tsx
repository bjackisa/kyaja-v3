"use client";

import { getAllProducts } from "@/actions/products";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ImageInput from "../form-inputs/ImageInput";
import SubmitButton from "../form-inputs/SubmitButton";
import TextInput from "../form-inputs/TextInput";
import ToggleInput from "../form-inputs/ToggleInput";
import { FancyMultiSelect } from "../form-inputs/MultiSelectPrdt";
import { useCreateBanner, useUpdateBanner } from "@/hooks/use-banners"; 

interface BannerFormProps {
  updateData?: {
    id?: string;
    title?: string;
    imageUrl?: string;
    previewImageUrl?: string;
    isActive?: boolean;
    productIds?: string[];
  };
}

export default function BannerForm({ updateData = {} }: BannerFormProps) {
  const router = useRouter();
  const { createBanner, isCreating } = useCreateBanner();
  const { updateBanner, isUpdating } = useUpdateBanner();

  const initialImageUrl = updateData?.imageUrl ?? "";
  const previewImageUrl = updateData?.previewImageUrl ?? "";
  const id = updateData?.id ?? "";
  
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [bannerImageUrl, setBannerImageUrl] = useState(previewImageUrl);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(
    updateData.productIds || []
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
      ...updateData,
    },
  });

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (updateData.productIds) {
      setSelectedProducts(updateData.productIds.filter((id) => id !== null));
    }
  }, [updateData]);

  function redirect() {
    router.push("/dashboard/banners");
    router.refresh();
  }

  async function onSubmit(data: any) {
    const formData = {
      ...data,
      imageUrl: imageUrl,
      previewImageUrl: bannerImageUrl,
      productIds: selectedProducts.filter((id) => id !== null),
    };

    if (id) {
      updateBanner(
        { 
          id, 
          data: formData 
        },
        {
          onSuccess: () => {
            redirect();
          }
        }
      );
    } else {
      createBanner(
        formData,
        {
          onSuccess: () => {
            reset();
            setImageUrl("");
            redirect();
          }
        }
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <FancyMultiSelect
        products={products}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Banner Title"
          name="title"
          register={register}
          errors={errors}
        />
        <div className="flex lg:flex-row flex-col gap-2 w-full">
          <ImageInput
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="bannerImageUploader"
            label="Banner Image"
          />
          <ImageInput
            imageUrl={bannerImageUrl}
            setImageUrl={setBannerImageUrl}
            endpoint="bannerPreviewImageUploader"
            label="Preview Banner Image"
          />
        </div>
        <ToggleInput
          label="Publish your Banner"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
      </div>
      <SubmitButton
        isLoading={isCreating || isUpdating}
        buttonTitle={id ? "Update Banner" : "Create Banner"}
        loadingButtonTitle={`${
          id ? "Updating" : "Creating"
        } Banner please wait...`}
      />
    </form>
  );
}