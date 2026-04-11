"use client";
import { useMemo, useEffect, useRef, useState, createContext, useContext } from "react";
import {
  Flame, Star, BookOpen, Bell, Video,
  Sparkles, Clock, Sun, Moon,
  Search, ChevronRight,
} from "lucide-react";

/* ── Dark mode context ── */
const DarkCtx = createContext(false);
const useDark = () => useContext(DarkCtx);

/* ── Data ── */
const student = { name: "Ravi", xp: 1240, streak: 7, sessions: 4, hours: 3.5 };

const tutors = [
  { name: "Ayush Soni", subject: "Mathematics", rating: 4.9, price: 499, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayush&backgroundColor=f8fafc" },
  { name: "Priya Menon", subject: "Physics", rating: 4.8, price: 399, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=f8fafc" },
  { name: "Ankit Kapoor", subject: "Literature", rating: 4.7, price: 349, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ankit&backgroundColor=f8fafc" },
];

const todayClasses = [
  { subject: "Advanced Calculus", tutor: "Ayush Soni", time: "10:00 AM", duration: "1 hr", isLive: true, color: "text-indigo-600", bg: "bg-indigo-50", darkBg: "bg-indigo-500/10", darkColor: "text-indigo-400" },
  { subject: "Quantum Mechanics", tutor: "Priya Menon", time: "2:30 PM", duration: "1 hr", isLive: false, color: "text-emerald-600", bg: "bg-emerald-50", darkBg: "bg-emerald-500/10", darkColor: "text-emerald-400" },
];

/* ══════════════════════════════════════════════════════════════ */
export default function StudentHomeTab() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("hg_dark_mode");
    if (saved === "true") setDark(true);
  }, []);

  const toggle = () => {
    setDark(prev => {
      localStorage.setItem("hg_dark_mode", String(!prev));
      return !prev;
    });
  };

  return (
    <DarkCtx.Provider value={dark}>
      <div className="min-h-screen font-sans pb-16 transition-colors duration-300" style={{ background: dark ? '#000' : '#F8FAFC', color: dark ? '#E5E5E5' : '#1e293b' }}>

        {/* ── Top App Bar ── */}
        <header className="sticky top-0 z-30 h-[72px] flex items-center px-6 gap-4 backdrop-blur-md border-b transition-colors duration-300" style={{ background: dark ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)', borderColor: dark ? '#1E1E1E' : '#e2e8f0cc' }}>
          <h1 className="text-xl font-bold tracking-tight flex-1 flex items-center gap-2" style={{ color: dark ? '#E5E5E5' : '#0f172a' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: dark ? '#E5E5E5' : '#0f172a' }}>
              <Sparkles size={16} style={{ color: dark ? '#000' : '#fff' }} />
            </div>
            LearnOS
          </h1>

          <div className="relative hidden md:block">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: dark ? '#5A5A5A' : '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search courses or tutors..."
              className="pl-10 pr-4 py-2.5 rounded-full text-sm font-medium outline-none transition-all w-72 border"
              style={{ background: dark ? '#111' : '#f1f5f9', color: dark ? '#E5E5E5' : '#0f172a', borderColor: dark ? '#2C2C2C' : 'transparent' }}
            />
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors border"
            style={{ background: dark ? '#111' : '#f8fafc', borderColor: dark ? '#2C2C2C' : '#e2e8f0' }}
          >
            {dark ? <Sun size={18} style={{ color: '#F59E0B' }} /> : <Moon size={18} style={{ color: '#64748b' }} />}
          </button>

          <button className="w-10 h-10 rounded-full flex items-center justify-center relative transition-colors border" style={{ background: dark ? '#111' : '#f8fafc', borderColor: dark ? '#2C2C2C' : '#e2e8f0' }}>
            <Bell size={18} style={{ color: dark ? '#8B8B8B' : '#475569' }} />
            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-rose-500 border" style={{ borderColor: dark ? '#000' : '#fff' }} />
          </button>
          <button onClick={() => window.location.href = '/student-profile'} className="w-10 h-10 rounded-full border cursor-pointer p-0 bg-transparent" style={{ borderColor: dark ? '#2C2C2C' : '#e2e8f0' }}>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi" alt="avatar" className="w-full h-full rounded-full" style={{ background: dark ? '#111' : '#f1f5f9' }} />
          </button>
        </header>

        <div className="px-4 sm:px-6 py-8 space-y-8 max-w-[1100px] mx-auto">

          {/* ── Greeting ── */}
          <div className="px-1 mt-6">
            <h2 className="text-3xl font-bold tracking-tight" style={{ color: dark ? '#E5E5E5' : '#0f172a' }}>
              Welcome back, {student.name}.
            </h2>
            <p className="text-base mt-1" style={{ color: dark ? '#8B8B8B' : '#64748b' }}>Let&apos;s pick up where you left off.</p>
          </div>

          <AiMatchBanner />

          {/* ═══ Stats — Folder Cards ═══ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <FolderCard grad={['#D9F0FB','#B8DFF5','#93CFEE']} darkAccent="#60A5FA" icon={<Flame size={36} />} title="Streak" sub="Keep going!" desc="Days in a row you've been learning" value={`${student.streak}`} unit="days" />
            <FolderCard grad={['#F8CCC6','#F2B5AC','#EA9A8E']} darkAccent="#F87171" icon={<Star size={36} />} title="XP Earned" sub="Total" desc="Points from classes & quizzes" value={`${student.xp}`} unit="XP" />
            <FolderCard grad={['#F6DDF6','#F0CDF0','#E8BBE8']} darkAccent="#A78BFA" icon={<BookOpen size={36} />} title="Classes" sub="This week" desc="Sessions completed so far" value={`${student.sessions}`} unit="done" />
            <FolderCard grad={['#DAF2E2','#C2E8CF','#A8DEBB']} darkAccent="#34D399" icon={<Clock size={36} />} title="Hours" sub="Learning" desc="Total time spent this week" value={`${student.hours}`} unit="hrs" />
          </div>

          {/* ═══ Two-column Layout ═══ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

            {/* Today's Classes */}
            <div className="rounded-2xl p-6 border transition-colors duration-300" style={{ background: dark ? '#111' : '#fff', borderColor: dark ? '#1E1E1E' : '#e2e8f0' }}>
              <div className="flex items-center justify-between mb-5">
                <span className="text-lg font-bold" style={{ color: dark ? '#E5E5E5' : '#0f172a' }}>Today&apos;s Schedule</span>
                <button className="text-sm font-semibold" style={{ color: dark ? '#4A7BF7' : '#4f46e5' }}>View all</button>
              </div>
              <div className="space-y-4">
                {todayClasses.map((cls, i) => (
                  <div key={i} className="group flex items-center gap-4 cursor-pointer">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${dark ? cls.darkBg : cls.bg} ${dark ? cls.darkColor : cls.color} group-hover:scale-105`}>
                      <Video size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold truncate transition-colors" style={{ color: dark ? '#E5E5E5' : '#0f172a' }}>{cls.subject}</p>
                      <p className="text-sm" style={{ color: dark ? '#8B8B8B' : '#64748b' }}>{cls.tutor} • {cls.time}</p>
                    </div>
                    {cls.isLive ? (
                      <button className="px-4 py-2 rounded-lg text-sm font-semibold transition-all" style={{ background: dark ? '#E5E5E5' : '#0f172a', color: dark ? '#000' : '#fff' }}>
                        Join Call
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 rounded-lg text-sm font-medium border" style={{ background: dark ? '#161616' : '#f8fafc', borderColor: dark ? '#2C2C2C' : '#e2e8f0', color: dark ? '#5A5A5A' : '#64748b' }}>
                        Upcoming
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Tutors */}
            <div className="rounded-2xl p-6 border transition-colors duration-300" style={{ background: dark ? '#111' : '#fff', borderColor: dark ? '#1E1E1E' : '#e2e8f0' }}>
              <div className="flex items-center justify-between mb-5">
                <span className="text-lg font-bold" style={{ color: dark ? '#E5E5E5' : '#0f172a' }}>Recommended Mentors</span>
                <button className="text-sm font-semibold" style={{ color: dark ? '#4A7BF7' : '#4f46e5' }}>See all</button>
              </div>
              <div className="space-y-4">
                {tutors.map((t, i) => (
                  <div key={i} className="group flex items-center gap-4 cursor-pointer">
                    <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full border transition-colors" style={{ borderColor: dark ? '#2C2C2C' : '#e2e8f0', background: dark ? '#161616' : '#f8fafc' }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold" style={{ color: dark ? '#E5E5E5' : '#0f172a' }}>{t.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm" style={{ color: dark ? '#8B8B8B' : '#64748b' }}>{t.subject}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md flex items-center gap-1" style={{ background: dark ? '#1A1A1A' : '#f1f5f9', color: dark ? '#8B8B8B' : '#334155' }}>
                          <Star size={12} className="fill-amber-400 text-amber-400"/> {t.rating}
                        </span>
                      </div>
                    </div>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center transition-all" style={{ color: dark ? '#6B6B6B' : '#94a3b8' }}>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="mt-8">
            <StreakCalendar />
          </div>

        </div>
      </div>
    </DarkCtx.Provider>
  );
}

/* ═══ AI Match Banner ═══ */
function AiMatchBanner() {
  const dark = useDark();
  const shimmerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    function animate(ts: number) {
      if (!start) start = ts;
      let t = ((ts - start) % 1400) / 1400;
      t = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      if (shimmerRef.current) {
        const w = shimmerRef.current.parentElement?.offsetWidth || 400;
        const band = w * 0.35;
        const center = -band + (w + band * 2) * t;
        shimmerRef.current.style.left = `${center - band / 2}px`;
        shimmerRef.current.style.width = `${band}px`;
      }
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl cursor-pointer group transition-colors duration-300" style={{ background: dark ? '#161616' : 'linear-gradient(to top right, #C8E8F8, #F2BEB4, #F3D5F3)', border: dark ? '1px solid #1E1E1E' : 'none' }}>
      <div ref={shimmerRef} className="absolute top-0 bottom-0 pointer-events-none" style={{ background: dark ? 'linear-gradient(to bottom right, transparent, rgba(255,255,255,0.04), transparent)' : 'linear-gradient(to bottom right, transparent, rgba(255,255,255,0.45), transparent)' }} />

      <div className="relative px-8 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest" style={{ color: dark ? '#E08A3C' : '#3B2212A6' }}>
            <Sparkles size={14} />
            AI Tutor Match
          </div>
          <h2 className="text-2xl font-bold tracking-tight" style={{ color: dark ? '#E5E5E5' : '#3B2212' }}>
            Find your perfect tutor
          </h2>
          <p className="text-sm max-w-md leading-relaxed" style={{ color: dark ? '#8B8B8B' : '#3B221288' }}>
            Matched to your learning style, goals & schedule.
          </p>
        </div>

        <button className="px-6 py-3 rounded-xl text-sm font-semibold border-b-[3px] hover:opacity-90 active:border-b-0 active:translate-y-[3px] transition-all shrink-0" style={{ background: dark ? '#E08A3C' : '#3B2212', color: '#fff', borderColor: dark ? '#B8691E' : '#2A180D' }}>
          Try Now
        </button>
      </div>
    </div>
  );
}

/* ═══ Folder Card ═══ */
function FolderCard({ grad, darkAccent, icon, title, sub, desc, value, unit }: {
  grad: string[]; darkAccent: string; icon: React.ReactNode; title: string; sub: string; desc: string; value: string; unit: string;
}) {
  const dark = useDark();
  return (
    <div className="rounded-[20px] overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 border" style={{ borderColor: dark ? '#1E1E1E' : `${grad[0]}80`, background: dark ? '#111' : '#fff' }}>
      <div className="h-24 flex items-center justify-center" style={{ background: dark ? '#161616' : `linear-gradient(135deg, ${grad[0]}, ${grad[1]}, ${grad[2]})` }}>
        <div style={{ color: dark ? `${darkAccent}40` : 'rgba(255,255,255,0.3)' }}>{icon}</div>
      </div>
      <div className="px-4 py-3">
        <p className="text-[13px] font-semibold leading-tight" style={{ color: dark ? '#E5E5E5' : '#0f172a' }}>{title}</p>
        <p className="text-[11px]" style={{ color: dark ? '#8B8B8B' : '#64748b' }}>{sub}</p>
        <p className="text-[10px] mt-0.5 leading-snug line-clamp-2" style={{ color: dark ? '#6B6B6B' : '#94a3b8' }}>{desc}</p>
        <div className="flex items-baseline gap-1.5 mt-2">
          <span className="text-[26px] font-bold tracking-tight leading-none" style={{ color: dark ? '#E5E5E5' : '#0f172a' }}>{value}</span>
          <span className="text-[12px]" style={{ color: dark ? '#8B8B8B' : '#94a3b8' }}>{unit}</span>
        </div>
      </div>
    </div>
  );
}

/* ═══ Streak Calendar ═══ */
function StreakCalendar() {
  const dark = useDark();
  const today = useMemo(() => new Date(), []);
  const weeks = 52;
  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  const grid = useMemo(() => {
    const g: { date: Date; level: number }[][] = [];
    const end = new Date(today);
    const startOffset = (weeks * 7) - 1 - end.getDay();
    const start = new Date(end);
    start.setDate(end.getDate() - startOffset);
    for (let w = 0; w < weeks; w++) {
      const col: { date: Date; level: number }[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(start);
        date.setDate(start.getDate() + w * 7 + d);
        const seed = date.getFullYear() * 366 + (date.getMonth() + 1) * 31 + date.getDate();
        const r = ((seed * 9301 + 49297) % 233280) / 233280;
        const isFuture = date > today;
        let level = 0;
        if (!isFuture) {
          if (date.getDay() === 0 || date.getDay() === 6) level = r > 0.5 ? 1 : 0;
          else if (w > 35) level = Math.floor(r * 3) + 2;
          else if (w > 20) level = Math.floor(r * 4) + 1;
          else level = Math.floor(r * 4);
        }
        col.push({ date, level: isFuture ? -1 : level });
      }
      g.push(col);
    }
    return g;
  }, [today, weeks]);

  const monthLabels = useMemo(() => {
    const labels: { label: string; col: number }[] = [];
    let last = -1;
    for (let w = 0; w < grid.length; w++) {
      const m = grid[w][0].date.getMonth();
      if (m !== last) { labels.push({ label: grid[w][0].date.toLocaleString('en', { month: 'short' }), col: w }); last = m; }
    }
    return labels;
  }, [grid]);

  const totalActive = grid.flat().filter(c => c.level > 0).length;

  // Colors from mobile theme.dart _c()
  const lightColors = ['#F0EEEB', '#FFEDD5', '#FFCF8A', '#E8A45C', '#E08A3C'];
  const darkColors = ['#1A1A1A', '#2E1B08', '#4D2D0E', '#B8691E', '#E08A3C'];
  const colors = dark ? darkColors : lightColors;
  const c = (l: number) => colors[Math.min(l, 4)];
  const sz = 11;
  const gap = 3;

  return (
    <div className="rounded-2xl p-6 border transition-colors duration-300" style={{ background: dark ? '#111' : '#fff', borderColor: dark ? '#1E1E1E' : '#e2e8f0' }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: dark ? '#1A1A1A' : '#FFF7ED' }}>
            <Flame size={20} style={{ color: '#E08A3C' }} />
          </div>
          <div>
            <h3 className="text-lg font-bold" style={{ color: dark ? '#E5E5E5' : '#0f172a' }}>7 Day Streak</h3>
            <p className="text-sm" style={{ color: dark ? '#5A5A5A' : '#64748b' }}>{totalActive} activities completed this year</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide pb-2">
        <table style={{ borderSpacing: gap, borderCollapse: 'separate' }}>
          <thead>
            <tr>
              <td style={{ width: 28 }} />
              {grid.map((_, w) => {
                const ml = monthLabels.find(m => m.col === w);
                return <td key={w} className="text-[10px] font-medium" style={{ padding: 0, color: dark ? '#5A5A5A' : '#94a3b8' }}>{ml?.label ?? ''}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 7 }, (_, d) => (
              <tr key={d}>
                <td className="text-[10px] font-medium text-right pr-2" style={{ padding: 0, width: 28, color: dark ? '#5A5A5A' : '#94a3b8' }}>{dayLabels[d]}</td>
                {grid.map((col, w) => {
                  const cell = col[d];
                  return (
                    <td key={w} style={{ padding: 0 }}>
                      <div
                        className="transition-all hover:scale-110 cursor-pointer"
                        style={{
                          width: sz, height: sz, borderRadius: 3,
                          backgroundColor: cell.level < 0 ? 'transparent' : c(cell.level),
                        }}
                        title={cell.level >= 0 ? `${cell.date.getMonth() + 1}/${cell.date.getDate()}/${cell.date.getFullYear()}` : ''}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-end gap-1.5">
        <span className="text-[11px] font-medium mr-1" style={{ color: dark ? '#5A5A5A' : '#94a3b8' }}>Less</span>
        {[0, 1, 2, 3, 4].map(i => <div key={i} style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: c(i) }} />)}
        <span className="text-[11px] font-medium ml-1" style={{ color: dark ? '#5A5A5A' : '#94a3b8' }}>More</span>
      </div>
    </div>
  );
}
