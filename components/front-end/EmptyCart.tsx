import Link from "next/link";
import React from "react";
import CustomImage from "../ui/CustomImage";
import { Button } from "../ui/button";
import { ShoppingCart, ArrowRight, Sparkles } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="flex items-center flex-col justify-center py-16 px-4 animate-fade-in-up">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border-2 border-gray-100">
        {/* Animated Icon */}
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff6a00] to-[#ff4747] rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-full">
            <ShoppingCart className="w-24 h-24 text-[#ff6a00] animate-bounce-subtle" />
          </div>
        </div>

        {/* Image */}
        <div className="mb-6 relative">
          <CustomImage
            src="/empty-cart.jpg"
            className="w-64 h-auto mx-auto rounded-2xl shadow-lg"
            alt="empty cart kyaja.com"
            width={256}
            height={256}
          />
          <Sparkles className="absolute top-4 right-8 w-8 h-8 text-yellow-400 animate-pulse" />
        </div>

        {/* Text */}
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Your Cart is Empty!</h2>
        <p className="text-gray-600 mb-8 text-lg">
          Looks like you haven't added anything to your cart yet. Start shopping and discover amazing products!
        </p>

        {/* CTA Button */}
        <Button 
          asChild 
          className="w-full bg-gradient-to-r from-[#ff6a00] to-[#ff4747] hover:from-[#ff8534] hover:to-[#ff6a00] text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
        >
          <Link href="/" className="flex items-center justify-center gap-2">
            Start Shopping
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>

        {/* Decorative Elements */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300"></div>
          <span>Discover thousands of products</span>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
