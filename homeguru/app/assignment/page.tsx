"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Menu, X } from "lucide-react";

/* ─── Colour tokens — matches roadmap & session-history ─── */
const P = {
  blue:       "#2C3C69",
  blueDark:   "#1E2D52",
  blueDeep:   "#131E3A",
  blueSub:    "#EDF0F7",
  blueMid:    "#D3D9EC",
  blueText:   "#2C3C69",
  amber:      "#FBBF24",
  amberDark:  "#B45309",
  amberSub:   "#FFFBEB",
  amberMid:   "#FEF3C7",
  green:      "#16A34A",
  red:        "#EF4444",
  white:      "#FFFFFF",
  bg:         "#FFFFFF",
  border:     "#E5E7EB",
  borderSoft: "#F3F4F6",
  text:       "#0F1117",
  mid:        "#303A4F",
  muted:      "#6B7280",
};

/* ── Svg helper ── */
const Svg = ({ d, s = 14, className = "" }: { d: React.ReactNode, s?: number, className?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const D = {
  file:   <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
  dl:     <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
  upload: <><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></>,
  check:  <polyline points="20 6 9 17 4 12"/>,
};

/* ─── Types ─── */
interface RubricItem { criterion: string; max: number; scored?: number; }
interface FileItem   { name: string; type: string; size: string; }
interface Assignment {
  id: number; title: string; subject: string; subColor: string;
  teacher: string; av: string;
  due: string; dueShort: string; daysLeft: number;
  status: "pending" | "graded" | "overdue" | "submitted"; grade: number | null;
  brief: string; sessionRef: string;
  rubric: RubricItem[]; attachments: FileItem[];
  submission: { text: string; file: string; submittedOn: string; } | null;
  feedback: { summary: string; improvements: string[]; aiNote: string; } | null;
}

/* ─── Data ─── */
const ASSIGNMENTS: Assignment[] = [
  {
    id: 1, title: "Spanish Essay — My Hometown",
    subject: "English", subColor: P.amber, teacher: "Cercei Lannister", av: "CL",
    due: "Mar 15, 2026", dueShort: "Tomorrow", daysLeft: 1,
    status: "pending", grade: null,
    brief: "Write a 300–400 word essay in Spanish describing your hometown. Include at least: 5 adjectives, 3 transition phrases, past and present tense. Use vocabulary from the last two sessions. Focus on coherence and sentence variety.",
    rubric: [
      { criterion: "Vocabulary usage",   max: 25 },
      { criterion: "Grammar accuracy",   max: 25 },
      { criterion: "Transition phrases", max: 20 },
      { criterion: "Content & clarity",  max: 20 },
      { criterion: "Word count & format",max: 10 },
    ],
    attachments: [
      { name: "Essay_Template.docx", type: "DOC", size: "48 KB" },
      { name: "Vocabulary_Reference.pdf", type: "PDF", size: "620 KB" },
    ],
    submission: null, feedback: null,
    sessionRef: "English Speaking — Mar 8",
  },
  {
    id: 2, title: "Laws of Motion — Problem Set 3A",
    subject: "Physics", subColor: "#6366F1", teacher: "Ms. Priya Kapoor", av: "PK",
    due: "Mar 19, 2026", dueShort: "5 days", daysLeft: 5,
    status: "pending", grade: null,
    brief: "Solve all 8 problems in Problem Set 3A. Show full working for each step — diagrams required for questions 3, 5, and 7. Submit as a single scanned PDF. Questions cover Newton's Laws, friction coefficients, and Atwood machine scenarios.",
    rubric: [
      { criterion: "Correct final answers",  max: 40 },
      { criterion: "Step-by-step working",   max: 30 },
      { criterion: "Free body diagrams",     max: 20 },
      { criterion: "Presentation & clarity", max: 10 },
    ],
    attachments: [
      { name: "Problem_Set_3A.pdf", type: "PDF", size: "980 KB" },
    ],
    submission: null, feedback: null,
    sessionRef: "Laws of Motion — Mar 2",
  },
  {
    id: 3, title: "Decorator Pattern — Memoization",
    subject: "Python", subColor: "#0EA5E9", teacher: "Aditya Kulkarni", av: "AK",
    due: "Mar 10, 2026", dueShort: "Submitted", daysLeft: -4,
    status: "graded", grade: 88,
    brief: "Build a memoization decorator from scratch without using functools.lru_cache. Your decorator should: cache results of any pure function, handle multiple positional arguments, include a .cache_clear() method, and include docstrings. Submit as a .py file with at least 3 test cases.",
    rubric: [
      { criterion: "Core functionality",    max: 40, scored: 36 },
      { criterion: "Edge case handling",    max: 25, scored: 20 },
      { criterion: "Code quality & style",  max: 20, scored: 18 },
      { criterion: "Test cases",            max: 15, scored: 14 },
    ],
    attachments: [
      { name: "Decorator_exercises.py", type: "CODE", size: "12 KB" },
    ],
    submission: {
      text: "Built the memoization decorator using a dict cache inside the closure. Handled *args using a tuple as the cache key. Included 4 test cases.",
      file: "memoize_varun.py",
      submittedOn: "Mar 9, 2026",
    },
    feedback: {
      summary: "Strong implementation overall. Cache logic is clean and the use of tuples as keys is exactly right. The cache_clear() approach works but could use a more Pythonic pattern.",
      improvements: [
        "Use functools.wraps to preserve the wrapped function's metadata",
        "Consider handling **kwargs — your current version ignores keyword arguments",
        "Add a cache_info() method to return hit/miss stats for debugging",
      ],
      aiNote: "Varun's code shows solid closure understanding from the previous session. Recommend advancing to class-based decorators in the next session.",
    },
    sessionRef: "Python Functions — Mar 5",
  },
  {
    id: 4, title: "Kinematics — Vector Decomposition",
    subject: "Physics", subColor: "#6366F1", teacher: "Ms. Priya Kapoor", av: "PK",
    due: "Feb 28, 2026", dueShort: "Overdue", daysLeft: -14,
    status: "overdue", grade: null,
    brief: "Complete the 5 unsolved projectile motion problems from the Feb 24 session. Show vector decomposition for each — horizontal and vertical components must be clearly labelled. Submit as scanned handwritten or typed PDF.",
    rubric: [
      { criterion: "Vector decomposition",          max: 40 },
      { criterion: "Horizontal component working",  max: 25 },
      { criterion: "Vertical component working",    max: 25 },
      { criterion: "Labelling & presentation",      max: 10 },
    ],
    attachments: [
      { name: "Unsolved_Problems_Feb24.pdf", type: "PDF", size: "540 KB" },
    ],
    submission: null, feedback: null,
    sessionRef: "Kinematics — Feb 24",
  },
];

/* ── Helpers ── */
function gradeColor(g: number) { return g >= 85 ? P.green : g >= 65 ? P.amber : P.red; }
function gradeLabel(g: number) { return g >= 90 ? "A" : g >= 80 ? "B" : g >= 70 ? "C" : g >= 60 ? "D" : "F"; }
function statusColor(s: string) { return s === "pending" ? P.amber : s === "graded" ? P.green : s === "overdue" ? P.red : P.blue; }
function dueColor(daysLeft: number, status: string) {
  if (status === "overdue") return P.red;
  if (daysLeft <= 1)        return P.red;
  if (daysLeft <= 3)        return P.amber;
  return P.mid;
}

function Av({ label, size = 26 }: { label: string; size?: number }) {
  return (
    <div className="rounded-full flex items-center justify-center shrink-0 font-bold"
      style={{ width: size, height: size, background: P.blueSub, border: `1px solid ${P.blueMid}`,
               fontSize: size * 0.34, color: P.blue }}>
      {label}
    </div>
  );
}

function Bar({ score, max }: { score: number; max: number }) {
  const pct = Math.round((score / max) * 100);
  const c   = pct >= 75 ? P.green : pct >= 50 ? P.amber : P.red;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden shrink-0" style={{ background: P.borderSoft }}>
        <div className="h-full transition-all duration-700 rounded-full" style={{ width: `${pct}%`, background: c }} />
      </div>
      <span className="text-[11.5px] font-bold min-w-[32px] text-right" style={{ color: c }}>{score}/{max}</span>
    </div>
  );
}

/* ════════ LIST VIEW ════════ */
function ListView({ onOpen }: { onOpen: (a: Assignment) => void }) {
  const [filter, setFilter] = useState("All");
  const FILTERS = ["All", "Pending", "Submitted", "Graded", "Overdue"];

  const filtered = ASSIGNMENTS.filter(a => {
    if (filter === "All")     return true;
    if (filter === "Pending")   return a.status === "pending";
    if (filter === "Submitted") return a.status === "submitted";
    if (filter === "Graded")    return a.status === "graded";
    if (filter === "Overdue")   return a.status === "overdue";
    return true;
  });

  const pending  = ASSIGNMENTS.filter(a => a.status === "pending").length;
  const overdue  = ASSIGNMENTS.filter(a => a.status === "overdue").length;
  const graded   = ASSIGNMENTS.filter(a => a.status === "graded");
  const avgGrade = graded.length ? Math.round(graded.reduce((s, a) => s + (a.grade || 0), 0) / graded.length) : null;

  return (
    <>
      <div className="bg-white w-full mb-6" 
        style={{ 
          minHeight: '98px', 
          padding: '18px 24px', 
          border: '1px solid #E5E7EB',
          borderRadius: '16px'
        }}>
        <div className="grid grid-cols-1 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#F3F4F6] w-full gap-4 sm:gap-0">
          {[
            { n: ASSIGNMENTS.length, l: "Total Assigned", trend: "3 subjects", icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM172,48h12V80H160V48ZM48,48H72V80H48ZM208,208H48V96H208V208ZM172,128a12,12,0,1,1-12-12A12,12,0,0,1,172,128Zm0,48a12,12,0,1,1-12-12A12,12,0,0,1,172,176Z"/></svg>, bg: "transparent", c: "#111827", bbg: "#F3F4F6", bc: "#6B7280" },
            { n: pending,            l: "Pending Task",   trend: "Due soon", ok: pending === 0, warn: pending > 0, icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"/></svg>, bg: "transparent", c: "#111827", bbg: "#F3F4F6", bc: "#6B7280" },
            { n: overdue,            l: "Overdue",        trend: "Action required",   bad: overdue > 0, icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v64a8,8,0,0,1-16,0Zm8,44a12,12,0,1,1,12-12A12,12,0,0,1,128,176Z"/></svg>, bg: "transparent", c: "#111827", bbg: "#F3F4F6", bc: "#6B7280" },
            { n: avgGrade ? `${avgGrade}%` : "—", l: "Avg Grade", trend: "High performance", icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM40,64H216v32H40ZM216,192H40V112H216v80Zm-36-48a12,12,0,1,1-12-12A12,12,0,0,1,180,144Zm0,32a12,12,0,1,1-12-12A12,12,0,0,1,180,176Z"/></svg>, bg: "transparent", c: "#111827", bbg: "#F3F4F6", bc: "#6B7280" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3.5 px-0 sm:px-6 py-2 sm:py-0">
              <div 
                className="rounded-2xl flex items-center justify-center shrink-0"
                style={{ width: '46px', height: '46px', background: s.bg, color: s.c }}
              >
                {s.icon}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[#6B7280]" style={{ fontSize: '13px', lineHeight: '1' }}>{s.l}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[#111827] font-bold" style={{ fontSize: '21px', lineHeight: '1' }}>{s.n}</span>
                  <span 
                    className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                    style={{ color: s.bc, backgroundColor: s.bbg }}
                  >
                    {s.trend}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-full text-[12.5px] font-medium transition-all duration-150"
            style={{
              background: filter === f ? P.blue : P.white,
              color:      filter === f ? "#fff" : P.mid,
              border:     filter === f ? "none" : `1px solid ${P.border}`,
            }}>
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: `1px solid ${P.border}` }}>
        <div className="hidden md:grid px-5 py-3"
          style={{ gridTemplateColumns: "3fr 1.3fr 130px 110px 80px 100px", background: P.bg, borderBottom: `1px solid ${P.border}` }}>
          {["Assignment", "Teacher", "Due", "Status", "Grade", ""].map((h, i) => (
            <p key={i} className="text-[10px] font-bold uppercase tracking-widest m-0" style={{ color: P.muted }}>{h}</p>
          ))}
        </div>

        {filtered.map((a, idx) => (
          <div key={a.id} onClick={() => onOpen(a)}
            className="cursor-pointer transition-colors duration-100 group"
            style={{ borderBottom: idx < filtered.length - 1 ? `1px solid ${P.border}` : "none" }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = P.bg}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "transparent"}>

            {/* Mobile Layout */}
            <div className="md:hidden p-4 flex items-start gap-3">
               <Av label={a.av} size={36} />
               <div className="flex-1 min-w-0">
                 <div className="flex justify-between items-start gap-2">
                   <p className="text-[14px] font-bold leading-tight text-ellipsis overflow-hidden" style={{ color: P.text }}>{a.title}</p>
                   {a.grade !== null && <span className="text-[12px] font-bold shrink-0" style={{ color: gradeColor(a.grade) }}>{a.grade}%</span>}
                 </div>
                 <p className="text-[11px] mt-1" style={{ color: P.muted }}>{a.subject} · Due {a.dueShort}</p>
                 <div className="mt-2 flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor(a.status) }} />
                   <span className="text-[11px] font-semibold" style={{ color: statusColor(a.status) }}>
                     {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                   </span>
                 </div>
               </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid px-5 py-4 items-center"
              style={{ gridTemplateColumns: "3fr 1.3fr 130px 110px 80px 100px" }}>
              <div className="flex items-center gap-3 min-w-0 pr-4">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: P.blue }} />
                <div className="min-w-0">
                   <p className="text-[14px] font-bold truncate" style={{ color: P.text }}>{a.title}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: P.muted }}>{a.subject}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 min-w-0 pr-4">
                <Av label={a.av} size={24} />
                <p className="text-[12px] truncate" style={{ color: P.mid }}>{a.teacher}</p>
              </div>

              <div>
                <p className="text-[12.5px] font-semibold" style={{ color: dueColor(a.daysLeft, a.status) }}>{a.dueShort}</p>
                <p className="text-[11px] mt-0.5" style={{ color: P.muted }}>{a.due}</p>
              </div>

              <div className="flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor(a.status) }} />
               <span className="text-[12px] font-semibold" style={{ color: statusColor(a.status) }}>
                 {a.status === "pending" && a.daysLeft === 1 ? "Due tomorrow" :
                  a.status === "pending" ? `${a.daysLeft} days left` :
                  a.status.charAt(0).toUpperCase() + a.status.slice(1)}
               </span>
              </div>

              <div>
                {a.grade !== null
                  ? <span className="text-[13.5px] font-bold" style={{ color: gradeColor(a.grade) }}>{a.grade}%</span>
                  : <span className="text-[12px]" style={{ color: P.muted }}>—</span>
                }
              </div>

              <button onClick={e => { e.stopPropagation(); onOpen(a); }}
                className="text-[11.5px] font-semibold px-4 py-1.5 rounded-full transition-colors hover:opacity-80"
                style={{
                  background: a.status === "pending" || a.status === "overdue" ? P.blue : P.blueSub,
                  color:      a.status === "pending" || a.status === "overdue" ? P.white : P.blue,
                  border:     `1px solid ${a.status === "pending" || a.status === "overdue" ? P.blue : P.blueMid}`
                }}>
                {a.status === "pending" || a.status === "overdue" ? "Submit →" : "Review →"}
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-14 text-center text-[13px]" style={{ color: P.muted }}>No assignments match your filter.</div>
        )}
      </div>
    </>
  );
}

/* ════════ DETAIL VIEW ════════ */
function DetailView({ a, onBack }: { a: Assignment; onBack: () => void }) {
  const [tab, setTab]       = useState("brief");
  const [text, setText]     = useState("");
  const [submitted, setSub] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const hasGrade   = a.status === "graded";
  const isOverdue  = a.status === "overdue";
  const isPending  = a.status === "pending" || isOverdue;
  const totalScore = a.rubric.reduce((s, r) => s + (r.scored || 0), 0);
  const totalMax   = a.rubric.reduce((s, r) => s + r.max, 0);

  const TABS = [
    { id: "brief",    l: "Brief & Rubric" },
    { id: "submit",   l: isPending && !submitted ? "Submit Work" : "My Submission" },
    ...(hasGrade ? [{ id: "feedback", l: "Feedback & Grade" }] : []),
  ];

  function downloadFile(f: FileItem) {
    setDownloading(f.name);
    let content = `Placeholder for ${f.name}\\nProvides mock content to trigger the download prompt.`;
    const mime = "text/plain";
    const blob = new Blob([content], { type: mime });
    const url  = URL.createObjectURL(blob);
    const aDom = document.createElement("a");
    aDom.href     = url;
    aDom.download = f.name;
    document.body.appendChild(aDom);
    aDom.click();
    document.body.removeChild(aDom);
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloading(null), 800);
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <header className="bg-white border-b border-[#E5E7EB] px-5 md:px-7 h-[60px] flex items-center gap-4 shrink-0">
        <button onClick={onBack}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F3F4F6] transition-colors shrink-0"
          style={{ border: `1px solid ${P.border}` }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.mid} strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div className="min-w-0">
          <h1 className="text-[17px] font-season leading-tight truncate" style={{ color: P.text }}>{a.title}</h1>
          <p className="text-[11px]" style={{ color: P.muted }}>{a.subject} · {a.teacher} · Due {a.due}</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-5 custom-scrollbar">

        {/* STATS - Unified Master Card (Matching StatsCards.tsx) */}
        <div className="bg-white w-full font-matter mb-6" 
          style={{ 
            minHeight: '98px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '18px 24px', 
            border: '1px solid #E5E7EB',
            borderRadius: '16px'
          }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#F3F4F6] w-full gap-4 sm:gap-0">
            {[
              { 
                n: a.dueShort, 
                l: "Due", 
                trend: a.status === 'submitted' ? "Submitted" : a.status === 'overdue' ? "Overdue" : `${a.daysLeft} days left`, 
                badgeBg: "#F3F4F6", badgeColor: "#6B7280",
                iconBg: "transparent", iconColor: "#111827",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"/></svg>
              },
              { 
                n: `${a.rubric.length} items`, 
                l: "Rubric Criteria", 
                trend: "Max 100", 
                badgeBg: "#F3F4F6", badgeColor: "#6B7280",
                iconBg: "transparent", iconColor: "#111827",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M216,40H72A16,16,0,0,0,56,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H72V56H216V200ZM176,88a8,8,0,0,1-8,8H104a8,8,0,0,1,0-16h64A8,8,0,0,1,176,88Zm0,32a8,8,0,0,1-8,8H104a8,8,0,0,1,0-16h64A8,8,0,0,1,176,120Zm0,32a8,8,0,0,1-8,8H104a8,8,0,0,1,0-16h64A8,8,0,0,1,176,152Z"/></svg>
              },
              { 
                n: `${a.attachments.length} files`, 
                l: "Attached Material", 
                trend: "PDFs, Docs", 
                badgeBg: "#F3F4F6", badgeColor: "#6B7280",
                iconBg: "transparent", iconColor: "#111827",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M209.66,122.34a8,8,0,0,1,0,11.32l-82.05,82a56,56,0,0,1-79.2-79.21L147.67,35.73a40,40,0,1,1,56.61,56.55L105.4,190.11a24,24,0,1,1-33.94-33.94l82.06-82a8,8,0,0,1,11.31,11.32l-82.05,82a8,8,0,0,0,11.31,11.31l98.88-97.83a24,24,0,0,0-33.94-33.94L59.05,145.89A40,40,0,1,0,115.6,202.5l82.06-82A8,8,0,0,1,209.66,122.34Z"/></svg>
              },
              { 
                n: hasGrade ? `${a.grade}%` : "—", 
                l: "Current Grade", 
                trend: hasGrade ? "Updated" : "Pending", 
                badgeBg: "#F3F4F6", badgeColor: "#6B7280",
                iconBg: "transparent", iconColor: "#111827",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M245.54,116.7l-48.4,43.2L204.6,224a8.07,8.07,0,0,1-3.61,8.87,8,8,0,0,1-9.11-.31l-63.88-44.5L64.12,232.56a8,8,0,0,1-9.11.31A8.07,8.07,0,0,1,51.4,224l7.46-64.1L10.46,116.7a8,8,0,0,1,4.6-14.1l65.8-5.38L106.33,36A8,8,0,0,1,128,36l25.47,61.22,65.8,5.38A8,8,0,0,1,245.54,116.7ZM128,48l-23,55.2a8,8,0,0,1-6.72,4.88L39.42,112.9,82,151a8,8,0,0,1,2.54,7.84L77.81,217.4l52.66-36.68a8,8,0,0,1,9.06,0l52.66,36.68-6.73-58.56A8,8,0,0,1,188,151l42.58-38.1-58.86-4.82a8,8,0,0,1-6.72-4.88Z"/></svg>
              },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3.5 px-0 sm:px-6 py-2 sm:py-0">
                <div 
                  className="rounded-2xl flex items-center justify-center shrink-0"
                  style={{ width: '46px', height: '46px', background: stat.iconBg, color: stat.iconColor }}
                >
                  {stat.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[#6B7280]" style={{ fontSize: '13px', lineHeight: '1' }}>{stat.l}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[#111827] font-medium" style={{ fontSize: '21px', lineHeight: '1' }}>{stat.n}</span>
                    <span 
                      className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                      style={{ color: stat.badgeColor, backgroundColor: stat.badgeBg }}
                    >
                      {stat.trend}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overdue alert */}
        {isOverdue && !submitted && (
          <div className="bg-red-50/50 rounded-2xl px-5 py-3 mb-5 flex items-center gap-3" style={{ border: `1px solid ${P.red}`, borderLeftWidth: 4 }}>
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: P.red }} />
            <p className="text-[13px]" style={{ color: P.mid }}>This assignment is <strong style={{ color: P.red }}>overdue</strong>. Submit as soon as possible.</p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-0 mb-5 overflow-x-auto" style={{ borderBottom: `1px solid ${P.border}` }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="px-4 pb-3 pt-1 text-[13px] font-semibold whitespace-nowrap transition-colors"
              style={{
                background: "transparent", border: "none",
                color: tab === t.id ? P.text : P.muted,
                borderBottom: `2px solid ${tab === t.id ? P.blue : "transparent"}`,
                marginBottom: -1,
              }}>{t.l}</button>
          ))}
        </div>

        {/* ── BRIEF TAB ── */}
        {tab === "brief" && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${P.border}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-5 rounded-full" style={{ background: P.blue }} />
                  <div>
                    <p className="text-[15px] font-season" style={{ color: P.text }}>Instructions</p>
                    <p className="text-[11px] mt-0.5" style={{ color: P.muted }}>Set by {a.teacher} · From {a.sessionRef}</p>
                  </div>
                </div>
                <p className="text-[13.5px] leading-relaxed" style={{ color: P.mid }}>{a.brief}</p>
              </div>

              <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${P.border}` }}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-5 rounded-full" style={{ background: P.blue }} />
                    <p className="text-[15px] font-season" style={{ color: P.text }}>Marking Rubric</p>
                  </div>
                  <span className="text-[12px] font-bold" style={{ color: P.muted }}>Total: {totalMax} marks</span>
                </div>
                {a.rubric.map((r, i) => (
                  <div key={i} className="flex justify-between items-center py-3" style={{ borderBottom: i < a.rubric.length - 1 ? `1px solid ${P.borderSoft}` : "none" }}>
                    <p className="text-[13px]" style={{ color: P.mid }}>{r.criterion}</p>
                    <div className="flex items-center gap-2">
                      {r.scored !== undefined && <span className="text-[12.5px] font-bold" style={{ color: gradeColor(Math.round((r.scored/r.max)*100)) }}>{r.scored}</span>}
                      <span className="text-[12px]" style={{ color: P.muted }}>/ {r.max}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${P.border}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-5 rounded-full" style={{ background: P.blue }} />
                  <p className="text-[15px] font-season" style={{ color: P.text }}>Attached Files</p>
                </div>
                {a.attachments.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 py-3" style={{ borderBottom: i < a.attachments.length - 1 ? `1px solid ${P.borderSoft}` : "none" }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: P.blueSub, border: `1px solid ${P.blueMid}` }}>
                      <Svg d={D.file} s={14} className="text-[#2C3C69]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] font-semibold truncate" style={{ color: P.text }}>{f.name}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: P.muted }}>{f.type} · {f.size}</p>
                    </div>
                    <button onClick={() => downloadFile(f)} disabled={downloading === f.name}
                      className="px-2.5 py-1.5 rounded-md transition-colors hover:bg-[#EDF0F7] disabled:opacity-50"
                      style={{ color: P.blue }}>
                      {downloading === f.name ? <Svg d="" s={14} /> /* handle spinner if needed */ : <Svg d={D.dl} s={14} />}
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${P.border}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-5 rounded-full" style={{ background: P.blue }} />
                  <p className="text-[15px] font-season" style={{ color: P.text }}>Assigned By</p>
                </div>
                <div className="flex items-center gap-3">
                  <Av label={a.av} size={38} />
                  <div>
                    <p className="text-[13px] font-semibold" style={{ color: P.text }}>{a.teacher}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: P.muted }}>{a.subject} · {a.sessionRef}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SUBMIT TAB ── */}
        {tab === "submit" && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
            <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${P.border}` }}>
              {isPending && !submitted ? (
                <>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1 h-5 rounded-full" style={{ background: P.amber }} />
                    <div>
                      <p className="text-[15px] font-season" style={{ color: P.text }}>Your Submission</p>
                      <p className="text-[11px] mt-0.5" style={{ color: P.muted }}>Explain your work — your teacher will review this along with any files</p>
                    </div>
                  </div>
                  <textarea value={text} onChange={e => setText(e.target.value)}
                    placeholder="Write your response or notes about your submission…"
                    className="w-full h-40 p-4 rounded-xl text-[13px] outline-none custom-scrollbar"
                    style={{ border: `1px solid ${P.border}`, background: P.bg, color: P.text, resize: "none" }} />
                  
                  {selectedFile ? (
                    <div className="mt-4 p-4 rounded-xl flex items-center gap-4" style={{ border: `1px solid ${P.border}`, background: P.white }}>
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: P.blueSub, color: P.blue }}>
                        <Svg d={D.file} s={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold truncate" style={{ color: P.text }}>{selectedFile.name}</p>
                        <p className="text-[11.5px] mt-0.5" style={{ color: P.muted }}>{(selectedFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                      <button onClick={() => setSelectedFile(null)} 
                        className="px-3 py-1.5 rounded-md text-[12px] font-semibold transition-colors hover:bg-red-50"
                        style={{ color: P.red }}>
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input type="file" id="submission-file" className="hidden" onChange={handleFileSelect} />
                      <label htmlFor="submission-file"
                        className="mt-4 border-2 border-dashed rounded-xl p-6 text-center transition-colors hover:bg-gray-50 cursor-pointer block"
                        style={{ borderColor: P.border, background: P.white }}>
                        <div className="flex justify-center mb-2" style={{ color: P.muted }}><Svg d={D.upload} s={20} /></div>
                        <p className="text-[13px] font-semibold" style={{ color: P.mid }}>Click to upload file</p>
                        <p className="text-[11.5px] mt-1" style={{ color: P.muted }}>PDF, DOC, PY, JPG — max 20 MB</p>
                      </label>
                    </div>
                  )}

                  <div className="mt-5 flex justify-end gap-3">
                    <button className="px-5 py-2.5 rounded-full text-[12.5px] font-semibold transition-colors hover:bg-gray-50"
                      style={{ border: `1px solid ${P.border}`, color: P.mid }}>Save draft</button>
                    <button onClick={() => setSub(true)}
                      className="px-5 py-2.5 rounded-full text-[12.5px] font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ background: P.blue }}>Submit Assignment →</button>
                  </div>
                </>
              ) : submitted ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white" style={{ background: P.green }}>
                    <Svg d={D.check} s={24} />
                  </div>
                  <p className="text-[17px] font-season mb-1" style={{ color: P.text }}>Submitted successfully</p>
                  <p className="text-[13px]" style={{ color: P.muted }}>Your teacher will review it. You'll be notified when feedback is ready.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1 h-5 rounded-full" style={{ background: P.green }} />
                    <div>
                      <p className="text-[15px] font-season" style={{ color: P.text }}>Submitted Work</p>
                      <p className="text-[11px] mt-0.5" style={{ color: P.muted }}>On {a.submission?.submittedOn}</p>
                    </div>
                  </div>
                  <p className="text-[13.5px] leading-relaxed pl-3 mb-5" style={{ color: P.mid, borderLeft: `3px solid ${P.borderSoft}` }}>
                    {a.submission?.text}
                  </p>
                  {a.submission?.file && (
                    <div className="flex items-center gap-3 p-3.5 rounded-xl" style={{ background: P.bg, border: `1px solid ${P.border}` }}>
                      <Svg d={D.file} s={16} className="text-[#2C3C69]" />
                      <span className="text-[12px] font-medium text-gray-500">Submitted: {a.submission?.submittedOn}</span>
                      <button 
                        onClick={() => a.submission && downloadFile({ name: a.submission.file, type: 'FILE', size: '10 KB' })} 
                        className="text-[11.5px] font-bold" style={{ color: P.blue }}>
                        Download
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="bg-white rounded-2xl p-5 self-start" style={{ border: `1px solid ${P.border}` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 rounded-full" style={{ background: P.amber }} />
                <p className="text-[15px] font-season" style={{ color: P.text }}>Tips</p>
              </div>
              <ul className="flex flex-col gap-3">
                {["Re-read rubric before submitting", "Show all working for partial credit", "Ensure files open correctly", "Submit early to avoid issues"].map((tip, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: P.amber }} />
                    <span className="text-[12.5px] leading-relaxed" style={{ color: P.mid }}>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ── FEEDBACK TAB ── */}
        {tab === "feedback" && hasGrade && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${P.border}` }}>
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-5 rounded-full" style={{ background: P.blue }} />
                    <div>
                      <p className="text-[15px] font-season" style={{ color: P.text }}>Teacher's Feedback</p>
                      <p className="text-[11px] mt-0.5" style={{ color: P.muted }}>From {a.teacher}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[28px] font-season leading-none" style={{ color: gradeColor(a.grade!) }}>{a.grade}%</p>
                    <p className="text-[11px] font-bold mt-1" style={{ color: P.muted }}>Grade {gradeLabel(a.grade!)}</p>
                  </div>
                </div>
                <p className="text-[13.5px] leading-relaxed pl-3 mb-6" style={{ color: P.mid, borderLeft: `3px solid ${P.borderSoft}` }}>
                  {a.feedback?.summary}
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-5 rounded-full" style={{ background: P.amber }} />
                  <p className="text-[14px] font-season" style={{ color: P.text }}>Areas to Improve</p>
                </div>
                <div className="flex flex-col gap-3">
                  {a.feedback?.improvements.map((imp, i) => (
                    <div key={i} className="flex gap-3 items-start pb-3" style={{ borderBottom: i < a.feedback!.improvements.length - 1 ? `1px solid ${P.borderSoft}` : "none" }}>
                      <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ background: P.amber }} />
                      <p className="text-[13px] leading-relaxed" style={{ color: P.mid }}>{imp}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${P.border}` }}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-5 rounded-full" style={{ background: P.blue }} />
                    <p className="text-[15px] font-season" style={{ color: P.text }}>Rubric Scores</p>
                  </div>
                  <span className="text-[13px] font-bold" style={{ color: gradeColor(Math.round((totalScore/totalMax)*100)) }}>{totalScore}/{totalMax}</span>
                </div>
                <div className="flex flex-col gap-4">
                  {a.rubric.map((r, i) => (
                    <div key={i}>
                      <p className="text-[12.5px] mb-2" style={{ color: P.mid }}>{r.criterion}</p>
                      <Bar score={r.scored || 0} max={r.max} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl p-5 text-center" style={{ border: `1px solid ${P.border}` }}>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: P.muted }}>Final Grade</p>
                <div className="relative w-[88px] h-[88px] mx-auto mb-4">
                  <svg width="88" height="88" viewBox="0 0 88 88">
                    <circle cx="44" cy="44" r="34" fill="none" stroke={P.borderSoft} strokeWidth="8"/>
                    <circle cx="44" cy="44" r="34" fill="none" stroke={gradeColor(a.grade!)} strokeWidth="8"
                      strokeDasharray={`${(a.grade! / 100) * 214} 214`} strokeLinecap="round" transform="rotate(-90 44 44)" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-[18px] font-season" style={{ color: gradeColor(a.grade!) }}>{a.grade}%</p>
                  </div>
                </div>
                <p className="text-[20px] font-season" style={{ color: P.text }}>Grade {gradeLabel(a.grade!)}</p>
                <p className="text-[11px] mt-0.5" style={{ color: P.muted }}>{totalScore}/{totalMax} marks</p>
              </div>

              <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${P.border}` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-1 h-5 rounded-full" style={{ background: P.blue }} />
                  <p className="text-[14px] font-season" style={{ color: P.text }}>Osmium Note</p>
                </div>
                <p className="text-[12.5px] leading-relaxed" style={{ color: P.mid }}>{a.feedback?.aiNote}</p>
              </div>
            </div>
          </div>
        )}

        <div className="h-8" />
      </div>
    </div>
  );
}

/* ════════ ROOT PAGE ════════ */
export default function AssignmentPage() {
  const [sidebarOpen, setSidebarOpen]             = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selected, setSelected]                   = useState<Assignment | null>(null);

  return (
    <div className="flex h-screen overflow-hidden font-matter" style={{ background: P.bg }}>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setMobileSidebarOpen(false)} />
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
        {!selected && (
          <div className="px-5 md:px-7 py-4 md:py-6 mt-14 md:mt-0">
            <Header title="Assignments" titleAccent="" titleSuffix="" subtitle="Friday, 14 March" hideRightTools={true} />
          </div>
        )}

        {/* Scrollable container */}
        {selected ? (
          <DetailView a={selected} onBack={() => setSelected(null)} />
        ) : (
          <div className="flex-1 overflow-y-auto px-4 md:px-6 py-5 custom-scrollbar">
            <ListView onOpen={a => setSelected(a)} />
            <div className="h-8" />
          </div>
        )}
      </main>
    </div>
  );
}
