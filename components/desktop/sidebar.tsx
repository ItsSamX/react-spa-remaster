"use client"

import { useEffect, useState } from "react"

type Page = "home" | "classes" | "tests" | "notes"

const pages: { key: Page; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "classes", label: "Classes" },
  { key: "tests", label: "Tests" },
  { key: "notes", label: "Notes" },
]

export function Sidebar({
  currentPage,
  onPageChange,
}: {
  currentPage: Page
  onPageChange: (page: Page) => void
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className={`sidebar-wrapper ${isVisible ? "visible" : ""}`}>
      <aside className="sidebar">
        <div className="sidebar-logo">PW</div>
        <div className="sidebar-divider" />
        <div className="sidebar-label">{pages.find((p) => p.key === currentPage)?.label}</div>
        <nav className="sidebar-nav">
          {pages.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onPageChange(key)}
              className={`sidebar-dot ${key === currentPage ? "active" : ""}`}
              title={label}
              aria-label={`Go to ${label}`}
            />
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-avatar">JD</div>
        </div>
      </aside>
    </div>
  )
}
