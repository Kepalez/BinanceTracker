import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://data-api.binance.vision/api/v3/ticker/24hr', {
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      throw new Error(`Binance API Error: ${res.statusText}`);
    }
    const data = await res.json();
    const usdtPairs = data.filter((item: any) => item.symbol.endsWith('USDT'));
    return NextResponse.json(usdtPairs);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}