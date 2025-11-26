import {
  Box,
  Link as MuiLink,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { Alert } from '../../types/alert';
import { SeverityPill } from './SeverityPill';
import { StatusPill } from './StatusPill';
import { formatDateTime } from '../../utils/dates';

interface AlertsTableProps {
  data: { items: Alert[]; total: number; page: number; pageSize: number } | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function AlertsTable({ data, isLoading, isError, error }: AlertsTableProps) {
  const hasItems = !!data && data.items.length > 0;

  return (
    <Paper variant="outlined" sx={{ overflowX: 'auto', overflowY: 'hidden' }}>
      <Box sx={{ minWidth: 600 }}>
        <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell scope="col">Title</TableCell>
            <TableCell scope="col">Severity</TableCell>
            <TableCell scope="col">Status</TableCell>
            <TableCell scope="col">Source</TableCell>
            <TableCell scope="col">Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && (
            <>
              {Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Skeleton variant="text" width="80%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rectangular" width={64} height={24} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rectangular" width={72} height={24} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="60%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="70%" />
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
          {isError && (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography variant="body2" color="error" role="alert">
                  Error: {error?.message ?? 'Failed to load alerts'}
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {!isLoading && !isError && data && data.items.length === 0 && (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography variant="body2">No alerts match the current filters.</Typography>
              </TableCell>
            </TableRow>
          )}
          {!isLoading && !isError && hasItems &&
            data!.items.map((alert) => (
              <TableRow
                key={alert.id}
                hover
                sx={{ '&:hover td': { backgroundColor: 'action.hover' }, cursor: 'pointer' }}
              >
                <TableCell sx={{ maxWidth: 260 }}>
                  <MuiLink
                    component={RouterLink}
                    to={`/alerts/${alert.id}`}
                    underline="hover"
                    color="primary"
                  >
                    {alert.title}
                  </MuiLink>
                </TableCell>
                <TableCell>
                  <SeverityPill value={alert.severity} />
                </TableCell>
                <TableCell>
                  <StatusPill value={alert.status} />
                </TableCell>
                <TableCell>{alert.source}</TableCell>
                <TableCell>
                  {formatDateTime(alert.createdAt)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        </Table>
      </Box>
    </Paper>
  );
}
