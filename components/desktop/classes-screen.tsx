"use client"

import { useState } from "react"
import { Play, Download, MoreHorizontal } from "lucide-react"
import { lectures, continueWatching, relatedLectures, subjectColors } from "@/lib/study-data"
import type { Lecture } from "@/lib/study-data"
import { Card, SectionHeader } from "@/components/ui-bits"
import { NewLectureCard, ContinueCard, SubjectPill } from "@/components/lecture-card"

const descriptions: Record<string, string> = {
  l1: "Master Newton's Laws with solved examples and real-world applications.",
  l2: "Build a strong foundation in integration with step-by-step techniques.",
  l3: "Understand reaction mechanisms and named reactions in organic chemistry.",
  l4: "Explore torque, angular momentum and moment of inertia in depth.",
  l5: "Learn galvanic cells, electrolysis and the Nernst equation clearly.",
}

export function DesktopClassesScreen() {
  const [hero, setHero] = useState<Lecture>(lectures[0])

  return (
    <div className="bento-grid">
      {/* Hero player - span 8 cols x 3 rows */}
      <Card elevated className="w-hero overflow-hidden p-0" delay={0}>
        <div
          className="relative mb-0 h-full w-full overflow-hidden rounded-t-2xl"
          style={{ background: "linear-gradient(135deg, #1a0a2e, #0a1628, #0d1f0d)", minHeight: "220px" }}
        >
          <div className="flex h-full items-center justify-center">
            <button
              onClick={() => window.alert("Opening PW lecture session...")}
              className="pressable flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur"
              aria-label="Play lecture"
            >
              <Play size={20} className="ml-0.5 fill-white text-white" />
            </button>
          </div>
          <span className="absolute bottom-3 left-3 rounded-lg bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
            {hero.duration}
          </span>
        </div>

        <div className="p-5">
          <div className="mb-3 flex flex-wrap gap-2">
            <SubjectPill subject={hero.subject} />
            <span className="inline-flex items-center rounded-md border border-[var(--border-brand)] px-2 py-0.5 text-[10px] font-semibold text-[var(--brand)]">
              Mechanics
            </span>
          </div>

          <h2 className="font-display text-[20px] font-bold leading-snug text-[var(--text)]">{hero.title} — Complete Chapter</h2>
          <div className="mt-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: subjectColors[hero.subject] }} />
            <span className="text-[13px] text-[var(--text-2)]">{hero.teacher}</span>
          </div>
          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[var(--text-2)]">{descriptions[hero.id]}</p>

          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => window.alert("Opening PW lecture session...")}
              className="pressable flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--brand)] py-3 text-[14px] font-semibold text-white"
            >
              <Play size={16} className="fill-white" /> Play
            </button>
            <button className="pressable flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-4 py-3 text-[14px] font-medium text-[var(--text)]">
              <Download size={16} /> Download
            </button>
            <button className="pressable flex h-[46px] w-[46px] items-center justify-center rounded-full border border-[var(--border-strong)] text-[var(--text-2)]">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>
      </Card>

      {/* New lectures horizontal scroll - span 4 cols x 2 rows */}
      <Card className="w-medium overflow-hidden p-4" delay={100}>
        <SectionHeader title="New Lectures" />
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {lectures.slice(0, 4).map((lec) => (
            <div
              key={lec.id}
              onClick={() => setHero(lec)}
              className="pressable w-24 shrink-0 cursor-pointer rounded-lg overflow-hidden bg-white/5 hover:bg-white/8 transition-colors"
            >
              <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-[24px]">
                {lec.id === hero.id ? "▶" : "📚"}
              </div>
              <p className="text-[10px] font-medium text-[var(--text)] p-2 line-clamp-2">{lec.title}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Continue watching - span 4 cols x 2 rows */}
      <Card className="w-medium overflow-hidden p-4" delay={200}>
        <SectionHeader title="Continue Watching" />
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {continueWatching.slice(0, 3).map((lec) => (
            <ContinueCard key={lec.id} lecture={lec} />
          ))}
        </div>
      </Card>

      {/* Lecture numbered list - span 4 cols x 3 rows */}
      <Card className="w-medium overflow-hidden p-4" delay={300}>
        <SectionHeader title="Lecture List" />
        <div className="flex flex-col gap-2">
          {lectures.map((lec, i) => (
            <div
              key={lec.id}
              onClick={() => setHero(lec)}
              className="pressable flex items-center gap-3 rounded-lg bg-white/3 p-2.5 hover:bg-white/5 cursor-pointer transition-colors"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[var(--brand)]/20 text-[11px] font-bold text-[var(--brand)]">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-medium text-[var(--text)]">{lec.title}</p>
                <p className="text-[9px] text-[var(--text-3)]">{lec.teacher}</p>
              </div>
              <span className="shrink-0 text-[10px] font-medium text-[var(--text-2)]">{lec.duration}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
