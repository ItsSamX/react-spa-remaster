import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useResponsive } from '@/hooks/useResponsive';
import { TopNav } from '@/components/layout/TopNav';
import { HomeHero } from '@/components/widgets/HomeHero';
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
          <View style={styles.stack}>
            <HomeHero />
            <HeroMetrics />
            <View style={styles.row}>
              <View style={styles.mainCol}>
                <ContinueWatching />
                <UpNext />
              </View>
              <View style={styles.sideCol}>
                <StreakTracker />
                <StudyHoursChart />
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
          <HomeHero />
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
          <StreakTracker />
          <LeaderboardWidget />
        </ScrollView>
      </View>
    );
  }

  // Mobile
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.mobileContent}>
      <HomeHero />
      <HeroMetrics />
      <ContinueWatching />
      <StreakTracker />
      <UpNext />
      <StudyHoursChart />
      <LeaderboardWidget />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  desktopContent: {
    padding: 24,
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
  },
  stack: {
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'flex-start',
  },
  mainCol: {
    flex: 2,
    gap: 20,
  },
  sideCol: {
    flex: 1,
    gap: 20,
  },
  tabletContent: {
    padding: 20,
    gap: 18,
  },
  tabletRow: {
    flexDirection: 'row',
    gap: 18,
  },
  tabletHalf: {
    flex: 1,
  },
  mobileContent: {
    padding: 16,
    gap: 18,
    paddingBottom: 100,
  },
});
