"use client"

import { testHistory, performance } from "@/lib/study-data"

const availableTests = [
  {
    abbr: "PH",
    subject: "Physics",
    due: "Due Today",
    title: "Quantum Mechanics Mid-Term",
    detail: "50 questions · 90 minutes · Difficulty: Hard",
    subjectColor: "#3b82f6",
    dueColor: "#ef4444",
    iconBg: "rgba(59,130,246,0.12)",
  },
  {
    abbr: "MA",
    subject: "Math",
    due: "Due Tomorrow",
    title: "Integration Techniques Quiz",
    detail: "25 questions · 45 minutes · Difficulty: Medium",
    subjectColor: "#22c55e",
    dueColor: "#eab308",
    iconBg: "rgba(34,197,94,0.12)",
  },
  {
    abbr: "CH",
    subject: "Chemistry",
    due: "Due in 3 days",
    title: "Organic Chemistry Final",
    detail: "75 questions · 120 minutes · Difficulty: Hard",
    subjectColor: "#a855f7",
    dueColor: "#22c55e",
    iconBg: "rgba(168,85,247,0.12)",
  },
]

export function DesktopTestsScreen() {
  return (
    <div className="bento-grid">

      {/* Available Tests — span 8 x 3 rows (hero) */}
      <div className="widget w-hero">
        <div className="widget-header">
          <span className="widget-title">Available Tests</span>
          <span className="widget-action">3 pending</span>
        </div>
        {availableTests.map((t) => (
          <div key={t.abbr} className="test-item">
            <div className="test-icon" style={{ background: t.iconBg }}>{t.abbr}</div>
            <div className="test-info">
              <div style={{ display: "flex", gap: "5px", marginBottom: "3px" }}>
                <span className="test-tag" style={{ color: t.subjectColor, borderColor: `${t.subjectColor}4d` }}>
                  {t.subject}
                </span>
                <span className="test-tag" style={{ color: t.dueColor, borderColor: `${t.dueColor}4d` }}>
                  {t.due}
                </span>
              </div>
              <div className="test-title">{t.title}</div>
              <div className="test-detail">{t.detail}</div>
            </div>
            <button className="test-btn">Start</button>
          </div>
        ))}
      </div>

      {/* Test History — span 4 x 2 rows */}
      <div className="widget w-medium">
        <div className="widget-header">
          <span className="widget-title">Test History</span>
        </div>
        <div className="lb-list">
          {testHistory.map((row) => (
            <div key={row.id} className="lb-row">
              <div className="lb-rank" style={{ color: row.passed ? "#22c55e" : "#ef4444" }}>
                {row.passed ? "OK" : "XX"}
              </div>
              <div className="lb-name">{row.name}</div>
              <div className="lb-score" style={{ color: row.passed ? "#22c55e" : "#ef4444" }}>
                {row.score}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance — span 4 x 2 rows */}
      <div className="widget w-medium">
        <div className="widget-header">
          <span className="widget-title">Performance</span>
        </div>
        <div className="widget-stat" style={{ padding: "10px 0" }}>
          <div className="stat-icon-box" style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e" }}>AV</div>
          <div>
            <div className="stat-value" style={{ color: "#22c55e" }}>{performance.avgScore}%</div>
            <div className="stat-label">Average Score</div>
          </div>
        </div>
        <div className="widget-stat" style={{ padding: "10px 0" }}>
          <div className="stat-icon-box" style={{ background: "rgba(59,130,246,0.12)", color: "#3b82f6" }}>AT</div>
          <div>
            <div className="stat-value" style={{ color: "#3b82f6" }}>{performance.avgTime}</div>
            <div className="stat-label">Avg. Time</div>
          </div>
        </div>
        <div className="widget-stat" style={{ padding: "10px 0" }}>
          <div className="stat-icon-box" style={{ background: "rgba(249,115,22,0.12)", color: "var(--brand)" }}>TK</div>
          <div>
            <div className="stat-value" style={{ color: "var(--brand)" }}>{performance.testsTaken}</div>
            <div className="stat-label">Tests Taken</div>
          </div>
        </div>
      </div>

    </div>
  )
}
