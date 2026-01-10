import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/formatMoney";
import { generateSlug } from "@/lib/generateSlug";
import { getData } from "@/lib/getData";
import { CheckCircle2, Package, CreditCard, MapPin, Eye, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

// Enhanced Loading Skeleton Component
const OrderSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-t-xl p-8 text-center border-b">
        <div className="w-16 h-16 mx-auto rounded-full bg-gray-200 dark:bg-gray-600 animate-pulse mb-4"></div>
        <div className="h-8 w-72 mx-auto bg-gray-200 dark:bg-gray-600 rounded animate-pulse mb-2"></div>
        <div className="h-5 w-56 mx-auto bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
      </div>

      {/* Content Skeleton */}
      <div className="bg-white dark:bg-slate-800 rounded-b-xl shadow-lg overflow-hidden">
        {/* Action Buttons Skeleton */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <div className="h-12 w-40 bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse"></div>
            <div className="h-12 w-40 bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Info Grid Skeleton */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-5 w-32 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-40 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                  <div className="h-4 w-48 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Items Skeleton */}
        <div className="p-6">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-600 rounded animate-pulse mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-48 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                </div>
                <div className="text-right space-y-2">
                  <div className="h-5 w-24 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Order Details Component
const OrderDetails = async ({ id }) => {
  const order = await getData(`orders/${id}`);
  
  if (!order) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 text-center">
        <div className="text-red-500 mb-4">
          <Package className="w-16 h-16 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Order Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300">We couldnt find the order youre looking for.</p>
      </div>
    );
  }

  const subTotal = order?.orderItems?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;
  const ugxTotal = Math.round(subTotal);
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-t-xl p-8 text-center border-b border-green-200 dark:border-slate-600">
        <div className="relative">
          <div className="absolute inset-0 bg-green-500/10 dark:bg-green-400/10 rounded-full w-20 h-20 mx-auto animate-pulse"></div>
          <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 dark:text-green-400 relative z-10" />
        </div>
        
        <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
          Order Confirmed!
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
          Thank you for your purchase. Order #{order.orderNumber}
        </p>
        <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
          <Package className="w-4 h-4 mr-2" />
          Ready to ship
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-slate-800 rounded-b-xl shadow-lg overflow-hidden">
        
        {/* Action Buttons */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-750">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
              <Link href={`/dashboard/orders/${id}/invoice`} className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                View Invoice
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-gray-300 dark:border-gray-600">
              <Link href="/" className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>

        {/* Order Information Grid */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Shipping Address */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  Shipping Address
                </h3>
              </div>
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="font-medium text-gray-900 dark:text-white">
                  {order.name}
                </p>
                <p className="mt-1 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {order.address}
                </p>
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  Payment Method
                </h3>
              </div>
              <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="font-medium text-gray-900 dark:text-white">
                  {order.paymentMethod}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Order Items ({order.orderItems?.length || 0})
          </h3>

          <div className="space-y-4">
            {order.orderItems?.length > 0 ? (
              order.orderItems.map((item, i) => {
                const slug = generateSlug(item.title);
                return (
                  <div
                    key={`item-${i}-${item.id || item.title}`}
                    className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden">
                        <Image
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          src={item.imageUrl}
                          alt={item.title}
                       
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        UGX {formatMoney(item.price)} × {item.quantity}
                      </p>
                      <Button variant="link" size="sm" asChild className="p-0 h-auto mt-2">
                        <Link href={`/p/${slug}`} className="text-blue-600 hover:text-blue-700">
                          View Product →
                        </Link>
                      </Button>
                    </div>

                    {/* Price */}
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-lg text-gray-900 dark:text-white">
                        UGX {formatMoney(Math.round(item.price * item.quantity))}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No items found in this order.
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-6 bg-gray-50 dark:bg-slate-750">
          <div className="max-w-md ml-auto space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
              <span className="font-medium text-gray-900 dark:text-white">
                UGX {formatMoney(ugxTotal)}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
              <span className="text-gray-600 dark:text-gray-300">Shipping</span>
              <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                To be communicated
              </span>
            </div>
            
            <div className="flex justify-between items-center py-3 bg-white dark:bg-slate-800 px-4 rounded-lg border-2 border-green-200 dark:border-green-700">
              <span className="text-base font-semibold text-gray-900 dark:text-white">
                Total
              </span>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                UGX {formatMoney(ugxTotal)}
              </span>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
              * Final shipping cost will be communicated before delivery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main page component
export default function Page({ params: { id } }) {
  return (
    <section className="min-h-screen py-8 px-4 sm:py-12 lg:py-16 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto max-w-6xl">
        <Suspense fallback={<OrderSkeleton />}>
          <OrderDetails id={id} />
        </Suspense>
      </div>
    </section>
  );
}
