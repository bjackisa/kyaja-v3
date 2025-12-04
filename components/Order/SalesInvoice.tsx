"use client";
import React, { useRef } from "react";
import { convertIsoDateToNormal } from "@/lib/convertIsoDatetoNormal";
import CustomImage from "../ui/CustomImage";
import { useReactToPrint } from "react-to-print";
import { formatMoney } from "@/lib/formatMoney";

// Define types
interface OrderItem {
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface Order {
  orderNumber: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  shippingCost: number;
  orderItems: OrderItem[];
}

interface SalesInvoiceProps {
  order: Order;
}

export default function SalesInvoice({ order }: SalesInvoiceProps) {
  const shippingCost = order.shippingCost;
  const invoiceDate = convertIsoDateToNormal(order.createdAt);
  
  const subTotal = order.orderItems.reduce((acc, currentItem) => {
    return acc + currentItem.price * currentItem.quantity;
  }, 0).toFixed(2);

  const total = parseFloat(subTotal).toFixed(2);

  const invoiceRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  return (
    <div className="flex flex-col">
      {/* DOWNLOAD BTN */}
      <div className="flex items-end justify-end mb-8">
        <button
          onClick={handlePrint}
          type="button"
          className="inline-flex items-center justify-center px-4 py-3 text-xs font-bold dark:text-gray-900 transition-all duration-200 dark:bg-gray-100 bg-slate-800 text-slate-200  border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Download/Print Invoice
        </button>
      </div>
      {/* INVOICE */}
      <div ref={invoiceRef}>
        <div className="max-w-4xl mx-auto border border-gray-500 p-8 rounded-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800">
          {/* Header */}
          <div className="flex justify-between border-b border-gray-500 pb-8">
            <div className="flex flex-col">
              <h2>Bill From:</h2>
              <p>Kyaja Ecommerce</p>
              <p>Ttula kawempe</p>
              <p>P.O box 164310 Kampala</p>
              <p>Info.kyaja@gmail.com</p>
            </div>
            <div className="">
              <CustomImage src="/logo.svg" alt="kyaja logo" className="w-20 h-20" width={300} height={300} />
              <span className="text-xl uppercase -mt-5">Kyaja</span>
            </div>
          </div>
          <div className="flex justify-between border-b border-gray-500 py-8">
            <div className="flex flex-col">
              <h2>Bill To:</h2>
              <p>Name: {order.name}</p>
              <p>Address: {order.address}</p>
              <p>Email: {order.email}</p>
              <p>Number: {order.phone}</p>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <p>Invoice #</p>
                <p>{order.orderNumber}</p>
              </div>
              <div className="flex justify-between gap-4">
                <p>Invoice Date</p>
                <p>{invoiceDate}</p>
              </div>
              <div className="flex justify-between gap-4">
                <p>Amount Due</p>
                <p>UGX {formatMoney(total)}</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Item Image</th>
                  <th scope="col" className="px-6 py-3">Item Title</th>
                  <th scope="col" className="px-6 py-3">Qty</th>
                  <th scope="col" className="px-6 py-3">Unit Cost</th>
                  <th scope="col" className="px-6 py-3">Line Total</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item, i) => {
                  const itemSubtotal = (item.quantity * item.price).toFixed(2);
                  return (
                    <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <CustomImage src={item.imageUrl} width={249} height={249} alt={item.title} className="rounded-xl w-10 h-10" />
                      </th>
                      <td className="px-6 py-4 truncate">{item.title}</td>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4">UGX {formatMoney(item.price)}</td>
                      <td className="px-6 py-4">UGX {formatMoney(itemSubtotal)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between border-b border-gray-500 py-8">
            <div className="flex flex-col">
              <h2>NOTES</h2>
              <p>
                {shippingCost === 50
                  ? "Your Delivery is within 3 days"
                  : shippingCost === 75
                  ? "Your Delivery is within 2 days"
                  : shippingCost === 90
                  ? "Your Delivery is within 1 day"
                  : "Thank you for making business with us"}
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between gap-4">
                <p>SubTotal</p>
                <p>UGX {formatMoney(subTotal)}</p>
              </div>
              <div className="flex justify-between">
                <p>Total</p>
                <p>UGX {formatMoney(total)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
