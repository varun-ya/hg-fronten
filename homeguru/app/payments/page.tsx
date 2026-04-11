"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Menu, X } from "lucide-react";

/* ─── Colour tokens — matches Sarvam theme ─── */
const P = {
  blue:       "#2C3C69",
  blueDark:   "#1E2D52",
  blueDeep:   "#131E3A",
  blueSub:    "#EDF0F7",
  blueMid:    "#D3D9EC",
  blueText:   "#2C3C69",
  amber:      "#FBBF24",
  amberDark:  "#B45309",
  amberSub:   "#FFFBEB",
  amberMid:   "#FEF3C7",
  green:      "#16A34A",
  red:        "#EF4444",
  white:      "#FFFFFF",
  bg:         "#FFFFFF",
  border:     "#E5E7EB",
  borderSoft: "#F3F4F6",
  text:       "#0F1117",
  mid:        "#303A4F",
  muted:      "#6B7280",
};

/* ── Svg helper ── */
const Svg = ({ d, s = 14, className = "" }: { d: React.ReactNode, s?: number, className?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);

const D = {
  back: <polyline points="15 18 9 12 15 6" />,
  dl: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>,
  asn: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /></>,
  info: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></>,
  srch: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
  plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
  close: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
};

/* ── MOCK DATA ── */
const PLAN = {
  name: "Growth Plan", price: 2999, cycle: "month",
  features: ["Unlimited session bookings", "AI-powered tutor matching", "Priority support", "Advanced analytics", "Certificate generation"],
  nextBilling: "Apr 14, 2026", since: "Jan 14, 2026",
};

const PAYMENT_METHODS = [
  { id: "pm1", type: "card", brand: "Visa", last4: "4242", expiry: "08/27", primary: true },
  { id: "pm2", type: "upi", handle: "varun@okaxis", primary: false },
];

const TXNS = [
  {
    id: "TXN-2603140001", type: "session", desc: "English Speaking — Intermediate",
    teacher: "Cercei Lannister", subject: "English", subColor: P.amberDark,
    date: "Mar 14, 2026", dateShort: "Today", amount: 669, status: "paid",
    method: "Visa ••4242", sessionDate: "Mar 14, 2026 · 2:00 PM", duration: "1h 0m",
    breakdown: [
      { label: "Session fee (1h)", amount: 599 },
      { label: "Platform fee (5%)", amount: 30 },
      { label: "GST (18%)", amount: 40 },
    ],
    invoiceNo: "INV-2603140001",
  },
  {
    id: "TXN-2603080002", type: "subscription", desc: "Growth Plan — Monthly Renewal",
    teacher: null, subject: "Subscription", subColor: P.blue,
    date: "Mar 8, 2026", dateShort: "Mar 8", amount: 2999, status: "paid",
    method: "Visa ••4242", sessionDate: null, duration: null,
    breakdown: [
      { label: "Growth Plan (1 month)", amount: 2541 },
      { label: "GST (18%)", amount: 458 },
    ],
    invoiceNo: "INV-2603080002",
  },
  {
    id: "TXN-2603050003", type: "session", desc: "Python Functions & Closures",
    teacher: "Aditya Kulkarni", subject: "Python", subColor: "#0EA5E9",
    date: "Mar 5, 2026", dateShort: "Mar 5", amount: 539, status: "paid",
    method: "varun@okaxis", sessionDate: "Mar 5, 2026 · 11:00 AM", duration: "1h 15m",
    breakdown: [
      { label: "Session fee (1h 15m)", amount: 459 },
      { label: "Platform fee (5%)", amount: 23 },
      { label: "GST (18%)", amount: 57 },
    ],
    invoiceNo: "INV-2603050003",
  },
  {
    id: "TXN-2603020004", type: "session", desc: "Laws of Motion — Numericals",
    teacher: "Ms. Priya Kapoor", subject: "Physics", subColor: "#6366F1",
    date: "Mar 2, 2026", dateShort: "Mar 2", amount: 799, status: "paid",
    method: "Visa ••4242", sessionDate: "Mar 2, 2026 · 4:00 PM", duration: "1h 0m",
    breakdown: [
      { label: "Session fee (1h)", amount: 669 },
      { label: "Platform fee (5%)", amount: 33 },
      { label: "GST (18%)", amount: 97 },
    ],
    invoiceNo: "INV-2603020004",
  },
  {
    id: "TXN-2602270005", type: "session", desc: "English — Consonant Clusters",
    teacher: "Cercei Lannister", subject: "English", subColor: P.amberDark,
    date: "Feb 27, 2026", dateShort: "Feb 27", amount: 669, status: "paid",
    method: "Visa ••4242", sessionDate: "Feb 27, 2026 · 2:00 PM", duration: "1h 0m",
    breakdown: [
      { label: "Session fee (1h)", amount: 599 },
      { label: "Platform fee (5%)", amount: 30 },
      { label: "GST (18%)", amount: 40 },
    ],
    invoiceNo: "INV-2602270005",
  },
  {
    id: "TXN-2602140006", type: "refund", desc: "Session Cancelled — Refund",
    teacher: "Ms. Priya Kapoor", subject: "Physics", subColor: "#6366F1",
    date: "Feb 14, 2026", dateShort: "Feb 14", amount: -799, status: "refunded",
    method: "Visa ••4242", sessionDate: "Feb 14, 2026 · 4:00 PM (cancelled)", duration: null,
    breakdown: [
      { label: "Session fee refund", amount: -799 },
    ],
    invoiceNo: "INV-2602140006",
  },
  {
    id: "TXN-2602080007", type: "subscription", desc: "Growth Plan — Monthly Renewal",
    teacher: null, subject: "Subscription", subColor: P.blue,
    date: "Feb 8, 2026", dateShort: "Feb 8", amount: 2999, status: "paid",
    method: "Visa ••4242", sessionDate: null, duration: null,
    breakdown: [
      { label: "Growth Plan (1 month)", amount: 2541 },
      { label: "GST (18%)", amount: 458 },
    ],
    invoiceNo: "INV-2602080007",
  },
];

const SPEND_BY_SUBJECT = [
  { subject: "English", color: P.amberDark, amount: 4686, sessions: 7 },
  { subject: "Physics", color: "#6366F1", amount: 3196, sessions: 4 },
  { subject: "Python", color: "#0EA5E9", amount: 2156, sessions: 4 },
];

/* ── ATOMS ── */
function StatusPill({ status }: { status: string }) {
  const map: any = {
    paid: { c: P.green, l: "Paid" },
    refunded: { c: P.blue, l: "Refunded" },
    pending: { c: P.amberDark, l: "Pending" },
    failed: { c: P.red, l: "Failed" }
  };
  const m = map[status] || map.pending;
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: `${m.c}15` }}>
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: m.c }} />
      <span className="text-[11px] font-bold tracking-wide uppercase" style={{ color: m.c }}>{m.l}</span>
    </div>
  );
}

function fmt(n: number) {
  const abs = Math.abs(n);
  return `${n < 0 ? "− " : ""}₹${abs.toLocaleString("en-IN")}`;
}

/* ════════════════════
   MODALS
════════════════════ */
function Modal({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[400px] overflow-hidden" 
        onClick={e => e.stopPropagation()}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: P.border }}>
          <h3 className="text-[16px] font-bold m-0" style={{ color: P.text }}>{title}</h3>
          <button className="text-gray-400 hover:text-gray-700 p-1" onClick={onClose}>
            <Svg d={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>} s={16} />
          </button>
        </div>
        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════
   TRANSACTION DETAIL
════════════════════ */
function TxnDetail({ txn, onBack }: { txn: any, onBack: () => void }) {
  const isRefund = txn.status === "refunded";
  
  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      <div className="px-5 md:px-8 py-4 border-b flex items-center justify-between bg-white shrink-0" style={{ borderColor: P.borderSoft }}>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 border hover:bg-gray-100 transition-colors"
            style={{ borderColor: P.border, color: P.mid }}>
            <Svg d={D.back} s={14} />
          </button>
          <div className="min-w-0">
            <h2 className="text-[16px] md:text-[18px] font-season leading-none m-0" style={{ color: P.text }}>Transaction Detail</h2>
            <p className="text-[11.5px] font-medium m-0 mt-1" style={{ color: P.muted }}>{txn.invoiceNo} · {txn.date}</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6" style={{ background: P.bg }}>
        <div className="max-w-[900px] mx-auto grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5 items-start">

          {/* LEFT */}
          <div className="flex flex-col gap-4">

            {/* main card */}
            <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm border" style={{ borderColor: P.border }}>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${txn.subColor}15`, border: `1px solid ${txn.subColor}30` }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: txn.subColor }} />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-wider mb-1" style={{ color: P.muted }}>{txn.type}</p>
                    <h2 className="text-[18px] md:text-[20px] font-bold m-0 leading-snug" style={{ color: P.text, letterSpacing: "-0.01em" }}>{txn.desc}</h2>
                    {txn.teacher && <p className="text-[13px] font-medium mt-1 m-0" style={{ color: P.mid }}>{txn.teacher}</p>}
                  </div>
                </div>
                <div className="md:text-right flex md:flex-col items-center md:items-end justify-between md:justify-start gap-2">
                  <p className="text-[24px] md:text-[28px] font-bold m-0 tracking-tight" style={{ color: isRefund ? P.blue : P.text }}>{fmt(txn.amount)}</p>
                  <StatusPill status={txn.status} />
                </div>
              </div>

              {/* session meta */}
              {txn.sessionDate && (
                <div className="grid grid-cols-2 gap-4 py-4 border-y mb-5" style={{ borderColor: P.borderSoft }}>
                  <div>
                    <p className="text-[12px] font-medium mb-1 m-0" style={{ color: P.muted }}>Session date</p>
                    <p className="text-[14px] font-bold m-0" style={{ color: P.text }}>{txn.sessionDate}</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium mb-1 m-0" style={{ color: P.muted }}>Duration</p>
                    <p className="text-[14px] font-bold m-0" style={{ color: P.text }}>{txn.duration}</p>
                  </div>
                </div>
              )}

              {/* breakdown */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 rounded-full" style={{ background: P.amberDark }} />
                <p className="text-[14px] font-bold m-0" style={{ color: P.text }}>Price Breakdown</p>
              </div>
              <div className="flex flex-col mb-2">
                {txn.breakdown.map((b: any, i: number) => (
                  <div key={i} className="flex justify-between items-center py-2.5" style={{ borderBottom: i < txn.breakdown.length - 1 ? `1px solid ${P.borderSoft}` : "none" }}>
                    <span className="text-[13.5px] font-medium" style={{ color: P.mid }}>{b.label}</span>
                    <span className="text-[14px] font-bold" style={{ color: b.amount < 0 ? P.blue : P.text }}>{fmt(b.amount)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-4 border-t mt-2" style={{ borderColor: P.border }}>
                <span className="text-[15px] font-bold" style={{ color: P.text }}>Total charged</span>
                <span className="text-[20px] font-bold tracking-tight" style={{ color: isRefund ? P.blue : P.text }}>{fmt(txn.amount)}</span>
              </div>
            </div>

            {/* payment info */}
            <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm border" style={{ borderColor: P.border }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 rounded-full" style={{ background: P.amberDark }} />
                <p className="text-[14px] font-bold m-0" style={{ color: P.text }}>Payment Details</p>
              </div>
              <div className="flex flex-col">
                {[
                  { l: "Transaction ID", v: txn.id },
                  { l: "Invoice number", v: txn.invoiceNo },
                  { l: "Payment method", v: txn.method },
                  { l: "Date & time", v: `${txn.date} · 10:32 AM IST` },
                  { l: "Status", v: txn.status, status: true },
                ].map((x, i, arr) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2.5 gap-1 sm:gap-0" style={{ borderBottom: i < arr.length - 1 ? `1px solid ${P.borderSoft}` : "none" }}>
                    <span className="text-[13px] font-medium" style={{ color: P.muted }}>{x.l}</span>
                    {x.status
                      ? <div><StatusPill status={txn.status} /></div>
                      : <span className="text-[13px] font-bold" style={{ color: P.text }}>{x.v}</span>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-4">
            {/* download invoice */}
            <div className="bg-white rounded-xl p-5 shadow-sm border" style={{ borderColor: P.border }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 rounded-full" style={{ background: P.amberDark }} />
                <p className="text-[14px] font-bold m-0" style={{ color: P.text }}>Invoice</p>
              </div>
              <div className="bg-gray-50 border rounded-lg p-3 flex items-center gap-3 mb-4" style={{ borderColor: P.border }}>
                <div className="w-10 h-10 rounded-lg bg-white border flex items-center justify-center shrink-0 shadow-sm" style={{ borderColor: P.border, color: P.blue }}>
                  <Svg d={D.asn || D.info} s={16} />
                </div>
                <div className="min-w-0 pr-2">
                  <p className="text-[13px] font-bold truncate m-0 mb-0.5" style={{ color: P.text }}>{txn.invoiceNo}.pdf</p>
                  <p className="text-[11px] font-medium m-0 truncate" style={{ color: P.muted }}>Tax invoice · {txn.date}</p>
                </div>
              </div>
              <button onClick={() => {
                const url = URL.createObjectURL(new Blob([`Invoice data for ${txn.invoiceNo}`]));
                const a = document.createElement('a');
                a.href = url;
                a.download = `${txn.invoiceNo}.pdf`;
                a.click();
              }} className="w-full py-2.5 rounded-lg font-bold text-[13px] text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 active:scale-[0.98]"
                style={{ background: P.blue }}>
                <Svg d={D.dl} s={14} /> Download Invoice
              </button>
            </div>

            {/* refund eligibility */}
            {!isRefund && (
              <div className="bg-white rounded-xl p-5 shadow-sm border" style={{ borderColor: P.border }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 rounded-full" style={{ background: P.amberDark }} />
                  <p className="text-[14px] font-bold m-0" style={{ color: P.text }}>Refund Policy</p>
                </div>
                <p className="text-[13px] leading-relaxed mb-4 m-0" style={{ color: P.mid }}>
                  Sessions cancelled more than 6 hours in advance are eligible for a full refund. This session is <strong style={{ color: P.text }}>not eligible</strong> as it has already been completed.
                </p>
                <button className="w-full py-2 rounded-full font-bold text-[13px] border transition-colors hover:bg-gray-50 active:scale-[0.98]"
                  style={{ borderColor: P.border, color: P.mid }}>
                  Raise a Dispute
                </button>
              </div>
            )}

            {isRefund && (
              <div className="bg-white rounded-xl p-5 shadow-sm border" style={{ borderColor: P.border }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 rounded-full" style={{ background: P.blue }} />
                  <p className="text-[14px] font-bold m-0" style={{ color: P.text }}>Refund Info</p>
                </div>
                <p className="text-[13px] leading-relaxed m-0" style={{ color: P.mid }}>
                  Refund of <strong style={{ color: P.blue }}>₹799</strong> was processed to your Visa ••4242 within 5–7 business days of the cancellation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════
   MAIN PAYMENTS PAGE
════════════════════ */
function PaymentsDashboard({ onOpen }: { onOpen: (t: any) => void }) {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  
  // Modal states
  const [managePlanOpen, setManagePlanOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');

  const [addMethodOpen, setAddMethodOpen] = useState(false);
  const [paymentTab, setPaymentTab] = useState<'card' | 'upi'>('card');
  const [cardDetails, setCardDetails] = useState({ num: '', exp: '', cvv: '', name: '' });
  const [upiId, setUpiId] = useState('');
  
  const [cancelOpen, setCancelOpen] = useState(false);

  // Stateful payment methods array
  const [paymentMethods, setPaymentMethods] = useState(PAYMENT_METHODS);

  const handleAddPaymentMethod = () => {
    if (paymentTab === 'card') {
      if (!cardDetails.num) return; // minimal validation
      const last4 = cardDetails.num.slice(-4) || '1234';
      const newMethod = { id: `pm${Date.now()}`, type: 'card', brand: 'Visa', last4, expiry: cardDetails.exp || '12/28', primary: false };
      setPaymentMethods([newMethod, ...paymentMethods]);
    } else {
      if (!upiId) return;
      const newMethod = { id: `pm${Date.now()}`, type: 'upi', handle: upiId, primary: false };
      setPaymentMethods([newMethod, ...paymentMethods]);
    }
    setAddMethodOpen(false);
    setCardDetails({ num: '', exp: '', cvv: '', name: '' });
    setUpiId('');
  };

  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(m => m.id !== id));
  };
  const TABS = [{ id: "all", l: "All" }, { id: "session", l: "Sessions" }, { id: "subscription", l: "Subscriptions" }, { id: "refund", l: "Refunds" }];

  const filtered = TXNS.filter(t => {
    const mt = tab === "all" || t.type === tab;
    const ms = !search || t.desc.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    return mt && ms;
  });

  const totalThisMonth = TXNS.filter(t => t.date.includes("Mar 2026") && t.status === "paid").reduce((s, t) => s + t.amount, 0);
  const totalAll = TXNS.filter(t => t.status === "paid").reduce((s, t) => s + t.amount, 0);
  const sessionCount = TXNS.filter(t => t.type === "session" && t.status === "paid").length;
  const totalSpend = SPEND_BY_SUBJECT.reduce((s, x) => s + x.amount, 0);

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6" style={{ background: P.bg }}>
        
        {/* STATS - Unified Master Card (Matching StatsCards.tsx) */}
        <div className="bg-white w-full font-matter mb-6" 
          style={{ 
            minHeight: '98px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '18px 24px', 
            border: '1px solid #E5E7EB',
            borderRadius: '16px'
          }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#F3F4F6] w-full gap-4 sm:gap-0">
            {[
              { 
                n: `₹${totalThisMonth.toLocaleString("en-IN")}`, 
                l: "Spent this month", 
                trend: "Mar 2026", 
                badgeBg: "#EFF6FF", badgeColor: "#2563EB", 
                iconBg: "transparent", iconColor: "#111827",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H216V80H40ZM216,200H40V96H216V200Zm-40.05-61A28,28,0,1,1,160.05,111,28,28,0,0,1,175.95,139ZM132,156a12,12,0,1,1-12-12A12,12,0,0,1,132,156Z"/></svg>
              },
              { 
                n: `₹${totalAll.toLocaleString("en-IN")}`, 
                l: "Total spent (all time)", 
                trend: `${TXNS.filter(t => t.status === "paid").length} txns`, 
                badgeBg: "#FFFBEB", badgeColor: "#D97706",
                iconBg: "#FFF7ED", iconColor: "#C2410C",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,40,40,0,0,1-40-40,8,8,0,0,1,16,0,24,24,0,0,0,24,24,8,8,0,0,1,8,8Zm-24-32a24,24,0,0,1-24-24,8,8,0,0,1,16,0,8,8,0,0,0,8,8,24,24,0,0,1,24,24A8,8,0,0,1,120,144ZM128,64a8,8,0,0,0-8,8v16a8,8,0,0,0,16,0V72A8,8,0,0,0,128,64Z"/></svg>
              },
              { 
                n: sessionCount.toString(), 
                l: "Sessions paid", 
                trend: "Across 3 subjects", 
                badgeBg: "#F3F4F6", badgeColor: "#6B7280",
                iconBg: "transparent", iconColor: "#111827",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm45.66-101.66a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,164.69l50.34-50.35A8,8,0,0,1,173.66,114.34Z"/></svg>
              },
              { 
                n: "₹799", 
                l: "Last refund", 
                trend: "Feb 14, 2026", 
                badgeBg: "#F3F4F6", badgeColor: "#6B7280",
                iconBg: "transparent", iconColor: "#111827",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H59.31l18.35,18.34a8,8,0,0,1-11.32,11.32l-32-32a8,8,0,0,1,0-11.32l32-32a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"/></svg>
              },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3.5 px-0 sm:px-6 py-2 sm:py-0">
                <div 
                  className="rounded-2xl flex items-center justify-center shrink-0"
                  style={{ width: '46px', height: '46px', background: stat.iconBg, color: stat.iconColor }}
                >
                  {stat.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[#6B7280]" style={{ fontSize: '13px', lineHeight: '1' }}>{stat.l}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[#111827] font-medium" style={{ fontSize: '21px', lineHeight: '1' }}>{stat.n}</span>
                    <span 
                      className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                      style={{ color: stat.badgeColor, backgroundColor: stat.badgeBg }}
                    >
                      {stat.trend}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5 items-start">

          {/* LEFT: plan + transactions */}
          <div className="flex flex-col gap-5 min-w-0">

            {/* ACTIVE PLAN */}
            <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm border" style={{ borderColor: P.border }}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-6 rounded-full" style={{ background: P.amberDark }} />
                  <div>
                    <h3 className="text-[16px] font-bold m-0 leading-tight" style={{ color: P.text }}>Active Plan</h3>
                    <p className="text-[12px] font-medium m-0 mt-0.5" style={{ color: P.muted }}>Renews {PLAN.nextBilling}</p>
                  </div>
                </div>
                <button onClick={() => setManagePlanOpen(true)} className="px-4 py-2 rounded-lg font-bold text-[12.5px] border hover:bg-gray-50 transition-colors"
                  style={{ borderColor: P.border, color: P.mid }}>Manage Plan</button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-1.5 mb-1.5">
                    <span className="text-[28px] font-black tracking-tight" style={{ color: P.blue }}>₹{PLAN.price.toLocaleString("en-IN")}</span>
                    <span className="text-[14px] font-bold" style={{ color: P.muted }}>/ month</span>
                  </div>
                  <p className="text-[16px] font-bold m-0 mb-3" style={{ color: P.text }}>{PLAN.name}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {PLAN.features.map(f => (
                      <div key={f} className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: P.amberDark }} />
                        <span className="text-[13px] font-medium" style={{ color: P.mid }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                  <span className="text-[12px] font-bold uppercase tracking-wider px-3 py-1 rounded-full" 
                        style={{ color: P.blue, background: P.blueSub }}>Active</span>
                  <p className="text-[12px] font-medium m-0" style={{ color: P.muted }}>Member since {PLAN.since}</p>
                </div>
              </div>
            </div>

            {/* TRANSACTION HISTORY */}
            <div>
              {/* controls */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
                <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0 custom-scrollbar">
                  {TABS.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} 
                      className="px-4 py-2 rounded-full font-bold text-[13px] border shrink-0 transition-colors"
                      style={{ 
                        borderColor: tab === t.id ? P.blue : P.border, 
                        background: tab === t.id ? P.blue : "white", 
                        color: tab === t.id ? "white" : P.mid
                      }}>
                      {t.l}
                    </button>
                  ))}
                </div>
                <div className="relative shrink-0">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Svg d={D.srch} s={15} />
                  </span>
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search transactions…"
                    className="w-full md:w-[240px] pl-9 pr-3 py-2 rounded-lg border outline-none text-[13.5px] font-medium focus:border-blue-500 transition-colors"
                    style={{ borderColor: P.border, background: "white", color: P.text }} />
                </div>
              </div>

              {/* table */}
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ borderColor: P.border }}>
                <div className="hidden lg:grid grid-cols-[3fr_120px_90px_90px_90px] px-5 py-3 border-b bg-gray-50" style={{ borderColor: P.borderSoft }}>
                  {["Description", "Date", "Amount", "Status", ""].map((h, i) => (
                    <p key={i} className="text-[11px] font-bold uppercase tracking-wider m-0" style={{ color: P.muted }}>{h}</p>
                  ))}
                </div>
                
                <div className="flex flex-col">
                  {filtered.map((t, idx) => (
                    <div key={t.id} onClick={() => onOpen(t)}
                      className="grid grid-cols-1 lg:grid-cols-[3fr_120px_90px_90px_90px] gap-3 lg:gap-0 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      style={{ borderBottom: idx < filtered.length - 1 ? `1px solid ${P.borderSoft}` : "none" }}>
                      
                      {/* desc */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-2 h-2 rounded-full shrink-0 hidden lg:block" style={{ background: t.subColor }} />
                        <div className="min-w-0">
                          <p className="text-[14px] font-bold m-0 truncate" style={{ color: P.text }}>{t.desc}</p>
                          <p className="text-[12px] font-medium m-0 mt-0.5 truncate" style={{ color: P.muted }}>{t.type === "session" ? t.teacher : t.subject}</p>
                        </div>
                      </div>
                      
                      {/* Mobile layout helpers */}
                      <div className="flex items-center justify-between lg:contents">
                        <div className="flex lg:contents items-center gap-3">
                          <p className="text-[13px] font-medium m-0" style={{ color: P.mid }}>{t.dateShort}</p>
                          <p className="text-[14px] font-bold m-0 lg:block hidden" style={{ color: t.amount < 0 ? P.blue : P.text }}>{fmt(t.amount)}</p>
                        </div>
                        <div className="flex lg:contents items-center gap-3">
                           <p className="text-[15px] font-bold m-0 lg:hidden" style={{ color: t.amount < 0 ? P.blue : P.text }}>{fmt(t.amount)}</p>
                           <StatusPill status={t.status} />
                        </div>
                      </div>
                      
                      {/* cta */}
                      <div className="hidden lg:flex items-center justify-end">
                        <button onClick={e => { e.stopPropagation(); onOpen(t); }} 
                          className="px-3 py-1.5 rounded-md text-[12px] font-bold border transition-colors hover:bg-gray-100"
                          style={{ borderColor: P.borderSoft, color: P.mid }}>View</button>
                      </div>
                    </div>
                  ))}
                  {filtered.length === 0 && (
                    <div className="p-10 text-center font-medium" style={{ color: P.muted }}>
                      <p className="text-[14px] m-0">No transactions match your filter.</p>
                      <button onClick={() => {setSearch(""); setTab("all")}} className="mt-2 text-[13px] font-bold underline" style={{ color: P.blue }}>Clear filters</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex flex-col gap-5">

            {/* spend by subject */}
            <div className="bg-white rounded-xl p-5 shadow-sm border" style={{ borderColor: P.border }}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-4 rounded-full" style={{ background: P.amberDark }} />
                <p className="text-[14px] font-bold m-0" style={{ color: P.text }}>Spend by Subject</p>
              </div>

              {/* mini bar chart */}
              <div className="flex flex-col gap-4">
                {SPEND_BY_SUBJECT.map((s, i) => (
                  <div key={s.subject}>
                    <div className="flex justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
                        <span className="text-[13px] font-bold" style={{ color: P.text }}>{s.subject}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-[12px] font-medium" style={{ color: P.muted }}>{s.sessions} sessions</span>
                        <span className="text-[13px] font-bold" style={{ color: P.text }}>₹{s.amount.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" 
                           style={{ width: `${Math.round((s.amount / totalSpend) * 100)}%`, background: s.color }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t flex justify-between items-center" style={{ borderColor: P.borderSoft }}>
                <span className="text-[13px] font-bold" style={{ color: P.muted }}>Total sessions</span>
                <span className="text-[15px] font-black tracking-tight" style={{ color: P.text }}>₹{totalSpend.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* payment methods */}
            <div className="bg-white rounded-xl p-5 shadow-sm border" style={{ borderColor: P.border }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 rounded-full" style={{ background: P.blue }} />
                  <p className="text-[14px] font-bold m-0" style={{ color: P.text }}>Payment Methods</p>
                </div>
                <button onClick={() => setAddMethodOpen(true)} className="flex items-center gap-1 text-[13px] font-bold bg-transparent border-none cursor-pointer p-0 hover:opacity-80 transition-opacity"
                  style={{ color: P.blue }}>
                  <Svg d={D.plus} s={13} /> Add
                </button>
              </div>
              <div className="flex flex-col">
                {paymentMethods.map((m: any, i: number) => (
                  <div key={m.id} className="flex items-center gap-3 py-3" style={{ borderBottom: i < paymentMethods.length - 1 ? `1px solid ${P.borderSoft}` : "none" }}>
                    <div className="w-10 h-7 rounded bg-gray-50 border flex items-center justify-center shrink-0" style={{ borderColor: P.borderSoft }}>
                      <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: P.blue }}>{m.type === "card" ? m.brand : "UPI"}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13.5px] font-bold m-0 truncate" style={{ color: P.text }}>
                        {m.type === "card" ? `•••• •••• •••• ${m.last4}` : m.handle}
                      </p>
                      <p className="text-[11.5px] font-medium m-0" style={{ color: P.muted }}>
                        {m.type === "card" ? `Expires ${m.expiry}` : "UPI ID"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {m.primary && <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-md">Primary</span>}
                      {!m.primary && (
                        <button 
                          onClick={() => handleRemovePaymentMethod(m.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          title="Remove payment method">
                          <Svg d={D.close} s={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* next billing */}
            <div className="bg-white rounded-xl p-5 shadow-sm border" style={{ borderColor: P.border }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 rounded-full" style={{ background: P.amberDark }} />
                <p className="text-[14px] font-bold m-0" style={{ color: P.text }}>Next Billing</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[14px] font-bold" style={{ color: P.mid }}>{PLAN.name}</span>
                <span className="text-[16px] font-black" style={{ color: P.text }}>₹{PLAN.price.toLocaleString("en-IN")}</span>
              </div>
              <p className="text-[13px] leading-relaxed mb-5 m-0" style={{ color: P.muted }}>
                Auto-debit on <strong style={{ color: P.text }}>{PLAN.nextBilling}</strong> via Visa ••4242
              </p>
              <button 
                onClick={() => setCancelOpen(true)}
                className="w-full py-2.5 rounded-lg text-[13px] font-bold border transition-colors text-red-600 border-red-200 bg-red-50 hover:bg-red-100">
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <Modal isOpen={managePlanOpen} onClose={() => setManagePlanOpen(false)} title="Manage Subscription">
        <p className="text-[13.5px] text-gray-600 mb-4 leading-relaxed">You are currently on the <strong className="text-gray-900">{PLAN.name}</strong>. If you wish to upgrade to an annual plan for a 20% discount, please select below.</p>
        <div className="flex flex-col gap-3">
          <div 
            onClick={() => setSelectedPlan('monthly')}
            className={`border-2 p-3 rounded-lg cursor-pointer transition-colors ${selectedPlan === 'monthly' ? 'border-[#2C3C69] bg-[#EDF0F7]' : 'border-gray-200 hover:border-gray-300'}`}>
            <div className="flex justify-between items-center mb-1">
              <span className={`font-bold text-[14px] ${selectedPlan === 'monthly' ? 'text-[#2C3C69]' : 'text-gray-800'}`}>Monthly Plan</span>
              <span className={`font-bold text-[14px] ${selectedPlan === 'monthly' ? 'text-[#2C3C69]' : 'text-gray-800'}`}>₹2,999/mo</span>
            </div>
            <p className="text-[12px] text-gray-500 m-0">Current active plan</p>
          </div>
          <div 
            onClick={() => setSelectedPlan('annual')}
            className={`border-2 p-3 rounded-lg cursor-pointer transition-colors ${selectedPlan === 'annual' ? 'border-[#2C3C69] bg-[#EDF0F7]' : 'border-gray-200 hover:border-gray-300'}`}>
            <div className="flex justify-between items-center mb-1">
              <span className={`font-bold text-[14px] ${selectedPlan === 'annual' ? 'text-[#2C3C69]' : 'text-gray-800'}`}>Annual Plan</span>
              <span className={`font-bold text-[14px] ${selectedPlan === 'annual' ? 'text-[#2C3C69]' : 'text-gray-800'}`}>₹28,790/yr</span>
            </div>
            <p className="text-[12px] text-green-600 font-medium m-0">Save 20% compared to monthly</p>
          </div>
        </div>
        <button 
          onClick={() => {
            // Dummy save logic
            setManagePlanOpen(false);
          }}
          disabled={selectedPlan === 'monthly'}
          className={`w-full mt-5 py-2.5 rounded-lg font-bold text-[13px] transition-all ${
            selectedPlan === 'monthly' 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-[#2C3C69] text-white hover:opacity-90 active:scale-[0.98]'
          }`}>
          Switch to Annual Plan
        </button>
      </Modal>

      <Modal isOpen={addMethodOpen} onClose={() => { setAddMethodOpen(false); setPaymentTab('card'); setUpiId(''); setCardDetails({ num: '', exp: '', cvv: '', name: '' }); }} title="Add Payment Method">
        <div className="flex gap-2 mb-4">
          <button 
            onClick={() => setPaymentTab('card')}
            className={`flex-1 py-1.5 border-b-2 font-bold text-[13px] transition-colors ${paymentTab === 'card' ? 'border-[#2C3C69] text-[#2C3C69]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            Credit / Debit Card
          </button>
          <button 
            onClick={() => setPaymentTab('upi')}
            className={`flex-1 py-1.5 border-b-2 font-bold text-[13px] transition-colors ${paymentTab === 'upi' ? 'border-[#2C3C69] text-[#2C3C69]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            UPI
          </button>
        </div>

        {paymentTab === 'card' ? (
          <>
            <input 
              value={cardDetails.num}
              onChange={e => setCardDetails({...cardDetails, num: e.target.value})}
              placeholder="Card Number" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-[13.5px] mb-3 outline-none focus:border-[#2C3C69]" 
            />
            <div className="flex gap-3 mb-3">
              <input 
                value={cardDetails.exp}
                onChange={e => setCardDetails({...cardDetails, exp: e.target.value})}
                placeholder="MM/YY" 
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2.5 text-[13.5px] outline-none focus:border-[#2C3C69]" 
              />
              <input 
                value={cardDetails.cvv}
                onChange={e => setCardDetails({...cardDetails, cvv: e.target.value})}
                placeholder="CVV" 
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2.5 text-[13.5px] outline-none focus:border-[#2C3C69]" 
                type="password" 
              />
            </div>
            <input 
              value={cardDetails.name}
              onChange={e => setCardDetails({...cardDetails, name: e.target.value})}
              placeholder="Cardholder Name" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-[13.5px] mb-5 outline-none focus:border-[#2C3C69]" 
            />
          </>
        ) : (
          <>
            <input 
              value={upiId}
              onChange={e => setUpiId(e.target.value)}
              placeholder="Enter UPI ID (e.g. name@okaxis)" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-[13.5px] mb-5 outline-none focus:border-[#2C3C69]" 
            />
          </>
        )}

        <div className="flex gap-3 mt-2">
          <button 
            onClick={() => setAddMethodOpen(false)}
            className="flex-1 py-2.5 rounded-full border border-gray-300 text-gray-700 font-bold text-[13px] hover:bg-gray-50 transition-all">
            Cancel
          </button>
          <button 
            onClick={handleAddPaymentMethod}
            className="flex-1 py-2.5 rounded-full bg-[#2C3C69] text-white font-bold text-[13px] hover:opacity-90 active:scale-[0.98] transition-all">
            {paymentTab === 'card' ? 'Save Card' : 'Verify & Save'}
          </button>
        </div>
      </Modal>

      <Modal isOpen={cancelOpen} onClose={() => setCancelOpen(false)} title="Cancel Subscription">
        <div className="bg-red-50 text-red-800 p-3 rounded-lg text-[13px] mb-4 border border-red-100">
          <p className="font-bold mb-1 m-0">Warning</p>
          <p className="m-0">Your access to 1-on-1 tutoring sessions will end immediately at the end of your current billing cycle on <strong>{PLAN.nextBilling}</strong>.</p>
        </div>
        <p className="text-[13.5px] font-medium text-gray-700 mb-2">Please tell us why you are cancelling:</p>
        <select className="w-full border border-gray-300 rounded-lg p-2.5 text-[13px] mb-6 outline-none bg-white">
          <option>It's too expensive</option>
          <option>I don't need tutoring anymore</option>
          <option>I'm not happy with the tutors</option>
          <option>Other reasons</option>
        </select>
        <div className="flex gap-3">
          <button onClick={() => setCancelOpen(false)} className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-bold text-[13px]">
            Keep Subscription
          </button>
          <button onClick={() => setCancelOpen(false)} className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[13px]">
            Confirm Cancel
          </button>
        </div>
      </Modal>

    </div>
  );
}

/* ── ROOT ── */
export default function PaymentsRoot() {
  const [selected, setSelected] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex bg-white h-screen overflow-hidden font-matter text-[#0F1117]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setMobileSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full z-50 md:hidden">
            <Sidebar isOpen={true} setIsOpen={() => {}} />
          </div>
        </>
      )}

      {/* Main Container */}
      <main className="flex-1 h-screen overflow-y-auto min-w-0 bg-white">
        
        {/* Mobile toggle */}
        <div className="md:hidden fixed top-4 left-4 z-30">
          <button onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 bg-white rounded-lg shadow-sm border border-[#E5E7EB]">
            {mobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Global Header */}
        <div className="px-4 md:px-6 lg:px-8 py-4 md:py-6 mt-16 md:mt-0">
          <Header title="Payments" titleAccent="" titleSuffix="" subtitle="Transactions, invoices & subscriptions" hideRightTools={true} />
        </div>

        {selected
          ? <TxnDetail txn={selected} onBack={() => setSelected(null)} />
          : <PaymentsDashboard onOpen={t => setSelected(t)} />
        }
      </main>
    </div>
  );
}
