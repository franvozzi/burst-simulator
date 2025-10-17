import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
    cleanup();
});

global.fetch = vi.fn();

vi.mock('recharts', () => ({
    LineChart: vi.fn(() => null),
    Line: vi.fn(() => null),
    XAxis: vi.fn(() => null),
    YAxis: vi.fn(() => null),
    CartesianGrid: vi.fn(() => null),
    Tooltip: vi.fn(() => null),
    Legend: vi.fn(() => null),
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => children,
}));

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
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

global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));
