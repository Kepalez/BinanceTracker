import { CryptoAsset } from "../../types";
import { formatCurrency, formatPercentage, cn } from "../../lib/utils";
import { TrendingUp, TrendingDown, Activity, BarChart3 } from "lucide-react";

interface AssetDetailsPanelProps {
  asset: CryptoAsset | null;
}

export default function AssetDetailsPanel({ asset }: AssetDetailsPanelProps) {
  if (!asset) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-white border-l border-slate-200 text-slate-400">
        <div className="bg-slate-50 p-4 rounded-full mb-4">
          <BarChart3 size={48} className="opacity-20" />
        </div>
        <h3 className="text-lg font-semibold text-slate-600">No selection</h3>
        <p className="text-sm max-w-50 mt-2">
          Click on an active on the list to see its details.
        </p>
      </div>
    );
  }

  const isPositive = asset.change24h >= 0;

  // 2. Estado con Datos
  return (
    <div className="h-full flex flex-col bg-white border-l border-slate-200 overflow-y-auto">
      {/* Header del Panel */}
      <div className="p-6 border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur-sm z-10">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              {asset.symbol}
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">USDT</span>
            </h2>
            <p className="text-slate-500 text-sm">Spot market</p>
          </div>
          <div className={cn(
            "flex items-center gap-1 text-sm font-bold px-3 py-1 rounded-full",
            isPositive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
          )}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {formatPercentage(asset.change24h)}
          </div>
        </div>

        <div className="mt-4">
          <span className="text-4xl font-bold tracking-tight text-slate-900">
            {formatCurrency(asset.price)}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <StatRow label="Máximo 24h" value={formatCurrency(asset.highPrice)} />
          <StatRow label="Mínimo 24h" value={formatCurrency(asset.lowPrice)} />
          <StatRow label="Volumen" value={parseFloat(asset.volume).toLocaleString()} />
        </div>

        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 h-64 flex items-center justify-center text-slate-400 text-sm flex-col gap-2">
          <Activity size={24} />
          <span>Cool graph here</span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
            Purchse
          </button>
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-lg transition-colors">
            Sell
          </button>
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
      <span className="text-slate-500 text-sm">{label}</span>
      <span className="font-medium text-slate-900">{value}</span>
    </div>
  );
}