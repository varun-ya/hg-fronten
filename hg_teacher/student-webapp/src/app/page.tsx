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
  GraduationCap, Target, Brain,
  ChartBar, Wallet, VideoCamera,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import AIMatchBanner from "@/components/home/AIMatchBanner";
import StreakCalendar from "@/components/home/StreakCalendar";

/* ── Material You (M3) — Multi-Color Palette ── */
const m3 = {
  // Primary — Blue (schedule, main actions, classes)
  primary:            "#1B6EF3",
  onPrimary:          "#FFFFFF",
  primaryContainer:   "#D6E3FF",
  onPrimaryContainer: "#001B3E",
  // Secondary — Teal (activity, progress, stats)
  secondary:            "#0E8A6D",
  onSecondary:          "#FFFFFF",
  secondaryContainer:   "#B4F1DD",
  onSecondaryContainer: "#002117",
  // Tertiary — Violet (tutors, messages, AI)
  tertiary:            "#7C4DFF",
  onTertiary:          "#FFFFFF",
  tertiaryContainer:   "#E8DEFF",
  onTertiaryContainer: "#22005D",
  // Error — Rose (urgent, tests, assignments due)
  error:              "#C4314B",
  errorContainer:     "#FFDAD9",
  onErrorContainer:   "#410005",
  // Amber — Warm (notes, performance, streak)
  amber:              "#B5651D",
  amberContainer:     "#FFDDB5",
  onAmberContainer:   "#2A1700",
  // Green — Fresh (completed, success, wallet)
  green:              "#2E7D32",
  greenContainer:     "#C8E6C9",
  onGreenContainer:   "#002204",
  // Surface system
  surface:              "#F8F9FC",
  surfaceContainerLowest:  "#FFFFFF",
  surfaceContainerLow:     "#F1F3F8",
  surfaceContainer:        "#EBEDF2",
  surfaceContainerHigh:    "#E3E5EA",
  surfaceContainerHighest: "#DCDEE3",
  onSurface:            "#1A1C1E",
  onSurfaceVariant:     "#44474E",
  // Outline
  outline:        "#74777F",
  outlineVariant: "#C4C6D0",
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
  const minutes = now.getMinutes() + 15;
  const dh = minutes >= 60 ? (hours + 1) % 24 : hours;
  const dm = minutes % 60;
  const timeStr = `${dh % 12 || 12}:${String(dm).padStart(2, "0")} ${dh >= 12 ? "PM" : "AM"}`;

  return (
    <div className="min-h-screen font-sans" style={{ background: m3.surface }}>
      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6 py-4 sm:py-5">
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
          
          {/* Left Column - Main Content */}
          <div className="space-y-4">
            
            {/* AI Match Banner */}
            <AIMatchBanner />

            {/* Stats Row — M3 Multi-Color */}
            <div className="rounded-[12px] p-3 sm:p-5 flex flex-col sm:flex-row" style={{ background: m3.surfaceContainerLowest }}>
              {[
                { icon: BookOpen, value: "16", label: "Classes attended", sub: "↑ 4 this week", containerBg: m3.primaryContainer, containerFg: m3.onPrimaryContainer, subColor: m3.primary },
                { icon: Clock, value: "24h", label: "Total learning time", sub: "↑ 3.5h this week", containerBg: m3.secondaryContainer, containerFg: m3.onSecondaryContainer, subColor: m3.secondary },
                { icon: FileText, value: "3", label: "Assignment done", sub: "2 pending", containerBg: m3.amberContainer, containerFg: m3.onAmberContainer, subColor: m3.amber },
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

            {/* Upcoming Schedule — M3 Card */}
            <div>
              <div className="flex items-center gap-2 mb-3 px-1">
                <Calendar size={18} weight="fill" style={{ color: m3.primary }} />
                <span className="text-[15px] font-medium" style={{ color: m3.onSurface }}>Upcoming Schedule</span>
              </div>
              <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
                <div className="px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={14} style={{ color: m3.onSurfaceVariant }} />
                      <span className="text-[13px]" style={{ color: m3.onSurfaceVariant }}>Starts in <b style={{ color: m3.primary }}>15min</b></span>
                    </div>
                    <p className="text-[17px] sm:text-[20px] font-medium leading-tight mb-2" style={{ color: m3.onSurface }}>Mathematics — Quadratic Equations</p>
                    <div className="flex items-center gap-3 text-[13px] mb-4" style={{ color: m3.onSurfaceVariant }}>
                      <span>{timeStr}</span>
                      <span style={{ color: m3.outlineVariant }}>•</span>
                      <span>1 hour</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* M3 Filled Button */}
                      <button className="h-10 px-6 rounded-full text-[14px] font-medium cursor-pointer border-none transition-all hover:shadow-md" style={{ background: m3.green, color: "#FFFFFF" }}>
                        Join now
                      </button>
                      {/* M3 Outlined Button */}
                      <button className="h-10 px-6 rounded-full text-[14px] font-medium cursor-pointer bg-transparent transition-colors" style={{ border: `1px solid ${m3.outline}`, color: m3.onSurfaceVariant }}>
                        Reschedule
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 rounded-[12px] p-3 w-full sm:w-auto" style={{ background: m3.surfaceContainerLow }}>
                    <img
                      src="https://api.dicebear.com/7.x/notionists/svg?seed=Ayush Soni"
                      alt="Ayush Soni"
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white"
                      style={{ backgroundColor: m3.surfaceContainerHigh }}
                    />
                    <div>
                      <p className="text-[14px] font-medium" style={{ color: m3.onSurface }}>Ayush Soni</p>
                      <p className="text-[12px]" style={{ color: m3.onSurfaceVariant }}>Mathematics</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star size={11} weight="fill" style={{ color: m3.amber }} />
                        <span className="text-[12px] font-medium" style={{ color: m3.onSurfaceVariant }}>4.9</span>
                        <span className="text-[11px] ml-1" style={{ color: m3.outline }}>• 346 lessons</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Two Column Layout for Classes and Tutors — M3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Today's Classes */}
              <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
                <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
                  <div className="flex items-center gap-2">
                    <Video size={16} weight="fill" style={{ color: m3.primary }} />
                    <span className="text-[14px] font-medium" style={{ color: m3.onSurface }}>Today's Classes</span>
                  </div>
                  <button
                    onClick={() => router.push("/schedule")}
                    className="text-[12px] cursor-pointer bg-transparent border-none transition-colors flex items-center gap-1 font-medium"
                    style={{ color: m3.primary }}
                  >
                    View all <CaretRight size={10} weight="bold" />
                  </button>
                </div>
                <div>
                  {[
                    { time: "10:00 AM", teacher: "Ayush Soni", subject: "Mathematics", status: "live" },
                    { time: "2:00 PM", teacher: "Priya Menon", subject: "Physics", status: "upcoming" },
                    { time: "4:30 PM", teacher: "Ankit Kapoor", subject: "English", status: "upcoming" },
                  ].map((cls, i, arr) => (
                    <div key={i} className="p-3 transition-colors cursor-pointer hover:opacity-80" style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: i === 0 ? m3.primaryContainer : i === 1 ? m3.tertiaryContainer : m3.amberContainer }}>
                          <Video size={18} weight="fill" style={{ color: i === 0 ? m3.onPrimaryContainer : i === 1 ? m3.onTertiaryContainer : m3.onAmberContainer }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-[14px] font-medium" style={{ color: m3.onSurface }}>{cls.subject}</p>
                            {cls.status === "live" && (
                              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: m3.greenContainer, color: m3.onGreenContainer }}>
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: m3.green }} />
                                LIVE
                              </span>
                            )}
                          </div>
                          <p className="text-[12px]" style={{ color: m3.onSurfaceVariant }}>{cls.teacher} • {cls.time}</p>
                        </div>
                        {cls.status === "live" ? (
                          <button className="h-8 px-4 rounded-full text-[12px] font-medium transition-all border-none cursor-pointer" style={{ background: m3.green, color: "#FFFFFF" }}>
                            Join
                          </button>
                        ) : (
                          <span className="text-[12px]" style={{ color: m3.outline }}>{cls.time}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Tutors */}
              <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
                <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
                  <div className="flex items-center gap-2">
                    <GraduationCap size={16} weight="fill" style={{ color: m3.tertiary }} />
                    <span className="text-[14px] font-medium" style={{ color: m3.onSurface }}>Suggested Tutors</span>
                  </div>
                  <button
                    onClick={() => router.push("/teachers")}
                    className="text-[12px] cursor-pointer bg-transparent border-none transition-colors flex items-center gap-1 font-medium"
                    style={{ color: m3.primary }}
                  >
                    See all <CaretRight size={10} weight="bold" />
                  </button>
                </div>
                <div>
                  {[
                    { name: "Ayush Soni", subject: "Maths • Physics", rating: 4.9, price: 499 },
                    { name: "Priya Menon", subject: "Physics", rating: 4.8, price: 399 },
                    { name: "Ankit Kapoor", subject: "English • Literature", rating: 4.7, price: 349 },
                  ].map((tutor, i, arr) => (
                    <div key={i} className="p-3 transition-colors cursor-pointer hover:opacity-80" style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}>
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://api.dicebear.com/7.x/notionists/svg?seed=${tutor.name}`}
                          alt={tutor.name}
                          className="w-10 h-10 rounded-full shrink-0"
                          style={{ background: m3.surfaceContainerHigh }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium mb-0.5" style={{ color: m3.onSurface }}>{tutor.name}</p>
                          <div className="flex items-center gap-1.5">
                            <p className="text-[12px]" style={{ color: m3.onSurfaceVariant }}>{tutor.subject}</p>
                            <span style={{ color: m3.outlineVariant }}>•</span>
                            <div className="flex items-center gap-0.5">
                              <Star size={10} weight="fill" style={{ color: m3.amber }} />
                              <span className="text-[12px] font-medium" style={{ color: m3.onSurfaceVariant }}>{tutor.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[14px] font-medium" style={{ color: m3.onSurface }}>₹{tutor.price}</p>
                          <p className="text-[11px]" style={{ color: m3.outline }}>per hour</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pending Assignments — M3 */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <FileText size={16} weight="fill" style={{ color: m3.error }} />
                  <span className="text-[14px] font-medium" style={{ color: m3.onSurface }}>Pending Assignments</span>
                </div>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium" style={{ background: m3.errorContainer, color: m3.onErrorContainer }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: m3.error }} />
                  3 due soon
                </span>
              </div>
              <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
                {[
                  { title: "Quadratic Equations Practice", teacher: "Ayush Soni", subject: "Mathematics", dueDate: "Due today", urgent: true },
                  { title: "Organic Chemistry Lab Report", teacher: "Priya Menon", subject: "Chemistry", dueDate: "Due tomorrow", urgent: false },
                  { title: "English Essay - Shakespeare", teacher: "Ankit Kapoor", subject: "English", dueDate: "Due in 3 days", urgent: false },
                ].map((assignment, i, arr) => (
                  <div key={i} className="p-4 transition-colors hover:opacity-80" style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: i === 0 ? m3.primaryContainer : i === 1 ? m3.errorContainer : m3.secondaryContainer }}>
                        <span className="text-[11px] font-medium" style={{ color: i === 0 ? m3.onPrimaryContainer : i === 1 ? m3.onErrorContainer : m3.onSecondaryContainer }}>
                          {assignment.teacher.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <p className="text-[14px] leading-tight font-medium" style={{ color: m3.onSurface }}>
                            {assignment.title}
                          </p>
                          <span className="text-[11px] shrink-0 ml-2 font-medium" style={{ color: assignment.urgent ? m3.error : m3.outline }}>
                            {assignment.dueDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mb-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium" style={{ background: m3.surfaceContainerHigh, color: m3.onSurfaceVariant }}>
                            {assignment.subject}
                          </span>
                          <span className="text-[11px]" style={{ color: m3.outline }}>
                            {assignment.teacher}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {/* M3 Filled Button */}
                          <button className="flex-1 h-9 rounded-full text-[12px] font-medium transition-all cursor-pointer border-none" style={{ background: m3.error, color: "#FFFFFF" }}>
                            Start now
                          </button>
                          {/* M3 Outlined Button */}
                          <button className="flex-1 h-9 rounded-full text-[12px] font-medium transition-colors cursor-pointer bg-transparent" style={{ border: `1px solid ${m3.outline}`, color: m3.primary }}>
                            View details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Class Notes — M3 */}
            <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
              <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
                <div className="flex items-center gap-2">
                  <Notebook size={16} weight="fill" style={{ color: m3.amber }} />
                  <span className="text-[14px] font-medium" style={{ color: m3.onSurface }}>Class Notes</span>
                </div>
                <button 
                  onClick={() => router.push("/class-notes")}
                  className="text-[12px] cursor-pointer bg-transparent border-none transition-colors flex items-center gap-1 font-medium"
                  style={{ color: m3.primary }}>
                  View all <CaretRight size={10} weight="bold" />
                </button>
              </div>
              <div>
                {[
                  { date: "Dec 15", topic: "Quadratic Equations", subject: "Mathematics", files: 3 },
                  { date: "Dec 14", topic: "Newton's Laws", subject: "Physics", files: 2 },
                  { date: "Dec 13", topic: "Organic Chemistry", subject: "Chemistry", files: 4 },
                ].map((note, i, arr) => (
                  <div key={i} onClick={() => router.push("/class-notes")} className="p-3 transition-colors cursor-pointer hover:opacity-80" style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: i === 0 ? m3.primaryContainer : i === 1 ? m3.tertiaryContainer : m3.amberContainer }}>
                        <Notebook size={18} weight="fill" style={{ color: i === 0 ? m3.onPrimaryContainer : i === 1 ? m3.onTertiaryContainer : m3.onAmberContainer }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium mb-0.5" style={{ color: m3.onSurface }}>{note.topic}</p>
                        <div className="flex items-center gap-1.5">
                          <p className="text-[12px]" style={{ color: m3.onSurfaceVariant }}>{note.subject}</p>
                          <span style={{ color: m3.outlineVariant }}>•</span>
                          <div className="flex items-center gap-0.5">
                            <FileText size={10} weight="bold" style={{ color: m3.outline }} />
                            <span className="text-[12px]" style={{ color: m3.outline }}>{note.files} files</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-[12px] shrink-0" style={{ color: m3.outline }}>{note.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Streak Calendar */}
            <StreakCalendar />

            {/* Quick Access Cards — M3 Filled Tonal */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: ChartBar, label: "Analytics", desc: "View your learning stats", href: "/analytics", bg: m3.primaryContainer, fg: m3.onPrimaryContainer },
                { icon: Wallet, label: "Wallet", desc: "Manage payments", href: "/wallet", bg: m3.greenContainer, fg: m3.onGreenContainer },
                { icon: VideoCamera, label: "Book Demo", desc: "Free trial class", href: "/booking", bg: m3.tertiaryContainer, fg: m3.onTertiaryContainer },
                { icon: Notebook, label: "Class Notes", desc: "Access all materials", href: "/class-notes", bg: m3.amberContainer, fg: m3.onAmberContainer },
              ].map((card, i) => (
                <button
                  key={i}
                  onClick={() => router.push(card.href)}
                  className="rounded-[12px] p-4 transition-all cursor-pointer text-left hover:shadow-sm active:scale-[0.98]"
                  style={{ background: m3.surfaceContainerLowest }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ background: card.bg }}>
                    <card.icon size={20} weight="fill" style={{ color: card.fg }} />
                  </div>
                  <p className="text-[14px] font-medium mb-0.5" style={{ color: m3.onSurface }}>{card.label}</p>
                  <p className="text-[12px]" style={{ color: m3.onSurfaceVariant }}>{card.desc}</p>
                </button>
              ))}
            </div>


          </div>

          {/* Right Column - Sidebar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            
            {/* This Week Stats — M3 */}
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
                  { value: "8", label: "Classes", color: m3.primary, bg: m3.primaryContainer },
                  { value: "12.5", label: "Hours", color: m3.secondary, bg: m3.secondaryContainer },
                  { value: "92%", label: "Avg Score", color: m3.green, bg: m3.greenContainer },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center py-4"
                    style={{ borderRight: i < 2 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}
                  >
                    <p className="text-[20px] font-semibold leading-none mb-1" style={{ color: stat.color }}>{stat.value}</p>
                    <p className="text-[11px]" style={{ color: m3.onSurfaceVariant }}>{stat.label}</p>
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
                  <div
                    key={i}
                    className="px-4 py-2.5 transition-colors hover:opacity-80"
                    style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}
                  >
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

            {/* Recent Activity — M3 */}
            <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLow }}>
              <div className="px-4 py-3" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} weight="fill" style={{ color: m3.green }} />
                  <span className="text-[13px] font-medium" style={{ color: m3.onSurface }}>Recent Activity</span>
                </div>
              </div>
              <div>
                {[
                  { action: "Completed Quadratic Equations quiz", score: "18/20", time: "30m" },
                  { action: "Submitted Physics assignment", score: "On time", time: "2h" },
                  { action: "Attended Chemistry class", score: "1 hour", time: "3h" },
                  { action: "Solved 15 practice problems", score: "Math", time: "5h" },
                ].map((a, i, arr) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 px-4 py-3 transition-colors cursor-pointer hover:opacity-80"
                    style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: m3.greenContainer }}>
                      <CheckCircle size={14} weight="fill" style={{ color: m3.green }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] truncate" style={{ color: m3.onSurface }}>{a.action}</p>
                      <p className="text-[12px] mt-0.5" style={{ color: m3.onSurfaceVariant }}>{a.score}</p>
                    </div>
                    <span className="text-[11px] shrink-0" style={{ color: m3.outline }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Tests — M3 */}
            <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLowest }}>
              <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
                <div className="flex items-center gap-2">
                  <Exam size={16} weight="fill" style={{ color: m3.error }} />
                  <span className="text-[13px] font-medium" style={{ color: m3.onSurface }}>Upcoming Tests</span>
                </div>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full" style={{ background: m3.errorContainer, color: m3.onErrorContainer }}>3 scheduled</span>
              </div>
              <div>
                {[
                  { subject: "Mathematics", topic: "Calculus", date: "Tomorrow", urgent: true, color: m3.error, bg: m3.errorContainer, fg: m3.onErrorContainer },
                  { subject: "Physics", topic: "Mechanics", date: "In 3 days", urgent: false, color: m3.primary, bg: m3.primaryContainer, fg: m3.onPrimaryContainer },
                  { subject: "Chemistry", topic: "Organic", date: "Next week", urgent: false, color: m3.secondary, bg: m3.secondaryContainer, fg: m3.onSecondaryContainer },
                ].map((test, i, arr) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors hover:opacity-80"
                    style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}
                  >
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: test.bg }}>
                      <Exam size={16} weight="fill" style={{ color: test.fg }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium truncate" style={{ color: m3.onSurface }}>{test.subject}</p>
                      <p className="text-[11px] truncate" style={{ color: m3.outline }}>{test.topic}</p>
                    </div>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0" style={{ background: test.urgent ? m3.errorContainer : m3.surfaceContainerHigh, color: test.urgent ? m3.error : m3.outline }}>
                      {test.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Messages — M3 */}
            <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLow }}>
              <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
                <div className="flex items-center gap-2">
                  <ChatCircle size={16} weight="fill" style={{ color: m3.tertiary }} />
                  <span className="text-[13px] font-medium" style={{ color: m3.onSurface }}>Messages</span>
                </div>
                <button
                  onClick={() => router.push("/teachers")}
                  className="text-[12px] cursor-pointer bg-transparent border-none transition-colors flex items-center gap-1 font-medium"
                  style={{ color: m3.primary }}
                >
                  Open <CaretRight size={10} weight="bold" />
                </button>
              </div>
              <div>
                {[
                  { name: "Ayush Soni", msg: "Great work on today's assignment!", time: "15m" },
                  { name: "Priya Menon", msg: "Don't forget tomorrow's test", time: "1h" },
                  { name: "Study Group", msg: "Meeting at 5 PM today", time: "2h" },
                ].map((msg, i, arr) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors hover:opacity-80"
                    style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}
                  >
                    <img
                      src={`https://api.dicebear.com/7.x/notionists/svg?seed=${msg.name}`}
                      alt={msg.name}
                      className="w-9 h-9 rounded-full shrink-0"
                      style={{ background: m3.surfaceContainerHigh }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium truncate" style={{ color: m3.onSurface }}>{msg.name}</p>
                      <p className="text-[12px] truncate" style={{ color: m3.onSurfaceVariant }}>{msg.msg}</p>
                    </div>
                    <span className="text-[11px] shrink-0" style={{ color: m3.outline }}>{msg.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Chart — M3 */}
            <div className="rounded-[12px] overflow-hidden" style={{ background: m3.surfaceContainerLow }}>
              <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${m3.surfaceContainerHigh}` }}>
                <div className="flex items-center gap-2">
                  <ChartBar size={16} weight="fill" style={{ color: m3.amber }} />
                  <span className="text-[13px] font-medium" style={{ color: m3.onSurface }}>Performance</span>
                </div>
                <button
                  onClick={() => router.push("/progress")}
                  className="text-[12px] cursor-pointer bg-transparent border-none transition-colors flex items-center gap-1 font-medium"
                  style={{ color: m3.primary }}
                >
                  Details <CaretRight size={10} weight="bold" />
                </button>
              </div>
              <div className="px-4 pt-4 pb-2">
                <div className="flex items-end justify-between gap-1.5 h-[60px]">
                  {[
                    { label: "Mon", fill: 0.7 },
                    { label: "Tue", fill: 0.85 },
                    { label: "Wed", fill: 0.6 },
                    { label: "Thu", fill: 0.9 },
                    { label: "Fri", fill: 0.75 },
                    { label: "Sat", fill: 1.0 },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group cursor-pointer">
                      <div
                        className="w-full rounded-[4px] transition-all group-hover:opacity-70"
                        style={{
                          height: `${bar.fill * 100}%`,
                          background: bar.fill === 1.0 ? m3.primary : bar.fill >= 0.85 ? m3.secondaryContainer : bar.fill >= 0.7 ? m3.amberContainer : m3.surfaceContainerHighest,
                        }}
                      />
                      <span className="text-[10px]" style={{ color: m3.outline }}>{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ borderTop: `1px solid ${m3.surfaceContainerHigh}` }}>
                {[
                  { label: "This week", value: "92%", sub: "8 tests" },
                  { label: "Last week", value: "88%", sub: "7 tests" },
                  { label: "Monthly avg", value: "90%", sub: "Improving" },
                ].map((item, i, arr) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-2.5 transition-colors cursor-pointer hover:opacity-80"
                    style={{ borderBottom: i < arr.length - 1 ? `1px solid ${m3.surfaceContainerHigh}` : "none" }}
                  >
                    <span className="text-[12px]" style={{ color: m3.onSurfaceVariant }}>{item.label}</span>
                    <div className="text-right">
                      <span className="text-[13px] font-medium" style={{ color: m3.onSurface }}>{item.value}</span>
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
                { label: "My Progress", desc: "Stats & analytics", icon: ChartLineUp, href: "/progress", bg: m3.secondaryContainer, fg: m3.onSecondaryContainer },
                { label: "All Teachers", desc: "Browse & book", icon: GraduationCap, href: "/teachers", bg: m3.tertiaryContainer, fg: m3.onTertiaryContainer },
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
