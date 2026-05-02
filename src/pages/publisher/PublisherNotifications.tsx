import { AdminLayout } from "@/layouts/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle, Clock, FileText, MessageSquare, XCircle } from "lucide-react";

const notifications = [
  { title: "Crossfire moved to Under Review", body: "The moderation team started reviewing your movie metadata and poster assets.", time: "12 min ago", type: "review" },
  { title: "Summer Beats Vol. 3 approved", body: "Your music release is now live and eligible for Discover placement.", time: "2h ago", type: "approved" },
  { title: "Metadata update requested", body: "Please add a maturity rating and trailer caption file for Tomorrow.", time: "Yesterday", type: "action" },
  { title: "Arena Clash featured by creator", body: "Noah Brooks added your title to a campaign collection.", time: "2 days ago", type: "message" },
];

const history = [
  { item: "The Lodge - Season 2", status: "Live", date: "Apr 25", icon: CheckCircle },
  { item: "Crossfire", status: "Under Review", date: "Apr 28", icon: Clock },
  { item: "Tomorrow", status: "Changes Requested", date: "Apr 27", icon: XCircle },
  { item: "Neon Nights EP", status: "Draft", date: "Apr 21", icon: FileText },
];

export default function PublisherNotifications() {
  return (
    <AdminLayout type="publisher" title="Notifications" subtitle="Approval updates, platform feedback, and submission history">
      <div className="grid gap-6 animate-slide-up lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="glass-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display flex items-center gap-2"><Bell className="h-5 w-5 text-primary" />Inbox</CardTitle>
            <Button variant="secondary" size="sm">Mark all read</Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((item) => (
              <div key={item.title} className="rounded-xl bg-secondary/50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0 capitalize">{item.type}</Badge>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">{item.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card border-border">
          <CardHeader><CardTitle className="font-display flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" />Submission History</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {history.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.item} className="flex items-center justify-between rounded-xl bg-secondary/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
                    <div>
                      <p className="font-medium text-foreground">{item.item}</p>
                      <p className="text-sm text-muted-foreground">{item.status}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}