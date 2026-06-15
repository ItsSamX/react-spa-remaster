import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FilterPills } from '@/components/shared/FilterPills';
import { SubjectPill } from '@/components/shared/SubjectPill';
import { tests, testHistory, testFilters, TestType } from '@/lib/study-data';
import { Colors } from '@/constants/Colors';

type FilterOption = 'All' | TestType;

export function TestsPanel() {
  const [filter, setFilter] = useState<FilterOption>('All');

  const filtered = filter === 'All'
    ? tests
    : tests.filter((t) => t.type === filter);

  return (
    <WidgetShell>
      <SectionHeader title="Tests" />
      <FilterPills items={testFilters} active={filter} onChange={setFilter} />
      <View style={styles.list}>
        {filtered.map((test) => (
          <View key={test.id} style={styles.testCard}>
            <View style={styles.testHeader}>
              <Text style={styles.testTitle} numberOfLines={1}>{test.title}</Text>
              <View style={styles.badges}>
                <SubjectPill subject={test.subject} />
                <View style={[styles.typeBadge, { backgroundColor: getTypeColor(test.type) }]}>
                  <Text style={styles.typeText}>{test.type}</Text>
                </View>
              </View>
            </View>
            <View style={styles.testMeta}>
              <Text style={styles.metaText}>{test.questions} questions · {test.duration}</Text>
              {test.score !== null ? (
                <Text style={[styles.score, { color: getScoreColor(test.score) }]}>
                  {test.score}%
                </Text>
              ) : (
                <TouchableOpacity style={styles.startButton}>
                  <Text style={styles.startText}>Start Test</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>Recent History</Text>
        {testHistory.map((h) => (
          <View key={h.id} style={styles.historyRow}>
            <Text style={styles.historyName} numberOfLines={1}>{h.name}</Text>
            <Text style={[styles.historyScore, { color: h.passed ? Colors.success : '#ef4444' }]}>
              {h.score}%
            </Text>
          </View>
        ))}
      </View>
    </WidgetShell>
  );
}

function getTypeColor(type: TestType): string {
  const colors: Record<TestType, string> = {
    'DPP': 'rgba(59, 130, 246, 0.2)',
    'Chapter Test': 'rgba(168, 85, 247, 0.2)',
    'Mock Test': 'rgba(249, 115, 22, 0.2)',
    'Previous Year': 'rgba(34, 197, 94, 0.2)',
  };
  return colors[type];
}

function getScoreColor(score: number): string {
  if (score >= 60) return Colors.success;
  if (score >= 40) return '#eab308';
  return '#ef4444';
}

const styles = StyleSheet.create({
  list: {
    gap: 8,
    marginTop: 12,
  },
  testCard: {
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 12,
    gap: 8,
  },
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  testTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  badges: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  typeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: Colors.text,
  },
  testMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  score: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 16,
  },
  startButton: {
    backgroundColor: Colors.brandDim,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderBrand,
  },
  startText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: Colors.brand,
  },
  historySection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  historyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    textTransform: 'uppercase',
    color: Colors.textSecondary,
    marginBottom: 8,
    letterSpacing: 1.2,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  historyName: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: Colors.text,
    flex: 1,
  },
  historyScore: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
  },
});
