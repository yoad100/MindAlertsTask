import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import type React from 'react';

interface AlertsHeaderProps {
  localSearch: string;
  onLocalSearchChange: (value: string) => void;
  onSearchSubmit: React.FormEventHandler<HTMLFormElement>;
}

export function AlertsHeader({ localSearch, onLocalSearchChange, onSearchSubmit }: AlertsHeaderProps) {
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
        onSubmit={onSearchSubmit}
        display="flex"
        gap={1}
        width={{ xs: '100%', sm: 360 }}
      >
        <TextField
          size="small"
          fullWidth
          value={localSearch}
          onChange={(e) => onLocalSearchChange(e.target.value)}
          placeholder="Search by title, description, or source"
        />
        <Button type="submit" variant="contained" size="small">
          Search
        </Button>
      </Box>
    </Stack>
  );
}
