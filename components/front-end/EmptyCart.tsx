import Link from "next/link";
import React from "react";
import CustomImage from "../ui/CustomImage";
import { Button } from "../ui/button";

export default function EmptyCart() {
  return (
    <div className=" flex items-center flex-col justify-center ">
      <CustomImage
        src="/empty-cart.jpg"
        className="w-72 h-auto"
        alt="empty cart kyaja.com"
        width={200}
        height={300}
      />
      <p className="py-2">Your Cart is Empty !, Please add something</p>
      <Button asChild>
        <Link href="/">Continue Shopping</Link>
      </Button>
    </div>
  );
}
