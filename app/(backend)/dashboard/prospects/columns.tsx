"use client";
 
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@prisma/client";
import SortableColumn from "@/components/DataTable/SortableColumn";
import DateColumn from "@/components/DataTable/DateColumn";
import ActionColumn from "@/components/DataTable/ActionColumn";
import Link from "next/link";
export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
  },
  // {
  //   accessorKey: "profileImageUrl",
  //   header: "Profile Image",
  //   cell: ({ row }) => <ImageColumn row={row} accessorKey="profileImageUrl" />,
  // },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <Link href={`/dashboard/customers/${customer.id}`} className="">
          View Orders
        </Link>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <ActionColumn
        row={row}
        title="Customer"
        editEndpoint={`customers/update/${customer.id}`}
        endpoint={`customers/${customer.id}`}
      />
      );
    },
  },
];