import { getNormalDate } from "@/lib/getNormalDate";
import React from "react";
 
export default function DateColumn({
  row,
  accessorKey,
}: {
  row: any;
  accessorKey: any;
}) {
  const createdAt = row.getValue(`${accessorKey}`);
  const date = getNormalDate(createdAt);
   // console.log(imageUrl);
  return <div className="">{date}</div>;
}