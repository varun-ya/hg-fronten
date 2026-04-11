"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, CheckCircle, TrendUp, Export, Download, Receipt
} from "@phosphor-icons/react";
import { studentData } from "@/data/studentData";

export default function AnalyticsPage() {
  const router = useRouter();
  const data = studentData;
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans text-[#111] bg-[#FAFAFA]">


      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#EBEBEB] px-5 py-2.5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()} 
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F5F5F5] transition-colors cursor-pointer border-none bg-transparent"
            >
              <ArrowLeft size={18} weight="bold" className="text-[#111]" />
            </button>
            <div>
              <span className="text-[17px] font-medium text-[#111]">Analytics</span>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setExportOpen(!exportOpen)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-medium text-[#111] cursor-pointer transition-colors border border-[#E5E7EB] bg-transparent hover:bg-white"
            >
              <Export size={14} />
              Export
            </button>
            {exportOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setExportOpen(false)} />
                <div className="absolute top-full right-0 mt-2 w-[140px] bg-white border border-[#EBEBEB] rounded-xl shadow-lg z-50 py-1.5">
                  <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#FAFAFA] transition-colors text-left border-none bg-transparent cursor-pointer">
                    <Download size={14} className="text-[#888]" />
                    <span className="text-[14px] text-[#111] font-medium">CSV</span>
                  </button>
                  <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#FAFAFA] transition-colors text-left border-none bg-transparent cursor-pointer">
                    <Receipt size={14} className="text-[#888]" />
                    <span className="text-[14px] text-[#111] font-medium">PDF</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 px-5 py-6">
        
        {/* Main Column */}
        <main className="space-y-5">
          
          {/* Overview Stats */}
          <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#F5F5F5]">
              <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">Overview</span>
            </div>
            <div className="grid grid-cols-4 border-b border-[#F5F5F5]">
              {[
                { value: data.xp.toLocaleString(), label: "Total XP" },
                { value: data.streak, label: "Day Streak" },
                { value: data.sessionsThisWeek, label: "Classes" },
                { value: `${data.hoursThisWeek}h`, label: "Hours" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center py-4 hover:bg-[#FFF7F0] transition-colors cursor-pointer"
                  style={{ borderRight: i < 3 ? "1px solid #F5F5F5" : "none" }}
                >
                  <p className="text-[20px] font-medium text-[#111] leading-none mb-1">{stat.value}</p>
                  <p className="text-[11px] text-[#888]">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 bg-[#FFF7F0] flex items-center gap-2">
              <TrendUp size={12} className="text-[#F97316]" weight="bold" />
              <span className="text-[12px] text-[#666]">+85 XP this week · Keep it up!</span>
            </div>
          </div>

          {/* Weekly Activity */}
          <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#F5F5F5] flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">Weekly Activity</span>
              <span className="text-[11px] text-[#AAA]">Last 7 days</span>
            </div>
            <div className="px-4 py-4">
              <div className="flex items-end justify-between gap-2 h-[100px]">
                {[
                  { day: "Mon", hours: 0.6, sessions: 1 },
                  { day: "Tue", hours: 0.8, sessions: 2 },
                  { day: "Wed", hours: 0.4, sessions: 1 },
                  { day: "Thu", hours: 1.0, sessions: 2 },
                  { day: "Fri", hours: 0.7, sessions: 1 },
                  { day: "Sat", hours: 0.3, sessions: 1 },
                  { day: "Sun", hours: 0.0, sessions: 0 },
                ].map((bar) => (
                  <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="relative w-full">
                      <div
                        className="w-full rounded-[3px] transition-all"
                        style={{
                          height: `${bar.hours * 90}px`,
                          backgroundColor: bar.hours > 0 ? '#E5E7EB' : '#F5F5F5',
                        }}
                      />
                    </div>
                    <span className="text-[9px] text-[#AAA]">{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subject Progress */}
          <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#F5F5F5]">
              <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">Subject Progress</span>
            </div>
            <div>
              {[
                { subject: "Mathematics", chapter: "Ch. 5: Quadratics", progress: 0.65 },
                { subject: "Physics", chapter: "Newton's Laws", progress: 0.40 },
                { subject: "English", chapter: "Essay Writing", progress: 0.80 },
              ].map((item, i, arr) => (
                <div 
                  key={item.subject}
                  className="px-4 py-3 hover:bg-[#FFF7F0] transition-colors cursor-pointer"
                  style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] font-medium text-[#111]">{item.subject}</span>
                    <span className="text-[12px] font-medium text-[#666]">
                      {Math.round(item.progress * 100)}%
                    </span>
                  </div>
                  <p className="text-[11px] text-[#AAA] mb-2">{item.chapter}</p>
                  <div className="h-1.5 bg-[#F5F5F5] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-[#F97316] transition-all duration-700"
                      style={{ width: `${item.progress * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#F5F5F5] flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">Recent Achievements</span>
              <span className="text-[11px] text-[#666]">6 total</span>
            </div>
            <div>
              {[
                { title: "7-day streak", subtitle: "Learning every day" },
                { title: "Top 15%", subtitle: "Weekly leaderboard" },
                { title: "1,240 XP", subtitle: "Experience points" },
                { title: "16 classes", subtitle: "Sessions completed" },
              ].map((achievement, i, arr) => (
                <div 
                  key={achievement.title}
                  className="flex items-center justify-between px-4 py-3 hover:bg-[#FFF7F0] transition-colors cursor-pointer"
                  style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
                >
                  <div className="flex-1">
                    <p className="text-[13px] font-medium text-[#111] mb-0.5">
                      {achievement.title}
                    </p>
                    <p className="text-[11px] text-[#AAA]">
                      {achievement.subtitle}
                    </p>
                  </div>
                  <CheckCircle size={16} weight="fill" className="text-[#F97316]" />
                </div>
              ))}
            </div>
          </div>

        </main>

        {/* Sidebar - Clean Design */}
        <aside className="hidden lg:block space-y-4">
          <div className="sticky top-[52px] space-y-4">
            
            {/* Study Streak */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F5F5F5]">
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">Study Streak</span>
              </div>
              <div className="px-4 py-4 bg-[#FFF7F0]">
                <div className="text-center mb-4">
                  <p className="text-[32px] font-medium text-[#111] leading-none mb-1">{data.streak}</p>
                  <p className="text-[12px] text-[#888]">days in a row</p>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div
                      key={day}
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: day <= data.streak ? '#F97316' : '#FFF',
                        border: day <= data.streak ? 'none' : '1px solid #EBEBEB'
                      }}
                    >
                      {day <= data.streak && (
                        <CheckCircle size={14} weight="fill" className="text-white" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>


            {/* This Week */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F5F5F5]">
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">This Week</span>
              </div>
              <div className="grid grid-cols-3 border-b border-[#F5F5F5]">
                {[
                  { value: data.sessionsThisWeek, label: "Classes" },
                  { value: `${data.hoursThisWeek}h`, label: "Hours" },
                  { value: "92%", label: "Avg Score" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center py-3.5"
                    style={{ borderRight: i < 2 ? "1px solid #F5F5F5" : "none" }}
                  >
                    <p className="text-[16px] font-medium text-[#111] leading-none mb-1">{stat.value}</p>
                    <p className="text-[11px] text-[#AAA]">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div>
                {[
                  { label: "Assignments completed", value: "5" },
                  { label: "Tests taken", value: "3" },
                  { label: "Doubts cleared", value: "12" },
                  { label: "Practice problems", value: "48" },
                ].map((stat, i, arr) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-[#FAFAFA] transition-colors"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
                  >
                    <span className="text-[12px] text-[#666]">{stat.label}</span>
                    <span className="text-[12px] font-medium text-[#111]">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F5F5F5]">
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">Performance</span>
              </div>
              <div>
                {[
                  { label: "Mathematics", value: "95%" },
                  { label: "Physics", value: "88%" },
                  { label: "English", value: "94%" },
                  { label: "Overall Average", value: "92%" },
                ].map((stat, i, arr) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-[#FAFAFA] transition-colors cursor-pointer"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
                  >
                    <span className="text-[12px] text-[#666]">{stat.label}</span>
                    <span className="text-[13px] font-medium text-[#111]">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* My Tutors */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F5F5F5]">
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">My Tutors</span>
              </div>
              <div className="p-4 space-y-3">
                {data.tutors.map((tutor, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-3 cursor-pointer hover:bg-[#FAFAFA] -mx-2 px-2 py-2 rounded-lg transition-colors"
                  >
                    <img
                      src={`https://api.dicebear.com/7.x/notionists/svg?seed=${tutor.name}`}
                      alt={tutor.name}
                      className="w-8 h-8 rounded-full border border-[#EBEBEB]"
                      style={{ backgroundColor: "#F5F5F5" }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-[#111] truncate">{tutor.name}</p>
                      <p className="text-[11px] text-[#AAA]">{tutor.subject}</p>
                    </div>
                    <span className="text-[11px] text-[#666]">12</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Goals */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F5F5F5] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">Goals</span>
                <span className="text-[11px] text-[#666]">2/3</span>
              </div>
              <div>
                {[
                  { goal: "Complete 5 classes", progress: 0.8, current: 4, target: 5, completed: false },
                  { goal: "Maintain 7-day streak", progress: 1.0, current: 7, target: 7, completed: true },
                  { goal: "Score 90%+ in tests", progress: 0.66, current: 2, target: 3, completed: false },
                ].map((item, i, arr) => (
                  <div
                    key={i}
                    className="px-4 py-3 hover:bg-[#FFF7F0] transition-colors cursor-pointer"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px] text-[#666]">{item.goal}</span>
                      {item.completed && (
                        <CheckCircle size={14} weight="fill" className="text-[#F97316]" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-[#F5F5F5] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ 
                            width: `${item.progress * 100}%`,
                            backgroundColor: item.completed ? '#F97316' : '#111'
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-[#AAA]">
                        {item.current}/{item.target}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 px-2 text-[11px] text-[#AAA] font-medium">
              {["Help", "Support", "Privacy", "Terms"].map((l) => (
                <span key={l} className="cursor-pointer hover:text-[#888] transition-colors">{l}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
