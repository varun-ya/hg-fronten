"use client";

import { useState, useRef, useEffect } from "react";
import {
  CaretLeft, ShareFat, Eye, EyeSlash, SealCheck, MapPin,
  CalendarBlank, Camera, Warning, RocketLaunch, User,
  PencilSimple, Clock, Star, ChartLine,
  CaretLeft as ChevronLeft, CaretRight as ChevronRight,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { defaultProfile, type TutorProfile } from "@/components/profile/profileData";
import AboutTab from "@/components/profile/AboutTab";
import ActivityTab from "@/components/profile/ActivityTab";
import ReviewsTab from "@/components/profile/ReviewsTab";
import CredentialsTab from "@/components/profile/CredentialsTab";
import EditProfileModal from "@/components/profile/EditProfileModal";

const TABS = ["About", "Activity", "Reviews", "Credentials"] as const;

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  const [profile, setProfile] = useState<TutorProfile>({ ...defaultProfile });
  const [activeTab, setActiveTab] = useState(0);
  const [visitorMode, setVisitorMode] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Restore persisted images on mount
  useEffect(() => {
    const savedAvatar = localStorage.getItem("hg_avatar");
    if (savedAvatar) setProfile(p => ({ ...p, avatarUrl: savedAvatar }));
    const savedCover = localStorage.getItem("hg_cover");
    if (savedCover) setCoverUrl(savedCover);
    
    // Check if profile is incomplete and show alert
    const profileIncomplete = localStorage.getItem("profile_incomplete");
    if (profileIncomplete === 'true') {
      setTimeout(() => {
        alert('⚠️ Profile Incomplete!\n\nPlease complete your profile before accessing the dashboard:\n\n1. Upload profile photo\n2. Add YouTube introduction video\n3. Complete your bio\n4. Add other details\n\nUse the "Edit" button to update your profile.');
      }, 500);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  function handleAvatarPick() { fileInputRef.current?.click(); }

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    });
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const b64 = await fileToBase64(file);
      setProfile((p) => ({ ...p, avatarUrl: b64 }));
      localStorage.setItem("hg_avatar", b64);
    }
  }

  return (
    <div className="flex min-h-screen bg-white">
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={async (e) => {
        const file = e.target.files?.[0];
        if (file) {
          const b64 = await fileToBase64(file);
          setCoverUrl(b64);
          localStorage.setItem("hg_cover", b64);
        }
      }} />

      {/* ── CENTER COLUMN ── */}
      <div className="w-full max-w-[750px] border-r border-[#F0F0F0]">

        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white/80 border-b border-[#F0F0F0]" style={{ backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-3 px-4 h-[53px]">
            <button onClick={() => router.back()} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F5F5F5] transition-colors cursor-pointer">
              <CaretLeft size={18} weight="bold" className="text-[#111]" />
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-[#111] leading-none truncate">{profile.name}</p>
              <p className="text-[12px] text-[#888] mt-0.5">{profile.sessions} sessions</p>
            </div>
            <button onClick={() => setVisitorMode(v => !v)}
              className="h-7 px-3 rounded-full text-[11px] font-semibold transition-all cursor-pointer border"
              style={{ background: visitorMode ? "#111" : "transparent", color: visitorMode ? "#fff" : "#666", borderColor: visitorMode ? "#111" : "#E0E0E0" }}>
              {visitorMode ? "Visitor view" : "Owner view"}
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F5F5F5] transition-colors cursor-pointer border border-[#EBEBEB]">
              <ShareFat size={14} className="text-[#666]" />
            </button>
          </div>
        </div>

        {loading ? <ShimmerProfile /> : (
          <>
            {/* ── Cover banner ── */}
            <div className="relative h-[200px] overflow-hidden" style={{ background: "#F5F5F5" }}>
              {coverUrl
                ? <img src={coverUrl} alt="cover" className="w-full h-full object-cover" />
                : (
                  <>
                    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 140% at 50% 130%, rgba(249,115,22,0.35) 0%, rgba(249,115,22,0.12) 30%, transparent 60%)" }} />
                    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 120% at 0% 130%, rgba(139,92,246,0.2) 0%, transparent 50%)" }} />
                    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 120% at 100% 130%, rgba(59,130,246,0.18) 0%, transparent 50%)" }} />
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
                  </>
                )
              }
              {!visitorMode && (
                <button onClick={() => coverInputRef.current?.click()}
                  className="absolute bottom-3 right-3 h-7 px-3 rounded-full bg-black/30 backdrop-blur-sm text-white text-[11px] font-semibold flex items-center gap-1.5 border border-white/20 hover:bg-black/50 transition-colors cursor-pointer">
                  <Camera size={12} weight="fill" /> Edit cover
                </button>
              )}
            </div>

            {/* ── Profile info ── */}
            <div className="px-5">
              {/* Avatar row */}
              <div className="flex items-end justify-between" style={{ marginTop: -44 }}>
                <button onClick={visitorMode ? undefined : handleAvatarPick} disabled={visitorMode}
                  className="relative cursor-pointer group shrink-0">
                  <div className="w-[88px] h-[88px] rounded-full overflow-hidden bg-[#F5F5F5] border-4 border-white shadow-sm">
                    {profile.avatarUrl
                      ? <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFF4ED] to-[#FFE8D0]"><User size={32} className="text-[#F97316]" /></div>}
                  </div>
                  {!visitorMode && (
                    <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/25 transition-all flex items-center justify-center">
                      <Camera size={16} weight="fill" className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                </button>

                {/* Action buttons */}
                <div className="flex items-center gap-2 pb-1">
                  {visitorMode ? (
                    <>
                      <button className="h-9 px-5 rounded-full border border-[#E0E0E0] bg-white text-[13px] font-semibold text-[#111] cursor-pointer hover:bg-[#F5F5F5] transition-all">Message</button>
                      <button className="h-9 px-5 rounded-full bg-[#F97316] text-white text-[13px] font-semibold border-none cursor-pointer hover:bg-[#EA6C0A] transition-all">Book Trial</button>
                    </>
                  ) : (
                    <>
                      <button className="h-9 px-5 rounded-full border border-[#E0E0E0] bg-white text-[13px] font-semibold text-[#111] cursor-pointer hover:bg-[#F5F5F5] transition-all flex items-center gap-1.5">
                        <RocketLaunch size={13} weight="fill" className="text-[#F97316]" /> Boost
                      </button>
                      <button onClick={() => setEditOpen(true)}
                        className="h-9 px-5 rounded-full border border-[#E0E0E0] bg-white text-[13px] font-semibold text-[#111] cursor-pointer hover:bg-[#F5F5F5] transition-all flex items-center gap-1.5">
                        <PencilSimple size={13} weight="bold" /> Edit
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Name + handle + bio */}
              <div className="mt-4 mb-4">
                <div className="flex items-center gap-2">
                  <h1 className="text-[20px] font-bold text-[#111] tracking-[-0.3px] leading-none">{profile.name}</h1>
                  <SealCheck size={18} weight="fill" className="text-[#F97316]" />
                </div>
                <p className="text-[14px] text-[#888] mt-1">@{profile.handle}</p>
                <p className="text-[14px] text-[#444] leading-[1.6] mt-3 max-w-[480px]">{profile.bio}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-[13px] text-[#888]">
                  <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#BBB]" />{profile.location}</span>
                  <span className="flex items-center gap-1.5"><CalendarBlank size={14} className="text-[#BBB]" />Joined Jun 2025</span>
                </div>
              </div>

              {/* Stats row — X/Twitter style */}
              <div className="flex items-center gap-5 pb-4 border-b border-[#F0F0F0]">
                {[
                  { value: profile.sessions, label: "Sessions" },
                  { value: profile.students, label: "Students" },
                  { value: profile.rating,   label: "Rating"   },
                  { value: profile.reviewCount, label: "Reviews" },
                  { value: 3, label: "Posts" },
                ].map((s, i) => (
                  <div key={i} className="flex items-baseline gap-1 cursor-pointer group">
                    <span className="text-[15px] font-bold text-[#111] group-hover:underline">{s.value}</span>
                    <span className="text-[13px] text-[#888]">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Subject chips */}
              <div className="flex flex-wrap gap-1.5 py-4 border-b border-[#F0F0F0]">
                {profile.subjects.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-full text-[12px] font-medium text-[#555] bg-[#F5F5F5] hover:bg-[#EBEBEB] transition-colors cursor-pointer">{s}</span>
                ))}
              </div>
            </div>

            {/* Profile incomplete warning */}
            {!profile.avatarUrl && !visitorMode && (
              <button onClick={handleAvatarPick} className="w-full px-5 py-3 bg-[#FFFBF5] border-b border-[#F0F0F0] flex items-center gap-3 cursor-pointer hover:bg-[#FFF4E6] transition-colors">
                <Warning size={14} weight="fill" className="text-[#F97316] shrink-0" />
                <span className="text-[13px] text-[#888] flex-1 text-left">Add a profile photo to publish your profile</span>
                <span className="text-[12px] font-semibold text-[#F97316]">Add photo →</span>
              </button>
            )}

            {/* Tabs — X/Twitter style */}
            <div className="sticky top-[53px] z-20 bg-white/90 border-b border-[#F0F0F0]" style={{ backdropFilter: "blur(12px)" }}>
              <div className="flex">
                {TABS.map((tab, i) => (
                  <button key={tab} onClick={() => setActiveTab(i)}
                    className="flex-1 py-4 text-[14px] relative transition-all cursor-pointer bg-transparent border-none hover:bg-[#FAFAFA]"
                    style={{ color: activeTab === i ? "#111" : "#888", fontWeight: activeTab === i ? 700 : 400 }}>
                    {tab}
                    {activeTab === i && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-[#F97316] rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="px-6 py-6">
              {activeTab === 0 && <AboutTab profile={profile} />}
              {activeTab === 1 && <ActivityTab visitorMode={visitorMode} avatarUrl={profile.avatarUrl} authorName={profile.name} />}
              {activeTab === 2 && <ReviewsTab profile={profile} />}
              {activeTab === 3 && <CredentialsTab profile={profile} visitorMode={visitorMode} />}
            </div>

            {/* Similar Tutors */}
            <div className="px-6 pb-10">
              <SimilarTutorsSection />
            </div>
          </>
        )}
      </div>

      {/* ── RIGHT SIDEBAR ── */}
      <div className="hidden lg:flex w-[300px] flex-col border-l border-[#F0F0F0] bg-[#FAFAFA]">
        <div className="sticky top-0 h-screen overflow-y-auto no-scrollbar">
        <div className="px-4 py-4 flex flex-col gap-3.5">

          {/* Quick Stats */}
          <div className="rounded-[14px] border border-[#F0F0F0] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#F0F0F0]">
              <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">Quick Stats</span>
            </div>
            {[
              { label: "Sessions taught", value: `${profile.sessions}+` },
              { label: "Avg. rating",     value: `${profile.rating} / 5.0` },
              { label: "Active students", value: `${profile.students}` },
              { label: "Reviews",         value: `${profile.reviewCount}` },
            ].map((item, i, arr) => (
              <div key={i} className="flex items-center justify-between px-4 py-2.5"
                style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}>
                <span className="text-[12px] text-[#888]">{item.label}</span>
                <span className="text-[13px] font-semibold text-[#111]">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Today's Blogs */}
          <div className="rounded-[14px] border border-[#F0F0F0] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#F0F0F0] flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">Today’s Blogs</span>
              <button className="text-[11px] text-[#F97316] font-semibold bg-transparent border-none cursor-pointer">See all</button>
            </div>
            {SIDEBAR_BLOGS.slice(0, 3).map((blog, i) => (
              <div key={i} className="px-4 py-3 cursor-pointer hover:bg-[#FAFAFA] transition-colors"
                style={{ borderBottom: i < 2 ? "1px solid #F5F5F5" : "none" }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <img src={blog.avatar} alt={blog.author} className="w-4 h-4 rounded-full" />
                  <span className="text-[11px] font-semibold text-[#333]">{blog.author}</span>
                  <span className="text-[10px] text-[#CCC] ml-auto">{blog.time}</span>
                </div>
                <p className="text-[12px] text-[#555] leading-[1.5] line-clamp-2">{blog.title}</p>
              </div>
            ))}
          </div>

          {/* You may also like */}
          <div className="rounded-[14px] border border-[#F0F0F0] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#F0F0F0]">
              <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">You may also like</span>
            </div>
            {similarTutors.map((tutor, i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-[#FAFAFA] transition-colors"
                style={{ borderBottom: i < similarTutors.length - 1 ? "1px solid #F5F5F5" : "none" }}>
                <img src={tutor.avatar} alt={tutor.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[12px] font-semibold text-[#111] truncate">{tutor.name}</span>
                    <SealCheck size={10} weight="fill" className="text-[#F97316] shrink-0" />
                  </div>
                  <p className="text-[11px] text-[#AAA]">{tutor.subject} · ₹{tutor.price}/hr</p>
                </div>
                <button className="shrink-0 px-3 py-1 rounded-full border border-[#E0E0E0] text-[11px] font-semibold text-[#555] cursor-pointer hover:border-[#111] hover:text-[#111] transition-all">Follow</button>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-[#CCC] text-center pb-2">© 2025 HomeGuru · Privacy · Terms</p>
        </div>
        </div>
      </div>

      {/* ── THIRD COLUMN - CALENDAR & TIME ── */}
      <div className="hidden xl:flex flex-col w-[320px] border-l border-[#F0F0F0] bg-white">
        <div className="sticky top-0 h-screen overflow-y-auto no-scrollbar">
          <CalendarTimeSection visitorMode={visitorMode} />
        </div>
      </div>

      {editOpen && (
        <EditProfileModal
          profile={profile}
          onSave={(updated) => setProfile(updated)}
          onClose={() => setEditOpen(false)}
        />
      )}
    </div>
  );
}

/* ── Helpers ── */

function extractYtId(url: string): string {
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return match?.[1] ?? "G64LLtnjYlA";
}

function ActionBtn({ children, onClick, filled }: { children: React.ReactNode; onClick?: () => void; filled?: boolean }) {
  return (
    <button onClick={onClick}
      className="h-9 px-4 rounded-full flex items-center justify-center gap-1.5 text-[13px] font-bold transition-all cursor-pointer"
      style={filled
        ? { background: "#111", color: "#fff", border: "none" }
        : { background: "white", color: "#111", border: "1.5px solid #EBEBEB" }}>
      {children}
    </button>
  );
}

import { similarTutors } from "@/components/profile/profileData";

/* ── Availability Widget ── */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function AvailabilityWidget({ visitorMode }: { visitorMode: boolean }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [availableSlots, setAvailableSlots] = useState<Array<{ date: string; time: string }>>(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("hg_availability_slots") : null;
    return saved ? JSON.parse(saved) : [];
  });

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const addAvailability = () => {
    if (visitorMode) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    const newSlot = { date: dateStr, time: selectedTime };
    const updated = [...availableSlots, newSlot];
    setAvailableSlots(updated);
    localStorage.setItem("hg_availability_slots", JSON.stringify(updated));
  };

  const removeSlot = (index: number) => {
    const updated = availableSlots.filter((_, i) => i !== index);
    setAvailableSlots(updated);
    localStorage.setItem("hg_availability_slots", JSON.stringify(updated));
  };

  // Analog clock math
  const s = now.getSeconds();
  const m = now.getMinutes();
  const h = now.getHours() % 12;
  const secDeg  = s * 6;
  const minDeg  = m * 6 + s * 0.1;
  const hourDeg = h * 30 + m * 0.5;

  return (
    <div className="rounded-[14px] border border-[#F0F0F0] overflow-hidden bg-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#F0F0F0] flex items-center justify-between">
        <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">Availability</span>
        {!visitorMode && <span className="text-[10px] text-[#CCC]">Select date & time</span>}
      </div>

      {!visitorMode && (
        <>
          {/* Calendar */}
          <div className="px-3 py-3">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-3">
              <button onClick={prevMonth} className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#F5F5F5] transition-colors cursor-pointer border-none bg-transparent">
                <ChevronLeft size={14} weight="bold" className="text-[#666]" />
              </button>
              <span className="text-[12px] font-bold text-[#111]">
                {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              <button onClick={nextMonth} className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#F5F5F5] transition-colors cursor-pointer border-none bg-transparent">
                <ChevronRight size={14} weight="bold" className="text-[#666]" />
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} className="text-center text-[9px] font-semibold text-[#CCC] uppercase">{d}</div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="h-7" />
              ))}
              
              {/* Days of month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isSelected = selectedDate.getDate() === day && 
                                 selectedDate.getMonth() === month && 
                                 selectedDate.getFullYear() === year;
                const isToday = now.getDate() === day && 
                              now.getMonth() === month && 
                              now.getFullYear() === year;
                
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(new Date(year, month, day))}
                    className="h-7 rounded-[6px] flex items-center justify-center text-[11px] font-medium transition-all cursor-pointer border-none"
                    style={{
                      background: isSelected ? "#F97316" : isToday ? "#FFF4ED" : "transparent",
                      color: isSelected ? "#fff" : isToday ? "#F97316" : "#333",
                      fontWeight: isSelected || isToday ? 700 : 500,
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Picker */}
          <div className="px-3 pb-3 border-b border-[#F0F0F0]">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-[#AAA]" />
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="flex-1 px-3 py-2 rounded-[8px] border border-[#E0E0E0] text-[12px] font-medium text-[#111] focus:outline-none focus:border-[#F97316] transition-colors"
              />
            </div>
            <button
              onClick={addAvailability}
              className="w-full mt-2 py-2 rounded-[8px] bg-[#F97316] text-white text-[11px] font-semibold border-none cursor-pointer hover:bg-[#EA6C0A] transition-colors"
            >
              Add Availability
            </button>
          </div>

          {/* Available Slots List */}
          {availableSlots.length > 0 && (
            <div className="px-3 py-3">
              <span className="text-[10px] font-semibold text-[#AAA] uppercase tracking-widest">Your Available Slots</span>
              <div className="mt-2 space-y-1.5 max-h-[150px] overflow-y-auto">
                {availableSlots.map((slot, i) => (
                  <div key={i} className="flex items-center justify-between px-2.5 py-2 rounded-[6px] bg-[#F5F5F5] hover:bg-[#EBEBEB] transition-colors">
                    <div className="flex items-center gap-2">
                      <CalendarBlank size={12} className="text-[#F97316]" />
                      <span className="text-[11px] font-medium text-[#333]">
                        {new Date(slot.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                      <span className="text-[11px] text-[#888]">at {slot.time}</span>
                    </div>
                    <button
                      onClick={() => removeSlot(i)}
                      className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-[#FFE8D0] transition-colors cursor-pointer border-none bg-transparent"
                    >
                      <span className="text-[14px] text-[#F97316] font-bold">×</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {visitorMode && availableSlots.length > 0 && (
        <div className="px-3 py-3">
          <span className="text-[10px] font-semibold text-[#AAA] uppercase tracking-widest">Available Slots</span>
          <div className="mt-2 space-y-1.5">
            {availableSlots.slice(0, 5).map((slot, i) => (
              <div key={i} className="flex items-center gap-2 px-2.5 py-2 rounded-[6px] bg-[#F5F5F5]">
                <CalendarBlank size={12} className="text-[#F97316]" />
                <span className="text-[11px] font-medium text-[#333]">
                  {new Date(slot.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                <span className="text-[11px] text-[#888]">at {slot.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SimilarTutorsSection() {
  return (
    <div className="border border-[#EBEBEB] rounded-[16px] overflow-hidden">
      <div className="px-4 py-3 border-b border-[#EBEBEB]">
        <span className="text-[15px] font-bold text-[#111]">Similar tutors you may like</span>
      </div>
      {similarTutors.map((tutor, i) => (
        <div key={i} className="px-4 py-3.5 flex items-center gap-3 cursor-pointer hover:bg-[#FAFAFA] transition-colors"
          style={i < similarTutors.length - 1 ? { borderBottom: "1px solid #EBEBEB" } : undefined}>
          <img src={tutor.avatar} alt={tutor.name} className="w-11 h-11 rounded-full object-cover shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-[14px] font-bold text-[#111]">{tutor.name}</span>
              <SealCheck size={13} weight="fill" className="text-[#F97316]" />
            </div>
            <p className="text-[12px] text-[#888] mt-0.5">{tutor.subject} · ₹{tutor.price}/hr · ⭐ {tutor.rating}</p>
          </div>
          <button className="shrink-0 px-4 py-1.5 rounded-full border border-[#111] bg-white text-[12px] font-bold text-[#111] cursor-pointer hover:bg-[#111] hover:text-white transition-all">View</button>
        </div>
      ))}
    </div>
  );
}

/* ── Clock Picker ── */

function ClockPicker({ time, onChange }: { time: string; onChange: (t: string) => void }) {
  const parts = time.split(/[: ]/);
  const hour = parseInt(parts[0]) || 9;
  const minute = parseInt(parts[1]) || 0;
  const period = parts[2] || "AM";
  const set = (h: number, m: number, p: string) =>
    onChange(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} ${p}`);
  const hourRef = useRef<HTMLDivElement>(null);
  const minRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (hourRef.current) {
      const btn = hourRef.current.querySelector(`[data-h="${hour}"]`) as HTMLElement;
      btn?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [hour]);
  useEffect(() => {
    if (minRef.current) {
      const btn = minRef.current.querySelector(`[data-m="${minute}"]`) as HTMLElement;
      btn?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [minute]);
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex rounded-[10px] overflow-hidden border border-[#EBEBEB]">
        {["AM", "PM"].map(p => (
          <button key={p} onClick={() => set(hour, minute, p)}
            className="flex-1 py-2 text-[13px] font-bold cursor-pointer border-none transition-all"
            style={{ background: period === p ? "#111" : "#F9FAFB", color: period === p ? "#fff" : "#AAA" }}>
            {p}
          </button>
        ))}
      </div>
      <div className="flex gap-2 relative">
        <div className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[10px] font-bold text-[#AAA] uppercase tracking-widest">Hour</span>
          <div ref={hourRef} className="w-full h-[180px] overflow-y-auto no-scrollbar rounded-[12px] border border-[#EBEBEB] bg-[#FAFAFA] relative">
            <div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 h-10 bg-[#FFF7F0] border-y border-[#F97316]/30 z-10" />
            <div className="py-[70px] flex flex-col">
              {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                <button key={h} data-h={h} onClick={() => set(h, minute, period)}
                  className="h-10 w-full text-center text-[16px] font-semibold cursor-pointer border-none bg-transparent transition-all relative z-20"
                  style={{ color: h === hour ? "#F97316" : "#555", fontWeight: h === hour ? 700 : 500 }}>
                  {String(h).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center pt-5">
          <span className="text-[22px] font-bold text-[#CCC]">:</span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[10px] font-bold text-[#AAA] uppercase tracking-widest">Min</span>
          <div ref={minRef} className="w-full h-[180px] overflow-y-auto no-scrollbar rounded-[12px] border border-[#EBEBEB] bg-[#FAFAFA] relative">
            <div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 h-10 bg-[#FFF7F0] border-y border-[#F97316]/30 z-10" />
            <div className="py-[70px] flex flex-col">
              {Array.from({ length: 12 }, (_, i) => i * 5).map(m => (
                <button key={m} data-m={m} onClick={() => set(hour, m, period)}
                  className="h-10 w-full text-center text-[16px] font-semibold cursor-pointer border-none bg-transparent transition-all relative z-20"
                  style={{ color: m === minute ? "#F97316" : "#555", fontWeight: m === minute ? 700 : 500 }}>
                  {String(m).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1.5 py-2 rounded-[10px] bg-[#FFF7F0] border border-[#F97316]/20">
        <span className="text-[20px] font-bold text-[#F97316] tabular-nums">{String(hour).padStart(2, "0")}:{String(minute).padStart(2, "0")}</span>
        <span className="text-[13px] font-semibold text-[#F97316]/60">{period}</span>
      </div>
    </div>
  );
}

/* ── Sidebar data ── */

const SIDEBAR_BLOGS = [
  { title: "How I Cracked JEE in 6 Months", author: "Aarav Sharma", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Aarav", time: "2h ago" },
  { title: "Why Every Student Should Learn Python in 2025", author: "Priya Menon", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Priya", time: "5h ago" },
  { title: "The Secret to Mastering Any Musical Instrument", author: "Ravi Kumar", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Ravi", time: "8h ago" },
  { title: "Tips for Staying Motivated During Exam Season", author: "Sneha Patel", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sneha", time: "10h ago" },
];

/* ── Calendar & Time Section ── */

function CalendarTimeSection({ visitorMode }: { visitorMode: boolean }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [availableSlots, setAvailableSlots] = useState<Array<{ date: string; time: string }>>([]);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [now, setNow] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("hg_calendar_slots");
    if (saved) {
      setAvailableSlots(JSON.parse(saved));
    }
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const addAvailability = () => {
    if (visitorMode) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    const newSlot = { date: dateStr, time: selectedTime };
    const updated = [...availableSlots, newSlot];
    setAvailableSlots(updated);
    localStorage.setItem("hg_calendar_slots", JSON.stringify(updated));
  };

  const removeSlot = (index: number) => {
    const updated = availableSlots.filter((_, i) => i !== index);
    setAvailableSlots(updated);
    localStorage.setItem("hg_calendar_slots", JSON.stringify(updated));
  };

  const s = now.getSeconds();
  const m = now.getMinutes();
  const h = now.getHours() % 12;
  const secDeg = s * 6;
  const minDeg = m * 6 + s * 0.1;
  const hourDeg = h * 30 + m * 0.5;

  return (
    <div className="px-4 py-4 flex flex-col gap-3.5">
      {/* Header with Clock */}
      <div className="rounded-[14px] border border-[#F0F0F0] overflow-hidden bg-white">
        <div className="px-4 py-3 border-b border-[#F0F0F0]">
          <span className="text-[13px] font-bold text-[#111]">Schedule Availability</span>
        </div>
        
        {/* Live Clock */}
        <div className="flex items-center justify-center py-5 border-b border-[#F0F0F0]">
          {mounted ? (
            <>
              <div className="relative w-[80px] h-[80px]">
                <svg viewBox="0 0 88 88" className="w-full h-full">
                  <circle cx="44" cy="44" r="42" fill="white" stroke="#F0F0F0" strokeWidth="1.5" />
                  {Array.from({ length: 12 }).map((_, i) => {
                    const a = (i * 30 - 90) * (Math.PI / 180);
                    const r1 = 36, r2 = 40;
                    return <line key={i}
                      x1={44 + r1 * Math.cos(a)} y1={44 + r1 * Math.sin(a)}
                      x2={44 + r2 * Math.cos(a)} y2={44 + r2 * Math.sin(a)}
                      stroke="#E0E0E0" strokeWidth="1.5" strokeLinecap="round" />;
                  })}
                  <line x1="44" y1="44"
                    x2={44 + 22 * Math.cos((hourDeg - 90) * Math.PI / 180)}
                    y2={44 + 22 * Math.sin((hourDeg - 90) * Math.PI / 180)}
                    stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="44" y1="44"
                    x2={44 + 30 * Math.cos((minDeg - 90) * Math.PI / 180)}
                    y2={44 + 30 * Math.sin((minDeg - 90) * Math.PI / 180)}
                    stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="44" y1="44"
                    x2={44 + 32 * Math.cos((secDeg - 90) * Math.PI / 180)}
                    y2={44 + 32 * Math.sin((secDeg - 90) * Math.PI / 180)}
                    stroke="#F97316" strokeWidth="1" strokeLinecap="round" />
                  <circle cx="44" cy="44" r="2.5" fill="#111" />
                  <circle cx="44" cy="44" r="1" fill="#F97316" />
                </svg>
              </div>
              <div className="ml-4 flex flex-col justify-center">
                <p className="text-[20px] font-bold text-[#111] leading-none tabular-nums tracking-tight">
                  {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
                </p>
                <p className="text-[11px] text-[#AAA] mt-1">
                  {now.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}
                </p>
                <p className="text-[10px] text-[#CCC] mt-0.5">
                  {Intl.DateTimeFormat().resolvedOptions().timeZone}
                </p>
              </div>
            </>
          ) : (
            <div className="w-[80px] h-[80px] bg-[#F5F5F5] rounded-full animate-pulse" />
          )}
        </div>

        {/* Calendar */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <button onClick={prevMonth} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#F5F5F5] transition-colors cursor-pointer border-none bg-transparent">
              <ChevronLeft size={16} weight="bold" className="text-[#666]" />
            </button>
            <span className="text-[13px] font-bold text-[#111]">
              {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button onClick={nextMonth} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#F5F5F5] transition-colors cursor-pointer border-none bg-transparent">
              <ChevronRight size={16} weight="bold" className="text-[#666]" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div key={i} className="text-center text-[10px] font-semibold text-[#CCC] uppercase">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: startingDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="h-8" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = selectedDate.getDate() === day && 
                               selectedDate.getMonth() === month && 
                               selectedDate.getFullYear() === year;
              const isToday = now.getDate() === day && 
                            now.getMonth() === month && 
                            now.getFullYear() === year;
              
              return (
                <button key={day} onClick={() => setSelectedDate(new Date(year, month, day))}
                  className="h-8 rounded-[8px] flex items-center justify-center text-[12px] font-medium transition-all cursor-pointer border-none"
                  style={{
                    background: isSelected ? "#F97316" : isToday ? "#FFF4ED" : "transparent",
                    color: isSelected ? "#fff" : isToday ? "#F97316" : "#333",
                    fontWeight: isSelected || isToday ? 700 : 500,
                  }}>
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Picker */}
        {!visitorMode && (
          <div className="px-4 pb-4 border-t border-[#F0F0F0] pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={14} className="text-[#AAA]" />
              <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}
                className="flex-1 px-3 py-2 rounded-[8px] border border-[#E0E0E0] text-[12px] font-medium text-[#111] focus:outline-none focus:border-[#F97316] transition-colors" />
            </div>
            <button onClick={addAvailability}
              className="w-full py-2.5 rounded-[8px] bg-[#F97316] text-white text-[12px] font-semibold border-none cursor-pointer hover:bg-[#EA6C0A] transition-colors">
              Add Availability
            </button>
          </div>
        )}
      </div>

      {/* Available Slots */}
      {availableSlots.length > 0 && (
        <div className="rounded-[14px] border border-[#F0F0F0] overflow-hidden bg-white">
          <div className="px-4 py-3 border-b border-[#F0F0F0]">
            <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">
              {visitorMode ? "Available Slots" : "Your Availability"}
            </span>
          </div>
          <div className="px-3 py-3 space-y-2 max-h-[300px] overflow-y-auto">
            {availableSlots.map((slot, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-[8px] bg-[#F5F5F5] hover:bg-[#EBEBEB] transition-colors">
                <div className="flex items-center gap-2">
                  <CalendarBlank size={14} className="text-[#F97316]" />
                  <div>
                    <span className="text-[12px] font-semibold text-[#333] block">
                      {new Date(slot.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="text-[11px] text-[#888]">{slot.time}</span>
                  </div>
                </div>
                {!visitorMode && (
                  <button onClick={() => removeSlot(i)}
                    className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#FFE8D0] transition-colors cursor-pointer border-none bg-transparent">
                    <span className="text-[16px] text-[#F97316] font-bold">×</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Shimmer ── */

function ShimmerProfile() {
  return (
    <div>
      <div className="h-[200px] bg-[#F1F5F9] animate-pulse" />
      <div className="px-5 pb-5">
        <div className="flex items-end justify-between" style={{ marginTop: -44 }}>
          <div className="w-[88px] h-[88px] rounded-full bg-[#E2E8F0] animate-pulse border-4 border-white" />
          <div className="flex gap-2 pb-1">
            <div className="w-20 h-9 rounded-full bg-[#F1F5F9] animate-pulse" />
            <div className="w-20 h-9 rounded-full bg-[#F1F5F9] animate-pulse" />
          </div>
        </div>
        <div className="space-y-2.5 mt-4">
          <div className="w-[180px] h-5 bg-[#F1F5F9] rounded-full animate-pulse" />
          <div className="w-[120px] h-4 bg-[#F1F5F9] rounded-full animate-pulse" />
          <div className="w-full h-4 bg-[#F1F5F9] rounded-full animate-pulse" />
          <div className="w-3/4 h-4 bg-[#F1F5F9] rounded-full animate-pulse" />
        </div>
        <div className="flex gap-5 mt-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-1.5 items-baseline">
              <div className="w-8 h-4 bg-[#F1F5F9] rounded animate-pulse" />
              <div className="w-14 h-3 bg-[#F1F5F9] rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
