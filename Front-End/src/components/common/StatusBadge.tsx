// E-Defense — Status Badge Component
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DefenseStatusColors, Colors, BorderRadius, FontSizes, FontWeights, Spacing } from '../../styles/theme';
import { DefenseStatus, DefenseStatusLabels } from '../../types';

interface StatusBadgeProps {
  status: DefenseStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const color = DefenseStatusColors[status] || Colors.dark.textMuted;

  return (
    <View style={[
      styles.badge,
      { backgroundColor: `${color}18` },
      size === 'sm' && styles.badgeSm,
    ]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[
        styles.text,
        { color },
        size === 'sm' && styles.textSm,
      ]}>
        {DefenseStatusLabels[status]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs + 1,
    borderRadius: BorderRadius.full,
    gap: Spacing.xs + 2,
    alignSelf: 'flex-start',
  },
  badgeSm: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  text: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
  },
  textSm: {
    fontSize: FontSizes.xs,
  },
});
