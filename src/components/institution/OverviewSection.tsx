import {
  Users, BarChart3, TrendingUp, Clock, ArrowUpRight, ArrowDownRight,
  Target, Shield, AlertTriangle, CheckCircle2, Briefcase,
  Activity, DollarSign, Eye, ChevronRight,
} from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from "recharts";
import { mockApplicants, mockAlerts, pipelineStages, stageLabels } from "./mockData";

const OverviewSection = () => {
  const total = mockApplicants.length;
  const avgScore = Math.round(mockApplicants.reduce((s, a) => s + a.score, 0) / total);
  const avgOpp = Math.round(mockApplicants.reduce((s, a) => s + a.opportunityScore, 0) / total);
  const inReview = mockApplicants.filter(a => a.status === "in_review").length;
  const shortlisted = mockApplicants.filter(a => a.status === "shortlisted").length;
  const approved = mockApplicants.filter(a => a.status === "approved").length;
  const flagged = mockAlerts.filter(a => !a.resolved).length;
  const totalFunding = mockApplicants.reduce((s, a) => s + a.fundingNum, 0);
  const avgFit = Math.round(mockApplicants.reduce((s, a) => s + a.lenderFit, 0) / total);

  const trendData = [
    { month: "Oct", received: 3, approved: 1 },
    { month: "Nov", received: 5, approved: 2 },
    { month: "Dec", received: 4, approved: 2 },
    { month: "Jan", received: 6, approved: 3 },
    { month: "Feb", received: 8, approved: 3 },
    { month: "Mar", received: total, approved },
  ];

  const pipelineData = pipelineStages.map(stage => ({
    name: stageLabels[stage],
    count: mockApplicants.filter(a => a.status === stage).length,
  }));

  const kpis = [
    { label: "Total Applications", value: total, icon: Users, change: "+12%", up: true },
    { label: "Under Review", value: inReview, icon: Clock, change: "3 active", up: true },
    { label: "Shortlisted", value: shortlisted, icon: CheckCircle2, change: "+1 this week", up: true },
    { label: "Approved", value: approved, icon: Shield, change: "$200K deployed", up: true },
    { label: "Avg Readiness", value: `${avgScore}`, icon: BarChart3, change: "+5 pts", up: true },
    { label: "Avg Opportunity", value: `${avgOpp}`, icon: Target, change: "+8 pts", up: true },
    { label: "Avg Lender Fit", value: `${avgFit}%`, icon: Activity, change: "+4%", up: true },
    { label: "Open Alerts", value: flagged, icon: AlertTriangle, change: "Action needed", up: false },
  ];

  const urgentItems = mockApplicants.filter(a => a.flags.length > 0 || a.risk === "high").slice(0, 5);

  return (
    <div className="space-y-5">
      {/* KPI Grid */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4 xl:grid-cols-8">
        {kpis.map((kpi, i) => (
          <div key={i} className="inst-card p-3.5">
            <div className="flex items-center justify-between mb-2">
              <kpi.icon className="h-4 w-4 text-inst-accent" />
              {kpi.up ? (
                <ArrowUpRight className="h-3 w-3 text-emerald-500" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-500" />
              )}
            </div>
            <p className="text-xl font-bold font-heading text-inst-card-text">{kpi.value}</p>
            <p className="text-[10px] text-inst-card-muted font-medium mt-0.5 uppercase tracking-wider leading-tight">{kpi.label}</p>
            <p className={`text-[10px] mt-1 ${kpi.up ? "text-emerald-600" : "text-red-500"}`}>{kpi.change}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-5">
        {/* Application trend */}
        <div className="lg:col-span-3 inst-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-heading font-semibold text-inst-card-text">Application Volume & Approvals</h3>
            <span className="text-[10px] text-inst-card-muted">Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
              <Line type="monotone" dataKey="received" stroke="hsl(215 65% 35%)" strokeWidth={2} dot={{ r: 3 }} name="Received" />
              <Line type="monotone" dataKey="approved" stroke="hsl(150 50% 45%)" strokeWidth={2} dot={{ r: 3 }} name="Approved" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pipeline stages */}
        <div className="lg:col-span-2 inst-card p-5">
          <h3 className="text-[13px] font-heading font-semibold text-inst-card-text mb-4">Pipeline Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={pipelineData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 90%)" />
              <XAxis type="number" tick={{ fontSize: 10 }} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 9 }} width={70} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
              <Bar dataKey="count" fill="hsl(215 55% 30%)" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row: Portfolio summary + Urgent items */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Portfolio snapshot */}
        <div className="inst-card p-5">
          <h3 className="text-[13px] font-heading font-semibold text-inst-card-text mb-4 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-inst-accent" /> Portfolio Snapshot
          </h3>
          <div className="space-y-3">
            {[
              { label: "Total Capital Requested", value: `$${(totalFunding / 1000).toFixed(0)}K` },
              { label: "Criteria-Aligned", value: `${mockApplicants.filter(a => a.lenderFit >= 70).length} of ${total}` },
              { label: "Fully Documented", value: `${mockApplicants.filter(a => a.docCompletion >= 90).length} of ${total}` },
              { label: "High-Risk Exposure", value: `${mockApplicants.filter(a => a.risk === "high").length} applicants` },
              { label: "Avg Community Impact", value: `${Math.round(mockApplicants.reduce((s, a) => s + a.communityImpact, 0) / total)}/100` },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-inst-card-border last:border-0">
                <span className="text-[11px] text-inst-card-muted">{row.label}</span>
                <span className="text-[12px] font-semibold text-inst-card-text">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Requires Attention */}
        <div className="lg:col-span-2 inst-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[13px] font-heading font-semibold text-inst-card-text flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> Requires Attention
            </h3>
            <span className="text-[10px] text-inst-card-muted">{urgentItems.length} items</span>
          </div>
          <div className="overflow-hidden rounded-md border border-inst-card-border">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="bg-inst-table-header border-b border-inst-card-border">
                  <th className="px-3 py-2 text-left font-semibold text-inst-card-muted uppercase tracking-wider">Applicant</th>
                  <th className="px-3 py-2 text-center font-semibold text-inst-card-muted uppercase tracking-wider">Score</th>
                  <th className="px-3 py-2 text-center font-semibold text-inst-card-muted uppercase tracking-wider">Risk</th>
                  <th className="px-3 py-2 text-left font-semibold text-inst-card-muted uppercase tracking-wider">Issue</th>
                </tr>
              </thead>
              <tbody>
                {urgentItems.map(app => (
                  <tr key={app.id} className="border-b border-inst-card-border last:border-0 hover:bg-inst-table-hover transition-colors">
                    <td className="px-3 py-2.5">
                      <p className="font-semibold text-inst-card-text">{app.name}</p>
                      <p className="text-[10px] text-inst-card-muted">{app.founder}</p>
                    </td>
                    <td className="px-3 py-2.5 text-center font-bold text-inst-card-text">{app.score}</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                        app.risk === "high" ? "bg-red-100 text-red-700" : app.risk === "medium" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                      }`}>
                        {app.risk === "high" ? "▲" : app.risk === "medium" ? "◆" : "●"} {app.risk}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-inst-card-muted">
                      {app.flags.length > 0 ? app.flags[0] : "Elevated risk level"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
