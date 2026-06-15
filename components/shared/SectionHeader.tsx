import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

interface SectionHeaderProps {
  title: string;
  actions?: ReactNode;
  onAction?: () => void;
  actionLabel?: string;
  /** Color of the leading accent bar. */
  accent?: string;
}

export function SectionHeader({
  title,
  actions,
  onAction,
  actionLabel,
  accent = Colors.brand,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={[styles.bar, { backgroundColor: accent }]} />
        <Text style={styles.title}>{title}</Text>
      </View>
      {actions ? (
        <View style={styles.actions}>{actions}</View>
      ) : actionLabel ? (
        <TouchableOpacity onPress={onAction} activeOpacity={0.7} style={styles.action}>
          <Text style={styles.actionText}>{actionLabel}</Text>
          <ChevronRight size={14} color={Colors.brand} />
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
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bar: {
    width: 4,
    height: 16,
    borderRadius: 2,
  },
  title: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 16,
    letterSpacing: -0.2,
    color: Colors.text,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  actionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: Colors.brand,
  },
});
