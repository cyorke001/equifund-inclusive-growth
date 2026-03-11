import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, TrendingUp, Users, Globe2, Building2, Shield, BarChart3,
  Lightbulb, Target, Heart, MapPin, Zap, Eye, BookOpen, DollarSign,
  Briefcase, LineChart, Award, CheckCircle2, ExternalLink,
  AlertTriangle, XCircle, Wallet, PiggyBank, Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImg from "@/assets/hero-entrepreneurs.jpg";
import entrepreneurImg from "@/assets/entrepreneur-woman.jpg";
import lenderImg from "@/assets/lender-meeting.jpg";

const barrierStats = [
  {
    icon: XCircle,
    value: "2×",
    label: "Black entrepreneurs were twice as likely to be denied a bank loan — 30% vs 15% for non-Black peers.",
    source: "Statistics Canada, Black Entrepreneurship Survey",
    color: "text-equi-barrier",
  },
  {
    icon: AlertTriangle,
    value: "55%",
    label: "Of Black business owners were denied a bank loan at least once when starting their business.",
    source: "Canadian Black Chamber of Commerce",
    color: "text-equi-barrier",
  },
  {
    icon: Users,
    value: "78.5%",
    label: "Of Black female entrepreneurs cited access to financing as a major obstacle.",
    source: "Black Business & Professional Association",
    color: "text-equi-barrier",
  },
  {
    icon: PiggyBank,
    value: "~80%",
    label: "Of Black entrepreneurs relied on personal savings as their main source of startup funding.",
    source: "Statistics Canada, Survey on Financing",
    color: "text-accent",
  },
  {
    icon: Scale,
    value: "$191K vs $618K",
    label: "Average business capital held by Black-owned vs White-owned businesses — a 3.2× gap.",
    source: "Statistics Canada, Census of Population",
    color: "text-equi-barrier",
  },
  {
    icon: Wallet,
    value: "1.3% vs 2.3%",
    label: "Entrepreneurship rate among Black adults vs all Canadian adults — nearly half.",
    source: "Statistics Canada, 2021 Census",
    color: "text-accent",
  },
];

const forEntrepreneurs = [
  { icon: Target, title: "Funding Readiness Score", desc: "Understand exactly where you stand and what lenders look for." },
  { icon: Lightbulb, title: "Smart Recommendations", desc: "Get matched with the right funding type for your stage." },
  { icon: CheckCircle2, title: "Improvement Checklist", desc: "Clear steps to strengthen your application before you apply." },
  { icon: BookOpen, title: "Lender-Ready Summary", desc: "Your profile translated into the language banks understand." },
];

const forLenders = [
  { icon: BarChart3, title: "Structured Profiles", desc: "Review standardized, AI-analyzed business profiles." },
  { icon: Eye, title: "Contextual Insights", desc: "See market demand, location context, and community impact." },
  { icon: Shield, title: "Risk & Opportunity Scores", desc: "Data-driven indicators beyond traditional credit scores." },
  { icon: Briefcase, title: "Portfolio Comparison", desc: "Compare opportunities aligned with your institution's criteria." },
];

const beyondCredit = [
  { icon: TrendingUp, label: "Market Demand" },
  { icon: MapPin, label: "Location Context" },
  { icon: LineChart, label: "Industry Trends" },
  { icon: Building2, label: "Ecosystem Support" },
  { icon: Heart, label: "Community Impact" },
  { icon: Award, label: "Founder Readiness" },
  { icon: DollarSign, label: "Lender Criteria" },
];

const newsItems = [
  {
    category: "Small Business",
    title: "Canada Expands Small Business Financing Program",
    summary: "New federal initiative aims to improve access to capital for underserved entrepreneurs across Canada.",
    source: "Government of Canada",
    date: "2026",
    url: "https://ised-isde.canada.ca/site/sme-research-statistics/en",
  },
  {
    category: "Lending",
    title: "Credit Unions See Record Growth in Community Lending",
    summary: "Community-based financial institutions report increased small business lending to minority-owned enterprises.",
    source: "CCUA",
    date: "2026",
    url: "https://ccua.com/",
  },
  {
    category: "Grants",
    title: "Black Entrepreneurship Program Awards New Funding",
    summary: "The national program continues to focus on technology and service-based businesses led by Black entrepreneurs.",
    source: "Government of Canada",
    date: "2026",
    url: "https://ised-isde.canada.ca/site/black-entrepreneurship-program/en",
  },
  {
    category: "Research",
    title: "Survey on Financing and Growth of SMEs",
    summary: "Latest data on how small and medium enterprises access capital, with breakdowns by demographic group.",
    source: "Statistics Canada",
    date: "2026",
    url: "https://www.ic.gc.ca/eic/site/061.nsf/eng/h_03090.html",
  },
];

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <span className="mb-4 inline-block rounded-full bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
                {t("home.badge") || "Funding Intelligence Platform"}
              </span>
              <h1 className="text-4xl font-bold leading-tight text-primary-foreground font-heading md:text-5xl lg:text-6xl">
                {t("home.heroTitle") || "Smarter Funding Decisions for"}{" "}
                <span className="text-gradient-hero">{t("home.heroHighlight") || "Inclusive Entrepreneurship"}</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-primary-foreground/90">
                {t("home.heroDesc") || "A platform helping minority entrepreneurs prepare for funding — while helping financial institutions evaluate opportunities more fairly and effectively."}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/get-started">
                  <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold gap-2">
                    {t("nav.getStarted")} <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button size="lg" variant="hero-outline">
                    {t("home.exploreHow") || "Explore How It Works"}
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
              <img src={heroImg} alt="Diverse entrepreneurs collaborating around a table in a modern office" className="rounded-2xl shadow-elevated w-full object-cover max-h-[420px]" />
              <div className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-card p-4 shadow-elevated md:-bottom-6 md:-left-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10">
                    <TrendingUp className="h-5 w-5 text-secondary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t("home.readinessScore") || "Readiness Score"}</p>
                    <p className="text-2xl font-bold font-heading text-secondary">82/100</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Funding Barrier Stats */}
      <section className="py-16 md:py-20" aria-labelledby="barriers-heading">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge={t("home.barrierBadge") || "The Barriers Are Real"}
            title={t("home.barrierTitle") || "What the Funding Gap Looks Like"}
            description={t("home.barrierDesc") || "Evidence-based data showing the structural barriers Black entrepreneurs face when seeking business funding in Canada."}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {barrierStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elevated transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-destructive/8">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-heading text-foreground">{stat.value}</p>
                    <p className="mt-1.5 text-sm text-foreground leading-snug">{stat.label}</p>
                    <p className="mt-1.5 text-xs text-muted-foreground">{stat.source}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Explanatory paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mt-8 max-w-3xl rounded-xl border border-accent/20 bg-accent/5 p-6"
          >
            <p className="text-sm text-foreground leading-relaxed text-center">
              <strong className="text-foreground">{t("home.barrierNote") || "These are structural barriers, not evidence of weaker ideas or businesses."}</strong>{" "}
              {t("home.barrierExplain") || "Traditional lending processes can over-rely on credit history, collateral, and existing financial relationships, while overlooking business potential, market demand, and community impact. EquiFund exists to change that."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* For Entrepreneurs */}
      <section className="bg-warm py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading badge={t("home.forEntBadge") || "For Entrepreneurs"} title={t("home.forEntTitle") || "Your Funding Journey, Simplified"} description={t("home.forEntDesc") || "EquiFund guides you through every step — from understanding your readiness to getting matched with the right opportunities."} align="left" />
              <div className="grid gap-4 sm:grid-cols-2">
                {forEntrepreneurs.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="rounded-xl border border-border bg-card p-5 shadow-soft">
                    <item.icon className="mb-3 h-5 w-5 text-secondary" aria-hidden="true" />
                    <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <img src={entrepreneurImg} alt="A confident Black woman entrepreneur in her small business" className="rounded-2xl shadow-elevated w-full object-cover max-h-[500px]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* For Financial Institutions */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="order-2 lg:order-1">
              <img src={lenderImg} alt="Professional meeting between a lender and entrepreneur" className="rounded-2xl shadow-elevated w-full object-cover max-h-[500px]" />
            </motion.div>
            <div className="order-1 lg:order-2">
              <SectionHeading badge={t("home.forLendBadge") || "For Financial Institutions"} title={t("home.forLendTitle") || "Better Data, Better Decisions"} description={t("home.forLendDesc") || "EquiFund provides structured profiles, contextual insights, and AI-supported analytics to help your institution make more informed, transparent funding decisions."} align="left" />
              <div className="grid gap-4 sm:grid-cols-2">
                {forLenders.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="rounded-xl border border-border bg-card p-5 shadow-soft">
                    <item.icon className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
                    <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters - DARK section */}
      <section className="bg-primary py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading
            badge={t("home.whyBadge") || "Why This Matters"}
            title={t("home.whyTitle") || "Inclusive Funding Creates Stronger Economies"}
            description={t("home.whyDesc") || "When minority entrepreneurs get fair access to capital, entire communities benefit — more jobs, stronger local economies, and reduced structural gaps."}
            dark
          />
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              { icon: Zap, value: "2.6×", label: t("home.whyStat1") || "Job creation multiplier in underserved communities" },
              { icon: TrendingUp, value: "47%", label: t("home.whyStat2") || "Higher business survival with proper funding support" },
              { icon: Heart, value: "$4.7B", label: t("home.whyStat3") || "Potential GDP impact from closing the funding gap" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 p-6">
                <item.icon className="mx-auto mb-3 h-8 w-8 text-primary-foreground" aria-hidden="true" />
                <p className="text-3xl font-bold font-heading text-primary-foreground">{item.value}</p>
                <p className="mt-2 text-sm text-primary-foreground/80">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Credit Scores */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeading badge={t("home.beyondBadge") || "Beyond Credit Scores"} title={t("home.beyondTitle") || "What EquiFund Sees That Others Miss"} description={t("home.beyondDesc") || "Traditional lending looks at credit scores alone. EquiFund analyzes the full picture."} />
          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-4">
            {beyondCredit.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 shadow-soft">
                <item.icon className="h-5 w-5 text-secondary" aria-hidden="true" />
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for Real People */}
      <section className="bg-warm py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeading badge={t("home.builtBadge") || "Human-Centered Design"} title={t("home.builtTitle") || "Built for Real People"} description={t("home.builtDesc") || "EquiFund is designed for first-time entrepreneurs, newcomers, and communities that have historically been underserved."} />
          <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
            {[
              { icon: BookOpen, title: t("home.builtItem1Title") || "Plain-Language Onboarding", desc: t("home.builtItem1Desc") || "No jargon. Every step is explained clearly." },
              { icon: Globe2, title: t("home.builtItem2Title") || "Multilingual Guidance", desc: t("home.builtItem2Desc") || "Navigate the platform in English, French, Amharic, Somali, Arabic, or Spanish." },
              { icon: Shield, title: t("home.builtItem3Title") || "Lender-Ready Summaries", desc: t("home.builtItem3Desc") || "Your story translated into the language lenders understand." },
              { icon: Building2, title: t("home.builtItem4Title") || "Verified Institution Access", desc: t("home.builtItem4Desc") || "Only approved financial institutions can access the lender dashboard." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-soft">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial News — real links */}
      <section className="py-16 md:py-20" aria-labelledby="news-heading">
        <div className="container mx-auto px-4">
          <SectionHeading badge={t("home.newsBadge") || "Stay Informed"} title={t("home.newsTitle") || "Financial News & Resources"} description={t("home.newsDesc") || "Curated resources on small business financing, lending, grants, and economic policy."} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {newsItems.map((item, i) => (
              <motion.article key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group rounded-xl border border-border bg-card p-5 shadow-soft hover:shadow-card transition-shadow">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{item.category}</span>
                <h3 className="mt-3 font-heading font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{item.source}</span>
                  <span>{item.date}</span>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  aria-label={`Read full article: ${item.title}`}
                >
                  {t("home.readOnSource") || "Read on source site"} <ExternalLink className="h-3 w-3" />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-hero py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold font-heading text-primary-foreground md:text-4xl">
              {t("home.ctaTitle") || "Ready to Get Started?"}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/90">
              {t("home.ctaDesc") || "Whether you're an entrepreneur preparing for funding or a financial institution looking for better insights — EquiFund is here for you."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/get-started">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold gap-2">
                  {t("home.ctaEntrepreneur") || "Start as Entrepreneur"} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="hero-outline">
                  {t("home.ctaInstitution") || "Institution Login"}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
