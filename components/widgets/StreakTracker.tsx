import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flame, Check } from 'lucide-react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { streakDays, streakCount, dayLabels } from '@/lib/study-data';
import { Colors } from '@/constants/Colors';
import { Shadow } from '@/constants/Layout';

export function StreakTracker() {
  return (
    <WidgetShell accent={Colors.brand}>
      <View style={styles.header}>
        <View style={[styles.flame, Shadow.brand]}>
          <Flame size={22} color={Colors.brand} fill={Colors.brand} />
        </View>
        <View>
          <View style={styles.numberRow}>
            <Text style={styles.number}>{streakCount}</Text>
            <Text style={styles.unit}>days</Text>
          </View>
          <Text style={styles.label}>Current study streak</Text>
        </View>
      </View>
      <View style={styles.dotsRow}>
        {streakDays.map((studied, i) => (
          <View key={i} style={styles.dayCol}>
            <View style={[styles.dot, studied && styles.activeDot]}>
              {studied ? <Check size={13} color="#1a0a00" strokeWidth={3.5} /> : null}
            </View>
            <Text style={styles.dayLabel}>{dayLabels[i]}</Text>
          </View>
        ))}
      </View>
    </WidgetShell>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  flame: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.brandDim,
    borderWidth: 1,
    borderColor: Colors.borderBrand,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  number: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: -1.5,
    color: Colors.text,
  },
  unit: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 16,
    color: Colors.textSecondary,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayCol: {
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDot: {
    backgroundColor: Colors.brand,
    borderColor: Colors.brand,
  },
  dayLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: Colors.textMuted,
  },
});
