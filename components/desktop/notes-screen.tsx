"use client"

import { useEffect, useState } from "react"
import { Search, Plus, Download, FileText, X, Atom, Sigma, FlaskConical } from "lucide-react"
import { seedNotes, studyMaterial, subjectColors, type Note, type SubjectKey } from "@/lib/study-data"
import { Card, SectionHeader } from "@/components/ui-bits"

const STORAGE_KEY = "pw-client-notes"

const materialIcons: Record<string, React.ReactNode> = {
  Physics: <Atom size={20} />,
  Math: <Sigma size={20} />,
  Chemistry: <FlaskConical size={20} />,
}

export function DesktopNotesScreen() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loaded, setLoaded] = useState(false)
  const [query, setQuery] = useState("")

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      setNotes(stored ? JSON.parse(stored) : seedNotes)
    } catch {
      setNotes(seedNotes)
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }, [notes, loaded])

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.preview.toLowerCase().includes(query.toLowerCase()),
  )

  function addNote(note: Omit<Note, "id" | "date">) {
    const date = new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit" })
    setNotes((prev) => [{ ...note, id: `n${Date.now()}`, date }, ...prev])
  }

  return (
    <div className="bento-grid">
      {/* Search full width - span 12 cols x 1 row */}
      <div className="w-full">
        <div className="glass flex h-11 items-center gap-2 rounded-full px-4">
          <Search size={16} className="text-[var(--text-2)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-full bg-transparent text-[14px] text-[var(--text)] placeholder:text-[var(--text-3)] focus:outline-none"
          />
        </div>
      </div>

      {/* Study material horizontal scroll - span 12 cols x 1 row */}
      <div className="w-full">
        <div className="mb-3">
          <SectionHeader title="PW Study Material" />
        </div>
        <div className="no-scrollbar flex gap-3 overflow-x-auto">
          {studyMaterial.map((m, i) => (
            <Card key={m.id} delay={i * 60} className="flex w-[130px] shrink-0 flex-col gap-2 p-4">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ color: subjectColors[m.subject], background: `${subjectColors[m.subject]}1f` }}
              >
                {materialIcons[m.subject]}
              </span>
              <p className="text-[14px] font-semibold text-[var(--text)]">{m.subject}</p>
              <p className="text-[11px] text-[var(--text-2)]">{m.pdfs} PDFs</p>
              <button className="pressable mt-1 flex items-center justify-center gap-1.5 rounded-full bg-[var(--brand-dim)] py-1.5 text-[11px] font-semibold text-[var(--brand)]">
                <Download size={12} /> Get
              </button>
            </Card>
          ))}
        </div>
      </div>

      {/* Notes list - span 8 cols x 3 rows */}
      <Card className="w-hero overflow-hidden p-4" delay={100}>
        <div className="mb-4 flex items-center justify-between">
          <SectionHeader title="My Notes" />
          <button
            onClick={() => {
              const subject: SubjectKey = "Physics"
              addNote({
                subject,
                title: "New Note",
                preview: "Click to edit...",
                tags: [],
              })
            }}
            className="pressable flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--brand)] text-white"
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-10">
              <FileText size={32} className="text-[var(--text-3)]" />
              <p className="text-[13px] text-[var(--text-2)]">{query ? "No matching notes" : "No notes yet"}</p>
            </div>
          ) : (
            filtered.map((note, i) => (
              <div key={note.id} className="rounded-lg border border-[var(--border)] p-3 hover:border-[var(--border-strong)] transition-colors">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex flex-1 flex-col gap-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[var(--text)] truncate">{note.title}</p>
                    <p className="text-[11px] text-[var(--text-2)] line-clamp-2">{note.preview}</p>
                  </div>
                </div>
                {note.tags && note.tags.length > 0 && (
                  <div className="flex gap-1 flex-wrap mb-2">
                    {note.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex text-[9px] font-medium px-2 py-1 rounded-full"
                        style={{
                          background: `${subjectColors[note.subject]}1f`,
                          color: subjectColors[note.subject],
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-[10px] text-[var(--text-3)]">{note.date}</p>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Add note panel - span 4 cols x 3 rows */}
      <Card className="w-medium p-4 overflow-hidden" delay={200}>
        <SectionHeader title="Add Note" />
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const title = formData.get("title") as string
            const preview = formData.get("preview") as string
            if (title.trim() && preview.trim()) {
              addNote({
                subject: "Physics",
                title,
                preview,
                tags: [],
              })
              e.currentTarget.reset()
            }
          }}
          className="flex flex-col gap-3"
        >
          <input
            name="title"
            placeholder="Title..."
            className="w-full bg-white/5 border border-[var(--border)] rounded-lg px-3 py-2 text-[13px] text-[var(--text)] placeholder:text-[var(--text-3)] focus:outline-none focus:border-[var(--border-strong)]"
          />
          <textarea
            name="preview"
            placeholder="Content preview..."
            rows={6}
            className="w-full bg-white/5 border border-[var(--border)] rounded-lg px-3 py-2 text-[12px] text-[var(--text)] placeholder:text-[var(--text-3)] focus:outline-none focus:border-[var(--border-strong)] resize-none"
          />
          <button
            type="submit"
            className="pressable w-full rounded-lg bg-[var(--brand)] py-2 text-[13px] font-semibold text-white hover:bg-[#ea580c] transition-colors"
          >
            Save Note
          </button>
        </form>
      </Card>
    </div>
  )
}
