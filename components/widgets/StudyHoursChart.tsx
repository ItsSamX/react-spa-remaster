import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { studyHours, dayLabels, todayIndex } from '@/lib/study-data';
import { Colors, BrandGradient } from '@/constants/Colors';

export function StudyHoursChart() {
  const maxHours = Math.max(...studyHours);
  const totalThisWeek = Math.round((studyHours.reduce((a, b) => a + b, 0) / 100) * 14);

  return (
    <WidgetShell>
      <SectionHeader
        title="Study Hours"
        accent={Colors.info}
        actions={
          <View style={styles.totalChip}>
            <Text style={styles.totalValue}>{totalThisWeek}h</Text>
            <Text style={styles.totalLabel}>this week</Text>
          </View>
        }
      />
      <View style={styles.chart}>
        {studyHours.map((hours, i) => {
          const isToday = i === todayIndex;
          const heightPercent = Math.max((hours / maxHours) * 100, 6);
          return (
            <View key={i} style={styles.barContainer}>
              <View style={styles.barWrapper}>
                {isToday ? (
                  <LinearGradient
                    colors={BrandGradient as unknown as string[]}
                    style={[styles.bar, { height: `${heightPercent}%` as any }]}
                  />
                ) : (
                  <View
                    style={[
                      styles.bar,
                      styles.idleBar,
                      { height: `${heightPercent}%` as any },
                    ]}
                  />
                )}
              </View>
              <Text style={[styles.dayLabel, isToday && styles.todayLabel]}>{dayLabels[i]}</Text>
            </View>
          );
        })}
      </View>
    </WidgetShell>
  );
}

const styles = StyleSheet.create({
  totalChip: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  totalValue: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 16,
    color: Colors.text,
  },
  totalLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    color: Colors.textSecondary,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 110,
    gap: 10,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  barWrapper: {
    width: '100%',
    height: 84,
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 8,
    minHeight: 6,
  },
  idleBar: {
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  dayLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    color: Colors.textMuted,
  },
  todayLabel: {
    color: Colors.brand,
  },
});
