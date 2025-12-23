import { fireEvent } from '@testing-library/react';
import { render, screen } from '../../test/test-utils';
import { describe, it, expect, vi } from 'vitest';
import AssetDetailsModal from './AssetDetailsModal';
import { CryptoAsset } from '../../types';

const mockAsset: CryptoAsset = {
  id: 'ETH', symbol: 'ETH', price: 3000, change24h: -1.5,
  highPrice: 3100, lowPrice: 2900, volume: '500'
};

describe('AssetDetailsModal', () => {
  it('does not render when isOpen is false', () => {
    render(<AssetDetailsModal asset={mockAsset} isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByText('ETH')).not.toBeInTheDocument();
  });

  it('renders content when isOpen is true', () => {
    render(<AssetDetailsModal asset={mockAsset} isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('ETH')).toBeInTheDocument();
    expect(screen.getByText(/Market details/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<AssetDetailsModal asset={mockAsset} isOpen={true} onClose={handleClose} />);
    const closeBtn = document.querySelector('button.rounded-full'); 
    if (closeBtn) fireEvent.click(closeBtn);
    
    expect(handleClose).toHaveBeenCalled();
  });
});