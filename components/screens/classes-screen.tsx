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

export function ClassesScreen() {
  const [hero, setHero] = useState<Lecture>(lectures[0])

  return (
    <div className="flex flex-col gap-6 px-5 pb-24 pt-4">
      {/* Hero player */}
      <Card elevated className="overflow-hidden p-4" delay={0}>
        <div
          className="relative mb-4 h-[200px] w-full overflow-hidden rounded-2xl"
          style={{ background: "linear-gradient(135deg, #1a0a2e, #0a1628, #0d1f0d)" }}
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
      </Card>

      {/* New lectures */}
      <section>
        <SectionHeader title="New Lectures" action="See all" />
        <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
          {lectures.map((lec) => (
            <NewLectureCard key={lec.id} lecture={lec} onClick={() => setHero(lec)} />
          ))}
        </div>
      </section>

      {/* Continue watching */}
      <section>
        <SectionHeader title="Continue Watching" />
        <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
          {continueWatching.map((lec) => (
            <ContinueCard key={lec.id} lecture={lec} />
          ))}
        </div>
      </section>

      {/* Related lectures */}
      <section>
        <SectionHeader title="Related Lectures" />
        <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
          {relatedLectures.map((lec) => (
            <NewLectureCard key={lec.id} lecture={lec} onClick={() => setHero(lec)} />
          ))}
        </div>
      </section>
    </div>
  )
}
