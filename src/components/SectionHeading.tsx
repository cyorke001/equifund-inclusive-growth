import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
}

const SectionHeading = ({ badge, title, description, align = "center", dark = false }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`mb-12 ${align === "center" ? "text-center mx-auto max-w-2xl" : ""}`}
  >
    {badge && (
      <span className={`mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${
        dark ? "bg-primary-foreground/10 text-primary-foreground/80" : "bg-secondary/10 text-secondary"
      }`}>
        {badge}
      </span>
    )}
    <h2 className={`mt-2 text-3xl font-bold font-heading md:text-4xl ${
      dark ? "text-primary-foreground" : "text-foreground"
    }`}>{title}</h2>
    {description && (
      <p className={`mt-4 text-lg leading-relaxed ${
        dark ? "text-primary-foreground/80" : "text-muted-foreground"
      }`}>{description}</p>
    )}
  </motion.div>
);

export default SectionHeading;
