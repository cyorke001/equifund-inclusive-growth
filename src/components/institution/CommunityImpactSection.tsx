import { Heart, MapPin, Users, Briefcase, TrendingUp, Globe } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { mockApplicants } from "./mockData";

const CommunityImpactSection = () => {
  const avgImpact = Math.round(mockApplicants.reduce((s, a) => s + a.communityImpact, 0) / mockApplicants.length);
  const totalJobs = mockApplicants.reduce((s, a) => s + a.teamSize, 0);
  const projectedJobs = Math.round(totalJobs * 1.8);
  const underservedCount = mockApplicants.filter(a => a.communityImpact >= 80).length;
  const totalFunding = mockApplicants.reduce((s, a) => s + a.fundingNum, 0);

  // Impact by industry
  const industryImpact = Object.entries(
    mockApplicants.reduce((acc, a) => {
      if (!acc[a.industry]) acc[a.industry] = { total: 0, count: 0 };
      acc[a.industry].total += a.communityImpact;
      acc[a.industry].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>)
  ).map(([name, { total, count }]) => ({ name, impact: Math.round(total / count) }))
    .sort((a, b) => b.impact - a.impact);

  // Geographic reach
  const geoData = Object.entries(
    mockApplicants.reduce((acc, a) => {
      const province = a.location.split(", ")[1] || a.location;
      acc[province] = (acc[province] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-heading font-bold text-foreground">Community Impact Intelligence</h2>
      <p className="text-sm text-muted-foreground">Understand how your funding decisions affect communities, jobs, and economic equity.</p>

      {/* Impact KPIs */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Avg Community Impact", value: `${avgImpact}/100`, icon: Heart, color: "text-equi-green" },
          { label: "Projected Jobs Supported", value: projectedJobs, icon: Users, color: "text-primary" },
          { label: "High-Impact Applicants", value: `${underservedCount}/${mockApplicants.length}`, icon: Globe, color: "text-equi-sky" },
          { label: "Total Capital Deployed", value: `$${(totalFunding / 1000).toFixed(0)}K`, icon: Briefcase, color: "text-secondary" },
        ].map((c, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <c.icon className={`h-5 w-5 ${c.color} mb-2`} />
            <p className="text-xl font-bold font-heading text-foreground">{c.value}</p>
            <p className="text-[11px] text-muted-foreground">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Impact by Industry */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-4">Community Impact by Industry</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={industryImpact} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" />
              <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(215 20% 35%)" }} domain={[0, 100]} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "hsl(215 20% 35%)" }} width={100} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              <Bar dataKey="impact" fill="hsl(150 45% 40%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Geographic Reach */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" /> Geographic Reach
          </h3>
          <div className="space-y-3">
            {geoData.map((g, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium text-foreground">{g.name}</span>
                  <span className="text-xs font-bold text-foreground">{g.value} applicant{g.value > 1 ? "s" : ""}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${(g.value / mockApplicants.length) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Equity statement */}
      <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-5">
        <h3 className="text-sm font-heading font-semibold text-foreground mb-2 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-secondary" /> Mission Alignment Summary
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Your current portfolio pipeline shows strong alignment with equity-focused lending goals. {underservedCount} of {mockApplicants.length} applicants
          serve underserved communities with impact scores above 80. Approving high-impact applicants would support an estimated {projectedJobs} jobs
          and direct ${(totalFunding / 1000).toFixed(0)}K in capital to minority-owned businesses.
        </p>
      </div>
    </div>
  );
};

export default CommunityImpactSection;
