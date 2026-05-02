import { CreatorLayout } from "@/layouts/CreatorLayout";
import { Eye, Users, TrendingUp, DollarSign } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const viewsData = [
  { day: "Mon", views: 4200 }, { day: "Tue", views: 5800 }, { day: "Wed", views: 3900 },
  { day: "Thu", views: 7200 }, { day: "Fri", views: 6100 }, { day: "Sat", views: 8900 }, { day: "Sun", views: 7600 },
];

const revenueData = [
  { month: "Jan", revenue: 1200 }, { month: "Feb", revenue: 1800 }, { month: "Mar", revenue: 2400 },
  { month: "Apr", revenue: 3200 },
];

const summaryStats = [
  { label: "Total Views", value: "124.8K", icon: Eye, color: "text-primary" },
  { label: "Followers", value: "12.4K", icon: Users, color: "text-accent" },
  { label: "Engagement", value: "8.7%", icon: TrendingUp, color: "text-success" },
  { label: "Earnings", value: "$3,240", icon: DollarSign, color: "text-warning" },
];

const tooltipStyle = { background: "hsl(220, 18%, 12%)", border: "1px solid hsl(220, 15%, 20%)", borderRadius: 8, fontSize: 12 };

export default function CreatorAnalytics() {
  return (
    <CreatorLayout
      title="Analytics"
      subtitle="Track your performance and growth."
      breadcrumbs={[{ label: "Creator Studio", path: "/creator/dashboard" }, { label: "Analytics" }]}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryStats.map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4 hover:-translate-y-0.5 hover:shadow-elevated transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-secondary/60 flex items-center justify-center">
                <s.icon className={cn("h-4 w-4", s.color)} />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">{s.label}</p>
                <p className="text-lg font-display font-bold text-foreground">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Views (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={viewsData}>
              <defs>
                <linearGradient id="aViewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(25, 95%, 55%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(25, 95%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "hsl(210, 40%, 98%)" }} />
              <Area type="monotone" dataKey="views" stroke="hsl(25, 95%, 55%)" fill="url(#aViewsGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Revenue (Monthly)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "hsl(210, 40%, 98%)" }} />
              <Bar dataKey="revenue" fill="hsl(200, 85%, 55%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CreatorLayout>
  );
}
