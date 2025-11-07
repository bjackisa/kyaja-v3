
import ProductCard from "./ProductCard";
import { Product, ProductTypes } from "@/types";

export default function CatPrdts({products }:{products:Product[]}) {
 
  return (
   <div className="flex flex-col gap-6 w-full min-h-[50%] bg-white">
    <div className="flex items-center justify-between bg-[#fff] p-4">
      <h2 className="text-[#000] font-bold lg:tracking-normal lg:text-lg text-lg flex items-center gap-1 pt-4">All Products</h2>
    
    </div>
    <div  className="grid md:grid-cols-4 grid-cols-2 lg:grid-cols-4 px-3 gap-4 lg:px-2">
      {products.map((product , i) => (
       <div key={i}>
         <ProductCard product={product}/>
       </div>
      ))}
    </div>
   </div>
  );
}
