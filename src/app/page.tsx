'use client';

import { useCryptoData } from '../hooks/useCryptoData';

export default function DashboardPage() {
  const { assets, loading, error, search, setSearch, refresh } = useCryptoData();

  if (loading && assets.length === 0) {
    return <div className="p-8 text-blue-600 animate-pulse">Loading Market...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-red-500">
        <p>Ocurrió un error: {error}</p>
        <button onClick={refresh} className="mt-4 underline">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">USDT Market</h2>
        <button 
          onClick={refresh} 
          className="text-sm bg-slate-200 px-3 py-1 rounded hover:bg-slate-300 transition"
        >
          Refresh
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar cripto (ej. BTC)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map((asset) => (
          <div key={asset.id} className="p-4 border rounded shadow bg-white hover:shadow-md transition">
            <div className="flex justify-between font-bold">
              <span>{asset.symbol}</span>
              <span>${asset.price.toLocaleString()}</span>
            </div>
            <div className={`text-sm ${asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {asset.change24h > 0 ? '+' : ''}{asset.change24h}%
            </div>
          </div>
        ))}
        
        {assets.length === 0 && (
          <div className="col-span-full text-center text-slate-500 py-10">
            No results found for "{search}"
          </div>
        )}
      </div>
    </div>
  );
}