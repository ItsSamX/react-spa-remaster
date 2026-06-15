import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Play } from 'lucide-react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { upNext } from '@/lib/study-data';
import { SubjectColors, Colors } from '@/constants/Colors';

export function UpNext() {
  return (
    <WidgetShell accent={Colors.info}>
      <SectionHeader title="Up Next" accent={Colors.info} actionLabel="Schedule" />
      <View style={styles.list}>
        {upNext.map((item) => {
          const color = SubjectColors[item.subject];
          return (
            <TouchableOpacity key={item.id} activeOpacity={0.8} style={styles.row}>
              <View style={[styles.iconWrap, { backgroundColor: color + '22', borderColor: color + '40' }]}>
                <Play size={15} color={color} fill={color} />
              </View>
              <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.teacher}>{item.teacher}</Text>
              </View>
              <View style={styles.timeChip}>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
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
    padding: 10,
    borderRadius: 14,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    gap: 2,
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
  timeChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: Colors.brandDim,
    borderWidth: 1,
    borderColor: Colors.borderBrand,
  },
  time: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: Colors.brand,
  },
});
