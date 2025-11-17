"use client";
import HomeBanner from "@/components/front-end/home-banner";
import HomeCategories from "@/components/front-end/home-categories";
import DetailedCategories from "@/components/front-end/detailed-categories";
import { useHomeBanners } from "@/hooks/use-banners";
import { useTopDealsProducts } from "@/hooks/use-products";
import { SkeletonBanner } from "@/components/front-end/SkeletonBanner";
import { useDepartmentSections } from "@/hooks/use-home-hook";
import { SkeletonCat } from "@/components/front-end/cat-skeleton";
import { useDepartmentCategories } from "@/hooks/use-categories";
import { CatSkeleton } from "@/components/front-end/prdt-skeleton";
import RecentlyViewedProducts from "@/components/front-end/recently-viewed";

export default function Home() {
  const { banners, isLoadingHomeBanner } = useHomeBanners();
  const { topDeals, isLoadingTopDeals } = useTopDealsProducts();
  const { sections, isLoading: isLoadingDepartments } = useDepartmentSections();
  const { 
    data: departments = [], 
    isLoading: isLoadingDepartmentsAndCat 
  } = useDepartmentCategories();

  console.log("Banners:", banners);
  console.log("Top Deals:", topDeals);
  console.log("Sections:", sections);
  console.log("Departments:", departments);

  try {
    return (
      <div className="min-h-[100vh] pb-5 [family-name:var(--font-geist-sans)] flex flex-col gap-3 px-2 lg:max-w-[86rem] mx-auto">
        <div className="w-full home-bg md:pt-[1rem] pt-[2.8rem] lg:pt-[3.2rem]">
          {isLoadingTopDeals || isLoadingHomeBanner ? (
            <SkeletonBanner />
          ) : (
            <HomeBanner banners={banners} topDeals={topDeals} />
          )}
        </div>
  
        <div className="flex flex-col gap-4">
          {isLoadingDepartments ? (
            <SkeletonCat />
          ) : (
            sections.map((section) => (
              <HomeCategories
                key={section.title}
                title={section.title}
                departments={section.departments}
              />
            ))
          )}

          {isLoadingDepartmentsAndCat ? (
            <CatSkeleton />
          ) : (
            <DetailedCategories departments={departments} />
          )}

          <RecentlyViewedProducts />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error", error);
    return <div>Something went wrong. Please try again later.</div>;
  }
}