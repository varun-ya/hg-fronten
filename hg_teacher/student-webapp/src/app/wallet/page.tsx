"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SpendingGraph from "@/components/SpendingGraph";
import {
  ArrowDown,
  ArrowUp,
  ArrowRight,
  Bank,
  Receipt,
  Download,
  TrendUp,
  Export,
  Info,
  CaretUp,
  CaretDown,
} from "@phosphor-icons/react";

// Student transactions - debit = paid to tutor, credit = refund
const TRANSACTIONS = [
  { id: 1, type: "debit" as const, tutor: "Ayush Soni", subject: "Mathematics", amount: 500, date: "Jan 15", time: "10:00 AM" },
  { id: 2, type: "debit" as const, tutor: "Priya Menon", subject: "Physics", amount: 500, date: "Jan 14", time: "2:00 PM" },
  { id: 3, type: "debit" as const, tutor: "Ayush Soni", subject: "JEE Advanced", amount: 700, date: "Jan 13", time: "11:30 AM" },
  { id: 4, type: "debit" as const, tutor: "Ankit Kapoor", subject: "English", amount: 400, date: "Jan 12", time: "4:30 PM" },
  { id: 5, type: "credit" as const, description: "Refund - Class Cancelled", amount: 500, date: "Jan 11", time: "3:00 PM" },
  { id: 6, type: "debit" as const, tutor: "Priya Menon", subject: "Physics", amount: 500, date: "Jan 10", time: "5:00 PM" },
  { id: 7, type: "debit" as const, tutor: "Ayush Soni", subject: "Mathematics", amount: 500, date: "Jan 8", time: "9:00 AM" },
  { id: 8, type: "debit" as const, tutor: "Ankit Kapoor", subject: "English", amount: 400, date: "Jan 7", time: "6:00 PM" },
  { id: 9, type: "debit" as const, tutor: "Ayush Soni", subject: "JEE Advanced", amount: 700, date: "Jan 6", time: "11:00 AM" },
  { id: 10, type: "debit" as const, tutor: "Priya Menon", subject: "Physics", amount: 500, date: "Jan 4", time: "10:00 AM" },
];

type Filter = "all" | "debit" | "credit";

// Export functions
function exportCSV() {
  const rows = [["Date", "Time", "Type", "Description", "Amount"]];
  TRANSACTIONS.forEach((t) => {
    rows.push([
      t.date,
      t.time,
      t.type === "debit" ? "Paid" : "Refund",
      t.type === "debit" ? `${t.tutor} — ${t.subject}` : (t as any).description,
      `${t.type === "debit" ? "-" : "+"}${t.amount}`,
    ]);
  });
  const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "wallet-transactions.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function exportPDF() {
  const totalSpent = TRANSACTIONS.filter((t) => t.type === "debit").reduce((s, t) => s + t.amount, 0);
  const totalRefund = TRANSACTIONS.filter((t) => t.type === "credit").reduce((s, t) => s + t.amount, 0);
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(`<!DOCTYPE html><html><head><title>Wallet Statement</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111; padding: 48px; max-width: 800px; margin: 0 auto; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid #EBEBEB; }
  .title { font-size: 20px; font-weight: 500; }
  .subtitle { font-size: 12px; color: #888; margin-top: 4px; }
  .summary { display: flex; gap: 32px; margin-bottom: 32px; }
  .summary-item { }
  .summary-label { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }
  .summary-value { font-size: 18px; font-weight: 500; margin-top: 4px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { text-align: left; padding: 10px 12px; font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #EBEBEB; }
  td { padding: 12px; border-bottom: 1px solid #F5F5F5; }
  .amount { text-align: right; font-weight: 500; }
  .debit { color: #111; }
  .credit { color: #16A34A; }
  .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #EBEBEB; font-size: 11px; color: #AAA; }
  @media print { body { padding: 24px; } }
</style></head><body>
<div class="header">
  <div><div class="title">Wallet Statement</div><div class="subtitle">January 2024 · homeGuru Student</div></div>
  <div style="text-align:right"><div class="subtitle">Generated ${new Date().toLocaleDateString()}</div></div>
</div>
<div class="summary">
  <div class="summary-item"><div class="summary-label">Total Spent</div><div class="summary-value">₹${totalSpent.toLocaleString()}</div></div>
  <div class="summary-item"><div class="summary-label">Refunds</div><div class="summary-value">₹${totalRefund.toLocaleString()}</div></div>
</div>
<table><thead><tr><th>Date</th><th>Description</th><th>Type</th><th style="text-align:right">Amount</th></tr></thead><tbody>
${TRANSACTIONS.map((t) => `<tr>
  <td>${t.date}<br><span style="color:#AAA;font-size:11px">${t.time}</span></td>
  <td>${t.type === "debit" ? `${t.tutor}<br><span style="color:#888;font-size:11px">${t.subject}</span>` : (t as any).description}</td>
  <td>${t.type === "debit" ? "Paid" : "Refund"}</td>
  <td class="amount ${t.type}">${t.type === "debit" ? "−" : "+"}₹${t.amount.toLocaleString()}</td>
</tr>`).join("")}
</tbody></table>
<div class="footer">This is a system-generated statement from homeGuru.</div>
</body></html>`);
  w.document.close();
  setTimeout(() => { w.print(); }, 300);
}

export default function WalletPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [exportOpen, setExportOpen] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);

  const filtered = filter === "all" ? TRANSACTIONS : TRANSACTIONS.filter((t) => t.type === filter);

  const totalSpent = TRANSACTIONS.filter((t) => t.type === "debit").reduce((s, t) => s + t.amount, 0);
  const totalRefund = TRANSACTIONS.filter((t) => t.type === "credit").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#111]">

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#EBEBEB] px-5 py-2.5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F5F5F5] transition-colors cursor-pointer border-none bg-transparent">
              <ArrowRight size={18} weight="bold" className="text-[#111] rotate-180" />
            </button>
            <span className="text-[17px] font-medium text-[#111]">Wallet</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setExportOpen(!exportOpen)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-medium text-[#111] cursor-pointer transition-colors border border-[#E5E7EB] bg-transparent hover:bg-white"
            >
              <Export size={14} />
              Export
            </button>
            {exportOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setExportOpen(false)} />
                <div className="absolute top-full right-0 mt-2 w-[140px] bg-white border border-[#EBEBEB] rounded-xl shadow-lg z-50 py-1.5">
                  <button
                    onClick={() => { exportCSV(); setExportOpen(false); }}
                    className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#FAFAFA] transition-colors text-left border-none bg-transparent cursor-pointer"
                  >
                    <Download size={14} className="text-[#888]" />
                    <span className="text-[14px] text-[#111] font-medium">CSV</span>
                  </button>
                  <button
                    onClick={() => { exportPDF(); setExportOpen(false); }}
                    className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#FAFAFA] transition-colors text-left border-none bg-transparent cursor-pointer"
                  >
                    <Receipt size={14} className="text-[#888]" />
                    <span className="text-[14px] text-[#111] font-medium">PDF</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 sm:gap-6 px-3 sm:px-5 py-4 sm:py-6">

        {/* Main column */}
        <main className="space-y-5">

          {/* Balance Overview */}
          <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#F5F5F5]">
              <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">Overview</span>
            </div>
            <div className="grid grid-cols-3 border-b border-[#F5F5F5]">
              {[
                { label: "Total Spent", value: "₹5,200" },
                { label: "Refunds", value: `₹${totalRefund.toLocaleString()}` },
                { label: "Sessions", value: "12" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center py-4 hover:bg-[#FFF7F0] transition-colors cursor-pointer"
                  style={{ borderRight: i < 2 ? "1px solid #F5F5F5" : "none" }}
                >
                  <p className="text-[20px] font-medium text-[#111] leading-none mb-1">{stat.value}</p>
                  <p className="text-[11px] text-[#888]">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 bg-[#FFF7F0] flex items-center gap-2">
              <TrendUp size={12} className="text-[#F97316]" weight="bold" />
              <span className="text-[12px] text-[#666]">+12% from last month</span>
            </div>
          </div>

          {/* Spending Graph */}
          <SpendingGraph />

          {/* Payment Info Notice */}
          <div className="bg-[#FFF7F0] border border-[#EBEBEB] rounded-[14px] overflow-hidden">
            <button
              onClick={() => setDisclaimerOpen(!disclaimerOpen)}
              className="w-full px-4 py-3 flex items-center justify-between gap-3 cursor-pointer bg-transparent border-none text-left hover:bg-[#FFEDD5] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Info size={16} className="text-[#F97316] flex-shrink-0" />
                <p className="text-[13px] font-medium text-[#111]">
                  Payment & Refund Information
                </p>
              </div>
              {disclaimerOpen ? (
                <CaretUp size={14} className="text-[#888] flex-shrink-0" />
              ) : (
                <CaretDown size={14} className="text-[#888] flex-shrink-0" />
              )}
            </button>
            
            {disclaimerOpen && (
              <div className="px-4 pb-3 pt-2 border-t border-[#EBEBEB]">
                <div className="space-y-2 text-[12px] text-[#666] leading-[1.6]">
                  <p>
                    Refunds for cancelled classes are processed within 5-7 business days.
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2 text-[11px]">
                    <li>Refunds initiated within 24 hours</li>
                    <li>Credited to original payment method</li>
                    <li>Email confirmation sent</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Filter row */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">Transactions</span>
            <div className="flex items-center gap-1">
              {(["all", "debit", "credit"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-3 py-1 rounded-full text-[11px] transition-colors cursor-pointer border-none"
                  style={{
                    backgroundColor: filter === f ? "#FFF7F0" : "transparent",
                    color: filter === f ? "#F97316" : "#888",
                    fontWeight: filter === f ? 600 : 400
                  }}
                >
                  {f === "all" ? "All" : f === "debit" ? "Paid" : "Refunds"}
                </button>
              ))}
            </div>
          </div>

          {/* Transaction list */}
          <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
            {filtered.map((txn, idx) => (
              <div
                key={txn.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#FFF7F0] transition-colors cursor-pointer"
                style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #F5F5F5" : "none" }}
              >
                {/* Avatar / icon */}
                {txn.type === "debit" ? (
                  <img
                    src={`https://api.dicebear.com/7.x/notionists/svg?seed=${txn.tutor}`}
                    alt={txn.tutor}
                    className="w-8 h-8 rounded-full flex-shrink-0 border border-[#EBEBEB]"
                    style={{ backgroundColor: "#F5F5F5" }}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                    <ArrowDown size={14} className="text-[#22C55E]" />
                  </div>
                )}

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-[#111] truncate">
                    {txn.type === "debit" ? txn.tutor : txn.description}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {txn.type === "debit" && (
                      <>
                        <span className="text-[11px] text-[#AAA]">{txn.subject}</span>
                        <span className="text-[8px] text-[#DDD]">·</span>
                      </>
                    )}
                    <span className="text-[11px] text-[#AAA]">{txn.date}</span>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right flex-shrink-0">
                  <p className={`text-[13px] font-medium ${txn.type === "debit" ? "text-[#111]" : "text-[#22C55E]"}`}>
                    {txn.type === "debit" ? "−" : "+"}₹{txn.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Load more */}
          <div className="flex justify-center py-2">
            <button className="text-[11px] text-[#888] hover:text-[#111] cursor-pointer bg-transparent border-none transition-colors">
              Show older transactions
            </button>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="hidden lg:block space-y-4">
          <div className="sticky top-[52px] space-y-4">

            {/* Monthly breakdown */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F5F5F5]">
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">This Month</span>
              </div>
              <div className="grid grid-cols-2 border-b border-[#F5F5F5]">
                {[
                  { label: "Spent", value: "₹5,200" },
                  { label: "Sessions", value: "12" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center py-3.5"
                    style={{ borderRight: i < 1 ? "1px solid #F5F5F5" : "none" }}
                  >
                    <p className="text-[16px] font-medium text-[#111] leading-none mb-1">{stat.value}</p>
                    <p className="text-[11px] text-[#AAA]">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div>
                {[
                  { label: "Avg. per session", value: "₹433" },
                  { label: "Active tutors", value: "3" },
                ].map((item, i, arr) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-[#FAFAFA] transition-colors"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
                  >
                    <span className="text-[12px] text-[#666]">{item.label}</span>
                    <span className="text-[12px] font-medium text-[#111]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top tutors */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F5F5F5]">
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">My Tutors</span>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { name: "Ayush Soni", subject: "Mathematics · JEE", total: "₹2,400" },
                  { name: "Priya Menon", subject: "Physics", total: "₹1,500" },
                  { name: "Ankit Kapoor", subject: "English", total: "₹1,300" },
                ].map((s) => (
                  <div key={s.name} className="flex items-center gap-3 cursor-pointer hover:bg-[#FAFAFA] -mx-2 px-2 py-2 rounded-lg transition-colors">
                    <img
                      src={`https://api.dicebear.com/7.x/notionists/svg?seed=${s.name}`}
                      alt={s.name}
                      className="w-8 h-8 rounded-full border border-[#EBEBEB]"
                      style={{ backgroundColor: "#F5F5F5" }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-[#111] truncate">{s.name}</p>
                      <p className="text-[11px] text-[#AAA]">{s.subject}</p>
                    </div>
                    <span className="text-[11px] text-[#666]">{s.total}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F5F5F5]">
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">Quick Actions</span>
              </div>
              <div>
                {[
                  { label: "Download statement", icon: Receipt },
                  { label: "Payment methods", icon: Bank },
                ].map((action, i, arr) => (
                  <button
                    key={action.label}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[#FAFAFA] transition-colors cursor-pointer bg-transparent border-none text-left"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5F5" : "none" }}
                  >
                    <div className="flex items-center gap-3">
                      <action.icon size={14} className="text-[#888]" />
                      <span className="text-[12px] text-[#111]">{action.label}</span>
                    </div>
                    <ArrowRight size={12} className="text-[#CCC]" />
                  </button>
                ))}
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F5F5F5]">
                <span className="text-[11px] font-semibold text-[#888] uppercase tracking-widest">Payment Method</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center text-[#888]">
                    <Bank size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px] font-medium text-[#111]">UPI</p>
                    <p className="text-[11px] text-[#AAA]">ravi@okaxis</p>
                  </div>
                  <button className="text-[11px] text-[#888] hover:text-[#111] cursor-pointer bg-transparent border-none transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 px-2 text-[11px] text-[#AAA] font-medium">
              {["Help", "Support", "Privacy", "Terms"].map((l) => (
                <span key={l} className="cursor-pointer hover:text-[#888] transition-colors">{l}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
