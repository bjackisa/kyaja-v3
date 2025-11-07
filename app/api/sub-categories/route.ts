import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// export async function POST(request:NextRequest) {
//   try {
//     const { title, categoryId , image } = await request.json();
//     const newCategory = await db.subCategory.create({
//       data: { title, categoryId , image },
//     });
//     return NextResponse.json(newCategory);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       {
//         message: "Failed to create Category",
//         error,
//       },
//       { status: 500 }
//     );
//   }
// }
export async function GET() {
  try {
    const categories = await db.subCategory.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        products: true,
        category: true,
      },
    });
    return NextResponse.json(categories);
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
