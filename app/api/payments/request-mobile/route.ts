import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { msisdn, amount, reference } = await req.json();

    if (!msisdn || !amount || !reference) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const relworxRes = await fetch('https://payments.relworx.com/api/mobile-money/request-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.relworx.v2',
        'Authorization': `Bearer ${process.env.RELWORX_API_KEY}`
      },
      body: JSON.stringify({
        account_no: process.env.RELWORX_ACCOUNT_NO,
        reference: reference,
        msisdn: msisdn,
        currency: 'UGX',
        amount: parseFloat(amount),
        description: 'Order payment request'
      })
    });

    const data = await relworxRes.json();

    if (!relworxRes.ok || !data.success) {
      console.error('Relworx API Error:', data);
      return NextResponse.json({ error: data.message || 'Payment request failed' }, { status: relworxRes.status });
    }

    return NextResponse.json({
      message: 'Payment requested',
      internalReference: data.internal_reference
    });

  } catch (err) {
    console.error('Error calling Relworx API:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
