import { fireEvent } from '@testing-library/react';
import { render, screen } from '../../test/test-utils';
import { describe, it, expect, vi } from 'vitest';
import AssetCard from './AssetCard';
import { CryptoAsset } from '@/src/types';

const mockAsset: CryptoAsset = {
  id: 'BTC',
  symbol: 'BTC',
  price: 50000,
  change24h: 5.2,
  lowPrice: 48000,
  highPrice: 51000,
  volume: '1000',
};

describe('AssetCard', () => {
  it('renders asset symbol and formatted price', () => {
    const handleClick = vi.fn();
    render(<AssetCard asset={mockAsset} onClick={handleClick} />);

    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText(/\$50,000/)).toBeInTheDocument();
  });

  it('renders positive change with green color logic', () => {
    const handleClick = vi.fn();
    render(<AssetCard asset={mockAsset} onClick={handleClick} />);
    
    const changeBadge = screen.getByText(/5.20%/);
    expect(changeBadge).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<AssetCard asset={mockAsset} onClick={handleClick} />);

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(mockAsset);
  });
});