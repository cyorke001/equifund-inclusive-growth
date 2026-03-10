import { motion } from "framer-motion";
import { Heart, Users, Shield, Target, Globe2, Building2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import heroImg from "@/assets/hero-entrepreneurs.jpg";
import communityImg from "@/assets/community-impact.jpg";

const values = [
  { icon: Heart, title: "Equity First", desc: "Every feature is designed to level the playing field for underserved entrepreneurs." },
  { icon: Shield, title: "Transparency", desc: "Scores, recommendations, and decisions are always explainable and understandable." },
  { icon: Users, title: "Community", desc: "We measure success by the impact on real communities, not just transactions." },
  { icon: Target, title: "Empowerment", desc: "We build tools that help people help themselves, with dignity and confidence." },
  { icon: Globe2, title: "Inclusion", desc: "Language, culture, and background should never be barriers to opportunity." },
  { icon: Building2, title: "Trust", desc: "Financial institutions can rely on data-driven, unbiased, structured insights." },
];

const AboutPage = () => (
  <main id="main-content">
    <section className="bg-hero py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-4xl font-bold font-heading text-primary-foreground md:text-5xl">
            About EquiFund
          </h1>
          <p className="mt-5 text-lg text-primary-foreground/80 leading-relaxed">
            EquiFund is a funding intelligence platform built to make entrepreneurship more accessible and financial decision-making more informed, fair, and transparent.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading badge="Our Mission" title="Why We Built EquiFund" align="left" />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Too many capable entrepreneurs — especially Black, immigrant, and minority business owners — face systemic barriers when seeking funding. The process is confusing, the criteria are opaque, and the outcome often feels predetermined.
              </p>
              <p>
                At the same time, financial institutions lack the tools to see the full picture. Traditional credit scoring misses market potential, community impact, and founder readiness.
              </p>
              <p>
                EquiFund bridges this gap. We help entrepreneurs prepare stronger applications and give lenders deeper, more contextual insights — creating a funding ecosystem that works better for everyone.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src={heroImg}
              alt="Diverse entrepreneurs collaborating in a modern workspace"
              className="rounded-2xl shadow-elevated w-full object-cover max-h-[400px]"
            />
          </motion.div>
        </div>
      </div>
    </section>

    <section className="bg-warm py-16 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeading badge="Our Values" title="What Drives Us" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6 shadow-soft"
            >
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
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <img
              src={communityImg}
              alt="Diverse community of small business owners at a local marketplace"
              className="rounded-2xl shadow-elevated w-full object-cover max-h-[400px]"
            />
          </motion.div>
          <div>
            <SectionHeading badge="Who We Serve" title="Built for Two Audiences" align="left" />
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="font-heading font-semibold text-foreground">Entrepreneurs</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  First-time founders, immigrant entrepreneurs, and minority business owners who need clear, supportive guidance through the funding process.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="font-heading font-semibold text-foreground">Financial Institutions</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Banks, credit unions, and lenders who want deeper insights, structured profiles, and more transparent decision-making tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default AboutPage;
