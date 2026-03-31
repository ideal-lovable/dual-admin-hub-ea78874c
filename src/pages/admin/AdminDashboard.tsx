import { useLocation, useNavigate } from "react-router-dom";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, DollarSign, Video, Store, TrendingUp, Radio, ShoppingCart, Activity, Clock, LayoutGrid } from "lucide-react";

const stats = [
  { label: "Total Users", value: "124,892", change: "+12.5%", icon: Users, trend: "up" },
  { label: "Monthly Revenue", value: "$892,450", change: "+8.3%", icon: DollarSign, trend: "up" },
  { label: "Active Content", value: "34,201", change: "+15.2%", icon: Video, trend: "up" },
  { label: "Active Stores", value: "2,847", change: "+4.1%", icon: Store, trend: "up" },
  { label: "Live Now", value: "23", change: "", icon: Radio, trend: "neutral" },
  { label: "Pending Orders", value: "1,205", change: "-3.2%", icon: ShoppingCart, trend: "down" },
  { label: "Conversion Rate", value: "4.8%", change: "+0.3%", icon: TrendingUp, trend: "up" },
  { label: "Platform Health", value: "99.9%", change: "", icon: Activity, trend: "neutral" },
];

const recentActivity = [
  { user: "Creator @janedoe", action: "uploaded a new video", time: "2 min ago" },
  { user: "Store 'Urban Fits'", action: "submitted for approval", time: "5 min ago" },
  { user: "Admin Mike", action: "approved 12 videos", time: "10 min ago" },
  { user: "Creator @beats_live", action: "started a livestream", time: "12 min ago" },
  { user: "Store 'Tech Haven'", action: "flagged for policy violation", time: "18 min ago" },
  { user: "User #84932", action: "reported content #2841", time: "25 min ago" },
];

const pendingApprovals = [
  { type: "Content", count: 28, priority: "high" },
  { type: "Storefronts", count: 5, priority: "medium" },
  { type: "Creator Verification", count: 12, priority: "high" },
  { type: "Refund Requests", count: 8, priority: "medium" },
  { type: "Flagged Reports", count: 15, priority: "high" },
];

const healthMetrics = [
  { label: "API Uptime", value: "99.99%", status: "healthy" },
  { label: "Avg Response Time", value: "142ms", status: "healthy" },
  { label: "Error Rate", value: "0.02%", status: "healthy" },
  { label: "Database Load", value: "34%", status: "healthy" },
  { label: "CDN Cache Hit", value: "97.8%", status: "healthy" },
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

export default function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = pathToTab[location.pathname] || "overview";

  return (
    <SuperAdminLayout title="Dashboard" subtitle="Platform overview & real-time metrics" breadcrumbs={[{ label: "Dashboard" }]}>
      <Tabs value={activeTab} onValueChange={(v) => navigate(tabToPath[v])} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview"><LayoutGrid className="h-3.5 w-3.5 mr-1" />Overview</TabsTrigger>
          <TabsTrigger value="health"><Activity className="h-3.5 w-3.5 mr-1" />Platform Health</TabsTrigger>
          <TabsTrigger value="live"><Radio className="h-3.5 w-3.5 mr-1" />Live Metrics</TabsTrigger>
          <TabsTrigger value="revenue"><DollarSign className="h-3.5 w-3.5 mr-1" />Revenue</TabsTrigger>
          <TabsTrigger value="activity"><Clock className="h-3.5 w-3.5 mr-1" />Activity Feed</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {stats.map(stat => (
              <Card key={stat.label} className="bg-card border-border hover:border-primary/20 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center"><stat.icon className="h-4 w-4 text-primary" /></div>
                    {stat.change && <span className={`text-xs font-medium ${stat.trend === "up" ? "text-green-400" : stat.trend === "down" ? "text-red-400" : "text-muted-foreground"}`}>{stat.change}</span>}
                  </div>
                  <p className="text-2xl font-bold font-display text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 bg-card border-border">
              <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold flex items-center gap-2"><Radio className="h-4 w-4 text-primary animate-pulse" />Live Monitoring</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[["Active Livestreams", "23"], ["Real-time Viewers", "14,892"], ["Revenue (Today)", "$28,450"], ["Active Carts", "342"]].map(([label, val]) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-muted-foreground">{label}</span>
                    <span className="text-sm font-bold text-foreground">{val}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="lg:col-span-1 bg-card border-border">
              <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Pending Approvals</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {pendingApprovals.map(item => (
                  <div key={item.type} className="flex items-center justify-between py-2 rounded-lg px-3 bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <span className="text-sm text-foreground">{item.type}</span>
                    <Badge variant={item.priority === "high" ? "destructive" : "secondary"} className="text-[10px]">{item.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="lg:col-span-1 bg-card border-border">
              <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Activity Feed</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.slice(0, 5).map((a, i) => (
                  <div key={i} className="flex items-start gap-3 py-1">
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div><p className="text-xs text-foreground"><span className="font-medium">{a.user}</span> <span className="text-muted-foreground">{a.action}</span></p><p className="text-[10px] text-muted-foreground mt-0.5">{a.time}</p></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {healthMetrics.map(m => (
              <Card key={m.label} className={`bg-card border-border ${m.status === "warning" ? "border-orange-500/30" : ""}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                    <span className={`h-2 w-2 rounded-full ${m.status === "healthy" ? "bg-green-400" : "bg-orange-400"}`} />
                  </div>
                  <p className="text-2xl font-bold font-display">{m.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="live">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Active Livestreams", value: "23", icon: Radio },
              { label: "Real-time Viewers", value: "14,892", icon: Users },
              { label: "Revenue (Live)", value: "$12,450", icon: DollarSign },
              { label: "Active Carts", value: "342", icon: ShoppingCart },
            ].map(s => (
              <Card key={s.label} className="bg-card border-border">
                <CardContent className="p-4">
                  <s.icon className="h-4 w-4 text-primary mb-2" />
                  <p className="text-2xl font-bold font-display">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-sm">Active Streams</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: "Morning Yoga Flow", creator: "ZenSarah", viewers: 1420 },
                { title: "Gaming: Final Boss", creator: "ProGamer42", viewers: 8900 },
                { title: "Art & Chill", creator: "PaintQueen", viewers: 620 },
              ].map(s => (
                <div key={s.title} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <Radio className="h-4 w-4 text-red-400 animate-pulse" />
                    <div><p className="text-sm font-medium">{s.title}</p><p className="text-xs text-muted-foreground">by {s.creator}</p></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm font-bold">{s.viewers.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Today", value: "$28,450" },
              { label: "This Week", value: "$198,200" },
              { label: "This Month", value: "$892,450" },
              { label: "YTD", value: "$4.2M" },
            ].map(s => (
              <Card key={s.label} className="bg-card border-border">
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold font-display mt-1">{s.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-sm">Top Revenue Sources</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { source: "Product Sales", amount: "$645,200", pct: "72%" },
                { source: "Subscriptions", amount: "$142,800", pct: "16%" },
                { source: "Live Commerce", amount: "$89,450", pct: "10%" },
                { source: "Advertising", amount: "$15,000", pct: "2%" },
              ].map(r => (
                <div key={r.source} className="flex items-center justify-between p-2 border-b border-border last:border-0">
                  <span className="text-sm">{r.source}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold">{r.amount}</span>
                    <Badge variant="outline" className="text-xs">{r.pct}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-sm">Full Activity Feed</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                  <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground"><span className="font-medium">{a.user}</span> <span className="text-muted-foreground">{a.action}</span></p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SuperAdminLayout>
  );
}
