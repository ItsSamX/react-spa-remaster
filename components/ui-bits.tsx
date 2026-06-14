"use client"

import type { ReactNode } from "react"
import { dayLabels, studyHours, todayIndex, streakDays } from "@/lib/study-data"

export function SectionHeader({
  title,
  action,
  onAction,
}: {
  title: string
  action?: string
  onAction?: () => void
}) {
  return (
    <div className="flex items-center justify-between mb-3 px-1">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-2)]">{title}</h2>
      {action && (
        <button
          onClick={onAction}
          className="pressable text-[12px] font-medium text-[var(--brand)]"
        >
          {action}
        </button>
      )}
    </div>
  )
}

export function FilterPills<T extends string>({
  items,
  active,
  onChange,
}: {
  items: readonly T[]
  active: T
  onChange: (item: T) => void
}) {
  return (
    <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
      {items.map((item) => {
        const isActive = item === active
        return (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`pressable shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
              isActive
                ? "border border-[var(--border-brand)] bg-[var(--brand-dim)] text-[var(--brand)]"
                : "glass text-[var(--text-2)]"
            }`}
            style={isActive ? undefined : { borderRadius: 9999 }}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}

export function Card({
  children,
  className = "",
  elevated = false,
  delay = 0,
  onClick,
}: {
  children: ReactNode
  className?: string
  elevated?: boolean
  delay?: number
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`card-enter ${elevated ? "glass-elevated" : "glass"} ${onClick ? "pressable cursor-pointer" : ""} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export function StudyHoursChart() {
  return (
    <div className="flex h-[90px] items-end justify-between gap-2">
      {studyHours.map((h, i) => {
        const today = i === todayIndex
        return (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-[70px] w-full items-end rounded-md bg-white/5">
              <div
                className="w-full rounded-t-md transition-all"
                style={{
                  height: `${h}%`,
                  background: "var(--brand)",
                  opacity: today ? 1 : 0.55,
                }}
              />
            </div>
            <span className="text-[10px] font-medium text-[var(--text-2)]">{dayLabels[i]}</span>
          </div>
        )
      })}
    </div>
  )
}

export function StreakDots() {
  return (
    <div className="relative flex items-center justify-between">
      <div className="absolute left-1 right-1 top-1/2 h-px -translate-y-1/2 bg-white/8" />
      {streakDays.map((studied, i) => (
        <div
          key={i}
          className="relative h-2.5 w-2.5 rounded-full"
          style={{
            background: studied ? "var(--brand)" : "rgba(255,255,255,0.12)",
            boxShadow: studied ? "0 0 8px var(--brand-glow)" : "none",
          }}
        />
      ))}
    </div>
  )
}
