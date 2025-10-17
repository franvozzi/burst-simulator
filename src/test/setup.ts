import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup después de cada test
afterEach(() => {
    cleanup();
});

// Mock de fetch global
global.fetch = vi.fn();

// Mock de Recharts
vi.mock('recharts', () => ({
    LineChart: vi.fn(() => null),
    Line: vi.fn(() => null),
    XAxis: vi.fn(() => null),
    YAxis: vi.fn(() => null),
    CartesianGrid: vi.fn(() => null),
    Tooltip: vi.fn(() => null),
    Legend: vi.fn(() => null),
    ResponsiveContainer: ({ children }: any) => children,
}));

// Mock de window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock de ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));
