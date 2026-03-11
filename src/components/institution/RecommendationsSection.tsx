import { Lightbulb, CheckCircle2, AlertTriangle, ArrowRight, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockApplicants, Applicant } from "./mockData";

interface Props {
  onSelectApplicant: (a: Applicant) => void;
}

const actionStyles: Record<string, { bg: string; icon: typeof CheckCircle2; color: string }> = {
  "Approve with standard terms": { bg: "bg-secondary/10 border-secondary/30", icon: CheckCircle2, color: "text-secondary" },
  "Approve with conditions": { bg: "bg-equi-sky/10 border-equi-sky/30", icon: CheckCircle2, color: "text-equi-sky" },
  "Request more documentation": { bg: "bg-accent/10 border-accent/30", icon: FileText, color: "text-accent" },
  "Refer to community lender": { bg: "bg-primary/10 border-primary/30", icon: ArrowRight, color: "text-primary" },
  "Recommend microloan or grant": { bg: "bg-equi-green/10 border-equi-green/30", icon: Lightbulb, color: "text-equi-green" },
  "Defer until readiness improves": { bg: "bg-muted border-muted-foreground/20", icon: Clock, color: "text-muted-foreground" },
};

const RecommendationsSection = ({ onSelectApplicant }: Props) => {
  // Group by recommended action
  const grouped = mockApplicants.reduce((acc, app) => {
    const key = app.recommendedAction;
    if (!acc[key]) acc[key] = [];
    acc[key].push(app);
    return acc;
  }, {} as Record<string, Applicant[]>);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-heading font-bold text-foreground">Decision Support & Recommendations</h2>
        <p className="text-sm text-muted-foreground mt-1">AI-generated recommendations based on applicant profiles, risk analysis, and your institution's lending criteria.</p>
      </div>

      {Object.entries(grouped).map(([action, apps]) => {
        const style = actionStyles[action] || { bg: "bg-muted border-border", icon: Lightbulb, color: "text-muted-foreground" };
        const Icon = style.icon;
        return (
          <div key={action} className={`rounded-xl border p-5 ${style.bg}`}>
            <h3 className={`text-sm font-heading font-semibold flex items-center gap-2 mb-3 ${style.color}`}>
              <Icon className="h-4 w-4" /> {action}
              <span className="ml-auto text-xs font-normal text-muted-foreground">{apps.length} applicant{apps.length > 1 ? "s" : ""}</span>
            </h3>
            <div className="space-y-3">
              {apps.map(app => (
                <div key={app.id} className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-foreground">{app.name}</p>
                        <span className="text-[10px] text-muted-foreground">· {app.industry} · {app.location}</span>
                      </div>
                      <div className="flex items-center gap-4 text-[11px] text-muted-foreground mb-2">
                        <span>Readiness: <strong className="text-foreground">{app.score}</strong></span>
                        <span>Risk: <strong className={`capitalize ${app.risk === "high" ? "text-destructive" : app.risk === "medium" ? "text-accent" : "text-secondary"}`}>{app.risk}</strong></span>
                        <span>Fit: <strong className="text-foreground">{app.lenderFit}%</strong></span>
                        <span>Ask: <strong className="text-foreground">{app.funding}</strong></span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">Recommended funding:</strong> {app.recommendedFunding}
                      </p>
                      {app.improvementSteps.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-border">
                          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">To strengthen this decision:</p>
                          <ul className="space-y-0.5">
                            {app.improvementSteps.map((step, i) => (
                              <li key={i} className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                                <span className="h-1 w-1 rounded-full bg-muted-foreground shrink-0" /> {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <Button size="sm" variant="outline" className="shrink-0 text-[10px] h-7 gap-1" onClick={() => onSelectApplicant(app)}>
                      Review <ArrowRight className="h-3 w-3" />
                    </Button>
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
