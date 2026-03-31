import { AdminLayout } from "@/layouts/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { Eye, MousePointer, Clock, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const viewsData = [
  { month: "Sep", views: 8200, clicks: 620 },
  { month: "Oct", views: 12400, clicks: 980 },
  { month: "Nov", views: 15800, clicks: 1250 },
  { month: "Dec", views: 22100, clicks: 1800 },
  { month: "Jan", views: 28400, clicks: 2200 },
  { month: "Feb", views: 34600, clicks: 2900 },
];

const contentPerformance = [
  { title: "The Lodge S2", views: 12400, clicks: 980 },
  { title: "Murder at Castlewick", views: 22100, clicks: 1800 },
  { title: "Summer Beats Vol 3", views: 8200, clicks: 620 },
  { title: "Arena Clash", views: 5600, clicks: 450 },
];

export default function PublisherAnalytics() {
  return (
    <AdminLayout type="publisher" title="Analytics" subtitle="Content performance and audience insights">
      <div className="space-y-6 animate-slide-up">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Views" value="45.2K" change="+18%" icon={Eye} />
          <StatCard title="Total Clicks" value="3.8K" change="+12%" icon={MousePointer} />
          <StatCard title="Avg Watch Time" value="42m" change="+5%" icon={Clock} />
          <StatCard title="Growth Rate" value="+22%" change="+4%" icon={TrendingUp} />
        </div>

        {/* Views Over Time */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-6">Views & Clicks Over Time</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={viewsData}>
                <defs>
                  <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(15, 90%, 58%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(15, 90%, 58%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" />
                <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(220, 18%, 12%)", border: "1px solid hsl(220, 15%, 20%)", borderRadius: "8px", color: "hsl(210, 40%, 98%)" }} />
                <Area type="monotone" dataKey="views" stroke="hsl(15, 90%, 58%)" fill="url(#viewsGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="clicks" stroke="hsl(265, 75%, 60%)" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Performance */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-6">Content Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contentPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" />
                <XAxis type="number" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis dataKey="title" type="category" stroke="hsl(215, 20%, 55%)" fontSize={12} width={150} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(220, 18%, 12%)", border: "1px solid hsl(220, 15%, 20%)", borderRadius: "8px", color: "hsl(210, 40%, 98%)" }} />
                <Bar dataKey="views" fill="hsl(15, 90%, 58%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
