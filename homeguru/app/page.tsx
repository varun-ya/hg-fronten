"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Chalkboard, ArrowRight, SignIn, Eye, EyeSlash, X } from "@phosphor-icons/react";
import OwlAnimation from "@/components/animations/OwlAnimation";

export default function Home() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [role, setRole] = useState<"student" | "tutor" | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginRole, setLoginRole] = useState<"student" | "tutor">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    const onboarded = localStorage.getItem("onboarding_complete");
    if (onboarded) {
      const role = localStorage.getItem("user_role");
      window.location.href = role === "tutor" ? "/teacher" : "/student";
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) return null;

  const handleContinue = () => {
    if (role) {
      localStorage.setItem("user_role", role);
      if (role === "student") router.push("/onboarding");
      else if (role === "tutor") router.push("/tutor-onboarding");
    }
  };

  const handleLogin = () => {
    // Fake credentials for quick login
    const validCredentials = [
      { email: 'student@test.com', password: '123456', role: 'student' },
      { email: 'teacher@test.com', password: '123456', role: 'tutor' },
    ];

    const credential = validCredentials.find(
      c => c.email === email.trim().toLowerCase() && c.password === password && c.role === loginRole
    );

    if (credential) {
      localStorage.setItem("user_role", credential.role);
      localStorage.setItem("userEmail", credential.email);
      localStorage.setItem("onboarding_complete", "true");
      if (credential.role === 'tutor') {
        localStorage.setItem("admin_onboarding_complete", "true");
      }
      window.location.href = credential.role === 'tutor' ? "/teacher" : "/student";
      return;
    }

    // Fallback: accept any valid email/password format
    const emailValid = /^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email.trim());
    if (emailValid && password.length >= 6) {
      localStorage.setItem("user_role", loginRole);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("onboarding_complete", "true");
      if (loginRole === 'tutor') {
        localStorage.setItem("admin_onboarding_complete", "true");
      }
      window.location.href = loginRole === 'tutor' ? "/teacher" : "/student";
    }
  };

  const emailValid = /^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email.trim());
  const canLogin = emailValid && password.length >= 6;

  return (
    <div className="h-screen bg-gradient-to-br from-[#FAFAFA] via-white to-[#FFF7ED] flex flex-col overflow-hidden relative">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        .fade-in { animation: fadeIn 0.4s ease-out both; }
        .slide-up { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .float { animation: float 4s ease-in-out infinite; }
      `}</style>

      {/* Subtle Background Accent */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#F97316]/5 blur-[120px]" />
      </div>

      {/* Header with Login Button */}
      <div className="w-full flex items-center justify-between px-8 md:px-16 py-6 border-b border-[#F0F0F0]/60 bg-white/70 backdrop-blur-md shrink-0 relative z-10">
        <img src="/images/homeguru.png" alt="HomeGuru" className="h-[34px] md:h-[38px] w-auto object-contain" />
        <button type="button" onClick={() => setShowLogin(true)}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#E2E8F0] bg-white font-matter text-[14px] font-medium text-[#0F172A] hover:border-[#CBD5E1] hover:bg-[#F8FAFC] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md">
          <SignIn size={18} weight="regular" />
          Login
        </button>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center px-8 py-2 relative z-10">
        <div className="w-full max-w-[1200px] grid md:grid-cols-2 gap-20 items-center relative -mt-16">
          
          {/* Vertical Divider Line */}
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[70%] bg-gradient-to-b from-transparent via-[#E2E8F0] to-transparent" />
          
          {/* Left Side - Minimal & Elegant */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-4 opacity-90">
              <OwlAnimation />
            </div>
            
            {/* Decorative Line Above */}
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#F97316] to-transparent mb-4" />
            
            <h1 className="font-season text-[40px] md:text-[48px] text-[#0F172A] leading-[1.1] tracking-[-0.03em]">
              Welcome to<br />
              <span className="text-[#F97316]">HomeGuru</span>
            </h1>
            
            {/* Decorative Line Below */}
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#F97316] to-transparent mt-4" />
            
            <p className="font-matter text-[15px] text-[#64748B] leading-[1.7] mt-4 max-w-[400px]">
              Personalized learning and teaching platform for students and tutors.
            </p>
          </div>

          {/* Right Side - Clean Role Selection */}
          <div className="flex flex-col">
            <div className="mb-6">
              <p className="font-matter text-[11px] font-semibold text-[#F97316] uppercase tracking-[0.15em] mb-3">Get Started</p>
              <h2 className="font-season text-[32px] text-[#0F172A] leading-[1.2] tracking-[-0.02em]">
                Choose Your Role
              </h2>
            </div>

            <div className="flex gap-4 mb-6">
              {(["student", "tutor"] as const).map((r) => {
                const isSelected = role === r;
                return (
                  <button key={r} type="button" onClick={() => setRole(r)}
                    className={`relative flex-1 py-8 rounded-[20px] font-matter text-[15px] font-medium cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
                      isSelected 
                        ? 'bg-white text-[#0F172A] shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-[#E2E8F0]' 
                        : 'bg-[#F8FAFC] text-[#94A3B8] hover:bg-white hover:shadow-sm'
                    }`}>
                    <span className={`transition-colors ${isSelected ? 'text-[#F97316]' : 'text-[#CBD5E1]'}`}>
                      {r === "student" ? <GraduationCap size={32} weight={isSelected ? "fill" : "regular"} /> : <Chalkboard size={32} weight={isSelected ? "fill" : "regular"} />}
                    </span>
                    <span>{r === "student" ? "Student" : "Tutor"}</span>
                  </button>
                );
              })}
            </div>

            <button type="button" onClick={handleContinue} disabled={!role}
              className={`font-matter font-medium text-[15px] py-4 w-full rounded-full flex items-center justify-center gap-2 transition-all ${
                role 
                  ? "bg-[#0F172A] text-white hover:bg-[#1E293B] cursor-pointer" 
                  : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
              }`}>
              Continue <ArrowRight size={16} weight="bold" />
            </button>

            <p className="font-matter text-[13px] text-[#64748B] text-center mt-4">
              Already have an account? <button type="button" onClick={() => setShowLogin(true)} className="text-[#0F172A] font-medium hover:text-[#F97316] transition-colors cursor-pointer">Login</button>
            </p>
          </div>

        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-md flex items-center justify-center z-50 fade-in" onClick={() => setShowLogin(false)}>
          <div className="bg-white rounded-[28px] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)] w-full max-w-[440px] mx-5 slide-up border border-[#F1F5F9]" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-8 pb-6">
              <div>
                <h2 className="font-season text-[26px] text-[#0F172A] leading-[1.2] tracking-[-0.02em]">Welcome back</h2>
                <p className="font-matter text-[14px] text-[#64748B] mt-1.5 font-light">Login to continue your journey</p>
              </div>
              <button type="button" onClick={() => setShowLogin(false)}
                className="w-9 h-9 rounded-full bg-transparent flex items-center justify-center text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors cursor-pointer -mt-4 -mr-2">
                <X size={18} weight="regular" />
              </button>
            </div>

            {/* Content */}
            <div className="px-8 pb-8">
              {/* Role Selector */}
              <div className="flex gap-2 p-1.5 bg-[#F8FAFC] rounded-[14px] mb-8 border border-[#E2E8F0]/50">
                {(["student", "tutor"] as const).map((r) => (
                  <button key={r} type="button" onClick={() => setLoginRole(r)}
                    className={`flex-1 py-2.5 rounded-[10px] font-matter text-[13px] font-medium transition-all duration-300 cursor-pointer ${
                      loginRole === r 
                        ? 'bg-white text-[#0F172A] shadow-sm ring-1 ring-[#E2E8F0]' 
                        : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]/50'
                    }`}>
                    {r === "student" ? "Student" : "Tutor"}
                  </button>
                ))}
              </div>

              {/* Quick Login Hint */}
              <div className="mb-5 p-3 rounded-[12px] bg-[#FFF7ED] border border-[#FFDDC1]">
                <p className="font-matter text-[11px] font-semibold text-[#F97316] mb-1">🚀 Quick Login (Demo)</p>
                <div className="font-matter text-[11px] text-[#666] space-y-0.5">
                  <p><strong>Student:</strong> student@test.com / 123456</p>
                  <p><strong>Teacher:</strong> teacher@test.com / 123456</p>
                </div>
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="font-matter text-[12px] font-medium text-[#64748B] mb-2.5 block tracking-wide">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" autoComplete="email"
                  className="w-full px-4 py-3.5 rounded-[14px] border border-transparent bg-[#F8FAFC] font-matter text-[14px] text-[#0F172A] placeholder-[#94A3B8] outline-none focus:bg-white focus:border-[#E2E8F0] focus:ring-4 focus:ring-[#F1F5F9] transition-all duration-300" />
                {email && !emailValid && <p className="font-matter text-[12px] text-[#EF4444] mt-2 ml-1">Please enter a valid email address</p>}
              </div>

              {/* Password */}
              <div className="mb-8">
                <label className="font-matter text-[12px] font-medium text-[#64748B] mb-2.5 block tracking-wide">Password</label>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 6 characters" autoComplete="current-password"
                    className="w-full px-4 py-3.5 pr-12 rounded-[14px] border border-transparent bg-[#F8FAFC] font-matter text-[14px] text-[#0F172A] placeholder-[#94A3B8] outline-none focus:bg-white focus:border-[#E2E8F0] focus:ring-4 focus:ring-[#F1F5F9] transition-all duration-300" />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] transition-colors cursor-pointer">
                    {showPw ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button type="button" onClick={handleLogin} disabled={!canLogin}
                className={`w-full py-4 rounded-full font-matter text-[15px] font-medium flex items-center justify-center gap-2.5 transition-all duration-300 ${
                  canLogin 
                    ? 'bg-[#0F172A] text-white hover:bg-[#1E293B] hover:shadow-[0_8px_20px_-6px_rgba(15,23,42,0.3)] hover:-translate-y-0.5 cursor-pointer' 
                    : 'bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed'
                }`}>
                Login securely <ArrowRight size={16} weight={canLogin ? "bold" : "regular"} />
              </button>

              <p className="font-matter text-[14px] text-[#64748B] text-center mt-6 font-light">
                Don&apos;t have an account? <button type="button" onClick={() => setShowLogin(false)} className="text-[#0F172A] font-medium hover:text-[#F97316] transition-colors cursor-pointer border-b border-transparent hover:border-[#F97316] pb-0.5 ml-1">Sign up</button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div> 
  );
}