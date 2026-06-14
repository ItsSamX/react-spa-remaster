"use client"

import { Play } from "lucide-react"
import type { Lecture } from "@/lib/study-data"
import { subjectColors, subjectGradients } from "@/lib/study-data"

export function SubjectPill({ subject }: { subject: Lecture["subject"] }) {
  const color = subjectColors[subject]
  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold"
      style={{ color, background: `${color}1f`, border: `1px solid ${color}33` }}
    >
      {subject}
    </span>
  )
}

export function ContinueCard({ lecture, onClick }: { lecture: Lecture; onClick?: () => void }) {
  return (
    <div onClick={onClick} className="card-enter pressable w-40 shrink-0 cursor-pointer">
      <div
        className="relative h-[90px] w-full overflow-hidden rounded-2xl border border-[var(--border)]"
        style={{ background: subjectGradients[lecture.subject] ?? subjectGradients.Physics }}
      >
        <div className="flex h-full items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur">
            <Play size={14} className="ml-0.5 fill-white text-white" />
          </div>
        </div>
        {typeof lecture.progress === "number" && (
          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-black/40">
            <div className="h-full bg-[var(--brand)]" style={{ width: `${lecture.progress}%` }} />
          </div>
        )}
      </div>
      <div className="mt-2 flex flex-col gap-1">
        <SubjectPill subject={lecture.subject} />
        <p className="text-[13px] font-semibold leading-tight text-[var(--text)]">{lecture.title}</p>
        {typeof lecture.progress === "number" ? (
          <span className="text-[11px] font-medium text-[var(--brand)]">{lecture.progress}% watched</span>
        ) : (
          <span className="text-[11px] text-[var(--text-2)]">{lecture.duration}</span>
        )}
      </div>
    </div>
  )
}

export function NewLectureCard({ lecture, onClick }: { lecture: Lecture; onClick?: () => void }) {
  return (
    <div onClick={onClick} className="card-enter pressable w-[170px] shrink-0 cursor-pointer">
      <div
        className="relative h-[96px] w-full overflow-hidden rounded-2xl border border-[var(--border)]"
        style={{ background: subjectGradients[lecture.subject] ?? subjectGradients.Physics }}
      >
        <div className="flex h-full items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur">
            <Play size={14} className="ml-0.5 fill-white text-white" />
          </div>
        </div>
        <span className="absolute bottom-2 left-2 rounded-md bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
          {lecture.duration}
        </span>
      </div>
      <div className="mt-2 flex flex-col gap-1">
        <SubjectPill subject={lecture.subject} />
        <p className="text-[13px] font-semibold leading-tight text-[var(--text)]">{lecture.title}</p>
        <span className="text-[11px] text-[var(--text-2)]">{lecture.teacher}</span>
      </div>
    </div>
  )
}
