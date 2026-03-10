import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  User, TrendingUp, CheckCircle2, AlertTriangle, Lightbulb, Download,
  MessageSquare, Globe, BarChart3, Star, ChevronRight, Zap, Target,
  BookOpen, DollarSign, Building2, ArrowRight, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import SectionHeading from "@/components/SectionHeading";

const readinessScore = 62;

const strengths = [
  "Clear business concept with defined target market",
  "Located in high-demand service area",
  "Industry shows consistent growth trends",
];

const risks = [
  "Limited financial documentation uploaded",
  "No revenue history provided yet",
  "Business plan not yet submitted",
];

const improvements = [
  { label: "Upload financial statements", done: false },
  { label: "Complete business description", done: true },
  { label: "Add team information", done: false },
  { label: "Provide revenue projections", done: false },
  { label: "Upload business plan or pitch deck", done: false },
  { label: "Add market research details", done: true },
];

const fundingTypes = [
  { icon: DollarSign, name: "Microloan", match: "85%", desc: "Small loans under $50K for early-stage businesses" },
  { icon: Building2, name: "Community Grant", match: "72%", desc: "Non-repayable funding for minority entrepreneurs" },
  { icon: TrendingUp, name: "Growth Loan", match: "58%", desc: "Larger loans for businesses with revenue history" },
  { icon: Sparkles, name: "Investor Match", match: "45%", desc: "Angel or venture capital connections" },
];

const EntrepreneurDashboard = () => {
  const [language, setLanguage] = useState("English");

  const completedSteps = improvements.filter((i) => i.done).length;
  const onboardingProgress = Math.round((completedSteps / improvements.length) * 100);

  return (
    <main id="main-content" className="min-h-screen bg-background">
      {/* Welcome Header */}
      <div className="bg-hero py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm text-primary-foreground/60">Welcome back 👋</p>
              <h1 className="text-2xl font-bold font-heading text-primary-foreground">Entrepreneur Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-primary-foreground/10 px-3 py-1.5">
                <Globe className="h-4 w-4 text-primary-foreground/70" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-transparent text-sm text-primary-foreground border-none outline-none cursor-pointer"
                  aria-label="Language preference"
                >
                  <option value="English">English</option>
                  <option value="Français">Français</option>
                  <option value="አማርኛ">አማርኛ</option>
                  <option value="Soomaali">Soomaali</option>
                  <option value="العربية">العربية</option>
                  <option value="Español">Español</option>
                </select>
              </div>
              <Button size="sm" variant="hero-outline" className="gap-2">
                <Download className="h-4 w-4" /> Download Summary
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Onboarding Progress */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 rounded-xl border border-border bg-card p-6 shadow-card"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-secondary" />
              <h2 className="font-heading font-semibold text-foreground">Onboarding Progress</h2>
            </div>
            <span className="text-sm font-bold text-secondary">{onboardingProgress}%</span>
          </div>
          <Progress value={onboardingProgress} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">
            {completedSteps} of {improvements.length} steps completed — keep going! 🎉
          </p>
          <Link to="/onboarding">
            <Button size="sm" className="mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
              Continue Onboarding <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Readiness Score */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border bg-card p-6 shadow-card lg:col-span-1"
          >
            <h2 className="flex items-center gap-2 font-heading font-semibold text-foreground mb-4">
              <BarChart3 className="h-5 w-5 text-primary" /> AI Funding Readiness
            </h2>
            <div className="flex flex-col items-center py-4">
              <div className="relative flex h-36 w-36 items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="50" fill="none"
                    stroke="hsl(var(--equi-green))"
                    strokeWidth="10"
                    strokeDasharray={`${readinessScore * 3.14} 314`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-4xl font-bold font-heading text-foreground">{readinessScore}</span>
                  <span className="block text-xs text-muted-foreground">/100</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground text-center">
                Your score improves as you complete your profile and add more detail.
              </p>
            </div>
          </motion.div>

          {/* Strengths & Risks */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-border bg-card p-6 shadow-card lg:col-span-2"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 font-heading font-semibold text-foreground mb-3">
                  <Star className="h-4 w-4 text-secondary" /> Strengths
                </h3>
                <div className="space-y-2">
                  {strengths.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-lg bg-secondary/5 p-3">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-secondary" />
                      <span className="text-sm text-foreground">{s}</span>
                    </div>
                  ))}
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

        {/* Improvement Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-6 rounded-xl border border-border bg-card p-6 shadow-card"
        >
          <h2 className="flex items-center gap-2 font-heading font-semibold text-foreground mb-4">
            <CheckCircle2 className="h-5 w-5 text-secondary" /> Improvement Checklist
          </h2>
          <p className="text-sm text-muted-foreground mb-4">Complete these to boost your Funding Readiness Score.</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {improvements.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${
                  item.done
                    ? "border-secondary/30 bg-secondary/5"
                    : "border-border bg-card hover:bg-muted/50 cursor-pointer"
                }`}
              >
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  item.done ? "bg-secondary text-secondary-foreground" : "border-2 border-muted-foreground/30"
                }`}>
                  {item.done && <CheckCircle2 className="h-4 w-4" />}
                </div>
                <span className={`text-sm ${item.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recommended Funding */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-6 rounded-xl border border-border bg-card p-6 shadow-card"
        >
          <h2 className="flex items-center gap-2 font-heading font-semibold text-foreground mb-4">
            <Lightbulb className="h-5 w-5 text-accent" /> Recommended Funding Types
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fundingTypes.map((fund, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-xl border border-border bg-background p-5 hover:shadow-card transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <fund.icon className="h-6 w-6 text-primary" />
                  <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-bold text-secondary">
                    {fund.match} match
                  </span>
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
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 rounded-xl bg-hero p-6 shadow-card"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/20">
                <MessageSquare className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-primary-foreground">Need help?</h3>
                <p className="text-sm text-primary-foreground/70">
                  Chat with our AI assistant to understand your scores, get tips, or ask about funding.
                </p>
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
