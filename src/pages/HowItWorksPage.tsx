import { motion } from "framer-motion";
import {
  UserPlus, ClipboardList, BarChart3, Lightbulb, FileDown,
  KeyRound, Building2, Settings, Search, Brain, ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorksPage = () => {
  const { t } = useLanguage();

  const entrepreneurSteps = [
    { icon: UserPlus, title: t("how.entStep1"), desc: t("how.entStep1Desc") },
    { icon: ClipboardList, title: t("how.entStep2"), desc: t("how.entStep2Desc") },
    { icon: BarChart3, title: t("how.entStep3"), desc: t("how.entStep3Desc") },
    { icon: Lightbulb, title: t("how.entStep4"), desc: t("how.entStep4Desc") },
    { icon: FileDown, title: t("how.entStep5"), desc: t("how.entStep5Desc") },
  ];

  const lenderSteps = [
    { icon: KeyRound, title: t("how.lendStep1"), desc: t("how.lendStep1Desc") },
    { icon: Building2, title: t("how.lendStep2"), desc: t("how.lendStep2Desc") },
    { icon: Settings, title: t("how.lendStep3"), desc: t("how.lendStep3Desc") },
    { icon: Search, title: t("how.lendStep4"), desc: t("how.lendStep4Desc") },
    { icon: Brain, title: t("how.lendStep5"), desc: t("how.lendStep5Desc") },
  ];

  const StepCard = ({ step, index, color }: { step: typeof entrepreneurSteps[0]; index: number; color: "secondary" | "primary" }) => (
    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex gap-5">
      <div className="flex flex-col items-center">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color === "secondary" ? "bg-secondary/10" : "bg-primary/10"}`}>
          <step.icon className={`h-6 w-6 ${color === "secondary" ? "text-secondary" : "text-primary"}`} />
        </div>
        {index < 4 && <div className="mt-2 h-full w-px bg-border" />}
      </div>
      <div className="pb-8">
        <span className={`text-xs font-bold ${color === "secondary" ? "text-secondary" : "text-primary"}`}>{t("how.step")} {index + 1}</span>
        <h3 className="mt-1 font-heading font-semibold text-foreground text-lg">{step.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  );

  return (
    <main id="main-content">
      <section className="bg-hero py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold font-heading text-primary-foreground md:text-5xl">{t("how.title")}</h1>
            <p className="mt-5 text-lg text-primary-foreground/80">{t("how.subtitle")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <SectionHeading badge={t("how.entBadge")} title={t("how.entTitle")} align="left" />
              <div className="mt-8 space-y-0">
                {entrepreneurSteps.map((step, i) => <StepCard key={i} step={step} index={i} color="secondary" />)}
              </div>
              <Link to="/get-started">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 mt-4">
                  {t("how.startJourney")} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div>
              <SectionHeading badge={t("how.lendBadge")} title={t("how.lendTitle")} align="left" />
              <div className="mt-8 space-y-0">
                {lenderSteps.map((step, i) => <StepCard key={i} step={step} index={i} color="primary" />)}
              </div>
              <Link to="/login">
                <Button variant="outline" className="gap-2 mt-4">
                  {t("how.institutionLogin")} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-warm py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading badge={t("how.accessBadge")} title={t("how.accessTitle")} description={t("how.accessDesc")} />
          <div className="mx-auto max-w-md rounded-xl border border-border bg-card p-6 shadow-card">
            <KeyRound className="mx-auto mb-3 h-8 w-8 text-primary" />
            <p className="text-sm text-muted-foreground">{t("how.accessNote")}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HowItWorksPage;
