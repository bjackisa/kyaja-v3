import db from "@/lib/db";
import { getRelworxAccountNo, relworxFetch } from "@/lib/relworx";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, msisdn } = body || {};

    if (!orderId || !msisdn) {
      return NextResponse.json({ message: "orderId and msisdn are required" }, { status: 400 });
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
      path: "/mobile-money/request-payment",
      method: "POST",
      body: {
        account_no: accountNo,
        reference,
        msisdn,
        currency: "UGX",
        amount,
        description: `Order ${reference}`,
      },
    });

    if (!data?.success) {
      return NextResponse.json({ message: data?.message || "Payment request failed", data }, { status: 400 });
    }

    await db.order.update({
      where: { id: orderId },
      data: {
        paymentMethod: "Mobile Money",
        paymentStatus: "PENDING",
        paymentCurrency: "UGX",
        paymentAmount: amount,
        relworxInternalReference: data.internal_reference || null,
        relworxCustomerReference: reference,
        relworxProvider: data.provider || null,
      },
    });

    return NextResponse.json({
      success: true,
      internal_reference: data.internal_reference,
      message: data.message || "Payment requested",
    });
  } catch (e: any) {
    console.error("Relworx mobile money request error:", e?.data || e);
    return NextResponse.json(
      { message: e?.message || "Server error" },
      { status: typeof e?.status === "number" ? e.status : 500 }
    );
  }
}
