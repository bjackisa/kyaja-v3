import React from 'react';
import { getCategoryBySlug } from '@/actions/categorySlug';
import Breadcrumb from '@/components/front-end/Breadcrumb';
import CatSideBar from '@/components/front-end/CatSideBar';
import RecentlyViewed from '@/components/front-end/RecentlyViewed';
import CatPrdts from '@/components/front-end/CatPrdts';
import { Category } from '@prisma/client';


export default async function Page({ params: { slug } }:any) {
  const categoryData:Category | any=await getCategoryBySlug(slug)
  return (
    <div className='lg:px-[6rem] md:pt-[3rem] px-2 pt-[2rem] lg:pt-[3.2rem] min-h-[100vh]'>
     <div className='bg-gray-50 shadow-sm p-2 mb-5'>
     <Breadcrumb />
     <div className='flex items-center justify-between'>
        <h1 className='font-bold lg:text-3xl md:text-2xl text-[#1c1d1f] capitalize'>{categoryData.title}({categoryData.products.length})</h1>
        <p className='text-xs text-gray-700'>{categoryData.products.length} of {categoryData.products.length} results</p>
       </div>
     </div>

       <div className='w-full min-h-screen flex gap-1 lg:flex-row flex-col mt-5'>
       <div className='shadow-sm w-[20%] lg:block hidden'>
        <CatSideBar  subCategories={categoryData.subCategories}/>
       </div>
       <div className='w-full lg:w-[80%]'>
        <CatPrdts products={categoryData.products} />
       </div>
       </div>
       <RecentlyViewed />
    </div>
  );
}
