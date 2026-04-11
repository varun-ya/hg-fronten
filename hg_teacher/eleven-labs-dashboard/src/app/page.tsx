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
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";

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
    <div className="min-h-screen bg-[#FAFAFA] font-sans">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FAFAFA] border-b border-[#EBEBEB] px-5 py-2.5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {isMobile && (
              <button
                onClick={toggle}
                className="p-2 hover:bg-white rounded-lg transition-colors cursor-pointer border-none bg-transparent lg:hidden"
              >
                <List size={20} className="text-[#888]" weight="bold" />
              </button>
            )}
            <span className="text-[17px] font-medium text-[#111]">Dashboard</span>
            <span className="text-[13px] text-[#666] hidden sm:block">
              {now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <button
            onClick={() => router.push("/notifications")}
            className="relative p-2 hover:bg-white rounded-lg transition-colors cursor-pointer border-none bg-transparent"
          >
            <Bell size={20} className="text-[#888]" weight="bold" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F97316] rounded-full" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-5 py-6">
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          
          {/* Left Column - Main Content */}
          <div className="space-y-5">
            
            {/* Stats Grid */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#F5F5F5]">
                {[
                  { icon: CurrencyInr, value: "₹12,400", label: "Earned this month", change: "+18%", changeColor: "text-[#16A34A]" },
                  { icon: Users, value: "7", label: "Active students", change: "+2", changeColor: "text-[#16A34A]" },
                  { icon: Star, value: "4.8", label: "Average rating", change: "156 reviews", changeColor: "text-[#888]" },
                  { icon: Flame, value: "12", label: "Day streak", change: "Active", changeColor: "text-[#F97316]" },
                ].map((stat, i) => (
                  <div key={i} className="px-5 py-4 hover:bg-[#FAFAFA] transition-colors cursor-pointer">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-[#FAFAFA] flex items-center justify-center">
                        <stat.icon size={16} className="text-[#888]" weight="regular" />
                      </div>
                      <span className={`text-[11px] font-medium ${stat.changeColor}`}>{stat.change}</span>
                    </div>
                    <p className="text-[20px] font-medium text-[#111] leading-none mb-1.5">{stat.value}</p>
                    <p className="text-[12px] text-[#666]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Session */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-5 py-3 border-b border-[#F5F5F5] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">Next Session</span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF4ED] text-[11px] font-semibold text-[#F97316]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />
                  Live in 10m
                </span>
              </div>
              <div className="px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative shrink-0">
                  <img
                    src="https://api.dicebear.com/7.x/notionists/svg?seed=Meera Iyer"
                    alt="Meera Iyer"
                    className="w-14 h-14 rounded-full border-2 border-[#EBEBEB]"
                    style={{ backgroundColor: "#FAFAFA" }}
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#10B981] border-2 border-white rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-semibold text-[#111] leading-none mb-2">Meera Iyer</p>
                  <div className="flex items-center gap-2 text-[12px] text-[#666]">
                    <span>English Literature</span>
                    <span className="text-[#DDD]">•</span>
                    <span>{timeStr}</span>
                    <span className="text-[#DDD]">•</span>
                    <span>1 hour</span>
                  </div>
                </div>
                <button className="h-9 px-5 rounded-lg bg-[#111] hover:bg-[#000] text-white text-[13px] font-semibold cursor-pointer border-none transition-all shrink-0 w-full sm:w-auto">
                  Join now
                </button>
              </div>
            </div>

            {/* Demo Requests */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">Demo Requests</span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF4ED] text-[11px] font-semibold text-[#F97316]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                  3 new
                </span>
              </div>
              <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden divide-y divide-[#F5F5F5]">
                {[
                  { name: "Amit Desai", subject: "Mathematics", grade: "Class 11", message: "Looking for help with Calculus. Struggling with integration by parts.", time: "6h" },
                  { name: "Kavya Singh", subject: "JEE Advanced", grade: "Class 12", message: "Need intensive coaching for JEE Advanced. Currently scoring 180/300 in mocks.", time: "1d" },
                  { name: "Rahul Joshi", subject: "Physics", grade: "Class 11", message: "Want to start from basics. Need someone patient who can explain from scratch.", time: "2d" },
                ].map((req, i) => (
                  <div key={i} className="p-4 hover:bg-[#FAFAFA] transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FAFAFA] border border-[#EBEBEB] flex items-center justify-center shrink-0">
                        <span className="text-[11px] font-semibold text-[#888]">
                          {req.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1.5">
                          <p className="text-[14px] font-semibold text-[#111] leading-none">{req.name}</p>
                          <span className="text-[11px] text-[#AAA] shrink-0">{req.time} ago</span>
                        </div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="px-2 py-0.5 rounded-md bg-[#FAFAFA] border border-[#EBEBEB] text-[11px] font-medium text-[#666]">
                            {req.subject}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-[#FAFAFA] text-[11px] font-medium text-[#888]">
                            {req.grade}
                          </span>
                        </div>
                        <p className="text-[13px] text-[#666] leading-relaxed mb-3">{req.message}</p>
                        <div className="flex items-center gap-2">
                          <button className="flex-1 h-8 rounded-lg bg-[#111] hover:bg-[#000] text-white text-[12px] font-semibold transition-colors cursor-pointer border-none">
                            Accept
                          </button>
                          <button className="flex-1 h-8 rounded-lg bg-transparent hover:bg-[#F5F5F5] text-[#888] hover:text-[#111] text-[12px] font-semibold transition-colors cursor-pointer border border-[#EBEBEB]">
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">Today's Schedule</span>
                <button
                  onClick={() => router.push("/schedule")}
                  className="text-[11px] text-[#F97316] hover:text-[#EA580C] cursor-pointer bg-transparent border-none transition-colors flex items-center gap-1 font-medium"
                >
                  View all <CaretRight size={10} weight="bold" />
                </button>
              </div>
              <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-[#F5F5F5]">
                  {[
                    { value: "3", label: "Classes" },
                    { value: "2", label: "Done" },
                    { value: "₹1,500", label: "Earned" },
                    { value: "1", label: "Pending" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center py-3.5"
                      style={{ borderRight: i < 3 ? "1px solid #F5F5F5" : "none" }}
                    >
                      <p className="text-[16px] font-medium text-[#111] leading-none mb-1">{stat.value}</p>
                      <p className="text-[11px] text-[#AAA]">{stat.label}</p>
                    </div>
                  ))}
                </div>
                {/* Schedule List */}
                <div className="divide-y divide-[#F5F5F5]">
                  {[
                    { time: "10:30 AM", student: "Aarav Sharma", subject: "Mathematics", status: "done" },
                    { time: "11:30 AM", student: "Priya Patel", subject: "Physics", status: "next" },
                    { time: "2:00 PM", student: "Rohan Gupta", subject: "Chemistry", status: "" },
                    { time: "4:30 PM", student: "Kavya Singh", subject: "JEE Prep", status: "" },
                  ].map((s, i) => {
                    const isDone = s.status === "done";
                    const isNext = s.status === "next";
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-3.5 px-4 py-3.5 cursor-pointer transition-all ${
                          isDone ? "opacity-40" : isNext ? "bg-[#FAFAFA]" : "hover:bg-[#FAFAFA]"
                        }`}
                      >
                        <span className={`text-[12px] font-medium min-w-[65px] ${isDone ? "text-[#DDD] line-through" : "text-[#666]"}`}>
                          {s.time}
                        </span>
                        {isNext && <div className="w-1 h-9 rounded-full bg-[#F97316] shrink-0" />}
                        <img
                          src={`https://api.dicebear.com/7.x/notionists/svg?seed=${s.student}`}
                          alt={s.student}
                          className="w-9 h-9 rounded-full border-2 border-[#EBEBEB] shrink-0"
                          style={{ backgroundColor: "#FAFAFA" }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className={`text-[13px] truncate mb-0.5 ${isDone ? "text-[#DDD] line-through" : isNext ? "font-semibold text-[#111]" : "font-medium text-[#111]"}`}>
                            {s.student}
                          </p>
                          <p className={`text-[11px] ${isDone ? "text-[#DDD]" : "text-[#888]"}`}>{s.subject}</p>
                        </div>
                        {isNext && (
                          <div className="px-2.5 py-1 rounded-md bg-[#FFF4ED] text-[#F97316] text-[10px] font-semibold shrink-0">
                            Up next
                          </div>
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
            
            {/* This Week Stats */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F5F5F5]">
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">This Week</span>
              </div>
              <div className="grid grid-cols-3 border-b border-[#F5F5F5]">
                {[
                  { value: "14", label: "Sessions" },
                  { value: "12.5", label: "Hours" },
                  { value: "4.9", label: "Rating" },
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
                  { label: "Assignments submitted", value: "12" },
                  { label: "Doubts asked", value: "8" },
                  { label: "Practice sets completed", value: "15" },
                  { label: "Average score", value: "78%" },
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

            {/* Activity Feed */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F5F5F5]">
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">Recent Activity</span>
              </div>
              <div>
                {[
                  { name: "Sneha Kapoor", action: "scored 247/300 in JEE Mock #8", time: "45m" },
                  { name: "Aarav Sharma", action: "submitted Quadratic Equations assignment", time: "2h" },
                  { name: "Priya Patel", action: "rescheduled Physics to 11:30 AM", time: "3h" },
                  { name: "Rohan Gupta", action: "completed Organic Chemistry practice set", time: "5h" },
                ].map((a, i, arr) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#FAFAFA] transition-colors cursor-pointer"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FAFAFA] border border-[#EBEBEB] flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-semibold text-[#888]">
                        {a.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-[#111] truncate">
                        <span className="font-semibold">{a.name}</span>
                        <span className="text-[#666]"> {a.action}</span>
                      </p>
                    </div>
                    <span className="text-[10px] text-[#AAA] shrink-0">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* To Do */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F5F5F5] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">To Do</span>
                <span className="text-[10px] font-semibold text-[#666]">5 pending</span>
              </div>
              <div>
                {[
                  { text: "Grade Aarav's assignment", badge: "Due today", urgent: true },
                  { text: "Reply to Kavya", badge: "2h ago", urgent: false },
                  { text: "Confirm Amit's session", badge: "Tomorrow", urgent: false },
                  { text: "Update lesson plan", badge: "This week", urgent: false },
                  { text: "Create mock test", badge: "By Friday", urgent: false },
                ].map((item, i, arr) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-[#FAFAFA] transition-colors"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
                  >
                    <span className={`text-[12px] flex-1 truncate ${item.urgent ? "font-semibold text-[#111]" : "text-[#666]"}`}>
                      {item.text}
                    </span>
                    <span className={`text-[10px] shrink-0 ml-2 ${item.urgent ? "text-[#666] font-semibold" : "text-[#AAA]"}`}>
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F5F5F5] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">Messages</span>
                <button
                  onClick={() => router.push("/students")}
                  className="text-[11px] text-[#F97316] hover:text-[#EA580C] cursor-pointer bg-transparent border-none transition-colors flex items-center gap-1 font-semibold"
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
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#FAFAFA] transition-colors"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
                  >
                    <img
                      src={`https://api.dicebear.com/7.x/notionists/svg?seed=${m.name}`}
                      alt={m.name}
                      className="w-8 h-8 rounded-full border border-[#EBEBEB] shrink-0"
                      style={{ backgroundColor: "#FAFAFA" }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-[#111] truncate">{m.name}</p>
                      <p className="text-[11px] text-[#AAA] truncate">{m.msg}</p>
                    </div>
                    <span className="text-[10px] text-[#AAA] shrink-0">{m.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F5F5F5] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">Earnings</span>
                <button
                  onClick={() => router.push("/wallet")}
                  className="text-[11px] text-[#F97316] hover:text-[#EA580C] cursor-pointer bg-transparent border-none transition-colors flex items-center gap-1 font-semibold"
                >
                  Wallet <CaretRight size={10} weight="bold" />
                </button>
              </div>
              {/* Chart */}
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
                        className="w-full rounded-[3px] transition-all group-hover:opacity-70"
                        style={{
                          height: `${bar.fill * 100}%`,
                          backgroundColor: bar.fill === 1.0 ? "#F97316" : "#E5E7EB",
                        }}
                      />
                      <span className="text-[8px] text-[#AAA]">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Breakdown */}
              <div className="border-t border-[#F5F5F5]">
                {[
                  { label: "This week", value: "₹4,200", sub: "14 sessions" },
                  { label: "Last week", value: "₹3,800", sub: "12 sessions" },
                  { label: "Pending payout", value: "₹2,400", sub: "Next: Jul 1" },
                ].map((item, i, arr) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-[#FAFAFA] transition-colors cursor-pointer"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
                  >
                    <span className="text-[11px] text-[#666]">{item.label}</span>
                    <div className="text-right">
                      <span className="text-[12px] font-medium text-[#111]">{item.value}</span>
                      <p className="text-[10px] text-[#AAA]">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              {[
                { label: "View Schedule", icon: Calendar, href: "/schedule" },
                { label: "Open Wallet", icon: CurrencyInr, href: "/wallet" },
                { label: "All Students", icon: Users, href: "/students" },
              ].map((action, i, arr) => (
                <button
                  key={action.label}
                  onClick={() => router.push(action.href)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#FAFAFA] transition-colors cursor-pointer bg-transparent border-none text-left"
                  style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
                >
                  <div className="flex items-center gap-3">
                    <action.icon size={15} className="text-[#888]" />
                    <span className="text-[13px] text-[#111]">{action.label}</span>
                  </div>
                  <ArrowRight size={12} className="text-[#CCC]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
