import { useLocation, useNavigate } from "react-router-dom";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Eye, DollarSign, Video, Radio, Store, Target, PieChart, TrendingUp } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, Legend } from "recharts";

const userGrowthData = [
  { month: "Jul", subscribers: 800, creators: 120, businesses: 40, publishers: 10 },
  { month: "Aug", subscribers: 1200, creators: 180, businesses: 55, publishers: 15 },
  { month: "Sep", subscribers: 2100, creators: 290, businesses: 78, publishers: 22 },
  { month: "Oct", subscribers: 3500, creators: 450, businesses: 120, publishers: 35 },
  { month: "Nov", subscribers: 5800, creators: 680, businesses: 210, publishers: 52 },
  { month: "Dec", subscribers: 8400, creators: 920, businesses: 350, publishers: 70 },
  { month: "Jan", subscribers: 12847, creators: 1203, businesses: 487, publishers: 89 },
];

const contentData = [
  { month: "Jul", videos: 120, livestreams: 30, picks: 80 },
  { month: "Aug", videos: 280, livestreams: 55, picks: 150 },
  { month: "Sep", videos: 450, livestreams: 90, picks: 280 },
  { month: "Oct", videos: 680, livestreams: 140, picks: 420 },
  { month: "Nov", videos: 920, livestreams: 210, picks: 580 },
  { month: "Dec", videos: 1200, livestreams: 290, picks: 750 },
  { month: "Jan", videos: 1580, livestreams: 380, picks: 920 },
];

const revenueData = [
  { month: "Jul", revenue: 12000, orders: 340 },
  { month: "Aug", revenue: 25000, orders: 620 },
  { month: "Sep", revenue: 48000, orders: 1100 },
  { month: "Oct", revenue: 78000, orders: 1800 },
  { month: "Nov", revenue: 125000, orders: 2900 },
  { month: "Dec", revenue: 198000, orders: 4200 },
  { month: "Jan", revenue: 285000, orders: 5800 },
];

const roleDistribution = [
  { name: "Subscribers", value: 12847, color: "hsl(220, 15%, 55%)" },
  { name: "Creators", value: 1203, color: "hsl(25, 95%, 55%)" },
  { name: "Businesses", value: 487, color: "hsl(200, 85%, 55%)" },
  { name: "Publishers", value: 89, color: "hsl(45, 95%, 55%)" },
];

const tooltipStyle = { backgroundColor: "hsl(220, 18%, 12%)", border: "1px solid hsl(220, 15%, 20%)", borderRadius: "8px", color: "hsl(210, 40%, 98%)" };

const pathToTab: Record<string, string> = {
  "/admin/analytics": "users",
  "/admin/analytics/revenue": "revenue",
  "/admin/analytics/content": "content",
  "/admin/analytics/livestreams": "livestreams",
  "/admin/analytics/stores": "stores",
  "/admin/analytics/funnels": "funnels",
  "/admin/analytics/advanced": "advanced",
  "/admin/analytics/cohorts": "advanced",
  "/admin/analytics/retention": "advanced",
  "/admin/analytics/heatmaps": "advanced",
};
const tabToPath: Record<string, string> = {
  users: "/admin/analytics",
  revenue: "/admin/analytics/revenue",
  content: "/admin/analytics/content",
  livestreams: "/admin/analytics/livestreams",
  stores: "/admin/analytics/stores",
  funnels: "/admin/analytics/funnels",
  advanced: "/admin/analytics/advanced",
};

export default function AdminAnalytics() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = pathToTab[location.pathname] || "users";

  return (
    <SuperAdminLayout title="Platform Analytics" subtitle="Comprehensive platform performance metrics" breadcrumbs={[{ label: "Dashboard", path: "/admin/dashboard" }, { label: "Analytics" }]}>
      <div className="space-y-6 animate-slide-up">
        <div className="flex items-center justify-between">
          <div />
          <Select defaultValue="6m">
            <SelectTrigger className="w-[160px] bg-secondary border-border"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Users" value="14,626" change="+42% growth" changeType="positive" icon={Users} />
          <StatCard title="Total Content" value="2,880" change="+1,580 videos" changeType="positive" icon={Video} />
          <StatCard title="Platform Revenue" value="$771K" change="+128% growth" changeType="positive" icon={DollarSign} />
          <StatCard title="Total Views" value="4.8M" change="+65% this quarter" changeType="positive" icon={Eye} />
        </div>

        <Tabs value={activeTab} onValueChange={(v) => navigate(tabToPath[v])}>
          <TabsList>
            <TabsTrigger value="users"><Users className="h-3.5 w-3.5 mr-1" />Users</TabsTrigger>
            <TabsTrigger value="revenue"><DollarSign className="h-3.5 w-3.5 mr-1" />Revenue</TabsTrigger>
            <TabsTrigger value="content"><Video className="h-3.5 w-3.5 mr-1" />Content</TabsTrigger>
            <TabsTrigger value="livestreams"><Radio className="h-3.5 w-3.5 mr-1" />Livestreams</TabsTrigger>
            <TabsTrigger value="stores"><Store className="h-3.5 w-3.5 mr-1" />Stores</TabsTrigger>
            <TabsTrigger value="funnels"><Target className="h-3.5 w-3.5 mr-1" />Funnels</TabsTrigger>
            <TabsTrigger value="advanced"><PieChart className="h-3.5 w-3.5 mr-1" />Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">User Growth Over Time</h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" />
                  <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" />
                  <YAxis stroke="hsl(215, 20%, 55%)" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="subscribers" stackId="1" stroke="hsl(220, 15%, 55%)" fill="hsl(220, 15%, 55%)" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="creators" stackId="1" stroke="hsl(25, 95%, 55%)" fill="hsl(25, 95%, 55%)" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="businesses" stackId="1" stroke="hsl(200, 85%, 55%)" fill="hsl(200, 85%, 55%)" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="publishers" stackId="1" stroke="hsl(45, 95%, 55%)" fill="hsl(45, 95%, 55%)" fillOpacity={0.3} />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="revenue">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">Platform Revenue & Orders</h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" />
                  <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" />
                  <YAxis yAxisId="left" stroke="hsl(215, 20%, 55%)" />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(215, 20%, 55%)" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="hsl(142, 70%, 45%)" fill="hsl(142, 70%, 45%)" fillOpacity={0.2} />
                  <Area yAxisId="right" type="monotone" dataKey="orders" stroke="hsl(25, 95%, 55%)" fill="hsl(25, 95%, 55%)" fillOpacity={0.2} />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">Content Published Over Time</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={contentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" />
                  <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" />
                  <YAxis stroke="hsl(215, 20%, 55%)" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="videos" fill="hsl(25, 95%, 55%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="livestreams" fill="hsl(200, 85%, 55%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="picks" fill="hsl(45, 95%, 55%)" radius={[4, 4, 0, 0]} />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="livestreams">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">Livestream Performance</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total Streams", value: "380" },
                  { label: "Avg. Viewers", value: "1,420" },
                  { label: "Peak Viewers", value: "14,892" },
                  { label: "Avg. Duration", value: "1h 45m" },
                ].map(s => (
                  <div key={s.label} className="p-4 rounded-lg bg-secondary/30 text-center">
                    <p className="text-xl font-bold font-display">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={contentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" />
                  <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" />
                  <YAxis stroke="hsl(215, 20%, 55%)" />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="livestreams" fill="hsl(200, 85%, 55%)" radius={[4, 4, 0, 0]} name="Livestreams" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="stores">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">Store Performance</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Active Stores", value: "2,847" },
                  { label: "Total Products", value: "45,200" },
                  { label: "Avg. Revenue", value: "$2,840" },
                  { label: "Top Category", value: "Fashion" },
                ].map(s => (
                  <div key={s.label} className="p-4 rounded-lg bg-secondary/30 text-center">
                    <p className="text-xl font-bold font-display">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="funnels">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">Conversion Funnels</h3>
              <div className="space-y-4">
                {[
                  { stage: "Page Views", value: 100, count: "4.8M" },
                  { stage: "Product Views", value: 45, count: "2.16M" },
                  { stage: "Add to Cart", value: 12, count: "576K" },
                  { stage: "Checkout", value: 6, count: "288K" },
                  { stage: "Purchase", value: 4.8, count: "230K" },
                ].map(f => (
                  <div key={f.stage} className="flex items-center gap-4">
                    <span className="text-sm w-32 text-muted-foreground">{f.stage}</span>
                    <div className="flex-1 h-8 bg-secondary/30 rounded-lg overflow-hidden">
                      <div className="h-full bg-primary/40 rounded-lg flex items-center px-3" style={{ width: `${f.value}%` }}>
                        <span className="text-xs font-medium">{f.count}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground w-12 text-right">{f.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">User Role Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPie>
                    <Pie data={roleDistribution} cx="50%" cy="50%" outerRadius={110} innerRadius={60} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {roleDistribution.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">Cohort Retention</h3>
                <div className="space-y-3">
                  {[
                    { cohort: "Jan 2026", w1: "85%", w2: "62%", w4: "44%", w8: "31%" },
                    { cohort: "Dec 2025", w1: "82%", w2: "58%", w4: "41%", w8: "28%" },
                    { cohort: "Nov 2025", w1: "79%", w2: "55%", w4: "38%", w8: "25%" },
                  ].map(c => (
                    <div key={c.cohort} className="grid grid-cols-5 gap-2 text-xs">
                      <span className="font-medium text-foreground">{c.cohort}</span>
                      <span className="text-center p-1 rounded bg-green-500/20 text-green-400">{c.w1}</span>
                      <span className="text-center p-1 rounded bg-yellow-500/20 text-yellow-400">{c.w2}</span>
                      <span className="text-center p-1 rounded bg-orange-500/20 text-orange-400">{c.w4}</span>
                      <span className="text-center p-1 rounded bg-red-500/20 text-red-400">{c.w8}</span>
                    </div>
                  ))}
                  <div className="grid grid-cols-5 gap-2 text-[10px] text-muted-foreground">
                    <span>Cohort</span><span className="text-center">Week 1</span><span className="text-center">Week 2</span><span className="text-center">Week 4</span><span className="text-center">Week 8</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SuperAdminLayout>
  );
}
