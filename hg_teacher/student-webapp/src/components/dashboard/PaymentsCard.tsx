"use client";

import { CaretRight } from "@phosphor-icons/react";

export default function PaymentsCard() {
  return (
    <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">

      {/* Summary Strip */}
      <div className="grid grid-cols-2 border-b border-[#F5F5F5]">
        <div className="flex flex-col items-center py-4" style={{ borderRight: "1px solid #F5F5F5" }}>
          <p className="text-[10px] text-[#AAA] mb-1">Received</p>
          <p className="text-[22px] font-light text-[#111] leading-none" style={{ letterSpacing: "-0.3px" }}>₹10,000</p>
        </div>
        <div className="flex flex-col items-center py-4">
          <p className="text-[10px] text-[#AAA] mb-1">Pending</p>
          <p className="text-[22px] font-light text-[#F97316] leading-none" style={{ letterSpacing: "-0.3px" }}>₹2,400</p>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="px-5 py-4 border-b border-[#F5F5F5]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest">Recent</span>
          <button className="flex items-center gap-1 text-[11px] text-[#888] hover:text-[#111] cursor-pointer bg-transparent border-none transition-colors">
            See all <CaretRight size={10} />
          </button>
        </div>
        <div className="space-y-0">
          {[
            { name: "Aarav Sharma", subject: "Mathematics", amount: "₹500", time: "Today", isDemo: false },
            { name: "Priya Patel", subject: "Physics", amount: "₹500", time: "Today", isDemo: false },
            { name: "Sneha Kapoor", subject: "JEE Advanced", amount: "₹800", time: "Yesterday", isDemo: false },
            { name: "Kavya Singh", subject: "JEE Prep", amount: "₹600", time: "Yesterday", isDemo: false },
            { name: "Rohan Gupta", subject: "Chemistry", amount: "₹0", time: "Demo", isDemo: true },
            { name: "Meera Iyer", subject: "English Lit", amount: "₹500", time: "Mon", isDemo: false },
            { name: "Amit Verma", subject: "Calculus", amount: "₹600", time: "Mon", isDemo: false },
          ].map((payment, i, arr) => (
            <div
              key={i}
              className="flex items-center gap-3 py-2.5 cursor-pointer hover:bg-[#FAFAFA] -mx-1 px-1 rounded-lg transition-colors"
              style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
            >
              <img
                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${payment.name}`}
                alt={payment.name}
                className="w-8 h-8 rounded-full shrink-0"
                style={{ backgroundColor: "#FAFAFA", border: "1.5px solid #EBEBEB" }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-[#111] truncate">{payment.name}</p>
                <p className="text-[11px] text-[#AAA] mt-0.5">{payment.subject}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-[13px] font-light ${payment.isDemo ? "text-[#CCC]" : "text-[#111]"}`}>
                  {payment.amount}
                </p>
                <p className="text-[10px] text-[#CCC] mt-0.5">
                  {payment.isDemo ? (
                    <span className="text-[9px] font-semibold text-[#F97316] bg-[#FFF7ED] px-1.5 py-0.5 rounded-full">DEMO</span>
                  ) : payment.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Stats */}
      <div className="px-5 py-4">
        <span className="text-[11px] font-semibold text-[#AAA] uppercase tracking-widest block mb-3">This Month</span>
        {[
          { label: "Total sessions", value: "42" },
          { label: "Paid sessions", value: "38" },
          { label: "Demo sessions", value: "4" },
          { label: "Avg per session", value: "₹450" },
        ].map((stat, i, arr) => (
          <div
            key={i}
            className="flex items-center justify-between py-2"
            style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
          >
            <span className="text-[12px] text-[#888]">{stat.label}</span>
            <span className="text-[13px] font-light text-[#111]">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
