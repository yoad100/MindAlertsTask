import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { fetchAlerts, fetchAlertById } from '../api/alertsApi';
import type {
  Alert,
  AlertFilters,
  AlertSortField,
  AlertsQueryParams,
  PagedAlerts,
  SortDirection,
} from '../types/alert';

const DEFAULT_PAGE_SIZE = 10;

export interface UseAlertsOptions {
  page: number;
  pageSize?: number;
  filters: AlertFilters;
  sortField: AlertSortField;
  sortDirection: SortDirection;
}

export function useAlerts(options: UseAlertsOptions): UseQueryResult<PagedAlerts, Error> {
  const params: AlertsQueryParams = {
    page: options.page,
    pageSize: options.pageSize ?? DEFAULT_PAGE_SIZE,
    filters: options.filters,
    sortField: options.sortField,
    sortDirection: options.sortDirection,
  };

  return useQuery<PagedAlerts, Error>({
    queryKey: ['alerts', params],
    queryFn: () => fetchAlerts(params),
    staleTime: 30_000,
    placeholderData: (prev) => prev,
  });
}

export function useAlertDetails(id: string | undefined) {
  return useQuery<Alert | null, Error>({
    queryKey: ['alert', id],
    queryFn: () => (id ? fetchAlertById(id) : Promise.resolve(null)),
    enabled: Boolean(id),
    staleTime: 60_000,
  });
}
