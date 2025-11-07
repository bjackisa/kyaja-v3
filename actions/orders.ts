"use server"

import db from "@/lib/db"
import { OrderStatus, Prisma } from "@prisma/client"
import { 
  endOfDay, 
  startOfDay, 
  subDays, 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth 
} from "date-fns"

export type OrdersAnalytics = {
  totalOrders: number
  totalRevenue: number
  orders: any[]
  totalPages: number
  page: number
}

export async function getOrdersWithAnalytics(
  page: number = 1,
  period: string = 'all',
  status?: OrderStatus,
  searchQuery?: string
): Promise<OrdersAnalytics> {
  const itemsPerPage = 10
  const skip = (page - 1) * itemsPerPage

  let dateFilter: Prisma.OrderWhereInput = {}
  const now = new Date()

  switch (period) {
    case 'today':
      dateFilter = {
        createdAt: {
          gte: startOfDay(now),
          lte: endOfDay(now)
        }
      }
      break
    case 'yesterday':
      dateFilter = {
        createdAt: {
          gte: startOfDay(subDays(now, 1)),
          lte: endOfDay(subDays(now, 1))
        }
      }
      break
    case 'week':
      dateFilter = {
        createdAt: {
          gte: startOfWeek(now),
          lte: endOfWeek(now)
        }
      }
      break
    case 'month':
      dateFilter = {
        createdAt: {
          gte: startOfMonth(now),
          lte: endOfMonth(now)
        }
      }
      break
  }

  const whereClause: Prisma.OrderWhereInput = {
    ...dateFilter,
    ...(status && { orderStatus: status }),
    ...(searchQuery && {
      OR: [
        { orderNumber: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } },
        { name: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } },
        { email: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } }
      ]
    })
  }

  const [orders, totalOrders, totalRevenue] = await Promise.all([
    db.order.findMany({
      where: whereClause,
      include: {
        orderItems: {
          select: {
            id: true,
            title: true,
            price: true,
            quantity: true,
            imageUrl: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: itemsPerPage
    }),
    db.order.count({ where: whereClause }),
    db.order.aggregate({
      where: whereClause,
      _sum: {
        totalOrderAmount: true
      }
    })
  ])

  return {
    orders,
    totalOrders,
    totalRevenue: totalRevenue._sum.totalOrderAmount || 0,
    totalPages: Math.ceil(totalOrders / itemsPerPage),
    page
  }
}