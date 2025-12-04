"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { formatMoney } from "@/lib/formatMoney";
import { ShoppingBag, Truck, Shield, ArrowRight } from "lucide-react";

export default function CartSubTotalCard({ subTotal }:any) {
  const shipping = 10.0;
  const tax = 0.0;
  const totalPrice = (
    Number(subTotal) +
    Number(shipping) +
    Number(tax)
  ).toFixed(2);

  return (
    <div className="md:col-span-4 col-span-full">
      <div className="sticky top-24 space-y-4 animate-fade-in-up">
        {/* Order Summary Card */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#ff6a00] to-[#ff4747] p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Order Summary</h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-gray-700">
              <span className="font-medium">Subtotal</span>
              <span className="font-semibold">UGX {formatMoney(subTotal)}</span>
            </div>

            {/* Shipping */}
            <div className="flex items-center justify-between text-gray-700">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#ff6a00]" />
                <span className="font-medium">Shipping</span>
              </div>
              <span className="font-semibold">UGX {formatMoney(shipping.toFixed(2))}</span>
            </div>

            {/* Tax */}
            <div className="flex items-center justify-between text-gray-700">
              <span className="font-medium">Tax</span>
              <span className="font-semibold">UGX {formatMoney(tax.toFixed(2))}</span>
            </div>

            <div className="border-t-2 border-dashed border-gray-200 my-4"></div>

            {/* Total */}
            <div className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-extrabold text-[#ff6a00]">UGX {formatMoney(totalPrice)}</span>
            </div>

            {/* Checkout Button */}
            <Button 
              asChild 
              className="w-full bg-gradient-to-r from-[#ff6a00] to-[#ff4747] hover:from-[#ff8534] hover:to-[#ff6a00] text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
            >
              <Link href="/c/checkout" className="flex items-center justify-center gap-2">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600 pt-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>

        {/* Promo Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4">
          <p className="text-sm text-gray-700 text-center">
            <span className="font-bold text-blue-600">Free shipping</span> on orders over UGX 100,000!
          </p>
        </div>
      </div>
    </div>
  );
}
