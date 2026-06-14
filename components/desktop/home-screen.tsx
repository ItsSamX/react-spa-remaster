"use client"

import { heroStats, upNext, leaderboard, subjectColors } from "@/lib/study-data"

export function DesktopHomeScreen() {
  return (
    <div className="bento-grid">

      {/* Hero card — span 8 x 3 rows */}
      <div className="widget widget-hero w-hero">
        <div className="hero-bg" />
        <div className="hero-visual" />
        <div className="hero-content">
          <span className="hero-badge">Lakshya Batch · JEE 2026</span>
          <div className="hero-title">Advanced Physics: Quantum Field Theory</div>
          <div className="hero-meta">
            Dr. Sharma · {heroStats.lectures} lectures · {heroStats.hours}h studied · {heroStats.completion}% watched
          </div>
        </div>
      </div>

      {/* Micro cards — 3 × span 4 x 1 row */}
      {[
        { abbr: "QM", title: "Quantum Mechanics I", meta: "Dr. Sharma · 60% done" },
        { abbr: "CAL", title: "Calculus: Integration", meta: "Prof. Kumar · 35% done" },
        { abbr: "ORG", title: "Organic Chemistry", meta: "Dr. Patel · 80% done" },
      ].map((item, i) => (
        <div key={i} className="widget widget-micro w-micro">
          <div className="micro-icon">{item.abbr}</div>
          <div className="micro-title">{item.title}</div>
          <div className="micro-meta">{item.meta}</div>
        </div>
      ))}

      {/* Stat cards — 4 × span 3 x 1 row */}
      <div className="widget widget-stat w-quarter">
        <div className="stat-icon-box" style={{ background: "rgba(249,115,22,0.12)", color: "var(--brand)" }}>ST</div>
        <div>
          <div className="stat-value" style={{ color: "var(--brand)" }}>34</div>
          <div className="stat-label">Day streak</div>
        </div>
      </div>
      <div className="widget widget-stat w-quarter">
        <div className="stat-icon-box" style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e" }}>CR</div>
        <div>
          <div className="stat-value" style={{ color: "#22c55e" }}>12</div>
          <div className="stat-label">Courses</div>
        </div>
      </div>
      <div className="widget widget-stat w-quarter">
        <div className="stat-icon-box" style={{ background: "rgba(59,130,246,0.12)", color: "#3b82f6" }}>TM</div>
        <div>
          <div className="stat-value" style={{ color: "#3b82f6" }}>{heroStats.hours}h</div>
          <div className="stat-label">Study time</div>
        </div>
      </div>
      <div className="widget widget-stat w-quarter">
        <div className="stat-icon-box" style={{ background: "rgba(234,179,8,0.12)", color: "#eab308" }}>RK</div>
        <div>
          <div className="stat-value" style={{ color: "#eab308" }}>#4</div>
          <div className="stat-label">Leaderboard</div>
        </div>
      </div>

      {/* Upcoming — span 4 x 2 rows */}
      <div className="widget w-medium">
        <div className="widget-header">
          <span className="widget-title">Upcoming</span>
          <span className="widget-action">View all</span>
        </div>
        <div className="schedule-list">
          {[
            { badge: "10", title: "Physics Lab", detail: "10:30 AM · Physics", color: "#3b82f6" },
            { badge: "12", title: "Math Tutorial", detail: "12:00 PM · Math", color: "#22c55e" },
            { badge: "14", title: "Chem Workshop", detail: "2:30 PM · Chemistry", color: "#a855f7" },
          ].map((item) => (
            <div key={item.badge} className="schedule-item">
              <div className="schedule-badge" style={{ color: item.color }}>{item.badge}</div>
              <div className="schedule-info">
                <div className="schedule-title">{item.title}</div>
                <div className="schedule-detail">{item.detail}</div>
              </div>
              <div className="schedule-dot" style={{ background: item.color }} />
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard — span 4 x 2 rows */}
      <div className="widget w-medium">
        <div className="widget-header">
          <span className="widget-title">Leaderboard</span>
          <span className="widget-action">View all</span>
        </div>
        <div className="lb-list">
          {leaderboard.map((row) => (
            <div key={row.rank} className={`lb-row ${row.you ? "you" : ""}`}>
              <div className="lb-rank" style={{ color: row.rank <= 3 ? "var(--brand)" : "var(--text-3)" }}>
                {row.rank}
              </div>
              <div className="lb-name" style={row.you ? { color: "#ffedd5" } : undefined}>
                {row.you ? "You" : row.name}
              </div>
              <div className="lb-score" style={row.you ? { color: "#ffedd5" } : undefined}>
                {row.score}
                {row.you && <span className="lb-delta" style={{ color: "#22c55e" }}>+15</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions — span 4 x 2 rows */}
      <div className="widget w-medium">
        <div className="widget-header">
          <span className="widget-title">Quick Actions</span>
        </div>
        <div className="qa-grid">
          {[
            { abbr: "TT", label: "Take a Test", sub: "3 pending", bg: "rgba(239,68,68,0.12)" },
            { abbr: "NT", label: "My Notes", sub: "24 notes", bg: "rgba(168,85,247,0.12)" },
            { abbr: "AN", label: "Analytics", sub: "View stats", bg: "rgba(59,130,246,0.12)" },
            { abbr: "ST", label: "Settings", sub: "Preferences", bg: "rgba(255,255,255,0.06)" },
          ].map((item) => (
            <div key={item.abbr} className="qa-item">
              <div className="qa-icon" style={{ background: item.bg }}>{item.abbr}</div>
              <div className="qa-label">{item.label}</div>
              <div className="qa-sublabel">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
