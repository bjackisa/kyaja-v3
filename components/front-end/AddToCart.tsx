"use client";
import React from "react";
import { GiShoppingCart } from "react-icons/gi";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast } from "react-toastify";

export default function AddToCart({ product }:any) {
  const dispatch = useDispatch();

  function handleAddToCart() {
    const prod = {
      id: product.id,
      title: product.title,
      salePrice: product.salePrice,
      imageUrl: product.imageUrl,
      userId: "666ac69f0e152d2844421dd8",
      slug: product.slug,
      stockQty:product.productStock
    };
    dispatch(addToCart(prod));
    // addRecentlyViewedProduct(product);
    toast.success("Item added Successfully");
  }
  
  return (
    <button
      onClick={handleAddToCart}
      className="flex w-[100%] py-[1rem] lg:bg-[#f68b1e] md:bg-[#f68b1e] relative drop-shadow-lg font-[600] text-white text-[15px] items-center justify-center gap-3 px-5  transition-all tracking-[.1px] rounded-md"
    >
      <GiShoppingCart className="text-[24px] absolute md:left-3 lg:left-10 md:block lg:block hidden hover:text-[#f68b1e]" />{" "}
      <h2 className="lg:flex md:flex hidden"> ADD TO CART</h2>
      <div className="flex lg:hidden md:hidden items-center px-3 py-2 text-[#f2a51f] bg-[#fbe0da] rounded-md">
        <FaCartArrowDown size={24} />
      </div>
    </button>
  );
}
