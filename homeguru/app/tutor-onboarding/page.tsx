'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminStepAuth from '@/components/tutor-onboarding/AdminStepAuth';
import AdminStepProfile from '@/components/tutor-onboarding/AdminStepProfile';
import AdminStep1Welcome from '@/components/tutor-onboarding/AdminStep1Welcome';
import AdminStep3Subjects from '@/components/tutor-onboarding/AdminStep3Subjects';
import AdminStep4QualificationTest from '@/components/tutor-onboarding/AdminStep4QualificationTest';
import AdminStepCongrats from '@/components/tutor-onboarding/AdminStepCongrats';
import AdminStep5Payment from '@/components/tutor-onboarding/AdminStep5Payment';
import AdminStep2IDVerification from '@/components/tutor-onboarding/AdminStep2IDVerification';
import AdminStepBank from '@/components/tutor-onboarding/AdminStepBank';
import AdminStep6GoLive from '@/components/tutor-onboarding/AdminStep6GoLive';

function AdminOnboardingFlow() {
  const searchParams = useSearchParams();
  const fromWebsite = searchParams.get('source') === 'website';
  const [step, setStep] = useState(0);

  // Clear saved step on fresh page load so flow starts from beginning
  useEffect(() => {
    localStorage.removeItem('tutor_onboarding_step');
  }, []);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const totalSteps = 10;
  const displayStep = step;

  const goNext = (s: number) => { localStorage.setItem('tutor_onboarding_step', String(s)); setStep(s); };
  const goBack = (s: number) => { localStorage.setItem('tutor_onboarding_step', String(s)); setStep(s); };

  // Mobile tutor flow (from welcome_screen.dart _buildTutorPage):
  // 0: WelcomeCard → "Get Started" / "Log in"
  // 1: CredentialsCard → email+verify, phone+country code+OTP+verify, password
  // 2: TutorProfileCard → name, gender, country/state/city, languages+proficiency, about, certificates
  // 3: TutorWelcomePreviewCard → animated 5-step roadmap
  // 4: TutorSubjectsCard → subjects + skills picker
  // 5: TutorTestCard → qualification test (MCQ + written)
  // 6: TutorCongratsCard → pass/fail result
  // 7: TutorPaymentCard → ₹499 Razorpay
  // 8: TutorIdCard → Aadhaar + DigiLocker
  // 9: TutorBankCard → account name, acc no (obscured), re-enter, IFSC
  // 10: TutorGoLiveCard → checklist + go to dashboard
  const renderStep = () => {
    switch (step) {
      case 0: return <AdminStepAuth onNext={() => goNext(1)} />;
      case 1: return <AdminStepProfile onNext={() => goNext(2)} onBack={() => goBack(0)} />;
      case 2: return <AdminStep1Welcome onNext={() => goNext(3)} />;
      case 3: return <AdminStep3Subjects onNext={(subjects) => { setSelectedSubjects(subjects); goNext(4); }} onBack={() => goBack(2)} />;
      case 4: return <AdminStep4QualificationTest subjects={selectedSubjects} onNext={() => goNext(5)} onBack={() => goBack(3)} />;
      case 5: return <AdminStepCongrats onNext={() => goNext(6)} onBack={() => goBack(4)} />;
      case 6: return <AdminStep5Payment onNext={() => goNext(7)} onBack={() => goBack(5)} />;
      case 7: return <AdminStep2IDVerification onNext={() => goNext(8)} onBack={() => goBack(6)} />;
      case 8: return <AdminStepBank onNext={() => goNext(9)} onBack={() => goBack(7)} />;
      case 9: return <AdminStep6GoLive onBack={() => goBack(8)} />;
      default: return null;
    }
  };

  return (
    <div className="h-screen bg-white font-matter flex flex-col overflow-hidden">
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .step-animate { animation: fadeIn 0.4s ease both; }
      `}</style>

      {/* Top bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 border-b border-[#F0F0F0] bg-white shrink-0">
        <img src="/images/homeguru.png" alt="HomeGuru" className="h-[32px] w-auto object-contain" />
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-[3px] rounded-full transition-all duration-500 ${i < displayStep ? 'w-8 bg-[#F97316]' : 'w-4 bg-[#EBEBEB]'}`} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="step-animate" key={step}>
          {renderStep()}
        </div>
      </div>
    </div>
  );
}

export default function AdminOnboardingPage() {
  return (<Suspense fallback={null}><AdminOnboardingFlow /></Suspense>);
}
