import { Box, Stack, TextField, Typography } from '@mui/material';

interface AlertsHeaderProps {
  localSearch: string;
  onLocalSearchChange: (value: string) => void;
}

export function AlertsHeader({ localSearch, onLocalSearchChange }: AlertsHeaderProps) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      justifyContent="space-between"
    >
      <Box>
        <Typography variant="h5" gutterBottom>
          Security alerts
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Triage, filter, and investigate alerts coming from your security stack.
        </Typography>
      </Box>
      <Box
        component="form"
        display="flex"
        gap={1}
        width={{ xs: '100%', sm: 360 }}
      >
        <TextField
          size="small"
          fullWidth
          value={localSearch}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onLocalSearchChange(e.target.value)
          }
          placeholder="Search by title, description, or source"
        />
      </Box>
    </Stack>
  );
}
