import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
interface Params {
  id: string;
}

export async function GET(request: NextRequest, { params: { id } }: { params: Params }) {
  try {
    const order = await db.order.findUnique({
      where: {
        id 
      },
      include: {
        orderItems: true,
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch an Order",
        error,
      },
      { status: 500 }
    );
  }
}


