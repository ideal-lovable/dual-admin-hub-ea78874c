import { AdminLayout } from "@/layouts/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Eye, ShoppingCart, TrendingUp, DollarSign, Video } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

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

export default function AdminAnalytics() {
  return (
    <AdminLayout type="admin" title="Platform Analytics" subtitle="Comprehensive platform performance metrics">
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
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Users" value="14,626" change="+42% growth" changeType="positive" icon={Users} />
          <StatCard title="Total Content" value="2,880" change="+1,580 videos" changeType="positive" icon={Video} />
          <StatCard title="Platform Revenue" value="$771K" change="+128% growth" changeType="positive" icon={DollarSign} />
          <StatCard title="Total Views" value="4.8M" change="+65% this quarter" changeType="positive" icon={Eye} />
        </div>

        <Tabs defaultValue="users">
          <TabsList>
            <TabsTrigger value="users">User Growth</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">User Growth Over Time</h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 20%)" />
                  <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" />
                  <YAxis stroke="hsl(215, 20%, 55%)" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(220, 18%, 12%)", border: "1px solid hsl(220, 15%, 20%)", borderRadius: "8px", color: "hsl(210, 40%, 98%)" }} />
                  <Area type="monotone" dataKey="subscribers" stackId="1" stroke="hsl(220, 15%, 55%)" fill="hsl(220, 15%, 55%)" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="creators" stackId="1" stroke="hsl(25, 95%, 55%)" fill="hsl(25, 95%, 55%)" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="businesses" stackId="1" stroke="hsl(200, 85%, 55%)" fill="hsl(200, 85%, 55%)" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="publishers" stackId="1" stroke="hsl(45, 95%, 55%)" fill="hsl(45, 95%, 55%)" fillOpacity={0.3} />
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
                  <Tooltip contentStyle={{ backgroundColor: "hsl(220, 18%, 12%)", border: "1px solid hsl(220, 15%, 20%)", borderRadius: "8px", color: "hsl(210, 40%, 98%)" }} />
                  <Bar dataKey="videos" fill="hsl(25, 95%, 55%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="livestreams" fill="hsl(200, 85%, 55%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="picks" fill="hsl(45, 95%, 55%)" radius={[4, 4, 0, 0]} />
                  <Legend />
                </BarChart>
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
                  <Tooltip contentStyle={{ backgroundColor: "hsl(220, 18%, 12%)", border: "1px solid hsl(220, 15%, 20%)", borderRadius: "8px", color: "hsl(210, 40%, 98%)" }} />
                  <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="hsl(142, 70%, 45%)" fill="hsl(142, 70%, 45%)" fillOpacity={0.2} />
                  <Area yAxisId="right" type="monotone" dataKey="orders" stroke="hsl(25, 95%, 55%)" fill="hsl(25, 95%, 55%)" fillOpacity={0.2} />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="distribution">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">User Role Distribution</h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie data={roleDistribution} cx="50%" cy="50%" outerRadius={150} innerRadius={80} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {roleDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "hsl(220, 18%, 12%)", border: "1px solid hsl(220, 15%, 20%)", borderRadius: "8px", color: "hsl(210, 40%, 98%)" }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
