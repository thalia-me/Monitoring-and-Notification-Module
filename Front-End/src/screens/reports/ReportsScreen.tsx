// E-Defense — Consolidated Reports Screen
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, FontWeights, Spacing, BorderRadius, Shadows } from '../../styles/theme';

const SUMMARY_DATA = [
  { label: 'Total Research Groups', value: '45', icon: 'people-outline' as const, color: Colors.accent },
  { label: 'Defenses Completed', value: '32', icon: 'checkmark-circle-outline' as const, color: Colors.success },
  { label: 'Average Score', value: '86.4', icon: 'stats-chart-outline' as const, color: Colors.warning },
  { label: 'Pending Defenses', value: '13', icon: 'hourglass-outline' as const, color: Colors.info },
];

export const ReportsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Summary Cards */}
      <View style={styles.grid}>
        {SUMMARY_DATA.map((item) => (
          <View key={item.label} style={styles.summaryCard}>
            <View style={[styles.iconBg, { backgroundColor: `${item.color}15` }]}>
              <Ionicons name={item.icon} size={24} color={item.color} />
            </View>
            <Text style={styles.summaryValue}>{item.value}</Text>
            <Text style={styles.summaryLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Placeholder Chart Area */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Defense Completion Rate</Text>
        <View style={styles.chartPlaceholder}>
          <Ionicons name="bar-chart-outline" size={64} color={Colors.light.textMuted} />
          <Text style={styles.chartPlaceholderText}>Analytics charts will be displayed here</Text>
          <Text style={styles.chartSubText}>Connect to backend API to view real data</Text>
        </View>
      </View>

      {/* Department Breakdown */}
      <View style={styles.tableCard}>
        <Text style={styles.tableTitle}>Department Breakdown</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Department</Text>
          <Text style={styles.tableHeaderCell}>Groups</Text>
          <Text style={styles.tableHeaderCell}>Completed</Text>
          <Text style={styles.tableHeaderCell}>Avg Score</Text>
        </View>
        {[
          { dept: 'BS Information Technology', groups: 18, completed: 14, avg: 87.2 },
          { dept: 'BS Computer Science', groups: 15, completed: 10, avg: 85.8 },
          { dept: 'BS Computer Engineering', groups: 8, completed: 5, avg: 88.1 },
          { dept: 'BS Biology', groups: 4, completed: 3, avg: 82.5 },
        ].map((row, idx) => (
          <View key={row.dept} style={[styles.tableRow, idx % 2 === 0 && styles.tableRowAlt]}>
            <Text style={[styles.tableCell, { flex: 2 }]}>{row.dept}</Text>
            <Text style={styles.tableCell}>{row.groups}</Text>
            <Text style={styles.tableCell}>{row.completed}</Text>
            <Text style={styles.tableCell}>{row.avg}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.lg },
  summaryCard: { backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.lg, flex: 1, minWidth: 180, borderWidth: 1, borderColor: Colors.light.border, ...Shadows.sm },
  iconBg: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm },
  summaryValue: { fontSize: FontSizes.xxl, fontWeight: FontWeights.bold, color: Colors.light.textPrimary },
  summaryLabel: { fontSize: FontSizes.sm, color: Colors.light.textSecondary, marginTop: 4 },
  chartCard: { backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.lg, borderWidth: 1, borderColor: Colors.light.border, ...Shadows.sm },
  chartTitle: { fontSize: FontSizes.lg, fontWeight: FontWeights.bold, color: Colors.light.textPrimary, marginBottom: Spacing.lg },
  chartPlaceholder: { alignItems: 'center', paddingVertical: Spacing.xxl },
  chartPlaceholderText: { fontSize: FontSizes.md, color: Colors.light.textMuted, marginTop: Spacing.md },
  chartSubText: { fontSize: FontSizes.sm, color: Colors.light.textMuted, marginTop: Spacing.xs },
  tableCard: { backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.lg, borderWidth: 1, borderColor: Colors.light.border, ...Shadows.sm },
  tableTitle: { fontSize: FontSizes.lg, fontWeight: FontWeights.bold, color: Colors.light.textPrimary, marginBottom: Spacing.md },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: Colors.light.border, paddingBottom: Spacing.sm, marginBottom: Spacing.xs },
  tableHeaderCell: { flex: 1, fontSize: FontSizes.xs, fontWeight: FontWeights.bold, color: Colors.light.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  tableRow: { flexDirection: 'row', paddingVertical: Spacing.sm + 2 },
  tableRowAlt: { backgroundColor: Colors.light.surfaceLight, marginHorizontal: -Spacing.lg, paddingHorizontal: Spacing.lg, borderRadius: 0 },
  tableCell: { flex: 1, fontSize: FontSizes.sm, color: Colors.light.textPrimary },
});
