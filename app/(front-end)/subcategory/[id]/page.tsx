import { getProductsBySubCategoryId } from '@/actions/sub-category'
import SubCategoriesComp from '@/components/front-end/SubCategoriesComp'
import React from 'react'

export default async function Page({params:{id}}: { params: { id: string } }) {
  const subCategoriesData = await getProductsBySubCategoryId(id)
  return (
    <div className='lg:px-[6rem] md:pt-[3rem] px-2 pt-[2rem] lg:pt-[3.2rem] min-h-[100vh]'>
    {/* <div className=''>
    <Breadcrumb />
      </div> */}
     <SubCategoriesComp subCategoriesData={subCategoriesData}/>
    </div>
  )
}
