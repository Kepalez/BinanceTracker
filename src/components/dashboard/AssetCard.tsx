import { cn, formatCurrency, formatPercentage } from "@/src/lib/utils";
import { CryptoAsset } from "@/src/types";
import { TrendingUp, TrendingDown } from "lucide-react";

interface AssetCardProps {
  asset: CryptoAsset;
  onClick: (asset: CryptoAsset) => void;
}

export default function AssetCard({ asset, onClick }: AssetCardProps) {
  const isPositive = asset.change24h >= 0;

  return (
    <button
      onClick={() => onClick(asset)}
      className="group flex flex-col w-full text-left bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200"
    >
      <div className="flex justify-between items-start w-full mb-2">
        <div>
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {asset.symbol}
          </h3>
        </div>
        
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
            isPositive 
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
              : "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
          )}
        >
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {formatPercentage(asset.change24h)}
        </div>
      </div>

      <div className="mt-auto">
        <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {formatCurrency(asset.price)}
        </span>
      </div>
    </button>
  );
}