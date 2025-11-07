"use client";
import Link from "next/link";
import Image from "next/image";
import { formatMoney } from "@/lib/formatMoney";
import type { Product } from "@/actions/product-server";
import { useRecentlyViewedStore } from "@/hooks/store/recently-viewed";
import { DEFAULT_BLUR, DEFAULT_IMAGE } from "@/lib/lazyLoading";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { addToCart } from "@/redux/slices/cartSlice";

type ProductCardProps = {
  product: Product;
  onClick?: () => void;
  showAddToCart?: boolean;
};

export default function ProductCard({
  product,
  onClick,
  showAddToCart = false,
}: ProductCardProps) {
  const { addRecentlyViewed } = useRecentlyViewedStore();
  const dispatch = useDispatch();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Get cart state to check if item exists
  const cartItems = useSelector((state: any) => state.cart);

  const handleClick = (e: React.MouseEvent) => {
    if (isAddingToCart) {
      e.preventDefault();
      return;
    }

    addRecentlyViewed(product);

    if (onClick) {
      onClick();
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);

    const prod = {
      id: product.id,
      title: product.title,
      salePrice:
        product.salePrice >= 1 ? product.salePrice : product.productPrice,
      imageUrl: product.imageUrl,
      userId: "666ac69f0e152d2844421dd8",
      slug: product.slug,
      stockQty: product.productStock || 999,
    };

    // Check if item already exists in cart
    const existingItem = cartItems.find((item: any) => item.id === product.id);

    if (existingItem) {
      toast.error("Item already exists in cart!");
    } else {
      dispatch(addToCart(prod));
      toast.success("Added to cart successfully!");
    }

    // Reset the flag after a short delay to allow for navigation
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 100);
  };

  const discount = product.isDiscount ? product.discount : 0;

  return (
    <div className="group flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Rest of your JSX remains the same */}
      <a
        onClick={handleClick}
        href={`/p/${product.slug}`}
        className="relative aspect-square overflow-hidden"
      >
        <Image
          src={product.imageUrl ?? DEFAULT_IMAGE}
          alt={product.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
          placeholder="blur"
          blurDataURL={DEFAULT_BLUR}
        />
        {product.isDiscount && discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount.toFixed(0)}%
          </div>
        )}
      </a>
      <div className="flex flex-col justify-between p-4 flex-grow">
        <a onClick={handleClick} href={`/p/${product.slug}`}>
          <h2 className="text-sm font-medium text-gray-900 line-clamp-1 mb-2">
            {product.title}
          </h2>
          <div className="flex lg:flex-row flex-col lg:items-center justify-between mt-1 lg:mb-0 mb-2">
            <p className="font-bold lg:text-base text-base text-black">
              UGX{" "}
              {formatMoney(
                product.salePrice >= 1
                  ? product.salePrice
                  : product.productPrice
              )}
            </p>
            {product.salePrice >= 1 &&
              product.productPrice > product.salePrice && (
                <s className="text-xs text-gray-500">
                  UGX {formatMoney(product.productPrice)}
                </s>
              )}
          </div>
        </a>
        {showAddToCart && (
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full bg-[#F68B1E] hover:bg-[#F68B1E]/70 text-white font-medium py-3 px-4 rounded text-sm transition-colors duration-300 text-center flex items-center md:gap-4 gap-2 justify-center whitespace-nowrap"
          >
            <ShoppingCart size={18} className="md:block hidden" />
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
