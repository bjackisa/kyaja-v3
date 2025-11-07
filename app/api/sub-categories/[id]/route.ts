import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  id: string;
}
export async function GET(request: NextRequest, { params: { id } }: { params: Params }) {
  try {
    const category = await db.subCategory.findUnique({
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

export async function DELETE(request: NextRequest, { params: { id } }: { params: Params }) {
  try {
    const existingCategory = await db.subCategory.findUnique({
      where: {
        id,
      },
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
    const deletedCategory = await db.subCategory.delete({
      where: {
        id,
      },
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

// export async function PUT(request: NextRequest, { params: { id } }: { params: Params }) {
//   try {
//     const { title, categoryId ,image} = await request.json();
//     const existingCategory = await db.subCategory.findUnique({
//       where: {
//         id,
//       },
//     });
//     if (!existingCategory) {
//       return NextResponse.json(
//         {
//           data: null,
//           message: `Not Found`,
//         },
//         { status: 404 }
//       );
//     }
//     const updatedCategory = await db.subCategory.update({
//       where: { id },
//       data: { title, categoryId ,image },
//     });
//     return NextResponse.json(updatedCategory);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       {
//         message: "Failed to Update Category",
//         error,
//       },
//       { status: 500 }
//     );
//   }
// }
