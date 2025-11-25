import { Box, Button, Stack, Typography } from '@mui/material';

interface AlertsPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function AlertsPagination({ page, totalPages, onPageChange }: AlertsPaginationProps) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" fontSize={12}>
      <Typography variant="caption">
        Page {page} of {totalPages}
      </Typography>
      <Stack direction="row" spacing={1}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
}
