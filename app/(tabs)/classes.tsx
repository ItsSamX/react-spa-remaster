import React from 'react';
import { ScreenScaffold } from '@/components/shared/ScreenScaffold';
import { lectures } from '@/lib/study-data';

export default function ClassesScreen() {
  return (
    <ScreenScaffold title="Classes" subtitle={`${lectures.length} lectures available`} />
  );
}
