import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flame } from 'lucide-react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { streakDays, streakCount, dayLabels } from '@/lib/study-data';
import { Colors } from '@/constants/Colors';

export function StreakTracker() {
  return (
    <WidgetShell>
      {/* Header row */}
      <View style={styles.header}>
        <View style={styles.flameWrap}>
          <Flame size={18} color={Colors.brand} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.count}>{streakCount} day streak</Text>
          <Text style={styles.sub}>Keep it going!</Text>
        </View>
      </View>

      {/* 7-day dot row */}
      <View style={styles.dotsRow}>
        {streakDays.map((studied, i) => (
          <View key={i} style={styles.dotCol}>
            <View style={[styles.dot, studied && styles.dotActive]} />
            <Text style={[styles.dotDay, studied && styles.dotDayActive]}>
              {dayLabels[i]}
            </Text>
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
    gap: 12,
    marginBottom: 20,
  },
  flameWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.brandDim,
    borderWidth: 1,
    borderColor: Colors.borderBrand,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    gap: 2,
  },
  count: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 22,
    color: Colors.text,
    lineHeight: 26,
  },
  sub: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dotCol: {
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dotActive: {
    backgroundColor: Colors.brand,
    borderColor: Colors.brand,
  },
  dotDay: {
    fontFamily: 'Inter-Medium',
    fontSize: 9,
    color: Colors.textMuted,
  },
  dotDayActive: {
    color: Colors.brand,
  },
});
