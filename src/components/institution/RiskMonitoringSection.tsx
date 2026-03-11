import { AlertTriangle, Shield, FileWarning, AlertCircle, MapPin } from "lucide-react";
import { mockApplicants, mockAlerts } from "./mockData";

const RiskMonitoringSection = () => {
  const highRisk = mockApplicants.filter(a => a.risk === "high");
  const lowDoc = mockApplicants.filter(a => a.docCompletion < 60);
  const flaggedApps = mockApplicants.filter(a => a.flags.length > 0);

  const industryCounts = mockApplicants.reduce((acc, a) => { acc[a.industry] = (acc[a.industry] || 0) + 1; return acc; }, {} as Record<string, number>);
  const maxConc = Math.max(...Object.values(industryCounts));
  const concIndustry = Object.entries(industryCounts).find(([, v]) => v === maxConc)?.[0] || "";

  const severityStyles: Record<string, string> = {
    critical: "bg-red-100 text-red-800",
    high: "bg-amber-100 text-amber-800",
    medium: "bg-blue-100 text-blue-800",
    low: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="space-y-5">
      {/* Risk summary cards */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "High-Risk Applications", value: highRisk.length, icon: AlertTriangle, accent: "text-red-600", bg: "bg-red-50" },
          { label: "Incomplete Documentation", value: lowDoc.length, icon: FileWarning, accent: "text-amber-600", bg: "bg-amber-50" },
          { label: "Flagged Submissions", value: flaggedApps.length, icon: AlertCircle, accent: "text-blue-600", bg: "bg-blue-50" },
          { label: "Sector Concentration", value: `${concIndustry} (${maxConc})`, icon: MapPin, accent: "text-inst-card-muted", bg: "bg-gray-50" },
        ].map((card, i) => (
          <div key={i} className="inst-card p-4">
            <div className={`flex h-8 w-8 items-center justify-center rounded-md ${card.bg} mb-2`}>
              <card.icon className={`h-4 w-4 ${card.accent}`} />
            </div>
            <p className="text-lg font-bold font-heading text-inst-card-text">{card.value}</p>
            <p className="text-[10px] text-inst-card-muted uppercase tracking-wider">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Risk heatmap */}
      <div className="inst-card p-5">
        <h3 className="text-[12px] font-heading font-semibold text-inst-card-text mb-4 flex items-center gap-2">
          <Shield className="h-4 w-4 text-inst-accent" /> Applicant Risk Matrix
        </h3>
        <div className="overflow-hidden rounded-md border border-inst-card-border">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="bg-inst-table-header border-b border-inst-card-border">
                <th className="px-3 py-2 text-left font-semibold text-inst-card-muted uppercase tracking-wider">Applicant</th>
                <th className="px-3 py-2 text-center font-semibold text-inst-card-muted uppercase tracking-wider">Risk</th>
                <th className="px-3 py-2 text-center font-semibold text-inst-card-muted uppercase tracking-wider">Score</th>
                <th className="px-3 py-2 text-center font-semibold text-inst-card-muted uppercase tracking-wider">Docs</th>
                <th className="px-3 py-2 text-left font-semibold text-inst-card-muted uppercase tracking-wider">Exposure</th>
                <th className="px-3 py-2 text-left font-semibold text-inst-card-muted uppercase tracking-wider">Primary Concern</th>
              </tr>
            </thead>
            <tbody>
              {[...mockApplicants].sort((a, b) => {
                const order = { high: 0, medium: 1, low: 2 };
                return order[a.risk] - order[b.risk];
              }).map(app => (
                <tr key={app.id} className="border-b border-inst-card-border last:border-0 hover:bg-inst-table-hover transition-colors">
                  <td className="px-3 py-2.5">
                    <p className="font-semibold text-inst-card-text">{app.name}</p>
                    <p className="text-[10px] text-inst-card-muted">{app.founder}</p>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <span className={`inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                      app.risk === "high" ? "bg-red-100 text-red-700" : app.risk === "medium" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                    }`}>
                      {app.risk === "high" ? "▲" : app.risk === "medium" ? "◆" : "●"} {app.risk}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-center font-bold text-inst-card-text">{app.score}</td>
                  <td className="px-3 py-2.5 text-center">
                    <div className="flex items-center gap-1 justify-center">
                      <div className="h-1.5 w-10 rounded-full bg-gray-200 overflow-hidden">
                        <div className={`h-full rounded-full ${app.docCompletion >= 80 ? "bg-emerald-500" : app.docCompletion >= 50 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${app.docCompletion}%` }} />
                      </div>
                      <span className="text-[10px] text-inst-card-muted">{app.docCompletion}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 font-medium text-inst-card-text">{app.funding}</td>
                  <td className="px-3 py-2.5 text-inst-card-muted">
                    {app.flags.length > 0 ? app.flags[0] : app.risk === "high" ? "Elevated risk profile" : app.risk === "medium" ? "Moderate indicators" : "Within tolerance"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Risk Alerts */}
      <div className="inst-card p-5">
        <h3 className="text-[12px] font-heading font-semibold text-inst-card-text mb-4 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" /> Active Risk Alerts
        </h3>
        <div className="space-y-2">
          {mockAlerts.map(alert => (
            <div key={alert.id} className="flex items-start gap-3 rounded-md border border-inst-card-border bg-inst-table-header px-4 py-3">
              <span className={`mt-0.5 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${severityStyles[alert.severity]}`}>
                {alert.severity}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-inst-card-text">{alert.applicantName}</p>
                <p className="text-[10px] text-inst-card-muted mt-0.5">{alert.message}</p>
              </div>
              <span className="text-[10px] text-inst-card-muted whitespace-nowrap">{alert.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskMonitoringSection;
