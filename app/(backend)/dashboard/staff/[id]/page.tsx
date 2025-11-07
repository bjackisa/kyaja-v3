import OrderCard from "@/components/Order/OrderCard";
import { getData } from "@/lib/getData";
import React from "react";

export default async function page({ params: { id } }:any) {
  const orders = await getData("orders");

  if (orders.length === 0 || !orders) {
    return <p>No Orders Yet</p>;
  }
  const userOrders = orders.filter((order:any) => order.userId === id);
  
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 m-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              All Orders
            </h1>
            <p className="mt-2 text-sm font-normal text-gray-600">
              Check the status of recent and old orders & discover more products
            </p>
          </div>

          <ul className="mt-8 space-y-5 lg:mt-12 sm:space-y-6 lg:space-y-10">
            {userOrders.map((order:any, i:any) => {
              return <OrderCard key={i} order={order} />;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
