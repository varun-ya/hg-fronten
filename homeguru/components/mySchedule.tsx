'use client';
import React, { useState, useMemo } from 'react';
import {
  Search, Bell, Zap,
  CreditCard, MoreHorizontal, ChevronLeft, ChevronRight,
  CalendarPlus, FileText,
  AlertCircle, ExternalLink, User, Calendar, Clock, Sun, X, Menu, Mail, Share2, Heart, Globe, MessageCircle, Star
} from 'lucide-react';
import { addDays, format } from 'date-fns';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

// --- Mock Data ---
// Added actual dates so the calendar can filter them
const TIMELINE_DATA = [
  {
    id: 1,
    date: '2026-05-14',
    time: '4:30 PM',
    endTime: '5:30 PM',
    courseCode: 'MTH-401',
    title: 'Advanced Calculus & Linear Algebra',
    type: 'live_class',
    tutor: 'Prof. Jon Snow',
    status: 'upcoming'
  },
  {
    id: 2,
    date: '2026-05-14',
    time: '6:00 PM',
    endTime: '6:30 PM',
    courseCode: 'MTH-401',
    title: 'Submit Weekly Problem Set',
    type: 'task',
    status: 'pending'
  },
  {
    id: 3,
    date: '2026-05-15',
    time: '10:00 AM',
    endTime: '11:30 AM',
    courseCode: 'PHY-301',
    title: 'Thermodynamics: Laws of Motion',
    type: 'live_class',
    tutor: 'Dr. Ned Stark',
    status: 'upcoming'
  },
  {
    id: 4,
    date: '2026-05-12',
    time: '1:00 PM',
    endTime: '2:00 PM',
    courseCode: 'ENG-101',
    title: 'Creative Writing Workshop',
    type: 'live_class',
    tutor: 'Arya Stark',
    status: 'past'
  },
  {
    id: 5,
    date: '2026-05-19',
    time: '3:00 PM',
    endTime: '4:00 PM',
    courseCode: 'CHM-201',
    title: 'Organic Chemistry Basics',
    type: 'live_class',
    tutor: 'Robb Stark',
    status: 'upcoming'
  },
  // Adding more events for today's date
  {
    id: 6,
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '9:00 AM',
    endTime: '10:00 AM',
    courseCode: 'CS-201',
    title: 'Data Structures and Algorithms',
    type: 'live_class',
    tutor: 'Prof. Alan Turing',
    status: 'upcoming'
  },
  {
    id: 7,
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '11:00 AM',
    endTime: '12:00 PM',
    courseCode: 'ENG-202',
    title: 'English Literature Analysis',
    type: 'live_class',
    tutor: 'Dr. Jane Austen',
    status: 'upcoming'
  },
  {
    id: 8,
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '2:00 PM',
    endTime: '2:30 PM',
    courseCode: 'CS-201',
    title: 'Complete Coding Assignment',
    type: 'task',
    status: 'pending'
  },
  {
    id: 9,
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '4:00 PM',
    endTime: '5:30 PM',
    courseCode: 'PHY-101',
    title: 'Introduction to Quantum Physics',
    type: 'live_class',
    tutor: 'Dr. Albert Einstein',
    status: 'upcoming'
  },
];

export default function MySchedule() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [currentScheduleIndex, setCurrentScheduleIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [likedTeachers, setLikedTeachers] = useState<Set<number>>(new Set());

  // Initialize with current date
  const today = new Date();
  const todayString = format(today, 'yyyy-MM-dd');
  const [selectedDate, setSelectedDate] = useState(todayString);
  const [calendarDate, setCalendarDate] = useState<Date>(today);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));

  // Upcoming schedule cards data
  const UPCOMING_SCHEDULES = [
    {
      id: 1,
      title: "English Speaking -",
      subtitle: "Intermediate",
      startsIn: "4hr 5min",
      time: "2:00 PM – 3:00 PM",
      period: "Afternoon",
      date: "14 May, 2026",
      tutorName: "Cersei Lannister",
      tutorImage: "https://i.pravatar.cc/150?img=47",
      subject: "English",
      location: "India",
      rating: 5,
      lessons: 346
    },
    {
      id: 2,
      title: "Mathematics -",
      subtitle: "Advanced Calculus",
      startsIn: "1d 2hr",
      time: "10:00 AM – 11:30 AM",
      period: "Morning",
      date: "15 May, 2026",
      tutorName: "Jon Snow",
      tutorImage: "https://i.pravatar.cc/150?img=12",
      subject: "Mathematics",
      location: "USA",
      rating: 4.8,
      lessons: 520
    },
    {
      id: 3,
      title: "Web Development -",
      subtitle: "React.js Basics",
      startsIn: "2d 5hr",
      time: "3:00 PM – 5:00 PM",
      period: "Afternoon",
      date: "16 May, 2026",
      tutorName: "Arya Stark",
      tutorImage: "https://i.pravatar.cc/150?img=32",
      subject: "Programming",
      location: "UK",
      rating: 4.9,
      lessons: 280
    }
  ];

  const handleNextSchedule = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentScheduleIndex((prev) => (prev + 1) % UPCOMING_SCHEDULES.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrevSchedule = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentScheduleIndex((prev) => (prev - 1 + UPCOMING_SCHEDULES.length) % UPCOMING_SCHEDULES.length);
      setIsAnimating(false);
    }, 300);
  };

  const currentSchedule = UPCOMING_SCHEDULES[currentScheduleIndex];

  const handleLikeTeacher = (teacherId: number) => {
    setLikedTeachers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(teacherId)) {
        newSet.delete(teacherId);
      } else {
        newSet.add(teacherId);
      }
      return newSet;
    });
  };

  const handleMailTeacher = (teacherName: string) => {
    alert(`Opening email to ${teacherName}...`);
  };

  const handleShareTeacher = (teacherName: string) => {
    if (navigator.share) {
      navigator.share({
        title: `Book a lesson with ${teacherName}`,
        text: `Check out ${teacherName}'s profile on HomeGuru`,
        url: window.location.href,
      }).catch(() => { });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  // Filter the timeline based on the selected date
  const filteredTimeline = useMemo(() => {
    return TIMELINE_DATA.filter(item => item.date === selectedDate);
  }, [selectedDate]);

  // Map format date (e.g. "2026-05-14" -> "May 14, 2026")
  const formattedSelectedDate = new Date(selectedDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="flex h-screen bg-white font-matter text-[#0F1117] overflow-hidden">

      {/* Desktop Sidebar */}
      <div className="hidden md:block shrink-0">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full z-50 md:hidden">
            <Sidebar isOpen={true} setIsOpen={() => setMobileSidebarOpen(false)} />
          </div>
        </>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative min-w-0">

        {/* Mobile Menu Button - Fixed to Top Left */}
        {!mobileSidebarOpen && (
          <div className="md:hidden fixed top-4 left-4 z-50">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
              aria-label="Toggle menu"
            >
              <Menu size={20} />
            </button>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto min-w-0 bg-white">

          {/* Global Header */}
          <div className="px-5 md:px-8 py-4 md:py-6 mt-14 md:mt-0">
            <Header
              title="My Schedule"
              titleAccent=""
              titleSuffix=""
              subtitle="Friday, 13 March"
              hideRightTools={true}
            />
          </div>

          <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-8">

            {/* Page Header - Action Buttons Only */}
            <div className="flex justify-end gap-3 mb-8">
              <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-2 shadow-sm font-matter">
                <CalendarPlus size={16} />
                Sync
              </button>
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="px-5 py-2 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm font-matter"
              >
                Book Session
              </button>
            </div>

            <div className="flex flex-col xl:flex-row gap-8">

              {/* Left Column (Main Focus - 2/3 width) */}
              <div className="flex-1 min-w-0 flex flex-col gap-10">

                {/* UPCOMING SCHEDULE (User Provided HTML translated to JSX) */}
                <div className="w-full font-sans">
                  <div className="flex items-center gap-2 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1A1A1A" viewBox="0 0 256 256">
                      <path d="M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.07,16.07,0,0,0,6.4,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16.09,16.09,0,0,0-6.35-12.77L141.27,128l52.38-39.6A16.05,16.05,0,0,0,200,75.64ZM184,216H72V180l56-42,56,42.35Zm0-140.36L128,118,72,76V40H184Z" />
                    </svg>
                    <h2 className="text-[#111827] text-[16px] font-season font-bold">Upcoming Schedule</h2>
                  </div>
                  <div className="relative w-full">
                    <div className="hidden md:block absolute top-2 right-[-6px] border border-[#E5E7EB] rounded-[16px] bg-white z-0 transition-all duration-300 w-full" style={{ height: '251.34px', opacity: isAnimating ? 0 : 1, transform: isAnimating ? 'translateX(-10px)' : 'translateX(0px)' }}></div>
                    <div className="hidden md:block absolute top-1 right-[-3px] border border-[#E5E7EB] rounded-[16px] bg-white z-0 transition-all duration-300 w-full" style={{ height: '251.34px', opacity: isAnimating ? 0 : 1, transform: isAnimating ? 'translateX(-5px)' : 'translateX(0px)' }}></div>
                    <div className="relative z-10 bg-white border border-[#E5E7EB] rounded-[16px] overflow-hidden transition-all duration-300 w-full shadow-sm" style={{ minHeight: '251.34px', opacity: isAnimating ? 0.5 : 1, transform: isAnimating ? 'scale(0.98)' : 'scale(1)' }}>
                      <div className="relative p-4 md:p-6 flex flex-col md:flex-row md:justify-between gap-4 md:gap-6 h-full">
                        <div className="flex flex-col gap-3 flex-1">
                          <div className="bg-[#F3F4F6] text-[#6B7280] text-[13px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 w-fit font-matter">
                            <Clock size={14} />
                            Starts in <span className="text-[#1A1A1A]">{currentSchedule.startsIn}</span>
                          </div>
                          <h3 className="text-[#1A1A1A] leading-tight text-[20px] md:text-[28px] font-season tracking-tight">{currentSchedule.title}<br />{currentSchedule.subtitle}</h3>
                          <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[#6B7280] text-[12px] md:text-[13px] font-matter">
                            <span>{currentSchedule.time}</span>
                            <div className="flex items-center gap-1">
                              <Sun size={14} />
                              {currentSchedule.period}
                            </div>
                            <span>{currentSchedule.date}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-4">
                            <button className="bg-[#3D4A6B] text-white px-4 md:px-5 py-2.5 rounded-full text-[13px] md:text-[14px] hover:bg-[#2f3a54] transition-colors font-medium font-matter">Join now</button>
                            <button className="bg-white border border-[#E5E7EB] text-[#1A1A1A] px-4 md:px-5 py-2.5 rounded-full text-[13px] md:text-[14px] hover:bg-gray-50 transition-colors font-medium font-matter">Reschedule</button>
                          </div>
                        </div>
                        <div className="relative md:absolute md:right-6 md:top-1/2 md:-translate-y-1/2 w-full md:w-[261.32px] min-h-[200px] md:h-[256px] flex items-center justify-center font-sans mt-4 md:mt-0">
                          <div className="absolute inset-0 z-0 flex items-center justify-center">
                            <div className="w-full h-full absolute bg-gradient-to-tr from-[#3D4A6B]/10 to-[#FF8A65]/10 rounded-full animate-pulse blur-xl" style={{ maxWidth: '240px', maxHeight: '240px' }}></div>
                            <img src="/images/Vector.png" alt="Card Background" className="w-full h-full object-contain opacity-100 relative z-10" style={{ maxWidth: '261.32px', maxHeight: '256px' }} onError={(e) => e.currentTarget.style.display = 'none'} />
                          </div>
                          <div className="relative z-20 flex flex-col items-center w-full md:w-[156.78px] h-auto md:h-[167.09px] md:-mt-12 py-4 md:py-0 px-2">
                            <div className="w-[64px] h-[64px] min-w-[64px] min-h-[64px] rounded-full overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.15)] mb-3 border-2 border-white flex items-center justify-center bg-white">
                              <img src={currentSchedule.tutorImage} alt={currentSchedule.tutorName} className="w-full h-full object-cover rounded-full" />
                            </div>
                            <div className="flex flex-col items-center font-sans max-w-full">
                              <h4 className="text-[#0F172A] text-[15px] md:text-[17px] tracking-tight mb-2 text-center break-words max-w-full px-1 font-semibold font-matter">{currentSchedule.tutorName}</h4>
                              <div className="flex items-center gap-2 md:gap-3 mb-2 flex-wrap justify-center max-w-full">
                                <div className="flex items-center gap-1">
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-[#475569] shrink-0"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                                  <span className="text-[#334155] text-[11px] md:text-[12px] tracking-wide font-medium font-matter">{currentSchedule.subject}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-[12px] leading-none">🇮🇳</span>
                                  <span className="text-[#334155] text-[11px] md:text-[12px] tracking-wide font-medium font-matter">{currentSchedule.location}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-[#334155] text-[11px] md:text-[12px] mb-2 tracking-wide max-w-full bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#475569] shrink-0"><path d="M5 8l6 6" /><path d="M4 14l6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" /><path d="M22 22l-5-5" /><path d="M17 22l5-5" /></svg>
                                <span className="truncate font-matter">Speaks English (Native)</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-[#334155] text-[11px] md:text-[12px] tracking-wide flex-wrap justify-center max-w-full">
                                <span className="flex items-center gap-0.5 font-semibold text-slate-700 font-matter">{currentSchedule.rating}<svg className="w-[11px] h-[11px] text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg></span>
                                <span className="text-[14px] leading-none text-slate-300">·</span>
                                <span className="flex items-center gap-1 font-medium font-matter">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#475569] shrink-0"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                                  {currentSchedule.lessons} lessons
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end mt-4 w-full px-2">
                      <div className="flex items-center gap-2 text-[#6B7280] text-[13px] font-matter" style={{ width: '110px', height: '22px' }}>
                        <button onClick={handlePrevSchedule} disabled={isAnimating} className="flex items-center justify-center hover:opacity-70 transition-opacity disabled:opacity-30 bg-white border border-slate-200 rounded-full" style={{ width: '26px', height: '26px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        </button>
                        <span className="flex items-center gap-1.5 font-medium" style={{ fontSize: '13px' }}>
                          <span className="text-[#1A1A1A]">{currentScheduleIndex + 1}</span><span className="text-slate-400">of</span><span className="text-slate-400">{UPCOMING_SCHEDULES.length}</span>
                        </span>
                        <button onClick={handleNextSchedule} disabled={isAnimating} className="flex items-center justify-center hover:opacity-70 transition-opacity disabled:opacity-30 bg-white border border-slate-200 rounded-full shadow-sm" style={{ width: '26px', height: '26px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TIMELINE SECTION - Dynamically Filtered */}
                <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6 pb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 tracking-tight font-season">Timeline</h3>
                      <p className="text-sm text-slate-500 mt-1 font-matter">{formattedSelectedDate}</p>
                    </div>
                    <div className="flex gap-6">
                      <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`pb-2 font-medium text-sm relative transition-colors flex items-center gap-2 font-matter ${activeTab === 'upcoming' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
                          }`}
                      >
                        Upcoming
                        {filteredTimeline.length > 0 && (
                          <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-800 font-matter">
                            {filteredTimeline.length}
                          </span>
                        )}
                        {activeTab === 'upcoming' && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></span>
                        )}
                      </button>
                      <button
                        onClick={() => setActiveTab('past')}
                        className={`pb-2 font-medium text-sm relative transition-colors font-matter ${activeTab === 'past' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
                          }`}
                      >
                        Past Sessions
                        {activeTab === 'past' && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></span>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="relative pt-2 pb-4">
                    {/* Vertical Timeline Thread */}
                    <div className="space-y-0 relative">
                      {/* High-Fidelity Dotted Vertical Timeline Thread */}
                      {filteredTimeline.length > 0 && (
                        <div className="absolute left-[95.5px] top-10 bottom-10 w-[1px]"
                          style={{
                            backgroundImage: 'radial-gradient(circle, #cbd5e1 1.5px, transparent 1.5px)',
                            backgroundSize: '1px 8px',
                            backgroundRepeat: 'repeat-y'
                          }}></div>
                      )}

                      {filteredTimeline.length > 0 ? (
                        filteredTimeline.map((item, index) => (
                          <div key={item.id} className="flex group relative">
                            {/* Time Column */}
                            <div className="w-[90px] pt-6 pr-6 shrink-0 text-right">
                              <p className="text-sm font-semibold text-slate-900 font-matter">{item.time}</p>
                              {item.endTime && <p className="text-xs text-slate-400 mt-0.5 font-matter">{item.endTime}</p>}
                            </div>

                            {/* Node Marker */}
                            <div className="relative pt-6 flex justify-center w-[12px] shrink-0">
                              <div className={`w-[11px] h-[11px] rounded-full mt-1.5 ${item.type === 'live_class' ? 'bg-slate-900' : 'bg-orange-500'} relative z-10 shadow-[0_0_0_4px_white]`}></div>
                            </div>

                            {/* Content Column */}
                            <div className="flex-1 pl-6 pt-3 pb-8">
                              {/* Event Card */}
                              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider font-matter ${item.type === 'live_class' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-600'
                                        }`}>
                                        {item.type === 'live_class' ? 'Live Session' : 'Assignment'}
                                      </span>
                                      {item.courseCode && (
                                        <span className="text-xs text-slate-400 font-medium font-matter">{item.courseCode}</span>
                                      )}
                                    </div>
                                    <h4 className="text-[15px] font-semibold text-slate-900 leading-snug mb-2 font-season">{item.title}</h4>

                                    {item.tutor && (
                                      <div className="flex items-center gap-1.5 text-sm text-slate-500 font-matter">
                                        <User size={14} className="text-slate-400" />
                                        <span>with <span className="font-medium text-slate-700">{item.tutor}</span></span>
                                      </div>
                                    )}
                                  </div>
                                  <button className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100 transition-colors">
                                    <MoreHorizontal size={18} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-12 flex flex-col items-center justify-center text-center">
                          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <Calendar size={28} className="text-slate-400" />
                          </div>
                          <h4 className="text-lg font-semibold text-slate-900 mb-1 font-season">No classes scheduled</h4>
                          <p className="text-slate-500 text-sm max-w-sm font-matter">You don&apos;t have any classes or assignments scheduled for {formattedSelectedDate}.</p>
                          <button className="mt-6 px-5 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg text-sm hover:bg-slate-50 transition-colors shadow-sm font-matter">
                            Browse Courses
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Sidebar Column (1/3 width) - Calendar Integration */}
              <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-4 md:gap-6">

                {/* Advanced Interactive Calendar with Presets */}
                <div className="bg-white border border-slate-200 rounded-xl md:rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-4 md:p-6 pb-3 md:pb-4">
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                      <h3 className="font-semibold text-slate-900 text-sm md:text-[15px] font-season">{format(currentMonth, 'MMMM yyyy')}</h3>
                      <div className="flex gap-1 md:gap-1.5">
                        <button
                          onClick={() => {
                            const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
                            setCurrentMonth(newMonth);
                          }}
                          className="p-1 md:p-1.5 hover:bg-slate-100 rounded-md text-slate-500 transition-colors"
                        >
                          <ChevronLeft size={14} className="md:w-4 md:h-4" />
                        </button>
                        <button
                          onClick={() => {
                            const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
                            setCurrentMonth(newMonth);
                          }}
                          className="p-1 md:p-1.5 hover:bg-slate-100 rounded-md text-slate-500 transition-colors"
                        >
                          <ChevronRight size={14} className="md:w-4 md:h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-y-2 md:gap-y-4 mb-1 md:mb-2">
                      {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, i) => (
                        <div key={i} className="text-[10px] md:text-[11px] font-bold text-slate-400 text-center uppercase tracking-wider">{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-x-0.5 md:gap-x-1 gap-y-1 md:gap-y-2 text-center text-xs md:text-sm">
                      {(() => {
                        const year = currentMonth.getFullYear();
                        const month = currentMonth.getMonth();
                        const firstDay = new Date(year, month, 1).getDay();
                        const daysInMonth = new Date(year, month + 1, 0).getDate();
                        const daysInPrevMonth = new Date(year, month, 0).getDate();

                        // Adjust firstDay to start from Monday (0 = Monday, 6 = Sunday)
                        const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

                        const days = [];

                        // Previous month days
                        for (let i = adjustedFirstDay - 1; i >= 0; i--) {
                          days.push(
                            <div key={`prev-${i}`} className="p-1 md:p-1.5 text-slate-300 text-[11px] md:text-sm">
                              {daysInPrevMonth - i}
                            </div>
                          );
                        }

                        // Current month days
                        for (let day = 1; day <= daysInMonth; day++) {
                          const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                          const isSelected = selectedDate === dateString;
                          const today = new Date();
                          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

                          // Check if there are events on this day
                          const hasEvents = TIMELINE_DATA.some(event => event.date === dateString);

                          days.push(
                            <div
                              key={day}
                              onClick={() => {
                                setSelectedDate(dateString);
                                setCalendarDate(new Date(year, month, day));
                              }}
                              className={`
                                h-7 md:h-9 rounded-md md:rounded-lg flex flex-col items-center justify-center relative cursor-pointer transition-all duration-200 text-[11px] md:text-sm
                                ${isSelected
                                  ? 'bg-[#FBBF24] text-white font-bold shadow-md shadow-orange-500/20 transform scale-105'
                                  : isToday
                                    ? 'bg-[#2C3C69] text-white font-semibold shadow-sm'
                                    : 'text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900'}
                              `}
                            >
                              <span className="relative z-10 leading-none">{day}</span>
                              {/* Dot Indicator for events */}
                              {hasEvents && !isSelected && !isToday && (
                                <span className="absolute bottom-0.5 md:bottom-1 w-[2px] md:w-[3px] h-[2px] md:h-[3px] bg-[#FBBF24] rounded-full"></span>
                              )}
                              {hasEvents && (isSelected || isToday) && (
                                <span className="absolute bottom-0.5 md:bottom-1 w-[2px] md:w-[3px] h-[2px] md:h-[3px] bg-white rounded-full opacity-70"></span>
                              )}
                            </div>
                          );
                        }

                        // Next month days to fill the grid
                        const remainingDays = 42 - days.length; // 6 rows * 7 days
                        for (let day = 1; day <= remainingDays; day++) {
                          days.push(
                            <div key={`next-${day}`} className="p-1 md:p-1.5 text-slate-300 text-[11px] md:text-sm">
                              {day}
                            </div>
                          );
                        }

                        return days;
                      })()}
                    </div>
                  </div>

                  {/* Calendar Presets Footer */}
                  <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50">
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { label: 'Today', value: 0 },
                        { label: 'Tomorrow', value: 1 },
                        { label: '3 days', value: 3 },
                        { label: '1 week', value: 7 },
                      ].map((preset) => (
                        <button
                          key={preset.value}
                          onClick={() => {
                            const newDate = addDays(new Date(), preset.value);
                            const dateString = format(newDate, 'yyyy-MM-dd');
                            setSelectedDate(dateString);
                            setCalendarDate(newDate);
                            setCurrentMonth(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
                          }}
                          className="px-2 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-md text-[11px] font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm text-center leading-tight"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Professional Action Items */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full max-h-[400px]">
                  <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900 text-[15px] font-season">Action Items</h3>
                    <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide border border-red-100">2 Due</span>
                  </div>

                  <div className="p-5 space-y-4 overflow-y-auto">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                        <AlertCircle size={14} className="text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 leading-tight">Spanish Essay Draft</p>
                        <p className="text-xs text-red-600 mt-1 font-medium">Due Tomorrow, 11:59 PM</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 cursor-pointer group">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200 group-hover:bg-slate-100 transition-colors">
                        <FileText size={14} className="text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700 leading-tight group-hover:text-slate-900 transition-colors">Review Notes: Newton&apos;s Laws</p>
                        <p className="text-xs text-slate-500 mt-1">Optional Prep • PHY-301</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 cursor-pointer group">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200 group-hover:bg-slate-100 transition-colors">
                        <CreditCard size={14} className="text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700 leading-tight group-hover:text-slate-900 transition-colors">Renew Subscription</p>
                        <p className="text-xs text-slate-500 mt-1">Expires in 5 days</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-slate-100 mt-auto bg-slate-50/50">
                    <button className="text-[13px] font-semibold text-slate-600 hover:text-slate-900 w-full text-center flex items-center justify-center gap-1.5 transition-colors">
                      View all tasks <ExternalLink size={14} />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setIsBookingModalOpen(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-5 py-3.5 flex items-center justify-between z-10">
              <div>
                <h2 className="text-[#111827] text-[16px] font-season font-bold">Scheduled a class</h2>
                <p className="text-xs text-slate-500 mt-0.5 font-matter">(2 out of 246 teacher)</p>
              </div>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={18} className="text-slate-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-4">
              {/* Teacher Card 1 - Cersei Lannister */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-5">
                  {/* Teacher Image */}
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                    <img
                      src="https://i.pravatar.cc/150?img=47"
                      alt="Cersei Lannister"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Teacher Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-1.5 font-season">Cersei Lannister</h3>
                        <span className="inline-block px-2.5 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-wide rounded font-matter">Professional</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMailTeacher('Cersei Lannister')}
                          className="p-1.5 hover:bg-blue-50 rounded-md transition-colors group"
                          title="Send email"
                        >
                          <Mail size={16} className="text-slate-500 group-hover:text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleShareTeacher('Cersei Lannister')}
                          className="p-1.5 hover:bg-green-50 rounded-md transition-colors group"
                          title="Share profile"
                        >
                          <Share2 size={16} className="text-slate-500 group-hover:text-green-600" />
                        </button>
                        <button
                          onClick={() => handleLikeTeacher(1)}
                          className="p-1.5 hover:bg-red-50 rounded-md transition-colors group"
                          title={likedTeachers.has(1) ? 'Unlike' : 'Like'}
                        >
                          <Heart
                            size={16}
                            className={`transition-colors ${likedTeachers.has(1)
                              ? 'text-red-500 fill-red-500'
                              : 'text-slate-500 group-hover:text-red-500'
                              }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Language Info */}
                    <div className="flex items-center gap-3 text-xs text-slate-600 mb-3 font-matter">
                      <div className="flex items-center gap-1">
                        <Globe size={14} className="text-slate-400" />
                        <span>English</span>
                      </div>
                      <div className="w-px h-3 bg-slate-300"></div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={14} className="text-slate-400" />
                        <span>Speaks English (Native)</span>
                      </div>
                    </div>

                    {/* Price and Rating */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-slate-900 font-season">₹877</span>
                        <span className="text-xs text-slate-500 font-matter">60-min lesson</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <span className="text-xl font-bold text-slate-900 font-season">4.6</span>
                          <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        </div>
                        <span className="text-xs text-slate-500 font-matter">41 reviews</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Book Lesson Button */}
                <div className="mt-4 flex justify-end">
                  <button className="px-6 py-2 bg-[#FF8A65] text-white rounded-full text-sm font-semibold hover:bg-[#ff7a55] transition-colors shadow-sm font-matter">
                    Book lesson
                  </button>
                </div>
              </div>

              {/* Teacher Card 2 - Jon Snow */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-5">
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                    <img
                      src="https://i.pravatar.cc/150?img=12"
                      alt="Jon Snow"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-1.5 font-season">Jon Snow</h3>
                        <span className="inline-block px-2.5 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-wide rounded font-matter">Professional</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMailTeacher('Jon Snow')}
                          className="p-1.5 hover:bg-blue-50 rounded-md transition-colors group"
                          title="Send email"
                        >
                          <Mail size={16} className="text-slate-500 group-hover:text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleShareTeacher('Jon Snow')}
                          className="p-1.5 hover:bg-green-50 rounded-md transition-colors group"
                          title="Share profile"
                        >
                          <Share2 size={16} className="text-slate-500 group-hover:text-green-600" />
                        </button>
                        <button
                          onClick={() => handleLikeTeacher(2)}
                          className="p-1.5 hover:bg-red-50 rounded-md transition-colors group"
                          title={likedTeachers.has(2) ? 'Unlike' : 'Like'}
                        >
                          <Heart
                            size={16}
                            className={`transition-colors ${likedTeachers.has(2)
                              ? 'text-red-500 fill-red-500'
                              : 'text-slate-500 group-hover:text-red-500'
                              }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-600 mb-3 font-matter">
                      <div className="flex items-center gap-1">
                        <Globe size={14} className="text-slate-400" />
                        <span>Mathematics</span>
                      </div>
                      <div className="w-px h-3 bg-slate-300"></div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={14} className="text-slate-400" />
                        <span>Speaks English (Native)</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-slate-900 font-season">₹950</span>
                        <span className="text-xs text-slate-500 font-matter">60-min lesson</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <span className="text-xl font-bold text-slate-900 font-season">4.8</span>
                          <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        </div>
                        <span className="text-xs text-slate-500 font-matter">52 reviews</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button className="px-6 py-2 bg-[#FF8A65] text-white rounded-full text-sm font-semibold hover:bg-[#ff7a55] transition-colors shadow-sm font-matter">
                    Book lesson
                  </button>
                </div>
              </div>

              {/* Teacher Card 3 - Arya Stark */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-5">
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                    <img
                      src="https://i.pravatar.cc/150?img=32"
                      alt="Arya Stark"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-1.5 font-season">Arya Stark</h3>
                        <span className="inline-block px-2.5 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-wide rounded font-matter">Professional</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMailTeacher('Arya Stark')}
                          className="p-1.5 hover:bg-blue-50 rounded-md transition-colors group"
                          title="Send email"
                        >
                          <Mail size={16} className="text-slate-500 group-hover:text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleShareTeacher('Arya Stark')}
                          className="p-1.5 hover:bg-green-50 rounded-md transition-colors group"
                          title="Share profile"
                        >
                          <Share2 size={16} className="text-slate-500 group-hover:text-green-600" />
                        </button>
                        <button
                          onClick={() => handleLikeTeacher(3)}
                          className="p-1.5 hover:bg-red-50 rounded-md transition-colors group"
                          title={likedTeachers.has(3) ? 'Unlike' : 'Like'}
                        >
                          <Heart
                            size={16}
                            className={`transition-colors ${likedTeachers.has(3)
                              ? 'text-red-500 fill-red-500'
                              : 'text-slate-500 group-hover:text-red-500'
                              }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-600 mb-3 font-matter">
                      <div className="flex items-center gap-1">
                        <Globe size={14} className="text-slate-400" />
                        <span>Programming</span>
                      </div>
                      <div className="w-px h-3 bg-slate-300"></div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={14} className="text-slate-400" />
                        <span>Speaks English (Native)</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-slate-900 font-season">₹1,200</span>
                        <span className="text-xs text-slate-500 font-matter">60-min lesson</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <span className="text-xl font-bold text-slate-900 font-season">4.9</span>
                          <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        </div>
                        <span className="text-xs text-slate-500 font-matter">38 reviews</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button className="px-6 py-2 bg-[#FF8A65] text-white rounded-full text-sm font-semibold hover:bg-[#ff7a55] transition-colors shadow-sm font-matter">
                    Book lesson
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Sub Components ---

interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
}

function TabButton({ label, active, onClick, count }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`pb-2 font-medium text-[13px] relative transition-colors flex items-center gap-2 ${active ? 'text-slate-900 border-b-2 border-[#1E2337]' : 'text-slate-500 hover:text-slate-700 border-b-2 border-transparent'
        }`}
    >
      {label}
      {count !== undefined && (
        <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${active ? 'bg-slate-100 text-slate-800' : 'bg-slate-100 text-slate-500'}`}>
          {count}
        </span>
      )}
    </button>
  );
}

