import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useResponsive } from '@/hooks/useResponsive';
import { TopNav } from '@/components/layout/TopNav';
import { FilterPills } from '@/components/shared/FilterPills';
import { NewLectureCard } from '@/components/cards/NewLectureCard';
import { lectures, subjectFilters, SubjectKey } from '@/lib/study-data';
import { Colors } from '@/constants/Colors';

export default function ClassesScreen() {
  const [filter, setFilter] = useState<SubjectKey>('All');
  const { isDesktop } = useResponsive();

  const filtered = filter === 'All'
    ? lectures
    : lectures.filter((l) => l.subject === filter);

  return (
    <View style={styles.root}>
      {isDesktop && <TopNav />}
      <ScrollView contentContainerStyle={[styles.content, isDesktop && styles.desktopContent]}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Classes</Text>
          <Text style={styles.pageCount}>{filtered.length} lectures</Text>
        </View>
        <FilterPills items={subjectFilters} active={filter} onChange={setFilter} />
        <View style={[styles.grid, isDesktop && styles.desktopGrid]}>
          {filtered.map((lecture) => (
            <NewLectureCard key={lecture.id} lecture={lecture} onPress={() => {}} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  content: {
    padding: 16,
    gap: 12,
    paddingBottom: 100,
  },
  desktopContent: {
    padding: 24,
    maxWidth: 1440,
    alignSelf: 'center',
    width: '100%',
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  pageTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 22,
    color: Colors.text,
  },
  pageCount: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: Colors.textSecondary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  desktopGrid: {
    gap: 16,
  },
});
