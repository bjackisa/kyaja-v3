"use server"

import db from "@/lib/db";
import { OrderStatus } from "@prisma/client";

export async function getOrderStats() {
  try {
    const stats = await Promise.all([
      db.order.count({ where: { orderStatus: OrderStatus.PENDING }}),
      db.order.count({ where: { orderStatus: OrderStatus.PROCESSING }}),
      db.order.count({ where: { orderStatus: OrderStatus.SHIPPED }}),
      db.order.count({ where: { orderStatus: OrderStatus.DELIVERED }}),
      db.order.count({ where: { orderStatus: OrderStatus.CANCELED }})
    ]);

    return {
      pending: stats[0],
      processing: stats[1],
      shipped: stats[2],
      delivered: stats[3],
      canceled: stats[4]
    };
  } catch (error) {
    console.error("Failed to get order stats:", error);
    return null;
  }
}

export async function getTrendingProducts(limit = 5) {
  try {
    const products = await db.product.findMany({
      take: limit,
      orderBy: {
        orderItems: {
          _count: 'desc'
        }
      },
      include: {
        _count: {
          select: {
            orderItems: true
          }
        }
      }
    });

    return products;
  } catch (error) {
    console.error("Failed to get trending products:", error);
    return [];
  }
}

export async function getRecentOrders(page = 1, limit = 10) {
  try {
    const skip = (page - 1) * limit;
    
    const [orders, total] = await Promise.all([
      db.order.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          orderItems: true,
          user: {
            select: {
              name: true,
              email: true
            }
          }
        }
      }),
      db.order.count()
    ]);

    return {
      orders,
      total,
      pages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error("Failed to get recent orders:", error);
    return { orders: [], total: 0, pages: 0 };
  }
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  try {
    const order = await db.order.update({
      where: { id: orderId },
      data: { orderStatus: status }
    });
    return { success: true, order };
  } catch (error) {
    console.error("Failed to update order status:", error);
    return { success: false, error: "Failed to update order status" };
  }
}
export async function getMonthlyOrders() {
  try {
    const fourMonthsAgo = new Date();
    fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);

    const orders = await db.order.groupBy({
      by: ['orderStatus', 'createdAt'],
      where: {
        createdAt: {
          gte: fourMonthsAgo
        }
      },
      _count: true,
      orderBy: {
        createdAt: 'asc'
      }
    });

    const monthlyData = await db.order.findMany({
      where: {
        createdAt: {
          gte: fourMonthsAgo
        }
      },
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    const monthlyStats = monthlyData.reduce((acc: any, order) => {
      const month = new Date(order.createdAt).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    const last4Months = Array.from({ length: 4 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date.toLocaleString('default', { month: 'short' });
    }).reverse();

    return last4Months.map(month => ({
      name: month,
      orders: monthlyStats[month] || 0
    }));
  } catch (error) {
    console.error("Failed to get monthly orders:", error);
    return [];
  }
}