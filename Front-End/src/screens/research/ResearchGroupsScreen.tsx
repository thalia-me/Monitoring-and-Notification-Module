// E-Defense — Research Groups Screen (Main view matching reference UI)
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, FontWeights, Spacing, BorderRadius, Shadows } from '../../styles/theme';

interface ResearchGroup {
  id: number;
  title: string;
  members: string[];
  adviser: string;
  program: string;
  defenseDate: string;
  defenseStage: 'Title Defense' | 'Review Defense' | 'Final Defense';
  score: number;
}

const MOCK_GROUPS: ResearchGroup[] = [
  {
    id: 1,
    title: 'Blockchain-Based Student Records Management System',
    members: ['Sarah Williams', 'Michael Brown'],
    adviser: 'Dr. Maria Santos',
    program: 'BS Information Technology',
    defenseDate: 'December 15, 2025',
    defenseStage: 'Review Defense',
    score: 82,
  },
  {
    id: 2,
    title: 'AI-Powered Learning Management System for Remote Education',
    members: ['John Doe', 'Jane Smith', 'Mark Johnson'],
    adviser: 'Dr. Robert Lee',
    program: 'BS Computer Science',
    defenseDate: 'December 15, 2025',
    defenseStage: 'Title Defense',
    score: 92,
  },
  {
    id: 3,
    title: 'E-Commerce Platform for Local Agricultural Products',
    members: ['Anna Lee', 'Thomas Clark'],
    adviser: 'Dr. Maria Santos',
    program: 'BS Information Technology',
    defenseDate: 'December 16, 2025',
    defenseStage: 'Final Defense',
    score: 88,
  },
  {
    id: 4,
    title: 'IoT-Based Smart Campus Monitoring System',
    members: ['Pedro Cruz', 'Ana Reyes', 'Luis Garcia'],
    adviser: 'Dr. Carlos Rivera',
    program: 'BS Computer Engineering',
    defenseDate: 'December 18, 2025',
    defenseStage: 'Title Defense',
    score: 78,
  },
  {
    id: 5,
    title: 'NLP-Based Chatbot for Student Services',
    members: ['Rosa Lim', 'David Tan'],
    adviser: 'Dr. Robert Lee',
    program: 'BS Computer Science',
    defenseDate: 'December 20, 2025',
    defenseStage: 'Final Defense',
    score: 95,
  },
];

const DEPARTMENTS = ['All Departments', 'BS Information Technology', 'BS Computer Science', 'BS Computer Engineering'];
const STAGES = ['All Stages', 'Title Defense', 'Review Defense', 'Final Defense'];

const getStageColor = (stage: string) => {
  switch (stage) {
    case 'Title Defense': return { bg: '#EBF5FB', text: '#2980B9' };
    case 'Review Defense': return { bg: '#FEF9E7', text: '#F39C12' };
    case 'Final Defense': return { bg: '#EAFAF1', text: '#27AE60' };
    default: return { bg: '#F2F3F4', text: '#7F8C8D' };
  }
};

export const ResearchGroupsScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All Departments');
  const [stage, setStage] = useState('All Stages');
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const [showStageDropdown, setShowStageDropdown] = useState(false);

  const filtered = MOCK_GROUPS.filter((g) => {
    const matchesSearch = g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.members.join(', ').toLowerCase().includes(search.toLowerCase());
    const matchesDept = department === 'All Departments' || g.program === department;
    const matchesStage = stage === 'All Stages' || g.defenseStage === stage;
    return matchesSearch && matchesDept && matchesStage;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {/* Filters Bar */}
      <View style={styles.filtersBar}>
        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color={Colors.light.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by title or members..."
            placeholderTextColor={Colors.light.textMuted}
            value={search}
            onChangeText={setSearch}
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={16} color={Colors.light.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Department Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Department</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => { setShowDeptDropdown(!showDeptDropdown); setShowStageDropdown(false); }}
          >
            <Text style={styles.dropdownText}>{department}</Text>
            <Ionicons name="chevron-down" size={16} color={Colors.light.textSecondary} />
          </TouchableOpacity>
          {showDeptDropdown && (
            <View style={styles.dropdownMenu}>
              {DEPARTMENTS.map((d) => (
                <TouchableOpacity
                  key={d}
                  style={[styles.dropdownItem, department === d && styles.dropdownItemActive]}
                  onPress={() => { setDepartment(d); setShowDeptDropdown(false); }}
                >
                  <Text style={[styles.dropdownItemText, department === d && styles.dropdownItemTextActive]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Defense Stage Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Defense Stage</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => { setShowStageDropdown(!showStageDropdown); setShowDeptDropdown(false); }}
          >
            <Text style={styles.dropdownText}>{stage}</Text>
            <Ionicons name="chevron-down" size={16} color={Colors.light.textSecondary} />
          </TouchableOpacity>
          {showStageDropdown && (
            <View style={styles.dropdownMenu}>
              {STAGES.map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[styles.dropdownItem, stage === s && styles.dropdownItemActive]}
                  onPress={() => { setStage(s); setShowStageDropdown(false); }}
                >
                  <Text style={[styles.dropdownItemText, stage === s && styles.dropdownItemTextActive]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Research Group Cards */}
      {filtered.map((group) => {
        const stageColors = getStageColor(group.defenseStage);
        return (
          <View key={group.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{group.title}</Text>
              <TouchableOpacity style={styles.viewDetailsBtn}>
                <Text style={styles.viewDetailsText}>View Details</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardBody}>
              <View style={styles.infoColumn}>
                <Text style={styles.infoLabel}>MEMBERS</Text>
                <Text style={styles.infoValue}>{group.members.join(', ')}</Text>
              </View>
              <View style={styles.infoColumn}>
                <Text style={styles.infoLabel}>ADVISER</Text>
                <Text style={styles.infoValue}>{group.adviser}</Text>
              </View>
              <View style={styles.infoColumn}>
                <Text style={styles.infoLabel}>PROGRAM</Text>
                <Text style={styles.infoValue}>{group.program}</Text>
              </View>
              <View style={styles.infoColumn}>
                <Text style={styles.infoLabel}>DEFENSE DATE</Text>
                <Text style={styles.infoValue}>{group.defenseDate}</Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <View style={[styles.stageBadge, { backgroundColor: stageColors.bg }]}>
                <Text style={[styles.stageText, { color: stageColors.text }]}>{group.defenseStage}</Text>
              </View>
              <Text style={styles.scoreText}>Score: {group.score}/100</Text>
            </View>
          </View>
        );
      })}

      {filtered.length === 0 && (
        <View style={styles.empty}>
          <Ionicons name="documents-outline" size={48} color={Colors.light.textMuted} />
          <Text style={styles.emptyText}>No research groups found</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },

  // Filters
  filtersBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
    ...Shadows.sm,
    flexWrap: 'wrap',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.surfaceLight,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.sm + 2,
    height: 40,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.light.border,
    flex: 1,
    minWidth: 200,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.light.textPrimary,
  },
  dropdownContainer: {
    position: 'relative',
    minWidth: 180,
  },
  dropdownLabel: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.semibold,
    color: Colors.light.textSecondary,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.surfaceLight,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.sm + 2,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  dropdownText: {
    fontSize: FontSizes.sm,
    color: Colors.light.textPrimary,
    marginRight: Spacing.sm,
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginTop: 4,
    zIndex: 100,
    ...Shadows.md,
  },
  dropdownItem: {
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.md,
  },
  dropdownItemActive: {
    backgroundColor: Colors.light.surfaceLight,
  },
  dropdownItemText: {
    fontSize: FontSizes.sm,
    color: Colors.light.textPrimary,
  },
  dropdownItemTextActive: {
    color: Colors.accent,
    fontWeight: FontWeights.semibold,
  },

  // Cards
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
    ...Shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  cardTitle: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.bold,
    color: Colors.light.textPrimary,
    flex: 1,
    marginRight: Spacing.md,
    lineHeight: 24,
  },
  viewDetailsBtn: {
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  viewDetailsText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    color: Colors.white,
  },
  cardBody: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.lg,
    marginBottom: Spacing.md,
  },
  infoColumn: {
    minWidth: 140,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: FontWeights.bold,
    color: Colors.light.textMuted,
    letterSpacing: 0.5,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: FontSizes.sm,
    color: Colors.light.textPrimary,
    fontWeight: FontWeights.medium,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  stageBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.full,
  },
  stageText: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.bold,
  },
  scoreText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    color: Colors.light.textPrimary,
  },
  empty: {
    alignItems: 'center',
    marginTop: 80,
    gap: Spacing.md,
  },
  emptyText: {
    fontSize: FontSizes.md,
    color: Colors.light.textMuted,
  },
});
