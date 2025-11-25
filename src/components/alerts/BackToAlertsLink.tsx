import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

export function BackToAlertsLink() {
  return (
    <Link
      component={RouterLink}
      to="/alerts"
      underline="hover"
      color="primary"
      sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, fontSize: 13, mb: 0.5 }}
    >
      <span aria-hidden="true">←</span>
      Back to alerts
    </Link>
  );
}
