"use client";

import { useState, useEffect } from "react";
import {
  Users, Video, Star, Calendar,
  ArrowRight, Circle,
  BookOpen, CaretRight, FileText,
  ChatCircle, CalendarPlus, Notebook, Exam,
  CheckCircle, Trophy, UserPlus, CurrencyInr,
  Lightning, ChartLineUp,
  Flame, Clock, TrendUp, Bell, List,
  GraduationCap, Wallet, ChartBar,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";

/* ── Material You (M3) — Multi-Color Palette ── */
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

export default function Home() {
  const router = useRouter();
  const { toggle, isMobile } = useSidebar();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const now = currentTime;
  const hours = now.getHours();
  const minutes = now.getMinutes() + 10;
  const dh = minutes >= 60 ? (hours + 1) % 24 : hours;
  const dm = minutes % 60;
  const timeStr = `${dh % 12 || 12}:${String(dm).padStart(2, "0")} ${dh >= 12 ? "PM" : "AM"}`;

  return (
    <div className="min-h-screen font-sans" style={{ background: m3.surface }}>
      
      {/* Header */}
      <header className="sticky top-0 z-40 px-5 py-2.5" style={{ background: m3.surface, borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {isMobile && (
              <button onClick={toggle} className="p-2 rounded-lg transition-colors cursor-pointer border-none bg-transparent lg:hidden hover:opacity-70">
                <List size={20} weight="bold" style={{ color: m3.onSurfaceVariant }} />
              </button>
            )}
            <span className="text-[17px] font-medium" style={{ color: m3.onSurface }}>Dashboard</span>
            <span className="text-[13px] hidden sm:block" style={{ color: m3.onSurfaceVariant }}>
              {now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <button
            onClick={() => router.push("/notifications")}
            className="relative p-2 rounded-lg transition-colors cursor-pointer border-none bg-transparent hover:opacity-70"
          >
            <Bell size={20} weight="bold" style={{ color: m3.onSurfaceVariant }} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: m3.error }} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 py-4 sm:py-5">
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
          
          {/* Left Column - Main Content */}
          <div className="space-y-4 lg:sticky lg:top-[52px] lg:self-start">
            
            {/* Stats Grid — M3 Multi-Color */}
            <div className="rounded-[12px] p-3 sm:p-5 flex flex-col sm:flex-row" style={{ background: m3.surfaceContainerLowest }}>
              {[
                { icon: CurrencyInr, value: "₹12,400", label: "Earned this month", sub: "+18% ↑", containerBg: m3.greenContainer, containerFg: m3.onGreenContainer, subColor: m3.green },
                { icon: Users, value: "7", label: "Active students", sub: "+2 this week", containerBg: m3.primaryContainer, containerFg: m3.onPrimaryContainer, subColor: m3.primary },
                { icon: Star, value: "4.8", label: "Average rating", sub: "156 reviews", containerBg: m3.amberContainer, containerFg: m3.onAmberContainer, subColor: m3.amber },
                { icon: Flame, value: "12", label: "Day streak", sub: "Active", containerBg: m3.errorContainer, containerFg: m3.onErrorContainer, subColor: m3.error },
              ].map((stat, i, arr) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 flex-1 px-3 sm:px-4 py-2.5 sm:py-2 ${
                    i < arr.length - 1 ? 'border-b sm:border-b-0 sm:border-r' : ''
                  }`}
                  style={{ borderColor: m3.outlineVariant }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: stat.containerBg }}>
                    <stat.icon size={20} weight="regular" style={{ color: stat.containerFg }} />
                  </div>
                  <div>
                    <p className="text-[13px] mb-0.5" style={{ color: m3.onSurfaceVariant }}>{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[22px] font-bold leading-none" style={{ color: m3.onSurface }}>{stat.value}</span>
                      <span className="text-[12px] font-medium" style={{ color: stat.subColor }}>{stat.sub}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Next Session — M3 */}
            <div>
              <div className="flex items-center gap-2 mb-3 px-1">
                <Calendar size={18} weight="fill" style={{ color: m3.primary }} />
                <span className="text-[15px] font-medium" style={{ color: m3.onSurface }}>Next Session</span>
              </div>
              <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
                <div className="px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={14} style={{ color: m3.onSurfaceVariant }} />
                      <span className="text-[13px]" style={{ color: m3.onSurfaceVariant }}>Starts in <b style={{ color: m3.green }}>10min</b></span>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: m3.greenContainer, color: m3.onGreenContainer }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: m3.green }} />
                        LIVE SOON
                      </span>
                    </div>
                    <p className="text-[17px] sm:text-[20px] font-medium leading-tight mb-2" style={{ color: m3.onSurface }}>English Literature</p>
                    <div className="flex items-center gap-3 text-[13px] mb-4" style={{ color: m3.onSurfaceVariant }}>
                      <span>{timeStr}</span>
                      <span style={{ color: m3.outlineVariant }}>•</span>
                      <span>1 hour</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="h-10 px-6 rounded-full text-[14px] font-medium cursor-pointer border-none transition-all hover:shadow-md" style={{ background: m3.green, color: "#FFFFFF" }}>
                        Join now
                      </button>
                      <button className="h-10 px-6 rounded-full text-[14px] font-medium cursor-pointer bg-transparent transition-colors" style={{ border: `1px solid ${m3.outline}`, color: m3.onSurfaceVariant }}>
                        Reschedule
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 rounded-[12px] p-3 w-full sm:w-auto" style={{ background: m3.surfaceContainerLow }}>
                    <div className="relative">
                      <img
                        src="https://api.dicebear.com/7.x/notionists/svg?seed=Meera Iyer"
                        alt="Meera Iyer"
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white"
                        style={{ backgroundColor: m3.surfaceContainerHigh }}
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 border-2 border-white rounded-full" style={{ background: m3.green }} />
                    </div>
                    <div>
                      <p className="text-[14px] font-medium" style={{ color: m3.onSurface }}>Meera Iyer</p>
                      <p className="text-[12px]" style={{ color: m3.onSurfaceVariant }}>English Literature</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star size={11} weight="fill" style={{ color: m3.amber }} />
                        <span className="text-[12px] font-medium" style={{ color: m3.onSurfaceVariant }}>4.8</span>
                        <span className="text-[11px] ml-1" style={{ color: m3.outline }}>• Class 11</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Demo Requests — M3 */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <UserPlus size={16} weight="fill" style={{ color: m3.tertiary }} />
                  <span className="text-[14px] font-medium" style={{ color: m3.onSurface }}>Demo Requests</span>
                </div>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium" style={{ background: m3.tertiaryContainer, color: m3.onTertiaryContainer }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: m3.tertiary }} />
                  3 new
                </span>
              </div>
              <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
                {[
                  { name: "Amit Desai", subject: "Mathematics", grade: "Class 11", message: "Looking for help with Calculus. Struggling with integration by parts.", time: "6h", color: m3.primary, bg: m3.primaryContainer, fg: m3.onPrimaryContainer },
                  { name: "Kavya Singh", subject: "JEE Advanced", grade: "Class 12", message: "Need intensive coaching for JEE Advanced. Currently scoring 180/300 in mocks.", time: "1d", color: m3.error, bg: m3.errorContainer, fg: m3.onErrorContainer },
                  { name: "Rahul Joshi", subject: "Physics", grade: "Class 11", message: "Want to start from basics. Need someone patient who can explain from scratch.", time: "2d", color: m3.secondary, bg: m3.secondaryContainer, fg: m3.onSecondaryContainer },
                ].map((req, i, arr) => (
                  <div key={i} className="p-4 transition-colors hover:opacity-80" style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: req.bg }}>
                        <span className="text-[11px] font-medium" style={{ color: req.fg }}>
                          {req.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <p className="text-[14px] font-medium leading-tight" style={{ color: m3.onSurface }}>{req.name}</p>
                          <span className="text-[11px] shrink-0" style={{ color: m3.outline }}>{req.time} ago</span>
                        </div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium" style={{ background: m3.surfaceContainerHigh, color: m3.onSurfaceVariant }}>
                            {req.subject}
                          </span>
                          <span className="text-[11px]" style={{ color: m3.outline }}>{req.grade}</span>
                        </div>
                        <p className="text-[13px] leading-relaxed mb-3" style={{ color: m3.onSurfaceVariant }}>{req.message}</p>
                        <div className="flex items-center gap-2">
                          <button className="flex-1 h-9 rounded-full text-[12px] font-medium transition-all cursor-pointer border-none" style={{ background: m3.green, color: "#FFFFFF" }}>
                            Accept
                          </button>
                          <button className="flex-1 h-9 rounded-full text-[12px] font-medium transition-colors cursor-pointer bg-transparent" style={{ border: `1px solid ${m3.outline}`, color: m3.onSurfaceVariant }}>
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Schedule — M3 */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <Calendar size={16} weight="fill" style={{ color: m3.primary }} />
                  <span className="text-[14px] font-medium" style={{ color: m3.onSurface }}>Today's Schedule</span>
                </div>
                <button
                  onClick={() => router.push("/schedule")}
                  className="text-[12px] cursor-pointer bg-transparent border-none transition-colors flex items-center gap-1 font-medium"
                  style={{ color: m3.primary }}
                >
                  View all <CaretRight size={10} weight="bold" />
                </button>
              </div>
              <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
                {/* Quick Stats */}
                <div className="grid grid-cols-4">
                  {[
                    { value: "3", label: "Classes", color: m3.primary },
                    { value: "2", label: "Done", color: m3.green },
                    { value: "₹1,500", label: "Earned", color: m3.amber },
                    { value: "1", label: "Pending", color: m3.error },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center py-3.5"
                      style={{ borderRight: i < 3 ? `1px solid ${m3.surfaceContainerHigh}` : "none", borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}
                    >
                      <p className="text-[16px] font-semibold leading-none mb-1" style={{ color: stat.color }}>{stat.value}</p>
                      <p className="text-[11px]" style={{ color: m3.outline }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
                {/* Schedule List */}
                <div>
                  {[
                    { time: "10:30 AM", student: "Aarav Sharma", subject: "Mathematics", status: "done", color: m3.primary, bg: m3.primaryContainer, fg: m3.onPrimaryContainer },
                    { time: "11:30 AM", student: "Priya Patel", subject: "Physics", status: "next", color: m3.tertiary, bg: m3.tertiaryContainer, fg: m3.onTertiaryContainer },
                    { time: "2:00 PM", student: "Rohan Gupta", subject: "Chemistry", status: "", color: m3.secondary, bg: m3.secondaryContainer, fg: m3.onSecondaryContainer },
                    { time: "4:30 PM", student: "Kavya Singh", subject: "JEE Prep", status: "", color: m3.amber, bg: m3.amberContainer, fg: m3.onAmberContainer },
                  ].map((s, i, arr) => {
                    const isDone = s.status === "done";
                    const isNext = s.status === "next";
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-3.5 px-4 py-3.5 cursor-pointer transition-all ${
                          isDone ? "opacity-40" : "hover:opacity-80"
                        }`}
                        style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}
                      >
                        <span className={`text-[12px] font-medium min-w-[65px] ${isDone ? "line-through" : ""}`} style={{ color: isDone ? m3.surfaceContainerHighest : m3.onSurfaceVariant }}>
                          {s.time}
                        </span>
                        {isNext && <div className="w-1 h-9 rounded-full shrink-0" style={{ background: m3.primary }} />}
                        <img
                          src={`https://api.dicebear.com/7.x/notionists/svg?seed=${s.student}`}
                          alt={s.student}
                          className="w-9 h-9 rounded-full shrink-0"
                          style={{ backgroundColor: m3.surfaceContainerHigh }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className={`text-[13px] truncate mb-0.5 ${isDone ? "line-through" : isNext ? "font-medium" : "font-medium"}`} style={{ color: isDone ? m3.surfaceContainerHighest : m3.onSurface }}>
                            {s.student}
                          </p>
                          <p className="text-[11px]" style={{ color: isDone ? m3.surfaceContainerHighest : m3.outline }}>{s.subject}</p>
                        </div>
                        {isNext && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0" style={{ background: m3.primaryContainer, color: m3.onPrimaryContainer }}>
                            Up next
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4">
            
            {/* This Week Stats — M3 */}
            <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
              <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
                <div className="flex items-center gap-2">
                  <ChartLineUp size={16} weight="fill" style={{ color: m3.primary }} />
                  <span className="text-[13px] font-medium" style={{ color: m3.onSurface }}>This Week</span>
                </div>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full" style={{ background: m3.primaryContainer, color: m3.onPrimaryContainer }}>+15% ↑</span>
              </div>
              <div className="grid grid-cols-3">
                {[
                  { value: "14", label: "Sessions", color: m3.primary },
                  { value: "12.5", label: "Hours", color: m3.secondary },
                  { value: "4.9", label: "Rating", color: m3.amber },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center py-4" style={{ borderRight: i < 2 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}>
                    <p className="text-[20px] font-semibold leading-none mb-1" style={{ color: stat.color }}>{stat.value}</p>
                    <p className="text-[11px]" style={{ color: m3.outline }}>{stat.label}</p>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: `1px solid ${m3.surfaceContainerHigh}` }}>
                {[
                  { label: "Assignments", value: "12", pct: 80, color: m3.primary, bg: m3.primaryContainer },
                  { label: "Doubts asked", value: "8", pct: 55, color: m3.tertiary, bg: m3.tertiaryContainer },
                  { label: "Practice sets", value: "15", pct: 90, color: m3.green, bg: m3.greenContainer },
                  { label: "Avg score", value: "78%", pct: 78, color: m3.amber, bg: m3.amberContainer },
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

            {/* Activity Feed — M3 */}
            <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
              <div className="px-4 py-3 flex items-center gap-2" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
                <CheckCircle size={16} weight="fill" style={{ color: m3.green }} />
                <span className="text-[13px] font-medium" style={{ color: m3.onSurface }}>Recent Activity</span>
              </div>
              <div>
                {[
                  { name: "Sneha Kapoor", action: "scored 247/300 in JEE Mock #8", time: "45m", bg: m3.greenContainer, fg: m3.onGreenContainer },
                  { name: "Aarav Sharma", action: "submitted Quadratic Equations assignment", time: "2h", bg: m3.primaryContainer, fg: m3.onPrimaryContainer },
                  { name: "Priya Patel", action: "rescheduled Physics to 11:30 AM", time: "3h", bg: m3.amberContainer, fg: m3.onAmberContainer },
                  { name: "Rohan Gupta", action: "completed Organic Chemistry practice set", time: "5h", bg: m3.secondaryContainer, fg: m3.onSecondaryContainer },
                ].map((a, i, arr) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 px-4 py-3 transition-colors cursor-pointer hover:opacity-80"
                    style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: a.bg }}>
                      <span className="text-[10px] font-medium" style={{ color: a.fg }}>
                        {a.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] truncate" style={{ color: m3.onSurface }}>
                        <span className="font-medium">{a.name}</span>
                        <span style={{ color: m3.onSurfaceVariant }}> {a.action}</span>
                      </p>
                    </div>
                    <span className="text-[10px] shrink-0" style={{ color: m3.outline }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* To Do — M3 */}
            <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
              <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
                <div className="flex items-center gap-2">
                  <Exam size={16} weight="fill" style={{ color: m3.error }} />
                  <span className="text-[13px] font-medium" style={{ color: m3.onSurface }}>To Do</span>
                </div>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full" style={{ background: m3.errorContainer, color: m3.onErrorContainer }}>5 pending</span>
              </div>
              <div>
                {[
                  { text: "Grade Aarav's assignment", badge: "Due today", urgent: true, bg: m3.errorContainer, fg: m3.error },
                  { text: "Reply to Kavya", badge: "2h ago", urgent: false, bg: m3.surfaceContainerHigh, fg: m3.outline },
                  { text: "Confirm Amit's session", badge: "Tomorrow", urgent: false, bg: m3.surfaceContainerHigh, fg: m3.outline },
                  { text: "Update lesson plan", badge: "This week", urgent: false, bg: m3.surfaceContainerHigh, fg: m3.outline },
                  { text: "Create mock test", badge: "By Friday", urgent: false, bg: m3.surfaceContainerHigh, fg: m3.outline },
                ].map((item, i, arr) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors hover:opacity-80"
                    style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}
                  >
                    <span className={`text-[12px] flex-1 truncate ${item.urgent ? "font-medium" : ""}`} style={{ color: item.urgent ? m3.onSurface : m3.onSurfaceVariant }}>
                      {item.text}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ml-2" style={{ background: item.bg, color: item.fg }}>
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Messages — M3 */}
            <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
              <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
                <div className="flex items-center gap-2">
                  <ChatCircle size={16} weight="fill" style={{ color: m3.tertiary }} />
                  <span className="text-[13px] font-medium" style={{ color: m3.onSurface }}>Messages</span>
                </div>
                <button
                  onClick={() => router.push("/students")}
                  className="text-[12px] cursor-pointer bg-transparent border-none transition-colors flex items-center gap-1 font-medium"
                  style={{ color: m3.primary }}
                >
                  Open <CaretRight size={10} weight="bold" />
                </button>
              </div>
              <div>
                {[
                  { name: "Sneha Kapoor", msg: "Can we reschedule tomorrow's class?", time: "20m" },
                  { name: "Rohan Gupta", msg: "Doubt in organic chemistry reaction", time: "1h" },
                  { name: "Kavya Singh", msg: "Sent you the assignment", time: "3h" },
                ].map((m, i, arr) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors hover:opacity-80"
                    style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}
                  >
                    <img
                      src={`https://api.dicebear.com/7.x/notionists/svg?seed=${m.name}`}
                      alt={m.name}
                      className="w-9 h-9 rounded-full shrink-0"
                      style={{ background: m3.surfaceContainerHigh }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium truncate" style={{ color: m3.onSurface }}>{m.name}</p>
                      <p className="text-[12px] truncate" style={{ color: m3.onSurfaceVariant }}>{m.msg}</p>
                    </div>
                    <span className="text-[11px] shrink-0" style={{ color: m3.outline }}>{m.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings — M3 */}
            <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
              <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
                <div className="flex items-center gap-2">
                  <Wallet size={16} weight="fill" style={{ color: m3.green }} />
                  <span className="text-[13px] font-medium" style={{ color: m3.onSurface }}>Earnings</span>
                </div>
                <button
                  onClick={() => router.push("/wallet")}
                  className="text-[12px] cursor-pointer bg-transparent border-none transition-colors flex items-center gap-1 font-medium"
                  style={{ color: m3.primary }}
                >
                  Wallet <CaretRight size={10} weight="bold" />
                </button>
              </div>
              <div className="px-4 pt-4 pb-2">
                <div className="flex items-end justify-between gap-1.5 h-[60px]">
                  {[
                    { label: "Jan", fill: 0.4 },
                    { label: "Feb", fill: 0.55 },
                    { label: "Mar", fill: 0.45 },
                    { label: "Apr", fill: 0.7 },
                    { label: "May", fill: 0.85 },
                    { label: "Jun", fill: 1.0 },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group cursor-pointer">
                      <div
                        className="w-full rounded-[4px] transition-all group-hover:opacity-70"
                        style={{
                          height: `${bar.fill * 100}%`,
                          background: bar.fill === 1.0 ? m3.green : bar.fill >= 0.7 ? m3.greenContainer : m3.surfaceContainerHighest,
                        }}
                      />
                      <span className="text-[10px]" style={{ color: m3.outline }}>{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ borderTop: `1px solid ${m3.surfaceContainerHigh}` }}>
                {[
                  { label: "This week", value: "₹4,200", sub: "14 sessions", color: m3.green },
                  { label: "Last week", value: "₹3,800", sub: "12 sessions", color: m3.onSurface },
                  { label: "Pending payout", value: "₹2,400", sub: "Next: Jul 1", color: m3.amber },
                ].map((item, i, arr) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-2.5 transition-colors cursor-pointer hover:opacity-80"
                    style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}
                  >
                    <span className="text-[12px]" style={{ color: m3.onSurfaceVariant }}>{item.label}</span>
                    <div className="text-right">
                      <span className="text-[13px] font-medium" style={{ color: item.color }}>{item.value}</span>
                      <p className="text-[11px]" style={{ color: m3.outline }}>{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions — M3 */}
            <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
              {[
                { label: "View Schedule", desc: "Classes & timetable", icon: Calendar, href: "/schedule", bg: m3.primaryContainer, fg: m3.onPrimaryContainer },
                { label: "Open Wallet", desc: "Earnings & payouts", icon: CurrencyInr, href: "/wallet", bg: m3.greenContainer, fg: m3.onGreenContainer },
                { label: "All Students", desc: "Manage & track", icon: Users, href: "/students", bg: m3.tertiaryContainer, fg: m3.onTertiaryContainer },
              ].map((action, i, arr) => (
                <button
                  key={action.label}
                  onClick={() => router.push(action.href)}
                  className="w-full flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer bg-transparent border-none text-left hover:opacity-80"
                  style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: action.bg }}>
                    <action.icon size={16} weight="fill" style={{ color: action.fg }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium" style={{ color: m3.onSurface }}>{action.label}</p>
                    <p className="text-[11px]" style={{ color: m3.outline }}>{action.desc}</p>
                  </div>
                  <CaretRight size={14} weight="bold" style={{ color: m3.outlineVariant }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
