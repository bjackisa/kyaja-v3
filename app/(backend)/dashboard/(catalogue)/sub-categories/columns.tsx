"use client";
import { ColumnDef } from "@tanstack/react-table";
import { SubCategory } from "@prisma/client";
import SortableColumn from "@/components/DataTable/SortableColumn";
import DateColumn from "@/components/DataTable/DateColumn";
import ActionColumn from "@/components/DataTable/ActionColumn";
import { useDeleteSubCategory } from "@/hooks/use-sub-categories";
import ImageColumn from "@/components/DataTable/ImageColumn";

// Separate functional component for the actions cell
const ActionsCell: React.FC<{ row: any }> = ({ row }) => {
  const { deleteSubCategory } = useDeleteSubCategory();
  const subCategory = row.original;

  return (
    <ActionColumn
      title="Sub-category"
      deleteMutations={deleteSubCategory}
      id={`${subCategory.id}`}
      editEndpoint={`sub-categories/update/${subCategory.id}`}
      endpoint={`sub-categories/${subCategory.id}`}
    />
  );
};

export const columns: ColumnDef<SubCategory | any>[] = [
   {
      accessorKey: "imageUrl",
      header: "Sub-Cat Image",
      cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
    },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
  },
  {
    accessorKey: "categoryId",
    header: "Category Name",
    cell: ({ row }) => {
      const subCategory = row.original;
      return <h2>{subCategory.categoryTitle}</h2>;
    },
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
