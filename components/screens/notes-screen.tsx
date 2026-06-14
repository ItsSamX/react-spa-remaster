"use client"

import { useEffect, useState } from "react"
import { Search, Plus, Download, FileText, X, Atom, Sigma, FlaskConical } from "lucide-react"
import { seedNotes, studyMaterial, subjectColors, subjectFilters, type Note, type SubjectKey } from "@/lib/study-data"
import { Card, SectionHeader } from "@/components/ui-bits"

const STORAGE_KEY = "pw-client-notes"

const materialIcons: Record<string, React.ReactNode> = {
  Physics: <Atom size={20} />,
  Math: <Sigma size={20} />,
  Chemistry: <FlaskConical size={20} />,
}

export function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loaded, setLoaded] = useState(false)
  const [query, setQuery] = useState("")
  const [showAdd, setShowAdd] = useState(false)
  const [active, setActive] = useState<Note | null>(null)

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
    <div className="flex flex-col gap-6 px-5 pb-24 pt-4">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--text-3)]">Your Knowledge</p>
        <h1 className="font-display text-[28px] font-extrabold leading-tight text-[var(--text)]">Notes</h1>
      </div>

      {/* Search */}
      <div className="glass flex h-11 items-center gap-2 rounded-full px-4">
        <Search size={16} className="text-[var(--text-2)]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notes..."
          className="w-full bg-transparent text-[14px] text-[var(--text)] placeholder:text-[var(--text-3)] focus:outline-none"
        />
      </div>

      {/* Study material */}
      <section>
        <SectionHeader title="PW Study Material" action="See all" />
        <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
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
      </section>

      {/* My notes */}
      <section>
        <SectionHeader title="My Notes" />
        {filtered.length === 0 ? (
          <Card className="flex flex-col items-center gap-2 py-10">
            <FileText size={32} className="text-[var(--text-3)]" />
            <p className="text-[13px] text-[var(--text-2)]">{query ? "No matching notes" : "No notes yet — tap + to add one"}</p>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((note, i) => (
              <Card key={note.id} delay={i * 50} onClick={() => setActive(note)} className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className="rounded-md px-2 py-0.5 text-[10px] font-semibold"
                    style={{ color: subjectColors[note.subject], background: `${subjectColors[note.subject]}1f` }}
                  >
                    {note.subject}
                  </span>
                  <span className="text-[11px] text-[var(--text-3)]">{note.date}</span>
                </div>
                <p className="mb-1 text-[15px] font-semibold text-[var(--text)]">{note.title}</p>
                <p className="line-clamp-2 text-[13px] leading-relaxed text-[var(--text-2)]">{note.preview}</p>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* FAB */}
      <button
        hidden={showAdd || active !== null}
        onClick={() => setShowAdd(true)}
        aria-label="Create note"
        className="pressable fixed bottom-20 right-5 z-30 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[var(--brand)] text-white"
        style={{ boxShadow: "0 4px 24px rgba(249,115,22,0.4)" }}
      >
        <Plus size={24} />
      </button>

      {showAdd && <AddNoteModal onClose={() => setShowAdd(false)} onSave={addNote} />}
      {active && <ViewNoteModal note={active} onClose={() => setActive(null)} />}
    </div>
  )
}

function AddNoteModal({
  onClose,
  onSave,
}: {
  onClose: () => void
  onSave: (note: Omit<Note, "id" | "date">) => void
}) {
  const subjects = subjectFilters.filter((s) => s !== "All") as SubjectKey[]
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState<SubjectKey>(subjects[0])
  const [body, setBody] = useState("")

  function save() {
    if (!title.trim()) return
    onSave({ title: title.trim(), subject, preview: body.trim() || "No content yet." })
    onClose()
  }

  return (
    <Overlay onClose={onClose}>
      <div
        className="sheet-enter glass-elevated w-full rounded-t-3xl p-5 pb-8"
        style={{ background: "rgba(16,16,20,0.96)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-white/15" />
        <h3 className="mb-4 font-display text-[18px] font-bold text-[var(--text)]">New Note</h3>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="glass mb-3 w-full rounded-xl px-4 py-3 text-[14px] text-[var(--text)] placeholder:text-[var(--text-3)] focus:outline-none"
        />

        <div className="no-scrollbar mb-3 flex gap-2 overflow-x-auto pb-1">
          {subjects.map((s) => {
            const isActive = s === subject
            return (
              <button
                key={s}
                onClick={() => setSubject(s)}
                className={`pressable shrink-0 rounded-full px-3.5 py-2 text-[12px] font-medium ${
                  isActive ? "text-white" : "glass text-[var(--text-2)]"
                }`}
                style={isActive ? { background: subjectColors[s], borderRadius: 9999 } : { borderRadius: 9999 }}
              >
                {s}
              </button>
            )
          })}
        </div>

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your note..."
          className="glass mb-4 h-[120px] w-full resize-none rounded-xl px-4 py-3 text-[14px] leading-relaxed text-[var(--text)] placeholder:text-[var(--text-3)] focus:outline-none"
        />

        <button
          onClick={save}
          className="pressable w-full rounded-full bg-[var(--brand)] py-3.5 text-[14px] font-semibold text-white"
        >
          Save Note
        </button>
      </div>
    </Overlay>
  )
}

function ViewNoteModal({ note, onClose }: { note: Note; onClose: () => void }) {
  return (
    <Overlay onClose={onClose}>
      <div
        className="sheet-enter glass-elevated w-full rounded-t-3xl p-5 pb-8"
        style={{ background: "rgba(16,16,20,0.96)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-white/15" />
        <div className="mb-3 flex items-center justify-between">
          <span
            className="rounded-md px-2 py-0.5 text-[11px] font-semibold"
            style={{ color: subjectColors[note.subject], background: `${subjectColors[note.subject]}1f` }}
          >
            {note.subject}
          </span>
          <button onClick={onClose} className="pressable text-[var(--text-2)]" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <h3 className="mb-2 font-display text-[20px] font-bold text-[var(--text)]">{note.title}</h3>
        <p className="text-[14px] leading-relaxed text-[var(--text-2)]">{note.preview}</p>
        <p className="mt-4 text-[11px] text-[var(--text-3)]">Saved {note.date}</p>
      </div>
    </Overlay>
  )
}

function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fade-in fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}
