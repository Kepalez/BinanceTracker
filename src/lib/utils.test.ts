import { describe, it, expect } from 'vitest';
import { formatCurrency, formatPercentage, cn } from './utils';

describe('Utils', () => {
  describe('formatCurrency', () => {
    it('formats standard amounts correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });

    it('formats small amounts with more precision', () => {
      expect(formatCurrency(0.000123)).toBe('$0.000123');
    });

    it('handles zero correctly', () => {
       expect(formatCurrency(0)).toBe('$0.000000'); 
    });
  });

  describe('formatPercentage', () => {
    it('formats percentage correctly', () => {
      expect(formatPercentage(5.5)).toBe('5.50%');
      expect(formatPercentage(-2.3)).toBe('-2.30%');
    });
  });

  describe('cn (Tailwind Merge)', () => {
    it('merges classes correctly', () => {
      const result = cn('bg-red-500', 'bg-blue-500', 'text-white');
      expect(result).toBe('bg-blue-500 text-white');
    });
  });
});