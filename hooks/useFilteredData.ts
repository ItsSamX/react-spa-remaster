import { useMemo, useState } from 'react';
import type { SubjectKey } from '@/lib/study-data';

/**
 * Generic subject-filter hook. Items carrying subject "All" always pass
 * through (e.g. full mock tests), matching the web app's behavior.
 */
export function useSubjectFilter<T extends { subject: SubjectKey }>(
  items: readonly T[],
  initial: SubjectKey = 'All',
) {
  const [active, setActive] = useState<SubjectKey>(initial);

  const filtered = useMemo(() => {
    if (active === 'All') return [...items];
    return items.filter((item) => item.subject === active || item.subject === 'All');
  }, [items, active]);

  return { active, setActive, filtered };
}

/**
 * Generic single-key filter hook for arbitrary string union types
 * (e.g. test types: "All" | "DPP" | ...).
 */
export function useKeyFilter<T extends Record<string, unknown>, K extends keyof T>(
  items: readonly T[],
  key: K,
  allValue: string = 'All',
) {
  const [active, setActive] = useState<string>(allValue);

  const filtered = useMemo(() => {
    if (active === allValue) return [...items];
    return items.filter((item) => String(item[key]) === active);
  }, [items, key, active, allValue]);

  return { active, setActive, filtered };
}
