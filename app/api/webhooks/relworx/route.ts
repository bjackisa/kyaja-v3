import { NextResponse } from "next/server";
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const signatureHeader = req.headers.get('relworx-signature');

    if (!signatureHeader) {
      console.error('Missing Relworx-Signature header');
      return NextResponse.json({ error: 'Missing signature header' }, { status: 401 });
    }

    const url = process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/relworx` : '';

    if(!url){
      console.error("Missing NEXT_PUBLIC_BASE_URL environment variable for webhook verification")
    }

    // Verify signature
    const timestamp = signatureHeader.split(',')[0].split('=')[1];
    const signature = signatureHeader.split(',')[1].split('=')[1];
    const secret = process.env.RELWORX_WEBHOOK_KEY || '';

    let dataToSign = url + timestamp;
    const relevantParams = {
      status: payload.status,
      customer_reference: payload.customer_reference,
      internal_reference: payload.internal_reference
    };

    Object.keys(relevantParams).sort().forEach(key => {
      dataToSign += key + String(relevantParams[key as keyof typeof relevantParams]);
    });

    const expectedSig = crypto.createHmac('sha256', secret).update(dataToSign).digest('hex');

    if (signature !== expectedSig) {
      console.error('Webhook signature mismatch');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Process the webhook payload
    const { status, customer_reference } = payload;

    let orderStatus;
    if (status === 'success') {
      orderStatus = 'PROCESSING'; // Or 'PAID', if you add that to your enum
    } else if (status === 'failed') {
      orderStatus = 'CANCELED';
    } else {
      orderStatus = 'PENDING';
    }

    await prisma.order.update({
      where: { orderNumber: customer_reference },
      data: { orderStatus },
    });

    console.log(`Order ${customer_reference} status updated to ${orderStatus}`);

    return NextResponse.json({ message: 'Webhook received and order updated' });

  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
