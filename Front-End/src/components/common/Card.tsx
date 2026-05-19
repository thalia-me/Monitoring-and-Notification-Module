// E-Defense — Card Component with Glassmorphism
import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, BorderRadius, Spacing, Shadows } from '../../styles/theme';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
  style?: ViewStyle;
  padding?: keyof typeof Spacing;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  style,
  padding = 'md',
}) => {
  return (
    <View style={[
      styles.base,
      styles[variant],
      { padding: Spacing[padding] },
      style,
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  default: {
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  glass: {
    backgroundColor: Colors.glass.background,
    borderWidth: 1,
    borderColor: Colors.glass.border,
  },
  elevated: {
    backgroundColor: Colors.dark.surface,
    ...Shadows.lg,
  },
});
