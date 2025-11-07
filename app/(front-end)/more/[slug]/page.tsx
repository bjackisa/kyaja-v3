import React, { Suspense } from "react";
import { getAllProducts } from "@/actions/products";
import Product from "@/components/front-end/ProductCard";
import { ProductCardsSkeleton } from "@/components/KyajaSkeleton"; 


async function ProductsList({ slug }: { slug: string }) {
  const allProducts: any | null = await getAllProducts();
  const products = allProducts?.filter((item: any) => item.type === slug);

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 lg:grid-cols-5 gap-4 px-3">
      {products && products.length > 0 ? (
        products.map((product: any) => (
          <Product key={product.id} product={product} />
        ))
      ) : (
        <p className="text-black text-lg animate-pulse">No products found</p>
      )}
    </div>
  );
}

export default function Page({ params: { slug } }: any) {
  return (
    <div className="flex flex-col gap-6 w-full min-h-[50%] bg-white rounded-lg lg:p-5 p-3">
      <div className="flex items-center justify-between">
        <h2 className="text-[#313133] font-semibold lg:tracking-normal lg:text-lg text-sm">All products</h2>
      </div>
      
      <Suspense fallback={<ProductCardsSkeleton />}>
        <ProductsList slug={slug} />
      </Suspense>
    </div>
  );
}
