import { Category } from '@/types';
import Link from 'next/link';
import React from 'react'
type AllCategoriesProps = {
  categories: Category[],
  bgSecondaryColor:string
};
export default function AllCategories({ categories  , bgSecondaryColor}: AllCategoriesProps ) {

  return (
    <div style={{backgroundColor:`${bgSecondaryColor}`}} className='flex flex-col gap-6 w-full min-h-[20vh] lg:min-h-[50vh] mt-5'>
      <div className='text-xl text-center text-[#ffff] font-semibold pt-4'>
      Curated For You | Shop Now
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 p-4 bg-[#fff]'>
        {categories.splice(0,12).map((category:any, index:any) => (
          <Link href={`/category/${category.slug}`} key={index} className='relative overflow-hidden rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-md'>
            <img src={category.imageUrl } alt={category.title} className='w-full h-full object-cover' />
            <div className='absolute text-sm bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white text-center  font-bold line-clamp-1 capitalize'>
              {category.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
