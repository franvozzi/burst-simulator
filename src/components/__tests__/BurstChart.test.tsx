import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BurstChart from '../BurstChart';
import type { SimulationData } from '@/types/burst';

const mockData: SimulationData = {
    upload: [
        { time: 0, speed: 1000 },
        { time: 1, speed: 1000 },
        { time: 2, speed: 950 },
    ],
    download: [
        { time: 0, speed: 2000 },
        { time: 1, speed: 2000 },
        { time: 2, speed: 1900 },
    ],
};

describe('BurstChart', () => {
    it('renders with simulation data', () => {
        render(<BurstChart data={mockData} />);

        expect(screen.getByText(/Simulación de Burst en el Tiempo/i)).toBeInTheDocument();
    });

    it('shows message when no data', () => {
        const emptyData: SimulationData = {
            upload: [],
            download: [],
        };

        render(<BurstChart data={emptyData} />);

        expect(screen.getByText(/No hay datos de simulación/i)).toBeInTheDocument();
    });

    it('displays note about burst behavior', () => {
        render(<BurstChart data={mockData} />);

        expect(screen.getByText(/Nota:/i)).toBeInTheDocument();
        expect(screen.getByText(/alcanza el Burst Limit/i)).toBeInTheDocument();
    });
});
