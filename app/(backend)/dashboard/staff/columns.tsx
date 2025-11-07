"use client";
 
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { User, UserRole } from "@prisma/client";
import SortableColumn from "@/components/DataTable/SortableColumn";
import DateColumn from "@/components/DataTable/DateColumn";
import { UserDeleteAction } from "@/components/back-end/UserDeleteAction";
import { UserRoleUpdateDialog } from "@/components/back-end/UserRoleUpdateDialog";

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
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center space-x-2">
          <span>{user.role}</span>
          <UserRoleUpdateDialog 
            userId={user.id} 
            currentRole={user.role as UserRole} 
          />
        </div>
      );
    }
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return <UserDeleteAction 
        user={user} 
        onDeleteSuccess={() => {
        }} 
      />;
    },
  }
  
];