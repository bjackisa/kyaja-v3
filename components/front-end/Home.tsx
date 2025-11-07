// Import all the necessary components
import FlashSales from "@/components/front-end/FlashSales";
import TopOffers from "@/components/front-end/TopOffers";
import HomeCategoryCards from "@/components/front-end/HomeCategoryCards";
import HomeBanners from "@/components/HomeBanners";
import { HomeSkeleton, CategorySkeleton, ProductCardsSkeleton } from '@/components/KyajaSkeleton';
import RecentlyViewed from '@/components/front-end/RecentlyViewed';

// Define types based on your Prisma schema
type Product = {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  productImages: string[];
  description?: string;
  isActive: boolean;
  isWholesale: boolean;
  sku?: string;
  barcode?: string;
  productCode?: string;
  unit?: string;
  productPrice: number;
  salePrice: number;
  wholesalePrice?: number;
  wholesaleQty?: number;
  productStock?: number;
  qty?: number;
  tags: string[];
  categoryId: string;
  subCategoryId: string;
  type?: string;
}[];

type Category = {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  description?: string;
  isActive: boolean;
  icon?: string;
};

type Banner = {
  id: string;
  title?: string;
  link?: string;
  imageUrl: string;
  previewImageUrl?: string;
  isActive: boolean;
  productIds: string[];
};



// Main component with fetched data passed as props
export default function Home({
  bannerData,
  categoriesWithProducts,
  flashProducts,
  topProducts,
}: {
  bannerData: Banner[];
  categoriesWithProducts: Category[];
  flashProducts: Product[];
  topProducts: Product[];
}|any) {
  return (
    <div className="bg-[#10A2AF] min-h-[100vh] pb-5 [family-name:var(--font-geist-sans)]">
      <div style={{ backgroundImage: `url("https://utfs.io/f/edeb1895-1108-49c1-a634-ece1d1630774-zgvybo.webp")` }} className="w-full min-h-[90vh] home-bg lg:px-[6rem] md:pt-[3rem] pt-[2rem] lg:pt-[3.2rem]">
        {bannerData.length > 0 ? (
          <HomeBanners banners={bannerData} categories={categoriesWithProducts} />
        ) : (
          <HomeSkeleton />
        )}

        {categoriesWithProducts.length > 0 ? (
          <HomeCategoryCards />
        ) : (
          <CategorySkeleton />
        )}
      </div>

      <div className="w-full min-h-[100vh] lg:px-[6rem] md:pt-[1rem] pt-[1rem]">
        {flashProducts.length > 0 ? (
          <FlashSales products={flashProducts} />
        ) : (
          <ProductCardsSkeleton />
        )}

        {topProducts.length > 0 ? (
          <TopOffers products={topProducts} />
        ) : (
          <ProductCardsSkeleton />
        )}

        <RecentlyViewed />
      </div>
    </div>
  );
}
