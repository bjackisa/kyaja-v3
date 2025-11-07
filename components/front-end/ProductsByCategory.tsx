import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ProductsByCategorySectionProps {
  categoryName: string;
  products: any;
  categorySlug: string;
  bgSecondaryColor:string
}

export default function ProductsByCategorySection({
  categoryName,
  products,
  categorySlug,
  bgSecondaryColor
}: ProductsByCategorySectionProps) {
  return (
    <div className="flex flex-col gap-6 w-full min-h-[50vh] bg-white mt-5">
      <div style={{backgroundColor:`${bgSecondaryColor}`}} className="flex items-center justify-between p-4">
        <h2 className="text-white font-bold lg:text-xl text-lg flex items-center gap-1">
          {categoryName}
        </h2>
        <Link href={`/category/${categorySlug}`} className="text-white flex items-center hover:underline">
          See all <ChevronRight size={20} />
        </Link>
      </div>
        <ScrollArea className="w-full whitespace-nowrap rounded-md px-4">
        <div className="grid grid-flow-col auto-cols-[minmax(200px,1fr)] gap-4 pb-4" style={{ gridTemplateColumns: 'repeat(5, minmax(200px, 1fr))' }}>
          {products?.slice(0, 15).map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" color="red" className='bg-[#cbd5e1]'/>
      </ScrollArea>
    </div>
  );
}