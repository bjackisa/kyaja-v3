"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { formatMoney } from "@/lib/formatMoney";
export default function CartSubTotalCard({ subTotal }:any) {
  const shipping = 10.0;
  const tax = 0.0;
  const totalPrice = (
    Number(subTotal) +
    Number(shipping) +
    Number(tax)
  ).toFixed(2);

  return (
    <div className="md:col-span-4 col-span-full sm:block bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden p-5 dark:text-slate-100 font-bold">
      <h2 className="text-2xl pb-3 border-b border-slate-500">Order Summary</h2>
      <p className="border-b border-slate-500 py-6 text-slate-400 font-normal">
        Thank you for shopping with us! We appreciate your business.
      </p>
      <div className="flex items-center justify-between py-4 font-bold">
        <span>Total </span>
        <span>UGX &nbsp;{formatMoney(totalPrice)}</span>
      </div>
     
      <div className="mt-4">
        <Button>
          <Link href="/c/checkout">Proceed to Checkout</Link>
        </Button>
      </div>
    </div>
  );
}
