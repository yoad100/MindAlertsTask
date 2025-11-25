import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import type { AlertSeverity, AlertStatus, AlertSortField, SortDirection } from '../../types/alert';
import { SectionCard } from '../common/SectionCard';

interface AlertsFiltersPanelProps {
  severities: AlertSeverity[];
  statuses: AlertStatus[];
  search: string;
  sortField: AlertSortField;
  sortDirection: SortDirection;
  hasData: boolean;
  onClearAll: () => void;
  onToggleFilter: (key: 'severity' | 'status', value: string) => void;
  onSortChange: (field: AlertSortField) => void;
  onExportCsv: () => void;
}

const allSeverities: AlertSeverity[] = ['low', 'medium', 'high', 'critical'];
const allStatuses: AlertStatus[] = ['open', 'investigating', 'resolved'];

export function AlertsFiltersPanel({
  severities,
  statuses,
  search,
  sortField,
  sortDirection,
  hasData,
  onClearAll,
  onToggleFilter,
  onSortChange,
  onExportCsv,
}: AlertsFiltersPanelProps) {
  return (
    <SectionCard
      title="Filters"
      actions={(
        <>
          <Button
            size="small"
            variant="text"
            disabled={!severities.length && !statuses.length && !search}
            onClick={onClearAll}
          >
            Clear all
          </Button>
          <Button size="small" variant="outlined" onClick={onExportCsv} disabled={!hasData}>
            Export CSV
          </Button>
        </>
      )}
      sx={{ p: 2.25 }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2.5}
        alignItems={{ xs: 'flex-start', md: 'flex-end' }}
      >
        <Box flex={1}>
          <Typography variant="subtitle2" gutterBottom>
            Severity
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {allSeverities.map((sev) => {
              const active = severities.includes(sev);
              const label = sev.charAt(0).toUpperCase() + sev.slice(1);
              return (
                <Chip
                  key={sev}
                  label={label}
                  size="small"
                  color={active ? 'primary' : 'default'}
                  variant={active ? 'filled' : 'outlined'}
                  onClick={() => onToggleFilter('severity', sev)}
                />
              );
            })}
          </Stack>
        </Box>

        <Box flex={1}>
          <Typography variant="subtitle2" gutterBottom>
            Status
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {allStatuses.map((st) => {
              const active = statuses.includes(st);
              const label = st.charAt(0).toUpperCase() + st.slice(1);
              return (
                <Chip
                  key={st}
                  label={label}
                  size="small"
                  color={active ? 'success' : 'default'}
                  variant={active ? 'filled' : 'outlined'}
                  onClick={() => onToggleFilter('status', st)}
                />
              );
            })}
          </Stack>
        </Box>

        <Box flexBasis={{ xs: '100%', md: 220 }}>
          <Typography variant="subtitle2" gutterBottom>
            Sort by
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant={sortField === 'createdAt' ? 'contained' : 'outlined'}
              onClick={() => onSortChange('createdAt')}
            >
              Date {sortField === 'createdAt' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </Button>
            <Button
              size="small"
              variant={sortField === 'severity' ? 'contained' : 'outlined'}
              onClick={() => onSortChange('severity')}
            >
              Severity {sortField === 'severity' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </SectionCard>
  );
}
