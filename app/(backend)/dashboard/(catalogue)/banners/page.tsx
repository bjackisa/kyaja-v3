"use client"
import React from "react";
import { columns } from "./columns";
import Unauthorized from "@/components/Unauthorized";
import DataTable from "@/components/DataTable/DataTable";
import TableHeader from "@/components/DataTable/TableHeader";
import { useSession } from "next-auth/react";
import { useFetchBannerProducts } from "@/hooks/use-banners";
import DashboardLoading from "../../loading";
 
export default  function Page() {
   const { banners , isLoading } = useFetchBannerProducts();
    // console.log(banners , "these are banners")
    const{ data: Session }=useSession()
  
    const user = Session?.user;
    const role = user?.role as any;
    if (role === "USER") {
      return(
        <Unauthorized/>
      )
    }
    if(isLoading){
      return(
        <DashboardLoading/>
      )
    }
  return (
    <div className="p-8">
      <TableHeader
        title="Banners"
        linkTitle="Add Banner"
        href="/dashboard/banners/new"
        data={banners}
        model="banners"
      />
      <div className="py-8">
        <DataTable data={banners} columns={columns} />
      </div>
    </div>
  );
}