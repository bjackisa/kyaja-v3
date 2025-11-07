import CheckoutPage from '@/components/front-end/CheckOutComponent';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";
import React from 'react'

export default async function page() {
 const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?returnUrl=/c/checkout");
  }

  const user=session?.user
  const email =user.email

  return (
    <div>
      <CheckoutPage email={email}/>
    </div>
  )
}
