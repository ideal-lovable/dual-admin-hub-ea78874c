import { CreatorLayout } from "@/layouts/CreatorLayout";
import { Bell, CheckCircle, AlertTriangle, Info, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const notifications = [
  { id: 1, type: "success", title: "Video Approved", message: "Your video 'Summer Collection Lookbook' has been approved.", time: "2 hours ago" },
  { id: 2, type: "warning", title: "Livestream Reminder", message: "Your scheduled livestream starts in 3 hours.", time: "3 hours ago" },
  { id: 3, type: "info", title: "New Product Assigned", message: "Brand 'TechCo' assigned 'Wireless Earbuds Pro' to you.", time: "5 hours ago" },
  { id: 4, type: "success", title: "Payout Processed", message: "Your payout of $1,240 has been sent to your account.", time: "1 day ago" },
  { id: 5, type: "warning", title: "Content Flagged", message: "Your video 'Collaboration with Brand X' was rejected. Review feedback.", time: "2 days ago" },
];

const typeConfig = {
  success: { icon: CheckCircle, color: "text-success", bg: "bg-success/10" },
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
  info: { icon: Info, color: "text-accent", bg: "bg-accent/10" },
};

export default function CreatorNotifications() {
  return (
    <CreatorLayout
      title="Notifications"
      subtitle="Stay updated on your content and earnings."
      breadcrumbs={[{ label: "Creator Studio", path: "/creator/dashboard" }, { label: "Notifications" }]}
    >
      {notifications.length > 0 ? (
        <div className="space-y-2">
          {notifications.map(n => {
            const config = typeConfig[n.type as keyof typeof typeConfig];
            const Icon = config.icon;
            return (
              <div key={n.id} className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 hover:bg-secondary/20 transition-colors">
                <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0", config.bg)}>
                  <Icon className={cn("h-4 w-4", config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{n.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                </div>
                <span className="text-[11px] text-muted-foreground shrink-0 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {n.time}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 rounded-xl border border-border bg-card">
          <Bell className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm font-medium text-muted-foreground">No notifications</p>
        </div>
      )}
    </CreatorLayout>
  );
}
