"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MOCK_STUDENTS } from "@/types/chat";
import {
  MagnifyingGlass,
  GraduationCap,
  ChatDots,
  Star,
  Clock,
  CalendarBlank,
  CaretRight,
  Circle,
  TrendUp,
  ArrowRight,
  FunnelSimple,
  Video,
  DotsThree,
} from "@phosphor-icons/react";

type Filter = "all" | "unread" | "active";

export default function StudentsPage() {
  const router = useRouter();
  const [students] = useState(MOCK_STUDENTS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const totalUnread = students.reduce((sum, s) => sum + s.unreadCount, 0);

  const filtered = useMemo(() => {
    let list = students;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.subject.toLowerCase().includes(q) ||
          s.grade.toLowerCase().includes(q)
      );
    }
    if (filter === "unread") list = list.filter((s) => s.unreadCount > 0);
    return list;
  }, [students, search, filter]);

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] font-sans text-[#111]">

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-[#FAFAFA] border-b border-[#EBEBEB] px-5 py-2.5">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[17px] font-medium text-[#111]">My Learners</span>
            <span className="text-[15px] font-medium text-[#666]">{students.length} students</span>
          </div>
          {totalUnread > 0 && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF7ED] text-[12px] font-semibold text-[#F97316]">
              <Circle size={6} weight="fill" />
              {totalUnread} unread
            </span>
          )}
        </div>
      </header>

      {/* ── Content ── */}
      <div className="max-w-[1100px] mx-auto flex px-5 py-6 gap-6">

        {/* ── Main column ── */}
        <main className="flex-1 min-w-0 space-y-5">

          {/* Stats strip */}
          <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
            <div className="grid grid-cols-4 divide-x divide-[#F5F5F5]">
              {[
                { label: "Total Students", value: String(students.length), icon: GraduationCap },
                { label: "Active This Week", value: "5", icon: Clock },
                { label: "Avg. Rating", value: "4.8", icon: Star },
                { label: "Sessions This Month", value: "32", icon: Video },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3 px-5 py-4">
                  <div className="w-8 h-8 rounded-lg bg-[#FAFAFA] flex items-center justify-center text-[#888] flex-shrink-0">
                    <s.icon size={15} />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#AAA]">{s.label}</p>
                    <p className="text-[15px] font-light text-[#111]">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search + Filter row */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <MagnifyingGlass size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#BBB]" />
              <input
                type="text"
                placeholder="Search by name, subject, or class..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-[10px] bg-white border border-[#EBEBEB] text-[13px] text-[#111] placeholder-[#CCC] focus:outline-none focus:border-[#DDD] transition-colors"
              />
            </div>
            <div className="flex items-center gap-1">
              {(["all", "unread"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-3.5 py-2 rounded-[10px] text-[12px] font-medium transition-colors cursor-pointer border-none"
                  style={{
                    backgroundColor: filter === f ? "#F0F0F0" : "transparent",
                    color: filter === f ? "#111" : "#888",
                  }}
                >
                  {f === "all" ? "All" : "Unread"}
                </button>
              ))}
            </div>
          </div>

          {/* Section header */}
          <div className="px-1">
            <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">
              {filter === "unread" ? "Unread Conversations" : "All Students"}
            </span>
          </div>

          {/* Student list */}
          {filtered.length > 0 ? (
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              {filtered.map((student, idx) => (
                <div
                  key={student.id}
                  onClick={() => router.push(`/students/${student.id}`)}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-[#FAFAFA] transition-colors cursor-pointer group"
                  style={{
                    borderBottom: idx < filtered.length - 1 ? "1px solid #F5F5F5" : "none",
                  }}
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-11 h-11 rounded-full"
                      style={{ backgroundColor: "#FAFAFA", border: "2px solid #EBEBEB" }}
                    />
                    {student.unreadCount > 0 && (
                      <div className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-[#F97316] border-2 border-white flex items-center justify-center">
                        <span className="text-[9px] font-bold text-white">{student.unreadCount}</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-[14px] font-medium text-[#111] truncate">{student.name}</p>
                      {student.unreadCount > 0 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-[#888]">{student.subject}</span>
                      <span className="text-[10px] text-[#DDD]">·</span>
                      <span className="text-[12px] text-[#AAA]">{student.grade}</span>
                    </div>
                    <p
                      className={`text-[13px] truncate mt-1 ${
                        student.unreadCount > 0 ? "text-[#111] font-medium" : "text-[#999]"
                      }`}
                    >
                      {student.lastMessage}
                    </p>
                  </div>

                  {/* Right side */}
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <span className="text-[11px] text-[#AAA]">{student.lastMessageTime}</span>
                    <CaretRight size={14} className="text-[#DDD] group-hover:text-[#AAA] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] flex flex-col items-center justify-center py-16">
              <div className="w-12 h-12 rounded-full bg-[#FAFAFA] flex items-center justify-center mb-3">
                <MagnifyingGlass size={20} className="text-[#CCC]" />
              </div>
              <p className="text-[14px] font-medium text-[#888]">No students found</p>
              <p className="text-[12px] text-[#BBB] mt-1">Try adjusting your search or filter</p>
            </div>
          )}
        </main>

        {/* ── Sidebar ── */}
        <aside className="hidden lg:block w-[280px] flex-shrink-0">
          <div className="sticky top-[52px] space-y-4">

            {/* Recent Messages */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#EBEBEB] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">Recent Messages</span>
                {totalUnread > 0 && (
                  <span className="text-[10px] font-semibold text-[#F97316]">{totalUnread} new</span>
                )}
              </div>
              <div>
                {students
                  .filter((s) => s.unreadCount > 0)
                  .slice(0, 3)
                  .map((s, i, arr) => (
                    <div
                      key={s.id}
                      onClick={() => router.push(`/students/${s.id}`)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#FAFAFA] transition-colors cursor-pointer"
                      style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
                    >
                      <img
                        src={s.avatar}
                        alt={s.name}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "#FAFAFA" }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-medium text-[#111] truncate">{s.name}</p>
                        <p className="text-[11px] text-[#888] truncate">{s.lastMessage}</p>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-[#F97316] flex-shrink-0" />
                    </div>
                  ))}
                {students.filter((s) => s.unreadCount > 0).length === 0 && (
                  <div className="px-4 py-5 text-center">
                    <p className="text-[12px] text-[#BBB]">All caught up!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Subject Breakdown */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#EBEBEB]">
                <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">By Subject</span>
              </div>
              <div>
                {(() => {
                  const subjects: Record<string, number> = {};
                  students.forEach((s) => {
                    subjects[s.subject] = (subjects[s.subject] || 0) + 1;
                  });
                  const entries = Object.entries(subjects).sort((a, b) => b[1] - a[1]);
                  return entries.map(([subject, count], i) => (
                    <div
                      key={subject}
                      className="flex items-center justify-between px-4 py-2.5"
                      style={{ borderBottom: i < entries.length - 1 ? "1px solid #F5F5F5" : "none" }}
                    >
                      <span className="text-[12px] text-[#555]">{subject}</span>
                      <span className="text-[12px] font-medium text-[#111]">{count}</span>
                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* Class Distribution */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#EBEBEB]">
                <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">By Class</span>
              </div>
              <div>
                {(() => {
                  const grades: Record<string, number> = {};
                  students.forEach((s) => {
                    grades[s.grade] = (grades[s.grade] || 0) + 1;
                  });
                  const entries = Object.entries(grades).sort((a, b) => b[1] - a[1]);
                  return entries.map(([grade, count], i) => (
                    <div
                      key={grade}
                      className="flex items-center justify-between px-4 py-2.5"
                      style={{ borderBottom: i < entries.length - 1 ? "1px solid #F5F5F5" : "none" }}
                    >
                      <span className="text-[12px] text-[#555]">{grade}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-[60px] h-[4px] rounded-full bg-[#F5F5F5] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#DDD]"
                            style={{ width: `${(count / students.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-[12px] font-medium text-[#111]">{count}</span>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#EBEBEB]">
                <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">Quick Actions</span>
              </div>
              <div>
                {[
                  { label: "View Schedule", icon: CalendarBlank, href: "/schedule" },
                  { label: "Open Wallet", icon: ChatDots, href: "/wallet" },
                ].map((action, i, arr) => (
                  <button
                    key={action.label}
                    onClick={() => router.push(action.href)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#FAFAFA] transition-colors cursor-pointer bg-transparent border-none text-left"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
                  >
                    <div className="flex items-center gap-3">
                      <action.icon size={15} className="text-[#888]" />
                      <span className="text-[13px] text-[#555]">{action.label}</span>
                    </div>
                    <ArrowRight size={12} className="text-[#CCC]" />
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 px-1 text-[11px] text-[#AAA]">
              {["Help", "Privacy", "Terms"].map((l) => (
                <span key={l} className="cursor-pointer hover:text-[#888]">{l}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
