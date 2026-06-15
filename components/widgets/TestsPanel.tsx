import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FileQuestion, Clock, ArrowRight } from 'lucide-react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FilterPills } from '@/components/shared/FilterPills';
import { SubjectPill } from '@/components/shared/SubjectPill';
import { tests, testHistory, testFilters, TestType } from '@/lib/study-data';
import { Colors } from '@/constants/Colors';

type FilterOption = 'All' | TestType;

export function TestsPanel() {
  const [filter, setFilter] = useState<FilterOption>('All');

  const filtered = filter === 'All' ? tests : tests.filter((t) => t.type === filter);

  return (
    <WidgetShell accent={Colors.brand}>
      <SectionHeader title="Tests & Practice" />
      <FilterPills items={testFilters} active={filter} onChange={setFilter} />
      <View style={styles.list}>
        {filtered.map((test) => (
          <View key={test.id} style={styles.testCard}>
            <View style={styles.testHeader}>
              <Text style={styles.testTitle} numberOfLines={1}>{test.title}</Text>
              <View style={[styles.typeBadge, { backgroundColor: getTypeColor(test.type) }]}>
                <Text style={[styles.typeText, { color: getTypeTextColor(test.type) }]}>{test.type}</Text>
              </View>
            </View>
            <View style={styles.metaRow}>
              <SubjectPill subject={test.subject} />
              <View style={styles.metaItem}>
                <FileQuestion size={13} color={Colors.textSecondary} />
                <Text style={styles.metaText}>{test.questions} Q</Text>
              </View>
              <View style={styles.metaItem}>
                <Clock size={13} color={Colors.textSecondary} />
                <Text style={styles.metaText}>{test.duration}</Text>
              </View>
            </View>
            <View style={styles.testFooter}>
              {test.score !== null ? (
                <View style={styles.scorePill}>
                  <Text style={styles.scoreLabel}>Scored</Text>
                  <Text style={[styles.score, { color: getScoreColor(test.score) }]}>
                    {test.score}%
                  </Text>
                </View>
              ) : (
                <Text style={styles.notAttempted}>Not attempted yet</Text>
              )}
              <TouchableOpacity style={styles.startButton} activeOpacity={0.85}>
                <Text style={styles.startText}>{test.score !== null ? 'Retake' : 'Start'}</Text>
                <ArrowRight size={14} color="#1a0a00" strokeWidth={2.6} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>Recent History</Text>
        {testHistory.map((h) => (
          <View key={h.id} style={styles.historyRow}>
            <View
              style={[
                styles.historyDot,
                { backgroundColor: h.passed ? Colors.success : Colors.danger },
              ]}
            />
            <Text style={styles.historyName} numberOfLines={1}>{h.name}</Text>
            <Text style={[styles.historyScore, { color: h.passed ? Colors.success : Colors.danger }]}>
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
    DPP: 'rgba(56, 189, 248, 0.16)',
    'Chapter Test': 'rgba(168, 85, 247, 0.16)',
    'Mock Test': 'rgba(249, 115, 22, 0.16)',
    'Previous Year': 'rgba(34, 197, 94, 0.16)',
  };
  return colors[type];
}

function getTypeTextColor(type: TestType): string {
  const colors: Record<TestType, string> = {
    DPP: Colors.info,
    'Chapter Test': Colors.purple,
    'Mock Test': Colors.brand,
    'Previous Year': Colors.success,
  };
  return colors[type];
}

function getScoreColor(score: number): string {
  if (score >= 60) return Colors.success;
  if (score >= 40) return Colors.warning;
  return Colors.danger;
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
    marginTop: 16,
  },
  testCard: {
    padding: 16,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    gap: 12,
  },
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  testTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: Colors.text,
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    letterSpacing: 0.3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  testFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  scorePill: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  scoreLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.textSecondary,
  },
  score: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 18,
  },
  notAttempted: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.textMuted,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.brand,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  startText: {
    fontFamily: 'Inter-Bold',
    fontSize: 13,
    color: '#1a0a00',
  },
  historySection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  historyTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 11,
    textTransform: 'uppercase',
    color: Colors.textSecondary,
    marginBottom: 12,
    letterSpacing: 1.2,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 7,
  },
  historyDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  historyName: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: Colors.text,
    flex: 1,
  },
  historyScore: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 13,
  },
});
