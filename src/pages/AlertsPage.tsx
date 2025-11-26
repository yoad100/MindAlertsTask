import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAlerts } from '../hooks/useAlerts';
import type {
  AlertFilters,
  AlertSeverity,
  AlertStatus,
  AlertSortField,
  SortDirection,
} from '../types/alert';
import { AlertsHeader } from '../components/alerts/AlertsHeader';
import { AlertsFiltersPanel } from '../components/alerts/AlertsFiltersPanel';
import { AlertsTable } from '../components/alerts/AlertsTable';
import { AlertsPagination } from '../components/alerts/AlertsPagination';

function parseMulti(value: string | null): string[] {
  if (!value) return [];
  return value.split(',').filter(Boolean);
}

export function AlertsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') ?? '1');
  const sortField = (searchParams.get('sortField') ?? 'createdAt') as AlertSortField;
  const sortDirection = (searchParams.get('sortDirection') ?? 'desc') as SortDirection;
  const severities = parseMulti(searchParams.get('severity')) as AlertSeverity[]; 
  const statuses = parseMulti(searchParams.get('status')) as AlertStatus[];
  const search = searchParams.get('q') ?? '';

  const filters: AlertFilters = useMemo(
    () => ({ severities, statuses, search }),
    [severities, statuses, search],
  );

  const { data, isLoading, isError, error } = useAlerts({
    page,
    filters,
    sortField,
    sortDirection,
  });

  const [localSearch, setLocalSearch] = useState(search);
  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  const updateParams = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([key, value]) => {
      if (value === null || value === '') next.delete(key);
      else next.set(key, value);
    });
    if (!patch.page) {
      next.delete('page');
    }
    setSearchParams(next, { replace: true });
  };

  const toggleFilter = (key: 'severity' | 'status', value: string) => {
    const current = parseMulti(searchParams.get(key));
    const exists = current.includes(value);
    const next = exists ? current.filter((v) => v !== value) : [...current, value];
    updateParams({ [key]: next.join(','), page: '1' });
  };

  const handleSortChange = (field: AlertSortField) => {
    const direction: SortDirection =
      sortField === field && sortDirection === 'desc' ? 'asc' : 'desc';
    updateParams({ sortField: field, sortDirection: direction });
  };

  useEffect(() => {
    const handle = window.setTimeout(() => {
      updateParams({ q: localSearch || null, page: '1' });
    }, 400);

    return () => {
      window.clearTimeout(handle);
    };
  }, [localSearch]);

  const handleExportCsv = () => {
    if (!data || !data.items.length) return;

    const header = ['Title', 'Severity', 'Status', 'Source', 'Created'];
    const rows = data.items.map((alert) => [
      alert.title,
      alert.severity,
      alert.status,
      alert.source,
      new Date(alert.createdAt).toISOString(),
    ]);

    const csv = [header, ...rows]
      .map((cols) =>
        cols
          .map((value) => {
            const str = String(value ?? '');
            const needsQuotes = /[",\n]/.test(str);
            const escaped = str.replace(/"/g, '""');
            return needsQuotes ? `"${escaped}"` : escaped;
          })
          .join(','),
      )
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'alerts.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Box component="section" display="flex" flexDirection="column" gap={2.5}>
      <AlertsHeader
        localSearch={localSearch}
        onLocalSearchChange={setLocalSearch}
      />

      <AlertsFiltersPanel
        severities={severities}
        statuses={statuses}
        search={search}
        sortField={sortField}
        sortDirection={sortDirection}
        hasData={!!data && data.items.length > 0}
        onClearAll={() => updateParams({ severity: null, status: null, q: null, page: '1' })}
        onToggleFilter={toggleFilter}
        onSortChange={handleSortChange}
        onExportCsv={handleExportCsv}
      />

      <AlertsTable data={data} isLoading={isLoading} isError={isError} error={error ?? null} />

      <AlertsPagination
        page={page}
        totalPages={totalPages}
        onPageChange={(nextPage: number) => updateParams({ page: String(nextPage) })}
      />
    </Box>
  );
}
