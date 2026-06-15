import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FilterPills } from '@/components/shared/FilterPills';
import { SubjectPill } from '@/components/shared/SubjectPill';
import { seedNotes, subjectFilters, SubjectKey } from '@/lib/study-data';
import { Colors } from '@/constants/Colors';

export function NotesPanel() {
  const [filter, setFilter] = useState<SubjectKey>('All');

  const filtered = filter === 'All'
    ? seedNotes
    : seedNotes.filter((n) => n.subject === filter);

  return (
    <WidgetShell>
      <SectionHeader title="Notes" />
      <FilterPills items={subjectFilters} active={filter} onChange={setFilter} />
      <View style={styles.list}>
        {filtered.map((note) => (
          <View key={note.id} style={styles.noteCard}>
            <View style={styles.noteHeader}>
              <Text style={styles.noteTitle} numberOfLines={1}>{note.title}</Text>
              <SubjectPill subject={note.subject} />
            </View>
            <Text style={styles.preview} numberOfLines={2}>{note.preview}</Text>
            <Text style={styles.date}>{note.date}</Text>
          </View>
        ))}
      </View>
    </WidgetShell>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 8,
    marginTop: 12,
  },
  noteCard: {
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 12,
    gap: 6,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  noteTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  preview: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  date: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    color: Colors.textMuted,
  },
});
