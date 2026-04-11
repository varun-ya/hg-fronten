"use client";
import { Calendar, Clock, User, Video, Mail, Phone } from "lucide-react";

export default function DemoClassesPage() {
  const demoClasses = [
    {
      id: 1,
      studentName: "Rohan Gupta",
      subject: "Chemistry",
      date: "Today",
      time: "2:00 PM",
      duration: "30 min",
      status: "upcoming",
      studentAvatar: "RG",
      studentEmail: "rohan@example.com",
      studentPhone: "+91 98765 43210"
    },
    {
      id: 2,
      studentName: "Ananya Reddy",
      subject: "Physics",
      date: "Tomorrow",
      time: "4:00 PM",
      duration: "30 min",
      status: "scheduled",
      studentAvatar: "AR",
      studentEmail: "ananya@example.com",
      studentPhone: "+91 98765 43211"
    },
    {
      id: 3,
      studentName: "Vikram Singh",
      subject: "Mathematics",
      date: "Jan 18",
      time: "11:00 AM",
      duration: "30 min",
      status: "scheduled",
      studentAvatar: "VS",
      studentEmail: "vikram@example.com",
      studentPhone: "+91 98765 43212"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-4 md:p-6">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#111]">Demo Classes</h1>
          <p className="text-sm text-[#888] mt-1">Manage your scheduled demo sessions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-4 shadow-sm">
            <p className="text-xs text-[#888] mb-1">Total Scheduled</p>
            <p className="text-2xl font-bold text-[#111]">3</p>
          </div>
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-4 shadow-sm">
            <p className="text-xs text-[#888] mb-1">This Week</p>
            <p className="text-2xl font-bold text-[#3B82F6]">2</p>
          </div>
          <div className="bg-white rounded-xl border border-[#EBEBEB] p-4 shadow-sm">
            <p className="text-xs text-[#888] mb-1">Completed</p>
            <p className="text-2xl font-bold text-[#10B981]">12</p>
          </div>
        </div>

        {/* Demo Classes List */}
        <div className="space-y-4">
          {demoClasses.map((demo) => (
            <div key={demo.id} className="bg-white rounded-2xl border border-[#EBEBEB] p-5 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {demo.studentAvatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111] text-base">{demo.studentName}</h3>
                    <p className="text-sm text-[#888] mt-0.5">{demo.subject}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  demo.status === 'upcoming' 
                    ? 'bg-[#F97316]/10 text-[#F97316]' 
                    : 'bg-[#3B82F6]/10 text-[#3B82F6]'
                }`}>
                  {demo.status === 'upcoming' ? 'Upcoming' : 'Scheduled'}
                </span>
              </div>

              {/* Time Info */}
              <div className="flex items-center gap-4 mb-4 text-sm text-[#888]">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{demo.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{demo.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video size={16} />
                  <span>{demo.duration}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex items-center gap-4 mb-4 text-xs text-[#888]">
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <span>{demo.studentEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span>{demo.studentPhone}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {demo.status === 'upcoming' && (
                  <button className="px-4 py-2 bg-[#F97316] text-white rounded-lg text-sm font-medium hover:bg-[#EA580C] transition-colors flex items-center gap-2">
                    <Video size={16} />
                    Join Demo
                  </button>
                )}
                <button className="px-4 py-2 bg-white border border-[#EBEBEB] text-[#111] rounded-lg text-sm font-medium hover:border-[#111] transition-colors">
                  Reschedule
                </button>
                <button className="px-4 py-2 bg-white border border-[#EBEBEB] text-[#111] rounded-lg text-sm font-medium hover:border-[#111] transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
