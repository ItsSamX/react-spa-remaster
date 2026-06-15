import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FileText, Calendar } from 'lucide-react-native';
import { WidgetShell } from '@/components/shared/WidgetShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FilterPills } from '@/components/shared/FilterPills';
import { SubjectPill } from '@/components/shared/SubjectPill';
import { seedNotes, subjectFilters, SubjectKey, studyMaterial } from '@/lib/study-data';
import { SubjectColors, Colors } from '@/constants/Colors';

export function NotesPanel() {
  const [filter, setFilter] = useState<SubjectKey>('All');

  const filtered = filter === 'All'
    ? seedNotes
    : seedNotes.filter((n) => n.subject === filter);

  return (
    <WidgetShell>
      <SectionHeader title="Notes" />

      {/* Study material PDF summary */}
      <View style={styles.matRow}>
        {studyMaterial.map((m) => {
          const color = SubjectColors[m.subject];
          return (
            <View key={m.id} style={[styles.matCard, { borderColor: color + '30' }]}>
              <FileText size={13} color={color} />
              <Text style={[styles.matCount, { color }]}>{m.pdfs}</Text>
              <Text style={styles.matLabel}>{m.subject} PDFs</Text>
            </View>
          );
        })}
      </View>

      <FilterPills items={subjectFilters} active={filter} onChange={setFilter} />

      <View style={styles.list}>
        {filtered.map((note) => {
          const color = SubjectColors[note.subject];
          return (
            <TouchableOpacity
              key={note.id}
              activeOpacity={0.8}
              style={[styles.noteCard, { borderLeftColor: color, borderLeftWidth: 3 }]}
            >
              <View style={styles.noteTop}>
                <Text style={styles.noteTitle} numberOfLines={1}>{note.title}</Text>
                <SubjectPill subject={note.subject} />
              </View>
              <Text style={styles.preview} numberOfLines={2}>{note.preview}</Text>
              <View style={styles.dateRow}>
                <Calendar size={10} color={Colors.textMuted} />
                <Text style={styles.date}>{note.date}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </WidgetShell>
  );
}

const styles = StyleSheet.create({
  matRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  matCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  matCount: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 14,
  },
  matLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: Colors.textSecondary,
  },
  list: {
    gap: 6,
  },
  noteCard: {
    padding: 12,
    paddingLeft: 14,
    backgroundColor: 'rgba(255,255,255,0.025)',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    gap: 6,
    overflow: 'hidden',
  },
  noteTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  noteTitle: {
    flex: 1,
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: Colors.text,
  },
  preview: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  date: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: Colors.textMuted,
  },
});
