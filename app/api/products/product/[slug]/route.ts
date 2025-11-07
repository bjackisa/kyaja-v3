import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
interface Params {
  id: string;
}
interface Params2 {
  slug: string;
}


export async function GET(request: NextRequest, { params: { slug } }: { params: Params2 }) {
  try {
    const product = await db.product.findUnique({
      where: {
        slug,
      },
      include: {
        subCategory: true,
        category: true,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch Product",
        error,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: { params: Params }) {
  try {
    const existingProduct = await db.product.findUnique({
      where: {
        id,
      },
    });
    if (!existingProduct) {
      return NextResponse.json(
        {
          data: null,
          message: "Product Not Found",
        },
        { status: 404 }
      );
    }

    const deletedProduct = await db.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Delete Product",
        error,
      },
      { status: 500 }
    );
  }
}


