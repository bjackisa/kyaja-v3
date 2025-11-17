import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId, rating, comment } = await req.json();

    if (!userId || !rating) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        userId,
        productId: params.id,
        rating,
        comment,
      },
    });

    const reviews = await prisma.review.findMany({
      where: {
        productId: params.id,
      },
    });

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    await prisma.product.update({
      where: {
        id: params.id,
      },
      data: {
        averageRating,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        productId: params.id,
      },
      include: {
        user: true,
      },
    });

    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({
      reviews,
      averageRating: product?.averageRating || 0,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
