"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

/* ─── Colour tokens: AMBER + #2C3C69 NAVY + WHITE/SARVAM BLACK ─── */
const P = {
  /* Navy (replaces blue) – built from #2C3C69 */
  blue:       "#2C3C69",
  blueDark:   "#1E2D52",
  blueDeep:   "#131E3A",
  blueSub:    "#EDF0F7",   // very light tint of #2C3C69
  blueMid:    "#D3D9EC",   // medium tint
  blueText:   "#2C3C69",

  /* Amber scale */
  amber:      "#FBBF24",
  amberDark:  "#B45309",
  amberSub:   "#FFFBEB",
  amberMid:   "#FEF3C7",
  amberText:  "#92400E",

  /* Sarvam-style blacks / neutrals */
  white:      "#FFFFFF",
  bg:         "#FFFFFF",
  border:     "#E5E7EB",
  borderSoft: "#F3F4F6",
  text:       "#0F1117",   /* Sarvam near-black — main headings */
  mid:        "#303A4F",   /* dark navy-tinted mid text         */
  muted:      "#6B7280",
};

/* ─── Data ─── */
const SUBJECTS = [
  {
    id: "english", label: "English", teacher: "Cercei Lannister", avatar: "https://i.pravatar.cc/150?img=47",
    level: "Intermediate", next: "Upper Intermediate",
    progress: 68, classesLeft: 3, totalClasses: 16, quizzes: 8,
    color: P.blue, colorSub: P.blueMid, colorText: P.blueText,
    tag: "On Track", tagOk: true,
    path: ["Beginner", "Pre-Intermediate", "Intermediate", "Upper Intermediate", "Advanced"],
    curr: 2,
    topics: [
      { name: "Pronunciation",  score: 84, delta: +12, sessions: 6 },
      { name: "Vocabulary",     score: 76, delta: +8,  sessions: 8 },
      { name: "Grammar",        score: 59, delta: -3,  sessions: 5 },
      { name: "Fluency",        score: 43, delta: -7,  sessions: 4 },
      { name: "Listening",      score: 71, delta: +5,  sessions: 7 },
    ],
  },
  {
    id: "physics", label: "Physics", teacher: "Ms. Priya Kapoor", avatar: "https://i.pravatar.cc/150?img=45",
    level: "Foundation", next: "Pre-Intermediate",
    progress: 34, classesLeft: 8, totalClasses: 9, quizzes: 4,
    color: P.blue, colorSub: P.blueMid, colorText: P.blueText,
    tag: "Needs Focus", tagOk: false,
    path: ["Foundation", "Pre-Intermediate", "Intermediate", "Advanced", "Expert"],
    curr: 0,
    topics: [
      { name: "Newton&apos;s Laws",  score: 72, delta: +18, sessions: 4 },
      { name: "Kinematics",     score: 38, delta: -5,  sessions: 3 },
      { name: "Thermodynamics", score: 22, delta: -11, sessions: 2 },
      { name: "Optics",         score: 61, delta: +4,  sessions: 3 },
      { name: "Electrostatics", score: 17, delta: -2,  sessions: 1 },
    ],
  },
  {
    id: "python", label: "Python", teacher: "Aditya Kulkarni", avatar: "https://i.pravatar.cc/150?img=15",
    level: "Pre-Intermediate", next: "Intermediate",
    progress: 55, classesLeft: 5, totalClasses: 12, quizzes: 6,
    color: P.blueDark, colorSub: P.blueSub, colorText: P.blueDeep,
    tag: "Good Progress", tagOk: true,
    path: ["Beginner", "Pre-Intermediate", "Intermediate", "Advanced", "Expert"],
    curr: 1,
    topics: [
      { name: "Variables & Types", score: 91, delta: +6,  sessions: 5 },
      { name: "Functions",         score: 77, delta: +14, sessions: 6 },
      { name: "Loops & Control",   score: 66, delta: +9,  sessions: 4 },
      { name: "OOP Basics",        score: 41, delta: -4,  sessions: 3 },
      { name: "Error Handling",    score: 28, delta: -8,  sessions: 2 },
    ],
  },
];

/* score → blue(high) amber(mid) amberDark(low) */
function scoreColor(n: number) {
  return n >= 70 ? P.blue : n >= 45 ? P.amber : P.amberDark;
}

const INSIGHTS = [
  { good: false, text: "Morning sessions give you 23% higher scores — your next 3 bookings are afternoon." },
  { good: true,  text: "Physics scores up 18% since switching to Ms. Priya. Great match." },
  { good: false, text: "Fluency hasn't been practiced in 12 days and may regress soon." },
  { good: null,  text: "Best retention happens with a 3-day gap. You're averaging 5 days." },
];

const ACTIONS = [
  { tag: "Book Now",  label: "English Speaking", sub: "Cercei Lannister",       note: "3 classes from Upper Intermediate", cta: "Book Class", variant: "amber" },
  { tag: "Due Soon",  label: "Spanish Essay",    sub: "Due tomorrow",            note: "Affects your English quiz average", cta: "Open",       variant: "blue"  },
  { tag: "Practice",  label: "Fluency Drills",   sub: "English · Weakest topic", note: "3 AI exercises ready for you",      cta: "Start",      variant: "amber" },
];

/* ─── Animated bar ─── */
function AnimatedBar({ score, run }: { score: number; run: boolean }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    setW(0);
    const t = setTimeout(() => setW(score), run ? 60 : 0);
    return () => clearTimeout(t);
  }, [score, run]);
  const c = scoreColor(score);
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: P.borderSoft }}>
        <div className="h-full rounded-full"
          style={{ width: `${w}%`, backgroundColor: c, transition: "width 0.85s cubic-bezier(.22,1,.36,1)" }} />
      </div>
      <span className="text-[11px] font-bold min-w-[30px] text-right" style={{ color: c }}>{score}%</span>
    </div>
  );
}

/* ─── Page ─── */
export default function LearningRoadmap() {
  const [sidebarOpen, setSidebarOpen]             = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sid, setSid] = useState("english");
  const [run, setRun] = useState(true);

  const s = SUBJECTS.find(x => x.id === sid)!;

  function pick(id: string) {
    setRun(false);
    setSid(id);
    requestAnimationFrame(() => requestAnimationFrame(() => setRun(true)));
  }

  return (
    <div className="flex h-screen overflow-hidden font-matter" style={{ background: P.bg }}>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setMobileSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full z-50 md:hidden">
            <Sidebar isOpen={true} setIsOpen={() => {}} />
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto min-w-0 bg-white">

        {/* Mobile toggle */}
        <div className="md:hidden fixed top-4 left-4 z-30">
          <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 bg-white rounded-lg shadow-sm border border-[#E5E7EB]">
            {mobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Global Header */}
        <div className="px-5 md:px-7 py-4 md:py-6 mt-14 md:mt-0">
          <Header title="Your Roadmap" titleAccent="" titleSuffix="" subtitle="Real-time progress tracker" hideRightTools={true} />
        </div>

        <div className="px-4 md:px-6 py-5">

          {/* ── Subject tabs ── */}
          <div className="flex flex-wrap gap-2 mb-5">
            {SUBJECTS.map(sub => (
              <button key={sub.id} onClick={() => pick(sub.id)}
                className="px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-150"
                style={{
                  background: sid === sub.id ? sub.color : P.white,
                  color:      sid === sub.id ? "#fff" : P.mid,
                  border:     sid === sub.id ? "none" : `1px solid ${P.border}`,
                }}>
                {sub.label}
              </button>
            ))}
          </div>

          {/* ── ROW 1: Level card + Learning Path ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 mb-4">

            {/* Level Card */}
            <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${P.border}` }}>

              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-widest mb-1" style={{ color: P.muted }}>Current Level</p>
                  <p className="text-[26px] font-season leading-tight" style={{ color: P.text }}>{s.level}</p>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    color:      s.tagOk ? P.blueText : P.amberDark,
                    background: s.tagOk ? P.blueSub  : P.amberSub,
                  }}>
                  {s.tag}
                </span>
              </div>

              {/* Progress */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[12px]" style={{ color: P.muted }}>→ {s.next}</span>
                  <span className="text-[13px] font-bold" style={{ color: s.color }}>{s.progress}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: P.borderSoft }}>
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${s.progress}%`, background: s.color }} />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 pt-4 mb-4" style={{ borderTop: `1px solid ${P.borderSoft}` }}>
                {[
                  { n: s.classesLeft,  l: "left" },
                  { n: s.totalClasses, l: "total" },
                  { n: s.quizzes,      l: "quizzes" },
                ].map((x, i) => (
                  <div key={i} className="text-center">
                    <p className="text-[22px] font-season leading-none mb-1" style={{ color: P.text }}>{x.n}</p>
                    <p className="text-[11px]" style={{ color: P.muted }}>{x.l}</p>
                  </div>
                ))}
              </div>

              {/* Teacher */}
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: `1px solid ${P.borderSoft}` }}>
                <img src={s.avatar} alt={s.teacher}
                  className="w-9 h-9 rounded-full object-cover"
                  style={{ border: `1px solid ${P.border}` }} />
                <div>
                  <p className="text-[13px] font-medium" style={{ color: P.text }}>{s.teacher}</p>
                  <p className="text-[11px]" style={{ color: P.muted }}>Current Teacher</p>
                </div>
              </div>
            </div>

            {/* Learning Path */}
            <div className="bg-white rounded-2xl p-6" style={{ border: `1px solid ${P.border}` }}>

              {/* Card header */}
              <div className="flex items-center justify-between mb-7">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-5 rounded-full" style={{ background: s.color }} />
                  <div>
                    <p className="text-[15px] font-season" style={{ color: P.text }}>Learning Path</p>
                    <p className="text-[11px] mt-0.5" style={{ color: P.muted }}>
                      {s.curr} of {s.path.length - 1} levels completed
                    </p>
                  </div>
                </div>
                {/* Overall progress pill */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ background: s.tagOk ? P.blueSub : P.amberSub, border: `1px solid ${s.tagOk ? P.blueMid : P.amberMid}` }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.tagOk ? P.blue : P.amber }} />
                  <span className="text-[11px] font-semibold"
                    style={{ color: s.tagOk ? P.blueText : P.amberDark }}>
                    {s.tag}
                  </span>
                </div>
              </div>

              {/* Track */}
              <div className="relative flex items-start overflow-x-auto pb-3 gap-0">
                {s.path.map((node, i) => {
                  const done = i < s.curr;
                  const cur  = i === s.curr;
                  const last = i === s.path.length - 1;

                  /* gradient definitions per state */
                  const gradId   = `grad-node-${i}`;
                  const glowId   = `glow-node-${i}`;
                  const nodeSize = cur ? 40 : done ? 38 : 32;

                  return (
                    <div key={node} className="flex items-start"
                      style={{ flex: last ? "none" : 1, minWidth: cur ? 70 : 56 }}>

                      <div className="flex flex-col items-center gap-3">

                        {/* ── NODE ICON ── */}
                        <div className="relative flex items-center justify-center rounded-full transition-all duration-300 shrink-0"
                          style={{
                            width:     nodeSize,
                            height:    nodeSize,
                            boxShadow: cur
                              ? `0 0 0 5px ${s.color}22, 0 4px 16px ${s.color}40`
                              : done
                                ? `0 2px 8px ${s.color}30`
                                : "none",
                          }}>
                          <svg width={nodeSize} height={nodeSize} viewBox={`0 0 ${nodeSize} ${nodeSize}`} style={{ position: "absolute", inset: 0 }}>
                            <defs>
                              {done && (
                                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor={s.color} stopOpacity="1" />
                                  <stop offset="100%" stopColor={s.color} stopOpacity="0.65" />
                                </linearGradient>
                              )}
                              {cur && (
                                <>
                                  <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={s.color} />
                                    <stop offset="100%" stopColor={s.colorText ?? s.color} />
                                  </linearGradient>
                                  <filter id={glowId}>
                                    <feGaussianBlur stdDeviation="2.5" result="blur"/>
                                    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                                  </filter>
                                </>
                              )}
                            </defs>
                            {(done || cur) && (
                              <circle
                                cx={nodeSize / 2} cy={nodeSize / 2} r={nodeSize / 2}
                                fill={done || cur ? `url(#${gradId})` : P.borderSoft}
                              />
                            )}
                            {!done && !cur && (
                              <circle
                                cx={nodeSize / 2} cy={nodeSize / 2} r={nodeSize / 2 - 1}
                                fill={P.bg} stroke={P.border} strokeWidth="1.5"
                              />
                            )}
                          </svg>

                          {/* inner icon */}
                          <div className="absolute inset-0 flex items-center justify-center"
                            style={{ filter: (done || cur) ? "drop-shadow(0 1px 2px rgba(0,0,0,0.2))" : "none" }}>
                            {done && (
                              /* Checkmark */
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            )}
                            {cur && (
                              /* Bookmark / flag — "you are here" */
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="white"
                                stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                              </svg>
                            )}
                            {!done && !cur && (
                              /* Lock icon */
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                                stroke={P.muted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                              </svg>
                            )}
                          </div>
                        </div>

                        {/* Label */}
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-center leading-tight"
                            style={{
                              fontSize:   cur ? "11px" : "10.5px",
                              fontWeight: cur ? 700 : done ? 600 : 400,
                              color:      cur ? P.text : done ? P.mid : P.muted,
                              maxWidth:   "76px",
                            }}>
                            {node}
                          </span>
                          {cur && (
                            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                              style={{ background: s.color, color: "white" }}>
                              Current
                            </span>
                          )}
                        </div>
                      </div>

                      {/* ── CONNECTOR RAIL ── */}
                      {!last && (
                        <div className="flex-1 flex-col flex pt-[22px] px-1 gap-0.5">
                          {/* filled portion */}
                          <div className="relative h-1 rounded-full overflow-hidden w-full"
                            style={{ background: P.borderSoft }}>
                            <div className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
                              style={{
                                width: done ? "100%" : cur ? `${s.progress}%` : "0%",
                                background: done
                                  ? `linear-gradient(90deg, ${s.color} 0%, ${s.color}bb 100%)`
                                  : `linear-gradient(90deg, ${s.color} 0%, ${P.amber} 100%)`,
                              }} />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Footer hint */}
              <div className="mt-6 flex items-center justify-between px-4 py-3 rounded-xl"
                style={{ background: P.bg, border: `1px solid ${P.borderSoft}` }}>
                <p className="text-[12.5px]" style={{ color: P.mid }}>
                  Complete <strong style={{ color: P.text }}>{s.classesLeft} more classes</strong> to unlock{" "}
                  <strong style={{ color: P.text }}>{s.next}</strong>
                </p>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <div className="h-1.5 w-[60px] rounded-full overflow-hidden" style={{ background: P.border }}>
                    <div className="h-full rounded-full" style={{ width: `${s.progress}%`, background: s.color }} />
                  </div>
                  <span className="text-[11px] font-bold" style={{ color: s.color }}>{s.progress}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── ROW 2: Topic Strength + AI Insights ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

            {/* Topic Strength */}
            <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${P.border}` }}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-5 rounded-full" style={{ background: s.color }} />
                  <div>
                    <p className="text-[15px] font-season" style={{ color: P.text }}>Topic Strength</p>
                    <p className="text-[11px] mt-0.5" style={{ color: P.muted }}>Derived from quiz & test results</p>
                  </div>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded-full shrink-0"
                  style={{ color: P.muted, background: P.bg, border: `1px solid ${P.border}` }}>
                  30 days
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {s.topics.map(t => (
                  <div key={t.name}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold"
                          style={{ color: t.delta > 0 ? P.blue : P.amber }}>
                          {t.delta > 0 ? "▲" : "▼"}
                        </span>
                        <span className="text-[13px]" style={{ color: P.mid }}>{t.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-semibold"
                          style={{ color: t.delta > 0 ? P.blue : P.amber }}>
                          {t.delta > 0 ? "+" : ""}{t.delta}%
                        </span>
                        <span className="text-[11px]" style={{ color: P.muted }}>{t.sessions} sessions</span>
                      </div>
                    </div>
                    <AnimatedBar score={t.score} run={run} />
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-5 mt-5 pt-4" style={{ borderTop: `1px solid ${P.borderSoft}` }}>
                {[
                  { c: P.blue,      l: "Strong ≥ 70%" },
                  { c: P.amber,     l: "Building 45–70%" },
                  { c: P.amberDark, l: "Weak < 45%" },
                ].map(x => (
                  <div key={x.l} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-sm shrink-0" style={{ background: x.c }} />
                    <span className="text-[11px]" style={{ color: P.muted }}>{x.l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights — Osmium watermark card */}
            <div className="bg-white rounded-2xl p-5 relative overflow-hidden"
              style={{ border: `1px solid ${P.border}` }}>

              {/* Osmium abstract watermark — subtle neural/circuit motif */}
              <svg width="180" height="180" viewBox="0 0 180 180" fill="none"
                style={{ position: "absolute", right: -24, bottom: -24, opacity: 0.045, pointerEvents: "none" }}
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="90" cy="90" r="72" stroke="#2C3C69" strokeWidth="2"/>
                <circle cx="90" cy="90" r="48" stroke="#2C3C69" strokeWidth="1.5"/>
                <circle cx="90" cy="90" r="24" stroke="#2C3C69" strokeWidth="1.5" fill="#2C3C69" fillOpacity="0.15"/>
                <line x1="90" y1="18" x2="90" y2="162" stroke="#2C3C69" strokeWidth="1.2" strokeDasharray="3 4"/>
                <line x1="18" y1="90" x2="162" y2="90" stroke="#2C3C69" strokeWidth="1.2" strokeDasharray="3 4"/>
                <line x1="39" y1="39" x2="141" y2="141" stroke="#2C3C69" strokeWidth="1" strokeDasharray="3 5"/>
                <line x1="141" y1="39" x2="39" y2="141" stroke="#2C3C69" strokeWidth="1" strokeDasharray="3 5"/>
                <circle cx="90" cy="18" r="4" fill="#2C3C69"/>
                <circle cx="90" cy="162" r="4" fill="#2C3C69"/>
                <circle cx="18" cy="90" r="4" fill="#2C3C69"/>
                <circle cx="162" cy="90" r="4" fill="#2C3C69"/>
                <circle cx="39" cy="39" r="3" fill="#2C3C69"/>
                <circle cx="141" cy="141" r="3" fill="#2C3C69"/>
                <circle cx="141" cy="39" r="3" fill="#2C3C69"/>
                <circle cx="39" cy="141" r="3" fill="#2C3C69"/>
              </svg>

              <div className="flex items-center justify-between mb-5 relative">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-5 rounded-full" style={{ background: P.blue }} />
                  <div>
                    <p className="text-[15px] font-season" style={{ color: P.text }}>AI Insights</p>
                    <p className="text-[11px] mt-0.5" style={{ color: P.muted }}>Osmium · refreshed after every class</p>
                  </div>
                </div>
                {/* Osmium AI pill */}
                <span className="text-[9.5px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ background: P.blueSub, color: P.blue, border: `1px solid ${P.blueMid}` }}>
                  AI · Osmium
                </span>
              </div>

              <div className="flex flex-col relative">
                {INSIGHTS.map((ins, i) => (
                  <div key={i}
                    className="flex gap-4 py-3.5 items-start"
                    style={{ borderBottom: i < INSIGHTS.length - 1 ? `1px solid ${P.blueMid}` : "none" }}>
                    {/* navy = positive, amber = warning, muted dot = neutral */}
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                      style={{ background: ins.good === true ? P.blue : ins.good === false ? P.amber : P.muted }} />
                    <p className="text-[13px] leading-relaxed" style={{ color: P.mid }}>{ins.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── ROW 3: Recommended Actions + Milestone ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_264px] gap-4">

            {/* Recommended Actions */}
            <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${P.border}` }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-5 rounded-full" style={{ background: P.blue }} />
                <p className="text-[15px] font-season" style={{ color: P.text }}>Recommended Actions</p>
                <span className="ml-auto text-[11px]" style={{ color: P.muted }}>AI-prioritised</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ACTIONS.map((a, i) => {
                  const isAmber = a.variant === "amber";
                  return (
                    <div key={i} className="rounded-2xl p-4 flex flex-col gap-2"
                      style={{ border: `1px solid ${P.border}` }}>
                      {/* amber tag label only for truly urgent items */}
                      <span className="text-[10px] font-bold uppercase tracking-widest"
                        style={{ color: isAmber ? P.amberDark : P.blue }}>
                        {a.tag}
                      </span>
                      <p className="text-[14px] font-season leading-tight" style={{ color: P.text }}>{a.label}</p>
                      <p className="text-[12px]" style={{ color: P.mid }}>{a.sub}</p>
                      <p className="text-[11.5px] leading-relaxed flex-1" style={{ color: P.muted }}>{a.note}</p>
                      {/* All buttons → navy #2C3C69 regardless of variant */}
                      <button className="w-full mt-1 py-2 rounded-full text-[12.5px] font-medium text-white transition-opacity hover:opacity-80"
                        style={{ background: P.blue }}>
                        {a.cta}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Milestone Card — #2C3C69 → sky white gradient */}
            <div className="rounded-2xl p-5 flex flex-col"
              style={{ background: "linear-gradient(180deg, #2C3C69 0%, #3D5A96 30%, #7AADD6 65%, #E8F3FA 100%)" }}>

              <p className="text-[9.5px] font-bold uppercase tracking-widest mb-4"
                style={{ color: "rgba(255,255,255,0.55)" }}>
                Next Milestone
              </p>

              <p className="text-[20px] font-season text-white leading-tight mb-0.5">{s.next}</p>
              <p className="text-[12px] mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>{s.label}</p>

              {/* Amber accent progress */}
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.55)" }}>Progress</span>
                <span className="text-[12px] font-bold" style={{ color: P.amber }}>{s.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full mb-5" style={{ background: "rgba(44,60,105,0.18)" }}>
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${s.progress}%`, background: P.amber }} />
              </div>

              <div className="flex-1" />

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-2 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
                {[
                  { n: "18",               l: "Day Streak ✦" },
                  { n: `${s.classesLeft}`, l: "Classes Left" },
                  { n: `${s.quizzes}`,     l: "Quizzes Done" },
                  { n: "2",                l: "Quizzes Left" },
                ].map((x, i) => (
                  <div key={i} className="rounded-xl p-2.5 text-center"
                    style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(4px)" }}>
                    <p className="text-[20px] font-season leading-none mb-1"
                      style={{ color: i < 2 ? "#ffffff" : "#2C3C69" }}>{x.n}</p>
                    <p className="text-[9.5px] font-medium"
                      style={{ color: i < 2 ? "rgba(255,255,255,0.6)" : "rgba(44,60,105,0.7)" }}>{x.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="h-8" />
        </div>
      </main>
    </div>
  );
}
