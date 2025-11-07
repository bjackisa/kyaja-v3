import React from "react";
import Product from "./ProductCard";
import { ProductTypes } from "@/types";

type SubCategoriesCompProps = {
  subCategoriesData: ProductTypes[];
};

export default function SubCategoriesComp({subCategoriesData}:SubCategoriesCompProps | any) {
 
  return (
   <div className="flex flex-col gap-6 w-full min-h-[50%] bg-white rounded-lg lg:p-5 p-3">
    <div className="flex items-center justify-between">
      <h2 className="text-[#313133] font-semibold lg:tracking-normal lg:text-lg text-sm">All products</h2>
   
    </div>
    <div className="grid md:grid-cols-4 grid-cols-2 lg:grid-cols-5 gap-4 px-3">
    {subCategoriesData && subCategoriesData.length > 0 ? (
        subCategoriesData.map((product:any)=>{
          <Product product={product}  />
        })
      ) : (
        <p className="text-black text-lg animate-pulse line-clamp-1">No products found for this subcategory.</p>
      )}
    </div>
    <div>
   
    </div>
   </div>
  );
}
