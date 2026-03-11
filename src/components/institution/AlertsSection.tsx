import { useState } from "react";
import { CheckCircle2, Bell } from "lucide-react";
import { mockAlerts, Alert } from "./mockData";

const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
const severityStyles: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-amber-100 text-amber-800",
  medium: "bg-blue-100 text-blue-800",
  low: "bg-gray-100 text-gray-600",
};
const typeLabels: Record<string, string> = {
  missing_docs: "Missing Docs", high_risk: "High Risk", stale: "Stale App",
  inconsistent: "Inconsistent", policy_violation: "Policy Issue", incomplete: "Incomplete",
};

const AlertsSection = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filterSeverity, setFilterSeverity] = useState<string>("all");

  const filtered = alerts
    .filter(a => filterSeverity === "all" || a.severity === filterSeverity)
    .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  const unresolvedCount = alerts.filter(a => !a.resolved).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[14px] font-heading font-bold text-inst-card-text flex items-center gap-2">
            <Bell className="h-5 w-5 text-red-500" /> Alerts & Flags
          </h2>
          <p className="text-[11px] text-inst-card-muted mt-0.5">{unresolvedCount} unresolved alert{unresolvedCount !== 1 ? "s" : ""} requiring review</p>
        </div>
        <div className="inst-toggle-group">
          {["all", "critical", "high", "medium", "low"].map(sev => (
            <button key={sev} onClick={() => setFilterSeverity(sev)} className={`inst-toggle-btn text-[10px] capitalize ${filterSeverity === sev ? "inst-toggle-active" : ""}`}>
              {sev}
            </button>
          ))}
        </div>
      </div>

      <div className="inst-card overflow-hidden">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="bg-inst-table-header border-b border-inst-card-border">
              <th className="px-3 py-2.5 text-left font-semibold text-inst-card-muted uppercase tracking-wider">Severity</th>
              <th className="px-3 py-2.5 text-left font-semibold text-inst-card-muted uppercase tracking-wider">Applicant</th>
              <th className="px-3 py-2.5 text-left font-semibold text-inst-card-muted uppercase tracking-wider">Type</th>
              <th className="px-3 py-2.5 text-left font-semibold text-inst-card-muted uppercase tracking-wider">Details</th>
              <th className="px-3 py-2.5 text-center font-semibold text-inst-card-muted uppercase tracking-wider">Date</th>
              <th className="px-3 py-2.5 text-center font-semibold text-inst-card-muted uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(alert => (
              <tr key={alert.id} className={`border-b border-inst-card-border last:border-0 transition-colors ${alert.resolved ? "opacity-40" : "hover:bg-inst-table-hover"}`}>
                <td className="px-3 py-2.5">
                  <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${severityStyles[alert.severity]}`}>
                    {alert.severity}
                  </span>
                </td>
                <td className="px-3 py-2.5 font-semibold text-inst-card-text">{alert.applicantName}</td>
                <td className="px-3 py-2.5">
                  <span className="rounded-md border border-inst-card-border px-1.5 py-0.5 text-[9px] text-inst-card-muted">{typeLabels[alert.type]}</span>
                </td>
                <td className="px-3 py-2.5 text-inst-card-muted max-w-xs truncate">{alert.message}</td>
                <td className="px-3 py-2.5 text-center text-inst-card-muted">{alert.date}</td>
                <td className="px-3 py-2.5 text-center">
                  {!alert.resolved && (
                    <button
                      onClick={() => setAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, resolved: true } : a))}
                      className="inline-flex items-center gap-1 rounded-md border border-inst-card-border px-2 py-1 text-[10px] font-medium text-emerald-600 hover:bg-emerald-50 transition-colors"
                    >
                      <CheckCircle2 className="h-3 w-3" /> Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-[11px] text-inst-card-muted py-8">No alerts matching this filter.</p>
        )}
      </div>
    </div>
  );
};

export default AlertsSection;
