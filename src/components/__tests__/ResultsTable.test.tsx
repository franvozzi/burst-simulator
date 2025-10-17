import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResultsTable from '../ResultsTable';
import type { BurstResult } from '@/types/burst';

const mockResult: BurstResult = {
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

describe('ResultsTable', () => {
    it('renders component', () => {
        render(<ResultsTable result={mockResult} />);
        expect(screen.getByText(/Resultados del Cálculo/i)).toBeInTheDocument();
    });

    it('displays general tab data by default', () => {
        render(<ResultsTable result={mockResult} />);

        // Buscar por texto que contenga "512K" en cualquier elemento
        expect(screen.getAllByText(/512K/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/1M/i).length).toBeGreaterThan(0);
    });

    it('switches to advanced tab', async () => {
        const user = userEvent.setup();
        render(<ResultsTable result={mockResult} />);

        const advancedTab = screen.getByRole('tab', { name: /Avanzado/i });
        await user.click(advancedTab);

        await waitFor(() => {
            expect(screen.getByText(/Limit At/i)).toBeInTheDocument();
        });
    });

    it('displays rate limit information', () => {
        render(<ResultsTable result={mockResult} />);
        expect(screen.getByText(/512K\/1M 1M\/2M/i)).toBeInTheDocument();
    });
});
