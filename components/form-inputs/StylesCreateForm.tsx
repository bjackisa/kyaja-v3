"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ColorPicker } from "./ColorPicker";
import TextInput from "./TextInput";
import ImageInput from "./ImageInput";
import SubmitButton from "./SubmitButton";
import { createOrUpdateStyle } from "@/actions/styles";


export default function NewStyleForm({ updateData = {} }:any) {
  const initialBgImageUrl = updateData?.bgImage ?? "";
  const initialTopBannerImageUrl = updateData?.topBannerImage ?? "";
  const id = updateData?.id ?? "";
  const [bgImageUrl, setBgImageUrl] = useState(initialBgImageUrl);
  const [topBannerImageUrl, setTopBannerImageUrl] = useState(initialTopBannerImageUrl);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { ...updateData },
  });

  const router = useRouter();
  async function onSubmit(data:any) {
    setLoading(true);
    data.bgImage = bgImageUrl;
    data.topBannerImage = topBannerImageUrl;
    data.id = id;

    try {
      await createOrUpdateStyle(data)
      setLoading(false);
      toast.success("Styles Adjusted Successfully 😁")
     router.refresh()
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to Adjust")
    } 
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="flex lg:flex-row flex-col gap-6 w-full">
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <TextInput
            label="Primary Color"
            name="primaryColor"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Secondary Color"
            name="secondaryColor"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Footer Color"
            name="footerColor"
            register={register}
            errors={errors}
          />
         <ColorPicker/>
        </div>

        <div className="flex flex-col w-full lg:w-1/2 gap-3 lg:gap-6">
          <ImageInput
            imageUrl={bgImageUrl}
            setImageUrl={setBgImageUrl}
            endpoint="bgImageUploader"
            label="Background Image"
          />
          <ImageInput
            imageUrl={topBannerImageUrl}
            setImageUrl={setTopBannerImageUrl}
            endpoint="topBannerImageUploader"
            label="Home Top Banner Image"
          />
        </div>
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update Style" : "Create Style"}
        loadingButtonTitle={`${id ? "Updating" : "Creating"} Style please wait...`}
      />
    </form>
  );
}
