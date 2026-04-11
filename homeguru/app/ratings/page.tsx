"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Menu } from "lucide-react";

// Centralized Sarvam Brand Colors (same as Payments page)
const P = {
  white: "#FFFFFF",
  bg: "#FFFFFF",
  text: "#0F1117",
  muted: "#6B7280",
  line: "#E5E7EB",
  borderSoft: "rgba(0,0,0,0.05)",
  hover: "#F9FAFB",
  blue: "#2C3C69",       // Deep indigo/navy from Sarvam
  amberDark: "#B45309",  // Deep amber for highlights
  green: "#059669",      // Success green
  red: "#DC2626",        // Destructive red
  amber: "#D97706",
};

// SVG Icon Helper
const Svg = ({ d, s = 15, className = "" }: { d: React.ReactNode, s?: number, className?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{d}</svg>
);

const D = {
  back: <polyline points="15 18 9 12 15 6" />,
  check: <polyline points="20 6 9 17 4 12" />,
};

// Data models
const SESSIONS_RATED = [
  {
    id: 1, title: "English Speaking — Storytelling", subject: "English", subColor: "#F97316", teacher: "Cercei Lannister", av: "CL", date: "Mar 8, 2026", ago: "6 days ago", myRating: 5, myReview: "Cercei is fantastic — she made storytelling feel natural and corrected my intonation in real time without breaking my flow.", myTags: ["Clear explanations", "Patient", "Engaging"],
    tf: {
      text: "Varun's storytelling fluency improved noticeably. Pronunciation of multi-syllable words needs attention — particularly words ending in '-tion'. Intonation arc is getting there.", progressScore: 78, progressLabel: "Good Progress", progressColor: P.green,
      skills: [{ s: "Pronunciation", v: 72, p: 65 }, { s: "Fluency", v: 78, p: 70 }, { s: "Grammar", v: 85, p: 83 }, { s: "Vocabulary", v: 88, p: 80 }],
      strengths: ["Excellent vocabulary range", "Strong narrative structure", "Good use of transition phrases"],
      improvements: ["Slow down on multi-syllable words", "Work on the /ɪ/ vs /iː/ distinction", "More varied sentence openers"]
    }
  },
  {
    id: 2, title: "Python Functions & Closures", subject: "Python", subColor: "#0EA5E9", teacher: "Aditya Kulkarni", av: "AK", date: "Mar 5, 2026", ago: "9 days ago", myRating: 5, myReview: "One of the clearest explanations of closures I've ever seen. The factory function analogy clicked immediately.", myTags: ["Expert knowledge", "Great analogies", "Builds concepts well"],
    tf: {
      text: "Varun grasped closures faster than expected. Decorators need another full session. Push him toward building something practical before we move to class-based patterns.", progressScore: 82, progressLabel: "Strong", progressColor: P.green,
      skills: [{ s: "Concept grasp", v: 91, p: 84 }, { s: "Code quality", v: 77, p: 72 }, { s: "Problem solving", v: 75, p: 68 }, { s: "Debugging", v: 60, p: 55 }],
      strengths: ["Very fast conceptual uptake", "Clean code style", "Good at asking the right questions"],
      improvements: ["Decorators need dedicated practice", "Work on error handling", "Add docstrings consistently"]
    }
  },
  {
    id: 3, title: "Laws of Motion — Numericals", subject: "Physics", subColor: "#6366F1", teacher: "Ms. Priya Kapoor", av: "PK", date: "Mar 2, 2026", ago: "12 days ago", myRating: 4, myReview: "Very thorough session on Newton's laws. Priya's FBD approach was helpful but we rushed through Atwood machine problems at the end.", myTags: ["Thorough", "Clear diagrams", "Well prepared"],
    tf: {
      text: "Conceptual understanding is solid. The main gap is numerical accuracy under time pressure — small arithmetic errors that cascade. Timed practice recommended.", progressScore: 65, progressLabel: "Building", progressColor: P.amberDark,
      skills: [{ s: "Concept clarity", v: 80, p: 72 }, { s: "Numerical accuracy", v: 55, p: 50 }, { s: "Diagram drawing", v: 65, p: 58 }, { s: "Problem approach", v: 70, p: 65 }],
      strengths: ["Strong conceptual base", "Free body diagrams improving", "Good at identifying forces"],
      improvements: ["Slow down arithmetic — check each step", "Practice Atwood machine problems daily", "Review unit conversions"]
    }
  },
];

const PENDING = [{ id: "p1", title: "Network Security Basics", subject: "Python", subColor: "#0EA5E9", teacher: "Cercei Lannister", av: "CL", date: "Mar 11, 2026", ago: "3 days ago" }];

const TEACHER_SUM = [
  { name: "Cercei Lannister", av: "CL", subject: "English", subColor: "#F97316", sessions: 8, avgRating: 4.8, avgProgress: 76 },
  { name: "Aditya Kulkarni", av: "AK", subject: "Python", subColor: "#0EA5E9", sessions: 5, avgRating: 4.9, avgProgress: 80 },
  { name: "Ms. Priya Kapoor", av: "PK", subject: "Physics", subColor: "#6366F1", sessions: 4, avgRating: 3.8, avgProgress: 58 },
];


// --- Components ---

function Avatar({ label, size = 32 }: { label: string, size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full font-bold flex-shrink-0"
      style={{
        width: size, height: size,
        backgroundColor: '#F3F4F6',
        border: `1px solid ${P.line}`,
        color: P.blue,
        fontSize: size * 0.35
      }}>
      {label}
    </div>
  );
}

function Stars({ rating, size = 16, interactive = false, onChange }: { rating: number, size?: number, interactive?: boolean, onChange?: (n: number) => void }) {
  const [hov, setHov] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <svg key={n} width={size} height={size} viewBox="0 0 24 24"
          fill={interactive ? ((hov || 0) >= n ? P.amberDark : "none") : (rating >= n ? P.amberDark : "none")}
          stroke={rating >= n || hov >= n ? P.amberDark : P.line}
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`transition-colors ${interactive ? "cursor-pointer" : ""}`}
          onMouseEnter={() => interactive && setHov(n)}
          onMouseLeave={() => interactive && setHov(0)}
          onClick={() => interactive && onChange && onChange(n)}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function SkillBar({ score, prev }: { score: number, prev: number | null | undefined }) {
  const c = score >= 75 ? P.green : score >= 50 ? P.amber : P.red;
  const delta = prev !== null && prev !== undefined ? score - prev : null;
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div style={{ width: `${score}%`, backgroundColor: c }} className="h-full rounded-full transition-all duration-500" />
      </div>
      <span className="text-[12px] font-bold min-w-[32px] text-right" style={{ color: c }}>{score}%</span>
      {delta !== null && (
        <span className={`text-[11px] font-bold min-w-[28px] text-right ${delta > 0 ? 'text-green-600' : 'text-red-500'}`}>
          {delta > 0 ? "+" : ""}{delta}
        </span>
      )}
    </div>
  );
}

// --- Main Views ---

function DetailPage({ s, onBack }: { s: any, onBack: () => void }) {
  const [tab, setTab] = useState("feedback");
  const [myRating, setMyRating] = useState(s.myRating);
  const [myReview, setMyReview] = useState(s.myReview);

  const tf = s.tf;
  const cardStyle = "bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm";

  return (
    <main className="flex-1 h-screen overflow-y-auto min-w-0 bg-white">
      {/* Topbar */}
      <div className="py-4 md:py-6 px-6 md:px-8 flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full border border-[#E5E7EB] flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors shrink-0">
          <Svg d={D.back} />
        </button>
        <div className="min-w-0">
          <h1 className="text-[20px] md:text-[22px] font-bold text-gray-900 leading-tight font-season truncate">Ratings & Feedback</h1>
          <p className="text-[12px] text-gray-500 truncate">{s.subject} · {s.teacher} · {s.date}</p>
        </div>
      </div>

      <div className="px-6 md:px-8 pb-8">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* Top Stats */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { l: "My rating", val: <Stars rating={s.myRating} /> },
              { l: "Progress score", val: <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ background: tf.progressColor }} /><span className="text-2xl font-bold font-season text-[#2C3C69]">{tf.progressScore}%</span></div> },
              { l: "Skills assessed", val: <span className="text-2xl font-bold font-season text-[#2C3C69]">{tf.skills.length}</span> },
              { l: "Strengths noted", val: <span className="text-2xl font-bold font-season text-[#2C3C69]">{tf.strengths.length}</span> },
            ].map((x, i) => (
              <div key={i} className={cardStyle}>
                <p className="text-[12px] text-gray-400 font-semibold uppercase tracking-wider mb-2">{x.l}</p>
                {x.val}
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-[#E5E7EB]">
            {[
              { id: "feedback", l: "Teacher's Feedback" },
              { id: "myrating", l: "My Rating" },
              { id: "progress", l: "Skill Progress" }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`pb-3 px-1 text-[13.5px] font-bold transition-colors border-b-2 ${tab === t.id ? 'border-[#B45309] text-[#2C3C69]' : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}>
                {t.l}
              </button>
            ))}
          </div>

          {/* Tab Content: Feedback */}
          {tab === "feedback" && (
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-5">
                {/* Teacher Note */}
                <div className={cardStyle}>
                  <div className="flex items-start gap-4 mb-5">
                    <Avatar label={s.av} size={42} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-[15px] text-[#2C3C69]">{s.teacher}</span>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Tutor</span>
                      </div>
                      <p className="text-[12px] text-gray-500">{s.ago} · {s.title}</p>
                    </div>
                    <div className="text-center bg-gray-50 border border-[#E5E7EB] rounded-xl px-4 py-2">
                      <p className="text-xl font-bold font-season" style={{ color: tf.progressColor }}>{tf.progressScore}%</p>
                      <p className="text-[10px] uppercase tracking-wider font-bold mt-0.5" style={{ color: tf.progressColor }}>{tf.progressLabel}</p>
                    </div>
                  </div>
                  <div className="pl-4 border-l-2 border-[#E5E7EB]">
                    <p className="text-[14px] text-gray-600 leading-relaxed m-0">{tf.text}</p>
                  </div>
                </div>

                {/* Strengths */}
                <div className={cardStyle}>
                  <h3 className="font-bold text-[14px] text-[#2C3C69] mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-green-500 rounded-full" /> Strengths Identified
                  </h3>
                  <div className="space-y-3">
                    {tf.strengths.map((str: string, i: number) => (
                      <div key={i} className="flex gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5"><Svg d={D.check} s={10} /></div>
                        <p className="text-[13.5px] text-gray-600 leading-relaxed m-0">{str}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Improvements */}
                <div className={cardStyle}>
                  <h3 className="font-bold text-[14px] text-[#2C3C69] mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-amber-500 rounded-full" /> Areas to Work On
                  </h3>
                  <div className="space-y-3">
                    {tf.improvements.map((imp: string, i: number) => (
                      <div key={i} className="flex gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                        <p className="text-[13.5px] text-gray-600 leading-relaxed m-0">{imp}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-5">
                <div className={cardStyle}>
                  <h3 className="font-bold text-[13px] text-gray-800 uppercase tracking-wider mb-5">Skill Snapshot</h3>
                  <div className="space-y-4">
                    {tf.skills.map((r: any) => (
                      <div key={r.s}>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-[12.5px] font-medium text-gray-700">{r.s}</span>
                        </div>
                        <SkillBar score={r.v} prev={r.p} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className={cardStyle}>
                  <h3 className="font-bold text-[13px] text-gray-800 uppercase tracking-wider mb-5">Session Info</h3>
                  <div className="space-y-3 divide-y divide-[#E5E7EB]">
                    {[
                      { l: "Session", v: s.title },
                      { l: "Subject", v: s.subject },
                      { l: "Teacher", v: s.teacher },
                      { l: "Date", v: s.date }
                    ].map((x, i) => (
                      <div key={i} className="pt-3 first:pt-0 flex justify-between items-center gap-4">
                        <span className="text-[12px] text-gray-500 shrink-0">{x.l}</span>
                        <span className="text-[12.5px] font-bold text-right text-gray-800 truncate">{x.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: My Rating */}
          {tab === "myrating" && (
            <div className="grid grid-cols-3 gap-6">
              <div className={`col-span-2 ${cardStyle} p-6`}>
                <h3 className="font-bold text-[16px] text-[#2C3C69] mb-1">Your Rating</h3>
                <p className="text-[12.5px] text-gray-500 mb-6">Rating you gave {s.teacher} for this session</p>

                <div className="flex items-center gap-4 pb-6 mb-6 border-b border-[#E5E7EB]">
                  <Stars rating={myRating} size={28} interactive onChange={setMyRating} />
                  <span className="text-3xl font-bold font-season text-[#2C3C69]">{myRating}.0</span>
                  <span className="text-[13px] text-gray-400 font-medium">out of 5</span>
                </div>

                <div className="space-y-4">
                  <label className="block text-[13px] font-bold text-gray-800">Your written review</label>
                  <textarea
                    value={myReview}
                    onChange={e => setMyReview(e.target.value)}
                    className="w-full h-32 p-4 border border-[#E5E7EB] rounded-xl text-[13.5px] text-gray-700 resize-none outline-none focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309] transition-all"
                  />

                  <div className="flex flex-wrap gap-2 pt-2">
                    {["Clear explanations", "Patient", "Great analogies", "Engaging", "Expert knowledge", "Practical exercises", "Well prepared", "Builds concepts well"].map(tag => {
                      const isSelected = s.myTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          className={`px-3 py-1.5 rounded-full text-[12px] font-bold border transition-colors ${isSelected
                            ? "bg-[#2C3C69] text-white border-[#2C3C69]"
                            : "bg-white text-gray-600 border-[#E5E7EB] hover:border-gray-300"
                            }`}>
                          {tag}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button className="px-6 py-2.5 rounded-full bg-[#2C3C69] text-white font-bold text-[13px] hover:opacity-90 transition-opacity">
                      Update Rating
                    </button>
                  </div>
                </div>
              </div>

              <div className={`${cardStyle} h-fit`}>
                <h3 className="font-bold text-[13px] text-gray-800 uppercase tracking-wider mb-5">Tags You Chose</h3>
                <div className="space-y-3">
                  {s.myTags.map((t: string, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B45309] shrink-0" />
                      <span className="text-[13px] font-medium text-gray-700">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Progress */}
          {tab === "progress" && (
            <div className={`${cardStyle} max-w-3xl`}>
              <h3 className="font-bold text-[16px] text-[#2C3C69] mb-1">Skill Progress Breakdown</h3>
              <p className="text-[12.5px] text-gray-500 mb-8 border-b border-[#E5E7EB] pb-4">Detailed view of your skill improvements assessed by {s.teacher}</p>

              <div className="space-y-6">
                {tf.skills.map((r: any, i: number) => {
                  const delta = r.p !== null && r.p !== undefined ? r.v - r.p : null;
                  return (
                    <div key={r.s} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-[14px] text-gray-800">{r.s}</span>
                        <div className="flex items-center gap-4">
                          {r.p && <span className="text-[12px] text-gray-500">Previous: {r.p}%</span>}
                          {delta !== null && (
                            <span className={`text-[12px] font-bold px-2 py-0.5 rounded-md ${delta > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                              {delta > 0 ? "+" : ""}{delta} pts
                            </span>
                          )}
                        </div>
                      </div>
                      <SkillBar score={r.v} prev={r.p} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}

function MainPage({ onOpen }: { onOpen: (s: any) => void }) {
  const [filter, setFilter] = useState("All");
  const FILTERS = ["All", "English", "Physics", "Python"];

  const avgRating = (SESSIONS_RATED.reduce((a, r) => a + r.myRating, 0) / SESSIONS_RATED.length).toFixed(1);
  const avgProgress = Math.round(SESSIONS_RATED.reduce((a, r) => a + r.tf.progressScore, 0) / SESSIONS_RATED.length);
  const filtered = SESSIONS_RATED.filter(s => filter === "All" || s.subject === filter);

  const cardStyle = "bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm";

  return (
    <main className="flex-1 h-screen overflow-y-auto min-w-0 bg-white">
      {/* Global Header */}
      <div className="px-6 md:px-8 py-4 md:py-6 mt-14 md:mt-0">
        <Header title="Ratings & Feedback" titleAccent="" titleSuffix="" subtitle="Manage ratings you've given and review teacher feedback." hideRightTools={true} />
      </div>

      <div className="px-6 md:px-8 pb-8">
        <div className="max-w-6xl mx-auto">

          {/* Stats Overview */}
          <div className="grid grid-cols-4 gap-5 mb-8">
            {[
              { n: SESSIONS_RATED.length, l: "Sessions Rated", t: `${PENDING.length} pending` },
              { n: avgRating, l: "Avg Rating Given", t: "Out of 5.0" },
              { n: `${avgProgress}%`, l: "Avg Progress Score", t: "Teacher Assessed" },
              { n: TEACHER_SUM.length, l: "Tutors Rated", t: "Across 3 subjects" },
            ].map((s, i) => (
              <div key={i} className={cardStyle}>
                <p className="text-[11.5px] uppercase tracking-wider font-bold text-gray-400 mb-3">{s.l}</p>
                <p className="text-3xl font-season font-bold text-[#2C3C69] mb-1">{s.n}</p>
                <p className="text-[12px] text-gray-500 font-medium">{s.t}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

            {/* Left Column (Main List) */}
            <div className="lg:col-span-2 space-y-6">

              {/* Filter */}
              <div className="flex gap-2 mb-2">
                {FILTERS.map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-full text-[13px] font-bold border transition-colors ${filter === f
                      ? "bg-[#2C3C69] text-white border-[#2C3C69]"
                      : "bg-white text-gray-600 border-[#E5E7EB] hover:border-gray-300"
                      }`}>
                    {f === "All" ? "All Subjects" : f}
                  </button>
                ))}
              </div>

              {/* History Table */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-[#E5E7EB]">
                  <p className="col-span-5 text-[11.5px] font-bold text-gray-500 uppercase tracking-wider m-0">Session Details</p>
                  <p className="col-span-3 text-[11.5px] font-bold text-gray-500 uppercase tracking-wider m-0">Teacher</p>
                  <p className="col-span-2 text-[11.5px] font-bold text-gray-500 uppercase tracking-wider m-0">Progress</p>
                  <p className="col-span-2 text-[11.5px] font-bold text-gray-500 uppercase tracking-wider m-0 text-right">My Rating</p>
                </div>

                <div className="divide-y divide-[#E5E7EB]">
                  {filtered.map(s => (
                    <div
                      key={s.id}
                      onClick={() => onOpen(s)}
                      className="grid grid-cols-12 gap-4 px-6 py-4 items-center cursor-pointer hover:bg-gray-50 transition-colors group">

                      <div className="col-span-5 flex items-center gap-3 min-w-0">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.subColor }} />
                        <div className="min-w-0">
                          <p className="text-[13.5px] font-bold text-gray-900 m-0 truncate group-hover:text-[#B45309] transition-colors">{s.title}</p>
                          <p className="text-[12px] text-gray-500 m-0 mt-0.5">{s.ago} · {s.subject}</p>
                        </div>
                      </div>

                      <div className="col-span-3 flex items-center gap-2.5 min-w-0">
                        <Avatar label={s.av} size={24} />
                        <p className="text-[13px] font-medium text-gray-700 m-0 truncate">{s.teacher}</p>
                      </div>

                      <div className="col-span-2 flex items-center gap-2">
                        <span className="text-[13px] font-bold" style={{ color: s.tf.progressColor }}>{s.tf.progressScore}%</span>
                      </div>

                      <div className="col-span-2 flex items-center justify-end gap-3">
                        <Stars rating={s.myRating} />
                      </div>
                    </div>
                  ))}
                  {filtered.length === 0 && (
                    <div className="p-10 text-center text-gray-500 font-medium text-[13.5px]">No ratings found for the selected filter.</div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column (Insights) */}
            <div className="space-y-6">

              {/* Tutors */}
              <div className={cardStyle}>
                <h3 className="font-bold text-[14px] text-[#2C3C69] uppercase tracking-wider mb-6">Your Tutors</h3>
                <div className="space-y-5 divide-y divide-[#E5E7EB]">
                  {TEACHER_SUM.map((t, i) => (
                    <div key={t.name} className="pt-5 first:pt-0">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar label={t.av} size={36} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13.5px] font-bold text-gray-900 m-0 truncate">{t.name}</p>
                          <p className="text-[11.5px] text-gray-500 m-0">{t.subject} · {t.sessions} sessions</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-gray-500">Average Rating:</span>
                        <Stars rating={Math.round(t.avgRating)} size={12} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default function RatingsFeedbackPage() {
  const [sel, setSel] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white text-[#0F1117] font-matter selection:bg-[#B45309] selection:text-white overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block shrink-0">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full z-50 md:hidden">
            <Sidebar isOpen={true} setIsOpen={() => setMobileSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* Main Content Areas */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative min-w-0">
        {/* Mobile Menu Button - Fixed to Top Left */}
        {!mobileSidebarOpen && (
          <div className="md:hidden fixed top-4 left-4 z-50">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
              aria-label="Toggle menu"
            >
              <Menu size={20} />
            </button>
          </div>
        )}

        {sel ? <DetailPage s={sel} onBack={() => setSel(null)} /> : <MainPage onOpen={s => setSel(s as any)} />}
      </div>
    </div>
  );
}
