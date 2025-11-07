import React from "react";
import { columns } from "./columns";
import Unauthorized from "@/components/Unauthorized";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import DataTable from "@/components/DataTable/DataTable";
import TableHeader from "@/components/DataTable/TableHeader";
 
export default async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const role = user?.role;
  if (role === "USER") {
    return(
      <Unauthorized/>
    )
  }
  const customers = await getData("customers");
  // console.log(customers)
  return (
    <div className="p-8">
      <TableHeader
        title="Customers"
        linkTitle="Dashboard"
        href="/dashboard"
        data={customers}
        model="customers"
      />
      <div className="py-8">
        <DataTable data={customers} columns={columns} />
      </div>
    </div>
  );
}