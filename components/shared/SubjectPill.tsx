import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SubjectKey } from '@/lib/study-data';
import { SubjectColors } from '@/constants/Colors';

interface SubjectPillProps {
  subject: SubjectKey;
  /** 'dot' shows a color dot + text; 'bar' is 4px left-border accent only */
  variant?: 'pill' | 'dot';
}

export function SubjectPill({ subject, variant = 'pill' }: SubjectPillProps) {
  const color = SubjectColors[subject] ?? SubjectColors.Physics;

  if (variant === 'dot') {
    return (
      <View style={styles.dotRow}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={[styles.dotText, { color }]}>{subject}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.pill, { backgroundColor: color + '18', borderColor: color + '40' }]}>
      <Text style={[styles.pillText, { color }]}>{subject}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 5,
    borderWidth: 1,
  },
  pillText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    letterSpacing: 0.3,
  },
  dotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
  },
});
