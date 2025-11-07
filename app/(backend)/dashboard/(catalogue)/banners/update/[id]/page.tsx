import BannerForm from "@/components/back-end/BannerForm";
import FormHeader from "@/components/back-end/FormHeader";
import { getData } from "@/lib/getData";
import React from "react";

export default async function UpdateBanner({ params: { id } }:any) {
  const banner = await getData(`banners/${id}`);
  // console.log(banner);
  return (
    <div>
      <FormHeader title="Update Banner" />
      <BannerForm updateData={banner} />
    </div>
  );
}
