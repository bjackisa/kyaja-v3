import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
interface Params {
  id: string;
}
export async function GET(request: NextRequest, { params: { id } }: { params: Params }) {
  try {
    const category = await db.category.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch Category",
        error,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  try {
    const existingCategory = await db.category.findUnique({
      where: { id },
    });
    if (!existingCategory) {
      return NextResponse.json(
        {
          data: null,
          message: "Category Not Found",
        },
        { status: 404 }
      );
    }
    const deletedCategory = await db.category.delete({
      where: { id },
    });
    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Delete Category",
        error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params: { id } }: { params: Params }) {
  try {
    const { title, slug, imageUrl, description, isActive } =
      await request.json();
    const existingCategory = await db.category.findUnique({
      where: {
        id,
      },
    });
    if (!existingCategory) {
      return NextResponse.json(
        {
          data: null,
          message: `Not Found`,
        },
        { status: 404 }
      );
    }
    const updatedCategory = await db.category.update({
      where: { id },
      data: { title, slug, imageUrl, description, isActive },
    });
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Update Category",
        error,
      },
      { status: 500 }
    );
  }
}
