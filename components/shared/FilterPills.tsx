import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
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
    >
      {items.map((item) => {
        const isActive = item === active;
        return (
          <TouchableOpacity
            key={item}
            onPress={() => onChange(item)}
            activeOpacity={0.7}
            style={[
              styles.pill,
              isActive && styles.activePill,
            ]}
          >
            <Text style={[
              styles.pillText,
              isActive && styles.activePillText,
            ]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    gap: 8,
    paddingVertical: 4,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  activePill: {
    backgroundColor: Colors.brand,
    borderColor: Colors.brand,
  },
  pillText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  activePillText: {
    color: '#1a0a00',
  },
});
