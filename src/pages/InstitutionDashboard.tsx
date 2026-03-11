import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3, Users, TrendingUp, AlertTriangle, Search, Filter,
  Building2, Shield, Target, Briefcase, Bell, FileText, LogOut,
  ChevronDown, Eye, CheckCircle2, XCircle, Clock, Loader2,
  LayoutDashboard, UserCheck, Activity, MessageSquare, Settings,
  PieChart, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock data for demo — in production this would come from the backend
const mockApplicants = [
  { id: 1, name: "Maple Leaf Catering", industry: "Food & Beverage", score: 78, risk: "low", status: "under_review", location: "Toronto, ON", revenue: "$120K", funding: "$50K", communityImpact: 85 },
  { id: 2, name: "TechBridge Solutions", industry: "Technology", score: 85, risk: "low", status: "approved", location: "Vancouver, BC", revenue: "$340K", funding: "$150K", communityImpact: 72 },
  { id: 3, name: "Heritage Arts Co-op", industry: "Arts & Entertainment", score: 52, risk: "medium", status: "pending", location: "Montreal, QC", revenue: "$25K", funding: "$20K", communityImpact: 91 },
  { id: 4, name: "GreenField Agriculture", industry: "Agriculture", score: 64, risk: "medium", status: "under_review", location: "Winnipeg, MB", revenue: "$85K", funding: "$75K", communityImpact: 88 },
  { id: 5, name: "Urban Wellness Clinic", industry: "Healthcare", score: 91, risk: "low", status: "approved", location: "Calgary, AB", revenue: "$500K", funding: "$200K", communityImpact: 79 },
  { id: 6, name: "Nova Construction", industry: "Construction", score: 38, risk: "high", status: "declined", location: "Edmonton, AB", revenue: "$10K", funding: "$100K", communityImpact: 65 },
  { id: 7, name: "EduConnect Platform", industry: "Education", score: 71, risk: "low", status: "pending", location: "Ottawa, ON", revenue: "$60K", funding: "$40K", communityImpact: 82 },
  { id: 8, name: "Silk Route Imports", industry: "Retail", score: 45, risk: "high", status: "pending", location: "Halifax, NS", revenue: "Pre-revenue", funding: "$15K", communityImpact: 70 },
];

const sidebarItems = [
  { key: "portfolio", icon: LayoutDashboard },
  { key: "applicants", icon: Users },
  { key: "riskMonitor", icon: Activity },
  { key: "opportunities", icon: Target },
  { key: "lenderFit", icon: UserCheck },
  { key: "communityImpact", icon: PieChart },
  { key: "alerts", icon: Bell },
  { key: "notes", icon: MessageSquare },
];

const InstitutionDashboard = () => {
  const { profile, isLoggedIn, isLoading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("portfolio");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("all");
  const [filterRisk, setFilterRisk] = useState("all");

  useEffect(() => {
    if (!authLoading && !isLoggedIn) navigate("/login", { replace: true });
  }, [authLoading, isLoggedIn, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </main>
    );
  }

  const filtered = mockApplicants.filter(a => {
    if (searchQuery && !a.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterIndustry !== "all" && a.industry !== filterIndustry) return false;
    if (filterRisk !== "all" && a.risk !== filterRisk) return false;
    return true;
  });

  const avgScore = Math.round(mockApplicants.reduce((s, a) => s + a.score, 0) / mockApplicants.length);
  const highPotential = mockApplicants.filter(a => a.score >= 70).length;
  const pendingCount = mockApplicants.filter(a => a.status === "pending" || a.status === "under_review").length;

  const getRiskBadge = (risk: string) => {
    const styles: Record<string, string> = {
      low: "bg-secondary/10 text-secondary",
      medium: "bg-accent/10 text-accent",
      high: "bg-destructive/10 text-destructive",
    };
    const labels: Record<string, string> = {
      low: t("inst.lowRisk"),
      medium: t("inst.mediumRisk"),
      high: t("inst.highRisk"),
    };
    return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[risk]}`}>
      {risk === "low" ? <Shield className="h-3 w-3" /> : risk === "high" ? <AlertTriangle className="h-3 w-3" /> : <Activity className="h-3 w-3" />}
      {labels[risk]}
    </span>;
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      approved: "bg-secondary/10 text-secondary",
      under_review: "bg-primary/10 text-primary",
      pending: "bg-accent/10 text-accent",
      declined: "bg-destructive/10 text-destructive",
    };
    const labels: Record<string, string> = {
      approved: t("inst.approved"),
      under_review: t("inst.underReview"),
      pending: t("inst.pending"),
      declined: t("inst.declined"),
    };
    const icons: Record<string, typeof CheckCircle2> = {
      approved: CheckCircle2,
      under_review: Eye,
      pending: Clock,
      declined: XCircle,
    };
    const Icon = icons[status];
    return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status]}`}>
      <Icon className="h-3 w-3" /> {labels[status]}
    </span>;
  };

  const industries = [...new Set(mockApplicants.map(a => a.industry))];

  return (
    <main id="main-content" className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
            <Building2 className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-bold font-heading">{profile?.institution_name || "Institution"}</p>
            <p className="text-xs text-sidebar-foreground/60">{t("inst.title")}</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarItems.map(item => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                activeTab === item.key
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {t(`inst.${item.key}`)}
            </button>
          ))}
        </nav>

        <div className="border-t border-sidebar-border px-3 py-4 space-y-1">
          <button onClick={() => {}} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50">
            <Settings className="h-4 w-4" /> {t("inst.settings")}
          </button>
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50">
            <LogOut className="h-4 w-4" /> {t("inst.logout")}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <div>
            <p className="text-xs text-muted-foreground">{t("inst.welcome")}</p>
            <h1 className="text-lg font-bold font-heading text-foreground">{profile?.institution_name || t("inst.title")}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">3</span>
            </button>
            <Button size="sm" variant="ghost" onClick={handleLogout} className="lg:hidden gap-2">
              <LogOut className="h-4 w-4" /> {t("inst.logout")}
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
            {[
              { label: t("inst.totalApplicants"), value: mockApplicants.length, icon: Users, trend: "+12%", trendUp: true, color: "text-primary" },
              { label: t("inst.avgReadiness"), value: `${avgScore}/100`, icon: BarChart3, trend: "+5pts", trendUp: true, color: "text-secondary" },
              { label: t("inst.highPotential"), value: highPotential, icon: TrendingUp, trend: "+3", trendUp: true, color: "text-accent" },
              { label: t("inst.pendingReview"), value: pendingCount, icon: Clock, trend: "−2", trendUp: false, color: "text-destructive" },
            ].map((card, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{card.label}</span>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </div>
                <p className="text-2xl font-bold font-heading text-foreground">{card.value}</p>
                <span className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${card.trendUp ? "text-secondary" : "text-destructive"}`}>
                  {card.trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {card.trend}
                </span>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("inst.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="relative">
              <select
                value={filterIndustry}
                onChange={(e) => setFilterIndustry(e.target.value)}
                className="h-10 rounded-lg border border-border bg-card px-3 pr-8 text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label={t("inst.filterIndustry")}
              >
                <option value="all">{t("inst.allIndustries")}</option>
                {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="h-10 rounded-lg border border-border bg-card px-3 pr-8 text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label={t("inst.filterRisk")}
              >
                <option value="all">{t("inst.allRisks")}</option>
                <option value="low">{t("inst.lowRisk")}</option>
                <option value="medium">{t("inst.mediumRisk")}</option>
                <option value="high">{t("inst.highRisk")}</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Applicant Table */}
          <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">{t("inst.applicantName")}</th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">{t("inst.industry")}</th>
                    <th className="px-4 py-3 text-center font-semibold text-foreground">{t("inst.score")}</th>
                    <th className="px-4 py-3 text-center font-semibold text-foreground">{t("inst.risk")}</th>
                    <th className="px-4 py-3 text-center font-semibold text-foreground">{t("inst.status")}</th>
                    <th className="px-4 py-3 text-center font-semibold text-foreground">{t("inst.action")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">{t("inst.noApplicants")}</td></tr>
                  ) : filtered.map(applicant => (
                    <tr key={applicant.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-semibold text-foreground">{applicant.name}</p>
                          <p className="text-xs text-muted-foreground">{applicant.location}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{applicant.industry}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center justify-center h-9 w-9 rounded-full text-xs font-bold ${
                          applicant.score >= 70 ? "bg-secondary/10 text-secondary" :
                          applicant.score >= 50 ? "bg-accent/10 text-accent" :
                          "bg-destructive/10 text-destructive"
                        }`}>{applicant.score}</span>
                      </td>
                      <td className="px-4 py-3 text-center">{getRiskBadge(applicant.risk)}</td>
                      <td className="px-4 py-3 text-center">{getStatusBadge(applicant.status)}</td>
                      <td className="px-4 py-3 text-center">
                        <Button size="sm" variant="outline" className="gap-1 text-xs">
                          <Eye className="h-3 w-3" /> {t("inst.review")}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Risk Distribution + Community Impact */}
          <div className="grid gap-6 lg:grid-cols-2 mt-6">
            {/* Risk Distribution */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
              <h3 className="flex items-center gap-2 font-heading font-semibold text-foreground mb-4">
                <Activity className="h-5 w-5 text-primary" /> {t("inst.riskMonitor")}
              </h3>
              <div className="space-y-3">
                {[
                  { label: t("inst.lowRisk"), count: mockApplicants.filter(a => a.risk === "low").length, color: "bg-secondary", total: mockApplicants.length },
                  { label: t("inst.mediumRisk"), count: mockApplicants.filter(a => a.risk === "medium").length, color: "bg-accent", total: mockApplicants.length },
                  { label: t("inst.highRisk"), count: mockApplicants.filter(a => a.risk === "high").length, color: "bg-destructive", total: mockApplicants.length },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      <span className="text-sm font-bold text-foreground">{item.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${(item.count / item.total) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Impact Summary */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
              <h3 className="flex items-center gap-2 font-heading font-semibold text-foreground mb-4">
                <PieChart className="h-5 w-5 text-secondary" /> {t("inst.communityImpact")}
              </h3>
              <div className="space-y-3">
                {mockApplicants.slice(0, 5).map((a, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10 text-xs font-bold text-secondary">{a.communityImpact}</div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{a.name}</p>
                        <p className="text-xs text-muted-foreground">{a.industry}</p>
                      </div>
                    </div>
                    <div className="h-2 w-20 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-secondary" style={{ width: `${a.communityImpact}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default InstitutionDashboard;
