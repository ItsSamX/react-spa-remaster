import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { FileText } from 'lucide-react-native';
import { TopNav } from '@/components/layout/TopNav';
import { ScreenHeader } from '@/components/shared/ScreenHeader';
import { SectionHeader } from '@/components/shared/SectionHeader';
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
import { SubjectColors, Colors } from '@/constants/Colors';

const perfStats = [
  { value: `${performance.avgScore}%`, label: 'Avg Score', color: Colors.success },
  { value: performance.avgTime, label: 'Avg Time', color: Colors.info },
  { value: String(performance.testsTaken), label: 'Tests Taken', color: Colors.purple },
];

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <TopNav />
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader
          eyebrow="Overview"
          title="Dashboard"
          subtitle="Your complete learning snapshot at a glance"
        />

        <HeroMetrics />

        <View style={styles.row}>
          <View style={styles.third}>
            <StreakTracker />
          </View>
          <View style={styles.twoThird}>
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

        {/* Performance Stats */}
        <WidgetShell accent={Colors.success}>
          <SectionHeader title="Performance" accent={Colors.success} />
          <View style={styles.statsGrid}>
            {perfStats.map((s) => (
              <View key={s.label} style={styles.stat}>
                <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </WidgetShell>

        <View style={styles.row}>
          <View style={styles.half}>
            <TestsPanel />
          </View>
          <View style={styles.half}>
            <NotesPanel />
          </View>
        </View>

        {/* Study Material */}
        <WidgetShell accent={Colors.brand}>
          <SectionHeader title="Study Material" />
          <View style={styles.materialGrid}>
            {studyMaterial.map((m) => {
              const color = SubjectColors[m.subject];
              return (
                <View key={m.subject} style={styles.materialCard}>
                  <View style={[styles.materialIcon, { backgroundColor: color + '22', borderColor: color + '40' }]}>
                    <FileText size={18} color={color} strokeWidth={2.2} />
                  </View>
                  <Text style={styles.materialSubject}>{m.subject}</Text>
                  <Text style={styles.materialCount}>{m.pdfs} PDFs</Text>
                </View>
              );
            })}
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
    padding: 24,
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
    gap: 20,
    paddingBottom: 48,
  },
  row: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'flex-start',
  },
  half: {
    flex: 1,
  },
  third: {
    flex: 1,
  },
  twoThird: {
    flex: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    gap: 4,
  },
  statValue: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 28,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  materialGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  materialCard: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
  },
  materialIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  materialSubject: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: Colors.text,
  },
  materialCount: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
