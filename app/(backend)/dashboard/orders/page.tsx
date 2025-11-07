import { Suspense } from "react"
import OrderCard from "@/components/Order/OrderCard"
import { OrderStatus } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import Unauthorized from "@/components/Unauthorized"
import { Pagination } from "@/components/ui/pagination"
import { getOrdersWithAnalytics } from "@/actions/orders"
import OrdersHeader from "@/components/back-end/OrdersHeader"
import OrderStats from "@/components/back-end/OrderStats"

interface OrdersPageProps {
  searchParams: {
    page?: string
    period?: string
    status?: OrderStatus
    search?: string
  }
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const session = await getServerSession(authOptions)
  const user = session?.user
  const role = user?.role

   if (role === "USER" || role === "SECRETARY") {
      return <Unauthorized />;
    }

  const page = searchParams?.page ? parseInt(searchParams.page) : 1
  const period = searchParams?.period || 'all'
  const status = searchParams?.status as OrderStatus | undefined
  const search = searchParams?.search

  const { orders, totalOrders, totalRevenue, totalPages } = await getOrdersWithAnalytics(
    page,
    period,
    status,
    search
  )

  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <OrdersHeader />
        <div className="mt-8">
          <p className="text-center text-gray-500">No orders found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 pb-8 pt-2 space-y-8">
      <OrdersHeader />
      
      <OrderStats totalOrders={totalOrders} totalRevenue={totalRevenue} />

      <div className="space-y-6">
        <Suspense fallback={<div className="text-green-400 text-sm flex justify-center items-center">Loading orders...</div>}>
          {orders.map((order: any) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </Suspense>
        <div className="flex justify-center mt-2">
        <Pagination 
            totalPages={totalPages} 
            page={page} 
        />
      </div>
      </div>

    
    </div>
  )
}