import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ContinueCard } from '@/components/cards/ContinueCard';
import { continueWatching } from '@/lib/study-data';
import { useResponsive } from '@/hooks/useResponsive';
import { Colors } from '@/constants/Colors';

export function ContinueWatching() {
  const { isMobile } = useResponsive();

  if (isMobile) {
    return (
      <View>
        <SectionHeader title="Continue Watching" actionLabel="See all" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.rail}>
            {continueWatching.map((lecture) => (
              <View key={lecture.id} style={styles.railItem}>
                <ContinueCard lecture={lecture} onPress={() => {}} />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <WidgetShell accent={Colors.brand}>
      <SectionHeader title="Continue Watching" actionLabel="See all" />
      <View style={styles.grid}>
        {continueWatching.map((lecture) => (
          <View key={lecture.id} style={styles.gridItem}>
            <ContinueCard lecture={lecture} onPress={() => {}} />
          </View>
        ))}
      </View>
    </WidgetShell>
  );
}

const styles = StyleSheet.create({
  rail: {
    flexDirection: 'row',
    gap: 14,
    paddingRight: 16,
  },
  railItem: {
    width: 210,
  },
  grid: {
    flexDirection: 'row',
    gap: 16,
  },
  gridItem: {
    flex: 1,
  },
});
