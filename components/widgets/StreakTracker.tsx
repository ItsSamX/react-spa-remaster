import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { streakDays, streakCount } from '@/lib/study-data';
import { Colors } from '@/constants/Colors';

export function StreakTracker() {
  return (
    <WidgetShell>
      <View style={styles.header}>
        <Text style={styles.number}>{streakCount}</Text>
        <Text style={styles.label}>day streak</Text>
      </View>
      <View style={styles.dotsRow}>
        {streakDays.map((studied, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              studied && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </WidgetShell>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
  },
  number: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 48,
    color: Colors.text,
    lineHeight: 52,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  activeDot: {
    backgroundColor: Colors.brand,
    shadowColor: Colors.brand,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.5,
  },
});
