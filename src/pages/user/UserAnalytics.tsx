import { AdminLayout } from "@/layouts/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { Eye, Clock, TrendingUp, Users, BarChart3, ArrowUp, ArrowDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

const viewsData = [
  { name: "Jan 1", views: 1200, engagement: 340 },
  { name: "Jan 2", views: 1800, engagement: 420 },
  { name: "Jan 3", views: 1400, engagement: 380 },
  { name: "Jan 4", views: 2200, engagement: 520 },
  { name: "Jan 5", views: 2800, engagement: 680 },
  { name: "Jan 6", views: 2400, engagement: 590 },
  { name: "Jan 7", views: 3100, engagement: 750 },
];

const contentPerformance = [
  { name: "Videos", views: 18500, growth: 12 },
  { name: "Livestreams", views: 12400, growth: 28 },
  { name: "Creator Picks", views: 8200, growth: -5 },
];

const topContent = [
  { title: "Summer Collection Showcase", views: "4.2K", watchTime: "8m 32s", engagement: "12.4%" },
  { title: "Home Decor Haul 2026", views: "3.8K", watchTime: "12m 15s", engagement: "15.2%" },
  { title: "Weekly Style Tips Live", views: "2.4K", watchTime: "32m 45s", engagement: "22.8%" },
  { title: "Behind The Scenes Tour", views: "1.9K", watchTime: "5m 20s", engagement: "8.6%" },
  { title: "DIY Room Makeover", views: "1.5K", watchTime: "18m 40s", engagement: "18.3%" },
];

export default function UserAnalytics() {
  return (
    <AdminLayout type="user" title="Analytics" subtitle="Track your performance metrics">
      <div className="space-y-6 animate-slide-up">
        {/* Date Range */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Performance Overview</span>
            </div>
          </div>
          <Select defaultValue="7d">
            <SelectTrigger className="w-40 bg-secondary border-border">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Views" 
            value="24.5K" 
            change="+12.5% vs last period"
            changeType="positive"
            icon={Eye}
          />
          <StatCard 
            title="Watch Time" 
            value="1,250h" 
            change="+8.3% vs last period"
            changeType="positive"
            icon={Clock}
          />
          <StatCard 
            title="Engagement Rate" 
            value="14.8%" 
            change="-2.1% vs last period"
            changeType="negative"
            icon={TrendingUp}
          />
          <StatCard 
            title="Unique Viewers" 
            value="8,420" 
            change="+18.7% vs last period"
            changeType="positive"
            icon={Users}
          />
        </div>

        {/* Charts */}
        <Tabs defaultValue="views" className="w-full">
          <TabsList className="bg-secondary border border-border">
            <TabsTrigger value="views">Views & Engagement</TabsTrigger>
            <TabsTrigger value="content">Content Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="views" className="mt-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display font-semibold text-foreground mb-6">Views Over Time</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={viewsData}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--popover))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Area type="monotone" dataKey="views" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorViews)" />
                    <Area type="monotone" dataKey="engagement" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorEngagement)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="content" className="mt-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display font-semibold text-foreground mb-6">Content Type Performance</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={contentPerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--popover))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Bar dataKey="views" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Top Performing Content */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-6">Top Performing Content</h3>
          <div className="space-y-4">
            {topContent.map((content, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                    {index + 1}
                  </span>
                  <span className="font-medium text-foreground">{content.title}</span>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{content.views}</p>
                    <p className="text-xs text-muted-foreground">views</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{content.watchTime}</p>
                    <p className="text-xs text-muted-foreground">avg watch</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-success">{content.engagement}</p>
                    <p className="text-xs text-muted-foreground">engagement</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
