"use client";
import { MessageCircle } from "lucide-react";

export default function TeacherMessages() {
  const messages = [
    { 
      name: "Sneha Kapoor", 
      message: "Can we reschedule tomorrow's class?", 
      time: "20m", 
      avatar: "SK", 
      color: "from-[#8B5CF6] to-[#6366F1]" 
    },
    { 
      name: "Rohan Gupta", 
      message: "Doubt in organic chemistry reaction", 
      time: "1h", 
      avatar: "RG", 
      color: "from-[#EF4444] to-[#DC2626]" 
    },
    { 
      name: "Kavya Singh", 
      message: "Sent you the assignment", 
      time: "3h", 
      avatar: "KS", 
      color: "from-[#8B5CF6] to-[#6366F1]" 
    },
  ];

  return (
    <div className="bg-white w-full font-matter border border-[#E5E7EB] rounded-[16px] p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <MessageCircle size={20} className="text-[#1A1A1A]" strokeWidth={2} />
          <h3 className="text-[#111827] text-[16px] font-season font-bold">Messages</h3>
        </div>
        <button className="text-[#3B82F6] text-[13px] font-medium hover:text-[#2563EB] transition-colors">
          Open
        </button>
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        {messages.map((msg, index) => (
          <div key={index} className="p-4 bg-[#F9FAFB] rounded-xl hover:bg-[#F3F4F6] transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className={`w-[42px] h-[42px] rounded-full bg-gradient-to-br ${msg.color} flex items-center justify-center text-white text-[13px] font-semibold shrink-0`}>
                {msg.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#111827] text-[14px] font-semibold mb-1">{msg.name}</p>
                <p className="text-[#6B7280] text-[13px] truncate mb-1">{msg.message}</p>
                <p className="text-[#9CA3AF] text-[12px]">{msg.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
