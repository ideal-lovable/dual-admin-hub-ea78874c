import { CreatorLayout } from "@/layouts/CreatorLayout";
import { User, Lock, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function CreatorSettings() {
  return (
    <CreatorLayout
      title="Settings"
      subtitle="Manage your account and preferences."
      breadcrumbs={[{ label: "Creator Studio", path: "/creator/dashboard" }, { label: "Settings" }]}
    >
      <div className="max-w-2xl space-y-6">
        {/* Profile */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
            <User className="h-4 w-4 text-primary" /> Profile
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Display Name</label>
                <Input defaultValue="CreatorName" className="h-9 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
                <Input defaultValue="creator@email.com" className="h-9 text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Bio</label>
              <Input defaultValue="Content creator & live shopping host" className="h-9 text-sm" />
            </div>
            <Button size="sm" className="h-8 gradient-primary text-primary-foreground text-xs">Save Profile</Button>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
            <Bell className="h-4 w-4 text-accent" /> Notifications
          </h2>
          <div className="space-y-3">
            {["Email notifications", "Push notifications", "Stream reminders", "Product updates"].map(label => (
              <div key={label} className="flex items-center justify-between py-1">
                <span className="text-sm text-foreground">{label}</span>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-4">
            <Lock className="h-4 w-4 text-warning" /> Security
          </h2>
          <Button size="sm" variant="outline" className="h-8 text-xs">Change Password</Button>
        </div>
      </div>
    </CreatorLayout>
  );
}
