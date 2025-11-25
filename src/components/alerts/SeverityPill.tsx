import { Chip, Stack, Box } from '@mui/material';
import type { AlertSeverity } from '../../types/alert';
import { alertTokens } from '../../theme';

interface SeverityPillProps {
  value: AlertSeverity;
}

export function SeverityPill({ value }: SeverityPillProps) {
  const config: Record<AlertSeverity, { label: string; bars: number; color: string }> = {
    low: { label: 'Low', bars: 1, color: alertTokens.severity.low.bg },
    medium: { label: 'Medium', bars: 2, color: alertTokens.severity.medium.bg },
    high: { label: 'High', bars: 3, color: alertTokens.severity.high.bg },
    critical: { label: 'Critical', bars: 4, color: alertTokens.severity.critical.bg },
  };

  const { label, bars, color } = config[value];

  return (
    <Chip
      size="small"
      variant="outlined"
      label={
        <Stack direction="row" spacing={0.75} alignItems="center">
          <Box display="flex" flexDirection="row" gap={0.25}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <Box
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                sx={{
                  width: 4,
                  height: 12,
                  borderRadius: 1,
                  bgcolor: idx < bars ? color : 'divider',
                }}
              />
            ))}
          </Box>
          <Box component="span" sx={{ fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>
            {label}
          </Box>
        </Stack>
      }
      sx={{
        px: 1,
        borderColor: color,
        bgcolor: 'transparent',
      }}
    />
  );
}
