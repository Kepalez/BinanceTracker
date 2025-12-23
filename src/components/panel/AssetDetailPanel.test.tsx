import { waitFor } from '@testing-library/react';
import { render, screen } from '../../test/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AssetDetailsPanel from './AssetDetailPanel';
import { CryptoAsset } from '../../types';

vi.mock('recharts', async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    ResponsiveContainer: ({ children }: any) => <div style={{ width: 500, height: 300 }}>{children}</div>,
  };
});

const mockAsset: CryptoAsset = {
  id: 'BTC', symbol: 'BTC', price: 60000, change24h: 2.5, 
  highPrice: 61000, lowPrice: 59000, volume: '1000' 
};

describe('AssetDetailsPanel', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('renders empty state when no asset is selected', () => {
    render(<AssetDetailsPanel asset={null} />);
    expect(screen.getByText('No selection')).toBeInTheDocument();
  });

  it('renders asset details and triggers history fetch', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => [{ time: '10:00', price: 50000 }],
    });

    render(<AssetDetailsPanel asset={mockAsset} />);

    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('24h High')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/history?symbol=BTCUSDT'));
    });
  });
});