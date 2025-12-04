"use client";
import { formatMoney } from "@/lib/formatMoney";
import Link from "next/link";
import { AiOutlineHeart, AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { GrDeliver } from "react-icons/gr";
import { IoCall } from "react-icons/io5";
import { MdStars, MdLocalShipping, MdSecurity } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import Product from "@/components/front-end/ProductCard";
import AddToCart from "@/components/front-end/AddToCart";
import ProductSlider from "@/components/front-end/ProductSlider";
import LargeBookNowBtn from "@/components/front-end/LargeBookNowBtn";
import ShareBlog from "@/components/front-end/ShareBlog";
import { useSession } from "next-auth/react";
import { useProductQuery, useSimilarProductsQuery } from "@/hooks/use-products";
import { useReviewsQuery } from "@/hooks/use-reviews";
import ProductSkeleton from "./product-detailed-skeleton";
import PrdtBreadCrumb from "./PrdtBreadCrumb";
import ReviewForm from "./ReviewForm";
import SpecialOffers from "./SpecialOffers";

export default function ProductDetailPage({ slug }: { slug: string }) {
  const { data: session } = useSession();
  
  const { 
    data: product, 
    isLoading, 
    error 
  } = useProductQuery(slug);

  const {
    data: similarProducts = [],
    isLoading: isLoadingSimilar
  } = useSimilarProductsQuery(
    product?.categoryId ?? '',
    product?.id ?? '',
  );

  const { data: reviewsData } = useReviewsQuery(product?.id ?? "");

  if (isLoading) return <ProductSkeleton />;
  if (error) return <div className="text-center text-red-500 p-8">Error: {(error as Error).message}</div>;
  if (!product) return <div className="text-center text-gray-500 p-8">Product not found</div>;

  const discount = product.isDiscount ? product.discount : 0;

  return (
    <>
      <div className="max-w-[90rem] mx-auto min-h-screen px-2 md:px-6 lg:px-8 roboto relative pt-3 md:pt-6 lg:pt-8">
       
        
        <div className="flex flex-col md:gap-6 gap-2 md:mt-[3%] mt-[20%]">
           <PrdtBreadCrumb 
          product={{
            title: product.title,
            slug: product.slug,
            department: {
              title: product.department.title,
              slug: product.department.slug
            },
            category: product.category ? {
              title: product.category.title,
              slug: product.category.slug
            } : undefined,
            subCategory: product.subCategory ? {
              title: product.subCategory.title,
              slug: product.subCategory.slug
            } : undefined
          }} 
        />
          {/* Main Product Section */}
          <div className="w-full min-h-[95vh] justify-between flex flex-col xl:flex-row gap-4 ">
            {/* Product Details */}
            <div className="xl:w-3/4 w-full bg-white flex flex-col lg:flex-row p-4 md:p-6 gap-4 md:gap-6 shadow-sm rounded-lg border border-gray-200">
              {/* Product Images */}
              <div className="lg:w-2/5 w-full flex flex-col gap-6">
                <ProductSlider data={product.productImages} />
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Share Product</h3>
                  <div className="flex gap-3 items-center">
                    <ShareBlog
                      productUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/product/${slug}`}
                    />
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="lg:w-3/5 w-full flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm text-blue-600 font-bold mb-2">{product.category?.title}</p>
                    <h1 className="text-lg lg:text-xl font-bold text-gray-900 leading-tight line-clamp-2">
                      {product.title}
                    </h1>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <AiOutlineHeart className="text-2xl text-orange-500 hover:text-orange-600" />
                  </button>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                {/* Pricing Section */}
                <div className="bg-[#fff5f0] p-4 rounded-lg border border-[#ffe4d6]">
                  <div className="flex gap-2.5 items-center flex-wrap">
                    <h2 className="text-2xl text-[#ff6a00] font-bold">
                      UGX {formatMoney(product.salePrice < 1 ? product.productPrice : product.salePrice)}
                    </h2>
                    {product.salePrice > 0 && (
                      <h3 className="line-through text-gray-400 text-base">
                        UGX {formatMoney(product.productPrice)}
                      </h3>
                    )}
                    {product.isDiscount && discount > 0 && (
                      <span className="bg-[#ff4747] text-white px-2.5 py-1 rounded text-xs font-bold shadow-sm">
                        -{discount.toFixed(0)}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* Stock and Rating */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-[#00c853] font-semibold">
                      ✓ {product.productStock} Items In Stock
                    </p>
                    <p className="text-xs text-gray-500">
                      🚚 Delivery fees calculated at checkout
                    </p>
                    <div className="flex gap-3 items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) =>
                          i < (reviewsData?.averageRating || 0) ? (
                            <AiTwotoneStar
                              key={i}
                              className="text-xl text-orange-500"
                            />
                          ) : (
                            <AiOutlineStar
                              key={i}
                              className="text-xl text-gray-300"
                            />
                          )
                        )}
                      </div>
                      <p className="text-sm text-purple-600 font-medium">
                        ({reviewsData?.reviews?.length || 0} verified ratings)
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {product.salesCount || 0} times bought
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="hidden lg:flex gap-3">
                    <AddToCart product={product} />
                    <LargeBookNowBtn product={product} session={session} />
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                </div>

                {/* Promotions */}
                <SpecialOffers />
              </div>
            </div>

            {/* Delivery & Returns Sidebar */}
            <div className="xl:w-1/4 w-full bg-white shadow-lg rounded-xl p-6 border border-gray-100 h-fit">
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Delivery & Returns
                  </h3>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <MdLocalShipping className="text-green-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">
                        Door Delivery
                      </h4>
                      <p className="text-xs text-gray-600">
                        Delivery within 24-48 hours in Kampala. Pay delivery fees on arrival.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <MdSecurity className="text-blue-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">
                        Pay on Delivery
                      </h4>
                      <p className="text-xs text-gray-600">
                        Pay when you receive your order. Cash or Mobile Money accepted.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <BiSupport className="text-orange-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">
                        Customer Support
                      </h4>
                      <p className="text-xs text-gray-600">
                        24/7 customer support for all your queries and concerns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full bg-white p-6 shadow-lg rounded-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Product Details
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="w-full bg-white p-6 shadow-lg rounded-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Customer Reviews
            </h2>
            {reviewsData?.reviews?.length > 0 ? (
              <div className="flex flex-col gap-4">
                {reviewsData.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) =>
                          i < review.rating ? (
                            <AiTwotoneStar
                              key={i}
                              className="text-lg text-orange-500"
                            />
                          ) : (
                            <AiOutlineStar
                              key={i}
                              className="text-lg text-gray-300"
                            />
                          )
                        )}
                      </div>
                      <p className="font-semibold">{review.user.name}</p>
                    </div>
                    <p className="text-gray-600 mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
          <ReviewForm id={product.id} />

          {/* Similar Products */}
          <div className="w-full bg-white p-6 shadow-lg rounded-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {similarProducts.map((product) => (
                <Product key={product.id} product={product} showAddToCart={true}/>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Actions */}
      <div className="lg:hidden fixed bottom-[6%] left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <div className="flex gap-3 items-center max-w-7xl mx-auto">
          <div className="w-12">
            <AddToCart product={product} />
          </div>
          <div className="flex-1">
            <LargeBookNowBtn
              product={product}
              backgroundColor="#f68b1e"
              session={session}
            />
          </div>
          <Link
            href="tel:0752815998"
            className="w-12 h-12 flex items-center justify-center text-orange-500 border-2 border-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
          >
            <IoCall size={20} />
          </Link>
        </div>
      </div>
    </>
  );
}