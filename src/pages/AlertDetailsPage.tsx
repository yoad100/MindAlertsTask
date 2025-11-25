import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import { useAlertDetails } from '../hooks/useAlerts';
import { useAlertLabels } from '../hooks/useAlertLabels';
import { AlertDetailsHeader } from '../components/alerts/AlertDetailsHeader';
import { AlertOverviewPanel } from '../components/alerts/AlertOverviewPanel';
import { AlertTimelinePanel } from '../components/alerts/AlertTimelinePanel';
import { BackToAlertsLink } from '../components/alerts/BackToAlertsLink';

export function AlertDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: alert, isLoading, isError } = useAlertDetails(id);

  const { labels, setLabels } = useAlertLabels(alert?.id, alert?.labels ?? []);

  const timeline = useMemo(
    () => [
      { id: 1, label: 'Created', timestamp: alert?.createdAt },
      { id: 2, label: 'Assigned to analyst', timestamp: alert?.createdAt },
      { id: 3, label: 'Status changed to investigating', timestamp: alert?.createdAt },
    ],
    [alert?.createdAt],
  );

  if (isLoading) {
    return (
      <Box display="flex" flexDirection="column" gap={2}>
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="rectangular" height={80} />
        <Skeleton variant="rectangular" height={200} />
      </Box>
    );
  }

  if (isError || !alert) {
    return (
      <Box display="flex" flexDirection="column" gap={1.5}>
        <Typography variant="body2" color="error">
          Alert not found or failed to load.
        </Typography>
        <BackToAlertsLink />
      </Box>
    );
  }

  const { createdAt, description, severity, status, source, id: alertId, title } = alert;

  return (
    <Box component="section" display="flex" flexDirection="column" gap={3}>
      <AlertDetailsHeader alertId={alertId} title={title} severity={severity} status={status} />

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5} alignItems="stretch">
        <AlertOverviewPanel
          createdAt={createdAt}
          description={description}
          severity={severity}
          status={status}
          source={source}
          labels={labels}
          onLabelsChange={setLabels}
        />

        <AlertTimelinePanel timeline={timeline} />
      </Stack>
    </Box>
  );
}
