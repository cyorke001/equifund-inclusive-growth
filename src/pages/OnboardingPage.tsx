import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, ArrowLeft, Building2, MapPin, Calendar, Users,
  DollarSign, TrendingUp, FileText, Sparkles, CheckCircle2,
  Lightbulb, PartyPopper, Target, Briefcase, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useOnboarding, dataKeys } from "@/hooks/useOnboarding";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const stepKeys = [
  "businessName", "industry", "location", "years", "team", "revenue", "funding", "market", "description",
];

const stepIcons = [Building2, Briefcase, MapPin, Calendar, Users, DollarSign, TrendingUp, Target, FileText];

const industries = [
  "Technology", "Food & Beverage", "Retail", "Healthcare", "Construction",
  "Professional Services", "Education", "Transportation", "Manufacturing",
  "Arts & Entertainment", "Real Estate", "Agriculture", "Other",
];

const revenueRanges = [
  "Pre-revenue", "Under $10,000", "$10,000 – $50,000", "$50,000 – $100,000",
  "$100,000 – $500,000", "$500,000 – $1M", "Over $1M",
];

const fundingRanges = [
  "Under $5,000", "$5,000 – $25,000", "$25,000 – $50,000", "$50,000 – $100,000",
  "$100,000 – $250,000", "$250,000 – $500,000", "Over $500,000",
];

const celebrations = [
  "Great start! 🎉", "You're doing amazing! ⭐", "Awesome — keep going! 🚀",
  "That's really helpful! 💪", "Strong team insight! 👥", "Good to know! 📊",
  "Smart move! 💡", "Excellent context! 🎯", "Almost there — you're building a strong profile! 🏆",
];

const OnboardingPage = () => {
  const { currentStep, data, getValue, setFieldValue, setStep, markCompleted, loading } = useOnboarding();
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const { t } = useLanguage();
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationText, setCelebrationText] = useState("");
  const navigate = useNavigate();

  if (authLoading || loading) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </main>
    );
  }

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  const totalSteps = stepKeys.length;
  const progress = Math.round(((currentStep + 1) / totalSteps) * 100);
  const StepIcon = stepIcons[currentStep];
  const stepKey = stepKeys[currentStep];
  const canProceed = getValue().trim().length > 0;

  const goNext = () => {
    if (!canProceed) return;
    setCelebrationText(celebrations[currentStep] || "Nice! 🎉");
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
      if (currentStep < totalSteps - 1) {
        setStep(currentStep + 1);
      } else {
        markCompleted();
        navigate("/entrepreneur-dashboard");
      }
    }, 1200);
  };

  const goBack = () => {
    if (currentStep > 0) setStep(currentStep - 1);
  };

  const renderInput = () => {
    const val = getValue();
    const setVal = setFieldValue;

    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {industries.map((ind) => (
              <button key={ind} onClick={() => setVal(ind)}
                className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${val === ind ? "border-secondary bg-secondary/10 text-foreground shadow-soft" : "border-border bg-card text-muted-foreground hover:border-secondary/40"}`}>{ind}</button>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {["Less than 1", "1–2 years", "3–5 years", "5+ years"].map((opt) => (
              <button key={opt} onClick={() => setVal(opt)}
                className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${val === opt ? "border-secondary bg-secondary/10 text-foreground shadow-soft" : "border-border bg-card text-muted-foreground hover:border-secondary/40"}`}>{opt}</button>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {["Just me", "2–5", "6–20", "20+"].map((opt) => (
              <button key={opt} onClick={() => setVal(opt)}
                className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${val === opt ? "border-secondary bg-secondary/10 text-foreground shadow-soft" : "border-border bg-card text-muted-foreground hover:border-secondary/40"}`}>{opt}</button>
            ))}
          </div>
        );
      case 5:
        return (
          <div className="grid grid-cols-2 gap-2">
            {revenueRanges.map((opt) => (
              <button key={opt} onClick={() => setVal(opt)}
                className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all text-left ${val === opt ? "border-secondary bg-secondary/10 text-foreground shadow-soft" : "border-border bg-card text-muted-foreground hover:border-secondary/40"}`}>{opt}</button>
            ))}
          </div>
        );
      case 6:
        return (
          <div className="grid grid-cols-2 gap-2">
            {fundingRanges.map((opt) => (
              <button key={opt} onClick={() => setVal(opt)}
                className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all text-left ${val === opt ? "border-secondary bg-secondary/10 text-foreground shadow-soft" : "border-border bg-card text-muted-foreground hover:border-secondary/40"}`}>{opt}</button>
            ))}
          </div>
        );
      case 7:
        return <Textarea value={val} onChange={(e) => setVal(e.target.value)} placeholder={t("onboard.marketPlaceholder")} rows={4} maxLength={500} className="text-base" />;
      case 8:
        return <Textarea value={val} onChange={(e) => setVal(e.target.value)} placeholder={t("onboard.descriptionPlaceholder")} rows={5} maxLength={1000} className="text-base" />;
      default:
        return <Input value={val} onChange={(e) => setVal(e.target.value)} placeholder={currentStep === 0 ? t("onboard.businessNamePlaceholder") : t("onboard.locationPlaceholder")} maxLength={200} className="text-base h-12" onKeyDown={(e) => e.key === "Enter" && goNext()} />;
    }
  };

  return (
    <main id="main-content" className="min-h-[calc(100vh-4rem)] bg-background flex flex-col">
      <div className="border-b border-border bg-card px-4 py-3">
        <div className="container mx-auto max-w-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground font-heading">{t("onboard.step")} {currentStep + 1} {t("onboard.of")} {totalSteps}</span>
            <span className="text-sm font-bold text-secondary">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {showCelebration ? (
              <motion.div key="celebration" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex flex-col items-center justify-center py-16">
                <PartyPopper className="h-12 w-12 text-secondary mb-4" />
                <p className="text-2xl font-bold font-heading text-foreground">{celebrationText}</p>
              </motion.div>
            ) : (
              <motion.div key={currentStep} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10">
                    <StepIcon className="h-7 w-7 text-secondary" />
                  </div>
                  <h1 className="text-2xl font-bold font-heading text-foreground md:text-3xl">{t(`onboard.${stepKey}Sub`)}</h1>
                </div>
                <div className="mb-6">{renderInput()}</div>
                <div className="mb-8 flex items-start gap-3 rounded-xl bg-muted/50 border border-border p-4">
                  <Lightbulb className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1">{t("onboard.whyMatters")}</p>
                    <p className="text-sm text-muted-foreground">{t(`onboard.${stepKey}Tip`)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="ghost" onClick={goBack} disabled={currentStep === 0} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> {t("onboard.back")}
                  </Button>
                  <div className="flex items-center gap-1">
                    {stepKeys.map((_, i) => (
                      <div key={i} className={`h-2 rounded-full transition-all ${i === currentStep ? "w-6 bg-secondary" : i < currentStep ? "w-2 bg-secondary/40" : "w-2 bg-border"}`} />
                    ))}
                  </div>
                  <Button onClick={goNext} disabled={!canProceed} className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                    {currentStep === totalSteps - 1 ? (<>{t("onboard.finish")} <Sparkles className="h-4 w-4" /></>) : (<>{t("onboard.next")} <ArrowRight className="h-4 w-4" /></>)}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {currentStep > 0 && !showCelebration && (
        <div className="border-t border-border bg-card px-4 py-3">
          <div className="container mx-auto max-w-2xl">
            <div className="flex flex-wrap gap-2">
              {stepKeys.slice(0, currentStep).map((_, i) => {
                const val = data[dataKeys[i]];
                return (
                  <button key={i} onClick={() => setStep(i)}
                    className="flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-foreground hover:bg-secondary/20 transition-colors">
                    <CheckCircle2 className="h-3 w-3 text-secondary" />
                    <span className="max-w-[120px] truncate">{val}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default OnboardingPage;
