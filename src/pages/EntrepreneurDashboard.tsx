import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  TrendingUp, CheckCircle2, AlertTriangle, Lightbulb, Download,
  BarChart3, Star, ChevronRight, Zap, Target,
  ArrowRight, LogOut, Loader2, ArrowUpRight, Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useOnboarding, TOTAL_STEPS } from "@/hooks/useOnboarding";
import { supabase } from "@/integrations/supabase/client";

interface FundingRec {
  name: string;
  match_pct: number;
  description: string;
  category: "recommended_now" | "possible_later";
}

const EntrepreneurDashboard = () => {
  const { profile, isLoggedIn, isLoading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const onboarding = useOnboarding();
  const [scoringLoading, setScoringLoading] = useState(false);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [risks, setRisks] = useState<string[]>([]);
  const [readinessScore, setReadinessScore] = useState(0);
  const [fundingRecs, setFundingRecs] = useState<FundingRec[]>([]);
  const [improvementSteps, setImprovementSteps] = useState<string[]>([]);

  useEffect(() => {
    if (!authLoading && !isLoggedIn) navigate("/login", { replace: true });
  }, [authLoading, isLoggedIn, navigate]);

  const calculateScore = useCallback(async () => {
    if (onboarding.loading || onboarding.completedFields === 0) {
      setReadinessScore(0);
      setStrengths([]);
      setRisks([t("dash.completeOnboarding")]);
      setFundingRecs([]);
      setImprovementSteps([]);
      return;
    }
    setScoringLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("calculate-score", {
        body: { onboardingData: onboarding.data },
      });
      if (error) throw error;
      if (data?.score !== undefined) {
        setReadinessScore(data.score);
        setStrengths(data.strengths || []);
        setRisks(data.risks || []);
        setFundingRecs(data.funding_recommendations || []);
        setImprovementSteps(data.improvement_steps || []);
        onboarding.saveToDb({ readiness_score: data.score });
      }
    } catch (e) {
      console.error("Score calculation failed:", e);
      setReadinessScore(onboarding.readinessScore);
    } finally {
      setScoringLoading(false);
    }
  }, [onboarding.loading, onboarding.completedFields, onboarding.data, onboarding.readinessScore]);

  useEffect(() => {
    calculateScore();
  }, [onboarding.loading, onboarding.completedFields]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (authLoading || onboarding.loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </main>
    );
  }

  const nowRecs = fundingRecs.filter(r => r.category === "recommended_now");
  const laterRecs = fundingRecs.filter(r => r.category === "possible_later");

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <div className="bg-hero py-8">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-primary-foreground/70">{t("dash.welcomeBack")}</p>
              <h1 className="text-2xl font-bold font-heading text-primary-foreground">
                {profile?.name ? `Hello, ${profile.name}` : t("dash.title")}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm" variant="hero-outline" className="gap-2">
                <Download className="h-4 w-4" /> {t("dash.downloadSummary")}
              </Button>
              <Button size="sm" variant="hero-outline" className="gap-2" onClick={handleLogout}>
                <LogOut className="h-4 w-4" /> {t("nav.logout")}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Onboarding Progress */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mb-8 rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-secondary" />
              <h2 className="font-heading font-semibold text-foreground">{t("dash.onboardingProgress")}</h2>
            </div>
            <span className="text-sm font-bold text-secondary">{onboarding.percentage}%</span>
          </div>
          <Progress value={onboarding.percentage} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">
            {onboarding.completed
              ? t("dash.allCompleted").replace(`${TOTAL_STEPS}`, String(TOTAL_STEPS))
              : `${onboarding.completedFields} ${t("common.of")} ${TOTAL_STEPS} ${t("dash.keepGoing")}`}
          </p>
          <Link to="/onboarding">
            <Button size="sm" className="mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
              {onboarding.completed ? t("dash.reviewOnboarding") : t("dash.continueOnboarding")} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* AI Readiness Score */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-xl border border-border bg-card p-6 shadow-card lg:col-span-1">
            <h2 className="flex items-center gap-2 font-heading font-semibold text-foreground mb-4">
              <BarChart3 className="h-5 w-5 text-primary" /> {t("dash.aiReadiness")}
              {scoringLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
            </h2>
            <div className="flex flex-col items-center py-4">
              <div className="relative flex h-36 w-36 items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--equi-green))" strokeWidth="10"
                    strokeDasharray={`${readinessScore * 3.14} 314`} strokeLinecap="round" />
                </svg>
                <div className="absolute text-center">
                  <span className="text-4xl font-bold font-heading text-foreground">{readinessScore}</span>
                  <span className="block text-xs text-muted-foreground">/100</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground text-center">
                {readinessScore === 0 ? t("dash.completeOnboarding") : t("dash.scoreImproves")}
              </p>
            </div>
          </motion.div>

          {/* Strengths & Risks */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="rounded-xl border border-border bg-card p-6 shadow-card lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 font-heading font-semibold text-foreground mb-3">
                  <Star className="h-4 w-4 text-secondary" /> {t("dash.strengths")}
                </h3>
                <div className="space-y-2">
                  {strengths.length > 0 ? strengths.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-lg bg-secondary/5 p-3">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-secondary" />
                      <span className="text-sm text-foreground">{s}</span>
                    </div>
                  )) : (
                    <p className="text-sm text-muted-foreground">{t("dash.completeToSee")}</p>
                  )}
                </div>
              </div>
              <div>
                <h3 className="flex items-center gap-2 font-heading font-semibold text-foreground mb-3">
                  <AlertTriangle className="h-4 w-4 text-accent" /> {t("dash.areasToImprove")}
                </h3>
                <div className="space-y-2">
                  {risks.length > 0 ? risks.map((r, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-lg bg-accent/5 p-3">
                      <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                      <span className="text-sm text-foreground">{r}</span>
                    </div>
                  )) : (
                    <p className="text-sm text-muted-foreground">{t("dash.completeOnboarding")}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI-Driven Funding Recommendations */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="mt-6 rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="flex items-center gap-2 font-heading font-semibold text-foreground mb-4">
            <Lightbulb className="h-5 w-5 text-accent" /> {t("dash.recommendedFunding")}
          </h2>

          {fundingRecs.length === 0 && !scoringLoading && (
            <p className="text-sm text-muted-foreground">{t("dash.completeOnboarding")}</p>
          )}

          {nowRecs.length > 0 && (
            <>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-secondary mb-3">
                <ArrowUpRight className="h-4 w-4" /> {t("dash.recommendedNow")}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                {nowRecs.map((rec, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="rounded-xl border border-secondary/20 bg-secondary/5 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <TrendingUp className="h-5 w-5 text-secondary" />
                      <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-bold text-secondary">{rec.match_pct}% {t("common.match")}</span>
                    </div>
                    <h4 className="font-heading font-semibold text-foreground">{rec.name}</h4>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{rec.description}</p>
                    <button className="mt-3 flex items-center gap-1 text-xs font-semibold text-secondary hover:underline">
                      {t("dash.learnMore")} <ChevronRight className="h-3 w-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {laterRecs.length > 0 && (
            <>
              <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-3">
                <Lock className="h-4 w-4" /> {t("dash.possibleLater")}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                {laterRecs.map((rec, i) => (
                  <div key={i} className="rounded-xl border border-border bg-background p-5 opacity-80">
                    <div className="flex items-center justify-between mb-3">
                      <TrendingUp className="h-5 w-5 text-muted-foreground" />
                      <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-bold text-muted-foreground">{rec.match_pct}% {t("common.match")}</span>
                    </div>
                    <h4 className="font-heading font-semibold text-foreground">{rec.name}</h4>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{rec.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {improvementSteps.length > 0 && (
            <div className="mt-4 rounded-xl border border-border bg-muted/50 p-5">
              <h3 className="flex items-center gap-2 font-heading font-semibold text-foreground mb-3">
                <Zap className="h-4 w-4 text-accent" /> {t("dash.improvementSteps")}
              </h3>
              <div className="space-y-2">
                {improvementSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">{i + 1}</span>
                    <span className="text-sm text-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Chatbot CTA */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-6 rounded-xl bg-hero p-6 shadow-card">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/10">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-primary-foreground">{t("dash.needHelp")}</h3>
                <p className="text-sm text-primary-foreground/80">{t("dash.chatHelp")}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default EntrepreneurDashboard;
