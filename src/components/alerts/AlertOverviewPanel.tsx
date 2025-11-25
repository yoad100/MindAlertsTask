import { Box, Typography } from '@mui/material';
import { LabelsEditor } from '../labels/LabelsEditor';
import { SeverityPill } from './SeverityPill';
import { StatusPill } from './StatusPill';
import { SectionCard } from '../common/SectionCard';
import { formatDateTime } from '../../utils/dates';
import type { AlertSeverity, AlertStatus } from '../../types/alert';

interface AlertOverviewPanelProps {
  createdAt: string;
  description: string;
  severity: AlertSeverity;
  status: AlertStatus;
  source: string;
  labels: string[];
  onLabelsChange: (labels: string[]) => void;
}

export function AlertOverviewPanel({
  createdAt,
  description,
  severity,
  status,
  source,
  labels,
  onLabelsChange,
}: AlertOverviewPanelProps) {
  return (
    <SectionCard title="Overview" sx={{ flex: 2, p: 2 }}>
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2} fontSize={12}>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Status
          </Typography>
          <Box mt={0.5}>
            <StatusPill value={status} />
          </Box>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Severity
          </Typography>
          <Box mt={0.5}>
            <SeverityPill value={severity} />
          </Box>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Source
          </Typography>
          <Typography variant="body2">{source}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Created
          </Typography>
          <Typography variant="body2">{formatDateTime(createdAt)}</Typography>
        </Box>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle2" gutterBottom>
          Description
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle2" gutterBottom>
          Labels
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" mb={1}>
          Labels are stored locally in your browser for this alert.
        </Typography>
        <LabelsEditor labels={labels} onChange={onLabelsChange} />
      </Box>
    </SectionCard>
  );
}
