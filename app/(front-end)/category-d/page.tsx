"use client"

import { BrandCard } from "@/components/front-end/BrandCard";
import { BrandSkeleton } from "@/components/front-end/cat-detailed-loader";
import { CategoryCard } from "@/components/front-end/detail-cat-comp";
import { HeroSection } from "@/components/front-end/HeroSection";
import { useCategories } from "@/hooks/use-categories";


export default function Page() {
  const { data: categories, isLoading } = useCategories();

  const featuredCategories = categories?.slice(0, 12) || [];
  const otherCategories = categories?.slice(12, 16) || [];

  return (
    <main className="min-h-screen bg-gray-100 md:mt-20 mt-7">
      <div className="max-w-6xl mx-auto">
        <div className="w-full bg-[#febd69] text-white text-center py-2">
          <p className="text-lg font-bold text-black">
            Exclusive Deals on Top Categories
          </p>
        </div>

        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Hero Section */}
          <HeroSection image="https://ug.jumia.is/cms/UG_WK1_NEW_YEAR_SALE_KEY_VISUAL_ONSITE_1168X384_LIVE.gif"
        />

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
            <h2 className="text-2xl font-bold text-center">Featured Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {isLoading
                ? Array(12).fill(0).map((_, i) => (
                    <BrandSkeleton key={i}/>
                  ))
                : featuredCategories.map((category) => (
                    <CategoryCard title={category.title} image={category.imageUrl} slug={category.slug} key={category.title}/>
                  ))}
            </div>
          </div>

          {/* Other Categories */}
          <div className="space-y-4">
            <h2 className="text-center text-2xl font-bold">
              Upgrade Now, Save Big
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {isLoading
                ? Array(4).fill(0).map((_, i) => (
                    <BrandSkeleton key={i} />
                  ))
                : otherCategories.map((category) => (
                    <CategoryCard title={category.title} image={category.imageUrl} slug={category.slug} key={category.title}/>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}