"use client"

import { studyHours, dayLabels, todayIndex } from "@/lib/study-data"

const subjectScores = [
  { name: "Physics", score: 9.2, pct: 92, color: "#3b82f6" },
  { name: "Mathematics", score: 8.8, pct: 88, color: "#22c55e" },
  { name: "Chemistry", score: 8.5, pct: 85, color: "#a855f7" },
  { name: "English", score: 8.0, pct: 80, color: "#eab308" },
]

const achievements = [
  { abbr: "ST", label: "30 Day Streak", sub: "Consistent learner", bg: "rgba(249,115,22,0.12)" },
  { abbr: "PS", label: "Perfect Score", sub: "100% on Physics", bg: "rgba(34,197,94,0.12)" },
  { abbr: "SD", label: "Speed Demon", sub: "Fast completion", bg: "rgba(59,130,246,0.12)" },
  { abbr: "T5", label: "Top 5", sub: "Leaderboard rank", bg: "rgba(168,85,247,0.12)" },
]

const goals = [
  { name: "Complete Physics", pct: 60, val: "60%", color: "#3b82f6" },
  { name: "10 Tests This Month", pct: 70, val: "7/10", color: "var(--brand)" },
  { name: "50 Hours Study", pct: 76, val: "38h", color: "#22c55e" },
]

export function DesktopDashboardScreen() {
  return (
    <div className="bento-grid">

      {/* GPA Overview — span 6 */}
      <div className="widget w-half">
        <div className="widget-header">
          <span className="widget-title">GPA Overview</span>
        </div>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div className="gpa-big">8.7<span className="gpa-slash">/10</span></div>
          <div className="gpa-track">
            <div className="gpa-fill" style={{ width: "87%" }} />
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-3)" }}>Semester 4 · 2nd Year</div>
        </div>
      </div>

      {/* Subject Breakdown — span 6 */}
      <div className="widget w-half">
        <div className="widget-header">
          <span className="widget-title">Subject Breakdown</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "6px" }}>
          {subjectScores.map((s) => (
            <div key={s.name}>
              <div className="progress-header">
                <span className="progress-name">{s.name}</span>
                <span className="progress-pct" style={{ color: s.color }}>{s.score}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${s.pct}%`, background: s.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Study Hours — span 12 (full width) */}
      <div className="widget w-full">
        <div className="widget-header">
          <span className="widget-title">Weekly Study Hours</span>
        </div>
        <div className="chart-bars" style={{ height: "100px", marginTop: "12px" }}>
          {studyHours.map((h, i) => (
            <div key={i} className="chart-bar-group">
              <div
                className={`chart-bar ${i <= todayIndex ? "bar-active" : "bar-inactive"}`}
                style={{ height: `${h}%` }}
              />
              <div className="chart-label">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements — span 4 x 2 rows */}
      <div className="widget w-medium">
        <div className="widget-header">
          <span className="widget-title">Achievements</span>
        </div>
        <div className="qa-grid">
          {achievements.map((a) => (
            <div key={a.abbr} className="qa-item">
              <div className="qa-icon" style={{ background: a.bg }}>{a.abbr}</div>
              <div className="qa-label">{a.label}</div>
              <div className="qa-sublabel">{a.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals — span 4 x 2 rows */}
      <div className="widget w-medium">
        <div className="widget-header">
          <span className="widget-title">Goals</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "6px" }}>
          {goals.map((g) => (
            <div key={g.name}>
              <div className="progress-header">
                <span className="progress-name">{g.name}</span>
                <span className="progress-pct" style={{ color: g.color }}>{g.val}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${g.pct}%`, background: g.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty span 4 filler — keeps grid balanced */}
      <div className="widget w-medium" style={{ opacity: 0.4 }}>
        <div className="widget-header">
          <span className="widget-title">Coming Soon</span>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-3)", fontSize: "12px" }}>
          More analytics on the way
        </div>
      </div>

    </div>
  )
}
