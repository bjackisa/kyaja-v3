"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import SortableColumn from "@/components/DataTable/SortableColumn";
import ImageColumn from "@/components/DataTable/ImageColumn";
import DateColumn from "@/components/DataTable/DateColumn";
import ActionColumn from "@/components/DataTable/ActionColumn";
import { Department } from "@/types";
import { useDeleteDepartment } from "@/hooks/use-departments";

// Separate functional component for the actions cell
const ActionsCell: React.FC<{ row: any }> = ({ row }) => {
  const { deleteDepartment } = useDeleteDepartment();
  const department = row.original;

  return (
    <ActionColumn
      row={row}
      title="Department"
      deleteMutations={deleteDepartment}
      id={`${department.id}`}
      editEndpoint={`departments/update/${department.id}`}
      endpoint={`department/${department.id}`}
    />
  );
};

export const columns: ColumnDef<Department>[] = [
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
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
  },
  {
    accessorKey: "imageUrl",
    header: "Banner Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },
  {
    accessorKey: "isActive",
    header: "IsActive",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} />, // Use the separate functional component
  },
];
