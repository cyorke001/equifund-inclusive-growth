import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, KeyRound, Building2, User, AlertCircle, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type AuthMode = "login" | "signup";
type UserType = "entrepreneur" | "institution";

const demoTokens = [
  { token: "EQUI-TD-2026", institution: "TD Bank" },
  { token: "EQUI-RBC-2026", institution: "RBC Royal Bank" },
  { token: "EQUI-BDC-2026", institution: "BDC" },
  { token: "EQUI-SCOTIA-2026", institution: "Scotiabank" },
  { token: "EQUI-CCU-2026", institution: "Community Credit Union" },
  { token: "EQUI-2026", institution: "Demo Institution" },
];

const AuthPage = ({ defaultMode = "login" }: { defaultMode?: AuthMode }) => {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [userType, setUserType] = useState<UserType>("entrepreneur");
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoTokens, setShowDemoTokens] = useState(false);
  const [tokenError, setTokenError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp, isLoggedIn, isLoading, profile } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [institutionToken, setInstitutionToken] = useState("");

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      if (profile?.user_type === "institution") {
        navigate("/institution-dashboard", { replace: true });
      } else {
        navigate("/entrepreneur-dashboard", { replace: true });
      }
    }
  }, [isLoggedIn, isLoading, navigate, profile]);

  const validateToken = async (token: string): Promise<{ valid: boolean; instName?: string }> => {
    const { data, error } = await supabase
      .from("institution_tokens")
      .select("institution_name, is_active")
      .eq("token", token.trim())
      .maybeSingle();
    if (error || !data || !data.is_active) return { valid: false };
    return { valid: true, instName: data.institution_name };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    let resolvedInstitutionName = institutionName;
    if (userType === "institution") {
      if (!institutionToken || institutionToken.trim().length < 4) {
        setTokenError(t("auth.tokenNeeded"));
        return;
      }
      setSubmitting(true);
      const { valid, instName } = await validateToken(institutionToken);
      if (!valid) {
        setTokenError(t("auth.invalidToken"));
        setSubmitting(false);
        return;
      }
      if (instName) {
        resolvedInstitutionName = instName;
        setInstitutionName(instName);
      }
    } else {
      setSubmitting(true);
    }
    setTokenError("");

    try {
      if (mode === "signup") {
        const { error } = await signUp(email, password, {
          name: name || email.split("@")[0],
          user_type: userType,
          ...(userType === "institution" ? { institution_name: resolvedInstitutionName } : {}),
        });
        if (error) {
          toast({ title: t("auth.signupFailed"), description: error.message, variant: "destructive" });
          return;
        }
        toast({ title: t("auth.accountCreated"), description: t("auth.welcome") });
        // Navigate based on selected role after signup
        if (userType === "institution") {
          navigate("/institution-dashboard", { replace: true });
        } else {
          navigate("/entrepreneur-dashboard", { replace: true });
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast({ title: t("auth.loginFailed"), description: error.message, variant: "destructive" });
          return;
        }
        // For institution login, update the profile with institution_name from the validated token
        if (userType === "institution" && resolvedInstitutionName) {
          const { data: { user: currentUser } } = await supabase.auth.getUser();
          if (currentUser) {
            await supabase
              .from("profiles")
              .update({ institution_name: institutionName })
              .eq("user_id", currentUser.id);
          }
        }
        // Navigate immediately based on selected role after login
        if (userType === "institution") {
          navigate("/institution-dashboard", { replace: true });
        } else {
          navigate("/entrepreneur-dashboard", { replace: true });
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </main>
    );
  }

  return (
    <main id="main-content" className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background py-12 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-6" aria-label="Back to home">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <span className="text-xl font-bold text-primary-foreground font-heading">E</span>
            </div>
            <span className="text-2xl font-bold text-foreground font-heading">EquiFund</span>
          </Link>
          <h1 className="text-2xl font-bold font-heading text-foreground">
            {mode === "login" ? t("auth.welcomeBack") : t("auth.createAccount")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "login" ? t("auth.loginSubtitle") : t("auth.signupSubtitle")}
          </p>
        </div>

        <div className="mb-6 flex rounded-xl border border-border bg-muted p-1">
          <button onClick={() => setMode("login")}
            className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${mode === "login" ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"}`}>
            {t("auth.login")}
          </button>
          <button onClick={() => setMode("signup")}
            className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${mode === "signup" ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"}`}>
            {t("auth.signup")}
          </button>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3">
          <button onClick={() => { setUserType("entrepreneur"); setTokenError(""); }}
            className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${userType === "entrepreneur" ? "border-secondary bg-secondary/5 shadow-soft" : "border-border bg-card hover:border-muted-foreground/30"}`}
            aria-pressed={userType === "entrepreneur"}>
            <User className={`h-6 w-6 ${userType === "entrepreneur" ? "text-secondary" : "text-muted-foreground"}`} />
            <span className={`text-sm font-medium ${userType === "entrepreneur" ? "text-foreground" : "text-muted-foreground"}`}>{t("auth.entrepreneur")}</span>
            {mode === "signup" && <span className="text-xs text-muted-foreground">{t("auth.default")}</span>}
          </button>
          <button onClick={() => setUserType("institution")}
            className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${userType === "institution" ? "border-primary bg-primary/5 shadow-soft" : "border-border bg-card hover:border-muted-foreground/30"}`}
            aria-pressed={userType === "institution"}>
            <Building2 className={`h-6 w-6 ${userType === "institution" ? "text-primary" : "text-muted-foreground"}`} />
            <span className={`text-sm font-medium ${userType === "institution" ? "text-foreground" : "text-muted-foreground"}`}>{t("auth.institution")}</span>
            {mode === "signup" && <span className="text-xs text-muted-foreground">{t("auth.tokenRequired")}</span>}
          </button>
        </div>


        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">{t("auth.fullName")}</label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} placeholder={t("auth.namePlaceholder")} />
            </div>
          )}

          {mode === "signup" && userType === "institution" && (
            <div>
              <label htmlFor="institutionName" className="mb-1.5 block text-sm font-medium text-foreground">{t("auth.institutionName")}</label>
              <Input id="institutionName" value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} required maxLength={200} placeholder={t("auth.institutionPlaceholder")} />
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">{t("auth.email")}</label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} placeholder={t("auth.emailPlaceholder")} />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">{t("auth.password")}</label>
            <div className="relative">
              <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} placeholder={t("auth.passwordPlaceholder")} className="pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {userType === "institution" && (
            <div>
              <label htmlFor="token" className="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground">
                <KeyRound className="h-4 w-4 text-primary" /> Institution Access Token
              </label>
              <Input id="token" value={institutionToken} onChange={(e) => { setInstitutionToken(e.target.value); setTokenError(""); }} required placeholder="e.g. EQUI-TD-2026" className={tokenError ? "border-destructive" : ""} />
              {tokenError && (
                <p className="mt-1.5 flex items-start gap-1.5 text-xs text-destructive">
                  <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" /> {tokenError}
                </p>
              )}
              <div className="mt-2">
                <button type="button" onClick={() => setShowDemoTokens(!showDemoTokens)}
                  className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
                  <Info className="h-3.5 w-3.5" /> {showDemoTokens ? t("auth.hideDemoTokens") : t("auth.viewDemoTokens")}
                </button>
                {showDemoTokens && (
                  <div className="mt-2 rounded-lg border border-border bg-muted p-3 space-y-1.5">
                    <p className="text-xs font-semibold text-foreground mb-2">{t("auth.demoTokensTitle")}</p>
                    {demoTokens.map((dt) => (
                      <button key={dt.token} type="button"
                        onClick={() => { setInstitutionToken(dt.token); setInstitutionName(dt.institution); setTokenError(""); }}
                        className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs hover:bg-card transition-colors text-left">
                        <span className="font-mono font-semibold text-primary">{dt.token}</span>
                        <span className="text-muted-foreground">{dt.institution}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <Button type="submit" disabled={submitting} className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold gap-2" size="lg">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {mode === "login" ? t("auth.login") : t("auth.signup")} <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "login" ? (
            <>{t("auth.noAccount")} <button onClick={() => setMode("signup")} className="text-primary font-medium hover:underline">{t("auth.signup")}</button></>
          ) : (
            <>{t("auth.haveAccount")} <button onClick={() => setMode("login")} className="text-primary font-medium hover:underline">{t("auth.login")}</button></>
          )}
        </p>
      </motion.div>
    </main>
  );
};

export default AuthPage;
