import { useState, useMemo } from "react";
import { Eye, ChevronDown, LayoutGrid, Table2, Search, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockApplicants, pipelineStages, stageLabels, Applicant, industries, locations } from "./mockData";

interface Props {
  onSelectApplicant: (a: Applicant) => void;
}

const riskBadge = (risk: string) => {
  const styles = {
    low: "bg-emerald-100 text-emerald-700",
    medium: "bg-amber-100 text-amber-700",
    high: "bg-red-100 text-red-700",
  };
  const icons = { low: "●", medium: "◆", high: "▲" };
  return (
    <span className={`inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-semibold ${styles[risk as keyof typeof styles]}`}>
      {icons[risk as keyof typeof icons]} {risk}
    </span>
  );
};

const stageDot: Record<string, string> = {
  new: "bg-blue-400",
  in_review: "bg-indigo-500",
  needs_info: "bg-amber-500",
  shortlisted: "bg-emerald-500",
  approved: "bg-green-600",
  rejected: "bg-red-500",
  deferred: "bg-gray-400",
};

const PipelineSection = ({ onSelectApplicant }: Props) => {
  const [view, setView] = useState<"board" | "table">("table");
  const [search, setSearch] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("all");
  const [filterRisk, setFilterRisk] = useState("all");
  const [sortCol, setSortCol] = useState<"score" | "opportunityScore" | "lenderFit" | "fundingNum">("score");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    return mockApplicants
      .filter(a => !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.founder.toLowerCase().includes(search.toLowerCase()))
      .filter(a => filterIndustry === "all" || a.industry === filterIndustry)
      .filter(a => filterRisk === "all" || a.risk === filterRisk)
      .sort((a, b) => sortDir === "desc" ? b[sortCol] - a[sortCol] : a[sortCol] - b[sortCol]);
  }, [search, filterIndustry, filterRisk, sortCol, sortDir]);

  const toggleSort = (col: typeof sortCol) => {
    if (sortCol === col) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortCol(col); setSortDir("desc"); }
  };

  const ThSort = ({ col, children }: { col: typeof sortCol; children: React.ReactNode }) => (
    <th
      onClick={() => toggleSort(col)}
      className="px-3 py-2.5 text-left font-semibold text-inst-card-muted uppercase tracking-wider cursor-pointer hover:text-inst-card-text transition-colors select-none"
    >
      <span className="inline-flex items-center gap-1">
        {children}
        <ArrowUpDown className={`h-3 w-3 ${sortCol === col ? "text-inst-accent" : "opacity-30"}`} />
      </span>
    </th>
  );

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-inst-card-muted" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or founder..."
            className="inst-input h-8 w-full pl-8 pr-3 text-[11px]"
          />
        </div>

        <select
          value={filterIndustry}
          onChange={e => setFilterIndustry(e.target.value)}
          className="inst-input h-8 px-2 text-[11px] pr-6"
        >
          <option value="all">All Industries</option>
          {industries.map(i => <option key={i} value={i}>{i}</option>)}
        </select>

        <select
          value={filterRisk}
          onChange={e => setFilterRisk(e.target.value)}
          className="inst-input h-8 px-2 text-[11px] pr-6"
        >
          <option value="all">All Risk Levels</option>
          <option value="low">Low Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="high">High Risk</option>
        </select>

        <div className="flex items-center gap-0.5 inst-toggle-group ml-auto">
          <button
            onClick={() => setView("table")}
            className={`inst-toggle-btn ${view === "table" ? "inst-toggle-active" : ""}`}
          >
            <Table2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setView("board")}
            className={`inst-toggle-btn ${view === "board" ? "inst-toggle-active" : ""}`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Results count */}
      <p className="text-[11px] text-inst-card-muted">
        Showing {filtered.length} of {mockApplicants.length} applications
      </p>

      {view === "table" ? (
        <div className="inst-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="bg-inst-table-header border-b border-inst-card-border">
                  <th className="px-3 py-2.5 text-left font-semibold text-inst-card-muted uppercase tracking-wider">Applicant</th>
                  <th className="px-3 py-2.5 text-left font-semibold text-inst-card-muted uppercase tracking-wider">Status</th>
                  <ThSort col="score">Readiness</ThSort>
                  <ThSort col="opportunityScore">Opportunity</ThSort>
                  <ThSort col="lenderFit">Fit</ThSort>
                  <th className="px-3 py-2.5 text-center font-semibold text-inst-card-muted uppercase tracking-wider">Risk</th>
                  <ThSort col="fundingNum">Funding</ThSort>
                  <th className="px-3 py-2.5 text-center font-semibold text-inst-card-muted uppercase tracking-wider">Docs</th>
                  <th className="px-3 py-2.5 text-center font-semibold text-inst-card-muted uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(app => (
                  <tr
                    key={app.id}
                    className="border-b border-inst-card-border last:border-0 hover:bg-inst-table-hover transition-colors cursor-pointer"
                    onClick={() => onSelectApplicant(app)}
                  >
                    <td className="px-3 py-2.5">
                      <p className="font-semibold text-inst-card-text">{app.name}</p>
                      <p className="text-[10px] text-inst-card-muted">{app.founder} · {app.industry}</p>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-inst-card-text">
                        <span className={`h-2 w-2 rounded-full ${stageDot[app.status]}`} />
                        {stageLabels[app.status]}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={`font-bold ${app.score >= 70 ? "text-emerald-600" : app.score >= 50 ? "text-amber-600" : "text-red-600"}`}>
                        {app.score}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center font-bold text-inst-card-text">{app.opportunityScore}</td>
                    <td className="px-3 py-2.5 text-center text-inst-card-text">{app.lenderFit}%</td>
                    <td className="px-3 py-2.5 text-center">{riskBadge(app.risk)}</td>
                    <td className="px-3 py-2.5 font-medium text-inst-card-text">{app.funding}</td>
                    <td className="px-3 py-2.5 text-center">
                      <div className="flex items-center gap-1 justify-center">
                        <div className="h-1.5 w-10 rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${app.docCompletion >= 80 ? "bg-emerald-500" : app.docCompletion >= 50 ? "bg-amber-500" : "bg-red-500"}`}
                            style={{ width: `${app.docCompletion}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-inst-card-muted">{app.docCompletion}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <button
                        onClick={e => { e.stopPropagation(); onSelectApplicant(app); }}
                        className="inline-flex items-center gap-1 rounded-md border border-inst-card-border px-2 py-1 text-[10px] font-medium text-inst-accent hover:bg-inst-table-hover transition-colors"
                      >
                        <Eye className="h-3 w-3" /> Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-4">
          {pipelineStages.map(stage => {
            const apps = filtered.filter(a => a.status === stage);
            return (
              <div key={stage} className="min-w-[230px] max-w-[260px] flex-shrink-0">
                <div className="flex items-center gap-2 px-3 py-2 mb-1">
                  <span className={`h-2.5 w-2.5 rounded-full ${stageDot[stage]}`} />
                  <span className="text-[11px] font-bold text-inst-card-text uppercase tracking-wider">{stageLabels[stage]}</span>
                  <span className="ml-auto text-[10px] font-semibold text-inst-card-muted bg-inst-table-header rounded px-1.5 py-0.5">{apps.length}</span>
                </div>
                <div className="space-y-2 min-h-[100px]">
                  {apps.map(app => (
                    <button
                      key={app.id}
                      onClick={() => onSelectApplicant(app)}
                      className="w-full text-left inst-card p-3 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <p className="text-[11px] font-semibold text-inst-card-text truncate">{app.name}</p>
                      <p className="text-[10px] text-inst-card-muted mt-0.5">{app.founder}</p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-inst-card-border">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-inst-card-text">{app.score}</span>
                          {riskBadge(app.risk)}
                        </div>
                        <span className="text-[10px] font-medium text-inst-card-text">{app.funding}</span>
                      </div>
                      {app.flags.length > 0 && (
                        <p className="text-[9px] text-red-600 mt-1.5 flex items-center gap-1">
                          ▲ {app.flags.length} flag{app.flags.length > 1 ? "s" : ""}
                        </p>
                      )}
                    </button>
                  ))}
                  {apps.length === 0 && (
                    <p className="text-[10px] text-inst-card-muted text-center py-6 inst-card">No applications</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PipelineSection;
