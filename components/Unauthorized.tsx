"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Unauthorized() {
  const router=useRouter()
    const handleRefresh = () => {
        window.location.reload();
        setTimeout(() => {
          router.push('/');
        }, 1000); 
      };
    
      const handleBackHome = () => {
        window.location.reload();
        setTimeout(() => {
          router.push('/');
        }, 1000); 
      };
  return (
   <>
 <section className="bg-gray-50">
     <div className="max-w-screen-xl px-4 py-32 lg:flex lg:h-[80vh] mx-auto">
     <div className="mx-auto max-w-xl text-center">
      <h1 className="text-4xl font-black sm:text-5xl tracking-normal">
       Your Unauthorized.
        <strong className=" text-red-700 text-3xl font-black sm:text-5xl">To Access This Page.</strong>
      </h1>

      <p className="mt-4">
        This page is currently unaccessible to customers contact customer support for help .
       </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button onClick={handleRefresh}
          className="block w-full rounded bg-red-700 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-700 sm:w-auto"
        >
        Continue Shopping
        </button>

        <button onClick={handleBackHome}
          className="block w-full rounded px-12 py-3 text-sm font-medium text-red-700 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-700 sm:w-auto"
        >
          Back Home
        </button>
      </div>
    </div>
  </div>
        </section>
   
   </>
  )
}
