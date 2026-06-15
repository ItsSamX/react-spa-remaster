import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { studyHours, dayLabels, todayIndex } from '@/lib/study-data';
import { Colors } from '@/constants/Colors';

const CHART_HEIGHT = 80;
const TOTAL_HOURS = studyHours.reduce((a, b) => a + b, 0);

export function StudyHoursChart() {
  const maxH = Math.max(...studyHours);

  return (
    <WidgetShell>
      <SectionHeader
        title="Study Hours"
        right={
          <Text style={styles.totalBadge}>{TOTAL_HOURS}h total</Text>
        }
      />

      {/* Bar chart */}
      <View style={styles.chart}>
        {studyHours.map((h, i) => {
          const isToday = i === todayIndex;
          const fillRatio = maxH > 0 ? h / maxH : 0;
          const barHeight = Math.max(4, Math.round(fillRatio * CHART_HEIGHT));

          return (
            <View key={i} style={styles.col}>
              {/* value tooltip on today */}
              {isToday && (
                <View style={styles.tooltip}>
                  <Text style={styles.tooltipText}>{h}h</Text>
                </View>
              )}
              <View style={styles.track}>
                <View
                  style={[
                    styles.fill,
                    {
                      height: barHeight,
                      backgroundColor: isToday ? Colors.brand : Colors.borderStrong,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.day, isToday && styles.dayToday]}>{dayLabels[i]}</Text>
            </View>
          );
        })}
      </View>
    </WidgetShell>
  );
}

const styles = StyleSheet.create({
  totalBadge: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    color: Colors.brand,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    height: CHART_HEIGHT + 36,
  },
  col: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
  },
  tooltip: {
    backgroundColor: Colors.brand,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginBottom: 2,
  },
  tooltipText: {
    fontFamily: 'Inter-Bold',
    fontSize: 9,
    color: '#fff',
  },
  track: {
    width: '100%',
    height: CHART_HEIGHT,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 6,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  fill: {
    width: '100%',
    borderRadius: 6,
  },
  day: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: Colors.textMuted,
  },
  dayToday: {
    color: Colors.brand,
    fontFamily: 'Inter-Bold',
  },
});
