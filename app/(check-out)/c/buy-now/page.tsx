import BuyNowComp from '@/components/front-end/CheckOutComponent';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'


export default async function page() {
    const session = await getServerSession(authOptions);
    const user=session?.user
    const email=user?.email
    if (!session) {
      redirect("/login?returnUrl=/c/buy-now?q=single-item");
    }

  return (
    <div>
        <BuyNowComp email={email}/>
    </div>
  )
}
