import { useState } from "react";
import { MessageSquare, Plus, Star, GitCompare, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockApplicants, Applicant } from "./mockData";

const NotesSection = () => {
  const [shortlist, setShortlist] = useState<number[]>([2, 5]); // pre-selected demo
  const [comparing, setComparing] = useState(false);
  const [globalNotes, setGlobalNotes] = useState<{ text: string; date: string }[]>([
    { text: "Q1 review complete. Focus on healthcare and food sectors for next cycle.", date: "2026-03-08" },
    { text: "BDC partnership terms updated. Adjust criteria for community-focused applicants.", date: "2026-03-05" },
  ]);
  const [newNote, setNewNote] = useState("");

  const shortlisted = mockApplicants.filter(a => shortlist.includes(a.id));

  const addNote = () => {
    if (!newNote.trim()) return;
    setGlobalNotes(prev => [{ text: newNote, date: new Date().toISOString().split("T")[0] }, ...prev]);
    setNewNote("");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-heading font-bold text-foreground flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-primary" /> Notes & Internal Collaboration
      </h2>

      {/* Global Notes */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-heading font-semibold text-foreground mb-3">Internal Memos</h3>
        <div className="flex gap-2 mb-4">
          <input value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Add an internal note..." className="flex-1 h-9 rounded-md border border-input bg-background px-3 text-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" onKeyDown={e => e.key === "Enter" && addNote()} />
          <Button size="sm" className="h-9 gap-1 text-xs" onClick={addNote}><Plus className="h-3 w-3" /> Add</Button>
        </div>
        <div className="space-y-2">
          {globalNotes.map((note, i) => (
            <div key={i} className="rounded-lg bg-muted/50 px-4 py-2.5">
              <p className="text-xs text-foreground">{note.text}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{note.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Shortlist */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-heading font-semibold text-foreground flex items-center gap-2">
            <Star className="h-4 w-4 text-accent" /> Shortlisted Applicants ({shortlisted.length})
          </h3>
          {shortlisted.length >= 2 && (
            <Button size="sm" variant="outline" className="gap-1 text-xs h-7" onClick={() => setComparing(!comparing)}>
              <GitCompare className="h-3 w-3" /> {comparing ? "Hide Comparison" : "Compare"}
            </Button>
          )}
        </div>

        {/* Add to shortlist */}
        <div className="flex flex-wrap gap-2 mb-4">
          {mockApplicants.filter(a => !shortlist.includes(a.id)).map(a => (
            <button key={a.id} onClick={() => setShortlist(prev => [...prev, a.id])} className="rounded-full border border-dashed border-border px-3 py-1 text-[10px] text-muted-foreground hover:border-primary hover:text-primary transition-colors">
              + {a.name}
            </button>
          ))}
        </div>

        {/* Shortlisted cards */}
        <div className={`grid gap-3 ${comparing ? "grid-cols-1 md:grid-cols-2" : ""}`}>
          {shortlisted.map(app => (
            <div key={app.id} className="rounded-lg border border-border bg-muted/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-foreground">{app.name}</p>
                <button onClick={() => setShortlist(prev => prev.filter(id => id !== app.id))} className="text-[10px] text-destructive hover:underline">Remove</button>
              </div>
              {comparing && (
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { label: "Readiness", value: app.score },
                    { label: "Opportunity", value: app.opportunityScore },
                    { label: "Lender Fit", value: `${app.lenderFit}%` },
                    { label: "Impact", value: app.communityImpact },
                    { label: "Risk", value: app.risk },
                    { label: "Docs", value: `${app.docCompletion}%` },
                  ].map((m, i) => (
                    <div key={i}>
                      <p className="text-[10px] text-muted-foreground">{m.label}</p>
                      <p className={`text-sm font-bold ${typeof m.value === "string" && m.value === "high" ? "text-destructive" : "text-foreground"}`}>{m.value}</p>
                    </div>
                  ))}
                </div>
              )}
              {!comparing && (
                <p className="text-xs text-muted-foreground">Score: {app.score} · Fit: {app.lenderFit}% · Risk: {app.risk} · {app.funding}</p>
              )}
              {/* Per-applicant notes */}
              {app.notes.length > 0 && (
                <div className="mt-2 pt-2 border-t border-border">
                  {app.notes.map(n => (
                    <p key={n.id} className="text-[10px] text-muted-foreground"><strong>{n.author}:</strong> {n.text}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Decision Log */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
          <UserCheck className="h-4 w-4 text-secondary" /> Decision History
        </h3>
        <div className="space-y-2">
          {[
            { app: "Urban Wellness Clinic", action: "Approved", amount: "$200K", date: "2026-03-02", by: "S. Patel" },
            { app: "TechBridge Solutions", action: "Shortlisted", amount: "$150K", date: "2026-03-05", by: "S. Patel" },
            { app: "Nova Construction", action: "Rejected — Referred to incubator", amount: "$100K", date: "2026-03-07", by: "J. Williams" },
            { app: "Roots & Harvest", action: "Deferred", amount: "$30K", date: "2026-03-04", by: "J. Williams" },
          ].map((entry, i) => (
            <div key={i} className="flex items-center gap-3 text-xs">
              <span className="text-muted-foreground w-20 shrink-0">{entry.date}</span>
              <span className="font-semibold text-foreground">{entry.app}</span>
              <span className="text-muted-foreground">→</span>
              <span className="text-foreground">{entry.action}</span>
              <span className="text-muted-foreground ml-auto">{entry.by}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesSection;
