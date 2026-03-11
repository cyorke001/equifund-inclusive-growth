import { useState } from "react";
import {
  ArrowLeft, Shield, Target, BarChart3, AlertTriangle, FileText,
  CheckCircle2, XCircle, Clock, MapPin, Users as UsersIcon,
  Calendar, DollarSign, TrendingUp, Lightbulb, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockApplicants, Applicant, stageLabels, stageColors } from "./mockData";

interface Props {
  selected: Applicant | null;
  onSelect: (a: Applicant | null) => void;
}

const ApplicantReviewSection = ({ selected, onSelect }: Props) => {
  const [noteText, setNoteText] = useState("");

  if (!selected) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-heading font-bold text-foreground">Applicant Review</h2>
        <p className="text-sm text-muted-foreground">Select an applicant from the list below to begin your review.</p>
        <div className="grid gap-2">
          {mockApplicants.map(app => (
            <button
              key={app.id}
              onClick={() => onSelect(app)}
              className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 hover:bg-muted/30 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                  app.score >= 70 ? "bg-secondary/15 text-secondary" : app.score >= 50 ? "bg-accent/15 text-accent" : "bg-destructive/15 text-destructive"
                }`}>{app.score}</div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{app.name}</p>
                  <p className="text-[11px] text-muted-foreground">{app.founder} · {app.industry} · {app.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold border ${stageColors[app.status]}`}>{stageLabels[app.status]}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const app = selected;

  return (
    <div className="space-y-4">
      {/* Back button */}
      <button onClick={() => onSelect(null)} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to list
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">{app.name}</h2>
          <p className="text-sm text-muted-foreground">{app.founder} · {app.industry}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold border ${stageColors[app.status]}`}>{stageLabels[app.status]}</span>
          <Button size="sm" className="gap-1 text-xs"><CheckCircle2 className="h-3 w-3" /> Approve</Button>
          <Button size="sm" variant="outline" className="gap-1 text-xs"><Clock className="h-3 w-3" /> Defer</Button>
          <Button size="sm" variant="destructive" className="gap-1 text-xs"><XCircle className="h-3 w-3" /> Reject</Button>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: "Readiness", value: app.score, icon: BarChart3, color: app.score >= 70 ? "text-secondary" : app.score >= 50 ? "text-accent" : "text-destructive" },
          { label: "Opportunity", value: app.opportunityScore, icon: Target, color: app.opportunityScore >= 75 ? "text-equi-sky" : "text-accent" },
          { label: "Lender Fit", value: `${app.lenderFit}%`, icon: Shield, color: app.lenderFit >= 70 ? "text-secondary" : "text-accent" },
          { label: "Community", value: app.communityImpact, icon: UsersIcon, color: "text-equi-green" },
          { label: "Docs", value: `${app.docCompletion}%`, icon: FileText, color: app.docCompletion >= 80 ? "text-secondary" : "text-destructive" },
        ].map((s, i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-3 text-center">
            <s.icon className={`h-4 w-4 mx-auto mb-1 ${s.color}`} />
            <p className="text-xl font-bold font-heading text-foreground">{s.value}</p>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Two-column detail */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Left: Profile */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-heading font-semibold text-foreground mb-3">Business Overview</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{app.description}</p>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                { icon: MapPin, label: "Location", value: app.location },
                { icon: Calendar, label: "Years", value: `${app.yearsInOperation} yr${app.yearsInOperation !== 1 ? "s" : ""}` },
                { icon: DollarSign, label: "Revenue", value: app.revenue },
                { icon: UsersIcon, label: "Team", value: `${app.teamSize} people` },
                { icon: TrendingUp, label: "Stage", value: app.stage },
                { icon: DollarSign, label: "Funding Ask", value: app.funding },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon className="h-3.5 w-3.5 text-muted-foreground" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">{item.label}</p>
                    <p className="text-xs font-medium text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flags */}
          {app.flags.length > 0 && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
              <h3 className="text-sm font-heading font-semibold text-destructive mb-2 flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" /> Flags ({app.flags.length})
              </h3>
              <ul className="space-y-1">
                {app.flags.map((flag, i) => (
                  <li key={i} className="text-xs text-destructive flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-destructive" /> {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right: Recommendations & Notes */}
        <div className="space-y-4">
          <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-5">
            <h3 className="text-sm font-heading font-semibold text-foreground mb-2 flex items-center gap-1.5">
              <Lightbulb className="h-4 w-4 text-secondary" /> AI Recommendation
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Recommended Funding</span>
                <span className="text-xs font-bold text-foreground">{app.recommendedFunding}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Suggested Action</span>
                <span className="text-xs font-bold text-foreground">{app.recommendedAction}</span>
              </div>
            </div>
            {app.improvementSteps.length > 0 && (
              <div className="mt-3 pt-3 border-t border-secondary/20">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">To Improve Decision Confidence:</p>
                <ul className="space-y-1">
                  {app.improvementSteps.map((step, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                      <CheckCircle2 className="h-3 w-3 text-secondary mt-0.5 shrink-0" /> {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-heading font-semibold text-foreground mb-3">Analyst Notes</h3>
            <div className="space-y-2 mb-3">
              {app.notes.length === 0 && <p className="text-xs text-muted-foreground italic">No notes yet.</p>}
              {app.notes.map(note => (
                <div key={note.id} className="rounded-lg bg-muted/50 px-3 py-2">
                  <p className="text-xs text-foreground">{note.text}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{note.author} · {note.date}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder="Add a note..."
                className="flex-1 h-8 rounded-md border border-input bg-background px-3 text-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <Button size="sm" className="h-8 text-xs" onClick={() => setNoteText("")}>Add</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantReviewSection;
