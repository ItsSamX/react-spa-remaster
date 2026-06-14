"use client"

import { useEffect, useState } from "react"
import { seedNotes, subjectColors, type Note, type SubjectKey } from "@/lib/study-data"

const STORAGE_KEY = "pw-client-notes"

const staticNoteCards = [
  {
    tags: [
      { label: "Physics", color: "#3b82f6" },
      { label: "Quantum", color: "#a855f7" },
    ],
    title: "Wave Function Collapse",
    preview:
      "When a quantum system is measured, the wave function collapses to a single eigenstate. The probability of collapsing to a particular eigenstate is given by the squared amplitude of the corresponding coefficient...",
    footer: "Updated 2 hours ago · 4 min read",
  },
  {
    tags: [
      { label: "Math", color: "#22c55e" },
      { label: "Calculus", color: "#eab308" },
    ],
    title: "Integration by Parts",
    preview:
      "Integral u dv = uv − Integral v du. Choose u using LIATE rule: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential. This method is particularly useful when integrating products of functions...",
    footer: "Updated yesterday · 6 min read",
  },
  {
    tags: [
      { label: "Chemistry", color: "#a855f7" },
      { label: "Organic", color: "#ef4444" },
    ],
    title: "SN2 Reaction Mechanism",
    preview:
      "Bimolecular nucleophilic substitution occurs in a single step. The nucleophile attacks from the backside, causing inversion of configuration. Steric hindrance significantly affects the reaction rate...",
    footer: "Updated 3 days ago · 8 min read",
  },
]

export function DesktopNotesScreen() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loaded, setLoaded] = useState(false)

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

  function handleCreate() {
    const date = new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit" })
    setNotes((prev) => [
      { id: `n${Date.now()}`, title: "New Note", subject: "Physics" as SubjectKey, preview: "Click to edit...", date, tags: [] },
      ...prev,
    ])
  }

  return (
    <div className="bento-grid">

      {/* Create Note — span 12 (full width, no padding widget wrapper) */}
      <div className="w-full">
        <button className="create-note" onClick={handleCreate}>
          <span>+</span> Create New Note
        </button>
      </div>

      {/* Static note cards — 3 × span 4 x 2 rows */}
      {staticNoteCards.map((card, i) => (
        <div key={i} className="widget note-card w-medium">
          <div style={{ display: "flex", gap: "5px", marginBottom: "8px", flexWrap: "wrap" }}>
            {card.tags.map((tag) => (
              <span
                key={tag.label}
                className="note-tag"
                style={{ color: tag.color, borderColor: `${tag.color}4d` }}
              >
                {tag.label}
              </span>
            ))}
          </div>
          <div className="note-title">{card.title}</div>
          <div className="note-preview">{card.preview}</div>
          <div className="note-footer">{card.footer}</div>
        </div>
      ))}

      {/* User notes from localStorage — each span 4 x 2 rows */}
      {notes.map((note) => (
        <div key={note.id} className="widget note-card w-medium">
          {note.tags && note.tags.length > 0 && (
            <div style={{ display: "flex", gap: "5px", marginBottom: "8px", flexWrap: "wrap" }}>
              {note.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="note-tag"
                  style={{
                    color: subjectColors[note.subject],
                    borderColor: `${subjectColors[note.subject]}4d`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="note-title">{note.title}</div>
          <div className="note-preview">{note.preview}</div>
          <div className="note-footer">{note.date}</div>
        </div>
      ))}

    </div>
  )
}
