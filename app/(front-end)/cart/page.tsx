"use client";
import Breadcrumb from "@/components/front-end/Breadcrumb";
import CartItems from "@/components/front-end/CartItems";
import CartSubTotalCard from "@/components/front-end/CartSubTotalCard";
import EmptyCart from "@/components/front-end/EmptyCart";
import React from "react";
import { useSelector } from "react-redux";
interface CartItem {
  id: string;
  salePrice: number;
  qty: number;
}

// Define the structure of the store's state
interface RootState {
  cart: CartItem[];
}

export default function Cart() {
  const cartItems = useSelector((store:RootState) => store.cart);
  const subTotal =
    cartItems
      .reduce((acc:number, currentItem:CartItem) => {
        return acc + currentItem.salePrice * currentItem.qty;
      }, 0)
      .toFixed(2) ?? 0;

  // console.log(subTotal);
  return (
    <div className="md:pt-[3rem] pt-[3.8rem] lg:pt-[4rem] px-3 lg:px-[5rem] md:px-[3rem] pb-4">
      <Breadcrumb />
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-12 gap-6 md:gap-14 ">
          <CartItems cartItems={cartItems} />
          <CartSubTotalCard subTotal={subTotal} />
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
