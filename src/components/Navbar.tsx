import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/i18n/translations";

const languages: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "am", label: "አማርኛ" },
  { code: "so", label: "Soomaali" },
  { code: "ar", label: "العربية" },
  { code: "es", label: "Español" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout, profile } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/how-it-works", label: t("nav.howItWorks") },
    { to: "/community-impact", label: t("nav.communityImpact") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <a href="#main-content" className="skip-to-content font-heading font-semibold">Skip to content</a>
      <nav className="container mx-auto flex h-16 items-center justify-between px-4" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-2" aria-label="EquiFund Home">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground font-heading">E</span>
          </div>
          <span className="text-xl font-bold text-foreground font-heading">EquiFund</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${
                location.pathname === link.to ? "text-primary font-semibold" : "text-muted-foreground"
              }`}>{link.label}</Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                <Globe className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm">{languages.find((l) => l.code === language)?.label}</span>
                <ChevronDown className="h-3 w-3" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)}
                  className={language === lang.code ? "bg-muted font-semibold" : ""}>
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {isLoggedIn ? (
            <>
              <Link to={profile?.user_type === "institution" ? "/institution-dashboard" : "/entrepreneur-dashboard"}>
                <Button variant="ghost" size="sm">{t("nav.dashboard")}</Button>
              </Link>
              <Button size="sm" variant="ghost" onClick={handleLogout}>{t("nav.logout")}</Button>
            </>
          ) : (
            <>
              <Link to="/login"><Button variant="ghost" size="sm">{t("nav.login")}</Button></Link>
              <Link to="/get-started">
                <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">{t("nav.getStarted")}</Button>
              </Link>
            </>
          )}
        </div>

        <button className="lg:hidden rounded-lg p-2 text-foreground hover:bg-muted"
          onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted ${
                  location.pathname === link.to ? "text-primary font-semibold bg-muted" : "text-muted-foreground"
                }`}>{link.label}</Link>
            ))}
          </div>
          <div className="mt-3 border-t border-border pt-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-full justify-start gap-1.5 text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <span>{languages.find((l) => l.code === language)?.label}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)}
                    className={language === lang.code ? "bg-muted font-semibold" : ""}>
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
            {isLoggedIn ? (
              <>
                <Link to={profile?.user_type === "institution" ? "/institution-dashboard" : "/entrepreneur-dashboard"} onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">{t("nav.dashboard")}</Button>
                </Link>
                <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleLogout}>{t("nav.logout")}</Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">{t("nav.login")}</Button>
                </Link>
                <Link to="/get-started" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full bg-secondary text-secondary-foreground font-semibold">{t("nav.getStarted")}</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
