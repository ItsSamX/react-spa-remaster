import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ContinueCard } from '@/components/cards/ContinueCard';
import { continueWatching } from '@/lib/study-data';
import { useResponsive } from '@/hooks/useResponsive';

export function ContinueWatching() {
  const { isMobile } = useResponsive();

  if (isMobile) {
    return (
      <View>
        <SectionHeader title="Continue Watching" actionLabel="See all" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.rail}>
            {continueWatching.map((lecture) => (
              <ContinueCard
                key={lecture.id}
                lecture={lecture}
                onPress={() => {}}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <WidgetShell>
      <SectionHeader title="Continue Watching" />
      <View style={styles.grid}>
        {continueWatching.map((lecture) => (
          <ContinueCard
            key={lecture.id}
            lecture={lecture}
            onPress={() => {}}
          />
        ))}
      </View>
    </WidgetShell>
  );
}

const styles = StyleSheet.create({
  rail: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
