import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, Video, Store, TrendingUp, Radio, ShoppingCart, Activity, Clock } from "lucide-react";

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

export default function AdminDashboard() {
  return (
    <SuperAdminLayout title="Dashboard" subtitle="Platform overview & real-time metrics" breadcrumbs={[{ label: "Dashboard" }]}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card border-border hover:border-primary/20 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
                {stat.change && (
                  <span className={`text-xs font-medium ${stat.trend === "up" ? "text-green-400" : stat.trend === "down" ? "text-red-400" : "text-muted-foreground"}`}>{stat.change}</span>
                )}
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
            {pendingApprovals.map((item) => (
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
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 py-1">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div><p className="text-xs text-foreground"><span className="font-medium">{a.user}</span> <span className="text-muted-foreground">{a.action}</span></p><p className="text-[10px] text-muted-foreground mt-0.5">{a.time}</p></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </SuperAdminLayout>
  );
}
