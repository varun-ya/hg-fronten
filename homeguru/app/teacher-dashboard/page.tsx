"use client";
import { useEffect } from "react";

export default function TeacherDashboard() {
  useEffect(() => {
    window.location.href = "/teacher";
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-[#F5F5F3]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F97316] mx-auto mb-4"></div>
        <p className="text-[#666] font-matter">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
