import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

const SectionHeading = ({ badge, title, description, align = "center" }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`mb-12 ${align === "center" ? "text-center mx-auto max-w-2xl" : ""}`}
  >
    {badge && (
      <span className="mb-3 inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary">
        {badge}
      </span>
    )}
    <h2 className="mt-2 text-3xl font-bold font-heading text-foreground md:text-4xl">{title}</h2>
    {description && (
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{description}</p>
    )}
  </motion.div>
);

export default SectionHeading;
