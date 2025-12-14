import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const where = {
      isActive: true,
      productStock: {
        gt: 0,
      },
    } as const;

    const count = await db.product.count({ where });

    if (!count) {
      return NextResponse.json(null);
    }

    const skip = Math.floor(Math.random() * count);

    const [product] = await db.product.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: 1,
      select: {
        title: true,
        slug: true,
        imageUrl: true,
        productPrice: true,
        salePrice: true,
        isDiscount: true,
        discount: true,
      },
    });

    if (!product) {
      return NextResponse.json(null);
    }

    return NextResponse.json({
      title: product.title,
      slug: product.slug,
      imageUrl: product.imageUrl,
      productPrice: product.productPrice,
      salePrice: product.salePrice,
      isDiscount: product.isDiscount,
      discount: product.discount,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch spotlight product",
      },
      { status: 500 }
    );
  }
}
