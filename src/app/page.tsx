'use client';

import { useState } from 'react';
import { useCryptoData } from '../hooks/useCryptoData';
import AssetList from '../components/dashboard/AssetList';
import AssetDetailsModal from '../components/modal/AssetDetailsModal';
import { Search, RefreshCw, AlertCircle } from 'lucide-react';
import { CryptoAsset } from '../types';
import AssetDetailsPanel from '../components/panel/AssetDetailPanel';

export default function DashboardPage() {
  const { assets, loading, error, search, setSearch, refresh } = useCryptoData();
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset | null>(null);

  return (
    <div className="h-full flex flex-col md:flex-row overflow-hidden">
      
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
        
        <div className="p-6 bg-white border-b border-slate-200 shadow-sm z-10">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Market</h2>
              <div className="text-xs text-slate-500">
                {assets.length} results
              </div>
            </div>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar activo..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 text-slate-400 border-transparent focus:bg-white border focus:border-blue-500 rounded-lg outline-none transition-all text-sm"
                />
              </div>
              <button 
                onClick={refresh}
                disabled={loading}
                className="p-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 disabled:opacity-50 transition-colors shadow-sm"
              >
                <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 flex items-center gap-3">
                <AlertCircle size={20} />
                <span>{error}</span>
                <button onClick={refresh} className="ml-auto text-sm font-bold underline">Retry</button>
              </div>
            )}

            <AssetList 
              assets={assets} 
              isLoading={loading} 
              onSelectAsset={setSelectedAsset} 
            />
          </div>
        </div>
      </div>

      <aside className="hidden md:block w-100 border-l border-slate-200 bg-white h-full shadow-xl z-20">
        <AssetDetailsPanel asset={selectedAsset} />
      </aside>

      <AssetDetailsModal 
        isOpen={!!selectedAsset} 
        asset={selectedAsset} 
        onClose={() => setSelectedAsset(null)} 
      />
    </div>
  );
}