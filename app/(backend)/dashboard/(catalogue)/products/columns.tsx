"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import SortableColumn from "@/components/DataTable/SortableColumn";
import ImageColumn from "@/components/DataTable/ImageColumn";
import DateColumn from "@/components/DataTable/DateColumn";
import ActionColumn from "@/components/DataTable/ActionColumn";
import { IProduct2 } from "@/actions/product-server";
import { useDeleteProduct } from "@/hooks/use-products";

// Separate functional component for the actions cell
const ActionsCell: React.FC<{ row: any }> = ({ row }) => {
  const { deleteProduct } = useDeleteProduct();
  const product = row.original;

  return (
    <ActionColumn
      title={`Product`}
      deleteMutations={deleteProduct}
      id={`${product.id}`}
      editEndpoint={`products/update/${product.id}`}
      endpoint={`products/${product.id}`}
    />
  );
};

export const columns: ColumnDef<IProduct2>[] = [
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
    header: "Product Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },
  {
    accessorKey: "qty",
    header: "Product Qty",
    cell: ({ row }) => {
      const product = row.original;
      return <h2>{product.productStock}</h2>;
    },
  },
  {
    accessorKey: "price",
    header: "Product price (without discount)",
    cell: ({ row }) => {
      const product = row.original;
      return <h2>{product.productPrice}</h2>;
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
