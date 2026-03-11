import { AlertTriangle, Shield, FileWarning, AlertCircle, TrendingDown, MapPin } from "lucide-react";
import { mockApplicants, mockAlerts } from "./mockData";

const RiskMonitoringSection = () => {
  const highRisk = mockApplicants.filter(a => a.risk === "high");
  const lowDoc = mockApplicants.filter(a => a.docCompletion < 60);
  const flaggedApps = mockApplicants.filter(a => a.flags.length > 0);

  // Sector concentration
  const industryCounts = mockApplicants.reduce((acc, a) => { acc[a.industry] = (acc[a.industry] || 0) + 1; return acc; }, {} as Record<string, number>);
  const maxConcentration = Math.max(...Object.values(industryCounts));
  const concentratedIndustry = Object.entries(industryCounts).find(([, v]) => v === maxConcentration)?.[0] || "";

  const severityStyles: Record<string, string> = {
    critical: "bg-destructive text-destructive-foreground",
    high: "bg-accent text-accent-foreground",
    medium: "bg-primary/20 text-primary",
    low: "bg-muted text-muted-foreground",
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-heading font-bold text-foreground">Risk Monitoring</h2>

      {/* Risk Summary Cards */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "High-Risk Applications", value: highRisk.length, icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
          { label: "Incomplete Documentation", value: lowDoc.length, icon: FileWarning, color: "text-accent", bg: "bg-accent/10" },
          { label: "Flagged Submissions", value: flaggedApps.length, icon: AlertCircle, color: "text-primary", bg: "bg-primary/10" },
          { label: "Sector Concentration", value: `${concentratedIndustry} (${maxConcentration})`, icon: MapPin, color: "text-muted-foreground", bg: "bg-muted" },
        ].map((card, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${card.bg} mb-2`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
            <p className="text-lg font-bold font-heading text-foreground">{card.value}</p>
            <p className="text-[11px] text-muted-foreground">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Risk Heatmap-style bars */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" /> Applicant Risk Overview
        </h3>
        <div className="space-y-2">
          {mockApplicants.sort((a, b) => b.score - a.score).map(app => {
            const riskWidth = app.risk === "high" ? 90 : app.risk === "medium" ? 55 : 25;
            return (
              <div key={app.id} className="flex items-center gap-3">
                <span className="text-xs font-medium text-foreground w-40 truncate">{app.name}</span>
                <div className="flex-1 h-4 rounded-full bg-muted overflow-hidden relative">
                  <div
                    className={`h-full rounded-full ${app.risk === "high" ? "bg-destructive" : app.risk === "medium" ? "bg-accent" : "bg-secondary"}`}
                    style={{ width: `${riskWidth}%` }}
                  />
                  {/* Pattern overlay for colorblind */}
                  {app.risk === "high" && (
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 4px)" }} />
                  )}
                </div>
                <span className={`text-[10px] font-semibold capitalize w-16 text-right ${
                  app.risk === "high" ? "text-destructive" : app.risk === "medium" ? "text-accent" : "text-secondary"
                }`}>
                  {app.risk === "high" ? "⚠ " : app.risk === "medium" ? "◆ " : "● "}{app.risk}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* All Alerts */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-destructive" /> All Risk Alerts
        </h3>
        <div className="space-y-2">
          {mockAlerts.map(alert => (
            <div key={alert.id} className="flex items-start gap-3 rounded-lg border border-border bg-muted/20 px-4 py-3">
              <span className={`mt-0.5 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${severityStyles[alert.severity]}`}>
                {alert.severity}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground">{alert.applicantName}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{alert.message}</p>
              </div>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap">{alert.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskMonitoringSection;
