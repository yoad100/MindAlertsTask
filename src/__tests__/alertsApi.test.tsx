import { describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAlerts } from '../hooks/useAlerts';
import * as alertsApi from '../api/alertsApi';
import type { ReactNode } from 'react';
import type { Alert } from '../types/alert';

describe('useAlerts', () => {
  it('fetches alerts with given filters and search', async () => {
    const mockItems: Alert[] = [
      {
        id: '1',
        title: 'Test alert',
        description: 'Something happened',
        severity: 'high',
        status: 'open',
        source: 'test-source',
        createdAt: new Date().toISOString(),
      },
    ];

    const fetchAlertsSpy = vi.spyOn(alertsApi, 'fetchAlerts').mockResolvedValue({
      items: mockItems,
      total: 1,
      page: 1,
      pageSize: 10,
    });

    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(
      () =>
        useAlerts({
          page: 1,
          pageSize: 10,
          filters: {
            severities: ['high'],
            statuses: ['open'],
            search: 'test',
          },
          sortField: 'createdAt',
          sortDirection: 'desc',
        }),
      { wrapper },
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(fetchAlertsSpy).toHaveBeenCalledWith({
      page: 1,
      pageSize: 10,
      filters: {
        severities: ['high'],
        statuses: ['open'],
        search: 'test',
      },
      sortField: 'createdAt',
      sortDirection: 'desc',
    });

    expect(result.current.data?.items).toHaveLength(1);
    expect(result.current.data?.total).toBe(1);
  });
});
