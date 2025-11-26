import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LabelsEditor } from '../components/labels/LabelsEditor';

describe('LabelsEditor', () => {
  it('adds and removes labels', () => {
    const labels: string[] = [];
    const handleChange = (next: string[]) => {
      labels.splice(0, labels.length, ...next);
    };

    render(<LabelsEditor labels={labels} onChange={handleChange} />);

    const input = screen.getByPlaceholderText(/add label and press enter/i);
    fireEvent.change(input, { target: { value: 'urgent' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(labels).toContain('urgent');
    expect(screen.getByText('urgent')).not.toBeNull();

    const chip = screen.getByRole('button', { name: /urgent/i });
    fireEvent.click(chip);

    expect(labels).not.toContain('urgent');
  });
});
