"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AIMatchBanner() {
  const router = useRouter();
  const [navigating, setNavigating] = useState(false);

  const handleClick = () => {
    if (navigating) return;
    setNavigating(true);
    setTimeout(() => router.push("/guru-ai"), 600);
  };

  return (
    <div
      className="relative overflow-hidden rounded-[28px] p-6 md:p-8 cursor-pointer min-h-[200px]"
      onClick={handleClick}
      style={{
        transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease",
        transform: navigating ? "scale(0.97)" : "scale(1)",
        opacity: navigating ? 0.85 : 1,
      }}
    >
      {/* Background Image */}
      <img
        src="/student/6.1.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* White overlay that fades in on click */}
      <div
        className="absolute inset-0 bg-white pointer-events-none"
        style={{
          zIndex: 1,
          transition: "opacity 0.5s ease",
          opacity: navigating ? 0.55 : 0,
        }}
      />

      {/* Shimmer sweep on click */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)",
          transform: navigating ? "translateX(100%)" : "translateX(-100%)",
          transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col justify-center h-full"
        style={{
          zIndex: 3,
          transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
          transform: navigating ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        <h2 className="text-[28px] md:text-[36px] font-light mb-3 leading-tight max-w-[600px]" style={{ color: "#1A1C1E" }}>
          Your Perfect Tutor, Matched by AI
        </h2>
        <p className="text-[14px] md:text-[16px] mb-6 max-w-[500px] leading-relaxed" style={{ color: "#44474E" }}>
          No more guessing. Meet tutors aligned with your learning goals and career path.
        </p>
        <button className="px-6 py-3 rounded-full text-[15px] font-medium transition-all border-none cursor-pointer w-fit hover:shadow-md" style={{ background: "#1B6EF3", color: "#FFFFFF" }}>
          Find my match
        </button>
      </div>
    </div>
  );
}
