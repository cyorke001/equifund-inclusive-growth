import { motion } from "framer-motion";
import CountUp from "react-countup";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  source: string;
  delay?: number;
}

const StatCard = ({ icon: Icon, value, suffix = "", prefix = "", label, source, delay = 0 }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elevated transition-shadow"
  >
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
        <Icon className="h-5 w-5 text-secondary" aria-hidden="true" />
      </div>
      <div>
        <p className="text-3xl font-bold font-heading text-foreground">
          {prefix}
          <CountUp end={value} duration={2} enableScrollSpy scrollSpyOnce />
          {suffix}
        </p>
        <p className="mt-1 text-sm font-medium text-foreground">{label}</p>
        <p className="mt-1 text-xs text-muted-foreground">{source}</p>
      </div>
    </div>
  </motion.div>
);

export default StatCard;
