import { useState } from "react";
import { Settings, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { defaultCriteria, InstitutionCriteria, industries } from "./mockData";

const allStages = ["Idea", "Early", "Growth", "Established"];
const allProvinces = ["Ontario", "British Columbia", "Quebec", "Alberta", "Manitoba", "Saskatchewan", "Nova Scotia", "New Brunswick"];

const CriteriaSection = () => {
  const [criteria, setCriteria] = useState<InstitutionCriteria>({ ...defaultCriteria });
  const [saved, setSaved] = useState(false);

  const toggleArray = (arr: string[], item: string) =>
    arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const ChipGroup = ({ items, selected, onToggle, accent }: { items: string[]; selected: string[]; onToggle: (i: string) => void; accent: string }) => (
    <div className="flex flex-wrap gap-2 mt-2">
      {items.map(item => (
        <button
          key={item}
          onClick={() => onToggle(item)}
          className={`rounded-md border px-3 py-1.5 text-[11px] font-medium transition-all ${
            selected.includes(item)
              ? `${accent} border-current bg-current/10`
              : "border-inst-card-border text-inst-card-muted hover:border-inst-accent/50"
          }`}
        >{item}</button>
      ))}
    </div>
  );

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h2 className="text-[14px] font-heading font-bold text-inst-card-text flex items-center gap-2">
          <Settings className="h-5 w-5 text-inst-accent" /> Lending Criteria Configuration
        </h2>
        <p className="text-[11px] text-inst-card-muted mt-1">
          These parameters drive applicant ranking, lender-fit scores, and recommendation logic across the platform.
        </p>
      </div>

      <div className="inst-card p-5">
        <h3 className="text-[11px] font-bold text-inst-card-muted uppercase tracking-wider mb-3">Preferred Industries</h3>
        <ChipGroup
          items={industries}
          selected={criteria.preferredIndustries}
          onToggle={ind => setCriteria(c => ({ ...c, preferredIndustries: toggleArray(c.preferredIndustries, ind) }))}
          accent="text-inst-accent"
        />
      </div>

      <div className="inst-card p-5">
        <h3 className="text-[11px] font-bold text-inst-card-muted uppercase tracking-wider mb-3">Target Geography</h3>
        <ChipGroup
          items={allProvinces}
          selected={criteria.targetGeography}
          onToggle={prov => setCriteria(c => ({ ...c, targetGeography: toggleArray(c.targetGeography, prov) }))}
          accent="text-emerald-600"
        />
      </div>

      <div className="inst-card p-5">
        <h3 className="text-[11px] font-bold text-inst-card-muted uppercase tracking-wider mb-3">Business Stage Preference</h3>
        <ChipGroup
          items={allStages}
          selected={criteria.stagePreference}
          onToggle={stage => setCriteria(c => ({ ...c, stagePreference: toggleArray(c.stagePreference, stage) }))}
          accent="text-blue-600"
        />
      </div>

      <div className="inst-card p-5">
        <h3 className="text-[11px] font-bold text-inst-card-muted uppercase tracking-wider mb-3">Financial Thresholds</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { label: "Minimum Funding ($)", value: criteria.fundingMin, key: "fundingMin" },
            { label: "Maximum Funding ($)", value: criteria.fundingMax, key: "fundingMax" },
            { label: "Minimum Revenue ($)", value: criteria.revenueMin, key: "revenueMin" },
            { label: "Risk Tolerance (1=Low only, 3=All)", value: criteria.riskRange[1], key: "riskMax" },
          ].map(field => (
            <div key={field.key}>
              <label className="text-[10px] font-medium text-inst-card-muted uppercase tracking-wider">{field.label}</label>
              <input
                type="number"
                value={field.value}
                onChange={e => {
                  const val = +e.target.value;
                  if (field.key === "riskMax") setCriteria(c => ({ ...c, riskRange: [1, Math.min(3, Math.max(1, val))] }));
                  else setCriteria(c => ({ ...c, [field.key]: val }));
                }}
                className="inst-input mt-1 h-9 w-full px-3"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="inst-card p-5">
        <h3 className="text-[11px] font-bold text-inst-card-muted uppercase tracking-wider mb-3">Strategic Priorities</h3>
        <div className="space-y-3">
          {[
            { key: "impactPriority" as const, label: "Prioritize Community Impact", desc: "Boost ranking for applicants serving underserved communities." },
            { key: "equityFocus" as const, label: "Equity-Focused Lending", desc: "Prioritize applicants from minority and underrepresented groups." },
          ].map(item => (
            <label key={item.key} className="flex items-start gap-3 cursor-pointer rounded-md border border-inst-card-border p-3 hover:bg-inst-table-hover transition-colors">
              <input
                type="checkbox"
                checked={criteria[item.key]}
                onChange={e => setCriteria(c => ({ ...c, [item.key]: e.target.checked }))}
                className="mt-0.5 h-4 w-4 rounded border-gray-300"
              />
              <div>
                <p className="text-[12px] font-medium text-inst-card-text">{item.label}</p>
                <p className="text-[10px] text-inst-card-muted">{item.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} className="gap-2 bg-inst-accent hover:opacity-90 text-white text-[12px]">
          <Save className="h-4 w-4" /> {saved ? "Saved ✓" : "Save Criteria"}
        </Button>
        <Button variant="outline" onClick={() => setCriteria({ ...defaultCriteria })} className="gap-2 text-[12px] border-inst-card-border text-inst-card-muted">
          <RotateCcw className="h-4 w-4" /> Reset Defaults
        </Button>
      </div>
    </div>
  );
};

export default CriteriaSection;
