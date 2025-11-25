import { Chip, Stack, Typography } from '@mui/material';

interface LabelChipsProps {
  labels: string[];
  onRemove: (label: string) => void;
}

export function LabelChips({ labels, onRemove }: LabelChipsProps) {
  if (labels.length === 0) {
    return (
      <Typography variant="caption" color="text.secondary">
        No labels yet.
      </Typography>
    );
  }

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      {labels.map((label) => (
        <Chip key={label} label={label} size="small" onDelete={() => onRemove(label)} />
      ))}
    </Stack>
  );
}
