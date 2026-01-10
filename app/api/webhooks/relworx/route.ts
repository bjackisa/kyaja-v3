import db from "@/lib/db";
import { verifyRelworxWebhookSignature } from "@/lib/relworx";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const signatureHeader = req.headers.get("relworx-signature") || req.headers.get("Relworx-Signature");
    const webhookUrl = process.env.RELWORX_WEBHOOK_URL;

    if (webhookUrl) {
      const sigResult = verifyRelworxWebhookSignature({
        signatureHeader,
        webhookUrl,
        payload,
      });

      if (!sigResult.ok) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
    }

    const internalReference = payload?.internal_reference ? String(payload.internal_reference) : null;
    const customerReference = payload?.customer_reference ? String(payload.customer_reference) : null;

    const status = payload?.status ? String(payload.status).toUpperCase() : null;

    if (internalReference) {
      const updateData: Record<string, any> = {
        paymentStatus: status,
      };
      if (payload?.provider) updateData.relworxProvider = String(payload.provider);
      if (typeof payload?.charge === "number") updateData.relworxCharge = payload.charge;
      if (payload?.currency) updateData.paymentCurrency = String(payload.currency);
      if (typeof payload?.amount === "number") updateData.paymentAmount = payload.amount;
      if (payload?.completed_at) updateData.relworxCompletedAt = new Date(payload.completed_at);

      await db.order.updateMany({
        where: {
          OR: [
            { relworxInternalReference: internalReference },
            ...(customerReference ? [{ relworxCustomerReference: customerReference }] : []),
            ...(customerReference ? [{ orderNumber: customerReference }] : []),
          ],
        },
        data: updateData,
      });
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("Relworx webhook error:", e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
