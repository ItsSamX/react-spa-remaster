import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, GraduationCap, Clock, Target, ClipboardCheck } from 'lucide-react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { heroStats } from '@/lib/study-data';
import { Colors } from '@/constants/Colors';
import { useResponsive } from '@/hooks/useResponsive';

const metrics = [
  { label: 'Completion', value: `${heroStats.completion}%`, delta: '+4%', color: Colors.brand, Icon: Target },
  { label: 'Lectures', value: String(heroStats.lectures), delta: '+12', color: Colors.info, Icon: GraduationCap },
  { label: 'Hours Studied', value: `${heroStats.hours}h`, delta: '+6h', color: Colors.success, Icon: Clock },
  { label: 'Tests Taken', value: String(heroStats.tests), delta: '+3', color: Colors.purple, Icon: ClipboardCheck },
];

export function HeroMetrics() {
  const { isMobile } = useResponsive();

  return (
    <View style={[styles.container, isMobile && styles.mobileContainer]}>
      {metrics.map(({ label, value, delta, color, Icon }) => (
        <WidgetShell key={label} style={styles.metricCard} padding={16} accent={color}>
          <View style={styles.topRow}>
            <View style={[styles.iconChip, { backgroundColor: color + '22', borderColor: color + '40' }]}>
              <Icon size={16} color={color} strokeWidth={2.4} />
            </View>
            <View style={styles.delta}>
              <TrendingUp size={11} color={Colors.success} strokeWidth={2.6} />
              <Text style={styles.deltaText}>{delta}</Text>
            </View>
          </View>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.label}>{label}</Text>
        </WidgetShell>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 14,
  },
  mobileContainer: {
    flexWrap: 'wrap',
  },
  metricCard: {
    flex: 1,
    minWidth: 150,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  iconChip: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  delta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: 'rgba(34, 197, 94, 0.14)',
  },
  deltaText: {
    fontFamily: 'Inter-Bold',
    fontSize: 11,
    color: Colors.success,
  },
  value: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 30,
    letterSpacing: -1,
    color: Colors.text,
    marginBottom: 2,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
});
