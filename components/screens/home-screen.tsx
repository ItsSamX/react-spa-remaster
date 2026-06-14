"use client"

import { useState } from "react"
import { Tv, Clock, ClipboardList } from "lucide-react"
import {
  heroStats,
  subjectFilters,
  upNext,
  continueWatching,
  leaderboard,
  subjectColors,
  type SubjectKey,
} from "@/lib/study-data"
import { Card, FilterPills, SectionHeader, StudyHoursChart, StreakDots } from "@/components/ui-bits"
import { ContinueCard } from "@/components/lecture-card"

export function HomeScreen() {
  const [filter, setFilter] = useState<SubjectKey>("All")

  const filteredUpNext = filter === "All" ? upNext : upNext.filter((u) => u.subject === filter)

  return (
    <div className="flex flex-col gap-6 px-5 pb-24 pt-4">
      {/* Greeting */}
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--text-3)]">Good Morning</p>
        <h1 className="font-display text-[28px] font-extrabold leading-tight text-[var(--text)]">JEE Aspirant</h1>
      </div>

      {/* Hero batch card */}
      <Card elevated className="overflow-hidden p-5" delay={0}>
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full border border-[var(--border-brand)] bg-[var(--brand-dim)] px-3 py-1 text-[11px] font-semibold text-[var(--brand)]">
            Lakshya Batch
          </span>
          <span className="text-[11px] font-medium text-[var(--text-2)]">JEE 2026</span>
        </div>
        <div className="flex items-end gap-1">
          <span className="font-display text-[56px] font-black leading-none text-[var(--text)]">{heroStats.completion}%</span>
          <span className="mb-2 text-[18px] font-medium text-[var(--text-3)]">/100</span>
        </div>
        <p className="mb-3 text-[12px] text-[var(--text-2)]">Chapter completion</p>
        <div className="mb-5 h-1 w-full overflow-hidden rounded-full bg-white/8">
          <div className="h-full rounded-full bg-[var(--brand)]" style={{ width: `${heroStats.completion}%` }} />
        </div>
        <div className="flex items-center justify-between">
          <MiniStat icon={<Tv size={16} className="text-[var(--info)]" />} value={heroStats.lectures} label="Lectures" />
          <MiniStat icon={<Clock size={16} className="text-[var(--success)]" />} value={`${heroStats.hours}h`} label="Studied" />
          <MiniStat icon={<ClipboardList size={16} className="text-[var(--brand)]" />} value={heroStats.tests} label="Tests" />
        </div>
      </Card>

      {/* Subject filter */}
      <FilterPills items={subjectFilters} active={filter} onChange={setFilter} />

      {/* Up next */}
      <section>
        <SectionHeader title="Up Next" action="See all" />
        <div className="flex flex-col gap-2">
          {filteredUpNext.length === 0 ? (
            <EmptyRow text="No sessions for this subject" />
          ) : (
            filteredUpNext.map((item, i) => (
              <Card key={item.id} delay={i * 60} className="flex items-center gap-3 p-3.5 pl-3">
                <div className="h-9 w-[3px] shrink-0 rounded-full" style={{ background: subjectColors[item.subject] }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold text-[var(--text)]">{item.title}</p>
                  <p className="text-[12px] text-[var(--text-2)]">{item.teacher}</p>
                </div>
                <span className="shrink-0 text-[12px] font-semibold text-[var(--brand)]">{item.time}</span>
              </Card>
            ))
          )}
        </div>
      </section>

      {/* Continue watching */}
      <section>
        <SectionHeader title="Continue Watching" action="See all" />
        <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
          {continueWatching.map((lec) => (
            <ContinueCard key={lec.id} lecture={lec} />
          ))}
        </div>
      </section>

      {/* Study hours chart */}
      <Card className="p-4">
        <SectionHeader title="Study Hours" />
        <StudyHoursChart />
        <div className="mt-4 border-t border-[var(--border)] pt-3">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-2)]">7-Day Streak</p>
          <StreakDots />
        </div>
      </Card>

      {/* Leaderboard */}
      <Card className="p-4">
        <SectionHeader title="Batch Leaderboard" action="See all" />
        <div className="flex flex-col gap-1">
          {leaderboard.map((row) => (
            <div
              key={row.rank}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${
                row.you ? "border border-[var(--border-brand)] bg-[var(--brand-dim)]" : ""
              }`}
            >
              <span
                className={`w-5 text-center text-[13px] font-bold ${
                  row.rank <= 3 || row.you ? "text-[var(--brand)]" : "text-[var(--text-2)]"
                }`}
              >
                {row.rank}
              </span>
              <span className="flex-1 text-[14px] font-medium text-[var(--text)]">{row.name}</span>
              <span className="text-[13px] font-semibold text-[var(--text)]">{row.score.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function MiniStat({ icon, value, label }: { icon: React.ReactNode; value: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-[15px] font-bold text-[var(--text)]">{value}</span>
      </div>
      <span className="text-[10px] text-[var(--text-2)]">{label}</span>
    </div>
  )
}

function EmptyRow({ text }: { text: string }) {
  return <p className="rounded-xl border border-dashed border-[var(--border)] py-6 text-center text-[12px] text-[var(--text-2)]">{text}</p>
}
