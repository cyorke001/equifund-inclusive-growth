import { Heart, MapPin, Users, Briefcase, TrendingUp, Globe } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { mockApplicants } from "./mockData";

const CommunityImpactSection = () => {
  const avgImpact = Math.round(mockApplicants.reduce((s, a) => s + a.communityImpact, 0) / mockApplicants.length);
  const totalJobs = mockApplicants.reduce((s, a) => s + a.teamSize, 0);
  const projectedJobs = Math.round(totalJobs * 1.8);
  const underservedCount = mockApplicants.filter(a => a.communityImpact >= 80).length;
  const totalFunding = mockApplicants.reduce((s, a) => s + a.fundingNum, 0);

  const industryImpact = Object.entries(
    mockApplicants.reduce((acc, a) => {
      if (!acc[a.industry]) acc[a.industry] = { total: 0, count: 0 };
      acc[a.industry].total += a.communityImpact;
      acc[a.industry].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>)
  ).map(([name, { total, count }]) => ({ name, impact: Math.round(total / count) }))
    .sort((a, b) => b.impact - a.impact);

  const geoData = Object.entries(
    mockApplicants.reduce((acc, a) => {
      const province = a.location.split(", ")[1] || a.location;
      acc[province] = (acc[province] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  return (
    <div className="space-y-5">
      {/* Impact KPIs */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Avg Community Impact", value: `${avgImpact}/100`, icon: Heart, accent: "text-teal-600" },
          { label: "Projected Jobs Supported", value: projectedJobs, icon: Users, accent: "text-inst-accent" },
          { label: "High-Impact Applicants", value: `${underservedCount}/${mockApplicants.length}`, icon: Globe, accent: "text-blue-600" },
          { label: "Total Capital Pipeline", value: `$${(totalFunding / 1000).toFixed(0)}K`, icon: Briefcase, accent: "text-emerald-600" },
        ].map((c, i) => (
          <div key={i} className="inst-card p-4">
            <c.icon className={`h-4 w-4 ${c.accent} mb-2`} />
            <p className="text-xl font-bold font-heading text-inst-card-text">{c.value}</p>
            <p className="text-[10px] text-inst-card-muted uppercase tracking-wider">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Impact by Industry */}
        <div className="inst-card p-5">
          <h3 className="text-[12px] font-heading font-semibold text-inst-card-text mb-4">Impact Score by Industry</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={industryImpact} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 92%)" />
              <XAxis type="number" tick={{ fontSize: 10 }} domain={[0, 100]} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={110} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
              <Bar dataKey="impact" fill="hsl(170 40% 40%)" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Geographic Reach */}
        <div className="inst-card p-5">
          <h3 className="text-[12px] font-heading font-semibold text-inst-card-text mb-4 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-inst-accent" /> Geographic Distribution
          </h3>
          <div className="space-y-3">
            {geoData.map((g, i) => (
              <div key={i}>
                <div className="flex justify-between mb-0.5">
                  <span className="text-[11px] font-medium text-inst-card-text">{g.name}</span>
                  <span className="text-[11px] font-bold text-inst-card-text">{g.value} applicant{g.value > 1 ? "s" : ""}</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full rounded-full bg-inst-accent" style={{ width: `${(g.value / mockApplicants.length) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission alignment */}
      <div className="rounded-lg border border-teal-200 bg-teal-50 p-5">
        <h3 className="text-[12px] font-heading font-semibold text-teal-800 mb-2 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" /> Mission Alignment Assessment
        </h3>
        <p className="text-[11px] text-teal-700 leading-relaxed">
          Current pipeline shows strong alignment with equity-focused lending objectives. {underservedCount} of {mockApplicants.length} applicants
          serve underserved communities with impact scores above 80. Portfolio deployment would support an estimated {projectedJobs} jobs
          and direct ${(totalFunding / 1000).toFixed(0)}K in capital to minority-owned businesses across {geoData.length} provinces.
        </p>
      </div>
    </div>
  );
};

export default CommunityImpactSection;
