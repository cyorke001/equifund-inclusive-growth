import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  TrendingUp, CheckCircle2, AlertTriangle, Lightbulb, Download,
  MessageSquare, BarChart3, Star, ChevronRight, Zap, Target,
  DollarSign, Building2, ArrowRight, Sparkles, LogOut, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { useOnboarding, TOTAL_STEPS } from "@/hooks/useOnboarding";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const fundingTypes = [
  { icon: DollarSign, name: "Microloan", match: "85%", desc: "Small loans under $50K for early-stage businesses" },
  { icon: Building2, name: "Community Grant", match: "72%", desc: "Non-repayable funding for minority entrepreneurs" },
  { icon: TrendingUp, name: "Growth Loan", match: "58%", desc: "Larger loans for businesses with revenue history" },
  { icon: Sparkles, name: "Investor Match", match: "45%", desc: "Angel or venture capital connections" },
];

const EntrepreneurDashboard = () => {
  const { profile, isLoggedIn, isLoading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const onboarding = useOnboarding();
  const [scoringLoading, setScoringLoading] = useState(false);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [risks, setRisks] = useState<string[]>(["Complete your onboarding to get AI-powered insights."]);
  const [readinessScore, setReadinessScore] = useState(0);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !isLoggedIn) navigate("/login", { replace: true });
  }, [authLoading, isLoggedIn, navigate]);

  // Calculate AI score when onboarding data loads
  const calculateScore = useCallback(async () => {
    if (onboarding.loading || onboarding.completedFields === 0) {
      setReadinessScore(0);
      setStrengths([]);
      setRisks(["Complete your onboarding to get AI-powered insights."]);
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
        // Save score to DB
        onboarding.saveToDb({ readiness_score: data.score });
      }
    } catch (e) {
      console.error("Score calculation failed:", e);
      // Fall back to saved score
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

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <div className="bg-hero py-8">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-primary-foreground/60">Welcome back 👋</p>
              <h1 className="text-2xl font-bold font-heading text-primary-foreground">
                {profile?.name ? `Hello, ${profile.name}` : "Entrepreneur Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm" variant="hero-outline" className="gap-2">
                <Download className="h-4 w-4" /> Download Summary
              </Button>
              <Button size="sm" variant="hero-outline" className="gap-2" onClick={handleLogout}>
                <LogOut className="h-4 w-4" /> Log Out
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
              <h2 className="font-heading font-semibold text-foreground">Onboarding Progress</h2>
            </div>
            <span className="text-sm font-bold text-secondary">{onboarding.percentage}%</span>
          </div>
          <Progress value={onboarding.percentage} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">
            {onboarding.completed
              ? `All ${TOTAL_STEPS} steps completed — your profile is ready! 🏆`
              : `${onboarding.completedFields} of ${TOTAL_STEPS} steps completed — keep going! 🎉`}
          </p>
          <Link to="/onboarding">
            <Button size="sm" className="mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
              {onboarding.completed ? "Review Onboarding" : "Continue Onboarding"} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* AI Readiness Score */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-xl border border-border bg-card p-6 shadow-card lg:col-span-1">
            <h2 className="flex items-center gap-2 font-heading font-semibold text-foreground mb-4">
              <BarChart3 className="h-5 w-5 text-primary" /> AI Funding Readiness
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
                {readinessScore === 0 ? "Complete onboarding to get your AI score." : "Your score improves as you complete your profile."}
              </p>
            </div>
          </motion.div>

          {/* Strengths & Risks */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="rounded-xl border border-border bg-card p-6 shadow-card lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 font-heading font-semibold text-foreground mb-3">
                  <Star className="h-4 w-4 text-secondary" /> Strengths
                </h3>
                <div className="space-y-2">
                  {strengths.length > 0 ? strengths.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-lg bg-secondary/5 p-3">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-secondary" />
                      <span className="text-sm text-foreground">{s}</span>
                    </div>
                  )) : (
                    <p className="text-sm text-muted-foreground">Complete onboarding to see your strengths.</p>
                  )}
                </div>
              </div>
              <div>
                <h3 className="flex items-center gap-2 font-heading font-semibold text-foreground mb-3">
                  <AlertTriangle className="h-4 w-4 text-accent" /> Areas to Improve
                </h3>
                <div className="space-y-2">
                  {risks.map((r, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-lg bg-accent/5 p-3">
                      <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                      <span className="text-sm text-foreground">{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recommended Funding */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="mt-6 rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="flex items-center gap-2 font-heading font-semibold text-foreground mb-4">
            <Lightbulb className="h-5 w-5 text-accent" /> Recommended Funding Types
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fundingTypes.map((fund, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group rounded-xl border border-border bg-background p-5 hover:shadow-card transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <fund.icon className="h-6 w-6 text-primary" />
                  <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-bold text-secondary">{fund.match} match</span>
                </div>
                <h3 className="font-heading font-semibold text-foreground">{fund.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{fund.desc}</p>
                <button className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
                  Learn more <ChevronRight className="h-3 w-3" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chatbot CTA */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-6 rounded-xl bg-hero p-6 shadow-card">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/20">
                <MessageSquare className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-primary-foreground">Need help?</h3>
                <p className="text-sm text-primary-foreground/70">Chat with our AI assistant to understand your scores and get tips.</p>
              </div>
            </div>
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 shrink-0">
              <Zap className="h-4 w-4" /> Open Chat
            </Button>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default EntrepreneurDashboard;
