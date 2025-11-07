"use client";
import React, { useEffect, useMemo } from "react";
import { CategoryNav } from "./CategoryNav";
import { FilterSidebar } from "./FilterSidebar";
import { useSubCatDetails } from "@/hooks/use-departments";
import { CatDetailedSkeleton } from "./CatDetSkeleton";
import { Loader2 } from "lucide-react";
import ProductCard from "./ProductCard";
import { useInView } from "react-intersection-observer";
import { useInfiniteSubProducts } from "@/hooks/use-products";
import { useFetchCategories, useFetchCategoriesForCat } from "@/hooks/use-categories";

interface DetailedPageProps {
  slug: string;
}

const SubPage: React.FC<DetailedPageProps> = ({ slug }) => {
  const { ref, inView } = useInView();
  const { categories: otherCategories, isLoading: isFetchingCategories } =
  useFetchCategoriesForCat();

  console.log(otherCategories)
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteSubProducts(slug);

  const { data: department, isLoading: isLoadingDepartments } =
  useSubCatDetails(slug);

  // Fetch next page when in view
  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const products = useMemo(
    () =>
      data?.pages.flatMap((page) => page.products) ?? [],
    [data]
  );
  // Loading Skeleton
  if (status === "pending" || isLoadingDepartments || isFetchingCategories) {
    return (
      <div className="w-full h-screen">
        <CatDetailedSkeleton />
      </div>
    );
  }

  // Error State
  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen md:pt-[1rem] pt-[2.8rem] lg:pt-[3.2rem]">
      <div className="sticky top-0 z-10 bg-white border-b md:hidden block mt-[10%]">
        <CategoryNav otherCategories={otherCategories} />
      </div>

      <div className="md:max-w-7xl w-full mx-auto px-4 pb-8 pt-3 md:pt-10">
        <div className="flex items-center justify-between px-4 md:py-4 border-t">
          <h1 className="text-xl font-semibold md:block hidden">
            {department?.title}
          </h1>
        </div>
        <div className="flex gap-8">
          <FilterSidebar otherCategories={otherCategories} />
          <div className="flex-1">
            <div className="flex items-center justify-between px-4 py-4 border-t">
              <h2 className="text-sm font-bold">Recommended</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products && products.length > 0 ? (
  products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))
) : (
  <div className="text-sm whitespace-nowrap">
    <p>No products available at the moment. Please check back later 👌!</p>
  </div>
)}

              {/* Loading more trigger */}
              <div ref={ref} className="col-span-full flex justify-center py-4">
                {isFetchingNextPage && (
                  <Loader2 className="h-6 w-6 animate-spin" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SubPage);
