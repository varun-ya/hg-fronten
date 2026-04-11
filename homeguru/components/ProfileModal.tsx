"use client";

import { useState } from "react";
import { X, Camera, Trash2, Save } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [profile, setProfile] = useState({
    fullName: "Suman Yadav",
    email: "suman@email.com",
    phone: "+91 98765 43210",
    dob: "2008-06-15",
    gender: "Male",
    currentClass: "Class 12 — Science",
    targetExam: "JEE Advanced",
    preferredSubjects: ["Mathematics", "Physics", "Chemistry"],
    studyGoals: "Score 250+ in JEE Advanced and secure a seat at IIT Bombay in Computer Science.",
    preferredStudyTime: "Night",
  });
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const subjectOptions = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science", "Economics", "History"];
  const genderOptions = ["Male", "Female", "Non-binary", "Prefer not to say"];
  const studyTimeOptions = ["Morning", "Afternoon", "Night"];
  const examOptions = ["JEE Mains", "JEE Advanced", "NEET", "SSC", "UPSC", "CAT", "GATE", "Other"];

  const toggleSubject = (subject: string) => {
    setProfile(prev => ({
      ...prev,
      preferredSubjects: prev.preferredSubjects.includes(subject)
        ? prev.preferredSubjects.filter(s => s !== subject)
        : [...prev.preferredSubjects, subject]
    }));
  };

  const inputBase = "w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-[14px] text-[#111827] font-matter outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all bg-white placeholder-[#9CA3AF]";
  const labelBase = "block text-[11.5px] font-semibold text-[#6B7280] mb-1.5 font-matter uppercase tracking-wider";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[640px] max-h-[90vh] overflow-hidden border border-[#E5E7EB] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F3F4F6] shrink-0">
          <div>
            <h2 className="text-[20px] font-semibold text-[#111827] font-season">Profile</h2>
            <p className="text-[13px] text-[#9CA3AF] font-matter mt-0.5">Manage your personal information and account details.</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-[#F3F4F6] rounded-lg transition-colors text-[#9CA3AF] hover:text-[#111827]">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-5 space-y-6">

          {/* Profile Photo */}
          <div className="flex items-center gap-5">
            <div className="relative group">
              <img src="https://i.pravatar.cc/150?img=33" alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-[#E5E7EB]" />
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Camera size={18} className="text-white" />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-3.5 py-2 text-[12.5px] font-medium bg-[#111827] text-white rounded-lg hover:bg-[#1F2937] transition-colors flex items-center gap-1.5 font-matter">
                <Camera size={13} /> Upload
              </button>
              <button className="px-3.5 py-2 text-[12.5px] font-medium text-[#DC2626] border border-[#FCA5A5] rounded-lg hover:bg-[#FEF2F2] transition-colors flex items-center gap-1.5 font-matter">
                <Trash2 size={13} /> Remove
              </button>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h3 className="text-[14px] font-semibold text-[#111827] mb-4 font-season">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelBase}>Full Name</label>
                <input type="text" value={profile.fullName} onChange={e => setProfile(p => ({ ...p, fullName: e.target.value }))} className={inputBase} />
              </div>
              <div>
                <label className={labelBase}>Email Address</label>
                <input type="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} className={inputBase} />
              </div>
              <div>
                <label className={labelBase}>Phone Number</label>
                <input type="tel" value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} className={inputBase} />
              </div>
              <div>
                <label className={labelBase}>Date of Birth</label>
                <input type="date" value={profile.dob} onChange={e => setProfile(p => ({ ...p, dob: e.target.value }))} className={inputBase} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelBase}>Gender</label>
                <div className="flex flex-wrap gap-2">
                  {genderOptions.map(g => (
                    <button key={g} onClick={() => setProfile(p => ({ ...p, gender: g }))}
                      className={`px-3.5 py-2 rounded-lg text-[12.5px] font-medium border transition-colors font-matter ${
                        profile.gender === g ? "bg-[#EEF2FF] border-[#4F46E5] text-[#4F46E5]" : "bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#9CA3AF]"
                      }`}>{g}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h3 className="text-[14px] font-semibold text-[#111827] mb-4 font-season">Academic Information</h3>
            <div className="space-y-4">
              <div>
                <label className={labelBase}>Current Class / Course</label>
                <input type="text" value={profile.currentClass} onChange={e => setProfile(p => ({ ...p, currentClass: e.target.value }))} className={inputBase} />
              </div>
              <div>
                <label className={labelBase}>Target Exam</label>
                <div className="flex flex-wrap gap-2">
                  {examOptions.map(exam => (
                    <button key={exam} onClick={() => setProfile(p => ({ ...p, targetExam: exam }))}
                      className={`px-3.5 py-2 rounded-lg text-[12.5px] font-medium border transition-colors font-matter ${
                        profile.targetExam === exam ? "bg-[#EEF2FF] border-[#4F46E5] text-[#4F46E5]" : "bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#9CA3AF]"
                      }`}>{exam}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelBase}>Preferred Subjects</label>
                <div className="flex flex-wrap gap-2">
                  {subjectOptions.map(sub => (
                    <button key={sub} onClick={() => toggleSubject(sub)}
                      className={`px-3.5 py-2 rounded-lg text-[12.5px] font-medium border transition-colors font-matter ${
                        profile.preferredSubjects.includes(sub) ? "bg-[#EEF2FF] border-[#4F46E5] text-[#4F46E5]" : "bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#9CA3AF]"
                      }`}>{sub}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Learning Details */}
          <div>
            <h3 className="text-[14px] font-semibold text-[#111827] mb-4 font-season">Learning Details</h3>
            <div className="space-y-4">
              <div>
                <label className={labelBase}>Study Goals</label>
                <textarea value={profile.studyGoals} onChange={e => setProfile(p => ({ ...p, studyGoals: e.target.value }))} className={`${inputBase} h-20 resize-none`} />
              </div>
              <div>
                <label className={labelBase}>Preferred Study Time</label>
                <div className="flex flex-wrap gap-2">
                  {studyTimeOptions.map(time => (
                    <button key={time} onClick={() => setProfile(p => ({ ...p, preferredStudyTime: time }))}
                      className={`px-4 py-2.5 rounded-lg text-[12.5px] font-medium border transition-colors font-matter ${
                        profile.preferredStudyTime === time ? "bg-[#EEF2FF] border-[#4F46E5] text-[#4F46E5]" : "bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#9CA3AF]"
                      }`}>
                      {time === "Morning" ? "🌅 Morning" : time === "Afternoon" ? "☀️ Afternoon" : "🌙 Night"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-[#F3F4F6] shrink-0 bg-[#FAFAFA]">
          <button onClick={handleSave}
            className={`px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all flex items-center gap-2 font-matter ${
              saved ? "bg-green-50 text-green-700 border border-green-200" : "bg-[#111827] text-white hover:bg-[#1F2937]"
            }`}>
            <Save size={14} /> {saved ? "Saved!" : "Save Changes"}
          </button>
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-[13px] font-medium text-[#6B7280] border border-[#E5E7EB] hover:bg-white transition-colors font-matter">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
