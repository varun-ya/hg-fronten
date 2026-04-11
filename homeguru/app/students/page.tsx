"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { MOCK_STUDENTS } from "@/types/chat";
import { Menu, X, Search, Sparkles } from "lucide-react";

export default function StudentsPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = MOCK_STUDENTS.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = MOCK_STUDENTS.reduce((sum, s) => sum + s.unreadCount, 0);

  return (
    <div className="flex h-screen overflow-hidden font-matter" style={{ background: "#FAFAFA" }}>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full z-50 md:hidden">
            <Sidebar isOpen={true} setIsOpen={() => {}} />
          </div>
        </>
      )}

      {/* Main Container */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        {/* Mobile toggle */}
        <div className="md:hidden fixed top-4 left-4 z-30">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 bg-white rounded-lg shadow-sm border border-[#E5E7EB]"
          >
            {mobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Header */}
        <div className="px-5 md:px-7 py-4 md:py-6 mt-14 md:mt-0 shrink-0">
          <Header
            title="Students"
            titleAccent=""
            titleSuffix=""
            subtitle={`${totalUnread} unread message${totalUnread !== 1 ? "s" : ""}`}
            hideRightTools={true}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 md:px-7 pb-6">
          <div className="max-w-4xl mx-auto">
            {/* Premium Search Bar */}
            <div className="mb-6 relative">
              <div
                className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(44,60,105,0.03) 0%, rgba(251,191,36,0.03) 100%)",
                  border: "1.5px solid rgba(44,60,105,0.12)",
                  boxShadow: "0 4px 16px rgba(44,60,105,0.08)",
                }}
              >
                {/* Animated gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-50"
                  style={{
                    background:
                      "radial-gradient(circle at top right, rgba(251,191,36,0.1) 0%, transparent 60%)",
                    mixBlendMode: "overlay",
                  }}
                />

                <div className="relative flex items-center px-5 py-4">
                  <Search size={20} className="text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Search students or subjects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-[15px] font-medium"
                    style={{ color: "#0F1117" }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <X size={16} className="text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Students List */}
            <div
              className="rounded-3xl overflow-hidden relative"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,1) 100%)",
                border: "1px solid rgba(44,60,105,0.08)",
                boxShadow: "0 8px 32px rgba(44,60,105,0.12)",
              }}
            >
              {/* Premium gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at top left, rgba(44,60,105,0.02) 0%, transparent 50%), radial-gradient(circle at bottom right, rgba(251,191,36,0.02) 0%, transparent 50%)",
                  mixBlendMode: "overlay",
                }}
              />

              {filteredStudents.length === 0 ? (
                <div className="py-20 text-center relative z-10">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(44,60,105,0.1) 0%, rgba(251,191,36,0.1) 100%)",
                    }}
                  >
                    <Search size={28} className="text-gray-400" />
                  </div>
                  <h3 className="text-[18px] font-bold mb-2" style={{ color: "#0F1117" }}>
                    No students found
                  </h3>
                  <p className="text-[14px]" style={{ color: "#6B7280" }}>
                    Try a different search term
                  </p>
                </div>
              ) : (
                filteredStudents.map((student, index) => (
                  <div
                    key={student.id}
                    onClick={() => router.push(`/students/${student.id}`)}
                    className="relative group cursor-pointer transition-all duration-300 hover:scale-[1.01]"
                    style={{
                      borderBottom:
                        index < filteredStudents.length - 1 ? "1px solid rgba(44,60,105,0.05)" : "none",
                    }}
                  >
                    {/* Hover glow effect */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at center, rgba(251,191,36,0.08) 0%, transparent 70%)",
                      }}
                    />

                    <div className="relative z-10 px-6 py-5 flex items-center gap-4">
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-[18px] transition-all duration-300 group-hover:scale-110"
                          style={{
                            background: "linear-gradient(135deg, #2C3C6915 0%, #FBBF2425 100%)",
                            border: "2px solid #2C3C6940",
                            color: "#2C3C69",
                            boxShadow: "0 4px 12px rgba(44,60,105,0.15)",
                          }}
                        >
                          {student.avatar}
                        </div>

                        {/* Online indicator */}
                        {student.online && (
                          <>
                            <div
                              className="absolute bottom-0 right-0 w-4 h-4 rounded-full animate-pulse"
                              style={{
                                background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
                                border: "2px solid white",
                                boxShadow: "0 2px 8px rgba(34,197,94,0.4)",
                              }}
                            />
                            <div
                              className="absolute bottom-0 right-0 w-4 h-4 rounded-full animate-ping"
                              style={{
                                background: "#22C55E",
                                opacity: 0.4,
                              }}
                            />
                          </>
                        )}

                        {/* Unread badge */}
                        {student.unreadCount > 0 && (
                          <div
                            className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white animate-pulse"
                            style={{
                              background: "linear-gradient(135deg, #2C3C69 0%, #FBBF24 100%)",
                              boxShadow: "0 4px 12px rgba(251,191,36,0.5)",
                            }}
                          >
                            {student.unreadCount}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[16px] font-bold truncate" style={{ color: "#0F1117" }}>
                            {student.name}
                          </h3>
                          {student.online && (
                            <div
                              className="w-2 h-2 rounded-full animate-pulse"
                              style={{ background: "#22C55E" }}
                            />
                          )}
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="text-[12px] font-bold px-2 py-0.5 rounded-full"
                            style={{
                              background: "rgba(251,191,36,0.15)",
                              color: "#B45309",
                            }}
                          >
                            {student.subject}
                          </span>
                          <span className="text-[12px] font-medium" style={{ color: "#6B7280" }}>
                            {student.grade}
                          </span>
                        </div>

                        <p className="text-[14px] truncate font-medium" style={{ color: "#303A4F" }}>
                          {student.lastMessage}
                        </p>
                      </div>

                      {/* Time */}
                      <div className="shrink-0 text-right">
                        <p className="text-[12px] font-medium" style={{ color: "#6B7280" }}>
                          {student.lastMessageTime}
                        </p>
                        {student.unreadCount > 0 && (
                          <div className="mt-2 flex justify-end">
                            <Sparkles size={16} className="text-amber-500 animate-pulse" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
