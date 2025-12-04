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
    <div className="group flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg hover:border-gray-300">
      <a
        onClick={handleClick}
        href={`/p/${product.slug}`}
        className="relative aspect-square overflow-hidden bg-gray-50"
      >
        <Image
          src={product.imageUrl ?? DEFAULT_IMAGE}
          alt={product.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-110"
          placeholder="blur"
          blurDataURL={DEFAULT_BLUR}
        />
        {product.isDiscount && discount > 0 && (
          <div className="absolute top-2 left-2 bg-[#ff4747] text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-md">
            -{discount.toFixed(0)}% OFF
          </div>
        )}
      </a>
      <div className="flex flex-col justify-between p-3 flex-grow">
        <a onClick={handleClick} href={`/p/${product.slug}`}>
          <h2 className="text-xs font-normal text-gray-700 line-clamp-2 mb-2 leading-relaxed group-hover:text-[#ff6a00] transition-colors">
            {product.title}
          </h2>
          <div className="flex flex-col gap-1 mt-2">
            <p className="font-bold text-base text-[#ff6a00]">
              UGX{" "}
              {formatMoney(
                product.salePrice >= 1
                  ? product.salePrice
                  : product.productPrice
              )}
            </p>
            {product.salePrice >= 1 &&
              product.productPrice > product.salePrice && (
                <s className="text-xs text-gray-400">
                  UGX {formatMoney(product.productPrice)}
                </s>
              )}
          </div>
        </a>
        {showAddToCart && (
          <button
            onClick={handleAddToCart}
            className="mt-3 w-full bg-[#ff6a00] hover:bg-[#ff8534] text-white font-semibold py-2 px-3 rounded-md text-xs transition-all duration-200 text-center flex items-center gap-2 justify-center whitespace-nowrap shadow-sm hover:shadow-md"
          >
            <ShoppingCart size={14} />
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
