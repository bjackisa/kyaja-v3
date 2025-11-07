import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getOutOfStockProducts, getAllInActiveProducts } from "@/actions/getOutOfstockPrdts";

import UserDashboard from "@/components/back-end/UserDashboard";
import { getMonthlyOrders, getOrderStats, getRecentOrders, getTrendingProducts } from "@/actions/order-stats";
import OrderStatusCard from "@/components/dashboard/OrderStatusCard";
import TrendingProducts from "@/components/dashboard/TrendingProducts";
import RecentOrders from "@/components/dashboard/RecentOrders";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import MonthlyOrdersChart from "@/components/dashboard/MonthlyOrdersChart";
import { DashboardSkeleton } from "@/components/back-end/Dashboard-ske";
import { Suspense } from "react";

async function DashboardContent() {
  const [orderStats, trendingProducts, recentOrders, monthlyOrders, outOfStock, inactiveStock] = await Promise.all([
    getOrderStats(),
    getTrendingProducts(),
    getRecentOrders(),
    getMonthlyOrders(),
    getOutOfStockProducts(),
    getAllInActiveProducts(),
  ])

  if (!orderStats) {
    return <div>Error loading dashboard</div>
  }

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <OrderStatusCard
          title="Pending Orders"
          value={orderStats.pending}
          type="pending"
        />
        <OrderStatusCard
          title="Processing Orders"
          value={orderStats.processing}
          type="processing"
        />
        <OrderStatusCard
          title="Shipped Orders"
          value={orderStats.shipped}
          type="shipped"
        />
        <OrderStatusCard
          title="Delivered Orders"
          value={orderStats.delivered}
          type="delivered"
        />
        <OrderStatusCard
          title="Canceled Orders"
          value={orderStats.canceled}
          type="canceled"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <TrendingProducts products={trendingProducts} />
        <MonthlyOrdersChart data={monthlyOrders} />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Recent Orders</h2>
        <RecentOrders
          initialOrders={recentOrders.orders}
          total={recentOrders.total}
          pages={recentOrders.pages}
        />
      </div>

      {outOfStock.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Out of Stock Products</h2>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Image</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Edit</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {outOfStock.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="shrink-0">
                        <Image
                          src={product.imageUrl}
                          width={600}
                          height={600}
                          alt={product.title}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium line-clamp-1">{product.title}</div>
                    </TableCell>
                    <TableCell>
                      <Link href={`/dashboard/products/update/${product.id}`}>
                        Edit Stock
                      </Link>
                    </TableCell>
                    <TableCell>${product.productPrice.toLocaleString("en-US")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {inactiveStock.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Inactive Products</h2>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Image</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Edit</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inactiveStock.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="shrink-0">
                        <Image
                          src={product.imageUrl}
                          width={600}
                          height={600}
                          alt={product.title}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium line-clamp-1">{product.title}</div>
                    </TableCell>
                    <TableCell>
                      <Link href={`/dashboard/products/update/${product.id}`}>
                        Edit Stock
                      </Link>
                    </TableCell>
                    <TableCell>${product.productPrice.toLocaleString("en-US")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const role = session?.user?.role

  if (role === "USER") {
    return <UserDashboard />
  }

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  )
}