import React from 'react';
import { ScreenScaffold } from '@/components/shared/ScreenScaffold';
import { tests } from '@/lib/study-data';

export default function TestsScreen() {
  return <ScreenScaffold title="Tests" subtitle={`${tests.length} tests`} />;
}
