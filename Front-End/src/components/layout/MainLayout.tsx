// E-Defense — Main Layout Component (Sidebar + Header + Content)
import React, { useState, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { Colors, SIDEBAR_WIDTH } from '../../styles/theme';
import { useNotifications } from '../../contexts/NotificationContext';

interface ScreenConfig {
  title: string;
  subtitle?: string;
}

const SCREEN_CONFIG: Record<string, ScreenConfig> = {
  Dashboard: { title: 'Dashboard', subtitle: 'Overview of defense activities' },
  ResearchGroups: { title: 'Research Groups', subtitle: 'View and manage research defense evaluations' },
  Monitor: { title: 'Defense Monitor', subtitle: 'Track defense progress and schedules' },
  Notifications: { title: 'Notifications', subtitle: 'Stay updated with alerts and reminders' },
  Reports: { title: 'Consolidated Reports', subtitle: 'View summary reports and analytics' },
  History: { title: 'History', subtitle: 'View past defense records' },
  Settings: { title: 'Settings', subtitle: 'Manage your account preferences' },
};

interface MainLayoutProps {
  children: Record<string, ReactNode>;
  defaultScreen?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, defaultScreen = 'ResearchGroups' }) => {
  const [activeScreen, setActiveScreen] = useState(defaultScreen);
  const { unreadCount } = useNotifications();

  const config = SCREEN_CONFIG[activeScreen] || { title: activeScreen };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <Sidebar
        activeScreen={activeScreen}
        onNavigate={setActiveScreen}
        unreadCount={unreadCount}
      />

      {/* Main Content Area */}
      <View style={styles.mainArea}>
        {/* Top Header */}
        <TopHeader title={config.title} subtitle={config.subtitle} />

        {/* Page Content */}
        <View style={styles.content}>
          {children[activeScreen] || children['Dashboard']}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.light.background,
  },
  mainArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
