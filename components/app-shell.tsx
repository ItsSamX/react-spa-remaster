"use client"

import { useEffect, useState } from "react"
import { Home, GraduationCap, ClipboardList, NotebookPen, Search, Flame, ChevronUp } from "lucide-react"
import { HomeScreen } from "@/components/screens/home-screen"
import { ClassesScreen } from "@/components/screens/classes-screen"
import { TestsScreen } from "@/components/screens/tests-screen"
import { NotesScreen } from "@/components/screens/notes-screen"
import { DesktopHomeScreen } from "@/components/desktop/home-screen"
import { DesktopClassesScreen } from "@/components/desktop/classes-screen"
import { DesktopTestsScreen } from "@/components/desktop/tests-screen"
import { DesktopNotesScreen } from "@/components/desktop/notes-screen"
import { Sidebar } from "@/components/desktop/sidebar"
import { streakCount } from "@/lib/study-data"

type Tab = "home" | "classes" | "tests" | "notes"

const tabs: { key: Tab; label: string; icon: typeof Home }[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "classes", label: "Classes", icon: GraduationCap },
  { key: "tests", label: "Tests", icon: ClipboardList },
  { key: "notes", label: "Notes", icon: NotebookPen },
]

export function AppShell() {
  const [tab, setTab] = useState<Tab>("home")
  const [loading, setLoading] = useState(true)
  const [isDesktop, setIsDesktop] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  // Check if desktop on mount and window resize
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024)
    checkDesktop()
    window.addEventListener("resize", checkDesktop)
    return () => window.removeEventListener("resize", checkDesktop)
  }, [])

  // Keyboard navigation for desktop
  useEffect(() => {
    if (!isDesktop) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const tabKeys: Tab[] = ["home", "classes", "tests", "notes"]
      const currentIndex = tabKeys.indexOf(tab)

      if (e.key === "ArrowRight" && currentIndex < tabKeys.length - 1) {
        setTab(tabKeys[currentIndex + 1])
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        setTab(tabKeys[currentIndex - 1])
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [tab, isDesktop])

  // Scroll position for desktop
  useEffect(() => {
    if (!isDesktop) return

    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    const scrollContainer = document.querySelector(".desktop-pages")
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll)
      return () => scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [isDesktop])

  // Loading effect
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(t)
  }, [])

  // Desktop layout
  if (isDesktop) {
    return (
      <div className="relative flex h-screen bg-[var(--bg)]">
        <div className="ambient-glow" />

        <Sidebar currentPage={tab} onPageChange={setTab} />

        <div className="desktop-content">
          {/* Desktop top nav */}
          <header className="desktop-topnav">
            <div className="nav-pills">
              {tabs.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`nav-pill ${key === tab ? "active" : ""}`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>
          </header>

          {/* Desktop content pages */}
          <div className="desktop-pages" key={tab}>
            <div className="page-section visible">
              <div className="px-6 py-4">
                {loading ? (
                  <DesktopLoadingSkeleton />
                ) : (
                  <>
                    {tab === "home" && <DesktopHomeScreen />}
                    {tab === "classes" && <DesktopClassesScreen />}
                    {tab === "tests" && <DesktopTestsScreen />}
                    {tab === "notes" && <DesktopNotesScreen />}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Scroll indicator dots */}
          <div className="scroll-indicator">
            {tabs.map(({ key }, i) => (
              <button
                key={i}
                onClick={() => setTab(key)}
                className={`scroll-dot ${key === tab ? "active" : ""}`}
                aria-label={`Go to ${key}`}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Mobile layout
  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col">
      <div className="ambient-glow" />

      {/* Top bar */}
      <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-[var(--border)] bg-[var(--bg)]/80 px-5 backdrop-blur-xl">
        <div className="flex shrink-0 items-center gap-1 font-display text-[18px] font-bold">
          <span className="text-[var(--brand)]">PW</span>
          <span className="text-[var(--text-2)]">Client</span>
        </div>
        <div className="glass flex h-9 flex-1 items-center gap-2 rounded-full px-3.5">
          <Search size={14} className="text-[var(--text-2)]" />
          <input
            placeholder="Search lectures..."
            className="w-full bg-transparent text-[13px] text-[var(--text)] placeholder:text-[var(--text-3)] focus:outline-none"
          />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="flex items-center gap-1 rounded-full border border-[var(--border-brand)] bg-[var(--brand-dim)] px-2 py-1 text-[12px] font-semibold text-[var(--brand)]">
            <Flame size={13} className="fill-[var(--brand)]" />
            {streakCount}
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#f97316] to-[#ea580c] text-[12px] font-bold text-white">
            JD
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 flex-1">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div key={tab} className="fade-in">
            {tab === "home" && <HomeScreen />}
            {tab === "classes" && <ClassesScreen />}
            {tab === "tests" && <TestsScreen />}
            {tab === "notes" && <NotesScreen />}
          </div>
        )}
      </main>

      {/* Bottom tabs */}
      <nav className="sticky bottom-0 z-40 mx-auto flex h-16 w-full max-w-md items-center justify-around border-t border-[var(--border)] bg-[var(--bg)]/85 backdrop-blur-xl">
        {tabs.map(({ key, label, icon: Icon }) => {
          const isActive = tab === key
          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="pressable flex flex-1 flex-col items-center gap-1 py-2"
            >
              <Icon size={22} style={{ color: isActive ? "var(--brand)" : "var(--text-3)" }} strokeWidth={isActive ? 2.4 : 1.8} />
              <span
                className="text-[10px] font-medium"
                style={{ color: isActive ? "var(--brand)" : "var(--text-3)" }}
              >
                {label}
              </span>
              <span
                className="h-[2px] w-4 rounded-full transition-all"
                style={{ background: isActive ? "var(--brand)" : "transparent" }}
              />
            </button>
          )
        })}
      </nav>
    </div>
  )
}

function DesktopLoadingSkeleton() {
  return (
    <div className="bento-grid">
      <div className="w-hero skeleton rounded-[20px]" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-micro skeleton rounded-[20px]" />
      ))}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="w-quarter skeleton rounded-[20px]" />
      ))}
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4 px-5 pb-24 pt-4">
      <div className="flex flex-col gap-2">
        <div className="skeleton h-3 w-24 rounded-md" />
        <div className="skeleton h-7 w-40 rounded-lg" />
      </div>
      <div className="skeleton h-44 w-full rounded-[20px]" />
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton h-9 w-20 rounded-full" />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="skeleton h-16 w-full rounded-[20px]" />
        ))}
      </div>
      <div className="flex gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="skeleton h-36 w-40 shrink-0 rounded-[20px]" />
        ))}
      </div>
    </div>
  )
}
