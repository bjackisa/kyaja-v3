import { getData } from "@/lib/getData";
import Link from "next/link";
import React from "react";

export default async function HomeCategoryCards({
  bgSecondaryColor,
}: {
  bgSecondaryColor?: any;
}) {
  const allCategories = (await getData("categories")) || [];
  const categoriesWithProducts = allCategories.filter(
    (category: any) => category.products && category.products.length > 0
  );
  // console.log(allCategories)
  //   console.log(categoriesData)
  return (
    <div
      style={{ backgroundColor: `${bgSecondaryColor}` }}
      className='min-h-[40vh] shadow-lg w-full lg:p-2 md:px-3 px-1 lg:rounded-sm'
    >
      <div className='w-full bg-white min-h-full lg:rounded-lg p-4 grid md:grid-cols-4 grid-cols-2 lg:grid-cols-6 gap-2'>
        {categoriesWithProducts
          ?.splice(0, 6)
          .map((category: any, index: any) => (
            <Link
              href={`/category/${category.slug}`}
              key={index}
              className='relative flex flex-col items-center justify-center rounded-lg transform transition-transform hover:scale-105'
            >
              <img
                src={category.imageUrl}
                alt={category.title}
                className='w-full h-[80%] mb-1 object-cover rounded-xl'
              />
              <div className='text-black font-medium text-sm text-center line-clamp-2 capitalize'>
                {category.title}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
