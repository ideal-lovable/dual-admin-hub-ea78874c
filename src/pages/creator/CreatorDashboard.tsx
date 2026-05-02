import { CreatorLayout } from "@/layouts/CreatorLayout";
import { Eye, TrendingUp, DollarSign, Radio, Upload, CalendarDays, PlayCircle, ShoppingBag, ArrowUpRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

type ChangeType = "positive" | "negative" | "neutral";
const stats: { label: string; value: string; change: string; changeType: ChangeType; icon: any; gradient: string }[] = [
  { label: "Total Views", value: "124.8K", change: "+12.3%", changeType: "positive", icon: Eye, gradient: "from-primary/20 to-primary/5" },
  { label: "Engagement Rate", value: "8.7%", change: "+2.1%", changeType: "positive", icon: TrendingUp, gradient: "from-accent/20 to-accent/5" },
  { label: "Revenue", value: "$3,240", change: "+18.5%", changeType: "positive", icon: DollarSign, gradient: "from-success/20 to-success/5" },
  { label: "Active Livestreams", value: "2", change: "Live now", changeType: "neutral", icon: Radio, gradient: "from-destructive/20 to-destructive/5" },
];

const chartData7d = [
  { day: "Mon", views: 4200, engagement: 320 },
  { day: "Tue", views: 5800, engagement: 480 },
  { day: "Wed", views: 3900, engagement: 290 },
  { day: "Thu", views: 7200, engagement: 580 },
  { day: "Fri", views: 6100, engagement: 450 },
  { day: "Sat", views: 8900, engagement: 720 },
  { day: "Sun", views: 7600, engagement: 610 },
];

const chartData30d = [
  { day: "W1", views: 28000, engagement: 2100 },
  { day: "W2", views: 32000, engagement: 2600 },
  { day: "W3", views: 29000, engagement: 2300 },
  { day: "W4", views: 41000, engagement: 3400 },
];

const topVideos = [
  { title: "Summer Collection Lookbook", views: "42.1K", status: "approved" },
  { title: "BTS: Studio Session", views: "28.7K", status: "approved" },
  { title: "Product Review: Tech Gadgets", views: "19.3K", status: "pending" },
];

const upcomingStreams = [
  { title: "Friday Night Live Shopping", date: "Apr 4, 2026", time: "8:00 PM EST", status: "scheduled" },
  { title: "Q&A with Fans", date: "Apr 7, 2026", time: "6:00 PM EST", status: "scheduled" },
];

const topProducts = [
  { name: "Wireless Earbuds Pro", clicks: 1240, conversions: 89, rate: "7.2%" },
  { name: "Smart Watch Series X", clicks: 980, conversions: 62, rate: "6.3%" },
];

export default function CreatorDashboard() {
  const [chartRange, setChartRange] = useState<"7d" | "30d">("7d");
  const data = chartRange === "7d" ? chartData7d : chartData30d;

  return (
    <CreatorLayout
      title="Dashboard"
      subtitle="Welcome back! Here's your creator overview."
      breadcrumbs={[{ label: "Creator Studio" }, { label: "Dashboard" }]}
    >
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={cn(
              "relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated group"
            )}
          >
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60", stat.gradient)} />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                <p className="mt-1.5 text-2xl font-display font-bold text-foreground">{stat.value}</p>
                <p className={cn(
                  "mt-1 text-xs font-medium flex items-center gap-1",
                  stat.changeType === "positive" && "text-success",
                  stat.changeType === "negative" && "text-destructive",
                  stat.changeType === "neutral" && "text-muted-foreground"
                )}>
                  {stat.changeType === "positive" && <ArrowUpRight className="h-3 w-3" />}
                  {stat.change}
                </p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-background/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Performance</h2>
            <div className="flex gap-1 bg-secondary/50 rounded-lg p-0.5">
              {(["7d", "30d"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setChartRange(r)}
                  className={cn(
                    "px-3 py-1 text-[11px] font-medium rounded-md transition-colors",
                    chartRange === r ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {r === "7d" ? "7 Days" : "30 Days"}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(25, 95%, 55%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(25, 95%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(220, 18%, 12%)", border: "1px solid hsl(220, 15%, 20%)", borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: "hsl(210, 40%, 98%)" }}
              />
              <Area type="monotone" dataKey="views" stroke="hsl(25, 95%, 55%)" fill="url(#viewsGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="space-y-2.5">
            {[
              { label: "Upload Video", icon: Upload, path: "/creator/content/videos", color: "text-primary bg-primary/10 hover:bg-primary/20" },
              { label: "Request Live", icon: Radio, path: "/creator/live/create", color: "text-destructive bg-destructive/10 hover:bg-destructive/20" },
              { label: "Schedule Stream", icon: CalendarDays, path: "/creator/live/schedule", color: "text-accent bg-accent/10 hover:bg-accent/20" },
            ].map((action) => (
              <Link
                key={action.label}
                to={action.path}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                  action.color
                )}
              >
                <action.icon className="h-5 w-5" />
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Videos */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Top Content</h2>
            <Link to="/creator/content/videos" className="text-xs text-primary hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {topVideos.map((video, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-secondary/60 flex items-center justify-center">
                    <PlayCircle className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{video.title}</p>
                    <p className="text-[11px] text-muted-foreground">{video.views} views</p>
                  </div>
                </div>
                <span className={cn(
                  "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                  video.status === "approved" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
                )}>
                  {video.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Livestreams */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Upcoming Livestreams</h2>
            <Link to="/creator/live/schedule" className="text-xs text-primary hover:underline">Schedule</Link>
          </div>
          {upcomingStreams.length > 0 ? (
            <div className="space-y-3">
              {upcomingStreams.map((stream, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center">
                    <CalendarDays className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">{stream.title}</p>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {stream.date} · {stream.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarDays className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">No livestreams scheduled</p>
            </div>
          )}
        </div>

        {/* Product Performance */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Product Performance</h2>
            <Link to="/creator/products/performance" className="text-xs text-primary hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-muted-foreground font-medium">Product</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">Clicks</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">Conversions</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">Conv. Rate</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-2.5 font-medium text-foreground flex items-center gap-2">
                      <ShoppingBag className="h-3.5 w-3.5 text-muted-foreground" />
                      {product.name}
                    </td>
                    <td className="text-right py-2.5 text-muted-foreground">{product.clicks.toLocaleString()}</td>
                    <td className="text-right py-2.5 text-muted-foreground">{product.conversions}</td>
                    <td className="text-right py-2.5 text-success font-semibold">{product.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </CreatorLayout>
  );
}
