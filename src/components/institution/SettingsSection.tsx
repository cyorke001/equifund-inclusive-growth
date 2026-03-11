import { Settings, User, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const SettingsSection = () => {
  const { profile } = useAuth();

  return (
    <div className="space-y-5 max-w-2xl">
      <h2 className="text-[14px] font-heading font-bold text-inst-card-text flex items-center gap-2">
        <Settings className="h-5 w-5 text-inst-accent" /> Settings
      </h2>

      {/* Profile */}
      <div className="inst-card p-5">
        <h3 className="text-[11px] font-bold text-inst-card-muted uppercase tracking-wider mb-4 flex items-center gap-2">
          <User className="h-4 w-4 text-inst-accent" /> Institution Profile
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-[10px] font-medium text-inst-card-muted uppercase tracking-wider">Institution Name</label>
            <input value={profile?.institution_name || ""} readOnly className="inst-input mt-1 h-9 w-full px-3 bg-inst-table-header" />
          </div>
          <div>
            <label className="text-[10px] font-medium text-inst-card-muted uppercase tracking-wider">Contact Name</label>
            <input value={profile?.name || ""} readOnly className="inst-input mt-1 h-9 w-full px-3 bg-inst-table-header" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="inst-card p-5">
        <h3 className="text-[11px] font-bold text-inst-card-muted uppercase tracking-wider mb-4 flex items-center gap-2">
          <Bell className="h-4 w-4 text-amber-500" /> Notification Preferences
        </h3>
        <div className="space-y-3">
          {[
            { label: "New application received", desc: "Notify when a new application enters your pipeline." },
            { label: "High-risk alerts", desc: "Immediate alerts for flagged or elevated-risk applications." },
            { label: "Weekly portfolio digest", desc: "Receive a weekly summary of pipeline activity and decisions." },
          ].map((item, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer rounded-md border border-inst-card-border p-3 hover:bg-inst-table-hover transition-colors">
              <input type="checkbox" defaultChecked className="mt-0.5 h-4 w-4 rounded border-gray-300" />
              <div>
                <p className="text-[12px] font-medium text-inst-card-text">{item.label}</p>
                <p className="text-[10px] text-inst-card-muted">{item.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="inst-card p-5">
        <h3 className="text-[11px] font-bold text-inst-card-muted uppercase tracking-wider mb-4 flex items-center gap-2">
          <Shield className="h-4 w-4 text-emerald-600" /> Security
        </h3>
        <div className="space-y-3">
          <button className="inline-flex items-center gap-2 rounded-md border border-inst-card-border px-3 py-2 text-[11px] font-medium text-inst-card-text hover:bg-inst-table-hover transition-colors">
            Change Password
          </button>
          <p className="text-[10px] text-inst-card-muted">Manage access credentials and authentication settings for your institution account.</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
