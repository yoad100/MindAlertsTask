import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AlertsPage } from '../pages/AlertsPage';

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>,
  );
}

describe('Alerts filters', () => {
  it('filters by severity and status', async () => {
    renderWithProviders(<AlertsPage />);

    await waitFor(() => {
      expect(screen.getAllByText(/alerts/i).length).toBeGreaterThan(0);
    });

    const highButton = screen.getByRole('button', { name: /high/i });
    fireEvent.click(highButton);

    await waitFor(() => {
      const rows = screen.getAllByRole('link');
      expect(rows.length).toBeGreaterThan(0);
    });
  });
});
