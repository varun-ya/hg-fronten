"use client";

import { useState, useRef, useEffect } from "react";
import IncomeGraph from "@/components/IncomeGraph";
import {
  ArrowDown,
  ArrowUp,
  ArrowRight,
  Bank,
  Receipt,
  Download,
  TrendUp,
  Wallet,
  CurrencyInr,
  Clock,
  CalendarBlank,
  ChartLineUp,
  CaretDown,
  Circle,
  Checks,
  Export,
  Info,
  CaretUp,
} from "@phosphor-icons/react";

const TRANSACTIONS = [
  { id: 1, type: "credit" as const, student: "Meera Iyer", subject: "English Literature", amount: 800, date: "Jan 15", time: "10:00 AM" },
  { id: 2, type: "credit" as const, student: "Arjun Patel", subject: "Mathematics", amount: 1200, date: "Jan 14", time: "2:00 PM" },
  { id: 3, type: "debit" as const, description: "Withdrawal to HDFC ••4829", amount: 5000, date: "Jan 13", time: "11:30 AM" },
  { id: 4, type: "credit" as const, student: "Priya Sharma", subject: "Physics", amount: 800, date: "Jan 12", time: "4:30 PM" },
  { id: 5, type: "credit" as const, student: "Rohan Kumar", subject: "Chemistry", amount: 1000, date: "Jan 11", time: "3:00 PM" },
  { id: 6, type: "credit" as const, student: "Sneha Reddy", subject: "Biology", amount: 600, date: "Jan 10", time: "5:00 PM" },
  { id: 7, type: "debit" as const, description: "Withdrawal to HDFC ••4829", amount: 3000, date: "Jan 8", time: "9:00 AM" },
  { id: 8, type: "credit" as const, student: "Vikram Mehta", subject: "English", amount: 350, date: "Jan 7", time: "6:00 PM" },
  { id: 9, type: "credit" as const, student: "Kavya Singh", subject: "JEE Advanced", amount: 800, date: "Jan 6", time: "11:00 AM" },
  { id: 10, type: "debit" as const, description: "Withdrawal to HDFC ••4829", amount: 2000, date: "Jan 4", time: "10:00 AM" },
];

type Filter = "all" | "credit" | "debit";

// Earnings sparkline — tiny inline chart
function MiniSparkline() {
  const points = [28, 35, 22, 40, 38, 52, 48, 60, 55, 68, 72, 65];
  const max = Math.max(...points);
  const w = 120;
  const h = 32;
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - (p / max) * h;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} className="block">
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#888" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#888" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L${w},${h} L0,${h} Z`} fill="url(#spark)" />
      <path d={d} fill="none" stroke="#AAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={w} cy={h - (points[points.length - 1] / max) * h} r="2.5" fill="#888" />
    </svg>
  );
}

function exportCSV() {
  const rows = [["Date", "Time", "Type", "Description", "Amount"]];
  TRANSACTIONS.forEach((t) => {
    rows.push([
      t.date,
      t.time,
      t.type === "credit" ? "Earned" : "Withdrawn",
      t.type === "credit" ? `${t.student} — ${t.subject}` : (t as any).description,
      `${t.type === "credit" ? "+" : "-"}${t.amount}`,
    ]);
  });
  const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "wallet-transactions.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function exportPDF() {
  const totalEarned = TRANSACTIONS.filter((t) => t.type === "credit").reduce((s, t) => s + t.amount, 0);
  const totalWithdrawn = TRANSACTIONS.filter((t) => t.type === "debit").reduce((s, t) => s + t.amount, 0);
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
  .credit { color: #111; }
  .debit { color: #888; }
  .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #EBEBEB; font-size: 11px; color: #AAA; }
  @media print { body { padding: 24px; } }
</style></head><body>
<div class="header">
  <div><div class="title">Wallet Statement</div><div class="subtitle">January 2024 · homeGuru</div></div>
  <div style="text-align:right"><div class="subtitle">Generated ${new Date().toLocaleDateString()}</div></div>
</div>
<div class="summary">
  <div class="summary-item"><div class="summary-label">Balance</div><div class="summary-value">₹12,400</div></div>
  <div class="summary-item"><div class="summary-label">Earned</div><div class="summary-value">₹${totalEarned.toLocaleString()}</div></div>
  <div class="summary-item"><div class="summary-label">Withdrawn</div><div class="summary-value">₹${totalWithdrawn.toLocaleString()}</div></div>
</div>
<table><thead><tr><th>Date</th><th>Description</th><th>Type</th><th style="text-align:right">Amount</th></tr></thead><tbody>
${TRANSACTIONS.map((t) => `<tr>
  <td>${t.date}<br><span style="color:#AAA;font-size:11px">${t.time}</span></td>
  <td>${t.type === "credit" ? `${t.student}<br><span style="color:#888;font-size:11px">${t.subject}</span>` : (t as any).description}</td>
  <td>${t.type === "credit" ? "Earned" : "Withdrawn"}</td>
  <td class="amount ${t.type}">${t.type === "credit" ? "+" : "−"}₹${t.amount.toLocaleString()}</td>
</tr>`).join("")}
</tbody></table>
<div class="footer">This is a system-generated statement from homeGuru.</div>
</body></html>`);
  w.document.close();
  setTimeout(() => { w.print(); }, 300);
}

export default function WalletPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [exportOpen, setExportOpen] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);

  const filtered = filter === "all" ? TRANSACTIONS : TRANSACTIONS.filter((t) => t.type === filter);

  const totalEarned = TRANSACTIONS.filter((t) => t.type === "credit").reduce((s, t) => s + t.amount, 0);
  const totalWithdrawn = TRANSACTIONS.filter((t) => t.type === "debit").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-[#1C1B1F]">

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-[#F9FAFB] border-b border-[#CAC4D0] px-5 py-2.5">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[17px] font-medium text-[#1C1B1F]">Wallet</span>
            <span className="text-[15px] font-medium text-[#49454F]">January 2024</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setExportOpen(!exportOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#F97316] text-[13px] font-medium text-[#F97316] bg-transparent cursor-pointer hover:bg-[#FFF4ED] transition-colors"
            >
              <Export size={14} />
              Export
            </button>
            {exportOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setExportOpen(false)} />
                <div className="absolute top-full right-0 mt-2 w-[160px] bg-white border border-[#CAC4D0] rounded-xl shadow-lg z-50 py-1.5">
                  <button
                    onClick={() => { exportCSV(); setExportOpen(false); }}
                    className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#FFF4ED] transition-colors text-left border-none bg-transparent cursor-pointer"
                  >
                    <Download size={14} className="text-[#49454F]" />
                    <span className="text-[13px] text-[#1C1B1F]">CSV</span>
                  </button>
                  <button
                    onClick={() => { exportPDF(); setExportOpen(false); }}
                    className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#FFF4ED] transition-colors text-left border-none bg-transparent cursor-pointer"
                  >
                    <Receipt size={14} className="text-[#49454F]" />
                    <span className="text-[13px] text-[#1C1B1F]">PDF</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <div className="max-w-[1100px] mx-auto flex px-5 py-6 gap-6">

        {/* ── Main column ── */}
        <main className="flex-1 min-w-0 space-y-5">

          {/* Balance hero */}
          <div className="bg-white border border-[#CAC4D0] rounded-[14px] overflow-hidden">
            <div className="px-5 py-5 flex items-center justify-between">
              <div>
                <p className="text-[12px] text-[#49454F] mb-1.5">Available Balance</p>
                <div className="flex items-baseline gap-3">
                  <p className="text-[28px] text-[#1C1B1F] leading-none" style={{ letterSpacing: "-0.3px", fontWeight: 400 }}>₹12,400</p>
                  <div className="flex items-center gap-1 text-[12px] text-[#F97316]">
                    <TrendUp size={12} weight="bold" />
                    +18% this month
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MiniSparkline />
              </div>
            </div>

            {/* Mini stats strip */}
            <div className="grid grid-cols-3 border-t border-[#E7E0EC]">
              {[
                { label: "Earned", value: `₹${totalEarned.toLocaleString()}`, icon: ArrowDown },
                { label: "Withdrawn", value: `₹${totalWithdrawn.toLocaleString()}`, icon: ArrowUp },
                { label: "Sessions", value: "32", icon: Clock },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 px-5 py-3.5"
                  style={{ borderRight: i < 2 ? "1px solid #E7E0EC" : "none" }}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#FFF4ED] flex items-center justify-center text-[#F97316]">
                    <s.icon size={15} />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#49454F]">{s.label}</p>
                    <p className="text-[14px] font-medium text-[#1C1B1F]">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Income Graph */}
          <IncomeGraph />

          {/* ⚠️ IMPORTANT: Withdraw Payout Notice */}
          <div className="bg-[#FFF4ED] border border-[#FDBA74] rounded-[14px] overflow-hidden">
            <button
              onClick={() => setDisclaimerOpen(!disclaimerOpen)}
              className="w-full px-5 py-4 flex items-center justify-between gap-3 cursor-pointer bg-transparent border-none text-left hover:bg-[#FFEDD5] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Info size={20} weight="fill" className="text-[#F97316] flex-shrink-0" />
                <p className="text-[14px] font-semibold text-[#1C1B1F]">
                  Payout Processing Information
                </p>
              </div>
              {disclaimerOpen ? (
                <CaretUp size={16} weight="bold" className="text-[#F97316] flex-shrink-0" />
              ) : (
                <CaretDown size={16} weight="bold" className="text-[#F97316] flex-shrink-0" />
              )}
            </button>
            
            {disclaimerOpen && (
              <div className="px-5 pb-4 pt-2 border-t border-[#FDBA74]">
                <div className="space-y-3 text-[13px] text-[#49454F] leading-[1.6]">
                  <p className="font-semibold text-[#1C1B1F]">
                    Withdraw payouts are processed by the homeGuru team every Monday.
                  </p>
                  <p>
                    Please note that payments may be delayed by 1-2 business days due to:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 ml-2">
                    <li>Bank holidays and weekends</li>
                    <li>Public holidays and government shutdowns</li>
                    <li>Banking system maintenance</li>
                    <li>Additional verification requirements</li>
                  </ul>
                  <p className="text-[12px] text-[#625B71] mt-3 pt-3 border-t border-[#FDBA74]">
                    If your payment is delayed beyond 3 business days, please contact our support team.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Filter row */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-semibold text-[#49454F] uppercase tracking-widest">Transactions</span>
            <div className="flex items-center gap-1">
              {(["all", "credit", "debit"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-3 py-1 rounded-lg text-[12px] transition-colors cursor-pointer border-none"
                  style={{
                    backgroundColor: filter === f ? "#FFF4ED" : "transparent",
                    color: filter === f ? "#F97316" : "#49454F",
                  }}
                >
                  {f === "all" ? "All" : f === "credit" ? "Earned" : "Withdrawn"}
                </button>
              ))}
            </div>
          </div>

          {/* Transaction list */}
          <div className="bg-white border border-[#CAC4D0] rounded-[14px] overflow-hidden">
            {filtered.map((txn, idx) => (
              <div
                key={txn.id}
                className="flex items-center gap-3.5 px-5 py-4 hover:bg-[#F7F2FA] transition-colors cursor-pointer group"
                style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #E7E0EC" : "none" }}
              >
                {/* Avatar / icon */}
                {txn.type === "credit" ? (
                  <div className="relative">
                    <img
                      src={`https://api.dicebear.com/7.x/notionists/svg?seed=${txn.student}`}
                      alt={txn.student}
                      className="w-10 h-10 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "#FFF4ED", border: "2px solid #FDBA74" }}
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#F97316] rounded-full border-2 border-white flex items-center justify-center">
                      <ArrowDown size={8} weight="bold" className="text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#FFF4ED] border border-[#FDBA74] flex items-center justify-center flex-shrink-0">
                    <Bank size={16} className="text-[#F97316]" />
                  </div>
                )}

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-medium text-[#1C1B1F] truncate">
                      {txn.type === "credit" ? txn.student : txn.description}
                    </p>
                    {txn.type === "credit" && (
                      <span className="flex items-center gap-1 text-[10px] text-[#49454F]">
                        <Checks size={11} />
                        Paid
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    {txn.type === "credit" && (
                      <>
                        <span className="text-[12px] text-[#49454F]">{txn.subject}</span>
                        <span className="text-[10px] text-[#CAC4D0]">·</span>
                      </>
                    )}
                    <span className="text-[12px] text-[#79747E]">{txn.time}</span>
                  </div>
                </div>

                {/* Amount + date */}
                <div className="text-right flex-shrink-0">
                  <p className={`text-[14px] font-medium ${txn.type === "credit" ? "text-[#F97316]" : "text-[#625B71]"}`}>
                    {txn.type === "credit" ? "+" : "−"}₹{txn.amount.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-[#79747E] mt-0.5">{txn.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Load more */}
          <div className="flex justify-center py-2">
            <button className="text-[12px] text-[#F97316] hover:text-[#EA580C] cursor-pointer bg-transparent border-none transition-colors font-medium">
              Show older transactions
            </button>
          </div>
        </main>

        {/* ── Sidebar ── */}
        <aside className="hidden lg:block w-[280px] flex-shrink-0">
          <div className="sticky top-[52px] space-y-4">

            {/* Monthly breakdown */}
            <div className="bg-white border border-[#CAC4D0] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#E7E0EC] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#49454F] uppercase tracking-widest">This Month</span>
                <span className="text-[11px] text-[#79747E] font-medium">Jan 2024</span>
              </div>
              <div>
                {[
                  { label: "Total earned", value: "₹5,750", change: "+18%" },
                  { label: "Avg. per session", value: "₹387", change: "+12%" },
                  { label: "Sessions done", value: "32", change: "+8" },
                  { label: "New students", value: "3", change: "+3" },
                ].map((item, i, arr) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between px-4 py-3 hover:bg-[#F9FAFB] transition-colors"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid #E7E0EC" : "none" }}
                  >
                    <div>
                      <p className="text-[12px] text-[#49454F]">{item.label}</p>
                      <p className="text-[15px] font-medium text-[#1C1B1F] mt-0.5">{item.value}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-medium text-[#16A34A]">
                      <TrendUp size={11} weight="bold" />
                      {item.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top earners */}
            <div className="bg-white border border-[#CAC4D0] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#E7E0EC]">
                <span className="text-[11px] font-semibold text-[#49454F] uppercase tracking-widest">Top Students</span>
              </div>
              <div className="p-4 space-y-3.5">
                {[
                  { name: "Arjun Patel", subject: "Mathematics", total: "₹4,800" },
                  { name: "Meera Iyer", subject: "English Literature", total: "₹3,200" },
                  { name: "Kavya Singh", subject: "JEE Advanced", total: "₹2,400" },
                ].map((s, i) => (
                  <div key={s.name} className="flex items-center gap-3 cursor-pointer hover:bg-[#F9FAFB] -mx-2 px-2 py-1.5 rounded-lg transition-colors">
                    <div className="relative">
                      <img
                        src={`https://api.dicebear.com/7.x/notionists/svg?seed=${s.name}`}
                        alt={s.name}
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: "#F5F5F5" }}
                      />
                      <span
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#F97316] flex items-center justify-center text-[8px] font-bold border-2 border-white text-white"
                      >
                        {i + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-[#1C1B1F] truncate">{s.name}</p>
                      <p className="text-[11px] text-[#79747E]">{s.subject}</p>
                    </div>
                    <span className="text-[12px] font-semibold text-[#1C1B1F]">{s.total}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-white border border-[#CAC4D0] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#E7E0EC]">
                <span className="text-[11px] font-semibold text-[#49454F] uppercase tracking-widest">Quick Actions</span>
              </div>
              <div>
                {[
                  { label: "Download statement", icon: Receipt },
                  { label: "Bank details", icon: Bank },
                  { label: "Tax information", icon: CurrencyInr },
                ].map((action, i, arr) => (
                  <button
                    key={action.label}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#F7F2FA] transition-colors cursor-pointer bg-transparent border-none text-left"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid #E7E0EC" : "none" }}
                  >
                    <div className="flex items-center gap-3">
                      <action.icon size={15} className="text-[#49454F]" />
                      <span className="text-[13px] text-[#1C1B1F]">{action.label}</span>
                    </div>
                    <ArrowRight size={12} className="text-[#79747E]" />
                  </button>
                ))}
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white border border-[#CAC4D0] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#E7E0EC]">
                <span className="text-[11px] font-semibold text-[#49454F] uppercase tracking-widest">Payout Method</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F5F5F5] flex items-center justify-center text-[#49454F]">
                    <Bank size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-medium text-[#1C1B1F]">HDFC Bank</p>
                    <p className="text-[11px] text-[#79747E]">Savings ••4829</p>
                  </div>
                  <button className="text-[12px] text-[#1C1B1F] hover:text-[#F97316] cursor-pointer bg-transparent border-none transition-colors font-medium">
                    Edit
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap gap-x-3 gap-y-1 px-1 text-[11px] text-[#79747E]">
              {["Help", "Tax Info", "Privacy", "Terms"].map((l) => (
                <span key={l} className="cursor-pointer hover:text-[#1C1B1F]">{l}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
