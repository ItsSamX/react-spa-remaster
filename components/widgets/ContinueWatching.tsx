import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ContinueCard } from '@/components/cards/ContinueCard';
import { continueWatching } from '@/lib/study-data';
import { useResponsive } from '@/hooks/useResponsive';

export function ContinueWatching() {
  const { isMobile } = useResponsive();

  return (
    <WidgetShell padding={isMobile ? 16 : 20}>
      <SectionHeader title="Continue Watching" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.rail}
      >
        {continueWatching.map((lecture) => (
          <ContinueCard key={lecture.id} lecture={lecture} onPress={() => {}} />
        ))}
      </ScrollView>
    </WidgetShell>
  );
}

const styles = StyleSheet.create({
  rail: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 4,
  },
});
