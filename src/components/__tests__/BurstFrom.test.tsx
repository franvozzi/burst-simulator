import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BurstForm from '../BurstForm';

describe('BurstForm', () => {
    it('renders all input fields', () => {
        render(<BurstForm onCalculate={vi.fn()} loading={false} />);

        const maxLimitInputs = screen.getAllByLabelText(/Max Limit \(K\/M\)/i);
        const burstLimitInputs = screen.getAllByLabelText(/Burst Limit \(K\/M\)/i);
        const burstThresholdInputs = screen.getAllByLabelText(/Burst Threshold \(K\/M\)/i);
        const burstTimeInputs = screen.getAllByLabelText(/Burst Time \(segundos\)/i);
        const priorityInput = screen.getByLabelText(/Priority/i);

        expect(maxLimitInputs).toHaveLength(2);
        expect(burstLimitInputs).toHaveLength(2);
        expect(burstThresholdInputs).toHaveLength(2);
        expect(burstTimeInputs).toHaveLength(2);
        expect(priorityInput).toBeInTheDocument();
    });

    it('has default values', () => {
        render(<BurstForm onCalculate={vi.fn()} loading={false} />);

        const maxLimitUpload = screen.getByDisplayValue('512K');
        const maxLimitDownload = screen.getAllByDisplayValue('1M')[0];

        expect(maxLimitUpload).toBeInTheDocument();
        expect(maxLimitDownload).toBeInTheDocument();
    });

    it('calls onCalculate with correct config when button is clicked', async () => {
        const mockOnCalculate = vi.fn();
        const user = userEvent.setup();

        render(<BurstForm onCalculate={mockOnCalculate} loading={false} />);

        const button = screen.getByRole('button', { name: /Calcular Burst/i });
        await user.click(button);

        expect(mockOnCalculate).toHaveBeenCalledWith({
            maxLimitUpload: '512K',
            maxLimitDownload: '1M',
            burstLimitUpload: '1M',
            burstLimitDownload: '2M',
            burstThresholdUpload: '384K',
            burstThresholdDownload: '750K',
            burstTimeUpload: 6,
            burstTimeDownload: 6,
            priority: 8,
        });
    });

    it('updates input values when typing', async () => {
        const user = userEvent.setup();
        render(<BurstForm onCalculate={vi.fn()} loading={false} />);

        const input = screen.getByLabelText(/Max Limit \(K\/M\)/i, {
            selector: '#maxLimitUpload',
        });

        await user.clear(input);
        await user.type(input, '1024K');

        expect(input).toHaveValue('1024K');
    });

    it('disables button when loading', () => {
        render(<BurstForm onCalculate={vi.fn()} loading={true} />);

        const button = screen.getByRole('button', { name: /Calculando.../i });
        expect(button).toBeDisabled();
    });

    it('renders upload and download sections', () => {
        render(<BurstForm onCalculate={vi.fn()} loading={false} />);

        expect(screen.getByText('📤 Upload')).toBeInTheDocument();
        expect(screen.getByText('📥 Download')).toBeInTheDocument();
    });

    it('priority input has correct default value and attributes', () => {
        render(<BurstForm onCalculate={vi.fn()} loading={false} />);

        const priorityInput = screen.getByLabelText(/Priority/i);

        expect(priorityInput).toHaveValue(8);
        expect(priorityInput).toHaveAttribute('type', 'number');
    });
});
