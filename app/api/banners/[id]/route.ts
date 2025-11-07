import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
interface Params {
  id: string;
}
export async function GET(request: NextRequest, { params: { id } }: { params: Params }) {
  try {
    const banner = await db.banner.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(banner);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch Banner",
        error,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: { params: Params }) {
  try {
    const existingBanner = await db.banner.findUnique({
      where: {
        id,
      },
    });
    if (!existingBanner) {
      return NextResponse.json(
        {
          data: null,
          message: "Banner Not Found",
        },
        { status: 404 }
      );
    }
    const deletedBanner = await db.banner.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedBanner);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Delete Banner",
        error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params: { id } }: { params: Params }) {
  try {
    const { title, link, imageUrl, isActive, productIds ,previewImageUrl  } = await request.json();
    const updatedBanner = await db.banner.update({
      where: { id },
      data: {
        title,
        link,
        imageUrl,
        isActive,
        productIds,
        previewImageUrl 
      },
    });
    return NextResponse.json(updatedBanner);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failed to update Banner",
      },
      { status: 500 }
    );
  }
}
