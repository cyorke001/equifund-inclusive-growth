import { useState } from "react";
import { AlertTriangle, CheckCircle2, Filter, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockAlerts, Alert } from "./mockData";

const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
const severityStyles: Record<string, string> = {
  critical: "bg-destructive text-destructive-foreground",
  high: "bg-accent text-accent-foreground",
  medium: "bg-primary/20 text-primary",
  low: "bg-muted text-muted-foreground",
};
const typeLabels: Record<string, string> = {
  missing_docs: "Missing Docs",
  high_risk: "High Risk",
  stale: "Stale App",
  inconsistent: "Inconsistent Data",
  policy_violation: "Policy Issue",
  incomplete: "Incomplete",
};

const AlertsSection = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filterSeverity, setFilterSeverity] = useState<string>("all");

  const filtered = alerts
    .filter(a => filterSeverity === "all" || a.severity === filterSeverity)
    .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  const unresolvedCount = alerts.filter(a => !a.resolved).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-heading font-bold text-foreground flex items-center gap-2">
            <Bell className="h-5 w-5 text-destructive" /> Alerts & Flags
          </h2>
          <p className="text-sm text-muted-foreground mt-1">{unresolvedCount} unresolved alert{unresolvedCount !== 1 ? "s" : ""} requiring attention.</p>
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
          {["all", "critical", "high", "medium", "low"].map(sev => (
            <button key={sev} onClick={() => setFilterSeverity(sev)} className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors capitalize ${filterSeverity === sev ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
              {sev === "all" ? "All" : sev}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map(alert => (
          <div key={alert.id} className={`flex items-start gap-3 rounded-xl border px-4 py-3 transition-opacity ${alert.resolved ? "opacity-50 border-border bg-muted/20" : "border-border bg-card shadow-sm"}`}>
            <span className={`mt-0.5 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${severityStyles[alert.severity]}`}>
              {alert.severity}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-xs font-semibold text-foreground">{alert.applicantName}</p>
                <span className="rounded-full border border-border px-2 py-0.5 text-[9px] text-muted-foreground">{typeLabels[alert.type] || alert.type}</span>
              </div>
              <p className="text-xs text-muted-foreground">{alert.message}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-muted-foreground">{alert.date}</span>
              {!alert.resolved && (
                <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1" onClick={() => setAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, resolved: true } : a))}>
                  <CheckCircle2 className="h-3 w-3" /> Resolve
                </Button>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">No alerts matching this filter.</p>
        )}
      </div>
    </div>
  );
};

export default AlertsSection;
