import { useMemo, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  Chip,
  Container,
  CssBaseline,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { DarkMode, LightMode } from '@mui/icons-material';
import { AlertsPage } from './pages/AlertsPage';
import { AlertDetailsPage } from './pages/AlertDetailsPage';
import { appShellStyles, createAppTheme } from './theme';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = window.localStorage.getItem('mindalerts-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('mindalerts-theme', next);
      }
      return next;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={appShellStyles.root}>
        <AppBar
          position="sticky"
          color="transparent"
          elevation={0}
          sx={appShellStyles.appBar(mode)}
        >
          <Toolbar sx={appShellStyles.toolbar}>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box>
                <Typography variant="h6" component="h1" sx={{ fontWeight: 700 }}>
                  MindAlerts
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Security Operations · Alert Triage
                </Typography>
              </Box>
              <Chip
                label="Demo workspace"
                size="small"
                color="primary"
                variant="outlined"
                sx={{ ml: 1 }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
                <IconButton color="inherit" onClick={toggleTheme} aria-label="toggle color mode">
                  {mode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
                </IconButton>
              </Tooltip>
              <Avatar sx={appShellStyles.userAvatar}>YA</Avatar>
            </Box>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/alerts" replace />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/alerts/:id" element={<AlertDetailsPage />} />
            <Route path="*" element={<Navigate to="/alerts" replace />} />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
