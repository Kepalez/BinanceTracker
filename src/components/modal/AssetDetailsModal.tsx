import { useEffect } from 'react';
import { X, TrendingUp, TrendingDown, Activity, DollarSign, BarChart3 } from 'lucide-react';
import { CryptoAsset } from '@/src/types';
import { cn, formatCurrency, formatPercentage } from '@/src/lib/utils';

interface AssetDetailsModalProps {
  asset: CryptoAsset | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AssetDetailsModal({ asset, isOpen, onClose }: AssetDetailsModalProps) {
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !asset) return null;

  const isPositive = asset.change24h >= 0;

  return (
    <div 
      className="md:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 transition-all"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="flex justify-between items-start p-6 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
              {asset.symbol}
              <span className="text-sm font-normal text-slate-500 bg-slate-200 px-2 py-0.5 rounded-md">USDT</span>
            </h2>
            <p className="text-slate-500 text-sm mt-1">Market details 24/7</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white rounded-full hover:bg-slate-100 border border-slate-200 text-slate-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          <div className="text-center">
            <span className="text-5xl font-bold tracking-tighter text-slate-900 block">
              {formatCurrency(asset.price)}
            </span>
            <div 
              className={cn(
                "inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-sm font-bold",
                isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              )}
            >
              {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {formatPercentage(asset.change24h)} (24h)
            </div>
          </div>

          <hr className="border-slate-100" />

          <div className="grid grid-cols-2 gap-4">
            <StatBox 
              label="Precio Máximo (24h)" 
              value={formatCurrency(asset.highPrice)} 
              icon={<TrendingUp className="text-green-500" size={18} />} 
            />
            <StatBox 
              label="Precio Mínimo (24h)" 
              value={formatCurrency(asset.lowPrice)} 
              icon={<TrendingDown className="text-red-500" size={18} />} 
            />
            <StatBox 
              label="Volumen (BTC/Asset)" 
              value={parseFloat(asset.volume).toLocaleString()} 
              icon={<Activity className="text-blue-500" size={18} />} 
            />
            <StatBox 
              label="Capitalización Aprox" 
              value="N/A" 
              subtext="(Requiere API Pro)"
              icon={<BarChart3 className="text-purple-500" size={18} />} 
            />
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors">
            Purchase {asset.symbol}
          </button>
          <button className="flex-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl transition-colors">
            Add to favorites
          </button>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, icon, subtext }: { label: string, value: string, icon: React.ReactNode, subtext?: string }) {
  return (
    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
      <div className="flex items-center gap-2 mb-2 text-slate-500 text-xs font-semibold uppercase">
        {icon}
        {label}
      </div>
      <div className="text-lg font-bold text-slate-800 truncate" title={value}>
        {value}
      </div>
      {subtext && <div className="text-xs text-slate-400 mt-1">{subtext}</div>}
    </div>
  );
}