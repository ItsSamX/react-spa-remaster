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

export function DesktopHomeScreen() {
  const [filter, setFilter] = useState<SubjectKey>("All")
  const filteredUpNext = filter === "All" ? upNext : upNext.filter((u) => u.subject === filter)

  return (
    <div className="bento-grid">
      {/* Hero card - span 8 col x 3 rows */}
      <Card elevated className="w-hero overflow-hidden p-5" delay={0}>
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

      {/* Micro cards - 3 cards span 4 cols x 1 row each */}
      {[
        { title: "Lectures", value: "42", subtitle: "Available" },
        { title: "Tests", value: "18", subtitle: "This month" },
        { title: "Streak", value: "12d", subtitle: "Keep going!" },
      ].map((stat, i) => (
        <Card key={i} className="w-micro p-4" delay={i * 100}>
          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-2)]">{stat.title}</p>
            <p className="text-[28px] font-bold text-[var(--text)]">{stat.value}</p>
            <p className="text-[10px] text-[var(--text-3)]">{stat.subtitle}</p>
          </div>
        </Card>
      ))}

      {/* Stat cards - 4 cards span 3 cols x 1 row each */}
      {[
        { icon: "📊", label: "Completion", value: "78%" },
        { icon: "⏱️", label: "Avg Session", value: "45m" },
        { icon: "✅", label: "Tests Done", value: "24" },
        { icon: "🔥", label: "Current Streak", value: "12" },
      ].map((stat, i) => (
        <Card key={i} className="w-quarter p-4" delay={(i + 3) * 100}>
          <div className="flex flex-col gap-2">
            <span className="text-[24px]">{stat.icon}</span>
            <p className="text-[10px] font-semibold uppercase text-[var(--text-2)]">{stat.label}</p>
            <p className="text-[20px] font-bold text-[var(--text)]">{stat.value}</p>
          </div>
        </Card>
      ))}

      {/* Upcoming sessions - span 4 cols x 2 rows */}
      <Card className="w-medium overflow-hidden p-4" delay={700}>
        <SectionHeader title="Upcoming" />
        <div className="flex flex-col gap-2">
          {upNext.slice(0, 3).map((item, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg bg-white/3 p-2.5">
              <div className="h-2 w-1 shrink-0 rounded-full" style={{ background: subjectColors[item.subject] }} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-medium text-[var(--text)]">{item.title}</p>
                <p className="text-[10px] text-[var(--text-3)]">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Leaderboard - span 4 cols x 2 rows */}
      <Card className="w-medium overflow-hidden p-4" delay={800}>
        <SectionHeader title="Leaderboard" />
        <div className="flex flex-col gap-1">
          {leaderboard.slice(0, 3).map((row) => (
            <div key={row.rank} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${row.you ? "bg-[var(--brand-dim)]" : "hover:bg-white/3"}`}>
              <span className={`w-4 text-center text-[11px] font-bold ${row.you ? "text-[var(--brand)]" : "text-[var(--text-2)]"}`}>
                {row.rank}
              </span>
              <span className="flex-1 truncate text-[12px] font-medium text-[var(--text)]">{row.name}</span>
              <span className="text-[11px] font-semibold text-[var(--text)]">{row.score}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick actions - span 4 cols x 2 rows */}
      <Card className="w-medium p-4" delay={900}>
        <SectionHeader title="Quick Actions" />
        <div className="grid grid-cols-2 gap-2">
          {["Start Test", "Resume Video", "View Notes", "Practice"].map((action) => (
            <button key={action} className="pressable rounded-lg bg-white/5 hover:bg-white/8 border border-white/10 px-3 py-2 text-[11px] font-medium text-[var(--text)] transition-colors">
              {action}
            </button>
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
