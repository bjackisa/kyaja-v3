import { getBannerProducts } from '@/actions/banner';
import BannerImage from '@/components/front-end/BannerImage';
import CatPrdts from '@/components/front-end/CatPrdts';
import RecentlyViewed from '@/components/front-end/RecentlyViewed';
import SearchSideBar from '@/components/front-end/SearchSideBar';
import { Banner } from '@prisma/client';
import React from 'react'

export default async function page({params:{id}}:any) {
    const bannerProducts:Banner | any = await getBannerProducts(id);
    //  console.log(bannerProducts)
    if (!bannerProducts) {
      return <div>Banner not found</div>;
    }
  return (
    <div className='lg:px-[6rem] md:pt-[3rem] px-2 pt-[2rem] lg:pt-[4rem] min-h-[100vh]'>
        {/* <Breadcrumb /> */}
        <BannerImage 
        bgImage={bannerProducts.banner.imageUrl}
      />
        <div className='w-full min-h-screen flex gap-1 lg:flex-row flex-col mt-5'>
        <div className='shadow-lg w-[20%] lg:block hidden'>
         <SearchSideBar/>
        </div>
        <div className='w-full lg:w-[80%]'>
         <CatPrdts products={bannerProducts.products}/>
        </div>
        </div>
        <RecentlyViewed />
     </div>
  )
}
