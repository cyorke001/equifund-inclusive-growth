import { motion } from "framer-motion";
import { Heart, TrendingUp, Users, Building2, Briefcase, Globe2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import StatCard from "@/components/StatCard";
import communityImg from "@/assets/community-impact.jpg";

const impactStats = [
  { icon: Briefcase, value: 3.2, suffix: "×", label: "Job creation multiplier in funded minority communities", source: "Brookfield Institute" },
  { icon: TrendingUp, value: 47, suffix: "%", label: "Higher business survival with structured support", source: "BDC Research" },
  { icon: Users, value: 1.2, suffix: "M+", label: "SMEs in Canada owned by immigrants", source: "Statistics Canada, 2021" },
  { icon: Building2, value: 68, suffix: "%", label: "Of Black-owned businesses are in Ontario & Quebec", source: "Statistics Canada" },
];

const stories = [
  {
    name: "Amira K.",
    location: "Toronto, ON",
    quote: "I didn't know where to start with funding. EquiFund's guided process helped me understand what lenders actually look for.",
    type: "Immigrant Entrepreneur",
  },
  {
    name: "David O.",
    location: "Montreal, QC",
    quote: "As a Black business owner, I've faced barriers at every turn. This platform made me feel seen and supported.",
    type: "Black Entrepreneur",
  },
  {
    name: "Community Credit Union",
    location: "Vancouver, BC",
    quote: "EquiFund's structured profiles give us a much clearer picture than a credit score alone. It's transformed how we evaluate applications.",
    type: "Financial Institution",
  },
];

const CommunityImpactPage = () => (
  <main id="main-content">
    <section className="bg-hero py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold font-heading text-primary-foreground md:text-5xl">Community Impact</h1>
          <p className="mt-5 text-lg text-primary-foreground/80">
            When minority entrepreneurs get fair access to funding, entire communities grow stronger.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              badge="The Ripple Effect"
              title="Funding One Business Strengthens an Entire Community"
              align="left"
            />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Every funded minority-owned business creates local jobs, strengthens supply chains, and builds community wealth.</p>
              <p>When barriers to funding are reduced, we don't just help one entrepreneur — we lift families, neighborhoods, and entire economies.</p>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <img src={communityImg} alt="Vibrant community marketplace with diverse business owners" className="rounded-2xl shadow-elevated w-full object-cover max-h-[400px]" />
          </motion.div>
        </div>
      </div>
    </section>

    <section className="bg-warm py-16 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeading badge="By the Numbers" title="Impact That Matters" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat, i) => (
            <StatCard key={i} {...stat} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeading badge="Voices" title="Stories from Our Community" />
        <div className="grid gap-6 md:grid-cols-3">
          {stories.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6 shadow-soft"
            >
              <Heart className="mb-3 h-5 w-5 text-secondary" />
              <p className="text-sm italic text-muted-foreground leading-relaxed">"{story.quote}"</p>
              <div className="mt-4 border-t border-border pt-3">
                <p className="font-heading font-semibold text-foreground text-sm">{story.name}</p>
                <p className="text-xs text-muted-foreground">{story.type} • {story.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-primary py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <SectionHeading
          title="Together, We Can Close the Gap"
          description="EquiFund isn't just a platform — it's a movement toward more equitable, transparent, and community-centered financial decision-making."
        />
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-3">
          {[
            { icon: Users, label: "More jobs created" },
            { icon: Globe2, label: "Stronger local economies" },
            { icon: TrendingUp, label: "Higher business survival" },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 p-6 text-center"
            >
              <item.icon className="mx-auto mb-2 h-6 w-6 text-secondary" />
              <p className="text-sm font-medium text-primary-foreground">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default CommunityImpactPage;
