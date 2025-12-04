"use client";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch } from "react-redux";
import {
  decrementQty,
  incrementQty,
  removeFromCart,
} from "@/redux/slices/cartSlice";
import { Minus, MoveLeft, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import Link from "next/link";
import { formatMoney } from "@/lib/formatMoney";
import CustomImage from "../ui/CustomImage";


export default function CartItems({ cartItems }:any) {
  const dispatch = useDispatch();
  function handleCartItemDelete(cartId:string) {
    // Dispatch the removeFromCart Reducer
    dispatch(removeFromCart(cartId));
    toast.success("Item removed Successfully");
  }
  function handleQtyIncrement(cartId: string, stockQty: number) {
    if (cartItems.find(item => item.id === cartId).qty < stockQty) {
      dispatch(incrementQty(cartId));
    } else {
      toast.error("Cannot exceed stock quantity");
    }
  }
  
  function handleQtyDecrement(cartId:string) {
    dispatch(decrementQty(cartId));
  }
  return (
    <div className="md:col-span-8 col-span-full">
      {cartItems.length > 0 && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="py-2 mb-6 text-lg lg:text-2xl">
              Shopping Cart({cartItems.length})
            </h2>
            <Button asChild variant={"outline"}>
              <Link href="/">
                <MoveLeft className="w-4 h-4 mr-2" />
                <span className="text-xs lg:text-sm md:text-sm">Continue Shopping</span>
              </Link>
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead className="whitespace-nowrap">Product Name</TableHead>
                <TableHead className="hidden md:table-cell">Quantity</TableHead>
                <TableHead className="hidden md:table-cell">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems &&
                cartItems.length > 0 &&
                cartItems.map((item:any) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="hidden sm:table-cell">
                        <CustomImage
                          alt={item.title}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={item.imageUrl}
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium lg:text-sm md:text-sm text-xs flex items-center justify-between">
                        {item.title}
                       <div className="lg:hidden md:hidden block">
                       <button onClick={() => handleCartItemDelete(item.id)}>
                            <Trash2 className="text-red-600 w-4 h-4" />
                          </button>
                       </div>
                      </TableCell>

                      <TableCell className="hidden md:table-cell">
                        <div className=" rounded-xl border border-gray-400 flex gap-3 items-center ">
                          <button
                            onClick={() => handleQtyDecrement(item.id)}
                            className="border-r border-gray-400 py-2 px-4"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <p className="flex-grow py-2 px-4">{item.qty}</p>
                          <button
                            onClick={() => handleQtyIncrement(item.id , item.stockQty)}
                            className="border-l border-gray-400 py-2 px-4"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col justify-center">
                            <h4>
                              UGX &nbsp;
                              {formatMoney(
                                (item.salePrice * item.qty).toFixed(2)
                              )}
                            </h4>
                            <p className="text-[10px] text-gray-300">
                              (UGX &nbsp; {formatMoney(+item.salePrice)}x{" "}
                              {item.qty})
                            </p>
                          </div>
                          <button onClick={() => handleCartItemDelete(item.id)}>
                            <Trash2 className="text-red-600 w-4 h-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
}
