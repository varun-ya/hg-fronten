"use client";
import { CheckSquare, Clock, AlertCircle } from "lucide-react";

export default function TeacherToDo() {
  const tasks = [
    { title: "Grade Aarav's assignment", due: "Due today", urgent: true },
    { title: "Reply to Kavya", due: "2h ago", urgent: false },
    { title: "Confirm Amit's session", due: "Tomorrow", urgent: false },
    { title: "Update lesson plan", due: "This week", urgent: false },
    { title: "Create mock test", due: "By Friday", urgent: false },
  ];

  return (
    <div className="bg-white w-full font-matter border border-[#E5E7EB] rounded-[16px] p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <CheckSquare size={20} className="text-[#1A1A1A]" strokeWidth={2} />
          <h3 className="text-[#111827] text-[16px] font-season font-bold">To Do</h3>
        </div>
        <span className="text-[#D97706] text-[13px] font-medium">5 pending</span>
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <div key={index} className="p-4 bg-[#F9FAFB] rounded-xl hover:bg-[#F3F4F6] transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded border-2 border-[#D1D5DB] mt-0.5 shrink-0 hover:border-[#3B82F6] transition-colors"></div>
              <div className="flex-1 min-w-0">
                <p className="text-[#111827] text-[14px] font-semibold mb-1">{task.title}</p>
                <div className="flex items-center gap-1.5">
                  {task.urgent ? (
                    <>
                      <AlertCircle size={12} className="text-[#DC2626]" />
                      <span className="text-[#DC2626] text-[12px] font-medium">{task.due}</span>
                    </>
                  ) : (
                    <>
                      <Clock size={12} className="text-[#6B7280]" />
                      <span className="text-[#6B7280] text-[12px]">{task.due}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
