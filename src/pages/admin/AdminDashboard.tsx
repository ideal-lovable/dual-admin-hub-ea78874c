import { useLocation, useNavigate } from "react-router-dom";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, DollarSign, Video, TrendingUp, Radio, ShoppingCart, Activity, Clock, LayoutGrid, Zap, Lightbulb, AlertTriangle, CalendarDays, ArrowRight } from "lucide-react";

const stats = [
  { label: "Monthly Revenue", value: "$892,450", change: "+12.5%", icon: DollarSign, tone: "primary", note: "vs $793,200 last month", spark: "M 0 22 C 20 18, 36 17, 56 20 S 86 8, 112 11 S 152 5, 180 4" },
  { label: "Active Users", value: "124,892", change: "+8.3%", icon: Users, tone: "primary", note: "1,204 new this week", spark: "M 0 18 C 18 16, 34 15, 54 16 S 86 13, 110 12 S 150 14, 180 11" },
  { label: "Active Content", value: "34,201", change: "+15.2%", icon: Video, tone: "accent", note: "423 uploaded today", spark: "M 0 15 C 18 16, 34 17, 54 13 S 86 15, 110 10 S 150 13, 180 8" },
  { label: "Pending Orders", value: "1,205", change: "-3.2%", icon: ShoppingCart, tone: "warning", note: "Avg fulfillment: 1.8d", spark: "M 0 16 C 18 15, 34 14, 54 17 S 86 11, 110 12 S 150 15, 180 14", down: true },
];

const pendingActions = [
  { label: "Content needing review", count: 28, icon: Video, hot: true },
  { label: "Creator verifications", count: 12, icon: Users, hot: true },
  { label: "Storefronts pending", count: 5, icon: ShoppingCart },
  { label: "Flagged reports", count: 15, icon: AlertTriangle, hot: true },
  { label: "Refund requests", count: 8, icon: Video },
];

const insights = [
  { title: "Revenue dropped 10% from last week in the Electronics category", action: "View Analytics", tone: "warning", icon: TrendingUp },
  { title: "Creator @janedoe's content conversion rate increased 45% this month", action: "View Creator", tone: "success", icon: TrendingUp },
  { title: "3 storefronts flagged for policy violations — action required", action: "Review", tone: "destructive", icon: AlertTriangle },
  { title: "Livestream commerce revenue is trending 22% higher during 6–9 PM slots", action: "View Schedule", tone: "accent", icon: Lightbulb },
];

const healthMetrics = [
  { label: "API Uptime", value: "99.99%", status: "healthy" },
  { label: "Avg Response Time", value: "142ms", status: "healthy" },
  { label: "Error Rate", value: "0.02%", status: "healthy" },
  { label: "Queue Backlog", value: "12 jobs", status: "warning" },
];

const pathToTab: Record<string, string> = {
  "/admin/dashboard": "overview",
  "/admin/dashboard/health": "health",
  "/admin/dashboard/live": "live",
  "/admin/dashboard/revenue": "revenue",
  "/admin/dashboard/activity": "activity",
};
const tabToPath: Record<string, string> = {
  overview: "/admin/dashboard",
  health: "/admin/dashboard/health",
  live: "/admin/dashboard/live",
  revenue: "/admin/dashboard/revenue",
  activity: "/admin/dashboard/activity",
};

const toneClasses: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  warning: "bg-warning/10 text-warning",
  success: "bg-success/10 text-success",
  destructive: "bg-destructive/10 text-destructive",
};

export default function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = pathToTab[location.pathname] || "overview";

  return (
    <SuperAdminLayout title="Control Center" subtitle="Platform overview, insights & real-time metrics" breadcrumbs={[{ label: "Control Center" }]}> 
      <Tabs value={activeTab} onValueChange={(v) => navigate(tabToPath[v])} className="space-y-6">
        <TabsList className="bg-secondary border border-border p-1 rounded-xl">
          <TabsTrigger value="overview" className="gap-1.5"><LayoutGrid className="h-3.5 w-3.5" />Overview</TabsTrigger>
          <TabsTrigger value="health" className="gap-1.5"><Activity className="h-3.5 w-3.5" />Health</TabsTrigger>
          <TabsTrigger value="live" className="gap-1.5"><Radio className="h-3.5 w-3.5" />Live</TabsTrigger>
          <TabsTrigger value="revenue" className="gap-1.5"><DollarSign className="h-3.5 w-3.5" />Revenue</TabsTrigger>
          <TabsTrigger value="activity" className="gap-1.5"><Clock className="h-3.5 w-3.5" />Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map(stat => (
              <Card key={stat.label} className="bg-card border-border rounded-xl overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className={"h-10 w-10 rounded-xl flex items-center justify-center " + toneClasses[stat.tone]}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <span className={stat.down ? "text-xs font-bold text-destructive" : "text-xs font-bold text-success"}>↗ {stat.change}</span>
                  </div>
                  <p className="text-2xl font-extrabold font-display text-foreground tracking-tight">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  <svg viewBox="0 0 180 30" className="mt-4 h-8 w-full text-primary" aria-hidden="true">
                    <path d={stat.spark} fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <p className="text-[10px] text-muted-foreground/70 mt-2">{stat.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card className="bg-card border-border rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2"><Zap className="h-4 w-4 text-warning" />Pending Actions <Badge className="ml-auto bg-destructive text-destructive-foreground">68 total</Badge></CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingActions.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-xl bg-secondary/30 px-4 py-3 hover:bg-secondary/50 transition-colors">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground"><item.icon className="h-4 w-4" /></span>
                    <span className="flex-1 text-sm font-semibold text-foreground">{item.label}</span>
                    <Badge variant={item.hot ? "destructive" : "secondary"} className="text-[11px]">{item.count}</Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/50" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card border-border rounded-xl">
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2"><Lightbulb className="h-4 w-4 text-accent" />Smart Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {insights.map((insight) => (
                  <div key={insight.title} className={cnInsight(insight.tone)}>
                    <insight.icon className="mt-1 h-4 w-4 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{insight.title}</p>
                      <p className="mt-2 text-xs font-bold text-primary">{insight.action} ↗</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {healthMetrics.map(m => (
              <Card key={m.label} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                    <span className={m.status === "healthy" ? "h-2 w-2 rounded-full bg-success" : "h-2 w-2 rounded-full bg-warning"} />
                  </div>
                  <p className="text-2xl font-bold font-display">{m.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="live">
          <Card className="bg-card border-border"><CardContent className="p-6"><Radio className="h-5 w-5 text-destructive animate-pulse mb-2" /><p className="text-2xl font-bold">23 active livestreams</p><p className="text-sm text-muted-foreground">14,892 real-time viewers across business and creator channels.</p></CardContent></Card>
        </TabsContent>

        <TabsContent value="revenue">
          <Card className="bg-card border-border"><CardContent className="p-6"><DollarSign className="h-5 w-5 text-primary mb-2" /><p className="text-2xl font-bold">$892,450 monthly revenue</p><p className="text-sm text-muted-foreground">Product sales, subscriptions, live commerce, and advertising.</p></CardContent></Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="bg-card border-border"><CardContent className="p-6"><CalendarDays className="h-5 w-5 text-accent mb-2" /><p className="text-2xl font-bold">Live activity feed</p><p className="text-sm text-muted-foreground">Latest uploads, approvals, flagged reports, and order events.</p></CardContent></Card>
        </TabsContent>
      </Tabs>
    </SuperAdminLayout>
  );
}

function cnInsight(tone: string) {
  const map: Record<string, string> = {
    warning: "border-warning/40 bg-warning/10 text-warning",
    success: "border-success/35 bg-success/10 text-success",
    destructive: "border-destructive/40 bg-destructive/10 text-destructive",
    accent: "border-accent/35 bg-accent/10 text-accent",
  };
  return `flex gap-3 rounded-xl border px-4 py-4 ${map[tone]}`;
}
