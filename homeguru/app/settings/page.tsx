"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Menu, Shield, Bell, Lock, LogOut, Trash2, AlertTriangle } from "lucide-react";

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [email, setEmail] = useState("suman@email.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    learningProgress: true,
    tutorRecommendations: false,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handlePasswordUpdate = () => {
    if (password && password === confirmPassword) {
      setPasswordUpdated(true);
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordUpdated(false), 2000);
    }
  };

  const inputBase = "w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-[14px] text-[#111827] font-matter outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all bg-white placeholder-[#9CA3AF]";
  const labelBase = "block text-[11.5px] font-semibold text-[#6B7280] mb-1.5 font-matter uppercase tracking-wider";
  const sectionCard = "bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm";

  return (
    <div className="flex h-screen bg-white overflow-hidden font-matter text-[#111827]">
      <div className="hidden md:block shrink-0">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {mobileSidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setMobileSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full z-50 md:hidden">
            <Sidebar isOpen={true} setIsOpen={() => setMobileSidebarOpen(false)} />
          </div>
        </>
      )}

      <main className="flex-1 h-screen overflow-y-auto min-w-0">
        {!mobileSidebarOpen && (
          <div className="md:hidden fixed top-4 left-4 z-50">
            <button onClick={() => setMobileSidebarOpen(true)} className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-600" aria-label="Toggle menu">
              <Menu size={20} />
            </button>
          </div>
        )}

        <div className="px-4 md:px-6 lg:px-8 py-4 md:py-6 mt-14 md:mt-0">
          <Header title="Settings" titleAccent="" titleSuffix="" subtitle="Manage your account preferences and security settings." hideRightTools={true} />
        </div>

        <div className="px-4 md:px-6 lg:px-8 pb-12">
          <div className="max-w-3xl space-y-6">

            {/* Account Settings */}
            <div className={sectionCard}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] flex items-center justify-center"><Shield size={16} className="text-[#4F46E5]" /></div>
                <h2 className="text-[16px] font-semibold text-[#111827] font-season">Account Settings</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelBase}>Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputBase} />
                </div>
                <div>
                  <label className={labelBase}>Phone Number</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={inputBase} />
                </div>
              </div>
            </div>

            {/* Security */}
            <div className={sectionCard}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] flex items-center justify-center"><Lock size={16} className="text-[#D97706]" /></div>
                <h2 className="text-[16px] font-semibold text-[#111827] font-season">Security</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelBase}>New Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter new password" className={inputBase} />
                </div>
                <div>
                  <label className={labelBase}>Confirm New Password</label>
                  <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className={inputBase} />
                </div>
              </div>
              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-[12px] text-red-500 mt-2 font-matter">Passwords do not match.</p>
              )}
              <button onClick={handlePasswordUpdate} disabled={!password || password !== confirmPassword}
                className={`mt-4 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all font-matter ${
                  passwordUpdated ? "bg-green-50 text-green-700 border border-green-200"
                    : !password || password !== confirmPassword ? "bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed"
                    : "bg-[#111827] text-white hover:bg-[#1F2937]"
                }`}>
                {passwordUpdated ? "✓ Password Updated" : "Update Password"}
              </button>
            </div>

            {/* Notification Preferences */}
            <div className={sectionCard}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#DBEAFE] flex items-center justify-center"><Bell size={16} className="text-[#2563EB]" /></div>
                <h2 className="text-[16px] font-semibold text-[#111827] font-season">Notification Preferences</h2>
              </div>
              <div className="space-y-0 divide-y divide-[#F3F4F6]">
                {([
                  { key: "email" as const, label: "Email Notifications", description: "Receive important updates and announcements." },
                  { key: "learningProgress" as const, label: "Learning Progress Alerts", description: "Get reminders about your study progress." },
                  { key: "tutorRecommendations" as const, label: "Tutor Recommendations", description: "Receive AI-recommended tutors based on your learning needs." },
                ]).map(item => (
                  <div key={item.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                    <div className="min-w-0 flex-1 mr-4">
                      <p className="text-[14px] font-medium text-[#111827] font-matter">{item.label}</p>
                      <p className="text-[12.5px] text-[#9CA3AF] font-matter mt-0.5">{item.description}</p>
                    </div>
                    <button onClick={() => setNotifications(p => ({ ...p, [item.key]: !p[item.key] }))}
                      className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${notifications[item.key] ? "bg-[#4F46E5]" : "bg-[#D1D5DB]"}`}>
                      <div className={`absolute top-[2px] w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${notifications[item.key] ? "translate-x-[22px]" : "translate-x-[2px]"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Management */}
            <div className={`${sectionCard} border-red-100`}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#FEE2E2] flex items-center justify-center"><AlertTriangle size={16} className="text-[#DC2626]" /></div>
                <h2 className="text-[16px] font-semibold text-[#111827] font-season">Account Management</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 px-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
                  <div>
                    <p className="text-[14px] font-medium text-[#111827] font-matter">Log out from all devices</p>
                    <p className="text-[12.5px] text-[#9CA3AF] font-matter mt-0.5">This will sign you out from all active sessions.</p>
                  </div>
                  <button className="px-4 py-2 text-[13px] font-medium text-[#374151] border border-[#E5E7EB] rounded-lg hover:bg-white transition-colors flex items-center gap-2 shrink-0 font-matter">
                    <LogOut size={14} /> Log Out All
                  </button>
                </div>
                <div className="flex items-center justify-between py-3 px-4 bg-[#FEF2F2] rounded-xl border border-[#FECACA]">
                  <div>
                    <p className="text-[14px] font-medium text-[#991B1B] font-matter">Delete Account</p>
                    <p className="text-[12.5px] text-[#DC2626]/70 font-matter mt-0.5">Permanently delete your account and all data.</p>
                  </div>
                  <button onClick={() => setShowDeleteConfirm(true)} className="px-4 py-2 text-[13px] font-semibold text-white bg-[#DC2626] rounded-lg hover:bg-[#B91C1C] transition-colors flex items-center gap-2 shrink-0 font-matter">
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[420px] p-6 border border-[#E5E7EB]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#FEE2E2] flex items-center justify-center shrink-0">
                <AlertTriangle size={20} className="text-[#DC2626]" />
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-[#111827] font-season">Delete Account?</h3>
                <p className="text-[12.5px] text-[#6B7280] font-matter">This action cannot be undone.</p>
              </div>
            </div>
            <p className="text-[13.5px] text-[#374151] font-matter leading-relaxed mb-6">
              All your data including profile, learning history, session records, and progress will be permanently deleted. This action is irreversible.
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button onClick={() => setShowDeleteConfirm(false)} className="px-5 py-2.5 text-[13px] font-medium text-[#374151] border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors font-matter">Cancel</button>
              <button className="px-5 py-2.5 text-[13px] font-semibold text-white bg-[#DC2626] rounded-lg hover:bg-[#B91C1C] transition-colors font-matter">Yes, Delete My Account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
