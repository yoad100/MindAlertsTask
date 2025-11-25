import { Box, Typography } from '@mui/material';
import { SectionCard } from '../common/SectionCard';
import { formatDateTime } from '../../utils/dates';

interface TimelineEntry {
  id: number;
  label: string;
  timestamp?: string;
}

interface AlertTimelinePanelProps {
  timeline: TimelineEntry[];
}

export function AlertTimelinePanel({ timeline }: AlertTimelinePanelProps) {
  return (
    <SectionCard title="Activity timeline" sx={{ flex: 1, p: 2 }}>
      <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0 }}>
        {timeline.map((entry) => (
          <Box
            key={entry.id}
            component="li"
            display="flex"
            gap={1.5}
            alignItems="flex-start"
            mb={1.5}
          >
            <Box
              sx={{ mt: 0.75, width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }}
            />
            <Box>
              <Typography variant="body2">{entry.label}</Typography>
              {entry.timestamp && (
                <Typography variant="caption" color="text.secondary">
                  {formatDateTime(entry.timestamp)}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </SectionCard>
  );
}
