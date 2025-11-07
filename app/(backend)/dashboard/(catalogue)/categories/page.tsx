"use client"
import React from "react";
import { columns } from "./columns";
import Unauthorized from "@/components/Unauthorized";
import DataTable from "@/components/DataTable/DataTable";
import TableHeader from "@/components/DataTable/TableHeader";
import { useSession } from "next-auth/react";
import { useFetchCategories } from "@/hooks/use-categories";
import DashboardLoading from "../../loading";
 
export default function Page() {
  const {categories , isLoading}=useFetchCategories()
  // console.log(categories)
  
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
        <DashboardLoading/>
      )
    }
  return (
    <div className="p-8">
      <TableHeader
        title="Categories"
        linkTitle="Add Category"
        href="/dashboard/categories/new"
        data={categories}
        model="categories"
      />
      <div className="py-8">
        <DataTable data={categories} columns={columns} />
      </div>
    </div>
  );
}