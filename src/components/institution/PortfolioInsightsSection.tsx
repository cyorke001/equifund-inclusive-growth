import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid } from "recharts";
import { TrendingUp, PieChart as PieIcon, BarChart3, DollarSign } from "lucide-react";
import { mockApplicants, pipelineStages, stageLabels } from "./mockData";

const COLORS = [
  "hsl(215 65% 22%)", "hsl(150 45% 40%)", "hsl(35 80% 50%)", "hsl(200 70% 50%)",
  "hsl(0 72% 51%)", "hsl(280 60% 50%)", "hsl(340 70% 50%)",
];

const PortfolioInsightsSection = () => {
  const total = mockApplicants.length;
  const totalFunding = mockApplicants.reduce((s, a) => s + a.fundingNum, 0);

  // Industry distribution
  const industryData = Object.entries(
    mockApplicants.reduce((acc, a) => { acc[a.industry] = (acc[a.industry] || 0) + 1; return acc; }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  // Pipeline by stage
  const pipelineData = pipelineStages.map(stage => ({
    name: stageLabels[stage],
    count: mockApplicants.filter(a => a.status === stage).length,
  }));

  // Risk distribution
  const riskData = [
    { name: "Low", value: mockApplicants.filter(a => a.risk === "low").length },
    { name: "Medium", value: mockApplicants.filter(a => a.risk === "medium").length },
    { name: "High", value: mockApplicants.filter(a => a.risk === "high").length },
  ];
  const RISK_COLORS = ["hsl(150 45% 40%)", "hsl(35 80% 50%)", "hsl(0 72% 51%)"];

  // Readiness distribution
  const readinessRanges = [
    { name: "0-40", count: mockApplicants.filter(a => a.score <= 40).length },
    { name: "41-60", count: mockApplicants.filter(a => a.score > 40 && a.score <= 60).length },
    { name: "61-80", count: mockApplicants.filter(a => a.score > 60 && a.score <= 80).length },
    { name: "81-100", count: mockApplicants.filter(a => a.score > 80).length },
  ];

  // Simulated monthly trend
  const trendData = [
    { month: "Oct", applications: 3, approved: 1 },
    { month: "Nov", applications: 5, approved: 2 },
    { month: "Dec", applications: 4, approved: 2 },
    { month: "Jan", applications: 6, approved: 3 },
    { month: "Feb", applications: 8, approved: 3 },
    { month: "Mar", applications: 10, approved: 4 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-heading font-bold text-foreground">Portfolio Insights</h2>

      {/* Summary row */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Funding Requested", value: `$${(totalFunding / 1000).toFixed(0)}K`, icon: DollarSign },
          { label: "Avg Readiness", value: `${Math.round(mockApplicants.reduce((s, a) => s + a.score, 0) / total)}`, icon: BarChart3 },
          { label: "Avg Opportunity", value: `${Math.round(mockApplicants.reduce((s, a) => s + a.opportunityScore, 0) / total)}`, icon: TrendingUp },
          { label: "Avg Community Impact", value: `${Math.round(mockApplicants.reduce((s, a) => s + a.communityImpact, 0) / total)}`, icon: PieIcon },
        ].map((c, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <c.icon className="h-4 w-4 text-primary" />
              <span className="text-[11px] text-muted-foreground font-medium">{c.label}</span>
            </div>
            <p className="text-2xl font-bold font-heading text-foreground">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Application Trend */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-4">Application Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215 20% 35%)" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215 20% 35%)" }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(214 20% 88%)" }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="applications" stroke="hsl(215 65% 22%)" strokeWidth={2} dot={{ r: 3 }} name="Received" />
              <Line type="monotone" dataKey="approved" stroke="hsl(150 45% 40%)" strokeWidth={2} dot={{ r: 3 }} name="Approved" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Industry Distribution */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-4">Industry Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={industryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {industryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Pipeline by Stage */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-4">Pipeline by Stage</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={pipelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: "hsl(215 20% 35%)" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215 20% 35%)" }} allowDecimals={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="count" fill="hsl(215 65% 22%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk + Readiness */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-4">Risk & Readiness Distribution</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 text-center">Risk Mix</p>
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie data={riskData} cx="50%" cy="50%" outerRadius={55} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {riskData.map((_, i) => <Cell key={i} fill={RISK_COLORS[i]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 text-center">Readiness Range</p>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={readinessRanges}>
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(215 20% 35%)" }} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(215 20% 35%)" }} allowDecimals={false} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                  <Bar dataKey="count" fill="hsl(200 70% 50%)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioInsightsSection;
