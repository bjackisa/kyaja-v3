"use client"
import React from "react";
import { columns } from "./columns";
import Unauthorized from "@/components/Unauthorized";
import DataTable from "@/components/DataTable/DataTable";
import TableHeader from "@/components/DataTable/TableHeader";
import { useFetchProducts } from "@/hooks/use-products";
import { useSession } from "next-auth/react";
import DashboardLoading from "../../loading";

export default  function Page() {
    const {products , isLoading}=useFetchProducts()
    
    const{ data: Session }=useSession()
    
      const user = Session?.user;
      const role = user?.role;
      if (role === "USER") {
        return(
          <Unauthorized/>
        )
      }
      if(isLoading){
        return(
          <div className=' w-full h-screen flex justify-center items-center'>
          <DashboardLoading/>
         </div>
        )
      }
  return (
    <div className="p-8">
      <TableHeader
        title={`All Products `}
        linkTitle="Add Product"
        href="/dashboard/products/new"
        data={products}
        model="products"
      />
      <div className="py-8">
        <DataTable data={products} columns={columns} />
      </div>
    </div>
  );
}