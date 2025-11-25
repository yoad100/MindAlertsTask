export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';
export type AlertStatus = 'open' | 'investigating' | 'resolved';

export interface Alert {
  id: string;
  title: string;
  severity: AlertSeverity;
  status: AlertStatus;
  createdAt: string;
  source: string;
  description: string;
  labels?: string[];
}

export interface AlertFilters {
  severities: AlertSeverity[];
  statuses: AlertStatus[];
  search: string;
}

export type AlertSortField = 'createdAt' | 'severity';
export type SortDirection = 'asc' | 'desc';

export interface AlertsQueryParams {
  page: number;
  pageSize: number;
  filters: AlertFilters;
  sortField: AlertSortField;
  sortDirection: SortDirection;
}

export interface PagedAlerts {
  items: Alert[];
  total: number;
  page: number;
  pageSize: number;
}
