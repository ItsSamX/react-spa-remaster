import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FileText, Calendar } from 'lucide-react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FilterPills } from '@/components/shared/FilterPills';
import { SubjectPill } from '@/components/shared/SubjectPill';
import { seedNotes, subjectFilters, SubjectKey } from '@/lib/study-data';
import { SubjectColors, Colors } from '@/constants/Colors';

export function NotesPanel() {
  const [filter, setFilter] = useState<SubjectKey>('All');

  const filtered = filter === 'All' ? seedNotes : seedNotes.filter((n) => n.subject === filter);

  return (
    <WidgetShell accent={Colors.purple}>
      <SectionHeader title="My Notes" accent={Colors.purple} actionLabel="New note" />
      <FilterPills items={subjectFilters} active={filter} onChange={setFilter} />
      <View style={styles.list}>
        {filtered.map((note) => {
          const color = SubjectColors[note.subject];
          return (
            <TouchableOpacity key={note.id} activeOpacity={0.85} style={styles.noteCard}>
              <View style={[styles.iconWrap, { backgroundColor: color + '22', borderColor: color + '40' }]}>
                <FileText size={18} color={color} strokeWidth={2.2} />
              </View>
              <View style={styles.body}>
                <View style={styles.noteHeader}>
                  <Text style={styles.noteTitle} numberOfLines={1}>{note.title}</Text>
                  <SubjectPill subject={note.subject} />
                </View>
                <Text style={styles.preview} numberOfLines={2}>{note.preview}</Text>
                <View style={styles.dateRow}>
                  <Calendar size={12} color={Colors.textMuted} />
                  <Text style={styles.date}>{note.date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </WidgetShell>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
    marginTop: 16,
  },
  noteCard: {
    flexDirection: 'row',
    gap: 14,
    padding: 16,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    gap: 7,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  noteTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: Colors.text,
    flex: 1,
  },
  preview: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  date: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    color: Colors.textMuted,
  },
});
