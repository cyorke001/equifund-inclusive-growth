import { useState } from "react";
import {
  ArrowLeft, Shield, Target, BarChart3, AlertTriangle, FileText,
  CheckCircle2, XCircle, Clock, MapPin, Users as UsersIcon,
  Calendar, DollarSign, TrendingUp, Lightbulb, ChevronRight,
  Send, Bookmark, Download, MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockApplicants, Applicant, stageLabels } from "./mockData";

interface Props {
  selected: Applicant | null;
  onSelect: (a: Applicant | null) => void;
}

const riskBadge = (risk: string) => {
  const styles = { low: "bg-emerald-100 text-emerald-700", medium: "bg-amber-100 text-amber-700", high: "bg-red-100 text-red-700" };
  const icons = { low: "●", medium: "◆", high: "▲" };
  return (
    <span className={`inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-semibold ${styles[risk as keyof typeof styles]}`}>
      {icons[risk as keyof typeof icons]} {risk}
    </span>
  );
};

const stageDot: Record<string, string> = {
  new: "bg-blue-400", in_review: "bg-indigo-500", needs_info: "bg-amber-500",
  shortlisted: "bg-emerald-500", approved: "bg-green-600", rejected: "bg-red-500", deferred: "bg-gray-400",
};

const ApplicantReviewSection = ({ selected, onSelect }: Props) => {
  const [noteText, setNoteText] = useState("");
  const [queueSearch, setQueueSearch] = useState("");

  const filteredQueue = mockApplicants.filter(
    a => !queueSearch || a.name.toLowerCase().includes(queueSearch.toLowerCase())
  );

  // ─── Queue view (no applicant selected) ───
  if (!selected) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[14px] font-heading font-bold text-inst-card-text">Applicant Review Queue</h2>
            <p className="text-[11px] text-inst-card-muted mt-0.5">{mockApplicants.length} applicants · Select one to begin review</p>
          </div>
          <div className="relative">
            <input
              value={queueSearch}
              onChange={e => setQueueSearch(e.target.value)}
              placeholder="Filter queue..."
              className="inst-input h-8 w-48 pl-3 pr-3 text-[11px]"
            />
          </div>
        </div>

        <div className="inst-card overflow-hidden">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="bg-inst-table-header border-b border-inst-card-border">
                <th className="px-3 py-2.5 text-left font-semibold text-inst-card-muted uppercase tracking-wider">Applicant</th>
                <th className="px-3 py-2.5 text-left font-semibold text-inst-card-muted uppercase tracking-wider">Industry</th>
                <th className="px-3 py-2.5 text-center font-semibold text-inst-card-muted uppercase tracking-wider">Readiness</th>
                <th className="px-3 py-2.5 text-center font-semibold text-inst-card-muted uppercase tracking-wider">Risk</th>
                <th className="px-3 py-2.5 text-center font-semibold text-inst-card-muted uppercase tracking-wider">Fit</th>
                <th className="px-3 py-2.5 text-left font-semibold text-inst-card-muted uppercase tracking-wider">Status</th>
                <th className="px-3 py-2.5 text-center font-semibold text-inst-card-muted uppercase tracking-wider">Funding</th>
              </tr>
            </thead>
            <tbody>
              {filteredQueue.map(app => (
                <tr
                  key={app.id}
                  onClick={() => onSelect(app)}
                  className="border-b border-inst-card-border last:border-0 hover:bg-inst-table-hover transition-colors cursor-pointer"
                >
                  <td className="px-3 py-3">
                    <p className="font-semibold text-inst-card-text">{app.name}</p>
                    <p className="text-[10px] text-inst-card-muted">{app.founder} · {app.location}</p>
                  </td>
                  <td className="px-3 py-3 text-inst-card-muted">{app.industry}</td>
                  <td className="px-3 py-3 text-center">
                    <span className={`font-bold ${app.score >= 70 ? "text-emerald-600" : app.score >= 50 ? "text-amber-600" : "text-red-600"}`}>{app.score}</span>
                  </td>
                  <td className="px-3 py-3 text-center">{riskBadge(app.risk)}</td>
                  <td className="px-3 py-3 text-center text-inst-card-text font-medium">{app.lenderFit}%</td>
                  <td className="px-3 py-3">
                    <span className="inline-flex items-center gap-1.5 text-[10px]">
                      <span className={`h-2 w-2 rounded-full ${stageDot[app.status]}`} />
                      <span className="text-inst-card-text">{stageLabels[app.status]}</span>
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center font-medium text-inst-card-text">{app.funding}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // ─── Detailed Review (split layout) ───
  const app = selected;

  const scoreItems = [
    { label: "Readiness Score", value: app.score, max: 100, color: app.score >= 70 ? "bg-emerald-500" : app.score >= 50 ? "bg-amber-500" : "bg-red-500" },
    { label: "Opportunity Score", value: app.opportunityScore, max: 100, color: "bg-blue-500" },
    { label: "Lender Fit", value: app.lenderFit, max: 100, color: app.lenderFit >= 70 ? "bg-emerald-500" : "bg-amber-500" },
    { label: "Community Impact", value: app.communityImpact, max: 100, color: "bg-teal-500" },
    { label: "Documentation", value: app.docCompletion, max: 100, color: app.docCompletion >= 80 ? "bg-emerald-500" : "bg-red-500" },
  ];

  return (
    <div className="space-y-4">
      {/* Back + actions */}
      <div className="flex items-center justify-between">
        <button onClick={() => onSelect(null)} className="flex items-center gap-1.5 text-[11px] font-medium text-inst-card-muted hover:text-inst-card-text transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to queue
        </button>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-inst-card-text mr-2">
            <span className={`h-2 w-2 rounded-full ${stageDot[app.status]}`} />
            {stageLabels[app.status]}
          </span>
          <Button size="sm" className="h-7 text-[10px] gap-1 bg-emerald-600 hover:bg-emerald-700 text-white">
            <CheckCircle2 className="h-3 w-3" /> Approve
          </Button>
          <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1 text-inst-card-text border-inst-card-border">
            <Clock className="h-3 w-3" /> Defer
          </Button>
          <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1 text-red-600 border-red-200 hover:bg-red-50">
            <XCircle className="h-3 w-3" /> Reject
          </Button>
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-inst-card-muted">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="inst-card p-4 flex items-center justify-between">
        <div>
          <h2 className="text-[16px] font-heading font-bold text-inst-card-text">{app.name}</h2>
          <p className="text-[12px] text-inst-card-muted">{app.founder} · {app.industry} · {app.location} · Submitted {app.submittedDate}</p>
        </div>
        <div className="flex items-center gap-4 text-center">
          {[
            { label: "Readiness", value: app.score, color: app.score >= 70 ? "text-emerald-600" : "text-amber-600" },
            { label: "Opportunity", value: app.opportunityScore, color: "text-blue-600" },
            { label: "Fit", value: `${app.lenderFit}%`, color: app.lenderFit >= 70 ? "text-emerald-600" : "text-amber-600" },
          ].map((s, i) => (
            <div key={i}>
              <p className={`text-lg font-bold font-heading ${s.color}`}>{s.value}</p>
              <p className="text-[9px] text-inst-card-muted uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Three-column layout */}
      <div className="grid gap-4 lg:grid-cols-12">
        {/* Left: Scores + Details */}
        <div className="lg:col-span-4 space-y-4">
          {/* Score bars */}
          <div className="inst-card p-4">
            <h3 className="text-[11px] font-bold text-inst-card-muted uppercase tracking-wider mb-3">Assessment Metrics</h3>
            <div className="space-y-3">
              {scoreItems.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-inst-card-muted">{s.label}</span>
                    <span className="text-[11px] font-bold text-inst-card-text">{s.value}/{s.max}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                    <div className={`h-full rounded-full ${s.color} transition-all`} style={{ width: `${(s.value / s.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Details */}
          <div className="inst-card p-4">
            <h3 className="text-[11px] font-bold text-inst-card-muted uppercase tracking-wider mb-3">Business Profile</h3>
            <div className="space-y-2.5">
              {[
                { icon: MapPin, label: "Location", value: app.location },
                { icon: Calendar, label: "Operating", value: `${app.yearsInOperation} year${app.yearsInOperation !== 1 ? "s" : ""}` },
                { icon: DollarSign, label: "Revenue", value: app.revenue },
                { icon: UsersIcon, label: "Team Size", value: `${app.teamSize} people` },
                { icon: TrendingUp, label: "Stage", value: app.stage },
                { icon: DollarSign, label: "Funding Ask", value: app.funding },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-1 border-b border-inst-card-border last:border-0">
                  <span className="flex items-center gap-1.5 text-[10px] text-inst-card-muted">
                    <item.icon className="h-3 w-3" /> {item.label}
                  </span>
                  <span className="text-[11px] font-medium text-inst-card-text">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Business overview + Flags */}
        <div className="lg:col-span-4 space-y-4">
          <div className="inst-card p-4">
            <h3 className="text-[11px] font-bold text-inst-card-muted uppercase tracking-wider mb-2">Business Overview</h3>
            <p className="text-[12px] text-inst-card-text leading-relaxed">{app.description}</p>
          </div>

          {/* Flags */}
          {app.flags.length > 0 && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <h3 className="text-[11px] font-bold text-red-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5" /> Flags & Warnings ({app.flags.length})
              </h3>
              <ul className="space-y-1.5">
                {app.flags.map((flag, i) => (
                  <li key={i} className="text-[11px] text-red-700 flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-red-500 shrink-0" /> {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Risk assessment */}
          <div className="inst-card p-4">
            <h3 className="text-[11px] font-bold text-inst-card-muted uppercase tracking-wider mb-2">Risk Assessment</h3>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[12px] font-medium text-inst-card-text">Overall Risk Level:</span>
              {riskBadge(app.risk)}
            </div>
            <p className="text-[11px] text-inst-card-muted leading-relaxed">
              {app.risk === "high"
                ? "This applicant presents elevated risk factors. Review documentation carefully before proceeding."
                : app.risk === "medium"
                ? "Moderate risk indicators detected. Additional verification may strengthen decision confidence."
                : "Low risk profile. Standard review procedures apply."}
            </p>
          </div>
        </div>

        {/* Right: Recommendation + Notes */}
        <div className="lg:col-span-4 space-y-4">
          {/* AI Recommendation */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="text-[11px] font-bold text-blue-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Lightbulb className="h-3.5 w-3.5" /> AI Recommendation
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[10px] text-blue-600">Suggested Action</span>
                <span className="text-[11px] font-bold text-blue-800">{app.recommendedAction}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] text-blue-600">Funding Type</span>
                <span className="text-[11px] font-bold text-blue-800">{app.recommendedFunding}</span>
              </div>
            </div>
            {app.improvementSteps.length > 0 && (
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="text-[9px] font-bold text-blue-600 uppercase tracking-wider mb-1.5">To Strengthen Decision:</p>
                <ul className="space-y-1">
                  {app.improvementSteps.map((step, i) => (
                    <li key={i} className="text-[10px] text-blue-700 flex items-start gap-1.5">
                      <CheckCircle2 className="h-3 w-3 text-blue-500 mt-0.5 shrink-0" /> {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Analyst Notes */}
          <div className="inst-card p-4">
            <h3 className="text-[11px] font-bold text-inst-card-muted uppercase tracking-wider mb-3">Analyst Notes</h3>
            <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
              {app.notes.length === 0 && <p className="text-[10px] text-inst-card-muted italic">No notes recorded for this applicant.</p>}
              {app.notes.map(note => (
                <div key={note.id} className="rounded-md bg-inst-table-header px-3 py-2">
                  <p className="text-[11px] text-inst-card-text">{note.text}</p>
                  <p className="text-[9px] text-inst-card-muted mt-1">{note.author} · {note.date}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder="Add analyst note..."
                className="inst-input flex-1 h-8 px-3 text-[11px]"
                onKeyDown={e => e.key === "Enter" && setNoteText("")}
              />
              <button
                onClick={() => setNoteText("")}
                className="flex h-8 w-8 items-center justify-center rounded-md bg-inst-accent text-white hover:opacity-90 transition-opacity"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantReviewSection;
