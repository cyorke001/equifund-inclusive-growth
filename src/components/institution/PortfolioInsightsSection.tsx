import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid, AreaChart, Area } from "recharts";
import { DollarSign, TrendingUp, BarChart3, PieChart as PieIcon } from "lucide-react";
import { mockApplicants, pipelineStages, stageLabels } from "./mockData";

const COLORS = [
  "hsl(215 55% 30%)", "hsl(150 45% 40%)", "hsl(35 70% 50%)", "hsl(200 60% 45%)",
  "hsl(0 60% 50%)", "hsl(280 50% 45%)", "hsl(340 60% 50%)", "hsl(170 40% 40%)",
];

const PortfolioInsightsSection = () => {
  const total = mockApplicants.length;
  const totalFunding = mockApplicants.reduce((s, a) => s + a.fundingNum, 0);

  const industryData = Object.entries(
    mockApplicants.reduce((acc, a) => { acc[a.industry] = (acc[a.industry] || 0) + a.fundingNum; return acc; }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value: Math.round(value / 1000) })).sort((a, b) => b.value - a.value);

  const geoData = Object.entries(
    mockApplicants.reduce((acc, a) => {
      const prov = a.location.split(", ")[1] || a.location;
      acc[prov] = (acc[prov] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  const riskData = [
    { name: "Low", value: mockApplicants.filter(a => a.risk === "low").length, fill: "hsl(150 50% 45%)" },
    { name: "Medium", value: mockApplicants.filter(a => a.risk === "medium").length, fill: "hsl(35 70% 50%)" },
    { name: "High", value: mockApplicants.filter(a => a.risk === "high").length, fill: "hsl(0 60% 50%)" },
  ];

  const readinessBuckets = [
    { name: "0–40", count: mockApplicants.filter(a => a.score <= 40).length },
    { name: "41–60", count: mockApplicants.filter(a => a.score > 40 && a.score <= 60).length },
    { name: "61–80", count: mockApplicants.filter(a => a.score > 60 && a.score <= 80).length },
    { name: "81–100", count: mockApplicants.filter(a => a.score > 80).length },
  ];

  const pipelineData = pipelineStages.map(stage => ({
    name: stageLabels[stage],
    count: mockApplicants.filter(a => a.status === stage).length,
  }));

  const trendData = [
    { month: "Oct", requested: 120, recommended: 80 },
    { month: "Nov", requested: 250, recommended: 180 },
    { month: "Dec", requested: 200, recommended: 150 },
    { month: "Jan", requested: 350, recommended: 250 },
    { month: "Feb", requested: 480, recommended: 320 },
    { month: "Mar", requested: totalFunding / 1000, recommended: Math.round(totalFunding * 0.7 / 1000) },
  ];

  return (
    <div className="space-y-5">
      {/* Summary KPIs */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Total Requested", value: `$${(totalFunding / 1000).toFixed(0)}K`, icon: DollarSign },
          { label: "Recommended Allocation", value: `$${Math.round(totalFunding * 0.7 / 1000)}K`, icon: TrendingUp },
          { label: "Avg Readiness", value: `${Math.round(mockApplicants.reduce((s, a) => s + a.score, 0) / total)}`, icon: BarChart3 },
          { label: "Avg Opportunity", value: `${Math.round(mockApplicants.reduce((s, a) => s + a.opportunityScore, 0) / total)}`, icon: TrendingUp },
          { label: "Avg Impact", value: `${Math.round(mockApplicants.reduce((s, a) => s + a.communityImpact, 0) / total)}`, icon: PieIcon },
        ].map((c, i) => (
          <div key={i} className="inst-card p-4">
            <div className="flex items-center gap-2 mb-1">
              <c.icon className="h-4 w-4 text-inst-accent" />
              <span className="text-[10px] text-inst-card-muted font-medium uppercase tracking-wider">{c.label}</span>
            </div>
            <p className="text-xl font-bold font-heading text-inst-card-text">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Funding Trend */}
        <div className="inst-card p-5">
          <h3 className="text-[12px] font-heading font-semibold text-inst-card-text mb-4">Capital Flow (Requested vs Recommended, $K)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 92%)" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
              <Area type="monotone" dataKey="requested" stroke="hsl(215 55% 30%)" fill="hsl(215 55% 30% / 0.15)" strokeWidth={2} name="Requested" />
              <Area type="monotone" dataKey="recommended" stroke="hsl(150 50% 45%)" fill="hsl(150 50% 45% / 0.15)" strokeWidth={2} name="Recommended" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Industry Exposure */}
        <div className="inst-card p-5">
          <h3 className="text-[12px] font-heading font-semibold text-inst-card-text mb-4">Funding Exposure by Industry ($K)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={industryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 92%)" />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 9 }} width={110} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
              <Bar dataKey="value" fill="hsl(215 55% 35%)" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution */}
        <div className="inst-card p-5">
          <h3 className="text-[12px] font-heading font-semibold text-inst-card-text mb-4">Portfolio Risk Mix</h3>
          <div className="grid grid-cols-2 gap-4">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={riskData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" paddingAngle={3}>
                  {riskData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col justify-center space-y-3">
              {riskData.map((r, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[11px] text-inst-card-text">
                    <span className="h-3 w-3 rounded" style={{ background: r.fill }} /> {r.name} Risk
                  </span>
                  <span className="text-[12px] font-bold text-inst-card-text">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Readiness + Geography */}
        <div className="inst-card p-5">
          <h3 className="text-[12px] font-heading font-semibold text-inst-card-text mb-4">Readiness Distribution & Geographic Reach</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[9px] font-bold text-inst-card-muted uppercase tracking-wider mb-2">Readiness Scores</p>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={readinessBuckets}>
                  <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} allowDecimals={false} />
                  <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6 }} />
                  <Bar dataKey="count" fill="hsl(200 55% 45%)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <p className="text-[9px] font-bold text-inst-card-muted uppercase tracking-wider mb-2">By Province</p>
              <div className="space-y-2">
                {geoData.map((g, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-[10px] text-inst-card-text">{g.name}</span>
                      <span className="text-[10px] font-bold text-inst-card-text">{g.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                      <div className="h-full rounded-full bg-inst-accent" style={{ width: `${(g.value / total) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioInsightsSection;
