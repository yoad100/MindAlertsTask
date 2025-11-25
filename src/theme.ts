import { createTheme } from '@mui/material/styles';
import type { ColorMode } from './types/theme';
const baseOptions = {
  shape: { borderRadius: 10 },
  typography: {
    fontFamily:
      `'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    h6: { fontWeight: 600 },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: 11,
        },
      },
    },
  },
};

export const alertTokens = {
  severity: {
    low: { bg: '#0f766e', fg: '#e0f2f1' },
    medium: { bg: '#0369a1', fg: '#e0f2fe' },
    high: { bg: '#ea580c', fg: '#fff7ed' },
    critical: { bg: '#b91c1c', fg: '#fee2e2' },
  },
  status: {
    open: { bg: '#0369a1', fg: '#e0f2fe' },
    investigating: { bg: '#92400e', fg: '#ffedd5' },
    resolved: { bg: '#166534', fg: '#dcfce7' },
  },
} as const;

export function createAppTheme(mode: ColorMode) {
  if (mode === 'dark') {
    return createTheme({
    	...baseOptions,
      palette: {
        mode: 'dark',
        primary: {
          main: '#38bdf8',
          light: '#7dd3fc',
        },
        background: {
          default: '#050816',
          paper: '#020617',
        },
      },
    });
  }

  return createTheme({
  	...baseOptions,
    palette: {
      mode: 'light',
      primary: {
        main: '#0f766e',
        light: '#14b8a6',
      },
      background: {
        default: '#f3f4f6',
        paper: '#ffffff',
      },
    },
  });
}

export const appShellStyles = {
  root: {
    minHeight: '100vh',
    bgcolor: 'background.default',
    color: 'text.primary',
  },
  appBar: (mode: ColorMode) => ({
    borderBottom: 1,
    borderColor: mode === 'light' ? 'divider' : 'rgba(148, 163, 184, 0.4)',
    backdropFilter: 'blur(10px)',
    bgcolor: mode === 'light' ? 'rgba(248, 250, 252, 0.85)' : 'rgba(15, 23, 42, 0.85)',
  }),
  toolbar: {
    maxWidth: 1180,
    width: '100%',
    mx: 'auto',
    py: 1.2,
  },
  userAvatar: {
    width: 28,
    height: 28,
    bgcolor: 'primary.main',
    fontSize: 14,
  },
};
