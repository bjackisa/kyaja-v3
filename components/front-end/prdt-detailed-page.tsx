"use client";
import { formatMoney } from "@/lib/formatMoney";
import Link from "next/link";
import { AiOutlineHeart, AiOutlineStar, AiTwotoneStar, AiFillHeart } from "react-icons/ai";
import { IoCall, IoCheckmarkCircle, IoShieldCheckmark } from "react-icons/io5";
import { HiShoppingCart, HiBolt, HiTruck, HiChatBubbleLeftRight } from "react-icons/hi2";
import { RiVerifiedBadgeFill, RiTimerFlashLine } from "react-icons/ri";
import { TbTruckDelivery, TbShieldCheck } from "react-icons/tb";
import { FaBox, FaHeadset } from "react-icons/fa";
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
      <div className="max-w-[90rem] mx-auto min-h-screen px-2 md:px-4 lg:px-6 relative pt-4 md:pt-8 lg:pt-10 pb-20 lg:pb-8">
        <div className="flex flex-col gap-3 md:gap-4 md:mt-[3%] mt-[20%]">
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
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 md:gap-4">
            {/* Product Details */}
            <div className="xl:col-span-9 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="grid lg:grid-cols-5 gap-4 p-3 md:p-5">
                {/* Product Images */}
                <div className="lg:col-span-2">
                  <ProductSlider data={product.productImages} />
                  
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs font-medium text-gray-500 mb-2">SHARE</p>
                    <ShareBlog productUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/product/${slug}`} />
                  </div>
                </div>

                {/* Product Info */}
                <div className="lg:col-span-3 space-y-3">
                  {/* Header */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-medium mb-2">
                        {product.category?.title}
                      </div>
                      <h1 className="text-base md:text-lg font-bold text-gray-900 leading-snug line-clamp-2">
                        {product.title}
                      </h1>
                    </div>
                    <button className="p-2 hover:bg-orange-50 rounded-lg transition-colors flex-shrink-0">
                      <AiOutlineHeart className="text-xl text-orange-500" />
                    </button>
                  </div>

                  {/* Ratings & Stats */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) =>
                        i < (reviewsData?.averageRating || 0) ? (
                          <AiTwotoneStar key={i} className="text-sm text-orange-400" />
                        ) : (
                          <AiOutlineStar key={i} className="text-sm text-gray-300" />
                        )
                      )}
                      <span className="font-semibold text-gray-900 ml-1">
                        {reviewsData?.averageRating?.toFixed(1) || '0.0'}
                      </span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-600">{reviewsData?.reviews?.length || 0} reviews</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-600">{product.salesCount || 0} sold</span>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-3 border border-orange-200">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-xl md:text-2xl font-black text-gray-900">
                        UGX {formatMoney(product.salePrice < 1 ? product.productPrice : product.salePrice)}
                      </span>
                      {product.salePrice > 0 && (
                        <span className="line-through text-gray-400 text-sm">
                          UGX {formatMoney(product.productPrice)}
                        </span>
                      )}
                      {product.isDiscount && discount > 0 && (
                        <span className="bg-orange-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                          -{discount.toFixed(0)}%
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center gap-2 text-sm">
                    <IoCheckmarkCircle className="text-green-500 text-base" />
                    <span className="text-green-600 font-medium">{product.productStock} in stock</span>
                  </div>

                  {/* Quick Info */}
                  <div className="bg-blue-50 rounded-lg p-3 text-xs text-gray-700 border border-blue-100">
                    <div className="flex items-start gap-2">
                      <TbTruckDelivery className="text-blue-600 text-base flex-shrink-0 mt-0.5" />
                      <span>Delivery fees apply after checkout. Free delivery on orders over UGX 100,000</span>
                    </div>
                  </div>

                  {/* Action Buttons - Desktop */}
                  <div className="hidden lg:grid grid-cols-2 gap-2 pt-2">
                    <button className="flex flex-col items-center justify-center gap-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-3 font-semibold transition-colors">
                      <HiBolt className="text-xl" />
                      <span className="text-sm">Buy Now</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-1 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 rounded-lg py-3 font-semibold transition-colors">
                      <HiShoppingCart className="text-xl" />
                      <span className="text-sm">Add to Cart</span>
                    </button>
                  </div>

                  {/* Special Offers */}
                  <div className="pt-3 border-t">
                    <SpecialOffers />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Info Sidebar */}
            <div className="xl:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-20">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <TbShieldCheck className="text-green-600 text-base" />
                  Delivery & Support
                </h3>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-green-50 transition-colors group">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <HiTruck className="text-green-600 text-sm" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-900">Fast Delivery</p>
                      <p className="text-xs text-gray-600 leading-relaxed">24-48hrs in Kampala</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-blue-50 transition-colors group">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <IoShieldCheckmark className="text-blue-600 text-sm" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-900">Pay on Delivery</p>
                      <p className="text-xs text-gray-600 leading-relaxed">Cash or Mobile Money</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-orange-50 transition-colors group">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <FaHeadset className="text-orange-600 text-sm" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-900">24/7 Support</p>
                      <p className="text-xs text-gray-600 leading-relaxed">Always here to help</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
            <h2 className="text-base font-bold text-gray-900 mb-3">Product Details</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900">Customer Reviews</h2>
              {reviewsData?.reviews?.length > 0 && (
                <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
                  <AiTwotoneStar className="text-orange-500 text-sm" />
                  <span className="text-sm font-bold text-gray-900">{reviewsData.averageRating?.toFixed(1)}</span>
                </div>
              )}
            </div>

            {reviewsData?.reviews?.length > 0 ? (
              <div className="space-y-3">
                {reviewsData.reviews.map((review) => (
                  <div key={review.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                        {review.user.name?.[0]?.toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-semibold text-gray-900">{review.user.name}</p>
                          <div className="flex">
                            {[...Array(5)].map((_, i) =>
                              i < review.rating ? (
                                <AiTwotoneStar key={i} className="text-xs text-orange-500" />
                              ) : (
                                <AiOutlineStar key={i} className="text-xs text-gray-300" />
                              )
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AiOutlineStar className="text-3xl text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No reviews yet</p>
              </div>
            )}
          </div>

          <ReviewForm id={product.id} />

          {/* Similar Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
            <h2 className="text-base font-bold text-gray-900 mb-4">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {similarProducts.map((product) => (
                <Product key={product.id} product={product} showAddToCart={true}/>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Actions */}
      <div className="lg:hidden fixed bottom-[4.5rem] left-0 right-0 bg-white border-t shadow-lg z-40">
        <div className="grid grid-cols-3 divide-x">
          <button className="flex flex-col items-center justify-center py-3 hover:bg-orange-50 transition-colors">
            <HiShoppingCart className="text-xl text-orange-500 mb-1" />
            <span className="text-xs font-medium text-gray-700">Cart</span>
          </button>
          <button className="flex flex-col items-center justify-center py-3 bg-orange-500 hover:bg-orange-600 transition-colors">
            <HiBolt className="text-xl text-white mb-1" />
            <span className="text-xs font-semibold text-white">Buy Now</span>
          </button>
          <Link href="tel:0752815998" className="flex flex-col items-center justify-center py-3 hover:bg-green-50 transition-colors">
            <IoCall className="text-xl text-green-600 mb-1" />
            <span className="text-xs font-medium text-gray-700">Call</span>
          </Link>
        </div>
      </div>
    </>
  );
}
