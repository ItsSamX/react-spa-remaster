import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { heroStats } from '@/lib/study-data';
import { Colors } from '@/constants/Colors';
import { useResponsive } from '@/hooks/useResponsive';

type Metric = { label: string; value: string; sub: string; color: string };

const metrics: Metric[] = [
  { label: 'Completion',    value: `${heroStats.completion}%`, sub: 'of syllabus',   color: Colors.brand   },
  { label: 'Lectures',      value: String(heroStats.lectures),  sub: 'total watched', color: Colors.info    },
  { label: 'Hours Studied', value: `${heroStats.hours}h`,       sub: 'this month',    color: Colors.success },
  { label: 'Tests Taken',   value: String(heroStats.tests),     sub: 'completed',     color: Colors.purple  },
];

export function HeroMetrics() {
  const { isMobile } = useResponsive();

  return (
    <View style={[styles.row, isMobile && styles.rowMobile]}>
      {metrics.map((m) => (
        <View key={m.label} style={[styles.card, isMobile && styles.cardMobile]}>
          {/* accent bar */}
          <View style={[styles.accentBar, { backgroundColor: m.color }]} />
          <View style={styles.inner}>
            <Text style={[styles.value, { color: m.color }]}>{m.value}</Text>
            <Text style={styles.label}>{m.label}</Text>
            <Text style={styles.sub}>{m.sub}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  rowMobile: {
    flexWrap: 'wrap',
  },
  card: {
    flex: 1,
    minWidth: 120,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  cardMobile: {
    minWidth: '47%',
    maxWidth: '50%',
  },
  accentBar: {
    width: 3,
    alignSelf: 'stretch',
    opacity: 0.7,
  },
  inner: {
    flex: 1,
    padding: 16,
    gap: 2,
  },
  value: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 30,
    lineHeight: 34,
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: Colors.text,
    marginTop: 2,
  },
  sub: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: Colors.textMuted,
  },
});
