import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle, Circle, ChevronRight } from 'lucide-react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FilterPills } from '@/components/shared/FilterPills';
import { SubjectPill } from '@/components/shared/SubjectPill';
import { tests, testHistory, testFilters, performance, TestType } from '@/lib/study-data';
import { Colors } from '@/constants/Colors';

type FilterOption = 'All' | TestType;

const TYPE_COLORS: Record<TestType, string> = {
  'DPP':           Colors.info,
  'Chapter Test':  Colors.purple,
  'Mock Test':     Colors.brand,
  'Previous Year': Colors.success,
};

function scoreColor(score: number) {
  if (score >= 75) return Colors.success;
  if (score >= 50) return '#eab308';
  return '#ef4444';
}

export function TestsPanel() {
  const [filter, setFilter] = useState<FilterOption>('All');

  const filtered = filter === 'All'
    ? tests
    : tests.filter((t) => t.type === filter);

  return (
    <WidgetShell>
      <SectionHeader title="Tests" />

      {/* Performance summary row */}
      <View style={styles.perfRow}>
        {[
          { label: 'Avg Score', value: `${performance.avgScore}%`, color: Colors.success },
          { label: 'Avg Time',  value: performance.avgTime,        color: Colors.info    },
          { label: 'Completed', value: String(performance.testsTaken), color: Colors.purple },
        ].map((p) => (
          <View key={p.label} style={styles.perfCard}>
            <Text style={[styles.perfValue, { color: p.color }]}>{p.value}</Text>
            <Text style={styles.perfLabel}>{p.label}</Text>
          </View>
        ))}
      </View>

      <FilterPills items={testFilters} active={filter} onChange={setFilter} />

      {/* Test list */}
      <View style={styles.list}>
        {filtered.map((test) => {
          const typeColor = TYPE_COLORS[test.type];
          const hasScore  = test.score !== null;

          return (
            <View key={test.id} style={styles.testCard}>
              {/* type accent left border */}
              <View style={[styles.typeBar, { backgroundColor: typeColor }]} />

              <View style={styles.testBody}>
                <View style={styles.testTop}>
                  <Text style={styles.testTitle} numberOfLines={1}>{test.title}</Text>
                  {hasScore ? (
                    <View style={[styles.scoreBadge, { borderColor: scoreColor(test.score!) + '55' }]}>
                      <Text style={[styles.scoreBadgeText, { color: scoreColor(test.score!) }]}>
                        {test.score}%
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity style={styles.startBtn} activeOpacity={0.8}>
                      <Text style={styles.startBtnText}>Start</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.testMeta}>
                  <SubjectPill subject={test.subject} />
                  <View style={[styles.typePill, { backgroundColor: typeColor + '1A' }]}>
                    <Text style={[styles.typeText, { color: typeColor }]}>{test.type}</Text>
                  </View>
                  <Text style={styles.metaRight}>{test.questions}Q · {test.duration}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      {/* Recent history */}
      <View style={styles.divider} />
      <Text style={styles.historyHeading}>Recent History</Text>
      <View style={styles.historyList}>
        {testHistory.map((h) => (
          <View key={h.id} style={styles.historyRow}>
            {h.passed
              ? <CheckCircle size={13} color={Colors.success} />
              : <Circle     size={13} color="#ef4444" />
            }
            <Text style={styles.historyName} numberOfLines={1}>{h.name}</Text>
            <Text style={[styles.historyScore, { color: scoreColor(h.score) }]}>
              {h.score}%
            </Text>
          </View>
        ))}
      </View>
    </WidgetShell>
  );
}

const styles = StyleSheet.create({
  perfRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  perfCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 2,
  },
  perfValue: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 18,
  },
  perfLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  list: {
    gap: 6,
  },
  testCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    overflow: 'hidden',
  },
  typeBar: {
    width: 3,
    alignSelf: 'stretch',
    opacity: 0.7,
  },
  testBody: {
    flex: 1,
    padding: 12,
    gap: 8,
  },
  testTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  testTitle: {
    flex: 1,
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: Colors.text,
    lineHeight: 17,
  },
  scoreBadge: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  scoreBadgeText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 13,
  },
  startBtn: {
    backgroundColor: Colors.brandDim,
    borderWidth: 1,
    borderColor: Colors.borderBrand,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  startBtnText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: Colors.brand,
  },
  testMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  typePill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 5,
  },
  typeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
  },
  metaRight: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    color: Colors.textMuted,
    marginLeft: 'auto',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginTop: 16,
    marginBottom: 14,
  },
  historyHeading: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  historyList: {
    gap: 8,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  historyName: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: Colors.text,
  },
  historyScore: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
  },
});
