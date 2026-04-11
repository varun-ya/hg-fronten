"use client";
import { Activity } from "lucide-react";

export default function TeacherActivityFeed() {
  const activities = [
    { name: "Sneha Kapoor", action: "scored 247/300 in JEE Mock #8", time: "45m", avatar: "SK", color: "from-[#8B5CF6] to-[#6366F1]" },
    { name: "Aarav Sharma", action: "submitted Quadratic Equations assignment", time: "2h", avatar: "AS", color: "from-[#3B82F6] to-[#8B5CF6]" },
    { name: "Priya Patel", action: "rescheduled Physics to 11:30 AM", time: "3h", avatar: "PP", color: "from-[#10B981] to-[#059669]" },
    { name: "Rohan Gupta", action: "completed Organic Chemistry practice set", time: "5h", avatar: "RG", color: "from-[#EF4444] to-[#DC2626]" },
    { name: "Meera Iyer", action: "started English Literature chapter 8", time: "6h", avatar: "MI", color: "from-[#F97316] to-[#EF4444]" },
    { name: "Kavya Singh", action: "asked a doubt in JEE Prep group", time: "8h", avatar: "KS", color: "from-[#8B5CF6] to-[#6366F1]" },
    { name: "Amit Verma", action: "completed Calculus assignment early", time: "10h", avatar: "AV", color: "from-[#F97316] to-[#EA580C]" },
    { name: "Sneha Kapoor", action: "started revision for JEE Mock #9", time: "12h", avatar: "SK", color: "from-[#8B5CF6] to-[#6366F1]" },
  ];

  return (
    <div className="bg-white w-full font-matter border border-[#E5E7EB] rounded-[16px] p-6">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <Activity size={20} className="text-[#1A1A1A]" strokeWidth={2} />
        <h3 className="text-[#111827] text-[16px] font-season font-bold">Activity</h3>
      </div>

      {/* Activity List */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`w-[36px] h-[36px] rounded-full bg-gradient-to-br ${activity.color} flex items-center justify-center text-white text-[12px] font-semibold shrink-0`}>
              {activity.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#111827] text-[14px] leading-snug">
                <span className="font-semibold">{activity.name}</span> {activity.action}
              </p>
              <p className="text-[#6B7280] text-[12px] mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
