import { fireEvent } from '@testing-library/react';
import { render, screen } from '../../test/test-utils';
import { describe, it, expect, vi } from 'vitest';
import AssetList from './AssetList';
import { CryptoAsset } from '../../types';

const mockAssets: CryptoAsset[] = [
  { id: 'BTC', symbol: 'BTC', price: 50000, change24h: 5.0, lowPrice: 0, highPrice: 0, volume: '0' },
  { id: 'ETH', symbol: 'ETH', price: 3000, change24h: -2.0, lowPrice: 0, highPrice: 0, volume: '0' },
];

describe('AssetList', () => {
  it('shows loading skeletons when isLoading is true', () => {
    render(<AssetList assets={[]} isLoading={true} onSelectAsset={vi.fn()} />);
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('shows empty state message when no assets provided', () => {
    render(<AssetList assets={[]} isLoading={false} onSelectAsset={vi.fn()} />);
    // CORRECCIÓN: Texto en Inglés
    expect(screen.getByText('No cryptocurrencies found')).toBeInTheDocument();
  });

  it('renders a list of assets', () => {
    render(<AssetList assets={mockAssets} isLoading={false} onSelectAsset={vi.fn()} />);
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('ETH')).toBeInTheDocument();
  });

  it('calls onSelectAsset when an item is clicked', () => {
    const handleSelect = vi.fn();
    render(<AssetList assets={mockAssets} isLoading={false} onSelectAsset={handleSelect} />);
    
    fireEvent.click(screen.getByText('BTC'));
    expect(handleSelect).toHaveBeenCalledWith(mockAssets[0]);
  });
});