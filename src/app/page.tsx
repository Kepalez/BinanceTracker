'use client';

import { Search, RefreshCw } from 'lucide-react';
import { useCryptoData } from '../hooks/useCryptoData';
import { CryptoAsset } from '../types';
import AssetList from '../components/dashboard/AssetList';

export default function DashboardPage() {
  const { assets, loading, error, search, setSearch, refresh } = useCryptoData();

  // Handler temporal hasta que hagamos el Modal
  const handleSelectAsset = (asset: CryptoAsset) => {
    console.log("Seleccionado:", asset);
    alert(`Has hecho click en ${asset.symbol} - Precio: $${asset.price}`);
    // Aquí abriremos el modal en el siguiente paso
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header y Controles */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mercado Crypto</h1>
          <p className="text-slate-500 text-sm">Precios en tiempo real (USDT)</p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          {/* Buscador Estilizado */}
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar (BTC, ETH...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Botón Refresh */}
          <button 
            onClick={refresh}
            disabled={loading}
            className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 disabled:opacity-50 transition-colors"
            title="Actualizar precios"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Manejo de Error Global */}
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 flex items-center justify-between">
          <span>⚠️ {error}</span>
          <button onClick={refresh} className="text-sm font-bold hover:underline">Reintentar</button>
        </div>
      )}

      {/* Grid de Assets */}
      <AssetList 
        assets={assets} 
        isLoading={loading} 
        onSelectAsset={handleSelectAsset} 
      />
    </div>
  );
}