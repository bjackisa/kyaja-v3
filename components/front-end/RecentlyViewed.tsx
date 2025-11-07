"use client"
import React from "react";
import ProductCard from "./ProductCard";
import { useCart } from "../CartContext";

export default function RecentlyViewed() {
  const { recentlyViewedProducts }:any = useCart();
  if(!recentlyViewedProducts){
    return null
  }
  return (
   <div className="flex flex-col gap-6 w-full min-h-[60vh] bg-white rounded-lg lg:p-5 p-3 mt-5">
    <div className="flex items-center justify-between">
      <h2 className="text-[#313133] font-semibold lg:tracking-normal lg:text-lg text-sm">Your Last Viewed Products</h2>
    </div>

    <div className="grid md:grid-cols-4 grid-cols-2 lg:grid-cols-5 lg:gap-4 gap-4 px-3">
      {recentlyViewedProducts.slice(0 , 4)?.map((product:any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
   </div>
  );
}
