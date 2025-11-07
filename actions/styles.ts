"use server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createOrUpdateStyle(data:any) {
  const { id, primaryColor, secondaryColor, bgImage, footerColor, topBannerImage } = data;

  try {
    if (id) {
      const updatedStyle = await db.style.update({
        where: { id },
        data: {
          primaryColor,
          secondaryColor,
          bgImage,
          footerColor,
          topBannerImage,
          updatedAt: new Date(),
        },
      });
      return updatedStyle;
    } else {
      const newStyle = await db.style.create({
        data: {
          primaryColor,
          secondaryColor,
          bgImage,
          footerColor,
          topBannerImage,
        },
      });
      revalidatePath("/dashboard/styles");
      return newStyle;
    }
  } catch (error) {
    console.log(error);
  }
}


export async function getSingleStyle(id:string) {
    try {
      const style= await db.style.findUnique({
        where: {
          id:"66796331098ee8133c96fc94"
        },
      });
      return  style;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

