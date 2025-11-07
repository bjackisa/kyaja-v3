import React from 'react'
import HomeSideBarCat from './HomeSideBarCat'
import Link from 'next/link'
import HomeCarousel from './HomeCoursel'
import { Banner, Category } from '@/types'

export default function HomeBanners({banners, categories}:{banners:Banner[] | any , categories:Category[] | any}) {
  // console.log(categories)
  return (
    <div className='lg:h-[70vh] md:h-[40vh] min-h-[30vh] w-full flex gap-3 shadow-md pt-4 p-2'>

     <div className='rounded-sm hidden lg:block lg:w-[18%] bg-white'>
      <HomeSideBarCat categories={categories}/>
     </div>

     <div className='lg:w-[62%] w-full '>
    <div>
    <HomeCarousel slides={banners}/>
    </div>
     </div>

     <div className='lg:w-[20%] hidden lg:flex flex-col gap-2'>
     <div className='w-full h-1/2 bg-[#ffffff] rounded-sm p-3 flex flex-col gap-6'>
      <Link href="/more/flash" className='flex gap-2 h-[33%]'>
        <img src="/sell.png" alt="" className='w-9 h-9 object-contain'/>
        <div className='flex flex-col'>
          <h2 className='text-sm text-[#313133] font-semibold'>Flash Products</h2>
          <p className='text-xs text-[#313133]'>Click to view  products</p>
        </div>
      </Link>
      <Link href="/more/featured" className='flex gap-2 h-[33%]'>
        <img src="/sell.png" alt="" className='w-9 h-9 object-contain'/>
        <div className='flex flex-col'>
          <h2 className='text-sm text-[#313133] font-semibold'>Featured product</h2>
          <p className='text-xs text-[#313133]'>Click to view  products</p>
        </div>
      </Link>
      <Link
          href="https://wa.me/+256752815998?text=Hello%20Customer%20Care"
          className='flex gap-2 h-[33%]'
        >
  <img src="/help.png" alt="" className='w-9 h-9 object-contain'/>
  <div className='flex flex-col'>
    <h2 className='text-sm text-[#313133] font-semibold'> Customer Care</h2>
    <p className='text-xs text-[#313133]'>Contact customer care</p>
  </div>
</Link>

    
     </div>
     <div className='w-full h-1/2 bg-purple-600 rounded-md'>
     <img src="https://res.cloudinary.com/dirpuqqib/image/upload/v1724172523/ezgif.com-animated-gif-maker_1_jpzcri.gif" alt="" className='w-full h-full object-cover rounded-md' />
     </div>
    </div>
    </div>
  )
}
