import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sales = await prisma.sale.findMany();
    // const analytics = [
    //   {
    //     title: "Total Sales",
    //     count: salesSummary.salesCount,
    //     countUnit: "",
    //     detailLink: "/dashboard/sales",
    //     icon: BarChartHorizontal,
    //   },
    //   {
    //     title: "Total Revenue",
    //     count: salesSummary.totalRevenue,
    //     countUnit: "$",
    //     detailLink: "/dashboard/sales",
    //     icon: DollarSign,
    //   },
    //   {
    //     title: "Total Orders",
    //     count: ordersCount,
    //     countUnit: "",
    //     detailLink: "/dashboard/orders",
    //     icon: Combine,
    //   },
    //   {
    //     title: "Total Products",
    //     count: productsCount,
    //     countUnit: "",
    //     detailLink: "/dashboard/products",
    //     icon: LayoutGrid,
    //   },
    // ];
    return NextResponse.json(sales);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
    });
  }
}
