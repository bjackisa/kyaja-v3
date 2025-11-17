import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId, productId } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const order = await prisma.order.findFirst({
      where: {
        userId,
        createdAt: {
          lte: sevenDaysAgo,
        },
        orderItems: {
          some: {
            productId,
          },
        },
      },
    });

    if (order) {
      return NextResponse.json({ eligible: true });
    } else {
      return NextResponse.json({ eligible: false });
    }
  } catch (error) {
    console.error("Error checking review eligibility:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
