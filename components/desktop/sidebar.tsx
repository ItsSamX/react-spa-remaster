"use client"

import { useEffect, useRef, useState } from "react"

type Page = "home" | "classes" | "tests" | "notes" | "dashboard"

const pages: { key: Page; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "classes", label: "Classes" },
  { key: "tests", label: "Tests" },
  { key: "notes", label: "Notes" },
  { key: "dashboard", label: "Dashboard" },
]

export function Sidebar({
  currentPage,
  onPageChange,
}: {
  currentPage: Page
  onPageChange: (page: Page) => void
}) {
  const [isVisible, setIsVisible] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Reveal sidebar on hover with delay-out
  function showSidebar() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsVisible(true)
  }
  function hideSidebar() {
    timeoutRef.current = setTimeout(() => setIsVisible(false), 400)
  }

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }, [])

  const currentLabel = pages.find((p) => p.key === currentPage)?.label ?? "Home"

  return (
    <div
      ref={wrapperRef}
      className={`sidebar-wrapper ${isVisible ? "visible" : ""}`}
      onMouseEnter={showSidebar}
      onMouseLeave={hideSidebar}
    >
      <aside
        className="sidebar"
        onMouseEnter={showSidebar}
        onMouseLeave={hideSidebar}
      >
        <div className="sidebar-logo">PW</div>
        <div className="sidebar-divider" />
        <div className="section-indicator">{currentLabel}</div>
        <nav className="sidebar-nav">
          {pages.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onPageChange(key)}
              className={`sidebar-dot ${key === currentPage ? "active" : ""}`}
              aria-label={`Go to ${label}`}
            >
              <span className="tooltip">{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-avatar">JD</div>
        </div>
      </aside>
    </div>
  )
}
