// E-Defense — Notification Center Screen (Light Theme)
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, FontWeights, Spacing, BorderRadius, Shadows, NotificationPriorityColors } from '../../styles/theme';
import { AppNotification } from '../../types';

const MOCK_NOTIFICATIONS: AppNotification[] = [
  { id: 1, user_id: 1, type: 'defense_scheduled', title: 'Defense Scheduled', message: 'Your proposal defense has been scheduled for May 20, 2026 at 9:00 AM in Room 301.', data: null, channel: 'in_app', priority: 'high', is_read: false, read_at: null, sent_at: '2026-05-13T08:00:00Z', created_at: '2026-05-13T08:00:00Z', updated_at: '2026-05-13T08:00:00Z' },
  { id: 2, user_id: 1, type: 'panelist_confirmed', title: 'Panelist Confirmed', message: 'Dr. Garcia has confirmed participation as a panelist for your defense.', data: null, channel: 'in_app', priority: 'normal', is_read: false, read_at: null, sent_at: '2026-05-12T14:30:00Z', created_at: '2026-05-12T14:30:00Z', updated_at: '2026-05-12T14:30:00Z' },
  { id: 3, user_id: 1, type: 'defense_reminder', title: 'Defense Reminder', message: 'Reminder: Mid-term defense for "Blockchain-Based Verification" is tomorrow at 1:00 PM.', data: null, channel: 'in_app', priority: 'urgent', is_read: false, read_at: null, sent_at: '2026-05-12T10:00:00Z', created_at: '2026-05-12T10:00:00Z', updated_at: '2026-05-12T10:00:00Z' },
  { id: 4, user_id: 1, type: 'score_submitted', title: 'Score Submitted', message: 'A panelist has submitted a score for "IoT Smart Campus" final defense.', data: null, channel: 'in_app', priority: 'normal', is_read: true, read_at: '2026-05-11T16:00:00Z', sent_at: '2026-05-11T15:00:00Z', created_at: '2026-05-11T15:00:00Z', updated_at: '2026-05-11T16:00:00Z' },
  { id: 5, user_id: 1, type: 'status_update', title: 'Defense Completed', message: '"AI-Powered Student Performance" proposal defense has been marked as completed.', data: null, channel: 'in_app', priority: 'low', is_read: true, read_at: '2026-05-10T12:00:00Z', sent_at: '2026-05-10T11:00:00Z', created_at: '2026-05-10T11:00:00Z', updated_at: '2026-05-10T12:00:00Z' },
];

const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  defense_scheduled: 'calendar',
  panelist_confirmed: 'person-add',
  defense_reminder: 'alarm',
  score_submitted: 'ribbon',
  status_update: 'checkmark-circle',
};

const FILTER_TABS = ['All', 'Unread', 'High Priority'];

export const NotificationScreen: React.FC = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState('All');

  const filtered = notifications.filter((n) => {
    if (activeTab === 'Unread') return !n.is_read;
    if (activeTab === 'High Priority') return n.priority === 'high' || n.priority === 'urgent';
    return true;
  });

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, is_read: true, read_at: new Date().toISOString() } : n));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true, read_at: new Date().toISOString() })));
  };

  const getTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const renderItem = ({ item }: { item: AppNotification }) => (
    <TouchableOpacity onPress={() => markAsRead(item.id)} activeOpacity={0.7}>
      <View style={[styles.notifItem, !item.is_read && styles.notifUnread]}>
        <View style={[styles.iconCircle, { backgroundColor: `${NotificationPriorityColors[item.priority]}15` }]}>
          <Ionicons name={ICON_MAP[item.type] || 'notifications'} size={20} color={NotificationPriorityColors[item.priority]} />
        </View>
        <View style={styles.notifContent}>
          <View style={styles.notifTop}>
            <Text style={styles.notifTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.notifTime}>{getTimeAgo(item.sent_at)}</Text>
          </View>
          <Text style={styles.notifMessage} numberOfLines={2}>{item.message}</Text>
          {item.priority === 'urgent' && <View style={styles.urgentBadge}><Text style={styles.urgentText}>URGENT</Text></View>}
        </View>
        {!item.is_read && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.controlBar}>
        <View style={styles.tabs}>
          {FILTER_TABS.map((tab) => (
            <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.tabActive]} onPress={() => setActiveTab(tab)}>
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={markAllRead}><Text style={styles.markAllText}>Mark all read</Text></TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="notifications-off-outline" size={48} color={Colors.light.textMuted} />
            <Text style={styles.emptyText}>No notifications</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  controlBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  tabs: { flexDirection: 'row', gap: Spacing.sm },
  tab: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs + 2, borderRadius: BorderRadius.full, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.light.border },
  tabActive: { backgroundColor: Colors.accent, borderColor: Colors.accent },
  tabText: { fontSize: FontSizes.sm, color: Colors.light.textSecondary, fontWeight: FontWeights.medium },
  tabTextActive: { color: Colors.white },
  markAllText: { fontSize: FontSizes.sm, color: Colors.accent, fontWeight: FontWeights.semibold },
  list: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxl },
  notifItem: { flexDirection: 'row', alignItems: 'flex-start', padding: Spacing.md, backgroundColor: Colors.white, borderRadius: BorderRadius.lg, marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.light.border, gap: Spacing.sm, ...Shadows.sm },
  notifUnread: { backgroundColor: '#F0F7FF', borderColor: 'rgba(52,152,219,0.2)' },
  iconCircle: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  notifContent: { flex: 1 },
  notifTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  notifTitle: { fontSize: FontSizes.sm, fontWeight: FontWeights.semibold, color: Colors.light.textPrimary, flex: 1 },
  notifTime: { fontSize: FontSizes.xs, color: Colors.light.textMuted, marginLeft: Spacing.sm },
  notifMessage: { fontSize: FontSizes.sm, color: Colors.light.textSecondary, lineHeight: 20 },
  urgentBadge: { backgroundColor: Colors.dangerBg, paddingHorizontal: 8, paddingVertical: 2, borderRadius: BorderRadius.full, alignSelf: 'flex-start', marginTop: Spacing.xs },
  urgentText: { fontSize: 10, color: Colors.danger, fontWeight: FontWeights.bold, letterSpacing: 0.5 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.accent, marginTop: 6 },
  empty: { alignItems: 'center', marginTop: 80, gap: Spacing.md },
  emptyText: { fontSize: FontSizes.md, color: Colors.light.textMuted },
});
