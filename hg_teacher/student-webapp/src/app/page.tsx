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
    <div className="min-h-screen bg-[#FAFAFA] font-sans">
      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-5 py-5">
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
          
          {/* Left Column - Main Content */}
          <div className="space-y-4">
            
            {/* AI Match Banner */}
            <AIMatchBanner />

            {/* Stats Grid - 4 Column */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { icon: Lightning, value: "7", label: "Day streak", badge: "Active" },
                { icon: Trophy, value: "1240", label: "XP Earned", badge: "Total" },
                { icon: BookOpen, value: "4", label: "Classes", badge: "This week" },
                { icon: Clock, value: "3.5h", label: "Hours", badge: "Learning" },
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-[14px] p-4 border border-[#EBEBEB] hover:bg-[#FAFAFA] transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-[10px] bg-[#FFF7F0] flex items-center justify-center">
                      <stat.icon size={18} weight="regular" className="text-[#F97316]" />
                    </div>
                    <span className="text-[10px] font-medium text-[#888] bg-[#F5F5F5] px-2 py-0.5 rounded-full">
                      {stat.badge}
                    </span>
                  </div>
                  <p className="text-[24px] font-semibold text-[#111] leading-none mb-1.5">{stat.value}</p>
                  <p className="text-[12px] text-[#666]">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Next Class */}
            <div className="bg-white rounded-[14px] overflow-hidden border border-[#EBEBEB]">
              <div className="px-4 py-3 border-b border-[#F5F5F5] flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[#111]">Next Class</span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF7F0] text-[10px] font-semibold text-[#F97316]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />
                  Starts in 15m
                </span>
              </div>
              <div className="px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="relative shrink-0">
                  <img
                    src="https://api.dicebear.com/7.x/notionists/svg?seed=Ayush Soni"
                    alt="Ayush Soni"
                    className="w-12 h-12 rounded-full border border-[#EBEBEB]"
                    style={{ backgroundColor: "#FAFAFA" }}
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#10B981] border-2 border-white rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#111] leading-none mb-1.5">Ayush Soni</p>
                  <div className="flex items-center gap-2 text-[12px] text-[#666]">
                    <span>Mathematics</span>
                    <span className="text-[#DDD]">•</span>
                    <span>{timeStr}</span>
                    <span className="text-[#DDD]">•</span>
                    <span>1 hour</span>
                  </div>
                </div>
                <button className="h-9 px-5 rounded-[10px] bg-[#111] hover:bg-[#222] text-white text-[12px] font-semibold cursor-pointer border-none transition-colors shrink-0 w-full sm:w-auto">
                  Join now
                </button>
              </div>
            </div>

            {/* Two Column Layout for Classes and Tutors */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              
              {/* Today's Classes */}
              <div className="bg-white rounded-[14px] overflow-hidden border border-[#EBEBEB]">
                <div className="px-4 py-3 border-b border-[#F5F5F5] flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#111]">Today's Classes</span>
                  <button
                    onClick={() => router.push("/schedule")}
                    className="text-[11px] text-[#F97316] hover:text-[#EA580C] cursor-pointer bg-transparent border-none transition-colors flex items-center gap-1 font-semibold"
                  >
                    View all <CaretRight size={10} weight="bold" />
                  </button>
                </div>
                <div className="divide-y divide-[#F5F5F5]">
                  {[
                    { time: "10:00 AM", teacher: "Ayush Soni", subject: "Mathematics", status: "live" },
                    { time: "2:00 PM", teacher: "Priya Menon", subject: "Physics", status: "upcoming" },
                    { time: "4:30 PM", teacher: "Ankit Kapoor", subject: "English", status: "upcoming" },
                  ].map((cls, i) => (
                    <div key={i} className="p-3 hover:bg-[#FAFAFA] transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-[10px] bg-[#FFF7F0] flex items-center justify-center shrink-0">
                          <Video size={18} weight="fill" className="text-[#F97316]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-[13px] font-semibold text-[#111]">{cls.subject}</p>
                            {cls.status === "live" && (
                              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#10B981]/10 text-[9px] font-semibold text-[#10B981]">
                                <span className="w-1 h-1 rounded-full bg-[#10B981] animate-pulse" />
                                LIVE
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#666]">{cls.teacher} • {cls.time}</p>
                        </div>
                        {cls.status === "live" ? (
                          <button className="px-3 py-1.5 bg-[#10B981] hover:bg-[#059669] rounded-[8px] text-[11px] font-semibold text-white transition-colors border-none cursor-pointer">
                            Join
                          </button>
                        ) : (
                          <span className="text-[11px] text-[#AAA]">{cls.time}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Tutors */}
              <div className="bg-white rounded-[14px] overflow-hidden border border-[#EBEBEB]">
                <div className="px-4 py-3 border-b border-[#F5F5F5] flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#111]">Suggested Tutors</span>
                  <button
                    onClick={() => router.push("/teachers")}
                    className="text-[11px] text-[#F97316] hover:text-[#EA580C] cursor-pointer bg-transparent border-none transition-colors flex items-center gap-1 font-semibold"
                  >
                    See all <CaretRight size={10} weight="bold" />
                  </button>
                </div>
                <div className="divide-y divide-[#F5F5F5]">
                  {[
                    { name: "Ayush Soni", subject: "Maths • Physics", rating: 4.9, price: 499 },
                    { name: "Priya Menon", subject: "Physics", rating: 4.8, price: 399 },
                    { name: "Ankit Kapoor", subject: "English • Literature", rating: 4.7, price: 349 },
                  ].map((tutor, i) => (
                    <div key={i} className="p-3 hover:bg-[#FAFAFA] transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://api.dicebear.com/7.x/notionists/svg?seed=${tutor.name}`}
                          alt={tutor.name}
                          className="w-9 h-9 rounded-full border border-[#EBEBEB] shrink-0"
                          style={{ backgroundColor: "#FAFAFA" }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-[#111] mb-0.5">{tutor.name}</p>
                          <div className="flex items-center gap-1.5">
                            <p className="text-[11px] text-[#666]">{tutor.subject}</p>
                            <span className="text-[#DDD]">•</span>
                            <div className="flex items-center gap-0.5">
                              <Star size={10} weight="fill" className="text-[#F97316]" />
                              <span className="text-[11px] font-semibold text-[#666]">{tutor.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[13px] font-semibold text-[#111]">₹{tutor.price}</p>
                          <p className="text-[10px] text-[#AAA]">per hour</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pending Assignments */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-wide">Pending Assignments</span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#FFF7F0] text-[10px] font-semibold text-[#F97316]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                  3 due soon
                </span>
              </div>
              <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden divide-y divide-[#F5F5F5]">
                {[
                  { title: "Quadratic Equations Practice", teacher: "Ayush Soni", subject: "Mathematics", dueDate: "Due today", urgent: true },
                  { title: "Organic Chemistry Lab Report", teacher: "Priya Menon", subject: "Chemistry", dueDate: "Due tomorrow", urgent: false },
                  { title: "English Essay - Shakespeare", teacher: "Ankit Kapoor", subject: "English", dueDate: "Due in 3 days", urgent: false },
                ].map((assignment, i) => (
                  <div key={i} className="p-3.5 hover:bg-[#FAFAFA] transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#F5F5F5] border border-[#EBEBEB] flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-semibold text-[#888]">
                          {assignment.teacher.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <p className={`text-[13px] leading-tight ${assignment.urgent ? "font-semibold text-[#111]" : "font-medium text-[#111]"}`}>
                            {assignment.title}
                          </p>
                          <span className={`text-[10px] shrink-0 ml-2 ${assignment.urgent ? "text-[#F97316] font-semibold" : "text-[#AAA]"}`}>
                            {assignment.dueDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mb-2.5">
                          <span className="px-2 py-0.5 rounded-md bg-[#F5F5F5] text-[10px] font-medium text-[#666]">
                            {assignment.subject}
                          </span>
                          <span className="text-[10px] text-[#888]">
                            {assignment.teacher}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="flex-1 h-8 rounded-[8px] bg-[#111] hover:bg-[#222] text-white text-[11px] font-semibold transition-colors cursor-pointer border-none">
                            Start now
                          </button>
                          <button className="flex-1 h-8 rounded-[8px] bg-transparent hover:bg-[#F5F5F5] text-[#666] hover:text-[#111] text-[11px] font-medium transition-colors cursor-pointer border border-[#EBEBEB]">
                            View details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Class Notes */}
            <div className="bg-white rounded-[14px] overflow-hidden border border-[#EBEBEB]">
              <div className="px-4 py-3 border-b border-[#F5F5F5] flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[#111]">Class Notes</span>
                <button 
                  onClick={() => router.push("/class-notes")}
                  className="text-[11px] text-[#F97316] hover:text-[#EA580C] cursor-pointer bg-transparent border-none transition-colors flex items-center gap-1 font-semibold">
                  View all <CaretRight size={10} weight="bold" />
                </button>
              </div>
              <div className="divide-y divide-[#F5F5F5]">
                {[
                  { date: "Dec 15", topic: "Quadratic Equations", subject: "Mathematics", files: 3 },
                  { date: "Dec 14", topic: "Newton's Laws", subject: "Physics", files: 2 },
                  { date: "Dec 13", topic: "Organic Chemistry", subject: "Chemistry", files: 4 },
                ].map((note, i) => (
                  <div key={i} onClick={() => router.push("/class-notes")} className="p-3 hover:bg-[#FAFAFA] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[10px] bg-[#FFF7F0] flex items-center justify-center shrink-0">
                        <Notebook size={18} weight="fill" className="text-[#F97316]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-[#111] mb-0.5">{note.topic}</p>
                        <div className="flex items-center gap-1.5">
                          <p className="text-[11px] text-[#666]">{note.subject}</p>
                          <span className="text-[#DDD]">•</span>
                          <div className="flex items-center gap-0.5">
                            <FileText size={10} className="text-[#888]" weight="bold" />
                            <span className="text-[11px] text-[#888]">{note.files} files</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] text-[#AAA] shrink-0">{note.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Streak Calendar */}
            <StreakCalendar />

            {/* New Features - Quick Access Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                onClick={() => router.push("/analytics")}
                className="bg-white rounded-[14px] p-4 border border-[#EBEBEB] hover:bg-[#FAFAFA] transition-colors cursor-pointer text-left"
              >
                <div className="w-10 h-10 rounded-[10px] bg-[#FFF7F0] flex items-center justify-center mb-3">
                  <ChartBar size={20} weight="fill" className="text-[#F97316]" />
                </div>
                <p className="text-[13px] font-semibold text-[#111] mb-0.5">Analytics</p>
                <p className="text-[11px] text-[#666]">View your learning stats</p>
              </button>

              <button
                onClick={() => router.push("/wallet")}
                className="bg-white rounded-[14px] p-4 border border-[#EBEBEB] hover:bg-[#FAFAFA] transition-colors cursor-pointer text-left"
              >
                <div className="w-10 h-10 rounded-[10px] bg-[#FFF7F0] flex items-center justify-center mb-3">
                  <Wallet size={20} weight="fill" className="text-[#F97316]" />
                </div>
                <p className="text-[13px] font-semibold text-[#111] mb-0.5">Wallet</p>
                <p className="text-[11px] text-[#666]">Manage payments</p>
              </button>

              <button
                onClick={() => router.push("/booking")}
                className="bg-white rounded-[14px] p-4 border border-[#EBEBEB] hover:bg-[#FAFAFA] transition-colors cursor-pointer text-left"
              >
                <div className="w-10 h-10 rounded-[10px] bg-[#FFF7F0] flex items-center justify-center mb-3">
                  <VideoCamera size={20} weight="fill" className="text-[#F97316]" />
                </div>
                <p className="text-[13px] font-semibold text-[#111] mb-0.5">Book Demo</p>
                <p className="text-[11px] text-[#666]">Free trial class</p>
              </button>

              <button
                onClick={() => router.push("/class-notes")}
                className="bg-white rounded-[14px] p-4 border border-[#EBEBEB] hover:bg-[#FAFAFA] transition-colors cursor-pointer text-left"
              >
                <div className="w-10 h-10 rounded-[10px] bg-[#FFF7F0] flex items-center justify-center mb-3">
                  <Notebook size={20} weight="fill" className="text-[#F97316]" />
                </div>
                <p className="text-[13px] font-semibold text-[#111] mb-0.5">Class Notes</p>
                <p className="text-[11px] text-[#666]">Access all materials</p>
              </button>
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
                  { value: "8", label: "Classes" },
                  { value: "12.5", label: "Hours" },
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

            {/* Recent Activity */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F5F5F5]">
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">Recent Activity</span>
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
                    className="flex items-start gap-3 px-4 py-3 hover:bg-[#FAFAFA] transition-colors cursor-pointer"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FAFAFA] border border-[#EBEBEB] flex items-center justify-center shrink-0">
                      <CheckCircle size={14} className="text-[#16A34A]" weight="fill" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-[#111] truncate">{a.action}</p>
                      <p className="text-[11px] text-[#888] mt-0.5">{a.score}</p>
                    </div>
                    <span className="text-[10px] text-[#AAA] shrink-0">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Tests */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F5F5F5] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">Upcoming Tests</span>
                <span className="text-[10px] font-semibold text-[#666]">3 scheduled</span>
              </div>
              <div>
                {[
                  { subject: "Mathematics", topic: "Calculus", date: "Tomorrow", urgent: true },
                  { subject: "Physics", topic: "Mechanics", date: "In 3 days", urgent: false },
                  { subject: "Chemistry", topic: "Organic", date: "Next week", urgent: false },
                ].map((test, i, arr) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-[#FAFAFA] transition-colors"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className={`text-[12px] truncate ${test.urgent ? "font-semibold text-[#111]" : "text-[#666]"}`}>
                        {test.subject}
                      </p>
                      <p className="text-[11px] text-[#AAA] truncate">{test.topic}</p>
                    </div>
                    <span className={`text-[10px] shrink-0 ml-2 ${test.urgent ? "text-[#F97316] font-semibold" : "text-[#AAA]"}`}>
                      {test.date}
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
                  onClick={() => router.push("/teachers")}
                  className="text-[11px] text-[#F97316] hover:text-[#EA580C] cursor-pointer bg-transparent border-none transition-colors flex items-center gap-1 font-semibold"
                >
                  Open <CaretRight size={10} weight="bold" />
                </button>
              </div>
              <div>
                {[
                  { name: "Ayush Soni", msg: "Great work on today's assignment!", time: "15m" },
                  { name: "Priya Menon", msg: "Don't forget tomorrow's test", time: "1h" },
                  { name: "Study Group", msg: "Meeting at 5 PM today", time: "2h" },
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

            {/* Performance Chart */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F5F5F5] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">Performance</span>
                <button
                  onClick={() => router.push("/progress")}
                  className="text-[11px] text-[#F97316] hover:text-[#EA580C] cursor-pointer bg-transparent border-none transition-colors flex items-center gap-1 font-semibold"
                >
                  Details <CaretRight size={10} weight="bold" />
                </button>
              </div>
              {/* Chart */}
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
                  { label: "This week", value: "92%", sub: "8 tests" },
                  { label: "Last week", value: "88%", sub: "7 tests" },
                  { label: "Monthly avg", value: "90%", sub: "Improving" },
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
                { label: "My Progress", icon: ChartLineUp, href: "/progress" },
                { label: "All Teachers", icon: GraduationCap, href: "/teachers" },
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
