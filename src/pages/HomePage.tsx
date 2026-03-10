import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, TrendingUp, Users, Globe2, Building2, Shield, BarChart3,
  Lightbulb, Target, Heart, MapPin, Zap, Eye, BookOpen, DollarSign,
  Briefcase, LineChart, Award, CheckCircle2, Newspaper, ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import SectionHeading from "@/components/SectionHeading";
import heroImg from "@/assets/hero-entrepreneurs.jpg";
import entrepreneurImg from "@/assets/entrepreneur-woman.jpg";
import lenderImg from "@/assets/lender-meeting.jpg";

const stats = [
  { icon: Users, value: 130000, suffix: "+", label: "Black business owners in Canada", source: "Statistics Canada, 2021 Census" },
  { icon: MapPin, value: 68, suffix: "%", label: "Black businesses concentrated in Ontario & Quebec", source: "Statistics Canada" },
  { icon: Globe2, value: 33, suffix: "%", label: "Of Canadian SMEs are immigrant-owned", source: "ISED, 2022" },
  { icon: TrendingUp, value: 42, suffix: "%", label: "Immigrant-led SMEs that export", source: "Statistics Canada, Survey on Financing" },
  { icon: Building2, value: 24, suffix: "%", label: "Visible-minority SMEs requested financing", source: "Survey on Financing of SMEs, 2020" },
  { icon: BarChart3, value: 79, suffix: "%", label: "Approval rate for visible-minority SME financing", source: "Statistics Canada" },
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
  { category: "Small Business", title: "Canada Expands Small Business Financing Program", summary: "New federal initiative aims to improve access to capital for underserved entrepreneurs.", source: "Financial Post", date: "Mar 8, 2026" },
  { category: "Lending", title: "Credit Unions See Record Growth in Community Lending", summary: "Local credit unions report 18% increase in small business loans to minority-owned enterprises.", source: "Globe & Mail", date: "Mar 7, 2026" },
  { category: "Grants", title: "Black Entrepreneurship Program Awards $50M in New Funding", summary: "Third round of the national program focuses on technology and service-based businesses.", source: "BNN Bloomberg", date: "Mar 6, 2026" },
  { category: "Interest Rates", title: "Bank of Canada Holds Rates Steady at 3.25%", summary: "Decision provides stability for small business borrowers planning expansion.", source: "Reuters", date: "Mar 5, 2026" },
];

const HomePage = () => (
  <main id="main-content">
    {/* Hero */}
    <section className="relative overflow-hidden bg-hero py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-4 inline-block rounded-full bg-secondary/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
              Funding Intelligence Platform
            </span>
            <h1 className="text-4xl font-bold leading-tight text-primary-foreground font-heading md:text-5xl lg:text-6xl">
              Smarter Funding Decisions for{" "}
              <span className="text-gradient-hero">Inclusive Entrepreneurship</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-primary-foreground/80">
              A platform helping minority entrepreneurs prepare for funding — while helping financial institutions evaluate opportunities more fairly and effectively.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/get-started">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Explore How It Works
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <img
              src={heroImg}
              alt="Diverse entrepreneurs collaborating around a table in a modern office"
              className="rounded-2xl shadow-elevated w-full object-cover max-h-[420px]"
            />
            {/* Floating stat card */}
            <div className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-card p-4 shadow-elevated md:-bottom-6 md:-left-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Readiness Score</p>
                  <p className="text-2xl font-bold font-heading text-secondary">82/100</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          badge="Canada-Wide Data"
          title="The Landscape of Minority Entrepreneurship"
          description="Real, source-backed data showing the state of minority business ownership and financing in Canada."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>

    {/* For Entrepreneurs */}
    <section className="bg-warm py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              badge="For Entrepreneurs"
              title="Your Funding Journey, Simplified"
              description="EquiFund guides you through every step — from understanding your readiness to getting matched with the right opportunities."
              align="left"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {forEntrepreneurs.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-border bg-card p-5 shadow-soft"
                >
                  <item.icon className="mb-3 h-5 w-5 text-secondary" aria-hidden="true" />
                  <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <img
              src={entrepreneurImg}
              alt="A confident Black woman entrepreneur in her small business"
              className="rounded-2xl shadow-elevated w-full object-cover max-h-[500px]"
            />
          </motion.div>
        </div>
      </div>
    </section>

    {/* For Financial Institutions */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <img
              src={lenderImg}
              alt="Professional meeting between a lender and entrepreneur"
              className="rounded-2xl shadow-elevated w-full object-cover max-h-[500px]"
            />
          </motion.div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              badge="For Financial Institutions"
              title="Better Data, Better Decisions"
              description="EquiFund provides structured profiles, contextual insights, and AI-supported analytics to help your institution make more informed, transparent funding decisions."
              align="left"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {forLenders.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-border bg-card p-5 shadow-soft"
                >
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

    {/* Why This Matters */}
    <section className="bg-primary py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <SectionHeading
          badge="Why This Matters"
          title="Inclusive Funding Creates Stronger Economies"
          description="When minority entrepreneurs get fair access to capital, entire communities benefit — more jobs, stronger local economies, and reduced structural gaps."
        />
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {[
            { icon: Zap, value: "2.6×", label: "Job creation multiplier in underserved communities" },
            { icon: TrendingUp, value: "47%", label: "Higher business survival with proper funding support" },
            { icon: Heart, value: "$4.7B", label: "Potential GDP impact from closing the funding gap" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 p-6"
            >
              <item.icon className="mx-auto mb-3 h-8 w-8 text-secondary" />
              <p className="text-3xl font-bold font-heading text-primary-foreground">{item.value}</p>
              <p className="mt-2 text-sm text-primary-foreground/70">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* What EquiFund Sees That Others Miss */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          badge="Beyond Credit Scores"
          title="What EquiFund Sees That Others Miss"
          description="Traditional lending looks at credit scores alone. EquiFund analyzes the full picture."
        />
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-4">
          {beyondCredit.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 shadow-soft"
            >
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
        <SectionHeading
          badge="Human-Centered Design"
          title="Built for Real People"
          description="EquiFund is designed for first-time entrepreneurs, newcomers, and communities that have historically been underserved."
        />
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          {[
            { icon: BookOpen, title: "Plain-Language Onboarding", desc: "No jargon. Every step is explained clearly." },
            { icon: Globe2, title: "Multilingual Guidance", desc: "Navigate the platform in English, French, Amharic, Somali, Arabic, or Spanish." },
            { icon: Shield, title: "Lender-Ready Summaries", desc: "Your story translated into the language lenders understand." },
            { icon: Building2, title: "Verified Institution Access", desc: "Only approved financial institutions can access the lender dashboard." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
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

    {/* Financial News */}
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          badge="Stay Informed"
          title="Financial News & Market Headlines"
          description="Curated updates on small business financing, lending, grants, and economic policy."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {newsItems.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-xl border border-border bg-card p-5 shadow-soft hover:shadow-card transition-shadow"
            >
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {item.category}
              </span>
              <h3 className="mt-3 font-heading font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>{item.source}</span>
                <span>{item.date}</span>
              </div>
              <button className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                Read More <ExternalLink className="h-3 w-3" />
              </button>
            </motion.article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" className="gap-2">
            <Newspaper className="h-4 w-4" /> View All News
          </Button>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-hero py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold font-heading text-primary-foreground md:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/80">
            Whether you're an entrepreneur preparing for funding or a financial institution looking for better insights — EquiFund is here for you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/get-started">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold gap-2">
                Start as Entrepreneur <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Institution Login
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </main>
);

export default HomePage;
