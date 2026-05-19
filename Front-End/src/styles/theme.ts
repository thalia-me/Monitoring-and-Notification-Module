// E-Defense Monitoring & Notification — Design System
// University of Nueva Caceres

export const Colors = {
  // Brand Colors (matching reference — UNC red accent)
  primary: '#C0392B',        // UNC Red
  primaryLight: '#E74C3C',
  primaryDark: '#A93226',
  secondary: '#2C3E50',      // Dark navy (sidebar)
  secondaryLight: '#34495E',
  accent: '#3498DB',         // Blue accent for links/active states

  // Status Colors
  success: '#27AE60',        // Green
  successLight: '#2ECC71',
  successBg: 'rgba(39, 174, 96, 0.1)',
  warning: '#F39C12',        // Amber
  warningLight: '#F1C40F',
  warningBg: 'rgba(243, 156, 18, 0.1)',
  danger: '#E74C3C',         // Red
  dangerLight: '#FF6B6B',
  dangerBg: 'rgba(231, 76, 60, 0.08)',
  info: '#3498DB',           // Blue
  infoLight: '#5DADE2',
  infoBg: 'rgba(52, 152, 219, 0.08)',

  // Sidebar (dark navy like the reference)
  sidebar: {
    background: '#1A2332',     // Dark navy
    backgroundLight: '#243447', // Slightly lighter for hover
    text: '#B0BEC5',           // Muted white text
    textActive: '#FFFFFF',     // Bright white for active items
    activeIndicator: '#3498DB', // Blue highlight for active nav
    border: 'rgba(255,255,255,0.08)',
    logoBackground: '#FFFFFF',
  },

  // Light Theme (main content area — white like the reference)
  light: {
    background: '#F5F6FA',     // Soft gray bg
    surface: '#FFFFFF',        // White cards
    surfaceLight: '#F8F9FA',   // Slightly off-white
    border: '#E8ECF1',         // Light gray borders
    borderDark: '#D1D5DB',     // Darker border for inputs
    textPrimary: '#1A2332',    // Dark navy text
    textSecondary: '#6B7280',  // Medium gray
    textMuted: '#9CA3AF',      // Light gray
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  // Dark Theme (kept for reference/future)
  dark: {
    background: '#0F172A',
    surface: '#1E293B',
    surfaceLight: '#334155',
    border: '#475569',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    overlay: 'rgba(15, 23, 42, 0.8)',
  },

  // Glassmorphism (for sidebar)
  glass: {
    background: 'rgba(30, 41, 59, 0.6)',
    border: 'rgba(148, 163, 184, 0.15)',
  },

  white: '#FFFFFF',
  black: '#000000',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  xxxl: 34,
};

export const FontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  }),
};

// Sidebar width constant
export const SIDEBAR_WIDTH = 240;

// Defense status color mapping
export const DefenseStatusColors: Record<string, string> = {
  scheduled: Colors.info,
  in_progress: Colors.warning,
  completed: Colors.success,
  deferred: Colors.secondaryLight,
  cancelled: Colors.danger,
};

// Notification priority color mapping
export const NotificationPriorityColors: Record<string, string> = {
  low: Colors.light.textMuted,
  normal: Colors.info,
  high: Colors.warning,
  urgent: Colors.danger,
};
