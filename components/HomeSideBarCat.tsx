import Link from 'next/link';
import React from 'react';
import { AppWindow, Apple, Baby, Drumstick, Gamepad2, Shirt, ShoppingBag, Smartphone, Tv } from 'lucide-react';
import { BiCaptions } from 'react-icons/bi';
import { BsHouse } from 'react-icons/bs';
import { CiCircleMore } from 'react-icons/ci';

const iconMapping = {
  'Phones & Tabs': Smartphone,
  'TVs & Audio': Tv,
  'Appliances': AppWindow,
  'Home': BsHouse,
  'Fashion': Shirt,
  'Supermarket': Apple,
  'Health & Beauty': Drumstick,
  'Baby Products': Baby,
  'Gaming': Gamepad2,
  'Official stores': ShoppingBag,
  'Accessories': BiCaptions,
  'Other Categories': CiCircleMore
};

export default function HomeSideBarCat({ categories }:any) {
  return (
    <div className='flex flex-col gap-4 p-2'>
      {categories.map((category:any, index:any) => {
        const Icon = iconMapping[category.title] || CiCircleMore;
        return (
          <Link href={`/category/${category.slug}`} key={index} className='w-full flex gap-1 items-center text-xs text-[#313133] hover:text-[#ff9900] capitalize'>
            <Icon size={16} /> {category.title}
          </Link>
        );
      })}
    </div>
  );
}
