import React from 'react';

export default function BannerImage({  bgImage }:any) {
  return (
    <div 
      className='w-full h-[40vh] rounded-lg flex flex-col justify-center gap-1 md:px-9 px-5 lg:px-12 relative' 
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className='absolute inset-0 bg-black/50 rounded-xl'></div>
     
    </div>
  );
}
