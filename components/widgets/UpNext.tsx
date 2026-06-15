import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock } from 'lucide-react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { upNext } from '@/lib/study-data';
import { SubjectColors, Colors } from '@/constants/Colors';

export function UpNext() {
  return (
    <WidgetShell>
      <SectionHeader title="Up Next" />
      <View style={styles.list}>
        {upNext.map((item, idx) => {
          const color = SubjectColors[item.subject];
          return (
            <View key={item.id} style={styles.row}>
              {/* left accent bar */}
              <View style={[styles.bar, { backgroundColor: color }]} />

              {/* content */}
              <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.teacher}>{item.teacher}</Text>
              </View>

              {/* time */}
              <View style={styles.timeWrap}>
                <Clock size={10} color={Colors.textMuted} />
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </WidgetShell>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  bar: {
    width: 3,
    height: 38,
    borderRadius: 2,
    opacity: 0.85,
  },
  content: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: Colors.text,
    lineHeight: 17,
  },
  teacher: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: Colors.textSecondary,
  },
  timeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  time: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: Colors.brand,
  },
});
