// E-Defense — Defense Monitoring Screen (Light Theme)
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, FontWeights, Spacing, BorderRadius, Shadows } from '../../styles/theme';
import { Defense, DefenseStatus, DefenseTypeLabels } from '../../types';

const MOCK_DEFENSES: Partial<Defense>[] = [
  { id: 1, research_title: 'AI-Powered Student Performance Prediction System', defense_type: 'proposal', status: 'scheduled', defense_date: '2026-05-20', start_time: '09:00', end_time: '11:00', venue: 'Room 301', college: 'CCS', department: 'IT', student: { first_name: 'Maria', last_name: 'Santos' } as any },
  { id: 2, research_title: 'Blockchain-Based Academic Document Verification', defense_type: 'mid_defense', status: 'in_progress', defense_date: '2026-05-15', start_time: '13:00', end_time: '15:00', venue: 'Room 205', college: 'CCS', department: 'CS', student: { first_name: 'Juan', last_name: 'Dela Cruz' } as any },
  { id: 3, research_title: 'IoT-Based Smart Campus Monitoring System', defense_type: 'final_defense', status: 'completed', defense_date: '2026-05-10', start_time: '10:00', end_time: '12:00', venue: 'Auditorium', college: 'CCS', department: 'IT', student: { first_name: 'Ana', last_name: 'Reyes' } as any },
  { id: 4, research_title: 'Machine Learning for Crop Disease Detection', defense_type: 'proposal', status: 'deferred', defense_date: '2026-05-25', start_time: '14:00', end_time: '16:00', venue: 'Room 102', college: 'CAS', department: 'Biology', student: { first_name: 'Pedro', last_name: 'Cruz' } as any },
  { id: 5, research_title: 'NLP-Based Chatbot for Student Services', defense_type: 'final_defense', status: 'cancelled', defense_date: '2026-05-08', start_time: '08:00', end_time: '10:00', venue: 'Room 301', college: 'CCS', department: 'IT', student: { first_name: 'Rosa', last_name: 'Lim' } as any },
];

const STATUS_FILTERS: (DefenseStatus | 'all')[] = ['all', 'scheduled', 'in_progress', 'completed', 'deferred', 'cancelled'];

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'scheduled': return { bg: Colors.infoBg, text: Colors.info };
    case 'in_progress': return { bg: Colors.warningBg, text: Colors.warning };
    case 'completed': return { bg: Colors.successBg, text: Colors.success };
    case 'deferred': return { bg: 'rgba(52,73,94,0.08)', text: Colors.secondaryLight };
    case 'cancelled': return { bg: Colors.dangerBg, text: Colors.danger };
    default: return { bg: '#F2F3F4', text: '#7F8C8D' };
  }
};

export const MonitoringScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<DefenseStatus | 'all'>('all');

  const filtered = MOCK_DEFENSES.filter((d) => {
    const matchesSearch = d.research_title?.toLowerCase().includes(search.toLowerCase()) || `${d.student?.first_name} ${d.student?.last_name}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const renderDefense = ({ item }: { item: Partial<Defense> }) => {
    const statusStyle = getStatusStyle(item.status || '');
    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.statusText, { color: statusStyle.text }]}>
              {(item.status || '').replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
            </Text>
          </View>
          <Text style={styles.type}>{DefenseTypeLabels[item.defense_type!]}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>{item.research_title}</Text>
        <Text style={styles.student}>
          <Ionicons name="person-outline" size={13} color={Colors.light.textMuted} /> {item.student?.first_name} {item.student?.last_name}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.meta}><Ionicons name="calendar-outline" size={14} color={Colors.light.textMuted} /><Text style={styles.metaText}>{item.defense_date}</Text></View>
          <View style={styles.meta}><Ionicons name="time-outline" size={14} color={Colors.light.textMuted} /><Text style={styles.metaText}>{item.start_time} - {item.end_time}</Text></View>
        </View>
        <View style={styles.metaRow}>
          <View style={styles.meta}><Ionicons name="location-outline" size={14} color={Colors.light.textMuted} /><Text style={styles.metaText}>{item.venue}</Text></View>
          <View style={styles.meta}><Ionicons name="school-outline" size={14} color={Colors.light.textMuted} /><Text style={styles.metaText}>{item.college} - {item.department}</Text></View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color={Colors.light.textMuted} />
          <TextInput style={styles.searchInput} placeholder="Search defenses..." placeholderTextColor={Colors.light.textMuted} value={search} onChangeText={setSearch} />
          {search ? <TouchableOpacity onPress={() => setSearch('')}><Ionicons name="close-circle" size={16} color={Colors.light.textMuted} /></TouchableOpacity> : null}
        </View>
      </View>

      <FlatList
        horizontal
        data={STATUS_FILTERS}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.filterChip, statusFilter === item && styles.filterActive]} onPress={() => setStatusFilter(item)}>
            <Text style={[styles.filterText, statusFilter === item && styles.filterTextActive]}>
              {item === 'all' ? 'All' : item.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        style={styles.filterRow}
        contentContainerStyle={{ paddingHorizontal: Spacing.lg, gap: Spacing.sm }}
        showsHorizontalScrollIndicator={false}
      />

      <FlatList
        data={filtered as any}
        renderItem={renderDefense}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<View style={styles.empty}><Ionicons name="documents-outline" size={48} color={Colors.light.textMuted} /><Text style={styles.emptyText}>No defenses found</Text></View>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  searchRow: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md, marginBottom: Spacing.sm },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderRadius: BorderRadius.md, paddingHorizontal: Spacing.md, height: 42, gap: Spacing.sm, borderWidth: 1, borderColor: Colors.light.border },
  searchInput: { flex: 1, fontSize: FontSizes.sm, color: Colors.light.textPrimary },
  filterRow: { maxHeight: 42, marginBottom: Spacing.md },
  filterChip: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs + 2, borderRadius: BorderRadius.full, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.light.border },
  filterActive: { backgroundColor: Colors.accent, borderColor: Colors.accent },
  filterText: { fontSize: FontSizes.sm, color: Colors.light.textSecondary, fontWeight: FontWeights.medium },
  filterTextActive: { color: Colors.white },
  list: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxl },
  card: { backgroundColor: Colors.white, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.light.border, ...Shadows.sm },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  statusBadge: { paddingHorizontal: Spacing.sm + 2, paddingVertical: 3, borderRadius: BorderRadius.full },
  statusText: { fontSize: FontSizes.xs, fontWeight: FontWeights.semibold },
  type: { fontSize: FontSizes.xs, color: Colors.light.textMuted, fontWeight: FontWeights.medium },
  title: { fontSize: FontSizes.md, fontWeight: FontWeights.semibold, color: Colors.light.textPrimary, marginBottom: 4, lineHeight: 22 },
  student: { fontSize: FontSizes.sm, color: Colors.light.textSecondary, marginBottom: Spacing.sm },
  metaRow: { flexDirection: 'row', gap: Spacing.lg, marginTop: 4 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: FontSizes.xs, color: Colors.light.textMuted },
  empty: { alignItems: 'center', marginTop: 80, gap: Spacing.md },
  emptyText: { fontSize: FontSizes.md, color: Colors.light.textMuted },
});
