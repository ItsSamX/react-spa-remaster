"use client"

import { studyHours, dayLabels, todayIndex } from "@/lib/study-data"

const courses = [
  { abbr: "QM", title: "Quantum Mechanics I", detail: "Dr. Sharma · 24 lectures · 60% complete", color: "#3b82f6" },
  { abbr: "CA", title: "Calculus: Integration", detail: "Prof. Kumar · 18 lectures · 35% complete", color: "#22c55e" },
  { abbr: "OC", title: "Organic Chemistry", detail: "Dr. Patel · 32 lectures · 80% complete", color: "#a855f7" },
  { abbr: "LA", title: "Linear Algebra", detail: "Prof. Singh · 20 lectures · 15% complete", color: "#eab308" },
]

const progressItems = [
  { name: "Quantum Mechanics", pct: 60, color: "#3b82f6", done: 14, total: 24, left: "8h 30m" },
  { name: "Calculus", pct: 35, color: "#22c55e", done: 6, total: 18, left: "12h 15m" },
  { name: "Organic Chemistry", pct: 80, color: "#a855f7", done: 26, total: 32, left: "4h 20m" },
]

export function DesktopClassesScreen() {
  return (
    <div className="bento-grid">

      {/* All Courses — span 12 x 1 row (full width) */}
      <div className="widget w-full">
        <div className="widget-header">
          <span className="widget-title">All Courses</span>
          <span className="widget-action">Filter</span>
        </div>
        <div className="schedule-list">
          {courses.map((c) => (
            <div key={c.abbr} className="schedule-item">
              <div className="schedule-badge" style={{ color: c.color }}>{c.abbr}</div>
              <div className="schedule-info">
                <div className="schedule-title">{c.title}</div>
                <div className="schedule-detail">{c.detail}</div>
              </div>
              <div className="schedule-dot" style={{ background: c.color }} />
            </div>
          ))}
        </div>
      </div>

      {/* Progress Overview — span 6 x 1 row */}
      <div className="widget w-half">
        <div className="widget-header">
          <span className="widget-title">Progress Overview</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {progressItems.map((p, i) => (
            <div key={i}>
              <div className="progress-header">
                <span className="progress-name">{p.name}</span>
                <span className="progress-pct" style={{ color: p.color }}>{p.pct}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${p.pct}%`, background: p.color }} />
              </div>
              <div className="progress-meta">
                <span>{p.done}/{p.total} lectures</span>
                <span>{p.left} left</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Study Streak — span 6 x 1 row */}
      <div className="widget w-half">
        <div className="widget-header">
          <span className="widget-title">Study Streak</span>
        </div>
        <div className="chart-bars">
          {studyHours.map((h, i) => (
            <div key={i} className="chart-bar-group">
              <div
                className={`chart-bar ${i <= todayIndex ? "bar-active" : "bar-inactive"}`}
                style={{ height: `${h}%` }}
              />
              <div className="chart-label">{dayLabels[i]}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
