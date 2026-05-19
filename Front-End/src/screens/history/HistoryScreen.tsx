// E-Defense — History Screen
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, FontWeights, Spacing, BorderRadius, Shadows } from '../../styles/theme';

interface HistoryItem {
  id: number;
  title: string;
  action: string;
  user: string;
  date: string;
  time: string;
  type: 'defense' | 'score' | 'notification' | 'system';
}

const MOCK_HISTORY: HistoryItem[] = [
  { id: 1, title: 'Defense Completed', action: 'Final defense for "IoT-Based Smart Campus" marked as completed', user: 'Dr. Maria Santos', date: 'May 13, 2026', time: '10:30 AM', type: 'defense' },
  { id: 2, title: 'Score Submitted', action: 'Score 88/100 submitted for "E-Commerce Platform" final defense', user: 'Dr. Robert Lee', date: 'May 12, 2026', time: '3:45 PM', type: 'score' },
  { id: 3, title: 'Defense Scheduled', action: 'Proposal defense scheduled for "AI-Powered Prediction System"', user: 'Research Coordinator', date: 'May 12, 2026', time: '9:00 AM', type: 'defense' },
  { id: 4, title: 'Notification Sent', action: 'Reminder sent to panelists for upcoming defense on May 20', user: 'System', date: 'May 11, 2026', time: '8:00 AM', type: 'notification' },
  { id: 5, title: 'Panelist Assigned', action: 'Dr. Garcia assigned as panelist for "Blockchain-Based Verification"', user: 'Panel Chairman', date: 'May 10, 2026', time: '2:15 PM', type: 'defense' },
  { id: 6, title: 'Defense Deferred', action: '"Machine Learning for Crop Disease" defense postponed to June', user: 'Research Coordinator', date: 'May 10, 2026', time: '11:00 AM', type: 'defense' },
];

const TYPE_ICONS: Record<string, { icon: keyof typeof Ionicons.glyphMap; color: string }> = {
  defense: { icon: 'shield-outline', color: Colors.accent },
  score: { icon: 'ribbon-outline', color: Colors.success },
  notification: { icon: 'notifications-outline', color: Colors.warning },
  system: { icon: 'settings-outline', color: Colors.light.textMuted },
};

export const HistoryScreen: React.FC = () => {
  const [history] = useState(MOCK_HISTORY);

  const renderItem = ({ item }: { item: HistoryItem }) => {
    const typeInfo = TYPE_ICONS[item.type];
    return (
      <View style={styles.historyItem}>
        <View style={[styles.iconCircle, { backgroundColor: `${typeInfo.color}15` }]}>
          <Ionicons name={typeInfo.icon} size={20} color={typeInfo.color} />
        </View>
        <View style={styles.historyContent}>
          <Text style={styles.historyTitle}>{item.title}</Text>
          <Text style={styles.historyAction}>{item.action}</Text>
          <View style={styles.historyMeta}>
            <Text style={styles.historyUser}><Ionicons name="person-outline" size={12} color={Colors.light.textMuted} /> {item.user}</Text>
            <Text style={styles.historyDate}>{item.date} · {item.time}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="time-outline" size={48} color={Colors.light.textMuted} />
            <Text style={styles.emptyText}>No history records</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  list: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  historyItem: { flexDirection: 'row', backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.light.border, gap: Spacing.md, ...Shadows.sm },
  iconCircle: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  historyContent: { flex: 1 },
  historyTitle: { fontSize: FontSizes.md, fontWeight: FontWeights.semibold, color: Colors.light.textPrimary, marginBottom: 4 },
  historyAction: { fontSize: FontSizes.sm, color: Colors.light.textSecondary, lineHeight: 20, marginBottom: Spacing.sm },
  historyMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  historyUser: { fontSize: FontSizes.xs, color: Colors.light.textMuted },
  historyDate: { fontSize: FontSizes.xs, color: Colors.light.textMuted },
  empty: { alignItems: 'center', marginTop: 80, gap: Spacing.md },
  emptyText: { fontSize: FontSizes.md, color: Colors.light.textMuted },
});
