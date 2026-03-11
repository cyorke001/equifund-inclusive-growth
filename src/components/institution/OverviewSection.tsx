import {
  Users, BarChart3, TrendingUp, Clock, ArrowUpRight, ArrowDownRight,
  Target, Shield, Building2, AlertTriangle, CheckCircle2, Briefcase,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockApplicants, mockAlerts, pipelineStages, stageLabels, stageColors } from "./mockData";

const OverviewSection = () => {
  const { t } = useLanguage();
  const total = mockApplicants.length;
  const avgScore = Math.round(mockApplicants.reduce((s, a) => s + a.score, 0) / total);
  const avgOpp = Math.round(mockApplicants.reduce((s, a) => s + a.opportunityScore, 0) / total);
  const pending = mockApplicants.filter(a => ["new", "in_review", "needs_info"].includes(a.status)).length;
  const shortlisted = mockApplicants.filter(a => a.status === "shortlisted").length;
  const highPotential = mockApplicants.filter(a => a.opportunityScore >= 75).length;
  const flagged = mockAlerts.filter(a => !a.resolved).length;
  const totalFunding = mockApplicants.reduce((s, a) => s + a.fundingNum, 0);
  const avgImpact = Math.round(mockApplicants.reduce((s, a) => s + a.communityImpact, 0) / total);
  const avgFit = Math.round(mockApplicants.reduce((s, a) => s + a.lenderFit, 0) / total);

  const summaryCards = [
    { label: t("inst.totalApplicants"), value: total, icon: Users, trend: "+12%", up: true, color: "text-primary" },
    { label: t("inst.pendingReview"), value: pending, icon: Clock, trend: "−2", up: false, color: "text-accent" },
    { label: t("inst.avgReadiness"), value: `${avgScore}/100`, icon: BarChart3, trend: "+5pts", up: true, color: "text-secondary" },
    { label: t("inst.highPotential"), value: highPotential, icon: TrendingUp, trend: "+3", up: true, color: "text-equi-green" },
    { label: "Avg Opportunity", value: `${avgOpp}/100`, icon: Target, trend: "+8pts", up: true, color: "text-equi-sky" },
    { label: "Shortlisted", value: shortlisted, icon: CheckCircle2, trend: "+1", up: true, color: "text-secondary" },
    { label: "Flagged", value: flagged, icon: AlertTriangle, trend: "−1", up: false, color: "text-destructive" },
    { label: "Avg Lender Fit", value: `${avgFit}%`, icon: Shield, trend: "+4%", up: true, color: "text-primary" },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Summary */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider leading-tight">{card.label}</span>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
            <p className="text-xl font-bold font-heading text-foreground">{card.value}</p>
            <span className={`mt-0.5 inline-flex items-center gap-0.5 text-[11px] font-medium ${card.up ? "text-secondary" : "text-destructive"}`}>
              {card.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {card.trend}
            </span>
          </div>
        ))}
      </div>

      {/* Pipeline + Impact Row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Pipeline Summary */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" /> Pipeline Summary
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {pipelineStages.map(stage => {
              const count = mockApplicants.filter(a => a.status === stage).length;
              return (
                <div key={stage} className={`rounded-lg border px-3 py-3 text-center ${stageColors[stage]}`}>
                  <p className="text-lg font-bold font-heading">{count}</p>
                  <p className="text-[10px] font-medium uppercase tracking-wider mt-0.5">{stageLabels[stage]}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-secondary" /> Portfolio Quick View
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Total Funding Requested</span>
              <span className="text-sm font-bold text-foreground">${(totalFunding / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Avg Community Impact</span>
              <span className="text-sm font-bold text-foreground">{avgImpact}/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Criteria-Aligned</span>
              <span className="text-sm font-bold text-foreground">{mockApplicants.filter(a => a.lenderFit >= 70).length}/{total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Fully Documented</span>
              <span className="text-sm font-bold text-foreground">{mockApplicants.filter(a => a.docCompletion >= 90).length}/{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-destructive" /> Recent Alerts
        </h3>
        <div className="space-y-2">
          {mockAlerts.filter(a => !a.resolved).slice(0, 4).map(alert => (
            <div key={alert.id} className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                alert.severity === "critical" ? "bg-destructive text-destructive-foreground" :
                alert.severity === "high" ? "bg-accent text-accent-foreground" :
                "bg-muted text-muted-foreground"
              }`}>!</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground">{alert.applicantName}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{alert.message}</p>
              </div>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap">{alert.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
