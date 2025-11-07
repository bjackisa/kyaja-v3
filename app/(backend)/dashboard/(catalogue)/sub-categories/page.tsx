"use client";
import { columns } from "./columns";
import Unauthorized from "@/components/Unauthorized";
import DataTable from "@/components/DataTable/DataTable";
import TableHeader from "@/components/DataTable/TableHeader";
import { useSession } from "next-auth/react";
import { useFetchSubCategories} from "@/hooks/use-sub-categories";
import DashboardLoading from "../../loading";

export default function Page() {
  const {subcategories , isLoading}=useFetchSubCategories()
  // console.log(subcategories)
  
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
        title="Sub Categories"
        linkTitle="Add Sub-categories"
        href="/dashboard/sub-categories/new"
        data={subcategories}
        model="sub-categories"
      />
      <div className="py-8">
        <DataTable data={subcategories} columns={columns} />
      </div>
    </div>
  );
}