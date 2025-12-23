import { CryptoAsset } from "@/src/types";
import { SearchX } from "lucide-react";
import AssetCard from "./AssetCard";
import { useLanguage } from "../providers/LanguageProvider";

interface AssetListProps {
  assets: CryptoAsset[];
  isLoading: boolean;
  onSelectAsset: (asset: CryptoAsset) => void;
}

export default function AssetList({ assets, isLoading, onSelectAsset }: AssetListProps) {
  const { t } = useLanguage();
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-32 bg-slate-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <SearchX size={48} className="mb-4 opacity-50" />
        <p className="text-lg font-medium">{t.details.notFound}</p>
        <p className="text-sm">{t.details.searchHint}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
      {assets.map((asset) => (
        <AssetCard 
          key={asset.id} 
          asset={asset} 
          onClick={onSelectAsset} 
        />
      ))}
    </div>
  );
}