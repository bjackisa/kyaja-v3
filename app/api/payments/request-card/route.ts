import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, reference } = await req.json();

    if (!amount || !reference) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const relworxRes = await fetch('https://payments.relworx.com/api/visa/request-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.relworx.v2',
        'Authorization': `Bearer ${process.env.RELWORX_API_KEY}`
      },
      body: JSON.stringify({
        account_no: process.env.RELWORX_ACCOUNT_NO,
        reference: reference,
        currency: 'UGX',
        amount: parseFloat(amount),
        description: 'Card payment'
      })
    });

    const data = await relworxRes.json();

    if (data.success) {
      return NextResponse.json({ paymentUrl: data.payment_url });
    } else {
      console.error('Relworx API Error:', data);
      return NextResponse.json({ error: data.message || 'Card session failed' }, { status: 400 });
    }
  } catch (err) {
    console.error('Error initiating card session:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
