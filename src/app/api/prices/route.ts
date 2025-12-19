// src/app/api/prices/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // URL oficial de Binance para tickers de 24h
    const res = await fetch('https://api.binance.com/api/v3/ticker/24hr', {
      next: { revalidate: 30 }, // Cachear por 30 segundos para no saturar
    });

    if (!res.ok) {
      throw new Error('Error fetching from Binance');
    }

    const data = await res.json();
    
    // Filtramos para que no lleguen 2000 pares, solo los que terminen en USDT (más comunes)
    // Esto mejora el rendimiento en el frontend.
    const usdtPairs = data.filter((item: any) => item.symbol.endsWith('USDT'));

    return NextResponse.json(usdtPairs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}