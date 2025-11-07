import { getSingleStyle } from '@/actions/styles'
import FormHeader from '@/components/back-end/FormHeader'
import NewStyleForm from '@/components/form-inputs/StylesCreateForm'
import React from 'react'

export default async function Page() {
  const singleStyle= await getSingleStyle("")
  // console.log(singleStyle)
  return (
    <div>
     <FormHeader title="Adjust Styles" />
     <NewStyleForm updateData={singleStyle}/>
    </div>
  )
}
