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
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden animate-fade-in-up">
          <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Shopping Cart
                </h2>
                <p className="text-sm text-gray-600">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
              </div>
              <Button 
                asChild 
                variant="outline"
                className="hover:bg-[#ff6a00] hover:text-white hover:border-[#ff6a00] transition-all group"
              >
                <Link href="/" className="flex items-center gap-2">
                  <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Continue Shopping</span>
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
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
                        <div className="inline-flex items-center rounded-lg border-2 border-gray-200 bg-gray-50 overflow-hidden hover:border-[#ff6a00] transition-all">
                          <button
                            onClick={() => handleQtyDecrement(item.id)}
                            className="px-3 py-2 hover:bg-[#ff6a00] hover:text-white transition-all group"
                          >
                            <Minus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          </button>
                          <p className="px-4 py-2 font-semibold text-gray-900 min-w-[3rem] text-center bg-white">{item.qty}</p>
                          <button
                            onClick={() => handleQtyIncrement(item.id , item.stockQty)}
                            className="px-3 py-2 hover:bg-[#ff6a00] hover:text-white transition-all group"
                          >
                            <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          </button>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col justify-center">
                            <h4 className="text-lg font-bold text-[#ff6a00]">
                              UGX {formatMoney((item.salePrice * item.qty).toFixed(2))}
                            </h4>
                            <p className="text-xs text-gray-500">
                              UGX {formatMoney(+item.salePrice)} × {item.qty}
                            </p>
                          </div>
                          <button 
                            onClick={() => handleCartItemDelete(item.id)}
                            className="p-2 rounded-lg hover:bg-red-50 transition-all group"
                          >
                            <Trash2 className="text-red-600 w-5 h-5 group-hover:scale-110 transition-transform" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          </div>
        </div>
      )}
    </div>
  );
}
