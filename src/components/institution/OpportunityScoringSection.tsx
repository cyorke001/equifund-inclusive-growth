import { Target, Star, Search, Eye } from "lucide-react";
import { useState } from "react";
import { mockApplicants, Applicant } from "./mockData";

interface Props {
  onSelectApplicant: (a: Applicant) => void;
}

const OpportunityScoringSection = ({ onSelectApplicant }: Props) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"opportunityScore" | "communityImpact" | "lenderFit">("opportunityScore");

  const sorted = [...mockApplicants]
    .filter(a => !search || a.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b[sortBy] - a[sortBy]);

  const hiddenGems = mockApplicants.filter(a => a.opportunityScore >= 65 && a.score < 60);

  return (
    <div className="space-y-5">
      {/* Hidden Gems */}
      {hiddenGems.length > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <h3 className="text-[12px] font-heading font-semibold text-amber-800 mb-2 flex items-center gap-2">
            <Star className="h-4 w-4" /> Hidden Gems — High Opportunity, Lower Readiness
          </h3>
          <p className="text-[10px] text-amber-700 mb-3">These applicants show strong growth signals but may be overlooked by traditional screening criteria.</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {hiddenGems.map(app => (
              <button key={app.id} onClick={() => onSelectApplicant(app)} className="text-left inst-card p-3 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[11px] font-semibold text-inst-card-text">{app.name}</p>
                  <span className="text-[10px] font-bold text-amber-700 flex items-center gap-0.5"><Target className="h-3 w-3" /> {app.opportunityScore}</span>
                </div>
                <p className="text-[10px] text-inst-card-muted line-clamp-2">{app.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-inst-card-muted" />
          <input placeholder="Search businesses..." value={search} onChange={e => setSearch(e.target.value)} className="inst-input h-8 w-full pl-8 pr-3 text-[11px]" />
        </div>
        <div className="inst-toggle-group ml-auto">
          {([["opportunityScore", "Opportunity"], ["communityImpact", "Impact"], ["lenderFit", "Lender Fit"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setSortBy(key)} className={`inst-toggle-btn text-[10px] ${sortBy === key ? "inst-toggle-active" : ""}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Ranking table */}
      <div className="inst-card overflow-hidden">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="bg-inst-table-header border-b border-inst-card-border">
              <th className="px-3 py-2.5 text-center font-semibold text-inst-card-muted w-12">#</th>
              <th className="px-3 py-2.5 text-left font-semibold text-inst-card-muted uppercase tracking-wider">Business</th>
              <th className="px-3 py-2.5 text-center font-semibold text-inst-card-muted uppercase tracking-wider">Opportunity</th>
              <th className="px-3 py-2.5 text-center font-semibold text-inst-card-muted uppercase tracking-wider">Impact</th>
              <th className="px-3 py-2.5 text-center font-semibold text-inst-card-muted uppercase tracking-wider">Lender Fit</th>
              <th className="px-3 py-2.5 text-center font-semibold text-inst-card-muted uppercase tracking-wider">Readiness</th>
              <th className="px-3 py-2.5 text-center font-semibold text-inst-card-muted uppercase tracking-wider">Risk</th>
              <th className="px-3 py-2.5 text-center font-semibold text-inst-card-muted uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((app, rank) => (
              <tr key={app.id} className="border-b border-inst-card-border last:border-0 hover:bg-inst-table-hover transition-colors">
                <td className="px-3 py-2.5 text-center">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-inst-table-header text-[10px] font-bold text-inst-card-text">{rank + 1}</span>
                </td>
                <td className="px-3 py-2.5">
                  <p className="font-semibold text-inst-card-text">{app.name}</p>
                  <p className="text-[10px] text-inst-card-muted">{app.industry} · {app.location}</p>
                </td>
                <td className="px-3 py-2.5 text-center">
                  <span className={`text-[13px] font-bold ${app.opportunityScore >= 75 ? "text-blue-600" : "text-inst-card-text"}`}>{app.opportunityScore}</span>
                </td>
                <td className="px-3 py-2.5 text-center">
                  <span className="text-[13px] font-bold text-teal-600">{app.communityImpact}</span>
                </td>
                <td className="px-3 py-2.5 text-center font-bold text-inst-card-text">{app.lenderFit}%</td>
                <td className="px-3 py-2.5 text-center">
                  <span className={`font-bold ${app.score >= 70 ? "text-emerald-600" : app.score >= 50 ? "text-amber-600" : "text-red-600"}`}>{app.score}</span>
                </td>
                <td className="px-3 py-2.5 text-center">
                  <span className={`inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                    app.risk === "high" ? "bg-red-100 text-red-700" : app.risk === "medium" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {app.risk === "high" ? "▲" : app.risk === "medium" ? "◆" : "●"} {app.risk}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-center">
                  <button onClick={() => onSelectApplicant(app)} className="inline-flex items-center gap-1 rounded-md border border-inst-card-border px-2 py-1 text-[10px] font-medium text-inst-accent hover:bg-inst-table-hover transition-colors">
                    <Eye className="h-3 w-3" /> Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpportunityScoringSection;
