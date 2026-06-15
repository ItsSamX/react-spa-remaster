import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useResponsive } from '@/hooks/useResponsive';
import { TopNav } from '@/components/layout/TopNav';
import { HeroMetrics } from '@/components/widgets/HeroMetrics';
import { ContinueWatching } from '@/components/widgets/ContinueWatching';
import { UpNext } from '@/components/widgets/UpNext';
import { StudyHoursChart } from '@/components/widgets/StudyHoursChart';
import { StreakTracker } from '@/components/widgets/StreakTracker';
import { LeaderboardWidget } from '@/components/widgets/Leaderboard';
import { TestsPanel } from '@/components/widgets/TestsPanel';
import { NotesPanel } from '@/components/widgets/NotesPanel';
import { Colors } from '@/constants/Colors';

export default function DashboardScreen() {
  const { isDesktop, isTablet } = useResponsive();

  if (isDesktop) {
    return (
      <View style={styles.root}>
        <TopNav />
        <ScrollView contentContainerStyle={styles.desktopScroll}>

          {/* Row 1: Hero metrics full-width */}
          <HeroMetrics />

          {/* Row 2: Continue Watching (2/3) | Streak + Study Hours (1/3) */}
          <View style={styles.row}>
            <View style={styles.flex2}>
              <ContinueWatching />
            </View>
            <View style={[styles.flex1, styles.col]}>
              <StreakTracker />
              <StudyHoursChart />
            </View>
          </View>

          {/* Row 3: Up Next | Leaderboard */}
          <View style={styles.row}>
            <View style={styles.flex1}><UpNext /></View>
            <View style={styles.flex1}><LeaderboardWidget /></View>
          </View>

          {/* Row 4: Tests (2/3) | Notes (1/3) */}
          <View style={styles.row}>
            <View style={styles.flex2}><TestsPanel /></View>
            <View style={styles.flex1}><NotesPanel /></View>
          </View>

        </ScrollView>
      </View>
    );
  }

  if (isTablet) {
    return (
      <View style={styles.root}>
        <ScrollView contentContainerStyle={styles.tabletScroll}>
          <HeroMetrics />
          <View style={styles.row}>
            <View style={styles.flex1}><StreakTracker /></View>
            <View style={styles.flex1}><StudyHoursChart /></View>
          </View>
          <ContinueWatching />
          <View style={styles.row}>
            <View style={styles.flex1}><UpNext /></View>
            <View style={styles.flex1}><LeaderboardWidget /></View>
          </View>
          <TestsPanel />
          <NotesPanel />
        </ScrollView>
      </View>
    );
  }

  // Mobile
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.mobileScroll}>
      <HeroMetrics />
      <StreakTracker />
      <StudyHoursChart />
      <ContinueWatching />
      <UpNext />
      <LeaderboardWidget />
      <TestsPanel />
      <NotesPanel />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  desktopScroll: {
    padding: 20,
    maxWidth: 1440,
    alignSelf: 'center',
    width: '100%',
    gap: 14,
    paddingBottom: 48,
  },
  tabletScroll: {
    padding: 16,
    gap: 12,
    paddingBottom: 40,
  },
  mobileScroll: {
    padding: 14,
    gap: 12,
    paddingBottom: 100,
  },
  row: {
    flexDirection: 'row',
    gap: 14,
  },
  col: {
    gap: 14,
  },
  flex1: { flex: 1 },
  flex2: { flex: 2 },
});
