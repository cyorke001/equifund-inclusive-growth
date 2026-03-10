import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, KeyRound, Building2, User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AuthMode = "login" | "signup";
type UserType = "entrepreneur" | "institution";

const AuthPage = ({ defaultMode = "login" }: { defaultMode?: AuthMode }) => {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [userType, setUserType] = useState<UserType>("entrepreneur");
  const [showPassword, setShowPassword] = useState(false);
  const [tokenError, setTokenError] = useState("");
  const navigate = useNavigate();

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [institutionToken, setInstitutionToken] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup" && userType === "institution") {
      if (!institutionToken || institutionToken.trim().length < 6) {
        setTokenError("A valid institution token is required. Contact EquiFund to request one.");
        return;
      }
      if (institutionToken !== "EQUI-2026") {
        setTokenError("Invalid institution token. Please verify your access code or contact support.");
        return;
      }
    }
    setTokenError("");
    // Navigate to appropriate dashboard
    if (userType === "institution") {
      navigate("/lender-dashboard");
    } else {
      navigate("/entrepreneur-dashboard");
    }
  };

  return (
    <main id="main-content" className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-6" aria-label="Back to home">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <span className="text-xl font-bold text-primary-foreground font-heading">E</span>
            </div>
            <span className="text-2xl font-bold text-foreground font-heading">EquiFund</span>
          </Link>
          <h1 className="text-2xl font-bold font-heading text-foreground">
            {mode === "login" ? "Welcome Back" : "Create Your Account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "login" ? "Log in to continue your journey." : "Join the EquiFund platform today."}
          </p>
        </div>

        {/* Mode toggle */}
        <div className="mb-6 flex rounded-xl border border-border bg-muted p-1">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${
              mode === "login" ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all ${
              mode === "signup" ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* User type selector (signup only) */}
        {mode === "signup" && (
          <div className="mb-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => { setUserType("entrepreneur"); setTokenError(""); }}
              className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                userType === "entrepreneur"
                  ? "border-secondary bg-secondary/5 shadow-soft"
                  : "border-border bg-card hover:border-muted-foreground/30"
              }`}
              aria-pressed={userType === "entrepreneur"}
            >
              <User className={`h-6 w-6 ${userType === "entrepreneur" ? "text-secondary" : "text-muted-foreground"}`} />
              <span className={`text-sm font-medium ${userType === "entrepreneur" ? "text-foreground" : "text-muted-foreground"}`}>
                Entrepreneur
              </span>
              <span className="text-xs text-muted-foreground">Default</span>
            </button>
            <button
              onClick={() => setUserType("institution")}
              className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                userType === "institution"
                  ? "border-primary bg-primary/5 shadow-soft"
                  : "border-border bg-card hover:border-muted-foreground/30"
              }`}
              aria-pressed={userType === "institution"}
            >
              <Building2 className={`h-6 w-6 ${userType === "institution" ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-sm font-medium ${userType === "institution" ? "text-foreground" : "text-muted-foreground"}`}>
                Financial Institution
              </span>
              <span className="text-xs text-muted-foreground">Token required</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                {userType === "institution" ? "Your Full Name" : "Full Name"}
              </label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} placeholder="Enter your name" />
            </div>
          )}

          {mode === "signup" && userType === "institution" && (
            <div>
              <label htmlFor="institutionName" className="mb-1.5 block text-sm font-medium text-foreground">Institution Name</label>
              <Input id="institutionName" value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} required maxLength={200} placeholder="Bank, credit union, or organization name" />
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
              {userType === "institution" ? "Official Work Email" : "Email"}
            </label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} placeholder="you@example.com" />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Min. 8 characters"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Institution token */}
          {mode === "signup" && userType === "institution" && (
            <div>
              <label htmlFor="token" className="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground">
                <KeyRound className="h-4 w-4 text-primary" />
                Institution Access Token
              </label>
              <Input
                id="token"
                value={institutionToken}
                onChange={(e) => { setInstitutionToken(e.target.value); setTokenError(""); }}
                required
                placeholder="Enter your institution token"
                className={tokenError ? "border-destructive" : ""}
              />
              {tokenError && (
                <p className="mt-1.5 flex items-start gap-1.5 text-xs text-destructive">
                  <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  {tokenError}
                </p>
              )}
              <p className="mt-1.5 text-xs text-muted-foreground">
                Don't have a token? <Link to="/contact" className="text-primary hover:underline">Contact us</Link> to request institutional access.
              </p>
            </div>
          )}

          <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold gap-2" size="lg">
            {mode === "login" ? "Log In" : "Create Account"} <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "login" ? (
            <>Don't have an account? <button onClick={() => setMode("signup")} className="text-primary font-medium hover:underline">Sign up</button></>
          ) : (
            <>Already have an account? <button onClick={() => setMode("login")} className="text-primary font-medium hover:underline">Log in</button></>
          )}
        </p>
      </motion.div>
    </main>
  );
};

export default AuthPage;
