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

const gradientMap = {
  pending: "from-yellow-500/10 to-orange-500/10",
  processing: "from-blue-500/10 to-cyan-500/10",
  shipped: "from-purple-500/10 to-pink-500/10",
  delivered: "from-green-500/10 to-emerald-500/10",
  canceled: "from-red-500/10 to-rose-500/10",
};

const bgMap = {
  pending: "bg-yellow-500/10",
  processing: "bg-blue-500/10",
  shipped: "bg-purple-500/10",
  delivered: "bg-green-500/10",
  canceled: "bg-red-500/10",
};

export default function OrderStatusCard({ title, value, type }: OrderStatusCardProps) {
  const Icon = iconMap[type];
  
  return (
    <Card className={cn(
      "relative overflow-hidden border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer",
      "bg-gradient-to-br", gradientMap[type]
    )}>
      {/* Decorative Background Circle */}
      <div className={cn(
        "absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-500",
        bgMap[type]
      )} />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-semibold text-gray-700">
          {title}
        </CardTitle>
        <div className={cn(
          "p-2.5 rounded-xl transition-all group-hover:scale-110 group-hover:rotate-12",
          bgMap[type]
        )}>
          <Icon className={cn("h-5 w-5", colorMap[type])} />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className={cn("text-3xl font-extrabold", colorMap[type])}>{value}</div>
        <p className="text-xs text-gray-500 mt-1">Total {type} orders</p>
      </CardContent>
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </Card>
  );
}