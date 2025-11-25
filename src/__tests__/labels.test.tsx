import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LabelsEditor } from '../components/LabelsEditor';

describe('LabelsEditor', () => {
  it('adds and removes labels', () => {
    const labels: string[] = [];
    const handleChange = (next: string[]) => {
      labels.splice(0, labels.length, ...next);
    };

    render(<LabelsEditor labels={labels} onChange={handleChange} />);

    const input = screen.getByPlaceholderText(/add label/i);
    fireEvent.change(input, { target: { value: 'urgent' } });
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);

    expect(labels).toContain('urgent');
    expect(screen.getByText('urgent')).not.toBeNull();

    const chip = screen.getByRole('button', { name: /urgent/i });
    const deleteIcon = chip.querySelector('svg');
    if (deleteIcon) {
      fireEvent.click(deleteIcon);
    }

    expect(labels).not.toContain('urgent');
  });
});
