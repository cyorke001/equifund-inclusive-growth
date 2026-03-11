import { useState } from "react";
import { Settings, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { defaultCriteria, InstitutionCriteria, industries } from "./mockData";

const allStages = ["Idea", "Early", "Growth", "Established"];
const allProvinces = ["Ontario", "British Columbia", "Quebec", "Alberta", "Manitoba", "Saskatchewan", "Nova Scotia", "New Brunswick"];

const CriteriaSection = () => {
  const [criteria, setCriteria] = useState<InstitutionCriteria>({ ...defaultCriteria });
  const [saved, setSaved] = useState(false);

  const toggleArray = (arr: string[], item: string) =>
    arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-heading font-bold text-foreground flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" /> Institution Lending Criteria
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Configure your internal criteria. The dashboard will use these settings to rank applicants, generate lender-fit scores, and tailor recommendations.</p>
        </div>
      </div>

      {/* Preferred Industries */}
      <fieldset className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <legend className="text-sm font-heading font-semibold text-foreground px-2">Preferred Industries</legend>
        <div className="flex flex-wrap gap-2 mt-2">
          {industries.map(ind => (
            <button
              key={ind}
              onClick={() => setCriteria(c => ({ ...c, preferredIndustries: toggleArray(c.preferredIndustries, ind) }))}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                criteria.preferredIndustries.includes(ind) ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >{ind}</button>
          ))}
        </div>
      </fieldset>

      {/* Target Geography */}
      <fieldset className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <legend className="text-sm font-heading font-semibold text-foreground px-2">Target Geography</legend>
        <div className="flex flex-wrap gap-2 mt-2">
          {allProvinces.map(prov => (
            <button
              key={prov}
              onClick={() => setCriteria(c => ({ ...c, targetGeography: toggleArray(c.targetGeography, prov) }))}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                criteria.targetGeography.includes(prov) ? "border-secondary bg-secondary/10 text-secondary" : "border-border text-muted-foreground hover:border-secondary/50"
              }`}
            >{prov}</button>
          ))}
        </div>
      </fieldset>

      {/* Business Stage */}
      <fieldset className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <legend className="text-sm font-heading font-semibold text-foreground px-2">Business Stage Preference</legend>
        <div className="flex flex-wrap gap-2 mt-2">
          {allStages.map(stage => (
            <button
              key={stage}
              onClick={() => setCriteria(c => ({ ...c, stagePreference: toggleArray(c.stagePreference, stage) }))}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                criteria.stagePreference.includes(stage) ? "border-equi-sky bg-equi-sky/10 text-equi-sky" : "border-border text-muted-foreground hover:border-equi-sky/50"
              }`}
            >{stage}</button>
          ))}
        </div>
      </fieldset>

      {/* Financial Thresholds */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-heading font-semibold text-foreground mb-4">Financial Thresholds</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Minimum Funding ($)</label>
            <Input type="number" value={criteria.fundingMin} onChange={e => setCriteria(c => ({ ...c, fundingMin: +e.target.value }))} className="mt-1 h-9 text-sm" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Maximum Funding ($)</label>
            <Input type="number" value={criteria.fundingMax} onChange={e => setCriteria(c => ({ ...c, fundingMax: +e.target.value }))} className="mt-1 h-9 text-sm" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Minimum Revenue ($)</label>
            <Input type="number" value={criteria.revenueMin} onChange={e => setCriteria(c => ({ ...c, revenueMin: +e.target.value }))} className="mt-1 h-9 text-sm" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Risk Tolerance (1=Low only, 3=All)</label>
            <Input type="number" min={1} max={3} value={criteria.riskRange[1]} onChange={e => setCriteria(c => ({ ...c, riskRange: [1, Math.min(3, Math.max(1, +e.target.value))] }))} className="mt-1 h-9 text-sm" />
          </div>
        </div>
      </div>

      {/* Priorities */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-heading font-semibold text-foreground mb-4">Strategic Priorities</h3>
        <div className="space-y-3">
          {[
            { key: "impactPriority" as const, label: "Prioritize Community Impact", desc: "Boost ranking for applicants with high community impact scores." },
            { key: "equityFocus" as const, label: "Equity-Focused Lending", desc: "Prioritize applicants from underserved and minority communities." },
          ].map(item => (
            <label key={item.key} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={criteria[item.key]}
                onChange={e => setCriteria(c => ({ ...c, [item.key]: e.target.checked }))}
                className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring"
              />
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" /> {saved ? "Saved ✓" : "Save Criteria"}
        </Button>
        <Button variant="outline" onClick={() => setCriteria({ ...defaultCriteria })} className="gap-2">
          <RotateCcw className="h-4 w-4" /> Reset to Defaults
        </Button>
      </div>
    </div>
  );
};

export default CriteriaSection;
