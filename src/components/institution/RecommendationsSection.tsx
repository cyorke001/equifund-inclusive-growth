import { CheckCircle2, Clock, ArrowRight, FileText, Lightbulb, Eye } from "lucide-react";
import { mockApplicants, Applicant } from "./mockData";

interface Props {
  onSelectApplicant: (a: Applicant) => void;
}

const actionConfig: Record<string, { color: string; bgColor: string; borderColor: string; icon: typeof CheckCircle2 }> = {
  "Approve with standard terms": { color: "text-emerald-700", bgColor: "bg-emerald-50", borderColor: "border-emerald-200", icon: CheckCircle2 },
  "Approve with conditions": { color: "text-blue-700", bgColor: "bg-blue-50", borderColor: "border-blue-200", icon: CheckCircle2 },
  "Request more documentation": { color: "text-amber-700", bgColor: "bg-amber-50", borderColor: "border-amber-200", icon: FileText },
  "Refer to community lender": { color: "text-indigo-700", bgColor: "bg-indigo-50", borderColor: "border-indigo-200", icon: ArrowRight },
  "Recommend microloan or grant": { color: "text-teal-700", bgColor: "bg-teal-50", borderColor: "border-teal-200", icon: Lightbulb },
  "Defer until readiness improves": { color: "text-gray-600", bgColor: "bg-gray-50", borderColor: "border-gray-200", icon: Clock },
};

const RecommendationsSection = ({ onSelectApplicant }: Props) => {
  const grouped = mockApplicants.reduce((acc, app) => {
    const key = app.recommendedAction;
    if (!acc[key]) acc[key] = [];
    acc[key].push(app);
    return acc;
  }, {} as Record<string, Applicant[]>);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[14px] font-heading font-bold text-inst-card-text">Decision Support & Recommendations</h2>
        <p className="text-[11px] text-inst-card-muted mt-1">AI-generated decision pathways based on applicant data, risk analysis, and institution lending criteria.</p>
      </div>

      {Object.entries(grouped).map(([action, apps]) => {
        const config = actionConfig[action] || { color: "text-gray-600", bgColor: "bg-gray-50", borderColor: "border-gray-200", icon: Lightbulb };
        const Icon = config.icon;
        return (
          <div key={action} className={`rounded-lg border ${config.borderColor} ${config.bgColor} p-4`}>
            <h3 className={`text-[12px] font-heading font-semibold ${config.color} flex items-center gap-2 mb-3`}>
              <Icon className="h-4 w-4" /> {action}
              <span className="ml-auto text-[10px] font-normal text-inst-card-muted">{apps.length} applicant{apps.length > 1 ? "s" : ""}</span>
            </h3>
            <div className="space-y-2">
              {apps.map(app => (
                <div key={app.id} className="rounded-md border border-inst-card-border bg-white p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-[12px] font-semibold text-inst-card-text">{app.name}</p>
                      <div className="flex items-center gap-3 text-[10px] text-inst-card-muted mt-1">
                        <span>Readiness: <strong className="text-inst-card-text">{app.score}</strong></span>
                        <span>Risk: <strong className={app.risk === "high" ? "text-red-600" : app.risk === "medium" ? "text-amber-600" : "text-emerald-600"}>{app.risk}</strong></span>
                        <span>Fit: <strong className="text-inst-card-text">{app.lenderFit}%</strong></span>
                        <span>Ask: <strong className="text-inst-card-text">{app.funding}</strong></span>
                      </div>
                      <p className="text-[10px] text-inst-card-muted mt-1">Recommended: <strong className="text-inst-card-text">{app.recommendedFunding}</strong></p>
                    </div>
                    <button onClick={() => onSelectApplicant(app)} className="inline-flex items-center gap-1 rounded-md border border-inst-card-border px-2 py-1 text-[10px] font-medium text-inst-accent hover:bg-inst-table-hover transition-colors shrink-0">
                      <Eye className="h-3 w-3" /> Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecommendationsSection;
