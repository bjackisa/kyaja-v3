"use client"
import { useCategories } from '@/hooks/use-categories';

import Link from 'next/link'
import React from 'react'

export default function SearchSideBar() {
  const { data: categories, isLoading } = useCategories();
   if(isLoading){
   return(
    <div className=' w-full h-screen flex justify-center items-center'>
    <span className="loader"></span>
   </div>
   )
   }
  return (
    <div className='p-3'>
      <h2 className='font-bold text-lg '>Categories</h2>
    <div className='mt-2 flex flex-col gap-4'>
      {
        categories.slice(0,10)?.map((cat , i)=>{
          return (
            <Link key={i} className='text-sm hover:text-orange-500 capitalize ' href={`/c/${cat.slug}`}>{cat.title}</Link>
          )
        })
      }
   
    </div>
    </div>
  )
}
