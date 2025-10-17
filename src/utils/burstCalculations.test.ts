import { describe, it, expect, beforeEach, vi } from 'vitest';
import { calculateBurst, simulateBurst } from './burstCalculations';
import type { BurstConfig } from '../types/burst';

const mockConfig: BurstConfig = {
    maxLimitUpload: '512K',
    maxLimitDownload: '1M',
    burstLimitUpload: '1M',
    burstLimitDownload: '2M',
    burstThresholdUpload: '384K',
    burstThresholdDownload: '750K',
    burstTimeUpload: 6,
    burstTimeDownload: 6,
    priority: 8,
};

describe('burstCalculations', () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    describe('calculateBurst', () => {
        it('calls the correct API endpoint', async () => {
            const mockResponse = {
                upload: {
                    maxLimit: '512K',
                    burstLimit: '1M',
                    burstThreshold: '384K',
                    burstTime: 6,
                    limitAt: '384K',
                    burstDuration: 2,
                },
                download: {
                    maxLimit: '1M',
                    burstLimit: '2M',
                    burstThreshold: '750K',
                    burstTime: 6,
                    limitAt: '750K',
                    burstDuration: 2,
                },
                rateLimit: '512K/1M 1M/2M',
            };

            (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const result = await calculateBurst(mockConfig);

            expect(global.fetch).toHaveBeenCalledWith('/api/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mockConfig),
            });

            expect(result).toEqual(mockResponse);
        });

        it('throws error on failed request', async () => {
            (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
                ok: false,
                status: 500,
            });

            await expect(calculateBurst(mockConfig)).rejects.toThrow('HTTP error! status: 500');
        });
    });

    describe('simulateBurst', () => {
        it('calls the correct API endpoint', async () => {
            const mockResponse = {
                upload: [{ time: 0, speed: 1000 }],
                download: [{ time: 0, speed: 2000 }],
            };

            (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const result = await simulateBurst(mockConfig);

            expect(global.fetch).toHaveBeenCalledWith('/api/simulate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mockConfig),
            });

            expect(result).toEqual(mockResponse);
        });
    });
});
