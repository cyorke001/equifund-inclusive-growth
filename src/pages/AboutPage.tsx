import { motion } from "framer-motion";
import { Heart, Users, Shield, Target, Globe2, Building2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImg from "@/assets/hero-entrepreneurs.jpg";
import communityImg from "@/assets/community-impact.jpg";

const AboutPage = () => {
  const { t } = useLanguage();

  const values = [
    { icon: Heart, title: t("about.equity"), desc: t("about.equityDesc") },
    { icon: Shield, title: t("about.transparency"), desc: t("about.transparencyDesc") },
    { icon: Users, title: t("about.community"), desc: t("about.communityDesc") },
    { icon: Target, title: t("about.empowerment"), desc: t("about.empowermentDesc") },
    { icon: Globe2, title: t("about.inclusion"), desc: t("about.inclusionDesc") },
    { icon: Building2, title: t("about.trust"), desc: t("about.trustDesc") },
  ];

  return (
    <main id="main-content">
      <section className="bg-hero py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold font-heading text-primary-foreground md:text-5xl">{t("about.title")}</h1>
            <p className="mt-5 text-lg text-primary-foreground/80 leading-relaxed">{t("about.subtitle")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionHeading badge={t("about.missionBadge")} title={t("about.missionTitle")} align="left" />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{t("about.missionP1")}</p>
                <p>{t("about.missionP2")}</p>
                <p>{t("about.missionP3")}</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src={heroImg} alt="Diverse entrepreneurs collaborating in a modern workspace" className="rounded-2xl shadow-elevated w-full object-cover max-h-[400px]" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-warm py-16 md:py-20">
        <div className="container mx-auto px-4">
          <SectionHeading badge={t("about.valuesBadge")} title={t("about.valuesTitle")} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 shadow-soft">
                <v.icon className="mb-3 h-6 w-6 text-secondary" />
                <h3 className="font-heading font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <img src={communityImg} alt="Diverse community of small business owners at a local marketplace" className="rounded-2xl shadow-elevated w-full object-cover max-h-[400px]" />
            </motion.div>
            <div>
              <SectionHeading badge={t("about.serveBadge")} title={t("about.serveTitle")} align="left" />
              <div className="space-y-6">
                <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                  <h3 className="font-heading font-semibold text-foreground">{t("about.serveEnt")}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t("about.serveEntDesc")}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                  <h3 className="font-heading font-semibold text-foreground">{t("about.serveInst")}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t("about.serveInstDesc")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
