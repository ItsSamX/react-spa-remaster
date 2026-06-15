import React from 'react';
import { ScreenScaffold } from '@/components/shared/ScreenScaffold';
import { performance } from '@/lib/study-data';

export default function DashboardScreen() {
  return (
    <ScreenScaffold
      title="Dashboard"
      subtitle={`Avg score ${performance.avgScore}% · ${performance.testsTaken} tests taken`}
    />
  );
}
