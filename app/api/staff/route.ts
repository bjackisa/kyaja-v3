import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const customers = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        role: {
          in: ["ADMIN", "SECRETARY"], 
        },
      },
      include: {
        profile: true,
      },
    });
    return NextResponse.json(customers);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch Users",
        error,
      },
      { status: 500 }
    );
  }
}
