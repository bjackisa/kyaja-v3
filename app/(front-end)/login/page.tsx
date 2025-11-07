import LoginComponent from '@/components/front-end/loginComponent';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function page({
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  const returnUrl = searchParams.returnUrl || '/dashboard'; 
  
  return (
    <div className='h-[80vh] flex items-center justify-center  bg-white dark:bg-black'>
      <LoginComponent returnUrl={returnUrl} session={session} />
    </div>
  );
}
