import { Settings, User, Bell, Shield, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

const SettingsSection = () => {
  const { profile } = useAuth();

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-lg font-heading font-bold text-foreground flex items-center gap-2">
        <Settings className="h-5 w-5 text-primary" /> Settings
      </h2>

      {/* Profile */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <User className="h-4 w-4 text-primary" /> Institution Profile
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Institution Name</label>
            <Input value={profile?.institution_name || ""} readOnly className="mt-1 h-9 text-sm bg-muted/30" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Contact Name</label>
            <Input value={profile?.name || ""} readOnly className="mt-1 h-9 text-sm bg-muted/30" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Bell className="h-4 w-4 text-accent" /> Notification Preferences
        </h3>
        <div className="space-y-3">
          {[
            { label: "New application received", desc: "Get notified when a new application enters your pipeline." },
            { label: "High-risk alerts", desc: "Immediate alerts for flagged or high-risk applications." },
            { label: "Weekly portfolio summary", desc: "Receive a weekly digest of pipeline activity." },
          ].map((item, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring" />
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Shield className="h-4 w-4 text-secondary" /> Security
        </h3>
        <div className="space-y-3">
          <Button variant="outline" size="sm" className="text-xs">Change Password</Button>
          <p className="text-xs text-muted-foreground">Manage access credentials and authentication settings for your institution account.</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
