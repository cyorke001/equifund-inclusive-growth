import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2, LogOut, Loader2, LayoutDashboard, Users, Activity,
  Target, UserCheck, Heart, Settings, Bell, MessageSquare,
  Lightbulb, Sliders, GitPullRequest, Menu, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

const sidebarItems = [
  { key: "overview", icon: LayoutDashboard, label: "Overview" },
  { key: "pipeline", icon: GitPullRequest, label: "Pipeline" },
  { key: "review", icon: Users, label: "Applicant Review" },
  { key: "portfolio", icon: Target, label: "Portfolio Insights" },
  { key: "risk", icon: Activity, label: "Risk Monitoring" },
  { key: "opportunity", icon: Lightbulb, label: "Opportunity Scoring" },
  { key: "impact", icon: Heart, label: "Community Impact" },
  { key: "criteria", icon: Sliders, label: "Institution Criteria" },
  { key: "recommendations", icon: UserCheck, label: "Recommendations" },
  { key: "alerts", icon: Bell, label: "Alerts & Flags" },
  { key: "notes", icon: MessageSquare, label: "Notes & Decisions" },
  { key: "settings", icon: Settings, label: "Settings" },
];

const InstitutionDashboard = () => {
  const { profile, isLoggedIn, isLoading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
      <main className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
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

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 lg:hidden" onClick={() => setMobileSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transform transition-transform duration-200 lg:relative lg:translate-x-0 ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Logo / Brand */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
              <Building2 className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold font-heading truncate max-w-[140px]">{profile?.institution_name || "Institution"}</p>
              <p className="text-[10px] text-sidebar-foreground/50 uppercase tracking-wider">Lender Console</p>
            </div>
          </div>
          <button onClick={() => setMobileSidebarOpen(false)} className="lg:hidden text-sidebar-foreground/60 hover:text-sidebar-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5" role="navigation" aria-label="Institution Dashboard Navigation">
          {sidebarItems.map(item => (
            <button
              key={item.key}
              onClick={() => switchTab(item.key)}
              aria-current={activeTab === item.key ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                activeTab === item.key
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/65 hover:bg-sidebar-accent/40 hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
              {item.key === "alerts" && (
                <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">6</span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border px-3 py-3">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-sidebar-foreground/65 hover:bg-sidebar-accent/40 hover:text-sidebar-foreground transition-colors">
            <LogOut className="h-4 w-4" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileSidebarOpen(true)} className="lg:hidden rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Open navigation">
              <Menu className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-sm font-bold font-heading text-foreground">{sidebarItems.find(i => i.key === activeTab)?.label || "Dashboard"}</h1>
              <p className="text-[11px] text-muted-foreground">{profile?.institution_name || "Financial Institution"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Notifications" onClick={() => switchTab("alerts")}>
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">6</span>
            </button>
            <Button size="sm" variant="ghost" onClick={handleLogout} className="lg:hidden gap-1.5 text-xs">
              <LogOut className="h-3.5 w-3.5" /> Log Out
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6" id="main-content">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default InstitutionDashboard;
