import { Target, Lightbulb, TrendingUp, Star, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
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
    <div className="space-y-6">
      <h2 className="text-lg font-heading font-bold text-foreground">Opportunity Scoring</h2>

      {/* Hidden Gems */}
      {hiddenGems.length > 0 && (
        <div className="rounded-xl border border-equi-gold/30 bg-accent/5 p-5">
          <h3 className="text-sm font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 text-accent" /> Hidden Gems — High Opportunity, Lower Readiness
          </h3>
          <p className="text-xs text-muted-foreground mb-3">These applicants show strong growth signals but may be overlooked by traditional screening. They could benefit from targeted support to become loan-ready.</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {hiddenGems.map(app => (
              <button key={app.id} onClick={() => onSelectApplicant(app)} className="text-left rounded-lg border border-border bg-card p-3 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold text-foreground">{app.name}</p>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-accent"><Target className="h-3 w-3" />{app.opportunityScore}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">{app.description.slice(0, 80)}...</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search businesses..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9 text-xs" />
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
          {([["opportunityScore", "Opportunity"], ["communityImpact", "Impact"], ["lenderFit", "Lender Fit"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setSortBy(key)} className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors ${sortBy === key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Ranking */}
      <div className="space-y-2">
        {sorted.map((app, rank) => (
          <button key={app.id} onClick={() => onSelectApplicant(app)} className="w-full text-left flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {rank + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground">{app.name}</p>
                {app.flags.length > 0 && <span className="text-[9px] text-destructive font-medium">⚠ {app.flags.length} flags</span>}
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">{app.industry} · {app.location} · {app.stage} stage</p>
              <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">{app.description}</p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-center">
                <p className={`text-lg font-bold font-heading ${app.opportunityScore >= 75 ? "text-equi-sky" : app.opportunityScore >= 55 ? "text-accent" : "text-muted-foreground"}`}>{app.opportunityScore}</p>
                <p className="text-[9px] text-muted-foreground">Opportunity</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold font-heading text-equi-green">{app.communityImpact}</p>
                <p className="text-[9px] text-muted-foreground">Impact</p>
              </div>
              <div className="text-center">
                <p className={`text-lg font-bold font-heading ${app.lenderFit >= 70 ? "text-secondary" : "text-accent"}`}>{app.lenderFit}%</p>
                <p className="text-[9px] text-muted-foreground">Fit</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OpportunityScoringSection;
