export type SubjectKey = "Physics" | "Math" | "Chemistry" | "Biology" | "All"

export const subjectColors: Record<SubjectKey, string> = {
  Physics: "var(--info)",
  Math: "var(--success)",
  Chemistry: "var(--purple)",
  Biology: "#ec4899",
  All: "var(--brand)",
}

export const subjectGradients: Record<string, string> = {
  Physics: "linear-gradient(135deg, #0a1628, #0d2440)",
  Math: "linear-gradient(135deg, #0a1f0d, #0d2e15)",
  Chemistry: "linear-gradient(135deg, #1a0a2e, #2a1045)",
  Biology: "linear-gradient(135deg, #2e0a1c, #45102e)",
}

export const subjectFilters: SubjectKey[] = ["All", "Physics", "Math", "Chemistry", "Biology"]

export const heroStats = {
  completion: 34,
  lectures: 142,
  hours: 89,
  tests: 23,
}

export type ScheduleItem = {
  id: string
  title: string
  teacher: string
  time: string
  subject: SubjectKey
}

export const upNext: ScheduleItem[] = [
  { id: "s1", title: "Laws of Motion — Lecture 4", teacher: "Alakh Pandey", time: "10:00 AM", subject: "Physics" },
  { id: "s2", title: "Integration by Parts", teacher: "Sachin Gupta", time: "12:30 PM", subject: "Math" },
  { id: "s3", title: "Organic Reactions Live", teacher: "Paaras Thakur", time: "04:00 PM", subject: "Chemistry" },
]

export type Lecture = {
  id: string
  title: string
  teacher: string
  subject: SubjectKey
  duration: string
  progress?: number
}

export const lectures: Lecture[] = [
  { id: "l1", title: "Laws of Motion", teacher: "Alakh Pandey", subject: "Physics", duration: "2h 15m" },
  { id: "l2", title: "Integration Part 1", teacher: "Sachin Gupta", subject: "Math", duration: "1h 45m" },
  { id: "l3", title: "Organic Chemistry", teacher: "Paaras Thakur", subject: "Chemistry", duration: "2h 30m" },
  { id: "l4", title: "Rotational Motion", teacher: "Alakh Pandey", subject: "Physics", duration: "2h 00m" },
  { id: "l5", title: "Electrochemistry", teacher: "Paaras Thakur", subject: "Chemistry", duration: "1h 30m" },
]

export const continueWatching: Lecture[] = [
  { id: "c1", title: "Work, Energy & Power", teacher: "Alakh Pandey", subject: "Physics", duration: "1h 50m", progress: 62 },
  { id: "c2", title: "Definite Integrals", teacher: "Sachin Gupta", subject: "Math", duration: "2h 05m", progress: 34 },
  { id: "c3", title: "Chemical Bonding", teacher: "Paaras Thakur", subject: "Chemistry", duration: "1h 40m", progress: 15 },
]

export const relatedLectures: Lecture[] = [
  { id: "r1", title: "Friction Deep Dive", teacher: "Alakh Pandey", subject: "Physics", duration: "1h 20m" },
  { id: "r2", title: "Circular Motion", teacher: "Alakh Pandey", subject: "Physics", duration: "1h 35m" },
  { id: "r3", title: "Newton's Laws Numericals", teacher: "Alakh Pandey", subject: "Physics", duration: "1h 10m" },
]

export type LeaderRow = {
  rank: number
  name: string
  score: number
  you?: boolean
}

export const leaderboard: LeaderRow[] = [
  { rank: 1, name: "Aarav Sharma", score: 2840 },
  { rank: 2, name: "Diya Patel", score: 2715 },
  { rank: 3, name: "Kabir Singh", score: 2680 },
  { rank: 4, name: "You", score: 2540, you: true },
  { rank: 5, name: "Ananya Rao", score: 2495 },
]

export type TestType = "DPP" | "Chapter Test" | "Mock Test" | "Previous Year"

export type TestItem = {
  id: string
  title: string
  subject: SubjectKey
  type: TestType
  questions: number
  duration: string
  score: number | null
}

export const testFilters: ("All" | TestType)[] = ["All", "DPP", "Chapter Test", "Mock Test", "Previous Year"]

export const tests: TestItem[] = [
  { id: "t1", title: "Newton's Laws DPP", subject: "Physics", type: "DPP", questions: 20, duration: "30 min", score: null },
  { id: "t2", title: "Integration Chapter Test", subject: "Math", type: "Chapter Test", questions: 30, duration: "45 min", score: 78 },
  { id: "t3", title: "JEE Mock Test 1", subject: "All", type: "Mock Test", questions: 90, duration: "3h", score: null },
  { id: "t4", title: "Organic Chemistry DPP", subject: "Chemistry", type: "DPP", questions: 25, duration: "35 min", score: null },
  { id: "t5", title: "Previous Year 2024", subject: "All", type: "Previous Year", questions: 90, duration: "3h", score: 82 },
  { id: "t6", title: "Rotational Motion Test", subject: "Physics", type: "Chapter Test", questions: 20, duration: "30 min", score: null },
]

export type HistoryRow = {
  id: string
  name: string
  score: number
  passed: boolean
}

export const testHistory: HistoryRow[] = [
  { id: "h1", name: "Integration Chapter Test", score: 78, passed: true },
  { id: "h2", name: "Previous Year 2024", score: 82, passed: true },
  { id: "h3", name: "Thermodynamics DPP", score: 91, passed: true },
  { id: "h4", name: "Kinematics Mock", score: 48, passed: false },
]

export const performance = {
  avgScore: 87.5,
  avgTime: "42m",
  testsTaken: 12,
}

export type StudyMaterial = {
  id: string
  subject: SubjectKey
  pdfs: number
}

export const studyMaterial: StudyMaterial[] = [
  { id: "m1", subject: "Physics", pdfs: 12 },
  { id: "m2", subject: "Math", pdfs: 18 },
  { id: "m3", subject: "Chemistry", pdfs: 15 },
]

export type Note = {
  id: string
  title: string
  subject: SubjectKey
  preview: string
  date: string
}

export const seedNotes: Note[] = [
  {
    id: "n1",
    title: "Newton's Laws Summary",
    subject: "Physics",
    preview: "F=ma, action-reaction pairs, inertia and the concept of net force acting on a body. Free body diagrams are essential for solving problems.",
    date: "Jun 12",
  },
  {
    id: "n2",
    title: "Integration Formulas",
    subject: "Math",
    preview: "∫xⁿ dx = x^(n+1)/(n+1) + C, standard integrals, integration by parts and substitution methods with worked examples.",
    date: "Jun 10",
  },
  {
    id: "n3",
    title: "Organic Reactions",
    subject: "Chemistry",
    preview: "SN1, SN2, elimination reactions, mechanisms and stereochemistry. Nucleophilic substitution depends on substrate and solvent.",
    date: "Jun 08",
  },
]

// Mon-Sun study hours bar heights (%)
export const studyHours = [40, 65, 30, 80, 55, 20, 70]
export const dayLabels = ["M", "T", "W", "T", "F", "S", "S"]
export const todayIndex = 3
// streak — true = studied
export const streakDays = [true, true, true, true, true, false, true]
export const streakCount = 12
