"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { 
  Clock, 
  Video, 
  CaretLeft, 
  CaretRight, 
  Plus, 
  List, 
  MagnifyingGlass, 
  Question, 
  Gear, 
  CaretDown,
  Users,
  GridFour,
  Globe,
  Circle,
  CheckSquare
} from "@phosphor-icons/react";
import StudentProfileSheet from "@/components/StudentProfileSheet";
import { STUDENT_PROFILES } from "@/data/studentProfiles";

// Mock data - Generate realistic classes based on current IST time and selected date
const generateRealisticClasses = (selectedDate: Date, currentTime: {hour: number, minute: number} | null) => {
  const now = new Date();
  const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const currentHour = istTime.getHours();
  const currentMinute = istTime.getMinutes();
  
  const today = new Date(istTime.getFullYear(), istTime.getMonth(), istTime.getDate());
  const selected = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
  const isToday = today.getTime() === selected.getTime();
  const isFuture = selected.getTime() > today.getTime();
  const isPast = selected.getTime() < today.getTime();
  
  // Helper to determine class status
  const getClassStatus = (startHour: number, startMinute: number, duration: number) => {
    if (!isToday || !currentTime) {
      if (isPast) {
        // Randomly mark some past classes as missed (20% chance)
        return Math.random() > 0.8 ? "missed" : "attended";
      }
      return "upcoming";
    }
    
    const currentTotalMinutes = currentTime.hour * 60 + currentTime.minute;
    const classStartMinutes = startHour * 60 + startMinute;
    const classEndMinutes = classStartMinutes + duration;
    
    if (currentTotalMinutes < classStartMinutes) return "upcoming";
    if (currentTotalMinutes >= classStartMinutes && currentTotalMinutes < classEndMinutes) return "live";
    return "attended";
  };
  
  // Classes for today
  if (isToday) {
    const classes = [
      { id: 1, student: "Meera Iyer", subject: "English Literature", time: `${currentHour}:00`, endTime: `${currentHour + 1}:00`, startHour: currentHour, endMinute: 0, duration: 60, rate: 800, isPaid: true },
      { id: 2, student: "Arjun Patel", subject: "Mathematics", time: `${currentHour + 2}:00`, endTime: `${currentHour + 3}:30`, startHour: currentHour + 2, endMinute: 0, duration: 90, rate: 1200, isPaid: true },
      { id: 3, student: "Priya Sharma", subject: "Physics", time: `${currentHour + 4}:30`, endTime: `${currentHour + 5}:30`, startHour: currentHour + 4, endMinute: 30, duration: 60, rate: 800, isPaid: false },
      { id: 4, student: "Rahul Kumar", subject: "Chemistry", time: `${currentHour - 2}:00`, endTime: `${currentHour - 1}:00`, startHour: currentHour - 2, endMinute: 0, duration: 60, rate: 900, isPaid: true },
      { id: 5, student: "Ananya Singh", subject: "Biology", time: `${currentHour + 5}:00`, endTime: `${currentHour + 6}:30`, startHour: currentHour + 5, endMinute: 0, duration: 90, rate: 1000, isPaid: false },
    ].filter(cls => cls.startHour >= 0 && cls.startHour <= 23);
    
    return classes.map(cls => {
      const status = getClassStatus(cls.startHour, cls.endMinute, cls.duration);
      return { ...cls, status, canJoin: status === "live" };
    });
  }
  
  // Classes for future dates (including tomorrow)
  if (isFuture) {
    return [
      { id: 6, student: "Vikram Reddy", subject: "Computer Science", time: "5:00", endTime: "6:00", startHour: 5, endMinute: 0, duration: 60, rate: 1100, isPaid: true, status: "upcoming", canJoin: false },
      { id: 7, student: "Sneha Gupta", subject: "History", time: "10:00", endTime: "11:30", startHour: 10, endMinute: 0, duration: 90, rate: 950, isPaid: true, status: "upcoming", canJoin: false },
      { id: 8, student: "Karthik Nair", subject: "Economics", time: "14:00", endTime: "15:00", startHour: 14, endMinute: 0, duration: 60, rate: 850, isPaid: false, status: "upcoming", canJoin: false },
    ];
  }
  
  // Classes for past dates
  if (isPast) {
    return [
      { id: 9, student: "Ravi Menon", subject: "Geography", time: "9:00", endTime: "10:00", startHour: 9, endMinute: 0, duration: 60, rate: 800, isPaid: true, status: "attended", canJoin: false },
      { id: 10, student: "Divya Krishnan", subject: "Political Science", time: "15:00", endTime: "16:30", startHour: 15, endMinute: 0, duration: 90, rate: 1000, isPaid: true, status: "attended", canJoin: false },
    ];
  }
  
  return [];
};

// Check if class can be rescheduled (must be more than 3 hours before class)
const canReschedule = (selectedDate: Date, classStartHour: number, classStartMinute: number) => {
  const now = new Date();
  const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  
  // Create class time on the selected date
  const classTime = new Date(selectedDate);
  classTime.setHours(classStartHour, classStartMinute, 0, 0);
  
  const diffMs = classTime.getTime() - istTime.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  
  return diffHours > 3;
};

const TIMEZONES = [
  { code: "IST", name: "Asia/Kolkata", offset: "+5:30" },
  { code: "UTC", name: "UTC", offset: "+0:00" },
  { code: "EST", name: "America/New_York", offset: "-5:00" },
  { code: "PST", name: "America/Los_Angeles", offset: "-8:00" },
  { code: "CST", name: "America/Chicago", offset: "-6:00" },
  { code: "MST", name: "America/Denver", offset: "-7:00" },
  { code: "GMT", name: "Europe/London", offset: "+0:00" },
  { code: "CET", name: "Europe/Paris", offset: "+1:00" },
  { code: "JST", name: "Asia/Tokyo", offset: "+9:00" },
  { code: "AEST", name: "Australia/Sydney", offset: "+10:00" },
  { code: "NZST", name: "Pacific/Auckland", offset: "+12:00" },
  { code: "SGT", name: "Asia/Singapore", offset: "+8:00" },
  { code: "HKT", name: "Asia/Hong_Kong", offset: "+8:00" },
  { code: "KST", name: "Asia/Seoul", offset: "+9:00" },
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS_SHORT = ["S", "M", "T", "W", "T", "F", "S"];

export default function SchedulePage() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth()));
  const [selectedTz, setSelectedTz] = useState(0);
  const [showTzDropdown, setShowTzDropdown] = useState(false);
  const [currentTime, setCurrentTime] = useState<{hour: number, minute: number} | null>(null);
  const [timelineOffset, setTimelineOffset] = useState(0);
  const [rescheduleRequests, setRescheduleRequests] = useState<Set<number>>(new Set());
  const [rescheduleModal, setRescheduleModal] = useState<{classId: number, student: string} | null>(null);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [showViewDropdown, setShowViewDropdown] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [rescheduleTime, setRescheduleTime] = useState({ hour: 9, minute: 0 });
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showDemoNotice, setShowDemoNotice] = useState(true);
  const [rescheduleDate, setRescheduleDate] = useState<Date | null>(null);
  const [rescheduleSlot, setRescheduleSlot] = useState<string | null>(null);
  const [rescheduleNote, setRescheduleNote] = useState("");
  
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Get selected timezone
  const selectedTimezone = TIMEZONES[selectedTz];
  
  // Generate classes based on current IST time
  const SCHEDULED_CLASSES = useMemo(() => generateRealisticClasses(selectedDate, currentTime), [selectedDate, currentTime]);

  useEffect(() => {
    const updateTime = () => {
      // Get current time in selected timezone
      const now = new Date();
      const tzTime = new Date(now.toLocaleString('en-US', { timeZone: selectedTimezone.name }));
      const hour = tzTime.getHours();
      const minute = tzTime.getMinutes();
      setCurrentTime({ hour, minute });
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [selectedTimezone]);

  // Calculate timeline indicator position
  useEffect(() => {
    if (!currentTime || !timelineRef.current || viewMode !== 'day') return;

    const calculateOffset = () => {
      const classHours = SCHEDULED_CLASSES.map(c => c.startHour);
      const minH = Math.max(0, Math.min(...classHours) - 1);
      let totalOffset = 24; // Account for py-6 padding (24px)

      const hourElements = timelineRef.current?.querySelectorAll('[data-hour]');
      if (hourElements) {
        hourElements.forEach((el) => {
          const hourNum = parseInt(el.getAttribute('data-hour') || '0');
          const element = el as HTMLElement;
          const hourHeight = element.offsetHeight;
          
          // Get margin-bottom from computed style
          const styles = window.getComputedStyle(element);
          const marginBottom = parseInt(styles.marginBottom) || 0;
          const totalHeight = hourHeight + marginBottom;
          
          if (hourNum >= minH && hourNum < currentTime.hour) {
            totalOffset += totalHeight;
          } else if (hourNum === currentTime.hour) {
            const proportion = currentTime.minute / 60;
            const addedHeight = proportion * totalHeight;
            totalOffset += addedHeight;
          }
        });
      }

      setTimelineOffset(totalOffset);
    };

    const timer = setTimeout(calculateOffset, 100);
    return () => clearTimeout(timer);
  }, [currentTime, viewMode, SCHEDULED_CLASSES]);

  const isToday = (date: Date) => {
    const now = new Date();
    const tzTime = new Date(now.toLocaleString('en-US', { timeZone: selectedTimezone.name }));
    return date.getDate() === tzTime.getDate() && 
      date.getMonth() === tzTime.getMonth() && 
      date.getFullYear() === tzTime.getFullYear();
  };

  const isSelected = (date: Date) =>
    date.getDate() === selectedDate.getDate() &&
    date.getMonth() === selectedDate.getMonth() &&
    date.getFullYear() === selectedDate.getFullYear();

  const getWeekDays = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day;
    const sunday = new Date(date);
    sunday.setDate(diff);
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(sunday);
      d.setDate(sunday.getDate() + i);
      weekDays.push(d);
    }
    return weekDays;
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = MONTHS[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleReschedule = () => {
    if (rescheduleModal && rescheduleDate && rescheduleSlot) {
      setRescheduleRequests(prev => new Set(prev).add(rescheduleModal.classId));
      setRescheduleModal(null);
      setRescheduleDate(null);
      setRescheduleSlot(null);
      setRescheduleNote("");
      setTimeout(() => {
        setRescheduleRequests(prev => {
          const next = new Set(prev);
          next.delete(rescheduleModal.classId);
          return next;
        });
      }, 3000);
    }
  };

  const handlePrint = () => {
    window.print();
    setShowSettingsDropdown(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] font-sans">
      
      {/* Student Profile Sheet */}
      {selectedStudent && STUDENT_PROFILES[selectedStudent] && (
        <StudentProfileSheet 
          profile={STUDENT_PROFILES[selectedStudent]} 
          onClose={() => setSelectedStudent(null)} 
        />
      )}
      
      {/* Reschedule Modal */}
      {rescheduleModal && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={() => { setRescheduleModal(null); setRescheduleDate(null); setRescheduleSlot(null); setRescheduleNote(""); }} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[20px] z-[101] w-[480px] max-h-[85vh] overflow-hidden border border-[#EBEBEB]" style={{ boxShadow: '0 25px 60px -12px rgba(0,0,0,0.15)' }}>
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#F0F0F0]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[12px] bg-[#FAFAFA] flex items-center justify-center">
                    <Clock size={18} className="text-[#888]" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-semibold text-[#111]">Reschedule Class</h3>
                    <p className="text-[13px] text-[#888] mt-0.5">{rescheduleModal.student}</p>
                  </div>
                </div>
                <button
                  onClick={() => { setRescheduleModal(null); setRescheduleDate(null); setRescheduleSlot(null); setRescheduleNote(""); }}
                  className="w-8 h-8 rounded-lg hover:bg-[#F5F5F5] transition-colors flex items-center justify-center text-[#CCC] hover:text-[#888] border-none bg-transparent cursor-pointer"
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="px-6 py-5 space-y-5 max-h-[calc(85vh-180px)] overflow-y-auto">
              {/* Date Picker */}
              <div>
                <label className="block text-[11px] font-semibold text-[#AAA] uppercase tracking-widest mb-3">Pick a new date</label>
                <div className="border border-[#EBEBEB] rounded-[14px] p-4 bg-[#FAFAFA]">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => {
                        const current = rescheduleDate || new Date();
                        const newDate = new Date(current.getFullYear(), current.getMonth() - 1, 1);
                        setRescheduleDate(newDate);
                      }}
                      className="p-1 hover:bg-white rounded-lg transition-colors cursor-pointer border-none bg-transparent text-[#888]"
                    >
                      <CaretLeft size={16} />
                    </button>
                    <span className="text-[14px] font-medium text-[#111]">
                      {(rescheduleDate || new Date()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <button
                      onClick={() => {
                        const current = rescheduleDate || new Date();
                        const newDate = new Date(current.getFullYear(), current.getMonth() + 1, 1);
                        setRescheduleDate(newDate);
                      }}
                      className="p-1 hover:bg-white rounded-lg transition-colors cursor-pointer border-none bg-transparent text-[#888]"
                    >
                      <CaretRight size={18} weight="bold" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                      <div key={i} className="text-center text-[11px] font-medium text-[#888] h-8 flex items-center justify-center">
                        {day}
                      </div>
                    ))}
                    {(() => {
                      const current = rescheduleDate || new Date();
                      const firstDay = new Date(current.getFullYear(), current.getMonth(), 1).getDay();
                      const daysInMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
                      const today = new Date();
                      const days = [];
                      
                      for (let i = 0; i < firstDay; i++) {
                        days.push(<div key={`empty-${i}`} className="h-8" />);
                      }
                      
                      for (let day = 1; day <= daysInMonth; day++) {
                        const date = new Date(current.getFullYear(), current.getMonth(), day);
                        const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                        const isSelected = rescheduleDate && 
                          date.getDate() === rescheduleDate.getDate() && 
                          date.getMonth() === rescheduleDate.getMonth() && 
                          date.getFullYear() === rescheduleDate.getFullYear();
                        
                        days.push(
                          <button
                            key={day}
                            disabled={isPast}
                            onClick={() => {
                              setRescheduleDate(date);
                              setRescheduleSlot(null);
                            }}
                            className={`h-8 rounded-full flex items-center justify-center text-[13px] transition-all border-none cursor-pointer ${
                              isSelected
                                ? "bg-[#F97316] text-white font-medium"
                                : isPast
                                ? "bg-transparent text-[#DDD] cursor-not-allowed"
                                : "bg-transparent text-[#111] hover:bg-white"
                            }`}
                          >
                            {day}
                          </button>
                        );
                      }
                      return days;
                    })()}
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              {rescheduleDate && (
                <div>
                  <label className="block text-[11px] font-semibold text-[#AAA] uppercase tracking-widest mb-3">Select time slot</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[8,9,10,11,12,13,14,15,16,17,18,19,20].map(hour => {
                      const slot = `${hour}:00`;
                      const isSlotSelected = rescheduleSlot === slot;
                      
                      return (
                        <button
                          key={slot}
                          onClick={() => setRescheduleSlot(slot)}
                          className={`px-3 py-2.5 rounded-[10px] text-[12px] font-medium transition-colors border cursor-pointer ${
                            isSlotSelected
                              ? 'bg-[#111] text-white border-[#111]'
                              : 'bg-white text-[#555] border-[#EBEBEB] hover:border-[#DDD] hover:bg-[#FAFAFA]'
                          }`}
                        >
                          {hour === 12 ? '12 PM' : hour < 12 ? `${hour} AM` : `${hour - 12} PM`}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Note */}
              {rescheduleSlot && (
                <div>
                  <label className="block text-[11px] font-semibold text-[#AAA] uppercase tracking-widest mb-3">Add a note <span className="normal-case tracking-normal font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={rescheduleNote}
                    onChange={(e) => setRescheduleNote(e.target.value)}
                    placeholder="Let the learner know why you're rescheduling..."
                    className="w-full px-4 py-3 border border-[#EBEBEB] rounded-[10px] text-[13px] text-[#111] bg-white focus:outline-none focus:border-[#DDD] transition-colors resize-none placeholder:text-[#CCC]"
                    rows={2}
                  />
                </div>
              )}
              
              <div className="p-3.5 bg-[#FAFAFA] rounded-[10px]">
                <p className="text-[12px] text-[#888] leading-relaxed">
                  <span className="font-medium text-[#555]">Note:</span> A reschedule request will be sent to the learner for approval.
                </p>
              </div>
            </div>
            
            {/* Footer */}
            <div className="px-6 py-4 bg-[#FAFAFA] border-t border-[#F0F0F0] flex items-center gap-3">
              <button 
                onClick={() => { setRescheduleModal(null); setRescheduleDate(null); setRescheduleSlot(null); setRescheduleNote(""); }}
                className="flex-1 px-4 py-2.5 rounded-lg text-[13px] font-medium text-[#666] hover:text-[#111] hover:bg-white transition-colors cursor-pointer bg-transparent border-none"
              >
                Cancel
              </button>
              <button 
                onClick={handleReschedule}
                disabled={!rescheduleDate || !rescheduleSlot}
                className="flex-1 px-4 py-2.5 bg-[#555] hover:bg-[#444] disabled:bg-[#E5E7EB] disabled:text-[#BBB] rounded-lg text-[13px] font-medium text-white transition-colors cursor-pointer border-none disabled:cursor-not-allowed"
              >
                Send Request
              </button>
            </div>
          </div>
        </>
      )}
      
      <header className="sticky top-0 z-40 bg-[#FAFAFA] border-b border-[#EBEBEB] px-5 py-2.5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <span className="text-[17px] font-medium text-[#111]">Schedule</span>
            </div>
            
            <button 
              onClick={() => {
                setSelectedDate(today);
                setViewMonth(new Date(today.getFullYear(), today.getMonth()));
              }}
              className="ml-3 px-4 py-1.5 rounded-full border border-[#E5E7EB] text-[13px] font-medium hover:bg-white transition-all cursor-pointer bg-transparent text-[#111]"
            >
              Today
            </button>
            
            <div className="flex items-center gap-0.5 ml-1">
              <button 
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 1))}
                className="p-1.5 hover:bg-white rounded-lg transition-colors cursor-pointer border-none bg-transparent text-[#888]"
              >
                <CaretLeft size={18} weight="regular" />
              </button>
              <button 
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1))}
                className="p-1.5 hover:bg-white rounded-lg transition-colors cursor-pointer border-none bg-transparent text-[#888]"
              >
                <CaretRight size={18} weight="regular" />
              </button>
            </div>
            
            <h2 className="text-[15px] font-medium ml-2 text-[#666] cursor-pointer hover:text-[#111] transition-colors relative" onClick={() => setShowMonthPicker(!showMonthPicker)}>
              {formatDate(selectedDate)}
              {showMonthPicker && (
                <>
                  <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setShowMonthPicker(false); }} />
                  <div className="absolute top-full left-0 mt-2 w-[280px] bg-white border border-[#EBEBEB] rounded-xl shadow-lg z-50 p-4">
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {MONTHS.map((month, idx) => (
                        <button
                          key={month}
                          onClick={(e) => {
                            e.stopPropagation();
                            const newDate = new Date(selectedDate.getFullYear(), idx, selectedDate.getDate());
                            setSelectedDate(newDate);
                            setViewMonth(new Date(newDate.getFullYear(), idx));
                            setShowMonthPicker(false);
                          }}
                          className={`px-3 py-2 rounded-lg text-[12px] font-medium transition-all cursor-pointer border-none ${
                            selectedDate.getMonth() === idx
                              ? 'bg-[#F97316] text-white'
                              : 'bg-[#FAFAFA] text-[#111] hover:bg-[#F5F5F5]'
                          }`}
                        >
                          {month.slice(0, 3)}
                        </button>
                      ))}
                    </div>
                    <div className="border-t border-[#EBEBEB] pt-3">
                      <div className="flex items-center justify-between mb-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const newDate = new Date(selectedDate.getFullYear() - 1, selectedDate.getMonth(), selectedDate.getDate());
                            setSelectedDate(newDate);
                            setViewMonth(new Date(newDate.getFullYear(), newDate.getMonth()));
                          }}
                          className="p-1.5 hover:bg-[#FAFAFA] rounded-lg transition-colors cursor-pointer border-none bg-transparent text-[#888]"
                        >
                          <CaretLeft size={16} />
                        </button>
                        <span className="text-[14px] font-semibold text-[#111]">{selectedDate.getFullYear()}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const newDate = new Date(selectedDate.getFullYear() + 1, selectedDate.getMonth(), selectedDate.getDate());
                            setSelectedDate(newDate);
                            setViewMonth(new Date(newDate.getFullYear(), newDate.getMonth()));
                          }}
                          className="p-1.5 hover:bg-[#FAFAFA] rounded-lg transition-colors cursor-pointer border-none bg-transparent text-[#888]"
                        >
                          <CaretRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </h2>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="relative">
              <button 
                onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
                className="p-1.5 hover:bg-white rounded-lg transition-colors cursor-pointer text-[#888] border-none bg-transparent"
              >
                <Gear size={20} />
              </button>
              
              {showSettingsDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowSettingsDropdown(false)} />
                  <div className="absolute top-full right-0 mt-2 w-[180px] bg-white border border-[#EBEBEB] rounded-xl shadow-lg z-50 py-1.5">
                    <button
                      onClick={handlePrint}
                      className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#FAFAFA] transition-colors text-left border-none bg-transparent cursor-pointer"
                    >
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 256 256" className="text-[#888]">
                        <path d="M214.67,72H200V40a8,8,0,0,0-8-8H64a8,8,0,0,0-8,8V72H41.33C27.36,72,16,82.77,16,96v80a8,8,0,0,0,8,8H56v32a8,8,0,0,0,8,8H192a8,8,0,0,0,8-8V184h32a8,8,0,0,0,8-8V96C240,82.77,228.64,72,214.67,72ZM72,48H184V72H72ZM184,208H72V160H184Zm40-40H200V152a8,8,0,0,0-8-8H64a8,8,0,0,0-8,8v16H32V96c0-4.41,4.19-8,9.33-8H214.67c5.14,0,9.33,3.59,9.33,8Zm-24-52a12,12,0,1,1-12-12A12,12,0,0,1,200,116Z"></path>
                      </svg>
                      <span className="text-[14px] text-[#111] font-medium">Print</span>
                    </button>
                  </div>
                </>
              )}
            </div>
            
            <div className="relative ml-1.5 flex items-center gap-1.5">
              <button
                onClick={() => setShowTzDropdown(!showTzDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white transition-colors cursor-pointer border border-[#E5E7EB] text-[13px] font-medium bg-transparent text-[#111]"
              >
                <Globe size={14} className="text-[#888]" />
                {TIMEZONES[selectedTz].code}
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowViewDropdown(!showViewDropdown)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white transition-colors cursor-pointer border border-[#E5E7EB] text-[13px] font-medium bg-transparent text-[#111]"
                >
                  {viewMode === 'day' ? 'Day' : viewMode === 'week' ? 'Week' : 'Month'}
                  <CaretDown size={12} />
                </button>
                
                {showViewDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowViewDropdown(false)} />
                    <div className="absolute top-full right-0 mt-2 w-[120px] bg-white border border-[#EBEBEB] rounded-xl shadow-lg z-50 py-1.5">
                      {(['day', 'week', 'month'] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => { setViewMode(mode); setShowViewDropdown(false); }}
                          className="w-full px-3 py-2 flex items-center justify-between hover:bg-[#FAFAFA] transition-colors text-left border-none bg-transparent cursor-pointer"
                        >
                          <span className="text-[13px] text-[#111] capitalize">{mode}</span>
                          {mode === viewMode && <Circle size={6} weight="fill" className="text-[#F97316]" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {showTzDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowTzDropdown(false)} />
                  <div className="absolute top-full right-[80px] mt-2 w-[280px] bg-white border border-[#EBEBEB] rounded-xl shadow-lg z-50 py-2 max-h-[400px] overflow-y-auto">
                    {TIMEZONES.map((tz, idx) => (
                      <button
                        key={tz.code}
                        onClick={() => { setSelectedTz(idx); setShowTzDropdown(false); }}
                        className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-[#FAFAFA] transition-colors text-left border-none bg-transparent cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span className="text-[14px] font-medium text-[#111]">{tz.code}</span>
                          <span className="text-[11px] text-[#888]">{tz.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] text-[#666]">{tz.offset}</span>
                          {idx === selectedTz && <Circle size={8} weight="fill" className="text-[#F97316]" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-[#E5E7EB]">
              <button className="p-1.5 hover:bg-white rounded-lg transition-colors cursor-pointer text-[#888] border-none bg-transparent">
                <GridFour size={20} weight="regular" />
              </button>
              <div className="w-8 h-8 rounded-full bg-[#F97316] flex items-center justify-center text-white text-[13px] font-semibold cursor-pointer hover:opacity-90 transition-opacity">
                V
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Class Notice */}
      {showDemoNotice && (
      <div className="max-w-[1440px] mx-auto px-5 pt-4">
        <div className="rounded-[12px] p-4 flex items-start gap-3" style={{ background: "#E8DEFF", border: "1px solid #D0BCFF" }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "#FFFFFF" }}>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 256 256" style={{ color: "#7C4DFF" }}>
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"></path>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-[14px] font-semibold mb-1" style={{ color: "#22005D" }}>Free Demo Class — Compulsory</h3>
            <p className="text-[13px] leading-relaxed" style={{ color: "#4A148C" }}>
              For every teacher, <span className="font-semibold">1 demo class is free</span> and it is <span className="font-semibold">compulsory</span>. This helps new students experience your teaching style before enrolling in paid sessions.
            </p>
          </div>
          <button onClick={() => setShowDemoNotice(false)} className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-none cursor-pointer transition-opacity hover:opacity-70" style={{ background: "rgba(124,77,255,0.15)" }}>
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 256 256" style={{ color: "#7C4DFF" }}>
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
            </svg>
          </button>
        </div>
      </div>
      )}

      {/* Main Layout Area */}
      <div className="max-w-[1440px] mx-auto flex gap-6 px-5 py-6">
        
        {/* Left Sidebar */}
        <aside className="w-[280px] flex-shrink-0 flex flex-col gap-4 hidden lg:flex">
          {/* Mini Calendar */}
          <div className="bg-white border border-[#EBEBEB] rounded-[14px] p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-season text-[15px] font-medium text-[#111]">
                {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
              </span>
              <div className="flex gap-1">
                <button 
                  onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1))}
                  className="p-1 hover:bg-[#FAFAFA] rounded-full text-[#888] border-none bg-transparent cursor-pointer"
                >
                  <CaretLeft size={16} />
                </button>
                <button 
                  onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1))}
                  className="p-1 hover:bg-[#FAFAFA] rounded-full text-[#888] border-none bg-transparent cursor-pointer"
                >
                  <CaretRight size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS_SHORT.map((day, i) => (
                <div key={i} className="text-center text-[11px] font-medium text-[#888] h-8 flex items-center justify-center">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {(() => {
                const firstDay = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1).getDay();
                const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
                const days = [];
                
                for (let i = 0; i < firstDay; i++) {
                  days.push(<div key={`empty-${i}`} className="h-8" />);
                }
                
                for (let day = 1; day <= daysInMonth; day++) {
                  const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
                  const isSelectedDay = isSelected(date);
                  const isTodayDay = isToday(date);
                  
                  days.push(
                    <div key={day} className="flex justify-center items-center h-8">
                      <button
                        onClick={() => {
                          setSelectedDate(date);
                          if (date.getMonth() !== viewMonth.getMonth()) {
                            setViewMonth(new Date(date.getFullYear(), date.getMonth()));
                          }
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] transition-all border-none cursor-pointer ${
                          isSelectedDay && !isTodayDay
                            ? "bg-[#F97316] text-white font-medium"
                            : isTodayDay
                            ? "bg-[#F97316] text-white font-medium"
                            : "bg-transparent text-[#111] hover:bg-[#FAFAFA]"
                        }`}
                      >
                        {day}
                      </button>
                    </div>
                  );
                }
                return days;
              })()}
            </div>
          </div>

          <div className="bg-white border border-[#EBEBEB] rounded-[14px] p-4">
            <h3 className="text-[13px] font-semibold text-[#111] mb-3.5">Upcoming Classes</h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#FAFAFA] border border-[#EBEBEB]">
                <span className="text-[13px] font-medium text-[#111]">Today</span>
                <span className="text-[13px] font-semibold text-[#111]">{SCHEDULED_CLASSES.filter(c => c.status !== 'attended').length}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-[#FAFAFA] transition-colors">
                <span className="text-[13px] text-[#666]">This Week</span>
                <span className="text-[13px] font-medium text-[#666]">12</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-[#FAFAFA] transition-colors">
                <span className="text-[13px] text-[#666]">This Month</span>
                <span className="text-[13px] font-medium text-[#666]">48</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#EBEBEB] rounded-[14px] p-4">
            <h3 className="text-[13px] font-semibold text-[#111] mb-3.5">Quick Stats</h3>
            <div className="space-y-3.5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] text-[#666]">Classes Completed</span>
                  <span className="text-[13px] font-semibold text-[#111]">156</span>
                </div>
                <div className="w-full h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#111] rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] text-[#666]">Total Hours</span>
                  <span className="text-[13px] font-semibold text-[#111]">234h</span>
                </div>
                <div className="w-full h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#111] rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] text-[#666]">Active Students</span>
                  <span className="text-[13px] font-semibold text-[#111]">24</span>
                </div>
                <div className="w-full h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#111] rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Timeline Area */}
        <main className="flex-1 bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden" ref={timelineRef}>
          {viewMode === 'day' && (
            <div className="overflow-y-auto h-full">
            {SCHEDULED_CLASSES.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8">
                <div className="text-[#E5E7EB] mb-3">
                  <svg width="44" height="44" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"></path>
                  </svg>
                </div>
                <p className="text-[15px] font-medium text-[#888] mb-1">No classes scheduled</p>
                <p className="text-[12px] text-[#BBB]">Tap + to add a class</p>
              </div>
            ) : (
              <div className="relative px-6 py-6">
                {/* Vertical timeline line - precisely placed at 76px */}
                <div className="absolute left-[76px] top-0 bottom-0 w-[2px] bg-[#EBEBEB]" />
                
                {/* Current time indicator - aligned to mathematically hit the 76px line */}
                {currentTime && isToday(selectedDate) && timelineOffset > 0 && (
                  <div 
                    className="absolute left-[70px] right-6 flex items-center z-30 pointer-events-none"
                    style={{ top: `${timelineOffset}px` }}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-[#F97316] ring-4 ring-[#F97316]/20 shadow-lg" />
                    <div className="flex-1 h-[2px] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#F97316] via-[#F97316] to-transparent" />
                    </div>
                  </div>
                )}

                {/* Timeline rows */}
                {(() => {
                  const classHours = SCHEDULED_CLASSES.map(c => c.startHour);
                  const minH = Math.max(0, Math.min(...classHours) - 1);
                  const maxH = Math.min(23, Math.max(...classHours) + 2);
                  const hours = [];
                  
                  for (let hour = minH; hour <= maxH; hour++) {
                    const hourClasses = SCHEDULED_CLASSES.filter(c => c.startHour === hour);
                    const label = hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`;
                    const isCurrentHour = currentTime && isToday(selectedDate) && currentTime.hour === hour;
                    
                    hours.push(
                      <div key={hour} className="flex items-start" style={{ marginBottom: hourClasses.length > 0 ? '16px' : '4px' }} data-hour={hour}>
                        {/* Hour label */}
                        <div className="w-[43px] text-right shrink-0 pt-1 pr-1.5">
                          <span className={`text-[12px] font-medium ${isCurrentHour ? 'text-[#F97316]' : 'text-[#888]'}`}>
                            {label}
                          </span>
                        </div>
                        
                        {/* Dot - Using flex align to perfectly center on the 76px mark */}
                        <div className="w-[20px] flex justify-center shrink-0 pt-[6px] relative z-10">
                          <div 
                            className="w-[10px] h-[10px] rounded-full transition-all"
                            style={{
                              backgroundColor: hourClasses.length > 0 ? '#111' : '#FAFAFA',
                              border: hourClasses.length > 0 ? '2px solid #111' : '2px solid #E5E7EB',
                              boxShadow: hourClasses.length > 0 ? '0 0 0 4px rgba(17, 17, 17, 0.08)' : 'none'
                            }}
                          />
                        </div>
                        
                        {/* Cards */}
                        <div className="flex-1 min-w-0 pl-[28px]">
                          {hourClasses.length === 0 ? (
                            <div className="h-[32px] flex items-center justify-center">
                              <div className="text-[11px] text-[#DDD] font-medium">No classes</div>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {hourClasses.map(cls => (
                                <div
                                  key={cls.id}
                                  className="group rounded-lg bg-white border transition-all overflow-hidden hover:shadow-md relative"
                                  style={{
                                    opacity: cls.status === 'attended' || cls.status === 'missed' ? 0.65 : 1,
                                    borderColor: cls.status === 'live' ? 'rgba(59, 130, 246, 0.3)' : cls.status === 'missed' ? 'rgba(239, 68, 68, 0.3)' : '#E5E7EB',
                                    zIndex: cls.status === 'live' ? 20 : 10
                                  }}
                                >
                                  {/* Gradient background for live sessions */}
                                  {cls.status === 'live' && (
                                    <>
                                      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(70% 65% at 50% 110%, rgba(249, 115, 22, 0.28) 0%, rgba(249, 115, 22, 0.12) 25%, transparent 60%)' }} />
                                      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 55% at 20% 100%, rgba(139, 92, 246, 0.22) 0%, transparent 55%)' }} />
                                      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(50% 55% at 80% 100%, rgba(59, 130, 246, 0.16) 0%, transparent 55%)' }} />
                                    </>
                                  )}
                                  
                                  <div className="px-5 py-4 relative z-10">
                                    <div className="flex items-center gap-4">
                                      {/* Avatar */}
                                      <img 
                                        src={`https://api.dicebear.com/7.x/notionists/svg?seed=${cls.student}`}
                                        alt={cls.student}
                                        onClick={() => setSelectedStudent(cls.student)}
                                        className="w-12 h-12 rounded-xl shrink-0 object-cover cursor-pointer hover:ring-2 hover:ring-[#F97316] transition-all"
                                        style={{
                                          backgroundColor: cls.status === 'live' ? 'rgba(59, 130, 246, 0.12)' : '#FAFAFA',
                                          border: cls.status === 'live' ? '2px solid rgba(59, 130, 246, 0.3)' : '2px solid #E5E7EB'
                                        }}
                                      />
                                      
                                      {/* Student Info */}
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                          <h4 className="text-[15px] font-semibold text-[#111] truncate">
                                            {cls.student}
                                          </h4>
                                          {cls.status === "live" && (
                                            <span className="flex items-center gap-1 bg-[#111] text-white text-[10px] px-2 py-1 rounded-full font-bold">
                                              <Circle size={5} weight="fill" className="text-[#10B981] animate-pulse" /> LIVE
                                            </span>
                                          )}
                                          {cls.status === "missed" && (
                                            <span className="flex items-center gap-1 bg-[#EF4444] text-white text-[10px] px-2 py-1 rounded-full font-bold">
                                              MISSED
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-[13px] text-[#666] truncate mt-0.5">{cls.subject}</p>
                                      </div>
                                      
                                      {/* Duration */}
                                      <div className="flex items-center gap-2 text-[#888] shrink-0">
                                        <Clock size={15} />
                                        <span className="text-[13px] font-medium text-[#111]">
                                          {cls.duration} min
                                        </span>
                                      </div>
                                      
                                      {/* Payment Status */}
                                      <div className="shrink-0">
                                        {cls.isPaid ? (
                                          <span className="text-[14px] font-semibold text-[#111]">
                                            ₹{cls.rate}
                                          </span>
                                        ) : (
                                          <span className="text-[11px] font-bold text-[#F97316] bg-[#FFF7ED] px-2.5 py-1.5 rounded-full">
                                            TRIAL
                                          </span>
                                        )}
                                      </div>
                                      
                                      {/* Actions */}
                                      {cls.status !== 'attended' && cls.status !== 'missed' && (
                                        <div className="flex items-center gap-2 shrink-0">
                                          <button 
                                            disabled={!cls.canJoin}
                                            className="bg-[#111] hover:bg-[#000] disabled:bg-[#F5F5F5] text-white disabled:text-[#BBB] text-[13px] font-semibold px-5 py-2 rounded-lg transition-all border-none cursor-pointer disabled:cursor-not-allowed"
                                          >
                                            Join
                                          </button>
                                          {canReschedule(selectedDate, cls.startHour, cls.endMinute) && (
                                            <button 
                                              onClick={() => setRescheduleModal({ classId: cls.id, student: cls.student })}
                                              className="text-[#888] hover:text-[#111] hover:bg-[#F5F5F5] text-[13px] font-semibold px-5 py-2 rounded-lg transition-all cursor-pointer bg-transparent border border-[#E5E7EB] relative group"
                                            >
                                              Reschedule
                                              {rescheduleRequests.has(cls.id) && (
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#111] text-white text-[10px] px-2.5 py-1 rounded-md whitespace-nowrap shadow-lg z-50">
                                                  Request sent to learner
                                                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#111] rotate-45" />
                                                </div>
                                              )}
                                            </button>
                                          )}
                                        </div>
                                      )}

                                      {/* Past status */}
                                      {cls.status === 'attended' && (
                                        <div className="flex items-center gap-1.5 shrink-0">
                                          <svg width="14" height="14" fill="currentColor" viewBox="0 0 256 256" className="text-[#10B981]">
                                            <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                                          </svg>
                                          <span className="text-[11px] font-medium text-[#059669]">Completed</span>
                                        </div>
                                      )}
                                      {cls.status === 'missed' && (
                                        <div className="flex items-center gap-1.5 shrink-0">
                                          <svg width="14" height="14" fill="currentColor" viewBox="0 0 256 256" className="text-[#EF4444]">
                                            <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                                          </svg>
                                          <span className="text-[11px] font-medium text-[#DC2626]">Missed</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                  
                  return hours;
                })()}
              </div>
            )}
          </div>
          )}

          {/* Week View */}
          {viewMode === 'week' && (
            <div className="h-[calc(100vh-180px)] flex flex-col">
              <div className="grid grid-cols-8 border-b border-[#EBEBEB] bg-[#FAFAFA] sticky top-0 z-20">
                <div className="p-3 border-r border-[#EBEBEB]"></div>
                {getWeekDays(selectedDate).map((day, idx) => {
                  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
                  return (
                    <div key={idx} className="p-3 text-center border-r border-[#EBEBEB] last:border-r-0">
                      <div className="text-[11px] font-medium text-[#888] uppercase mb-1">
                        {dayNames[idx]}
                      </div>
                      <div className={`text-[20px] font-medium ${
                        isToday(day) 
                          ? 'w-9 h-9 mx-auto rounded-full bg-[#F97316] text-white flex items-center justify-center text-[16px]' 
                          : 'text-[#111]'
                      }`}>
                        {day.getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-8">
                  <div className="border-r border-[#EBEBEB]">
                    {Array.from({ length: 24 }, (_, hour) => (
                      <div key={hour} className="h-[60px] border-b border-[#EBEBEB] px-2 py-1 text-right">
                        <span className="text-[11px] text-[#888] font-medium">
                          {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {getWeekDays(selectedDate).map((day, dayIdx) => (
                    <div key={dayIdx} className="border-r border-[#EBEBEB] last:border-r-0 relative">
                      {Array.from({ length: 24 }, (_, hour) => (
                        <div key={hour} className="h-[60px] border-b border-[#EBEBEB] relative hover:bg-[#FAFAFA]/50 transition-colors">
                          {SCHEDULED_CLASSES.filter(cls => cls.startHour === hour && isToday(day)).map(cls => (
                            <div 
                              key={cls.id} 
                              className="absolute inset-x-1 top-1 bottom-1 rounded-lg p-2 text-[11px] overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                              style={{
                                backgroundColor: cls.status === 'live' ? 'rgba(249, 115, 22, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                                border: cls.status === 'live' ? '1px solid rgba(249, 115, 22, 0.4)' : '1px solid rgba(59, 130, 246, 0.4)'
                              }}
                            >
                              <div className="font-semibold text-[#111] truncate">{cls.student}</div>
                              <div className="text-[#666] truncate">{cls.subject}</div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Month View */}
          {viewMode === 'month' && (
            <div className="h-[calc(100vh-180px)] flex flex-col overflow-y-auto">
              <div className="grid grid-cols-7 border-b border-[#EBEBEB] bg-[#FAFAFA]">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                  <div key={day} className="p-3 text-center text-[11px] font-medium text-[#888] border-r border-[#EBEBEB] last:border-r-0">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="flex-1">
                <div className="grid grid-cols-7 h-full">
                  {(() => {
                    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
                    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
                    const cells = [];
                    
                    for (let i = 0; i < firstDay; i++) {
                      cells.push(
                        <div key={`empty-${i}`} className="min-h-[120px] border-r border-b border-[#EBEBEB] bg-[#FAFAFA]/30" />
                      );
                    }
                    
                    for (let day = 1; day <= daysInMonth; day++) {
                      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
                      const dayClasses = SCHEDULED_CLASSES.filter(cls => isToday(date));
                      
                      cells.push(
                        <div 
                          key={day} 
                          className="min-h-[120px] border-r border-b border-[#EBEBEB] p-2 hover:bg-[#FAFAFA]/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedDate(date)}
                        >
                          <div className={`text-[14px] font-medium mb-2 inline-flex ${
                            isToday(date) 
                              ? 'w-7 h-7 rounded-full bg-[#F97316] text-white items-center justify-center' 
                              : 'text-[#111]'
                          }`}>
                            {day}
                          </div>
                          
                          <div className="space-y-1">
                            {dayClasses.slice(0, 3).map(cls => (
                              <div 
                                key={cls.id} 
                                className="text-[10px] px-2 py-1 rounded truncate font-medium"
                                style={{
                                  backgroundColor: cls.status === 'live' ? 'rgba(249, 115, 22, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                                  color: '#111'
                                }}
                              >
                                {cls.time} {cls.student}
                              </div>
                            ))}
                            {dayClasses.length > 3 && (
                              <div className="text-[10px] text-[#888] px-2">
                                +{dayClasses.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                    
                    return cells;
                  })()}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}