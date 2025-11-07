"use client"

import { BrandCard } from "@/components/front-end/BrandCard";
import { BrandSkeleton } from "@/components/front-end/cat-detailed-loader";
import { CategoryCard } from "@/components/front-end/detail-cat-comp";
import { HeroSection } from "@/components/front-end/HeroSection";
import { useActiveDepartment } from "@/hooks/use-departments";


export default function Page() {
  const { data: departments, isLoading } = useActiveDepartment();


  return (
    <main className="min-h-screen bg-gray-100 md:mt-20 mt-7">
      <div className="max-w-6xl mx-auto">
        <div className="w-full bg-[#febd69] text-white text-center py-2">
          <p className="text-lg font-bold text-black">
            Exclusively  Top Departments
          </p>
        </div>

        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Hero Section */}
          <HeroSection image="https://ug.jumia.is/cms/weather_INITIATIVES_2_SX_1168X384.gif"/>

          {/* Brand Cards */}
          {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {isLoading
              ? Array(6).fill(0).map((_, i) => (
                  <BrandSkeleton key={i} />
                ))
              : featuredCategories.map((brand) => (
                  <BrandCard key={brand.title} title={brand.title} image={brand.imageUrl} slug={brand.slug}/>
                ))}
          </div> */}

          {/* Featured Categories */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Featured Departments</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {isLoading
                ? Array(12).fill(0).map((_, i) => (
                    <BrandSkeleton key={i}/>
                  ))
                : departments.map((category) => (
                    <CategoryCard title={category.title} image={category.imageUrl} slug={category.slug} key={category.title}/>
                  ))}
            </div>
          </div>

        
        </div>
      </div>
    </main>
  );
}