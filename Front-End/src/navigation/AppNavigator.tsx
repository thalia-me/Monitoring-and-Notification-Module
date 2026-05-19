// E-Defense — Navigation Configuration (Sidebar Layout)
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../contexts/AuthContext';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { ResearchGroupsScreen } from '../screens/research/ResearchGroupsScreen';
import { MonitoringScreen } from '../screens/monitoring/MonitoringScreen';
import { NotificationScreen } from '../screens/notifications/NotificationScreen';
import { ReportsScreen } from '../screens/reports/ReportsScreen';
import { HistoryScreen } from '../screens/history/HistoryScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { MainLayout } from '../components/layout/MainLayout';
import { Colors, FontSizes, FontWeights } from '../styles/theme';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, padding: 40, backgroundColor: '#FFF5F5', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ maxWidth: 800, width: '100%', backgroundColor: '#FFF', padding: 30, borderRadius: 12, borderWidth: 1, borderColor: '#FEE2E2', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#DC2626', marginBottom: 10 }}>
              E-Defense Runtime Crash Detected ⚠️
            </Text>
            <Text style={{ fontSize: 15, fontWeight: '600', color: '#991B1B', marginBottom: 20, lineHeight: 22 }}>
              {this.state.error?.toString()}
            </Text>
            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#4B5563', marginBottom: 8 }}>Stack Trace:</Text>
            <ScrollView style={{ backgroundColor: '#F9FAFB', padding: 15, borderRadius: 6, borderWidth: 1, borderColor: '#E5E7EB', maxHeight: 350 }}>
              <Text style={{ fontFamily: 'monospace', fontSize: 11, color: '#374151', lineHeight: 16 }}>
                {this.state.error?.stack}
              </Text>
            </ScrollView>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

// Main App with Sidebar Layout
const MainApp: React.FC = () => {
  return (
    <ErrorBoundary>
      <DashboardScreen />
    </ErrorBoundary>
  );
};

// Auth screens — simple stack-like navigation using state
const AuthScreens: React.FC = () => {
  const [screen, setScreen] = React.useState<'Login' | 'Register'>('Login');

  const navigation = {
    navigate: (name: string) => setScreen(name as any),
    goBack: () => setScreen('Login'),
  };

  if (screen === 'Register') {
    return <RegisterScreen navigation={navigation} />;
  }
  return <LoginScreen navigation={navigation} />;
};

// Loading Screen
const LoadingScreen: React.FC = () => (
  <View style={styles.loading}>
    <Ionicons name="shield-checkmark" size={48} color={Colors.accent} />
    <Text style={styles.loadingText}>E-Defense</Text>
    <Text style={styles.loadingSubtext}>Loading...</Text>
  </View>
);

// Root Navigator
export const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <MainApp />;
  }

  return <AuthScreens />;
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  loadingText: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: Colors.light.textPrimary,
  },
  loadingSubtext: {
    fontSize: FontSizes.sm,
    color: Colors.light.textMuted,
  },
});
