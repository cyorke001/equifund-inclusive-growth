import { useState } from "react";
import { Eye, ChevronDown, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockApplicants, pipelineStages, stageLabels, stageColors, Applicant } from "./mockData";

interface Props {
  onSelectApplicant: (a: Applicant) => void;
}

const PipelineSection = ({ onSelectApplicant }: Props) => {
  const [view, setView] = useState<"kanban" | "table">("kanban");

  const getRiskIcon = (risk: string) => {
    if (risk === "low") return "🟢";
    if (risk === "medium") return "🟡";
    return "🔴";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-heading font-bold text-foreground">Application Pipeline</h2>
        <div className="flex items-center gap-2 bg-muted rounded-lg p-0.5">
          <button onClick={() => setView("kanban")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${view === "kanban" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
            Board
          </button>
          <button onClick={() => setView("table")} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${view === "table" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
            Table
          </button>
        </div>
      </div>

      {view === "kanban" ? (
        <div className="flex gap-3 overflow-x-auto pb-4">
          {pipelineStages.map(stage => {
            const apps = mockApplicants.filter(a => a.status === stage);
            return (
              <div key={stage} className="min-w-[220px] max-w-[260px] flex-shrink-0">
                <div className={`rounded-t-lg border-t-2 px-3 py-2 ${stageColors[stage]} border-b-0`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider">{stageLabels[stage]}</span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-background text-[10px] font-bold text-foreground">{apps.length}</span>
                  </div>
                </div>
                <div className="space-y-2 rounded-b-lg border border-t-0 border-border bg-muted/20 p-2 min-h-[120px]">
                  {apps.map(app => (
                    <button
                      key={app.id}
                      onClick={() => onSelectApplicant(app)}
                      className="w-full text-left rounded-lg border border-border bg-card p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <p className="text-xs font-semibold text-foreground truncate">{app.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{app.founder} · {app.location}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] text-muted-foreground">{getRiskIcon(app.risk)} Score: {app.score}</span>
                        <span className="text-[10px] font-medium text-foreground">{app.funding}</span>
                      </div>
                      {app.flags.length > 0 && (
                        <p className="text-[10px] text-destructive mt-1">⚠ {app.flags.length} flag{app.flags.length > 1 ? "s" : ""}</p>
                      )}
                    </button>
                  ))}
                  {apps.length === 0 && (
                    <p className="text-[10px] text-muted-foreground text-center py-4">No applications</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-3 py-2.5 text-left font-semibold text-foreground">Business</th>
                  <th className="px-3 py-2.5 text-left font-semibold text-foreground">Stage</th>
                  <th className="px-3 py-2.5 text-center font-semibold text-foreground">Score</th>
                  <th className="px-3 py-2.5 text-center font-semibold text-foreground">Risk</th>
                  <th className="px-3 py-2.5 text-left font-semibold text-foreground">Funding</th>
                  <th className="px-3 py-2.5 text-center font-semibold text-foreground">Docs</th>
                  <th className="px-3 py-2.5 text-center font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockApplicants.map(app => (
                  <tr key={app.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-3 py-2.5">
                      <p className="font-semibold text-foreground">{app.name}</p>
                      <p className="text-[10px] text-muted-foreground">{app.founder}</p>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold border ${stageColors[app.status]}`}>
                        {stageLabels[app.status]}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center font-bold text-foreground">{app.score}</td>
                    <td className="px-3 py-2.5 text-center">{getRiskIcon(app.risk)} <span className="text-muted-foreground capitalize">{app.risk}</span></td>
                    <td className="px-3 py-2.5 font-medium text-foreground">{app.funding}</td>
                    <td className="px-3 py-2.5 text-center">
                      <div className="inline-flex items-center gap-1">
                        <div className="h-1.5 w-12 rounded-full bg-muted overflow-hidden">
                          <div className={`h-full rounded-full ${app.docCompletion >= 80 ? "bg-secondary" : app.docCompletion >= 50 ? "bg-accent" : "bg-destructive"}`} style={{ width: `${app.docCompletion}%` }} />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{app.docCompletion}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1" onClick={() => onSelectApplicant(app)}>
                        <Eye className="h-3 w-3" /> Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PipelineSection;
