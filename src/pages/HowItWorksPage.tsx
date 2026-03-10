import { motion } from "framer-motion";
import {
  UserPlus, ClipboardList, BarChart3, Lightbulb, FileDown,
  KeyRound, Building2, Settings, Search, Brain, ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

const entrepreneurSteps = [
  { icon: UserPlus, title: "Create Your Account", desc: "Sign up in minutes. No institution code needed — just your name, email, and you're in." },
  { icon: ClipboardList, title: "Complete Guided Intake", desc: "Our conversational AI assistant walks you through your business details step by step. It's interactive, friendly, and clear." },
  { icon: BarChart3, title: "Receive Readiness Insights", desc: "See your Funding Readiness Score, strengths, risks, and a clear improvement checklist." },
  { icon: Lightbulb, title: "View Recommendations", desc: "Get matched with the best funding types for your stage — loans, grants, investors, or microfinance." },
  { icon: FileDown, title: "Download Lender-Ready Summary", desc: "Your profile, translated into professional language that financial institutions understand." },
];

const lenderSteps = [
  { icon: KeyRound, title: "Enter Institution Token", desc: "Access is restricted. You'll need a verified institution token or invitation code to register." },
  { icon: Building2, title: "Complete Institution Onboarding", desc: "Set up your institution profile with official details and lending focus areas." },
  { icon: Settings, title: "Set Lending Criteria", desc: "Define your preferred industries, risk tolerance, funding range, and strategic priorities." },
  { icon: Search, title: "Review Applications", desc: "Browse structured, AI-analyzed entrepreneur profiles with readiness and opportunity scores." },
  { icon: Brain, title: "Make Informed Decisions", desc: "Use contextual insights, community impact data, and risk analysis to compare opportunities." },
];

const StepCard = ({ step, index, color }: { step: typeof entrepreneurSteps[0]; index: number; color: "secondary" | "primary" }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="flex gap-5"
  >
    <div className="flex flex-col items-center">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color === "secondary" ? "bg-secondary/10" : "bg-primary/10"}`}>
        <step.icon className={`h-6 w-6 ${color === "secondary" ? "text-secondary" : "text-primary"}`} />
      </div>
      {index < 4 && <div className="mt-2 h-full w-px bg-border" />}
    </div>
    <div className="pb-8">
      <div className="flex items-center gap-2">
        <span className={`text-xs font-bold ${color === "secondary" ? "text-secondary" : "text-primary"}`}>Step {index + 1}</span>
      </div>
      <h3 className="mt-1 font-heading font-semibold text-foreground text-lg">{step.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
    </div>
  </motion.div>
);

const HowItWorksPage = () => (
  <main id="main-content">
    <section className="bg-hero py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold font-heading text-primary-foreground md:text-5xl">How EquiFund Works</h1>
          <p className="mt-5 text-lg text-primary-foreground/80">Two journeys, one platform. Whether you're seeking funding or providing it, EquiFund streamlines the process.</p>
        </motion.div>
      </div>
    </section>

    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading badge="Entrepreneurs" title="Your Funding Journey" align="left" />
            <div className="mt-8 space-y-0">
              {entrepreneurSteps.map((step, i) => (
                <StepCard key={i} step={step} index={i} color="secondary" />
              ))}
            </div>
            <Link to="/get-started">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 mt-4">
                Start Your Journey <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div>
            <SectionHeading badge="Financial Institutions" title="Your Review Process" align="left" />
            <div className="mt-8 space-y-0">
              {lenderSteps.map((step, i) => (
                <StepCard key={i} step={step} index={i} color="primary" />
              ))}
            </div>
            <Link to="/login">
              <Button variant="outline" className="gap-2 mt-4">
                Institution Login <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-warm py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <SectionHeading
          badge="Controlled Access"
          title="Lender Access is Verified"
          description="Only approved banks, credit unions, and funding organizations can access the institution side. This protects entrepreneur data and ensures trust on both sides of the platform."
        />
        <div className="mx-auto max-w-md rounded-xl border border-border bg-card p-6 shadow-card">
          <KeyRound className="mx-auto mb-3 h-8 w-8 text-primary" />
          <p className="text-sm text-muted-foreground">
            Financial institutions must provide a valid <strong className="text-foreground">institution token</strong> or <strong className="text-foreground">invitation code</strong> to register. Open public sign-up alone does not grant lender access.
          </p>
        </div>
      </div>
    </section>
  </main>
);

export default HowItWorksPage;
