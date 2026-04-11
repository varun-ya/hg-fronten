'use client';
import { useState, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingCredentials from '@/components/onboarding/OnboardingCredentials';
import OnboardingPage2 from '@/components/onboarding/OnboardingPage2';
import OnboardingPage3 from '@/components/onboarding/OnboardingPage3';
import OnboardingPage4 from '@/components/onboarding/OnboardingPage4';
import OnboardingPage5 from '@/components/onboarding/OnboardingPage5';
import OnboardingPage6 from '@/components/onboarding/OnboardingPage6';
import OnboardingProfile from '@/components/onboarding/OnboardingProfile';
import OnboardingBoard from '@/components/onboarding/OnboardingBoard';
import OnboardingAspirant from '@/components/onboarding/OnboardingAspirant';
import OnboardingCollege from '@/components/onboarding/OnboardingCollege';
import TypingBubble from '@/components/onboarding/TypingBubble';
import OwlAnimation from '@/components/animations/OwlAnimation';
import { ArrowLeft } from '@phosphor-icons/react';
import { STEPS } from '@/components/onboarding/stepData';

// Page layout:
// 0 = Credentials (email, phone+OTP, password)
// 1 = Where did you hear?
// 2 = Academic / Non-Academic
// 3 = Subject (dynamic based on page 2)
// 4 = How much do you know? OR Fun fact if "Others"
// 5 = Fun fact + mascot
// 6 = Profile (name, DOB, gender, category, location)
// 7 = Conditional:
//     - Student (cat 0) → Board + Class
//     - Aspirant (cat 1) → Exam picker
//     - College Student (cat 2) → Course + Branch + Year
//     - Others (cat 3,4,5) → no page 7, finish directly

const CARD_COLORS = [
  { bg: '#FAFAFA', accent: '#1E3162' },   // 0: Credentials
  { bg: '#F0F2FF', accent: '#6366F1' },   // 1: Where heard
  { bg: '#F3EEFF', accent: '#8B5CF6' },   // 2: Academic/Non
  { bg: '#FFF5EB', accent: '#F97316' },   // 3: Subject
  { bg: '#EEFBF3', accent: '#22C55E' },   // 4: Knowledge
  { bg: '#FFFBEB', accent: '#F59E0B' },   // 5: Fun fact
  { bg: '#FFF0F6', accent: '#EC4899' },   // 6: Profile
  { bg: '#EEFBF3', accent: '#22C55E' },   // 7: Board
];

export default function OnboardingPage() {
  const router = useRouter();
  const [page, setPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('onboarding_page');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const animKey = useRef(0);

  // Selections (mirrors mobile's Map<int, int> _sel)
  const [sel, setSel] = useState<Record<number, number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('onboarding_sel');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });
  const [interest, setInterest] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('onboarding_interest') || '';
    }
    return '';
  });
  const [subject, setSubject] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('onboarding_subject') || '';
    }
    return '';
  });
  const [profileCategory, setProfileCategory] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('onboarding_category');
      return saved ? parseInt(saved, 10) : null;
    }
    return null;
  });

  // Page 7 needed for Student (0), Aspirant (1), College Student (2)
  const needsPage7 = profileCategory === 0 || profileCategory === 1 || profileCategory === 2;
  const totalPages = needsPage7 ? 8 : 7;
  const inOnboarding = true;

  // "Others" logic (matches mobile)
  const pickedOthers = subject === 'Others';
  const chosenSubject = pickedOthers ? null : (subject || null);

  // Owl messages
  const owlMsg = useMemo(() => {
    switch (page) {
      case 0: return STEPS[0].owlSays;
      case 1: return STEPS[1].owlSays;
      case 2: return STEPS[2].owlSays;
      case 3:
        if (interest === 'Academic') return 'Nice! Which subject do you want to ace?';
        if (interest === 'Non-Academic') return 'Cool! What skill do you want to pick up?';
        return STEPS[3].owlSays;
      case 4:
        if (pickedOthers) return STEPS[5].owlSays;
        if (chosenSubject) return `How much ${chosenSubject} do you know? Be honest!`;
        return STEPS[4].owlSays;
      case 5: return STEPS[5].owlSays;
      case 6: return STEPS[6].owlSays;
      case 7:
        if (profileCategory === 0) return STEPS[7].owlSays;
        if (profileCategory === 1) return 'Which exam are you grinding for?';
        if (profileCategory === 2) return 'Tell me about your college life!';
        return '';
      default: return '';
    }
  }, [page, interest, pickedOthers, chosenSubject, profileCategory]);

  // Step color for progress bar
  const stepColor = useMemo(() => {
    if (page === 7) {
      if (profileCategory === 0) return '#22C55E';
      if (profileCategory === 1) return '#F97316';
      if (profileCategory === 2) return '#6366F1';
    }
    if (page >= 0 && page <= 6) return STEPS[Math.min(page, STEPS.length - 1)].color;
    return '#1E3162';
  }, [page, profileCategory]);

  const goTo = useCallback((p: number, dir: 'forward' | 'back') => {
    setDirection(dir);
    animKey.current++;
    setPage(p);
    localStorage.setItem('onboarding_page', p.toString());
  }, []);

  const goNext = useCallback((p: number) => goTo(p, 'forward'), [goTo]);
  const goBack = useCallback((p: number) => goTo(p, 'back'), [goTo]);

  const handleFinish = () => {
    localStorage.setItem('onboarding_complete', 'true');
    localStorage.setItem('studentLoggedIn', 'true');
    // Clear onboarding progress
    localStorage.removeItem('onboarding_page');
    localStorage.removeItem('onboarding_sel');
    localStorage.removeItem('onboarding_interest');
    localStorage.removeItem('onboarding_subject');
    localStorage.removeItem('onboarding_category');
    router.push('/dashboard');
  };

  const getCard = (p: number) => {
    switch (p) {
      case 0:
        return <OnboardingCredentials onNext={() => goNext(1)} />;
      case 1:
        return <OnboardingPage2 onNext={() => goNext(2)} onBack={() => goBack(0)} />;
      case 2:
        return <OnboardingPage3 onNext={(val) => { 
          setInterest(val); 
          localStorage.setItem('onboarding_interest', val);
          setSubject(''); 
          localStorage.removeItem('onboarding_subject');
          goNext(3); 
        }} onBack={() => goBack(1)} />;
      case 3:
        return <OnboardingPage4 interest={interest} onNext={(val) => { 
          setSubject(val); 
          localStorage.setItem('onboarding_subject', val);
          goNext(4); 
        }} onBack={() => goBack(2)} />;
      case 4:
        // If "Others" → skip knowledge, show fun fact directly
        if (pickedOthers) {
          return <OnboardingPage6 onNext={() => goNext(6)} onBack={() => goBack(3)} />;
        }
        return <OnboardingPage5 subject={chosenSubject || 'this'} onNext={() => goNext(5)} onBack={() => goBack(3)} />;
      case 5:
        return <OnboardingPage6 onNext={() => goNext(6)} onBack={() => goBack(4)} />;
      case 6:
        return <OnboardingProfile onNext={(cat) => {
          setProfileCategory(cat);
          localStorage.setItem('onboarding_category', cat.toString());
          if (cat === 0 || cat === 1 || cat === 2) goNext(7);
          else handleFinish(); // Working Professional, Homemaker, Sr. Citizen → done
        }} onBack={() => goBack(pickedOthers ? 4 : 5)} />;
      case 7:
        if (profileCategory === 0) return <OnboardingBoard onSubmit={handleFinish} onBack={() => goBack(6)} />;
        if (profileCategory === 1) return <OnboardingAspirant onSubmit={handleFinish} onBack={() => goBack(6)} />;
        if (profileCategory === 2) return <OnboardingCollege onSubmit={handleFinish} onBack={() => goBack(6)} />;
        return null;
      default: return null;
    }
  };

  // Build card stack (show up to 4 behind current)
  const stack = [];
  for (let i = Math.max(0, page - 3); i <= page; i++) stack.push(i);

  const currentBg = CARD_COLORS[Math.min(page, CARD_COLORS.length - 1)].bg;

  // Progress bar: pages 0-7 map to steps 1-totalPages
  const progressSteps = totalPages;
  const progressCurrent = page + 1; // page 0 = step 1, etc.

  return (
    <div className="onboard-root h-screen overflow-hidden flex flex-col transition-colors duration-500"
      style={{ '--page-bg': currentBg } as React.CSSProperties}>
      <style>{`
        @keyframes slideUp { from { transform: translateY(110%) scale(0.95); opacity:0; } to { transform: translateY(0) scale(1); opacity:1; } }
        @keyframes fadeIn { from { opacity:0; transform: scale(0.97); } to { opacity:1; transform: scale(1); } }
        .card-slide-up { animation: slideUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .card-fade-in { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @media (min-width: 768px) { .onboard-root { background-color: var(--page-bg) !important; } }
        @media (max-width: 767px) { .onboard-root { background-color: #fff !important; } }
      `}</style>

      {/* Header */}
      <div className="shrink-0 px-5 pt-5 pb-2 md:px-8 md:pt-6">
          {/* Progress bar + back + step counter */}
          <div className="flex items-center gap-3 max-w-[440px] mx-auto">
            {page > 0 && (
              <button type="button" onClick={() => goBack(page - 1)}
                className="w-9 h-9 rounded-[10px] bg-white/80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white transition-all shrink-0"
                style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <ArrowLeft size={15} className="text-[#555]" />
              </button>
            )}
            <div className="flex-1 relative h-10">
              {/* Progress segments */}
              <div className="absolute left-0 right-0 bottom-0 flex gap-[3px]">
                {Array.from({ length: progressSteps }).map((_, i) => {
                  const stepIdx = i; // 0-indexed
                  const currentIdx = progressCurrent - 1; // page 0 → idx 0
                  return (
                    <div key={i} className="flex-1 h-[6px] rounded-[3px] transition-all duration-400"
                      style={{
                        background: i === currentIdx ? '#1A1A1A' : i < currentIdx ? stepColor : '#E5E7EB',
                      }} />
                  );
                })}
              </div>
              {/* Walking owl on progress bar */}
              <div className="absolute transition-all duration-600 ease-out" style={{
                left: `${Math.min(((progressCurrent - 1) / progressSteps + 1 / (progressSteps * 2)) * 100, 100 - 5)}%`,
                top: 0,
                transform: 'translateX(-50%)',
              }}>
                <div className="scale-[0.45] origin-top-left"><OwlAnimation /></div>
              </div>
            </div>
            <span className="font-matter text-[12px] font-semibold text-[#6B7280] shrink-0">
              {progressCurrent}/{progressSteps}
            </span>
          </div>
          {/* Typing bubble */}
          <div className="max-w-[440px] mx-auto mt-3">
            <TypingBubble key={`owl-${page}`} text={owlMsg} />
          </div>
        </div>

      {/* Card stack */}
      <div className="flex-1 relative md:px-5 md:pb-4 mt-2 md:mt-3">
        {stack.map((p) => {
          const isCurrent = p === page;
          const depth = page - p;
          const cardColor = CARD_COLORS[Math.min(p, CARD_COLORS.length - 1)];

          return (
            <div key={`${p}-${isCurrent ? animKey.current : 'bg'}`}
              className={`absolute inset-0 md:inset-x-5 md:top-0 md:bottom-4 flex justify-center ${isCurrent && direction === 'forward' ? 'card-slide-up' : ''}`}
              style={{
                zIndex: p,
                transform: isCurrent
                  ? 'translateY(0) scale(1)'
                  : `translateY(${depth * -18}px) scale(${1 - depth * 0.05})`,
                opacity: isCurrent ? 1 : Math.max(0.3, 1 - depth * 0.25),
                transition: isCurrent ? undefined : 'transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease',
                pointerEvents: isCurrent ? 'auto' : 'none',
              }}>
              <div className="w-full md:max-w-[440px] h-full rounded-none md:rounded-[32px] overflow-hidden"
                style={{
                  background: cardColor.bg,
                  boxShadow: isCurrent ? '0 12px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)' : '0 2px 12px rgba(0,0,0,0.06)',
                }}>
                {isCurrent && (
                  <div className="h-full flex flex-col">
                    {/* Mobile-only progress bar inside card */}
                    <div className="md:hidden w-full flex justify-center pt-4 pb-0 px-8 shrink-0">
                        <div className="flex gap-1.5 w-full max-w-[280px]">
                          {Array.from({ length: progressSteps }).map((_, i) => {
                            const currentIdx = progressCurrent - 1;
                            return (
                              <div key={i} className="flex-1 h-[4px] rounded-full transition-all duration-500"
                                style={{
                                  background: i === currentIdx ? '#1A1A1A' : i < currentIdx ? stepColor : 'rgba(0,0,0,0.08)',
                                }} />
                            );
                          })}
                        </div>
                      </div>
                    <div className="flex-1 flex flex-col min-h-0">
                      {getCard(p)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
