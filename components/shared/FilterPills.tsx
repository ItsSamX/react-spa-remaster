import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';
import { Colors } from '@/constants/Colors';

interface FilterPillsProps<T extends string> {
  items: readonly T[];
  active: T;
  onChange: (item: T) => void;
}

export function FilterPills<T extends string>({ items, active, onChange }: FilterPillsProps<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.scroll}
    >
      <View style={styles.row}>
        {items.map((item) => {
          const isActive = item === active;
          return (
            <TouchableOpacity
              key={item}
              onPress={() => onChange(item)}
              activeOpacity={0.7}
              style={[styles.pill, isActive && styles.activePill]}
            >
              <Text style={[styles.pillText, isActive && styles.activePillText]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginBottom: 14,
  },
  scrollContent: {
    paddingBottom: 2,
  },
  row: {
    flexDirection: 'row',
    gap: 6,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: 'transparent',
  },
  activePill: {
    backgroundColor: Colors.elevated,
    borderColor: Colors.borderStrong,
  },
  pillText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  activePillText: {
    color: Colors.text,
  },
});
