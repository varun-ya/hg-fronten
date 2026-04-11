"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Menu, X, TrendingUp, Flame, BookOpen, Clock, Trophy, Target, Award, Users, Calendar, ChevronDown } from "lucide-react";

const P = {
  blue: "#2C3C69", blueDark: "#1E2D52", blueDeep: "#131E3A", blueSub: "#EDF0F7",
  amber: "#FBBF24", amberDark: "#B45309", orange: "#F97316", orangeLight: "#FB923C",
  green: "#16A34A", greenLight: "#10B981", red: "#EF4444", purple: "#8B5CF6",
  white: "#FFFFFF", bg: "#FAFAFA", border: "#E5E7EB", text: "#0F1117", muted: "#6B7280",
};

export default function StatsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: P.bg }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b" style={{ backgroundColor: P.white, borderColor: P.border }}>
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-gray-50">
            <Menu size={20} style={{ color: P.text }} />
          </button>
          <h1 className="text-lg font-bold" style={{ color: P.text }}>My Progress</h1>
          <div className="w-9" />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              
              {/* Left Column */}
              <main className="flex-1 space-y-6">
                
                {/* Hero Stats Card */}
                <div className="relative overflow-hidden rounded-2xl shadow-lg" style={{ background: `linear-gradient(135deg, ${P.blue} 0%, ${P.blueDeep} 100%)` }}>
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24" />
                  </div>
                  
                  <div className="relative p-6 lg:p-8">
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <p className="text-white/70 text-sm mb-2 font-medium">Total Experience Points</p>
                        <div className="flex items-baseline gap-4">
                          <h2 className="text-5xl lg:text-6xl font-bold text-white tracking-tight">1,240</h2>
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                            <TrendingUp size={14} className="text-green-300" />
                            <span className="text-sm font-semibold text-green-300">+85 this week</span>
                          </div>
                        </div>
                      </div>
                      <div className="hidden lg:block w-32 h-20 opacity-20">
                        <svg viewBox="0 0 140 80" className="w-full h-full">
                          <defs>
                            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="white" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path d="M0,60 L20,55 L40,50 L60,42 L80,35 L100,25 L120,15 L140,5" fill="none" stroke="white" strokeWidth="3" />
                          <path d="M0,60 L20,55 L40,50 L60,42 L80,35 L100,25 L120,15 L140,5 L140,80 L0,80 Z" fill="url(#grad)" />
                        </svg>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                      {[
                        { icon: Flame, label: "Day Streak", value: "7", color: P.orange, bg: "rgba(249, 115, 22, 0.15)" },
                        { icon: BookOpen, label: "Classes", value: "4", color: "#4A7CF5", bg: "rgba(74, 124, 245, 0.15)" },
                        { icon: Clock, label: "Hours", value: "3.5h", color: P.greenLight, bg: "rgba(16, 185, 129, 0.15)" },
                        { icon: Trophy, label: "Rank", value: "15", color: P.amber, bg: "rgba(251, 191, 36, 0.15)" },
                      ].map((stat, i) => (
                        <div key={i} className="rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all" style={{ backgroundColor: stat.bg }}>
                          <stat.icon size={20} style={{ color: stat.color }} className="mb-2" />
                          <p className="text-white/70 text-xs mb-1">{stat.label}</p>
                          <p className="text-white text-2xl font-bold">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Weekly Activity */}
                <div className="bg-white rounded-2xl shadow-sm border" style={{ borderColor: P.border }}>
                  <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: P.border }}>
                    <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: P.muted }}>Weekly Activity</h3>
                    <button className="flex items-center gap-2 text-sm hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors" style={{ color: P.muted }}>
                      <span>Last 7 days</span>
                      <ChevronDown size={14} />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-end justify-between gap-2 h-40">
                      {[
                        { day: "Mon", height: 60, classes: 1 },
                        { day: "Tue", height: 80, classes: 2 },
                        { day: "Wed", height: 40, classes: 1 },
                        { day: "Thu", height: 100, classes: 2 },
                        { day: "Fri", height: 70, classes: 1 },
                        { day: "Sat", height: 30, classes: 1 },
                        { day: "Sun", height: 0, classes: 0 },
                      ].map((d, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                          <div className="relative w-full">
                            <div 
                              className="w-full rounded-t-lg transition-all group-hover:opacity-80 group-hover:scale-105"
                              style={{ 
                                height: `${d.height}px`, 
                                backgroundColor: d.height > 0 ? "#4A7CF5" : "#E5E7EB",
                                boxShadow: d.height > 0 ? "0 4px 12px rgba(74, 124, 245, 0.2)" : "none"
                              }}
                            />
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              <div className="bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                                {d.classes} {d.classes === 1 ? "class" : "classes"}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs font-medium" style={{ color: P.muted }}>{d.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Subject Progress */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: P.muted }}>Subject Progress</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: "Mathematics", chapter: "Ch. 5: Quadratics", progress: 65, color: "#4A7CF5", icon: "∫" },
                      { name: "Physics", chapter: "Newton's Laws", progress: 40, color: "#E85060", icon: "⚡" },
                      { name: "English", chapter: "Essay Writing", progress: 80, color: P.greenLight, icon: "📖" },
                    ].map((sub, i) => (
                      <div key={i} className="bg-white rounded-2xl p-5 border hover:shadow-md transition-all cursor-pointer group" style={{ borderColor: P.border }}>
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform" 
                            style={{ backgroundColor: `${sub.color}15` }}>
                            {sub.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-base font-bold" style={{ color: P.text }}>{sub.name}</h4>
                              <span className="text-lg font-bold" style={{ color: sub.color }}>{sub.progress}%</span>
                            </div>
                            <p className="text-sm mb-3" style={{ color: P.muted }}>{sub.chapter}</p>
                            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full transition-all duration-500 shadow-sm"
                                style={{ width: `${sub.progress}%`, backgroundColor: sub.color }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: P.muted }}>Achievements</h3>
                    <span className="text-xs font-medium" style={{ color: P.muted }}>6 unlocked</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { icon: Flame, title: "7-day streak", desc: "Learning every day", color: P.orange },
                      { icon: Trophy, title: "Top 15%", desc: "Weekly leaderboard", color: P.amber },
                      { icon: Award, title: "1,240 XP", desc: "Experience points", color: P.purple },
                      { icon: BookOpen, title: "16 classes", desc: "Sessions completed", color: "#4A7CF5" },
                      { icon: Target, title: "12 assignments", desc: "Submitted on time", color: P.greenLight },
                      { icon: Users, title: "92% avg", desc: "Test score average", color: P.red },
                    ].map((ach, i) => (
                      <div key={i} className="bg-white rounded-2xl p-5 border hover:shadow-lg transition-all cursor-pointer group" style={{ borderColor: P.border }}>
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                            style={{ backgroundColor: `${ach.color}15` }}>
                            <ach.icon size={24} style={{ color: ach.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold mb-0.5" style={{ color: P.text }}>{ach.title}</p>
                            <p className="text-xs" style={{ color: P.muted }}>{ach.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </main>

              {/* Right Sidebar */}
              <aside className="w-full lg:w-80 space-y-6">
                
                {/* Study Streak */}
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden" style={{ borderColor: P.border }}>
                  <div className="px-5 py-4 border-b" style={{ borderColor: P.border }}>
                    <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: P.muted }}>Study Streak</h3>
                  </div>
                  <div className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-full mb-6 relative"
                      style={{ background: `linear-gradient(135deg, ${P.orange}20 0%, ${P.orange}05 100%)` }}>
                      <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-inner">
                        <Flame size={48} style={{ color: P.orange }} />
                      </div>
                    </div>
                    <h2 className="text-5xl font-bold mb-2" style={{ color: P.text }}>7</h2>
                    <p className="text-sm mb-6" style={{ color: P.muted }}>days in a row</p>
                    <div className="flex items-center justify-center gap-2">
                      {[...Array(7)].map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                          style={{ backgroundColor: P.orange }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* This Week */}
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden" style={{ borderColor: P.border }}>
                  <div className="px-5 py-4 border-b" style={{ borderColor: P.border }}>
                    <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: P.muted }}>This Week</h3>
                  </div>
                  <div>
                    {[
                      { label: "Sessions completed", value: "4" },
                      { label: "Hours learned", value: "3.5h" },
                      { label: "XP earned", value: "85" },
                      { label: "Assignments done", value: "3" },
                      { label: "Streak maintained", value: "7 days" },
                    ].map((item, i, arr) => (
                      <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
                        style={{ borderBottom: i < arr.length - 1 ? `1px solid ${P.border}` : "none" }}>
                        <span className="text-sm" style={{ color: P.muted }}>{item.label}</span>
                        <span className="text-sm font-bold" style={{ color: P.text }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance */}
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden" style={{ borderColor: P.border }}>
                  <div className="px-5 py-4 border-b" style={{ borderColor: P.border }}>
                    <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: P.muted }}>Performance</h3>
                  </div>
                  <div className="grid grid-cols-3 border-b" style={{ borderColor: P.border }}>
                    {[
                      { label: "Avg Score", value: "92%" },
                      { label: "Tests", value: "8" },
                      { label: "Rank", value: "15" },
                    ].map((stat, i) => (
                      <div key={i} className="flex flex-col items-center py-5"
                        style={{ borderRight: i < 2 ? `1px solid ${P.border}` : "none" }}>
                        <p className="text-xl font-bold mb-1" style={{ color: P.text }}>{stat.value}</p>
                        <p className="text-xs" style={{ color: P.muted }}>{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    {[
                      { subject: "Mathematics", score: "95%" },
                      { subject: "Physics", score: "88%" },
                      { subject: "English", score: "94%" },
                    ].map((item, i, arr) => (
                      <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
                        style={{ borderBottom: i < arr.length - 1 ? `1px solid ${P.border}` : "none" }}>
                        <span className="text-sm" style={{ color: P.muted }}>{item.subject}</span>
                        <span className="text-sm font-bold" style={{ color: P.text }}>{item.score}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Goals */}
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden" style={{ borderColor: P.border }}>
                  <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: P.border }}>
                    <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: P.muted }}>Goals</h3>
                    <span className="text-xs font-bold" style={{ color: P.greenLight }}>2/3 completed</span>
                  </div>
                  <div>
                    {[
                      { title: "Complete 5 classes", progress: 80, current: 4, total: 5, completed: false },
                      { title: "Maintain 7-day streak", progress: 100, current: 7, total: 7, completed: true },
                      { title: "Score 90%+ in tests", progress: 66, current: 2, total: 3, completed: false },
                    ].map((goal, i, arr) => (
                      <div key={i} className="px-5 py-4 hover:bg-gray-50 transition-colors"
                        style={{ borderBottom: i < arr.length - 1 ? `1px solid ${P.border}` : "none" }}>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium" style={{ color: P.text }}>{goal.title}</span>
                          {goal.completed && (
                            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: P.greenLight }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all"
                              style={{ 
                                width: `${goal.progress}%`, 
                                backgroundColor: goal.completed ? P.greenLight : "#4A7CF5" 
                              }}
                            />
                          </div>
                          <span className="text-xs font-medium" style={{ color: P.muted }}>
                            {goal.current}/{goal.total}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
