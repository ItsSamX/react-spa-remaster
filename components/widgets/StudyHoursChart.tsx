import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { studyHours, dayLabels, todayIndex } from '@/lib/study-data';
import { Colors } from '@/constants/Colors';

export function StudyHoursChart() {
  const maxHours = Math.max(...studyHours);

  return (
    <WidgetShell>
      <SectionHeader title="Study Hours" />
      <View style={styles.chart}>
        {studyHours.map((hours, i) => {
          const isToday = i === todayIndex;
          const heightPercent = (hours / maxHours) * 100;
          return (
            <View key={i} style={styles.barContainer}>
              <View style={styles.barWrapper}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${heightPercent}%` as any,
                      backgroundColor: isToday ? Colors.brand : Colors.textSecondary,
                      opacity: isToday ? 1 : 0.55,
                    },
                  ]}
                />
              </View>
              <Text style={styles.dayLabel}>{dayLabels[i]}</Text>
            </View>
          );
        })}
      </View>
    </WidgetShell>
  );
}

const styles = StyleSheet.create({
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 90,
    gap: 8,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  barWrapper: {
    width: '100%',
    height: 70,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 4,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  bar: {
    width: '100%',
    borderRadius: 4,
  },
  dayLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: Colors.textSecondary,
  },
});
