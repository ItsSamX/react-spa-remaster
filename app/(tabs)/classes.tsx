import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useResponsive } from '@/hooks/useResponsive';
import { TopNav } from '@/components/layout/TopNav';
import { ScreenHeader } from '@/components/shared/ScreenHeader';
import { FilterPills } from '@/components/shared/FilterPills';
import { NewLectureCard } from '@/components/cards/NewLectureCard';
import { lectures, subjectFilters, SubjectKey } from '@/lib/study-data';
import { Colors } from '@/constants/Colors';

export default function ClassesScreen() {
  const [filter, setFilter] = useState<SubjectKey>('All');
  const { isDesktop } = useResponsive();

  const filtered = filter === 'All' ? lectures : lectures.filter((l) => l.subject === filter);

  return (
    <View style={styles.container}>
      {isDesktop && <TopNav />}
      <ScrollView contentContainerStyle={[styles.content, isDesktop && styles.desktopContent]}>
        <ScreenHeader
          eyebrow="Library"
          title="Classes"
          subtitle={`${filtered.length} lectures available across your subjects`}
        />
        <FilterPills items={subjectFilters} active={filter} onChange={setFilter} />
        <View style={styles.grid}>
          {filtered.map((lecture) => (
            <NewLectureCard key={lecture.id} lecture={lecture} onPress={() => {}} />
          ))}
        </View>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
});
