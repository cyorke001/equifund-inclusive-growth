import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2, LogOut, Loader2, LayoutDashboard, Users, Activity,
  Target, UserCheck, Heart, Settings, Bell, MessageSquare,
  Lightbulb, Sliders, GitPullRequest, Menu, X, ChevronLeft,
  Search, Filter, ChevronsLeft, ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Applicant } from "@/components/institution/mockData";

import OverviewSection from "@/components/institution/OverviewSection";
import PipelineSection from "@/components/institution/PipelineSection";
import ApplicantReviewSection from "@/components/institution/ApplicantReviewSection";
import PortfolioInsightsSection from "@/components/institution/PortfolioInsightsSection";
import RiskMonitoringSection from "@/components/institution/RiskMonitoringSection";
import OpportunityScoringSection from "@/components/institution/OpportunityScoringSection";
import CommunityImpactSection from "@/components/institution/CommunityImpactSection";
import CriteriaSection from "@/components/institution/CriteriaSection";
import RecommendationsSection from "@/components/institution/RecommendationsSection";
import AlertsSection from "@/components/institution/AlertsSection";
import NotesSection from "@/components/institution/NotesSection";
import SettingsSection from "@/components/institution/SettingsSection";

const navGroups = [
  {
    label: "OPERATIONS",
    items: [
      { key: "overview", icon: LayoutDashboard, label: "Command Center" },
      { key: "pipeline", icon: GitPullRequest, label: "Pipeline" },
      { key: "review", icon: Users, label: "Applicant Review" },
    ],
  },
  {
    label: "ANALYTICS",
    items: [
      { key: "portfolio", icon: Target, label: "Portfolio Insights" },
      { key: "risk", icon: Activity, label: "Risk Monitoring" },
      { key: "opportunity", icon: Lightbulb, label: "Opportunity Scoring" },
      { key: "impact", icon: Heart, label: "Community Impact" },
    ],
  },
  {
    label: "CONFIGURATION",
    items: [
      { key: "criteria", icon: Sliders, label: "Lending Criteria" },
      { key: "recommendations", icon: UserCheck, label: "Decisions" },
      { key: "alerts", icon: Bell, label: "Alerts & Flags", badge: 6 },
      { key: "notes", icon: MessageSquare, label: "Notes & Collaboration" },
      { key: "settings", icon: Settings, label: "Settings" },
    ],
  },
];

const allItems = navGroups.flatMap(g => g.items);

const InstitutionDashboard = () => {
  const { profile, user, isLoggedIn, isLoading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");

  useEffect(() => {
    if (!authLoading && !isLoggedIn) navigate("/login", { replace: true });
  }, [authLoading, isLoggedIn, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSelectApplicant = (app: Applicant) => {
    setSelectedApplicant(app);
    setActiveTab("review");
  };

  const switchTab = (key: string) => {
    setActiveTab(key);
    setMobileSidebarOpen(false);
    if (key !== "review") setSelectedApplicant(null);
  };

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center inst-bg">
        <Loader2 className="h-8 w-8 animate-spin text-inst-muted" />
      </main>
    );
  }

  const renderSection = () => {
    switch (activeTab) {
      case "overview": return <OverviewSection />;
      case "pipeline": return <PipelineSection onSelectApplicant={handleSelectApplicant} />;
      case "review": return <ApplicantReviewSection selected={selectedApplicant} onSelect={setSelectedApplicant} />;
      case "portfolio": return <PortfolioInsightsSection />;
      case "risk": return <RiskMonitoringSection />;
      case "opportunity": return <OpportunityScoringSection onSelectApplicant={handleSelectApplicant} />;
      case "impact": return <CommunityImpactSection />;
      case "criteria": return <CriteriaSection />;
      case "recommendations": return <RecommendationsSection onSelectApplicant={handleSelectApplicant} />;
      case "alerts": return <AlertsSection />;
      case "notes": return <NotesSection />;
      case "settings": return <SettingsSection />;
      default: return <OverviewSection />;
    }
  };

  const initials = (profile?.name || "U").split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen inst-bg flex">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileSidebarOpen(false)} />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col inst-sidebar border-r border-inst-border transition-all duration-200 lg:relative lg:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${sidebarCollapsed ? "w-[68px]" : "w-[260px]"}`}
      >
        {/* Brand */}
        <div className={`flex items-center border-b border-inst-border ${sidebarCollapsed ? "justify-center px-2 py-4" : "justify-between px-4 py-4"}`}>
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-inst-accent">
                <Building2 className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-white tracking-tight">EquiFund</p>
                <p className="text-[9px] text-inst-muted uppercase tracking-[0.15em]">Lender Console</p>
              </div>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-inst-accent">
              <Building2 className="h-4 w-4 text-white" />
            </div>
          )}
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden text-inst-muted hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 inst-scrollbar" role="navigation" aria-label="Institution Dashboard Navigation">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-1">
              {!sidebarCollapsed && (
                <p className="px-4 pt-4 pb-1.5 text-[9px] font-semibold text-inst-muted uppercase tracking-[0.15em]">
                  {group.label}
                </p>
              )}
              {sidebarCollapsed && <div className="my-2 mx-3 border-t border-inst-border" />}
              <div className="space-y-0.5 px-2">
                {group.items.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => switchTab(item.key)}
                    aria-current={activeTab === item.key ? "page" : undefined}
                    title={sidebarCollapsed ? item.label : undefined}
                    className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[12px] font-medium transition-all ${
                      activeTab === item.key
                        ? "bg-inst-active text-white"
                        : "text-inst-muted hover:bg-white/5 hover:text-inst-text"
                    } ${sidebarCollapsed ? "justify-center" : ""}`}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!sidebarCollapsed && (
                      <>
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto flex h-4 min-w-[16px] items-center justify-center rounded bg-red-500 px-1 text-[9px] font-bold text-white">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                    {sidebarCollapsed && item.badge && (
                      <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[7px] font-bold text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Collapse toggle (desktop) */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex items-center justify-center border-t border-inst-border py-2.5 text-inst-muted hover:text-white hover:bg-white/5 transition-colors"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </button>

        {/* User card */}
        <div className={`border-t border-inst-border ${sidebarCollapsed ? "px-2 py-3" : "px-3 py-3"}`}>
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-2.5 rounded-md bg-white/5 px-3 py-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-inst-accent text-[11px] font-bold text-white shrink-0">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold text-white truncate">{profile?.name || "Reviewer"}</p>
                <p className="text-[10px] text-inst-muted truncate">{profile?.institution_name || "Institution"}</p>
              </div>
              <button
                onClick={handleLogout}
                className="shrink-0 rounded p-1 text-inst-muted hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Log out"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-inst-accent text-[11px] font-bold text-white">
                {initials}
              </div>
              <button
                onClick={handleLogout}
                className="rounded p-1 text-inst-muted hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Log out"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ===== MAIN AREA ===== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-inst-header-border bg-inst-header px-4 sm:px-6 h-14">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden rounded-md border border-inst-header-border p-1.5 text-inst-header-muted hover:text-inst-header-text hover:bg-inst-header-hover transition-colors"
              aria-label="Open navigation"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-[14px] font-bold font-heading text-inst-header-text tracking-tight">
                {allItems.find(i => i.key === activeTab)?.label || "Dashboard"}
              </h1>
              <p className="text-[10px] text-inst-header-muted leading-none mt-0.5">
                {profile?.institution_name || "Financial Institution"} · {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Global search */}
            <div className="hidden md:flex relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-inst-header-muted" />
              <input
                value={globalSearch}
                onChange={e => setGlobalSearch(e.target.value)}
                placeholder="Search applicants, notes..."
                className="h-8 w-56 rounded-md border border-inst-header-border bg-inst-header-hover pl-8 pr-3 text-[11px] text-inst-header-text placeholder:text-inst-header-muted focus:outline-none focus:ring-1 focus:ring-inst-accent"
              />
            </div>

            {/* Alert bell */}
            <button
              className="relative rounded-md border border-inst-header-border p-1.5 text-inst-header-muted hover:text-inst-header-text hover:bg-inst-header-hover transition-colors"
              aria-label="Alerts"
              onClick={() => switchTab("alerts")}
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">6</span>
            </button>

            {/* User pill */}
            <div className="hidden sm:flex items-center gap-2 rounded-md border border-inst-header-border px-2.5 py-1">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                {initials}
              </div>
              <div className="text-left">
                <p className="text-[11px] font-semibold text-inst-header-text leading-none">{profile?.name || "User"}</p>
                <p className="text-[9px] text-inst-header-muted leading-none mt-0.5">{profile?.institution_name || "Institution"}</p>
              </div>
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={handleLogout}
              className="lg:hidden gap-1 text-[11px] h-8 text-inst-header-muted hover:text-inst-header-text"
            >
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 inst-content-bg" id="main-content">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default InstitutionDashboard;
