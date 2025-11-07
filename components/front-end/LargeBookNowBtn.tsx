"use client";

import { setBuyNowProduct } from "@/redux/slices/buynow";
import Link from "next/link";
import { GiShoppingCart } from "react-icons/gi";
import { useDispatch } from "react-redux";

export default function LargeBookNowBtn({ product, session }: any) {
  const dispatch = useDispatch();

  function handleAddToCart() {
    const prod = {
      id: product.id,
      title: product.title,
      salePrice: product.salePrice,
      imageUrl: product.imageUrl,
      userId: "666ac69f0e152d2844421dd8",
      slug: product.slug,
    };
    dispatch(setBuyNowProduct(prod as any));
  }

  return (
    <>
      {session ? (
        <Link
          onClick={() => handleAddToCart()}
          href="/c/buy-now?q=single-item"
          className="lg:flex md:flex flex w-[100%] py-[1rem] bg-orange-600 relative drop-shadow-lg font-[600] text-white text-[15px] items-center justify-center gap-3 px-5 hover:bg-orange-700 transition-all tracking-[.1px] rounded-md"
        >
          <GiShoppingCart className="text-[24px] absolute md:left-6 lg:left-10 md:block lg:block hidden" />{" "}
          BUY NOW
        </Link>
      ) : (
        <Link
          onClick={() => handleAddToCart()}
          href="/login?returnUrl=/c/buy-now?q=single-item"
          className="lg:flex md:flex flex w-[100%] py-[1rem] bg-orange-600 relative drop-shadow-lg font-[600] text-white text-[15px] items-center justify-center gap-3 px-5 hover:bg-orange-700 transition-all tracking-[.1px] rounded-md"
        >
          <GiShoppingCart className="text-[24px] absolute md:left-6 lg:left-10 md:block lg:block hidden" />{" "}
          BUY NOW
        </Link>
      )}
    </>
  );
}
