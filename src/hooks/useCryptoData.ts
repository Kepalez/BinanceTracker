import { useState, useEffect, useMemo, useCallback } from 'react';
import { CryptoAsset } from '../types';

export const useCryptoData = () => {
  const [data, setData] = useState<CryptoAsset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [search, setSearch] = useState<string>('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/prices');
      
      if (!response.ok) {
        throw new Error('Error tying to connect to server');
      }

      const rawData = await response.json();

      const cleanData: CryptoAsset[] = rawData.map((item: any) => ({
        id: item.symbol,
        symbol: item.symbol.replace('USDT', ''),
        price: parseFloat(item.lastPrice),
        change24h: parseFloat(item.priceChangePercent),
        lowPrice: parseFloat(item.lowPrice),
        highPrice: parseFloat(item.highPrice),
        volume: item.volume,
      }));

      setData(cleanData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

  }, [fetchData]);

  const filteredAssets = useMemo(() => {
    if (!search) return data;
    
    const lowerSearch = search.toLowerCase();
    return data.filter((asset) => 
      asset.symbol.toLowerCase().includes(lowerSearch)
    );
  }, [data, search]);

  return {
    assets: filteredAssets,
    loading,
    error,
    search,
    setSearch,
    refresh: fetchData, 
  };
};