import { Paper, Stack, Typography, type SxProps, type Theme } from '@mui/material';
import type { ReactNode } from 'react';

interface SectionCardProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export function SectionCard({ title, subtitle, actions, children, sx }: SectionCardProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2, ...sx }}>
      {(title || subtitle || actions) && (
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
          <div>
            {title && (
              <Typography variant="subtitle1">
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </div>
          {actions && <Stack direction="row" spacing={1}>{actions}</Stack>}
        </Stack>
      )}
      {children}
    </Paper>
  );
}
