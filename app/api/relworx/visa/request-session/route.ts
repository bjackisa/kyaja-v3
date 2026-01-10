import db from "@/lib/db";
import { getRelworxAccountNo, relworxFetch } from "@/lib/relworx";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId } = body || {};

    if (!orderId) {
      return NextResponse.json({ message: "orderId is required" }, { status: 400 });
    }

    const order = await db.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    const amount = Number(order.totalOrderAmount || 0);
    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ message: "Order amount is invalid" }, { status: 400 });
    }

    const accountNo = getRelworxAccountNo();
    const reference = order.orderNumber || `order-${order.id}`;

    const data: any = await relworxFetch({
      path: "/visa/request-session",
      method: "POST",
      body: {
        account_no: accountNo,
        reference,
        currency: "UGX",
        amount,
        description: `Order ${reference}`,
      },
    });

    if (!data?.success || !data?.payment_url) {
      return NextResponse.json({ message: data?.message || "Card session failed", data }, { status: 400 });
    }

    await db.order.update({
      where: { id: orderId },
      data: {
        paymentMethod: "Card",
        paymentStatus: "PENDING",
        paymentCurrency: "UGX",
        paymentAmount: amount,
        relworxPaymentUrl: data.payment_url,
        relworxCustomerReference: reference,
      },
    });

    return NextResponse.json({ success: true, payment_url: data.payment_url });
  } catch (e: any) {
    console.error("Relworx card request-session error:", e?.data || e);
    return NextResponse.json(
      { message: e?.message || "Server error" },
      { status: typeof e?.status === "number" ? e.status : 500 }
    );
  }
}
