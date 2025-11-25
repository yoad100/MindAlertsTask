import { Box, Breadcrumbs, Stack, Typography } from '@mui/material';
import { SeverityPill } from './SeverityPill';
import { StatusPill } from './StatusPill';
import type { AlertSeverity, AlertStatus } from '../../types/alert';
import { BackToAlertsLink } from './BackToAlertsLink';

interface AlertDetailsHeaderProps {
  alertId: string;
  title: string;
  severity: AlertSeverity;
  status: AlertStatus;
}

export function AlertDetailsHeader({ alertId, title, severity, status }: AlertDetailsHeaderProps) {
  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 0.5 }}>
        <BackToAlertsLink />
        <Typography color="text.primary">{severity.toUpperCase()}</Typography>
        <Typography color="text.secondary" noWrap sx={{ maxWidth: 260 }}>
          {title}
        </Typography>
      </Breadcrumbs>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
        <Box>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Alert ID: {alertId}
          </Typography>
        </Box>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <SeverityPill value={severity} />
          <StatusPill value={status} />
        </Stack>
      </Stack>
    </Box>
  );
}
