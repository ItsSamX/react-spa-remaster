import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { TopNav } from '@/components/layout/TopNav';
import { HeroMetrics } from '@/components/widgets/HeroMetrics';
import { ContinueWatching } from '@/components/widgets/ContinueWatching';
import { UpNext } from '@/components/widgets/UpNext';
import { StudyHoursChart } from '@/components/widgets/StudyHoursChart';
import { StreakTracker } from '@/components/widgets/StreakTracker';
import { LeaderboardWidget } from '@/components/widgets/Leaderboard';
import { TestsPanel } from '@/components/widgets/TestsPanel';
import { NotesPanel } from '@/components/widgets/NotesPanel';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { performance, studyMaterial } from '@/lib/study-data';
import { Colors } from '@/constants/Colors';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <TopNav />
      <ScrollView contentContainerStyle={styles.content}>
        <HeroMetrics />

        <View style={styles.row}>
          <View style={styles.half}>
            <StreakTracker />
          </View>
          <View style={styles.half}>
            <StudyHoursChart />
          </View>
        </View>

        <ContinueWatching />

        <View style={styles.row}>
          <View style={styles.half}>
            <UpNext />
          </View>
          <View style={styles.half}>
            <LeaderboardWidget />
          </View>
        </View>

        <TestsPanel />
        <NotesPanel />

        {/* Performance Stats */}
        <WidgetShell>
          <View style={styles.statsGrid}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{performance.avgScore}%</Text>
              <Text style={styles.statLabel}>Avg Score</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{performance.avgTime}</Text>
              <Text style={styles.statLabel}>Avg Time</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{performance.testsTaken}</Text>
              <Text style={styles.statLabel}>Tests Taken</Text>
            </View>
          </View>
        </WidgetShell>

        {/* Study Material */}
        <WidgetShell>
          <Text style={styles.sectionTitle}>Study Material</Text>
          <View style={styles.materialGrid}>
            {studyMaterial.map((m) => (
              <View key={m.subject} style={styles.materialCard}>
                <Text style={styles.materialSubject}>{m.subject}</Text>
                <Text style={styles.materialCount}>{m.pdfs} PDFs</Text>
              </View>
            ))}
          </View>
        </WidgetShell>
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
    padding: 20,
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
    gap: 16,
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  half: {
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  statValue: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 24,
    color: Colors.text,
  },
  statLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    textTransform: 'uppercase',
    color: Colors.textSecondary,
    marginBottom: 12,
    letterSpacing: 1.2,
  },
  materialGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  materialCard: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 12,
    alignItems: 'center',
  },
  materialSubject: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.text,
  },
  materialCount: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
