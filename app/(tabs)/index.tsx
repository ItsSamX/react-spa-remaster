import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useResponsive } from '@/hooks/useResponsive';
import { TopNav } from '@/components/layout/TopNav';
import { HeroMetrics } from '@/components/widgets/HeroMetrics';
import { ContinueWatching } from '@/components/widgets/ContinueWatching';
import { UpNext } from '@/components/widgets/UpNext';
import { StudyHoursChart } from '@/components/widgets/StudyHoursChart';
import { StreakTracker } from '@/components/widgets/StreakTracker';
import { LeaderboardWidget } from '@/components/widgets/Leaderboard';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const { isDesktop, isTablet } = useResponsive();

  if (isDesktop) {
    return (
      <View style={styles.container}>
        <TopNav />
        <ScrollView contentContainerStyle={styles.desktopContent}>
          <View style={styles.desktopGrid}>
            {/* Row 1: Hero Metrics + Streak + Study Hours */}
            <View style={styles.row}>
              <View style={styles.heroSection}>
                <HeroMetrics />
              </View>
              <View style={styles.sideWidgets}>
                <StreakTracker />
                <StudyHoursChart />
              </View>
            </View>

            {/* Row 2: Continue Watching (full width) */}
            <ContinueWatching />

            {/* Row 3: Up Next + Leaderboard */}
            <View style={styles.row}>
              <View style={styles.half}>
                <UpNext />
              </View>
              <View style={styles.half}>
                <LeaderboardWidget />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  if (isTablet) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.tabletContent}>
          <HeroMetrics />
          <ContinueWatching />
          <View style={styles.tabletRow}>
            <View style={styles.tabletHalf}>
              <UpNext />
            </View>
            <View style={styles.tabletHalf}>
              <StudyHoursChart />
            </View>
          </View>
          <LeaderboardWidget />
          <StreakTracker />
        </ScrollView>
      </View>
    );
  }

  // Mobile
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.mobileContent}>
      <HeroMetrics />
      <ContinueWatching />
      <UpNext />
      <StudyHoursChart />
      <LeaderboardWidget />
      <StreakTracker />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  desktopContent: {
    padding: 20,
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
  },
  desktopGrid: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  heroSection: {
    flex: 2,
  },
  sideWidgets: {
    flex: 1,
    gap: 16,
  },
  half: {
    flex: 1,
  },
  tabletContent: {
    padding: 16,
    gap: 16,
  },
  tabletRow: {
    flexDirection: 'row',
    gap: 16,
  },
  tabletHalf: {
    flex: 1,
  },
  mobileContent: {
    padding: 16,
    gap: 16,
    paddingBottom: 100,
  },
});
