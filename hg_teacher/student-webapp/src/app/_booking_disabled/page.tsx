"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CalendarBlank, CaretDown, Info, SealCheck, Star, Users, CheckCircle } from "@phosphor-icons/react";

const SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
  "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function BookDemoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const tutorName = searchParams.get("tutor") || "Ayush Soni";
  const tutorSubject = searchParams.get("subject") || "Mathematics · Physics";
  const tutorRating = parseFloat(searchParams.get("rating") || "4.9");
  const tutorPrice = parseInt(searchParams.get("price") || "499");
  const tutorStudents = parseInt(searchParams.get("students") || "48");

  const subjects = tutorSubject.split("·").map(s => s.trim());

  const [subjectIdx, setSubjectIdx] = useState<number | null>(null);
  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const [pickedSlot, setPickedSlot] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const getAvailable = () => {
    const seed = (pickedDate?.getDate() || 0) * 5;
    return SLOTS.map((_, i) => (seed + i) % 4 !== 0);
  };

  const canSend = subjectIdx !== null && pickedDate !== null && pickedSlot !== null;

  const handleSend = async () => {
    if (!canSend) return;
    setSending(true);
    await new Promise(resolve => setTimeout(resolve, 900));
    setSending(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} weight="fill" className="text-[#F97316]" />
          </div>
          <h2 className="text-[28px] font-bold text-[#111] mb-3 tracking-tight">Request Sent</h2>
          <p className="text-[15px] text-[#666] leading-relaxed mb-8 max-w-sm mx-auto">
            {tutorName} will review your request and confirm within 24 hours.
          </p>
          <button onClick={() => router.back()} className="w-full py-3.5 rounded-[12px] bg-[#111] text-white text-[14px] font-medium hover:bg-[#000] transition-colors">
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[680px] mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-[#EBEBEB]">
          <div className="flex items-center gap-4 px-6 h-[72px]">
            <button onClick={() => router.back()} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F5F5F5] transition-colors">
              <ArrowLeft size={20} weight="bold" className="text-[#111]" />
            </button>
            <div>
              <h1 className="text-[20px] font-bold text-[#111] tracking-tight">Book Demo Class</h1>
              <p className="text-[13px] text-[#888]">Free 30-min session</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-12 space-y-12 pb-32">
          {/* Tutor Card */}
          <div className="border-b border-[#EBEBEB] pb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-[56px] h-[56px] rounded-full bg-[#F5F5F5] flex items-center justify-center">
                  <span className="text-[22px] font-bold text-[#111]">{tutorName[0]}</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <SealCheck size={14} weight="fill" className="text-[#F97316]" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-[18px] font-bold text-[#111] mb-1 tracking-tight">{tutorName}</h3>
                <p className="text-[14px] text-[#666] mb-2">{tutorSubject}</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star size={13} weight="fill" className="text-[#F97316]" />
                    <span className="text-[13px] font-medium text-[#111]">{tutorRating}</span>
                  </div>
                  {tutorStudents > 0 && (
                    <>
                      <span className="text-[#DDD]">·</span>
                      <span className="text-[13px] text-[#666]">{tutorStudents} students</span>
                    </>
                  )}
                  {tutorPrice > 0 && (
                    <>
                      <span className="text-[#DDD]">·</span>
                      <span className="text-[13px] font-medium text-[#111]">₹{tutorPrice}/hr</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Subject Selection */}
          <div>
            <Label text="Select Subject" />
            <div className="flex flex-wrap gap-2 mt-4">
              {subjects.map((subject, i) => (
                <button key={i} onClick={() => setSubjectIdx(i)}
                  className={`px-6 py-3 rounded-[10px] text-[14px] font-medium transition-all ${
                    subjectIdx === i
                      ? "bg-[#111] text-white"
                      : "bg-white text-[#111] border border-[#EBEBEB] hover:border-[#111]"
                  }`}>
                  {subject}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time Selection */}
          <div>
            <Label text="Choose Date & Time" />
            
            {/* Date Picker */}
            <div className="mt-4 mb-6 relative">
              <button onClick={() => setShowDatePicker(!showDatePicker)}
                className="w-full px-4 py-4 bg-white border border-[#EBEBEB] rounded-[10px] flex items-center gap-3 hover:border-[#111] transition-all">
                <CalendarBlank size={20} className="text-[#888]" weight="bold" />
                <span className={`text-[14px] flex-1 text-left font-medium ${pickedDate ? "text-[#111]" : "text-[#888]"}`}>
                  {pickedDate
                    ? `${DAYS[pickedDate.getDay() - 1] || DAYS[6]}, ${pickedDate.getDate()} ${MONTHS[pickedDate.getMonth()]}`
                    : "Select date"}
                </span>
                <CaretDown size={16} className="text-[#888]" />
              </button>
              
              {/* Date Picker Dropdown */}
              {showDatePicker && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowDatePicker(false)} />
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#EBEBEB] rounded-[10px] p-4 z-50 shadow-lg">
                    <div className="grid grid-cols-7 gap-2">
                      {/* Generate next 14 days */}
                      {Array.from({ length: 14 }, (_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() + i + 1);
                        const isSelected = pickedDate?.toDateString() === date.toDateString();
                        
                        return (
                          <button
                            key={i}
                            onClick={() => {
                              setPickedDate(date);
                              setPickedSlot(null);
                              setShowDatePicker(false);
                            }}
                            className={`flex flex-col items-center justify-center py-3 rounded-[8px] transition-all ${
                              isSelected
                                ? "bg-[#111] text-white"
                                : "bg-white hover:bg-[#F5F5F5] text-[#111]"
                            }`}
                          >
                            <span className="text-[10px] font-medium mb-1">{DAYS[date.getDay() - 1] || DAYS[6]}</span>
                            <span className="text-[14px] font-semibold">{date.getDate()}</span>
                            <span className="text-[9px] text-[#888] mt-0.5">{MONTHS[date.getMonth()].slice(0, 3)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Time Slots */}
            {pickedDate && (
              <div className="grid grid-cols-4 gap-2">
                {SLOTS.map((slot, i) => {
                  const available = getAvailable();
                  const isAvailable = available[i];
                  const isSelected = pickedSlot === i;
                  return (
                    <button key={i} onClick={() => isAvailable && setPickedSlot(i)} disabled={!isAvailable}
                      className={`py-3 rounded-[10px] text-[13px] font-medium transition-all ${
                        isSelected
                          ? "bg-[#111] text-white"
                          : isAvailable
                          ? "bg-white text-[#111] border border-[#EBEBEB] hover:border-[#111]"
                          : "bg-[#FAFAFA] text-[#CCC] line-through border border-[#EBEBEB] cursor-not-allowed"
                      }`}>
                      {slot}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Message */}
          <div>
            <Label text="Additional Message" />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4}
              placeholder="Share your learning goals, current level, or specific topics you'd like to cover..."
              className="w-full mt-4 px-4 py-3 bg-white border border-[#EBEBEB] rounded-[10px] text-[14px] text-[#111] placeholder-[#888] focus:outline-none focus:border-[#111] transition-all resize-none" />
            <p className="text-[12px] text-[#888] mt-2">Optional</p>
          </div>

          {/* Info Box */}
          <div className="bg-[#FAFAFA] rounded-[10px] p-4 border border-[#EBEBEB]">
            <div className="flex gap-3">
              <Info size={16} className="text-[#888] shrink-0 mt-0.5" />
              <p className="text-[13px] text-[#666] leading-relaxed">
                Demo classes are free. The tutor will confirm your time and send a meeting link.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button onClick={handleSend} disabled={!canSend || sending}
              className={`w-full py-4 rounded-[10px] text-[15px] font-medium transition-all ${
                canSend && !sending
                  ? "bg-[#111] text-white hover:bg-[#000]"
                  : "bg-[#F5F5F5] text-[#AAA] cursor-not-allowed"
              }`}>
              {sending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : (
                "Send Request"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ text }: { text: string }) {
  return <p className="text-[15px] font-semibold text-[#111] tracking-tight">{text}</p>;
}
