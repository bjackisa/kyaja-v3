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
      <div className="max-w-[90rem] mx-auto min-h-screen px-3 md:px-6 lg:px-8 relative pt-3 md:pt-6 lg:pt-8 pb-24 lg:pb-8">
        <div className="flex flex-col gap-4 md:gap-6 mt-2 md:mt-4">
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
          <div className="w-full flex flex-col xl:flex-row gap-4 md:gap-6">
            {/* Product Details */}
            <div className="xl:w-3/4 w-full bg-white flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
              {/* Product Images */}
              <div className="lg:w-2/5 w-full flex flex-col p-4 md:p-6 bg-gradient-to-br from-gray-50 to-white">
                <ProductSlider data={product.productImages} />
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Share This Product
                  </h3>
                  <ShareBlog
                    productUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/product/${slug}`}
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="lg:w-3/5 w-full flex flex-col p-4 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      {product.category?.title}
                    </div>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                      {product.title}
                    </h1>
                  </div>
                  <button className="p-3 hover:bg-orange-50 rounded-full transition-all duration-300 group">
                    <AiOutlineHeart className="text-2xl text-orange-500 group-hover:scale-110 transition-transform" />
                  </button>
                </div>

                {/* Pricing Section */}
                <div className="bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-50 p-5 rounded-2xl border border-orange-200 mb-6">
                  <div className="flex gap-3 items-baseline flex-wrap">
                    <h2 className="text-2xl md:text-3xl text-gray-900 font-black">
                      UGX {formatMoney(product.salePrice < 1 ? product.productPrice : product.salePrice)}
                    </h2>
                    {product.salePrice > 0 && (
                      <h3 className="line-through text-gray-400 text-base md:text-lg font-medium">
                        UGX {formatMoney(product.productPrice)}
                      </h3>
                    )}
                  </div>
                  {product.isDiscount && discount > 0 && (
                    <div className="mt-3 inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold">
                      <MdStars className="text-lg" />
                      Save {discount.toFixed(0)}% Today!
                    </div>
                  )}
                </div>

                {/* Stock and Rating */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-base font-semibold">
                      {product.productStock} Items In Stock
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                    <div className="flex items-center gap-2">
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
                      <span className="text-sm font-semibold text-gray-900">
                        {reviewsData?.averageRating?.toFixed(1) || '0.0'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <span className="font-semibold text-purple-600">
                          {reviewsData?.reviews?.length || 0}
                        </span>
                        reviews
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="flex items-center gap-1">
                        <span className="font-semibold text-gray-900">
                          {product.salesCount || 0}
                        </span>
                        sold
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <MdLocalShipping className="text-blue-600 text-lg flex-shrink-0 mt-0.5" />
                    <p>
                      <span className="font-semibold text-gray-900">Free delivery</span> on orders over UGX 100,000. Delivery fees apply otherwise.
                    </p>
                  </div>
                </div>

                {/* Action Buttons - Desktop */}
                <div className="hidden lg:flex gap-3 mb-6">
                  <div className="flex-1">
                    <LargeBookNowBtn product={product} session={session} />
                  </div>
                  <div className="w-14">
                    <AddToCart product={product} />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <SpecialOffers />
                </div>
              </div>
            </div>

            {/* Delivery & Returns Sidebar */}
            <div className="xl:w-1/4 w-full">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 sticky top-24">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-5 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">
                    Delivery & Returns
                  </h3>
                </div>

                <div className="p-5 space-y-4">
                  <div className="group hover:bg-green-50 p-4 rounded-xl border-2 border-transparent hover:border-green-200 transition-all duration-300">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <MdLocalShipping className="text-green-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1">
                          Fast Delivery
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Delivery within 24-48 hours in Kampala. Pay delivery fees on arrival.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group hover:bg-blue-50 p-4 rounded-xl border-2 border-transparent hover:border-blue-200 transition-all duration-300">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <MdSecurity className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1">
                          Secure Payment
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Pay when you receive your order. Cash or Mobile Money accepted.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group hover:bg-orange-50 p-4 rounded-xl border-2 border-transparent hover:border-orange-200 transition-all duration-300">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <BiSupport className="text-orange-600 text-xl" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1">
                          24/7 Support
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Round-the-clock customer support for all your queries and concerns.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <div className="bg-gradient-to-r from-gray-50 to-white p-5 md:p-6 border-b border-gray-200">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Product Details
              </h2>
            </div>
            <div className="p-5 md:p-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-5 md:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Customer Reviews
                </h2>
                {reviewsData?.reviews?.length > 0 && (
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                    <AiTwotoneStar className="text-orange-500 text-lg" />
                    <span className="font-bold text-gray-900">
                      {reviewsData.averageRating?.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({reviewsData.reviews.length})
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="p-5 md:p-6">
              {reviewsData?.reviews?.length > 0 ? (
                <div className="space-y-4">
                  {reviewsData.reviews.map((review) => (
                    <div 
                      key={review.id} 
                      className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-orange-200 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {review.user.name?.[0]?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{review.user.name}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              {[...Array(5)].map((_, i) =>
                                i < review.rating ? (
                                  <AiTwotoneStar
                                    key={i}
                                    className="text-sm text-orange-500"
                                  />
                                ) : (
                                  <AiOutlineStar
                                    key={i}
                                    className="text-sm text-gray-300"
                                  />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AiOutlineStar className="text-3xl text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">No reviews yet</p>
                  <p className="text-gray-400 text-sm mt-1">Be the first to review this product</p>
                </div>
              )}
            </div>
          </div>

          <ReviewForm id={product.id} />

          {/* Similar Products */}
          <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 md:p-6 border-b border-gray-200">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                You May Also Like
              </h2>
            </div>
            <div className="p-5 md:p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                {similarProducts.map((product) => (
                  <Product key={product.id} product={product} showAddToCart={true}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Actions */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
        <div className="p-3">
          <div className="flex gap-2 items-center max-w-7xl mx-auto">
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
              className="w-12 h-12 flex items-center justify-center text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-colors shadow-lg"
            >
              <IoCall size={20} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
