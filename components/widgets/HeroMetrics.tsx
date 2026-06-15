import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { heroStats } from '@/lib/study-data';
import { Colors } from '@/constants/Colors';
import { useResponsive } from '@/hooks/useResponsive';

const metrics = [
  { label: 'Completion', value: `${heroStats.completion}%`, color: Colors.brand },
  { label: 'Lectures', value: String(heroStats.lectures), color: Colors.info },
  { label: 'Hours Studied', value: `${heroStats.hours}h`, color: Colors.success },
  { label: 'Tests', value: String(heroStats.tests), color: Colors.purple },
];

export function HeroMetrics() {
  const { isMobile } = useResponsive();

  return (
    <View style={[styles.container, isMobile && styles.mobileContainer]}>
      {metrics.map((metric) => (
        <WidgetShell key={metric.label} style={styles.metricCard} padding={16}>
          <Text style={[styles.value, { color: metric.color }]}>{metric.value}</Text>
          <Text style={styles.label}>{metric.label}</Text>
        </WidgetShell>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
  },
  mobileContainer: {
    flexWrap: 'wrap',
  },
  metricCard: {
    flex: 1,
    minWidth: 120,
  },
  value: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 28,
    marginBottom: 4,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
