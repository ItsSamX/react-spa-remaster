import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { upNext } from '@/lib/study-data';
import { SubjectColors } from '@/constants/Colors';
import { Colors } from '@/constants/Colors';

export function UpNext() {
  return (
    <WidgetShell>
      <SectionHeader title="Up Next" />
      <View style={styles.list}>
        {upNext.map((item) => (
          <View key={item.id} style={styles.row}>
            <View style={[styles.subjectBar, { backgroundColor: SubjectColors[item.subject] }]} />
            <View style={styles.content}>
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.teacher}>{item.teacher}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        ))}
      </View>
    </WidgetShell>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  subjectBar: {
    width: 4,
    height: 36,
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.text,
  },
  teacher: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  time: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: Colors.brand,
  },
});
