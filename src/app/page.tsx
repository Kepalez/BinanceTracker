'use client';

import { useState } from 'react';
import { useCryptoData } from '../hooks/useCryptoData';
import AssetList from '../components/dashboard/AssetList';
import AssetDetailsModal from '../components/dashboard/AssetDetailsModal';
import { Search, RefreshCw } from 'lucide-react';
import { CryptoAsset } from '../types';

export default function DashboardPage() {
  const { assets, loading, error, search, setSearch, refresh } = useCryptoData();
  
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset | null>(null);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mercado Crypto</h1>
          <p className="text-slate-500 text-sm">Precios en tiempo real (USDT)</p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar (BTC, ETH...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <button 
            onClick={refresh}
            disabled={loading}
            className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 disabled:opacity-50 transition-colors"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 flex items-center justify-between">
          <span>⚠️ {error}</span>
          <button onClick={refresh} className="text-sm font-bold hover:underline">Reintentar</button>
        </div>
      )}

      <AssetList 
        assets={assets} 
        isLoading={loading} 
        onSelectAsset={(asset) => setSelectedAsset(asset)} 
      />

      <AssetDetailsModal 
        isOpen={!!selectedAsset} 
        asset={selectedAsset} 
        onClose={() => setSelectedAsset(null)} 
      />
    </div>
  );
}