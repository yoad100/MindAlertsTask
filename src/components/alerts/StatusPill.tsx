import { Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import type { ReactElement } from 'react';
import type { AlertStatus } from '../../types/alert';
import { alertTokens } from '../../theme';

interface StatusPillProps {
  value: AlertStatus;
}

const STATUS_CONFIG: Record<AlertStatus, {
  label: string;
  icon: ReactElement;
  bg: string;
  fg: string;
}> = {
  open: {
    label: 'Open',
    icon: <NotificationsActiveIcon fontSize="small" />,
    bg: alertTokens.status.open.bg,
    fg: alertTokens.status.open.fg,
  },
  investigating: {
    label: 'Investigating',
    icon: <HourglassTopIcon fontSize="small" />,
    bg: alertTokens.status.investigating.bg,
    fg: alertTokens.status.investigating.fg,
  },
  resolved: {
    label: 'Resolved',
    icon: <CheckCircleIcon fontSize="small" />,
    bg: alertTokens.status.resolved.bg,
    fg: alertTokens.status.resolved.fg,
  },
};

export function StatusPill({ value }: StatusPillProps) {
  const { label, icon, bg, fg } = STATUS_CONFIG[value];

  return (
    <Chip
      size="small"
      variant="filled"
      icon={icon}
      label={label}
      sx={{
        fontWeight: 500,
        bgcolor: bg,
        color: fg,
        '& .MuiChip-icon': { color: fg },
      }}
    />
  );
}
