"use client"

import { useState } from "react"
import { Check, X, Target, Timer, FileCheck2 } from "lucide-react"
import { tests, testFilters, testHistory, performance, subjectColors, type TestType } from "@/lib/study-data"
import { Card, FilterPills, SectionHeader } from "@/components/ui-bits"

export function DesktopTestsScreen() {
  const [filter, setFilter] = useState<"All" | TestType>("All")

  const filtered = filter === "All" ? tests : tests.filter((t) => t.type === filter)

  return (
    <div className="bento-grid">
      {/* Filter pills - span 12 cols x 1 row */}
      <div className="w-full">
        <FilterPills items={testFilters} active={filter} onChange={setFilter} />
      </div>

      {/* Test list - span 8 cols x 2 rows */}
      <Card className="w-wide overflow-hidden p-4" delay={0}>
        <SectionHeader title="Available Tests" />
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((test, i) => (
            <Card key={test.id} delay={i * 50} className="flex flex-col overflow-hidden p-0">
              <div className="h-1 w-full" style={{ background: subjectColors[test.subject] }} />
              <div className="flex flex-1 flex-col gap-2 p-3.5">
                <span
                  className="w-fit rounded-md px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide"
                  style={{
                    color: subjectColors[test.subject],
                    background: `${subjectColors[test.subject]}1f`,
                  }}
                >
                  {test.type}
                </span>
                <p className="text-[14px] font-semibold leading-snug text-[var(--text)]">{test.title}</p>
                <p className="text-[11px] text-[var(--text-2)]">
                  {test.questions} Qs &middot; {test.duration}
                </p>
                <div className="mt-auto pt-2">
                  {test.score === null ? (
                    <button className="pressable w-full rounded-full bg-[var(--brand)] py-2 text-[12px] font-semibold text-white">
                      Start
                    </button>
                  ) : (
                    <span className="flex w-full items-center justify-center gap-1 rounded-full border border-[var(--success)]/30 bg-[var(--success)]/12 py-2 text-[12px] font-semibold text-[var(--success)]">
                      <Check size={13} /> {test.score}%
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Performance stats sidebar - span 4 cols x 2 rows */}
      <Card className="w-medium p-4" delay={100}>
        <SectionHeader title="Your Stats" />
        <div className="flex flex-col gap-4">
          <PerfStat icon={<Target size={18} />} value={`${performance.avgScore}%`} label="Avg Score" color="var(--success)" />
          <PerfStat icon={<Timer size={18} />} value={performance.avgTime} label="Avg Time" color="var(--info)" />
          <PerfStat icon={<FileCheck2 size={18} />} value={performance.testsTaken} label="Tests Taken" color="var(--brand)" />
        </div>
      </Card>

      {/* Test history - span 6 cols x 2 rows */}
      <Card className="w-half p-4" delay={200}>
        <SectionHeader title="Test History" />
        <div className="flex flex-col gap-1.5">
          {testHistory.slice(0, 5).map((row) => (
            <div key={row.id} className="flex items-center gap-3 rounded-xl px-1 py-2">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{
                  background: row.passed ? "rgba(34,197,94,0.14)" : "rgba(239,68,68,0.14)",
                  color: row.passed ? "var(--success)" : "#ef4444",
                }}
              >
                {row.passed ? <Check size={14} /> : <X size={14} />}
              </span>
              <span className="flex-1 truncate text-[13px] font-medium text-[var(--text)]">{row.name}</span>
              <span
                className="text-[13px] font-semibold"
                style={{ color: row.passed ? "var(--success)" : "#ef4444" }}
              >
                {row.score}%
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance chart - span 6 cols x 2 rows */}
      <Card className="w-half p-4" delay={300}>
        <SectionHeader title="Score Trend" />
        <div className="flex items-flex-end justify-between gap-2 h-24 mt-4">
          {[65, 72, 68, 75, 80, 78].map((score, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-16 w-full items-end rounded-md bg-white/5">
                <div
                  className="w-full rounded-t-md transition-all"
                  style={{
                    height: `${score}%`,
                    background: "var(--brand)",
                  }}
                />
              </div>
              <span className="text-[9px] font-medium text-[var(--text-2)]">W{i + 1}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function PerfStat({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) {
  return (
    <div className="flex flex-col gap-2 p-3 bg-white/3 rounded-lg">
      <div className="flex items-center gap-2" style={{ color }}>
        {icon}
        <span className="text-[10px] font-medium uppercase">{label}</span>
      </div>
      <p className="text-[24px] font-bold text-[var(--text)]">{value}</p>
    </div>
  )
}
