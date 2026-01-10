import db from "@/lib/db";
import { getRelworxAccountNo, relworxFetch } from "@/lib/relworx";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, internal_reference } = body || {};

    if (!orderId && !internal_reference) {
      return NextResponse.json(
        { message: "Provide orderId or internal_reference" },
        { status: 400 }
      );
    }

    const order = orderId ? await db.order.findUnique({ where: { id: orderId } }) : null;
    const internalRef = internal_reference || order?.relworxInternalReference;

    if (!internalRef) {
      return NextResponse.json(
        { message: "Missing internal_reference" },
        { status: 400 }
      );
    }

    const accountNo = getRelworxAccountNo();

    const data: any = await relworxFetch({
      path: "/mobile-money/check-request-status",
      method: "GET",
      query: {
        internal_reference: internalRef,
        account_no: accountNo,
      },
    });

    if (orderId && order) {
      const status = String(data?.status || data?.request_status || "").toUpperCase();
      const normalized = status || null;

      await db.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: normalized,
          relworxProvider: data?.provider ? String(data.provider) : order.relworxProvider,
          relworxCharge: typeof data?.charge === "number" ? data.charge : order.relworxCharge,
          relworxCompletedAt: data?.completed_at ? new Date(data.completed_at) : order.relworxCompletedAt,
          relworxLastStatusCheckedAt: new Date(),
        },
      });
    }

    return NextResponse.json({ success: true, data });
  } catch (e: any) {
    console.error("Relworx check status error:", e?.data || e);
    return NextResponse.json(
      { message: e?.message || "Server error" },
      { status: typeof e?.status === "number" ? e.status : 500 }
    );
  }
}
