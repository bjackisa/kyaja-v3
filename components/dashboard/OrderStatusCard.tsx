"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Package, PackageCheck, Truck, XCircle, Clock } from "lucide-react";

interface OrderStatusCardProps {
  title: string;
  value: number;
  type: "pending" | "processing" | "shipped" | "delivered" | "canceled";
}

const iconMap = {
  pending: Clock,
  processing: Package,
  shipped: Truck,
  delivered: PackageCheck,
  canceled: XCircle,
};

const colorMap = {
  pending: "text-yellow-600",
  processing: "text-blue-600",
  shipped: "text-purple-600",
  delivered: "text-green-600",
  canceled: "text-red-600",
};

export default function OrderStatusCard({ title, value, type }: OrderStatusCardProps) {
  const Icon = iconMap[type];
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className={cn("h-5 w-5", colorMap[type])} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}