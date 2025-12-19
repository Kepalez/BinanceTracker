
export interface BinanceTicker {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
}

export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;     
  price: number;
  change24h: number;
  isFavorite?: boolean;
}

export type FetchState = 'idle' | 'loading' | 'success' | 'error';