import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  right?: ReactNode;
  /** Keep existing "actions" prop for backwards compat */
  actions?: ReactNode;
}

export function SectionHeader({ title, actionLabel, onAction, right, actions }: SectionHeaderProps) {
  const rightNode = right ?? actions ?? null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {rightNode ? (
        <View style={styles.rightWrap}>{rightNode}</View>
      ) : actionLabel ? (
        <TouchableOpacity onPress={onAction} activeOpacity={0.7}>
          <Text style={styles.action}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    color: Colors.textSecondary,
  },
  rightWrap: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  action: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.brand,
  },
});
