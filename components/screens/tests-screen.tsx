"use client"

import { useState } from "react"
import { Check, X, Target, Timer, FileCheck2 } from "lucide-react"
import { tests, testFilters, testHistory, performance, subjectColors, type TestType } from "@/lib/study-data"
import { Card, FilterPills, SectionHeader } from "@/components/ui-bits"

export function TestsScreen() {
  const [filter, setFilter] = useState<"All" | TestType>("All")

  const filtered = filter === "All" ? tests : tests.filter((t) => t.type === filter)

  return (
    <div className="flex flex-col gap-6 px-5 pb-24 pt-4">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--text-3)]">Practice & Assess</p>
        <h1 className="font-display text-[28px] font-extrabold leading-tight text-[var(--text)]">Tests</h1>
      </div>

      <FilterPills items={testFilters} active={filter} onChange={setFilter} />

      {/* Test grid */}
      {filtered.length === 0 ? (
        <Card className="flex flex-col items-center gap-2 py-10">
          <FileCheck2 size={32} className="text-[var(--text-3)]" />
          <p className="text-[13px] text-[var(--text-2)]">No tests in this category</p>
        </Card>
      ) : (
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
      )}

      {/* Test history */}
      <Card className="p-4">
        <SectionHeader title="Test History" />
        <div className="flex flex-col gap-1.5">
          {testHistory.map((row) => (
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

      {/* Performance stats */}
      <div className="grid grid-cols-3 gap-3">
        <PerfStat icon={<Target size={18} />} value={`${performance.avgScore}%`} label="Avg Score" color="var(--success)" />
        <PerfStat icon={<Timer size={18} />} value={performance.avgTime} label="Avg Time" color="var(--info)" />
        <PerfStat icon={<FileCheck2 size={18} />} value={performance.testsTaken} label="Tests Taken" color="var(--brand)" />
      </div>
    </div>
  )
}

function PerfStat({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode
  value: React.ReactNode
  label: string
  color: string
}) {
  return (
    <Card className="flex flex-col items-center gap-1.5 p-4">
      <span style={{ color }}>{icon}</span>
      <span className="text-[20px] font-bold leading-none" style={{ color }}>
        {value}
      </span>
      <span className="text-center text-[10px] text-[var(--text-2)]">{label}</span>
    </Card>
  )
}
