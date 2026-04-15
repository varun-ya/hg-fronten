"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, CheckCircle, TrendUp, Export, Download, Receipt,
  ChartLineUp, BookOpen, Clock, FileText, Star, Trophy,
  Target, GraduationCap, Flame, CaretRight, Exam,
} from "@phosphor-icons/react";
import { studentData } from "@/data/studentData";

const m3 = {
  primary: "#1B6EF3", onPrimary: "#FFFFFF", primaryContainer: "#D6E3FF", onPrimaryContainer: "#001B3E",
  secondary: "#0E8A6D", onSecondary: "#FFFFFF", secondaryContainer: "#B4F1DD", onSecondaryContainer: "#002117",
  tertiary: "#7C4DFF", onTertiary: "#FFFFFF", tertiaryContainer: "#E8DEFF", onTertiaryContainer: "#22005D",
  error: "#C4314B", errorContainer: "#FFDAD9", onErrorContainer: "#410005",
  amber: "#B5651D", amberContainer: "#FFDDB5", onAmberContainer: "#2A1700",
  green: "#2E7D32", greenContainer: "#C8E6C9", onGreenContainer: "#002204",
  surface: "#F8F9FC", surfaceContainerLowest: "#FFFFFF", surfaceContainerLow: "#F1F3F8",
  surfaceContainer: "#EBEDF2", surfaceContainerHigh: "#E3E5EA", surfaceContainerHighest: "#DCDEE3",
  onSurface: "#1A1C1E", onSurfaceVariant: "#44474E", outline: "#74777F", outlineVariant: "#C4C6D0",
};

export default function AnalyticsPage() {
  const router = useRouter();
  const data = studentData;
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans" style={{ background: m3.surface }}>

      {/* Header */}
      <header className="sticky top-0 z-40 px-5 py-2.5" style={{ background: m3.surfaceContainerLowest, borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border-none bg-transparent transition-colors hover:opacity-70">
              <ArrowLeft size={18} weight="bold" style={{ color: m3.onSurface }} />
            </button>
            <span className="text-[17px] font-medium" style={{ color: m3.onSurface }}>Analytics</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setExportOpen(!exportOpen)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-medium cursor-pointer transition-colors bg-transparent"
              style={{ border: `1px solid ${m3.outlineVariant}`, color: m3.onSurfaceVariant }}
            >
              <Export size={14} /> Export
            </button>
            {exportOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setExportOpen(false)} />
                <div className="absolute top-full right-0 mt-2 w-[140px] rounded-[12px] z-50 py-1.5 overflow-hidden" style={{ background: m3.surfaceContainerLowest, border: `1px solid ${m3.surfaceContainerHigh}`, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
                  <button className="w-full px-4 py-2.5 flex items-center gap-3 transition-colors text-left border-none bg-transparent cursor-pointer hover:opacity-70">
                    <Download size={14} style={{ color: m3.outline }} />
                    <span className="text-[13px] font-medium" style={{ color: m3.onSurface }}>CSV</span>
                  </button>
                  <button className="w-full px-4 py-2.5 flex items-center gap-3 transition-colors text-left border-none bg-transparent cursor-pointer hover:opacity-70">
                    <Receipt size={14} style={{ color: m3.outline }} />
                    <span className="text-[13px] font-medium" style={{ color: m3.onSurface }}>PDF</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 px-3 sm:px-5 py-4 sm:py-5">

        {/* Main Column */}
        <main className="space-y-4">

          {/* Overview Stats */}
          <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
            <div className="px-4 py-3 flex items-center gap-2" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
              <ChartLineUp size={16} weight="fill" style={{ color: m3.primary }} />
              <span className="text-[14px] font-medium" style={{ color: m3.onSurface }}>Overview</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
              {[
                { value: data.xp.toLocaleString(), label: "Total XP", color: m3.tertiary },
                { value: data.streak, label: "Day Streak", color: m3.amber },
                { value: data.sessionsThisWeek, label: "Classes", color: m3.primary },
                { value: `${data.hoursThisWeek}h`, label: "Hours", color: m3.secondary },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center py-4 cursor-pointer transition-colors hover:opacity-80"
                  style={{ borderRight: i < 3 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}
                >
                  <p className="text-[20px] font-semibold leading-none mb-1" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-[11px]" style={{ color: m3.outline }}>{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: m3.secondaryContainer }}>
              <TrendUp size={12} weight="bold" style={{ color: m3.onSecondaryContainer }} />
              <span className="text-[12px]" style={{ color: m3.onSecondaryContainer }}>+85 XP this week · Keep it up!</span>
            </div>
          </div>

          {/* Weekly Activity */}
          <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
            <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
              <div className="flex items-center gap-2">
                <Flame size={16} weight="fill" style={{ color: m3.amber }} />
                <span className="text-[14px] font-medium" style={{ color: m3.onSurface }}>Weekly Activity</span>
              </div>
              <span className="text-[11px]" style={{ color: m3.outline }}>Last 7 days</span>
            </div>
            <div className="px-4 py-5">
              <div className="flex items-end justify-between gap-2 h-[100px]">
                {[
                  { day: "Mon", hours: 0.6 }, { day: "Tue", hours: 0.8 }, { day: "Wed", hours: 0.4 },
                  { day: "Thu", hours: 1.0 }, { day: "Fri", hours: 0.7 }, { day: "Sat", hours: 0.3 }, { day: "Sun", hours: 0.0 },
                ].map((bar) => (
                  <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <div
                      className="w-full rounded-[4px] transition-all group-hover:opacity-70"
                      style={{
                        height: `${bar.hours * 90}px`,
                        background: bar.hours === 1.0 ? m3.primary : bar.hours >= 0.7 ? m3.secondaryContainer : bar.hours > 0 ? m3.surfaceContainerHighest : m3.surfaceContainerHigh,
                      }}
                    />
                    <span className="text-[10px]" style={{ color: m3.outline }}>{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subject Progress */}
          <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
            <div className="px-4 py-3 flex items-center gap-2" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
              <BookOpen size={16} weight="fill" style={{ color: m3.primary }} />
              <span className="text-[14px] font-medium" style={{ color: m3.onSurface }}>Subject Progress</span>
            </div>
            <div>
              {[
                { subject: "Mathematics", chapter: "Ch. 5: Quadratics", progress: 0.65, color: m3.primary, bg: m3.primaryContainer, fg: m3.onPrimaryContainer },
                { subject: "Physics", chapter: "Newton's Laws", progress: 0.40, color: m3.tertiary, bg: m3.tertiaryContainer, fg: m3.onTertiaryContainer },
                { subject: "English", chapter: "Essay Writing", progress: 0.80, color: m3.green, bg: m3.greenContainer, fg: m3.onGreenContainer },
              ].map((item, i, arr) => (
                <div
                  key={item.subject}
                  className="px-4 py-3.5 cursor-pointer transition-colors hover:opacity-80"
                  style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: item.bg }}>
                      <BookOpen size={16} weight="fill" style={{ color: item.fg }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[13px] font-medium" style={{ color: m3.onSurface }}>{item.subject}</span>
                        <span className="text-[12px] font-medium" style={{ color: item.color }}>{Math.round(item.progress * 100)}%</span>
                      </div>
                      <p className="text-[11px]" style={{ color: m3.outline }}>{item.chapter}</p>
                    </div>
                  </div>
                  <div className="h-[3px] rounded-full ml-12" style={{ background: item.bg }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${item.progress * 100}%`, background: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
            <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
              <div className="flex items-center gap-2">
                <Trophy size={16} weight="fill" style={{ color: m3.amber }} />
                <span className="text-[14px] font-medium" style={{ color: m3.onSurface }}>Recent Achievements</span>
              </div>
              <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full" style={{ background: m3.amberContainer, color: m3.onAmberContainer }}>6 total</span>
            </div>
            <div>
              {[
                { title: "7-day streak", subtitle: "Learning every day", color: m3.amber, bg: m3.amberContainer, fg: m3.onAmberContainer },
                { title: "Top 15%", subtitle: "Weekly leaderboard", color: m3.tertiary, bg: m3.tertiaryContainer, fg: m3.onTertiaryContainer },
                { title: "1,240 XP", subtitle: "Experience points", color: m3.primary, bg: m3.primaryContainer, fg: m3.onPrimaryContainer },
                { title: "16 classes", subtitle: "Sessions completed", color: m3.green, bg: m3.greenContainer, fg: m3.onGreenContainer },
              ].map((a, i, arr) => (
                <div
                  key={a.title}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors hover:opacity-80"
                  style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: a.bg }}>
                    <Trophy size={16} weight="fill" style={{ color: a.fg }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium" style={{ color: m3.onSurface }}>{a.title}</p>
                    <p className="text-[11px]" style={{ color: m3.outline }}>{a.subtitle}</p>
                  </div>
                  <CheckCircle size={16} weight="fill" style={{ color: a.color }} />
                </div>
              ))}
            </div>
          </div>

        </main>

        {/* Sidebar */}
        <aside className="hidden lg:block space-y-4">
          <div className="sticky top-[52px] space-y-4">

            {/* Study Streak */}
            <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
              <div className="px-4 py-3 flex items-center gap-2" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
                <Flame size={16} weight="fill" style={{ color: m3.amber }} />
                <span className="text-[13px] font-medium" style={{ color: m3.onSurface }}>Study Streak</span>
              </div>
              <div className="px-4 py-5" style={{ background: m3.amberContainer }}>
                <div className="text-center mb-4">
                  <p className="text-[32px] font-semibold leading-none mb-1" style={{ color: m3.onAmberContainer }}>{data.streak}</p>
                  <p className="text-[12px]" style={{ color: m3.amber }}>days in a row</p>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div
                      key={day}
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: day <= data.streak ? m3.amber : "rgba(255,255,255,0.6)", border: "none" }}
                    >
                      {day <= data.streak && <CheckCircle size={14} weight="fill" style={{ color: "#FFFFFF" }} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* This Week */}
            <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
              <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
                <div className="flex items-center gap-2">
                  <ChartLineUp size={16} weight="fill" style={{ color: m3.primary }} />
                  <span className="text-[13px] font-medium" style={{ color: m3.onSurface }}>This Week</span>
                </div>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full" style={{ background: m3.primaryContainer, color: m3.onPrimaryContainer }}>+12% ↑</span>
              </div>
              <div className="grid grid-cols-3">
                {[
                  { value: data.sessionsThisWeek, label: "Classes", color: m3.primary },
                  { value: `${data.hoursThisWeek}h`, label: "Hours", color: m3.secondary },
                  { value: "92%", label: "Avg Score", color: m3.green },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center py-4" style={{ borderRight: i < 2 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}>
                    <p className="text-[18px] font-semibold leading-none mb-1" style={{ color: stat.color }}>{stat.value}</p>
                    <p className="text-[11px]" style={{ color: m3.outline }}>{stat.label}</p>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: `1px solid ${m3.surfaceContainerHigh}` }}>
                {[
                  { label: "Assignments", value: "5/7", pct: 71, color: m3.primary, bg: m3.primaryContainer },
                  { label: "Tests taken", value: "3", pct: 60, color: m3.error, bg: m3.errorContainer },
                  { label: "Doubts cleared", value: "12", pct: 85, color: m3.secondary, bg: m3.secondaryContainer },
                  { label: "Practice", value: "48", pct: 96, color: m3.green, bg: m3.greenContainer },
                ].map((stat, i, arr) => (
                  <div key={i} className="px-4 py-2.5" style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[12px]" style={{ color: m3.onSurfaceVariant }}>{stat.label}</span>
                      <span className="text-[12px] font-medium" style={{ color: stat.color }}>{stat.value}</span>
                    </div>
                    <div className="w-full h-[3px] rounded-full" style={{ background: stat.bg }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${stat.pct}%`, background: stat.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance */}
            <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
              <div className="px-4 py-3 flex items-center gap-2" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
                <Exam size={16} weight="fill" style={{ color: m3.error }} />
                <span className="text-[13px] font-medium" style={{ color: m3.onSurface }}>Performance</span>
              </div>
              <div>
                {[
                  { label: "Mathematics", value: "95%", color: m3.primary, bg: m3.primaryContainer, fg: m3.onPrimaryContainer },
                  { label: "Physics", value: "88%", color: m3.tertiary, bg: m3.tertiaryContainer, fg: m3.onTertiaryContainer },
                  { label: "English", value: "94%", color: m3.green, bg: m3.greenContainer, fg: m3.onGreenContainer },
                  { label: "Overall Average", value: "92%", color: m3.amber, bg: m3.amberContainer, fg: m3.onAmberContainer },
                ].map((stat, i, arr) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors hover:opacity-80"
                    style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: stat.bg }}>
                      <span className="text-[10px] font-semibold" style={{ color: stat.fg }}>{stat.value}</span>
                    </div>
                    <span className="text-[12px] flex-1" style={{ color: m3.onSurfaceVariant }}>{stat.label}</span>
                    <span className="text-[13px] font-medium" style={{ color: stat.color }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* My Tutors */}
            <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
              <div className="px-4 py-3 flex items-center gap-2" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
                <GraduationCap size={16} weight="fill" style={{ color: m3.tertiary }} />
                <span className="text-[13px] font-medium" style={{ color: m3.onSurface }}>My Tutors</span>
              </div>
              <div>
                {data.tutors.map((tutor, i, arr) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors hover:opacity-80"
                    style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}
                  >
                    <img
                      src={`https://api.dicebear.com/7.x/notionists/svg?seed=${tutor.name}`}
                      alt={tutor.name}
                      className="w-9 h-9 rounded-full shrink-0"
                      style={{ background: m3.surfaceContainerHigh }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium truncate" style={{ color: m3.onSurface }}>{tutor.name}</p>
                      <p className="text-[11px]" style={{ color: m3.outline }}>{tutor.subject}</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Star size={10} weight="fill" style={{ color: m3.amber }} />
                      <span className="text-[11px] font-medium" style={{ color: m3.onSurfaceVariant }}>12</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Goals */}
            <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
              <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
                <div className="flex items-center gap-2">
                  <Target size={16} weight="fill" style={{ color: m3.green }} />
                  <span className="text-[13px] font-medium" style={{ color: m3.onSurface }}>Goals</span>
                </div>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full" style={{ background: m3.greenContainer, color: m3.onGreenContainer }}>2/3</span>
              </div>
              <div>
                {[
                  { goal: "Complete 5 classes", pct: 80, current: 4, target: 5, done: false, color: m3.primary, bg: m3.primaryContainer },
                  { goal: "Maintain 7-day streak", pct: 100, current: 7, target: 7, done: true, color: m3.green, bg: m3.greenContainer },
                  { goal: "Score 90%+ in tests", pct: 66, current: 2, target: 3, done: false, color: m3.error, bg: m3.errorContainer },
                ].map((item, i, arr) => (
                  <div
                    key={i}
                    className="px-4 py-3 cursor-pointer transition-colors hover:opacity-80"
                    style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px]" style={{ color: m3.onSurfaceVariant }}>{item.goal}</span>
                      {item.done && <CheckCircle size={14} weight="fill" style={{ color: m3.green }} />}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-[3px] rounded-full" style={{ background: item.bg }}>
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${item.pct}%`, background: item.color }} />
                      </div>
                      <span className="text-[10px] font-medium" style={{ color: item.color }}>{item.current}/{item.target}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </aside>
      </div>
    </div>
  );
}
