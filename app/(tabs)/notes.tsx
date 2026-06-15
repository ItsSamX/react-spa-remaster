import React from 'react';
import { ScreenScaffold } from '@/components/shared/ScreenScaffold';
import { seedNotes } from '@/lib/study-data';

export default function NotesScreen() {
  return <ScreenScaffold title="Notes" subtitle={`${seedNotes.length} notes`} />;
}
