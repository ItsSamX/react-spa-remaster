import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useResponsive } from '@/hooks/useResponsive';
import { TopNav } from '@/components/layout/TopNav';
import { ScreenHeader } from '@/components/shared/ScreenHeader';
import { TestsPanel } from '@/components/widgets/TestsPanel';
import { performance } from '@/lib/study-data';
import { Colors } from '@/constants/Colors';

export default function TestsScreen() {
  const { isDesktop } = useResponsive();

  return (
    <View style={styles.container}>
      {isDesktop && <TopNav />}
      <ScrollView contentContainerStyle={[styles.content, isDesktop && styles.desktopContent]}>
        <ScreenHeader
          eyebrow="Practice"
          title="Tests"
          subtitle={`Avg score ${performance.avgScore}% over ${performance.testsTaken} attempts`}
        />
        <TestsPanel />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  content: {
    padding: 16,
    gap: 18,
    paddingBottom: 100,
  },
  desktopContent: {
    padding: 24,
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
    gap: 20,
  },
});
