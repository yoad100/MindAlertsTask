import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LabelsEditor } from '../components/labels/LabelsEditor';

describe('LabelsEditor', () => {
  it('calls onChange when adding a label', () => {
    const handleChange = vi.fn<(labels: string[]) => void>();

    render(<LabelsEditor labels={[]} onChange={handleChange} />);

    const input = screen.getByPlaceholderText(/add label and press enter/i);
    fireEvent.change(input, { target: { value: 'urgent' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(handleChange).toHaveBeenLastCalledWith(['urgent']);
  });

  it('calls onChange when removing a label', () => {
    const handleChange = vi.fn<(labels: string[]) => void>();

    render(<LabelsEditor labels={['urgent']} onChange={handleChange} />);

    const chipButton = screen.getByRole('button', { name: /urgent/i });
    fireEvent.click(chipButton);

    const lastCallArgs = handleChange.mock.calls.at(-1)?.[0] ?? [];
    expect(lastCallArgs).not.toContain('urgent');
  });
});