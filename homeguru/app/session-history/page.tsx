"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Menu, X } from "lucide-react";

/* ─── Colour tokens — matches roadmap page ─── */
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
  white:      "#FFFFFF",
  bg:         "#FFFFFF",
  border:     "#E5E7EB",
  borderSoft: "#F3F4F6",
  text:       "#0F1117",
  mid:        "#303A4F",
  muted:      "#6B7280",
};

/* score → navy / amber / amberDark */
function scoreColor(p: number) {
  return p >= 75 ? P.blue : p >= 50 ? P.amber : P.amberDark;
}
function pct(s: Session) { return Math.round((s.qs / s.qt) * 100); }

/* ─── Types ─── */
interface TopicScore { t: string; s: number; }
interface FileItem   { name: string; type: string; size: string; }
interface Session {
  id: number; title: string; subject: string;
  teacher: string; av: string;
  date: string; ago: string; time: string;
  dur: string; durMin: number;
  qs: number; qt: number; files: number; rec: boolean;
  summary: string[]; actions: string[]; teacherNote: string;
  topicScores: TopicScore[]; fileList: FileItem[];
}

/* ─── Data ─── */
const SESSIONS: Session[] = [
  {
    id: 1, title: "Network Security Basics", subject: "Python",
    teacher: "Cercei Lannister", av: "CL",
    date: "Mar 11, 2026", ago: "2 days ago", time: "2:00 – 3:30 PM",
    dur: "1h 30m", durMin: 90, qs: 6, qt: 15, files: 3, rec: true,
    summary: [
      "Covered OSI model layers focusing on Transport and Network",
      "Explored TCP/IP handshake and packet inspection fundamentals",
      "Compared stateful vs stateless firewall filtering approaches",
      "Hands-on: analyzed .pcap file to identify suspicious traffic",
    ],
    actions: [
      "Complete the pcap analysis exercise from shared files",
      "Read Chapter 4 on encryption protocols",
      "Retake quiz — focus on OSI layers 3 & 4",
    ],
    teacherNote: "Varun showed strong conceptual grasp of the OSI model but needs more practice with packet analysis. Recommend 30 min on Wireshark before next session.",
    topicScores: [
      { t: "OSI Model", s: 80 }, { t: "TCP/IP", s: 55 },
      { t: "Firewalls", s: 40 }, { t: "Packet Analysis", s: 30 },
    ],
    fileList: [
      { name: "Network_Security_Notes.pdf", type: "PDF", size: "2.4 MB" },
      { name: "Wireshark_exercise.pcap",    type: "FILE", size: "840 KB" },
      { name: "OSI_Reference_Sheet.pdf",    type: "PDF", size: "510 KB" },
    ],
  },
  {
    id: 2, title: "English Speaking — Storytelling", subject: "English",
    teacher: "Cercei Lannister", av: "CL",
    date: "Mar 8, 2026", ago: "5 days ago", time: "3:00 – 4:00 PM",
    dur: "1h 0m", durMin: 60, qs: 12, qt: 15, files: 1, rec: true,
    summary: [
      "Practiced narrative storytelling with past tense structures",
      "Worked on intonation and stress patterns in extended speech",
      "Vocabulary drill: descriptive adjectives and transition phrases",
      "Live exercise: 3-minute unscripted story with real-time feedback",
    ],
    actions: [
      "Record a 2-minute story and self-review for fluency",
      "Learn 10 transition phrases from the vocabulary sheet",
    ],
    teacherNote: "Excellent session — Varun's storytelling fluency improved noticeably. Pronunciation of multi-syllable words still needs attention. Keep the 3-day practice cadence.",
    topicScores: [
      { t: "Pronunciation", s: 72 }, { t: "Vocabulary", s: 88 },
      { t: "Grammar", s: 85 },       { t: "Fluency", s: 78 },
    ],
    fileList: [{ name: "Vocabulary_Storytelling.pdf", type: "PDF", size: "1.1 MB" }],
  },
  {
    id: 3, title: "Python Functions & Closures", subject: "Python",
    teacher: "Aditya Kulkarni", av: "AK",
    date: "Mar 5, 2026", ago: "8 days ago", time: "11:00 AM – 12:15 PM",
    dur: "1h 15m", durMin: 75, qs: 9, qt: 12, files: 2, rec: true,
    summary: [
      "Deep dive into first-class and higher-order functions",
      "Closures explained via counter and factory function examples",
      "Introduced decorators as syntactic sugar over closures",
      "Covered functools.wraps and its importance for debugging",
    ],
    actions: [
      "Rewrite the counter exercise using a decorator",
      "Build a simple memoization decorator from scratch",
    ],
    teacherNote: "Varun grasped closures faster than expected. Decorators need another session. Push him toward a practical decorator project before next class.",
    topicScores: [
      { t: "First-class Fns", s: 91 }, { t: "Closures", s: 75 },
      { t: "Decorators", s: 58 },      { t: "functools", s: 45 },
    ],
    fileList: [
      { name: "Functions_Closures_Notes.pdf", type: "PDF", size: "1.8 MB" },
      { name: "Decorator_exercises.py", type: "CODE", size: "12 KB" },
    ],
  },
  {
    id: 4, title: "Laws of Motion — Numericals", subject: "Physics",
    teacher: "Ms. Priya Kapoor", av: "PK",
    date: "Mar 2, 2026", ago: "11 days ago", time: "4:00 – 5:00 PM",
    dur: "1h 0m", durMin: 60, qs: 7, qt: 10, files: 2, rec: false,
    summary: [
      "Solved 12 numericals across Newton's three laws of motion",
      "Covered free body diagram construction step by step",
      "Analyzed static vs kinetic friction with coefficient calculations",
      "Walked through Atwood machine problems end to end",
    ],
    actions: [
      "Solve problem set 3A from the shared sheet",
      "Draw free body diagrams for all 5 worksheet scenarios",
    ],
    teacherNote: "Conceptual understanding is solid. Numerical accuracy needs work — calculation errors under time pressure. Timed drills recommended.",
    topicScores: [
      { t: "Newton's Laws", s: 80 }, { t: "FBDs", s: 65 },
      { t: "Friction", s: 60 },      { t: "Atwood Machine", s: 50 },
    ],
    fileList: [
      { name: "Laws_of_Motion_Sheet.pdf", type: "PDF", size: "980 KB" },
      { name: "Problem_Set_3A.pdf", type: "PDF", size: "640 KB" },
    ],
  },
  {
    id: 5, title: "English — Consonant Clusters", subject: "English",
    teacher: "Cercei Lannister", av: "CL",
    date: "Feb 27, 2026", ago: "14 days ago", time: "2:00 – 3:00 PM",
    dur: "1h 0m", durMin: 60, qs: 11, qt: 15, files: 1, rec: true,
    summary: [
      "Focused on /str/, /spl/, /spr/ consonant cluster patterns",
      "Minimal pair drills to distinguish similar sounds precisely",
      "Mouth position and airflow mechanics for difficult sounds",
      "10-minute free conversation with real-time correction",
    ],
    actions: [
      "Practice consonant cluster audio exercises daily for 10 mins",
      "Record and submit minimal pair pronunciation before next class",
    ],
    teacherNote: "Strong improvement on /str/ clusters. The /spl/ pattern still requires daily drilling. Keep recordings for self-monitoring.",
    topicScores: [
      { t: "/str/ Clusters", s: 82 }, { t: "/spl/ Clusters", s: 55 },
      { t: "/spr/ Clusters", s: 68 }, { t: "Minimal Pairs", s: 74 },
    ],
    fileList: [{ name: "Pronunciation_Drills.pdf", type: "PDF", size: "750 KB" }],
  },
  {
    id: 6, title: "Kinematics — Motion in 2D", subject: "Physics",
    teacher: "Ms. Priya Kapoor", av: "PK",
    date: "Feb 24, 2026", ago: "17 days ago", time: "4:00 – 5:00 PM",
    dur: "1h 0m", durMin: 60, qs: 4, qt: 10, files: 1, rec: false,
    summary: [
      "Projectile motion theory and trajectory equations",
      "Horizontal vs vertical component decomposition",
      "Solved range, time-of-flight, and max-height problems",
    ],
    actions: [
      "Re-attempt the 5 unsolved projectile problems",
      "Review vector decomposition basics before next session",
    ],
    teacherNote: "Varun struggled with vector decomposition — a pre-requisite gap. Must revisit before moving to circular motion.",
    topicScores: [
      { t: "Projectile Theory", s: 50 },
      { t: "Vector Decomposition", s: 30 },
      { t: "Range Equations", s: 45 },
    ],
    fileList: [{ name: "Kinematics_2D_Notes.pdf", type: "PDF", size: "1.2 MB" }],
  },
];

/* ─── Animated score bar ─── */
function ScoreBar({ score }: { score: number }) {
  const c = scoreColor(score);
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: P.borderSoft }}>
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: `${score}%`, background: c }} />
      </div>
      <span className="text-[11.5px] font-bold min-w-[30px] text-right" style={{ color: c }}>{score}%</span>
    </div>
  );
}

/* ─── Avatar ─── */
function Av({ label, size = 28 }: { label: string; size?: number }) {
  return (
    <div className="rounded-full flex items-center justify-center shrink-0 font-bold"
      style={{ width: size, height: size, background: P.blueSub, border: `1px solid ${P.blueMid}`,
               fontSize: size * 0.34, color: P.blue }}>
      {label}
    </div>
  );
}

/* ════════ LIST VIEW ════════ */
function ListView({ onOpen }: { onOpen: (s: Session) => void }) {
  const [subj, setSubj]   = useState("All");
  const [query, setQuery] = useState("");
  const TABS = ["All", "English", "Physics", "Python"];

  const rows = SESSIONS.filter(s => {
    const ms = subj === "All" || s.subject === subj;
    const mq = !query || s.title.toLowerCase().includes(query.toLowerCase()) ||
               s.teacher.toLowerCase().includes(query.toLowerCase());
    return ms && mq;
  });

  const totalMins = SESSIONS.reduce((a, s) => a + s.durMin, 0);
  const avgPct    = Math.round(SESSIONS.reduce((a, s) => a + pct(s), 0) / SESSIONS.length);

  return (
    <>
      {/* ── Stats row (Match StatsCards.tsx layout) ── */}
      <div className="bg-white w-full mb-6" 
        style={{ 
          minHeight: '98px', 
          padding: '18px 24px', 
          border: '1px solid #E5E7EB',
          borderRadius: '16px'
        }}>
        <div className="grid grid-cols-1 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#F3F4F6] w-full gap-4 sm:gap-0">
          {[
            { n: SESSIONS.length,                             l: "Total Sessions",  trend: "↑ 4 this month", icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM172,48h12V80H160V48ZM48,48H72V80H48Z"/></svg> },
            { n: `${Math.floor(totalMins/60)}h ${totalMins%60}m`, l: "Total Learning",  trend: "↑ 3.5h this week", icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-16,0V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"/></svg> },
            { n: `${avgPct}%`,                                l: "Avg Quiz Score",  trend: "↑ 6% vs last month", icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M232,128a104,104,0,1,1-104-104A104.11,104.11,0,0,1,232,128Zm-192,0a88,88,0,1,0,88-88A88.1,88.1,0,0,0,40,128Z"/></svg> },
            { n: "94%",                                       l: "Attendance Rate", trend: "1 session missed", ok: false, icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/></svg> },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3.5 px-0 sm:px-6 py-2 sm:py-0">
              <div 
                className="rounded-2xl flex items-center justify-center shrink-0"
                style={{ width: '46px', height: '46px', background: 'transparent', color: '#111827' }}
              >
                {s.icon}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[#6B7280]" style={{ fontSize: '13px', lineHeight: '1' }}>{s.l}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[#111827] font-bold" style={{ fontSize: '21px', lineHeight: '1' }}>{s.n}</span>
                  <span 
                    className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                    style={{ color: '#6B7280', backgroundColor: '#F3F4F6' }}
                  >
                    {s.trend}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap gap-2">
          {TABS.map(t => (
            <button key={t} onClick={() => setSubj(t)}
              className="px-4 py-2 rounded-full text-[12.5px] font-medium transition-all duration-150"
              style={{
                background: subj === t ? P.blue : P.white,
                color:      subj === t ? "#fff"  : P.mid,
                border:     subj === t ? "none"  : `1px solid ${P.border}`,
              }}>
              {t === "All" ? "All Subjects" : t}
            </button>
          ))}
        </div>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="13" height="13" fill="none"
            viewBox="0 0 24 24" stroke={P.muted} strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search sessions…"
            className="pl-9 pr-4 h-9 text-[12.5px] rounded-xl outline-none"
            style={{ border: `1px solid ${P.border}`, background: P.white, color: P.text, width: 200 }} />
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: `1px solid ${P.border}` }}>
        {/* Head */}
        <div className="hidden md:grid px-5 py-3"
          style={{ gridTemplateColumns: "3fr 1.5fr 110px 90px 80px 70px 90px", background: P.bg, borderBottom: `1px solid ${P.border}` }}>
          {["Session", "Teacher", "Date", "Duration", "Quiz", "Files", ""].map((h, i) => (
            <p key={i} className="text-[10px] font-bold uppercase tracking-widest m-0" style={{ color: P.muted }}>{h}</p>
          ))}
        </div>

        {rows.map((s, idx) => {
          const p  = pct(s);
          const sc = scoreColor(p);
          return (
            <div key={s.id} onClick={() => onOpen(s)}
              className="cursor-pointer transition-colors duration-100 group"
              style={{ borderBottom: idx < rows.length - 1 ? `1px solid ${P.border}` : "none" }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = P.bg}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "transparent"}>

              {/* Mobile card layout */}
              <div className="md:hidden p-4 flex items-start gap-3">
                <Av label={s.av} size={36} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[13px] font-semibold leading-tight" style={{ color: P.text }}>{s.title}</p>
                    <span className="text-[11px] font-bold shrink-0" style={{ color: sc }}>{p}%</span>
                  </div>
                  <p className="text-[11px] mt-1" style={{ color: P.muted }}>{s.subject} · {s.teacher} · {s.ago}</p>
                </div>
              </div>

              {/* Desktop row */}
              <div className="hidden md:grid px-5 py-4 items-center"
                style={{ gridTemplateColumns: "3fr 1.5fr 110px 90px 80px 70px 90px" }}>

                {/* Title */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: P.blue }} />
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold truncate" style={{ color: P.text }}>{s.title}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: P.muted }}>{s.subject}</p>
                  </div>
                </div>

                {/* Teacher */}
                <div className="flex items-center gap-2 min-w-0">
                  <Av label={s.av} size={24} />
                  <p className="text-[12px] truncate" style={{ color: P.mid }}>{s.teacher}</p>
                </div>

                {/* Date */}
                <div>
                  <p className="text-[12px]" style={{ color: P.mid }}>{s.ago}</p>
                  <p className="text-[10.5px] mt-0.5" style={{ color: P.muted }}>{s.date}</p>
                </div>

                {/* Duration */}
                <p className="text-[12px]" style={{ color: P.mid }}>{s.dur}</p>

                {/* Quiz */}
                <span className="text-[13px] font-bold" style={{ color: sc }}>{s.qs}/{s.qt}</span>

                {/* Files + rec */}
                <div className="flex items-center gap-2">
                  <span className="text-[12px]" style={{ color: P.muted }}>{s.files}</span>
                  {s.rec && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill={P.blue}>
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  )}
                </div>

                {/* CTA */}
                <button onClick={e => { e.stopPropagation(); onOpen(s); }}
                  className="text-[11.5px] font-semibold px-3 py-1.5 rounded-full transition-colors hover:opacity-80"
                  style={{ background: P.blueSub, color: P.blue, border: `1px solid ${P.blueMid}` }}>
                  View →
                </button>
              </div>
            </div>
          );
        })}

        {rows.length === 0 && (
          <div className="py-14 text-center text-[13px]" style={{ color: P.muted }}>No sessions match your filter.</div>
        )}
      </div>
    </>
  );
}

/* ════════ DETAIL VIEW ════════ */
function DetailView({ s, onBack }: { s: Session; onBack: () => void }) {
  const [tab, setTab]   = useState("summary");
  const [done, setDone] = useState<number[]>([]);
  const [downloading, setDownloading] = useState<string | null>(null);
  const p  = pct(s);
  const sc = scoreColor(p);

  /* ── Working download: generates a blob and triggers native save dialog ── */
  function downloadFile(f: FileItem) {
    setDownloading(f.name);
    const ext = f.name.split(".").pop()?.toLowerCase() ?? "";

    let content = "";
    let mime    = "application/octet-stream";

    if (ext === "pdf") {
      mime    = "application/pdf";
      content = `%PDF-1.4
1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj
2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj
3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842]
   /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj
4 0 obj\n<< /Length 120 >>\nstream
BT /F1 14 Tf 72 770 Td (HomeGuru Session File) Tj 0 -24 Td
(${f.name}) Tj 0 -24 Td (Session: ${s.title}) Tj 0 -24 Td (Teacher: ${s.teacher}) Tj ET
endstream\nendobj
5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj
xref\n0 6\n0000000000 65535 f \ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n492\n%%EOF`;
    } else if (ext === "py") {
      mime    = "text/x-python";
      content = `# ${f.name}\n# Session: ${s.title}\n# Teacher: ${s.teacher}\n# Date: ${s.date}\n\n# --- Exercise file from HomeGuru ---\n\n# TODO: Complete the exercises below\n\ndef main():\n    pass\n\nif __name__ == "__main__":\n    main()\n`;
    } else {
      // .pcap and other binary-ish files — plain text placeholder
      mime    = "application/octet-stream";
      content = `HomeGuru Session Export\nFile: ${f.name}\nSession: ${s.title}\nTeacher: ${s.teacher}\nDate: ${s.date}\nSize: ${f.size}\n\n[Binary content placeholder — connect to your backend API to serve the real file]`;
    }

    const blob = new Blob([content], { type: mime });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = f.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloading(null), 800);
  }

  const TABS = [
    { id: "summary",  l: "AI Summary"        },
    { id: "quiz",     l: "Quiz Breakdown"     },
    { id: "actions",  l: "Action Items"       },
    { id: "files",    l: `Files (${s.files})` },
    { id: "feedback", l: "Teacher Note"       },
  ];

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Detail topbar */}
      <header className="bg-white border-b border-[#E5E7EB] px-5 md:px-7 h-[60px] flex items-center gap-4 shrink-0">
        <button onClick={onBack}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F3F4F6] transition-colors shrink-0"
          style={{ border: `1px solid ${P.border}` }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={P.mid} strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div className="min-w-0">
          <h1 className="text-[17px] font-season leading-tight truncate" style={{ color: P.text }}>{s.title}</h1>
          <p className="text-[11px]" style={{ color: P.muted }}>{s.subject} · {s.teacher} · {s.date}</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-5 custom-scrollbar">

        {/* Hero stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {[
            { n: s.dur,        l: "Duration",   accent: undefined },
            { n: `${s.qs}/${s.qt}`, l: "Quiz Score", accent: sc     },
            { n: `${s.files}`, l: "Files",      accent: undefined },
            { n: s.rec ? "Available" : "None", l: "Recording", accent: s.rec ? P.blue : undefined },
          ].map((x, i) => (
            <div key={i} className="bg-white rounded-2xl px-5 py-4" style={{ border: `1px solid ${P.border}` }}>
              <p className="text-[10.5px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: P.muted }}>{x.l}</p>
              <p className="text-[22px] font-season leading-none" style={{ color: x.accent || P.text }}>{x.n}</p>
            </div>
          ))}
        </div>

        {/* Watch recording button */}
        {s.rec && (
          <div className="flex justify-end mb-4">
            <button className="flex items-center gap-2 px-5 py-2 rounded-full text-[12.5px] font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: P.blue }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Watch Recording
            </button>
          </div>
        )}

        {/* Tab bar */}
        <div className="flex gap-0 mb-4 overflow-x-auto" style={{ borderBottom: `1px solid ${P.border}` }}>
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

        {/* ── AI Summary tab ── */}
        {tab === "summary" && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
            {/* Summary points */}
            <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${P.border}` }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-5 rounded-full" style={{ background: P.blue }} />
                <div>
                  <p className="text-[15px] font-season" style={{ color: P.text }}>AI Class Summary</p>
                  <p className="text-[11px] mt-0.5" style={{ color: P.muted }}>Generated by Osmium · {s.date}</p>
                </div>
              </div>
              {s.summary.map((pt, i) => (
                <div key={i} className="flex gap-4 py-3.5 items-start"
                  style={{ borderBottom: i < s.summary.length - 1 ? `1px solid ${P.borderSoft}` : "none" }}>
                  <span className="text-[10px] font-bold min-w-[18px] pt-0.5" style={{ color: P.blue }}>0{i+1}</span>
                  <p className="text-[13px] leading-relaxed" style={{ color: P.mid }}>{pt}</p>
                </div>
              ))}
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-4">
              {/* Score ring */}
              <div className="bg-white rounded-2xl p-5 text-center" style={{ border: `1px solid ${P.border}` }}>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: P.muted }}>Session Score</p>
                <div className="relative w-[88px] h-[88px] mx-auto mb-4">
                  <svg width="88" height="88" viewBox="0 0 88 88">
                    <circle cx="44" cy="44" r="34" fill="none" stroke={P.borderSoft} strokeWidth="8"/>
                    <circle cx="44" cy="44" r="34" fill="none" stroke={sc} strokeWidth="8"
                      strokeDasharray={`${p * 2.136} 214`} strokeLinecap="round"
                      transform="rotate(-90 44 44)"/>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-[18px] font-season" style={{ color: sc }}>{p}%</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-3" style={{ borderTop: `1px solid ${P.borderSoft}` }}>
                  {[{ n: s.qs, l: "Correct" }, { n: s.qt - s.qs, l: "Wrong" }].map((x, i) => (
                    <div key={i} className="rounded-xl py-2" style={{ background: P.bg }}>
                      <p className="text-[20px] font-season" style={{ color: P.text }}>{x.n}</p>
                      <p className="text-[10px]" style={{ color: P.muted }}>{x.l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Before next class */}
              <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${P.border}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-5 rounded-full" style={{ background: P.amber }} />
                  <p className="text-[14px] font-season" style={{ color: P.text }}>Before Next Class</p>
                </div>
                {s.actions.slice(0, 2).map((a, i) => (
                  <div key={i} className="flex gap-3 py-3 items-start"
                    style={{ borderBottom: i < 1 ? `1px solid ${P.borderSoft}` : "none" }}>
                    <div className="w-4 h-4 rounded-full shrink-0 mt-0.5" style={{ border: `1.5px solid ${P.border}` }} />
                    <p className="text-[12.5px] leading-relaxed" style={{ color: P.mid }}>{a}</p>
                  </div>
                ))}
                {s.actions.length > 2 && (
                  <button onClick={() => setTab("actions")}
                    className="mt-2 text-[11.5px] font-semibold hover:opacity-80 transition-opacity"
                    style={{ background: "none", border: "none", color: P.blue, cursor: "pointer", padding: 0 }}>
                    +{s.actions.length - 2} more →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Quiz tab ── */}
        {tab === "quiz" && (
          <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${P.border}` }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-1 h-5 rounded-full" style={{ background: P.blue }} />
                <div>
                  <p className="text-[15px] font-season" style={{ color: P.text }}>Quiz Topic Breakdown</p>
                  <p className="text-[11px] mt-0.5" style={{ color: P.muted }}>Score per topic tested in this session</p>
                </div>
              </div>
              <span className="text-[13px] font-bold" style={{ color: sc }}>{s.qs}/{s.qt} · {p}%</span>
            </div>
            <div className="flex flex-col gap-4">
              {s.topicScores.map(t => (
                <div key={t.t}>
                  <p className="text-[13px] mb-2" style={{ color: P.mid }}>{t.t}</p>
                  <ScoreBar score={t.s} />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-5 mt-5 pt-4" style={{ borderTop: `1px solid ${P.borderSoft}` }}>
              {[{ c: P.blue, l: "Strong ≥ 75%" }, { c: P.amber, l: "Average 50–75%" }, { c: P.amberDark, l: "Weak < 50%" }].map(x => (
                <div key={x.l} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-sm" style={{ background: x.c }} />
                  <span className="text-[11px]" style={{ color: P.muted }}>{x.l}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Actions tab ── */}
        {tab === "actions" && (
          <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${P.border}` }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-5 rounded-full" style={{ background: P.amber }} />
              <div>
                <p className="text-[15px] font-season" style={{ color: P.text }}>Action Items</p>
                <p className="text-[11px] mt-0.5" style={{ color: P.muted }}>Complete before your next session with {s.teacher}</p>
              </div>
            </div>
            {s.actions.map((a, i) => (
              <div key={i} onClick={() => setDone(d => d.includes(i) ? d.filter(x => x !== i) : [...d, i])}
                className="flex gap-3 py-4 items-center cursor-pointer group"
                style={{ borderBottom: i < s.actions.length - 1 ? `1px solid ${P.borderSoft}` : "none" }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-150"
                  style={{
                    border: `1.5px solid ${done.includes(i) ? P.blue : P.border}`,
                    background: done.includes(i) ? P.blue : "transparent",
                  }}>
                  {done.includes(i) && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <p className="text-[13.5px] leading-relaxed transition-all duration-150"
                  style={{ color: done.includes(i) ? P.muted : P.mid,
                           textDecoration: done.includes(i) ? "line-through" : "none" }}>{a}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Files tab ── */}
        {tab === "files" && (
          <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${P.border}` }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-5 rounded-full" style={{ background: P.blue }} />
              <div>
                <p className="text-[15px] font-season" style={{ color: P.text }}>Shared Files</p>
                <p className="text-[11px] mt-0.5" style={{ color: P.muted }}>{s.files} file{s.files > 1 ? "s" : ""} from this session</p>
              </div>
            </div>
            {s.fileList.map((f, i) => (
              <div key={i} className="flex items-center gap-3 py-3.5"
                style={{ borderBottom: i < s.fileList.length - 1 ? `1px solid ${P.borderSoft}` : "none" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: P.blueSub, border: `1px solid ${P.blueMid}` }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={P.blue} strokeWidth="1.75">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold truncate" style={{ color: P.text }}>{f.name}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: P.muted }}>{f.type} · {f.size}</p>
                </div>
                <button
                  onClick={() => downloadFile(f)}
                  disabled={downloading === f.name}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11.5px] font-semibold transition-all hover:opacity-75 disabled:opacity-60"
                  style={{ background: downloading === f.name ? P.blueMid : P.blueSub, color: P.blue, border: `1px solid ${P.blueMid}` }}>
                  {downloading === f.name ? (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  )}
                  {downloading === f.name ? "Saving…" : "Download"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── Teacher Note tab ── */}
        {tab === "feedback" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Teacher note */}
            <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${P.border}` }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-5 rounded-full" style={{ background: P.blue }} />
                <p className="text-[15px] font-season" style={{ color: P.text }}>Teacher's Note</p>
              </div>
              <div className="flex gap-4">
                <Av label={s.av} size={38} />
                <div>
                  <p className="text-[13px] font-semibold" style={{ color: P.text }}>{s.teacher}</p>
                  <p className="text-[11px] mb-3" style={{ color: P.muted }}>{s.date}</p>
                  <p className="text-[13px] leading-relaxed pl-3"
                    style={{ color: P.mid, borderLeft: `3px solid ${P.borderSoft}` }}>{s.teacherNote}</p>
                </div>
              </div>
            </div>

            {/* Rate session */}
            <div className="bg-white rounded-2xl p-5" style={{ border: `1px solid ${P.border}` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 rounded-full" style={{ background: P.amber }} />
                <p className="text-[15px] font-season" style={{ color: P.text }}>Rate This Session</p>
              </div>
              <p className="text-[12.5px] mb-4" style={{ color: P.muted }}>How useful was this session for your learning?</p>
              <div className="flex gap-2 mb-5">
                {[1,2,3,4,5].map(n => (
                  <button key={n} className="w-9 h-9 rounded-full flex items-center justify-center text-[18px] transition-colors hover:bg-[#FEF3C7]"
                    style={{ border: `1px solid ${P.border}`, color: P.amber }}>★</button>
                ))}
              </div>
              <textarea placeholder="Leave a comment for your teacher (optional)…"
                className="w-full resize-none outline-none text-[12.5px] px-3 py-2.5 rounded-xl"
                style={{ height: 80, border: `1px solid ${P.border}`, background: P.bg, color: P.text, boxSizing: "border-box" as const }} />
              <button className="mt-3 px-5 py-2 rounded-full text-[12.5px] font-semibold text-white transition-opacity hover:opacity-85"
                style={{ background: P.blue }}>
                Submit Feedback
              </button>
            </div>
          </div>
        )}

        <div className="h-8" />
      </div>
    </div>
  );
}

/* ════════ ROOT PAGE ════════ */
export default function SessionHistoryPage() {
  const [sidebarOpen, setSidebarOpen]             = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selected, setSelected]                   = useState<Session | null>(null);

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
            <Header title="Session History" titleAccent="" titleSuffix="" subtitle="Friday, 14 March" hideRightTools={true} />
          </div>
        )}

        {/* Scrollable content */}
        {selected ? (
          <DetailView s={selected} onBack={() => setSelected(null)} />
        ) : (
          <div className="px-4 md:px-6 py-5">
            <ListView onOpen={s => setSelected(s)} />
            <div className="h-8" />
          </div>
        )}
      </main>
    </div>
  );
}
