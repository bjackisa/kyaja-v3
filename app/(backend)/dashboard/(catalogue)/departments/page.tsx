"use client"
import React from "react";
import Unauthorized from "@/components/Unauthorized";
import DataTable from "@/components/DataTable/DataTable";
import TableHeader from "@/components/DataTable/TableHeader";
import {  useFetchDepartments } from "@/hooks/use-departments";
import { useSession } from "next-auth/react";
import { columns } from "./columns";
import DashboardLoading from "../../loading";
 
export default function Page() {
  const { departments , isLoading } = useFetchDepartments();
  // console.log(departments , "these are departments")
  
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
        title="Departments"
        linkTitle="Add Departments"
        href="/dashboard/departments/new"
        data={departments}
        model="departments"
      />
      <div className="py-8">
        <DataTable data={departments} columns={columns} />
      </div>
    </div>
  );
}