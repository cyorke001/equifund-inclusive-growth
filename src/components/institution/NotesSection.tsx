import { useState } from "react";
import { MessageSquare, Plus, Star, GitCompare, UserCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockApplicants } from "./mockData";

const NotesSection = () => {
  const [shortlist, setShortlist] = useState<number[]>([2, 5]);
  const [comparing, setComparing] = useState(false);
  const [globalNotes, setGlobalNotes] = useState([
    { text: "Q1 review complete. Focus on healthcare and food sectors for next cycle.", date: "2026-03-08", author: "S. Patel" },
    { text: "BDC partnership terms updated. Adjust criteria for community-focused applicants.", date: "2026-03-05", author: "J. Williams" },
  ]);
  const [newNote, setNewNote] = useState("");

  const shortlisted = mockApplicants.filter(a => shortlist.includes(a.id));

  const addNote = () => {
    if (!newNote.trim()) return;
    setGlobalNotes(prev => [{ text: newNote, date: new Date().toISOString().split("T")[0], author: "You" }, ...prev]);
    setNewNote("");
  };

  return (
    <div className="space-y-5">
      <h2 className="text-[14px] font-heading font-bold text-inst-card-text flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-inst-accent" /> Notes & Internal Collaboration
      </h2>

      {/* Internal Notes */}
      <div className="inst-card p-5">
        <h3 className="text-[11px] font-bold text-inst-card-muted uppercase tracking-wider mb-3">Internal Memos</h3>
        <div className="flex gap-2 mb-4">
          <input
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            placeholder="Add an internal note or decision memo..."
            className="inst-input flex-1 h-9 px-3 text-[11px]"
            onKeyDown={e => e.key === "Enter" && addNote()}
          />
          <button onClick={addNote} className="flex h-9 w-9 items-center justify-center rounded-md bg-inst-accent text-white hover:opacity-90 transition-opacity">
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="space-y-2">
          {globalNotes.map((note, i) => (
            <div key={i} className="rounded-md bg-inst-table-header px-4 py-2.5 border border-inst-card-border">
              <p className="text-[11px] text-inst-card-text">{note.text}</p>
              <p className="text-[9px] text-inst-card-muted mt-1">{note.author} · {note.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Shortlist & Compare */}
      <div className="inst-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[11px] font-bold text-inst-card-muted uppercase tracking-wider flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" /> Shortlisted Applicants ({shortlisted.length})
          </h3>
          {shortlisted.length >= 2 && (
            <button onClick={() => setComparing(!comparing)} className="inline-flex items-center gap-1 rounded-md border border-inst-card-border px-2.5 py-1 text-[10px] font-medium text-inst-accent hover:bg-inst-table-hover transition-colors">
              <GitCompare className="h-3 w-3" /> {comparing ? "Hide Comparison" : "Compare Selected"}
            </button>
          )}
        </div>

        {/* Add to shortlist */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {mockApplicants.filter(a => !shortlist.includes(a.id)).map(a => (
            <button key={a.id} onClick={() => setShortlist(prev => [...prev, a.id])} className="rounded-md border border-dashed border-inst-card-border px-2 py-1 text-[10px] text-inst-card-muted hover:border-inst-accent hover:text-inst-accent transition-colors">
              + {a.name}
            </button>
          ))}
        </div>

        {/* Comparison table */}
        {comparing && shortlisted.length >= 2 ? (
          <div className="overflow-x-auto rounded-md border border-inst-card-border">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="bg-inst-table-header border-b border-inst-card-border">
                  <th className="px-3 py-2 text-left font-semibold text-inst-card-muted">Metric</th>
                  {shortlisted.map(app => (
                    <th key={app.id} className="px-3 py-2 text-center font-semibold text-inst-card-text">{app.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Readiness", key: "score" },
                  { label: "Opportunity", key: "opportunityScore" },
                  { label: "Lender Fit", key: "lenderFit" },
                  { label: "Impact", key: "communityImpact" },
                  { label: "Risk", key: "risk" },
                  { label: "Docs %", key: "docCompletion" },
                  { label: "Funding Ask", key: "funding" },
                ].map((metric, i) => (
                  <tr key={i} className="border-b border-inst-card-border last:border-0">
                    <td className="px-3 py-2 font-medium text-inst-card-muted">{metric.label}</td>
                    {shortlisted.map(app => (
                      <td key={app.id} className={`px-3 py-2 text-center font-bold ${
                        metric.key === "risk" && (app as any)[metric.key] === "high" ? "text-red-600" : "text-inst-card-text"
                      }`}>
                        {metric.key === "lenderFit" ? `${(app as any)[metric.key]}%` : metric.key === "docCompletion" ? `${(app as any)[metric.key]}%` : (app as any)[metric.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            {shortlisted.map(app => (
              <div key={app.id} className="rounded-md border border-inst-card-border p-3 bg-inst-table-header">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[12px] font-semibold text-inst-card-text">{app.name}</p>
                  <button onClick={() => setShortlist(prev => prev.filter(id => id !== app.id))} className="text-[10px] text-red-500 hover:underline">Remove</button>
                </div>
                <p className="text-[10px] text-inst-card-muted">Score: {app.score} · Fit: {app.lenderFit}% · Risk: {app.risk} · {app.funding}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Decision Log */}
      <div className="inst-card p-5">
        <h3 className="text-[11px] font-bold text-inst-card-muted uppercase tracking-wider mb-3 flex items-center gap-2">
          <UserCheck className="h-4 w-4 text-emerald-600" /> Decision History
        </h3>
        <div className="overflow-hidden rounded-md border border-inst-card-border">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="bg-inst-table-header border-b border-inst-card-border">
                <th className="px-3 py-2 text-left font-semibold text-inst-card-muted">Date</th>
                <th className="px-3 py-2 text-left font-semibold text-inst-card-muted">Applicant</th>
                <th className="px-3 py-2 text-left font-semibold text-inst-card-muted">Decision</th>
                <th className="px-3 py-2 text-right font-semibold text-inst-card-muted">Amount</th>
                <th className="px-3 py-2 text-right font-semibold text-inst-card-muted">Reviewer</th>
              </tr>
            </thead>
            <tbody>
              {[
                { app: "Urban Wellness Clinic", action: "Approved", amount: "$200K", date: "2026-03-02", by: "S. Patel" },
                { app: "TechBridge Solutions", action: "Shortlisted", amount: "$150K", date: "2026-03-05", by: "S. Patel" },
                { app: "Nova Construction", action: "Rejected — Referred to incubator", amount: "$100K", date: "2026-03-07", by: "J. Williams" },
                { app: "Roots & Harvest", action: "Deferred", amount: "$30K", date: "2026-03-04", by: "J. Williams" },
              ].map((entry, i) => (
                <tr key={i} className="border-b border-inst-card-border last:border-0 hover:bg-inst-table-hover">
                  <td className="px-3 py-2 text-inst-card-muted">{entry.date}</td>
                  <td className="px-3 py-2 font-semibold text-inst-card-text">{entry.app}</td>
                  <td className="px-3 py-2 text-inst-card-text">{entry.action}</td>
                  <td className="px-3 py-2 text-right font-medium text-inst-card-text">{entry.amount}</td>
                  <td className="px-3 py-2 text-right text-inst-card-muted">{entry.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NotesSection;
