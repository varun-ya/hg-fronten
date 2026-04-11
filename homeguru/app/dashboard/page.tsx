"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to student webapp via gateway
    window.location.href = "/student";
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-[#F5F5F3]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F97316] mx-auto mb-4"></div>
        <p className="text-[#666] font-matter">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
