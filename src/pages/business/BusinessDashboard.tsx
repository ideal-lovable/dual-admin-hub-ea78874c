import { useState } from "react";
import { BusinessLayout } from "@/layouts/BusinessLayout";
import {
  DollarSign, ShoppingCart, Eye, TrendingUp, AlertTriangle,
  CheckCircle, ArrowUpRight, ArrowDownRight, Plus, Radio, BarChart3, CalendarDays,
  Package, Sparkles, Zap, UserPlus, ShoppingBag, Clock, Bell,
  Download, FileText, Megaphone, ChevronRight, Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const revenueData = [
  { name: "Mon", revenue: 1200, orders: 8 },
  { name: "Tue", revenue: 1800, orders: 12 },
  { name: "Wed", revenue: 1400, orders: 9 },
  { name: "Thu", revenue: 2200, orders: 15 },
  { name: "Fri", revenue: 2800, orders: 18 },
  { name: "Sat", revenue: 2400, orders: 14 },
  { name: "Sun", revenue: 3100, orders: 22 },
];

const categoryBreakdown = [
  { name: "Dresses", value: 35, color: "hsl(var(--primary))" },
  { name: "Accessories", value: 25, color: "hsl(var(--accent))" },
  { name: "Shoes", value: 20, color: "hsl(var(--success))" },
  { name: "Tops", value: 12, color: "hsl(var(--warning))" },
  { name: "Other", value: 8, color: "hsl(var(--muted-foreground))" },
];

const recentOrders = [
  { id: "#12345", customer: "John Smith", amount: "$124.99", items: 2, time: "10 min ago", status: "pending" as const },
  { id: "#12344", customer: "Emily Davis", amount: "$89.50", items: 1, time: "25 min ago", status: "approved" as const },
  { id: "#12343", customer: "Michael Chen", amount: "$245.00", items: 3, time: "1 hour ago", status: "approved" as const },
  { id: "#12342", customer: "Sarah Johnson", amount: "$67.25", items: 1, time: "2 hours ago", status: "completed" as const },
];

const tasks = [
  { title: "Add your first product", completed: true },
  { title: "Upload a video", completed: true },
  { title: "Set up your storefront", completed: true },
  { title: "Complete shipping policy", completed: false },
  { title: "Add return policy", completed: false },
];

const lowStockAlerts = [
  { name: "Pendant Lamp - Black", stock: 3 },
  { name: "Wooden Bowls Set", stock: 5 },
  { name: "Area Rug - Beige", stock: 2 },
];

const smartInsights = [
  { icon: TrendingUp, title: "Sales are trending up", description: "Revenue increased 23% compared to last week. Your top seller is Classic Heels.", type: "success" as const },
  { icon: AlertTriangle, title: "Conversion rate dropped", description: "Down 0.3% this week. Consider adding product reviews or limited-time offers.", type: "warning" as const },
  { icon: Sparkles, title: "Livestream opportunity", description: "Creators with similar stores see 3x more sales during live events on Fridays.", type: "info" as const },
];

const activityFeed = [
  { icon: ShoppingCart, text: "New order #12350 from Emma Wilson", time: "2 min ago", color: "text-primary" },
  { icon: UserPlus, text: "New follower: @fashionlover22", time: "15 min ago", color: "text-accent" },
  { icon: Package, text: "Order #12348 shipped successfully", time: "1 hour ago", color: "text-success" },
  { icon: Eye, text: "Your store was viewed 142 times today", time: "2 hours ago", color: "text-muted-foreground" },
  { icon: Bell, text: "Low stock alert: Area Rug - Beige (2 left)", time: "3 hours ago", color: "text-warning" },
  { icon: DollarSign, text: "Weekly payout of $2,450 processed", time: "5 hours ago", color: "text-success" },
];

const kpiCards = [
  { title: "Total Revenue", value: "$12,450", change: "+23%", changeType: "positive" as const, icon: DollarSign, subtitle: "vs $10,122 last week", miniData: [1200, 1800, 1400, 2200, 2800, 2400, 3100] },
  { title: "Active Orders", value: "18", change: "+8%", changeType: "positive" as const, icon: ShoppingCart, subtitle: "4 pending fulfillment", miniData: [12, 15, 14, 18, 16, 17, 18] },
  { title: "Store Views", value: "2,534", change: "+15%", changeType: "positive" as const, icon: Eye, subtitle: "142 today", miniData: [180, 220, 200, 280, 320, 290, 350] },
  { title: "Conversion", value: "5.2%", change: "-0.3%", changeType: "negative" as const, icon: TrendingUp, subtitle: "Industry avg: 3.8%", miniData: [5.5, 5.4, 5.6, 5.3, 5.2, 5.1, 5.2] },
];

export default function BusinessDashboard() {
  const [period, setPeriod] = useState("7d");
  const completedTasks = tasks.filter(t => t.completed).length;
  const taskProgress = (completedTasks / tasks.length) * 100;

  return (
    <BusinessLayout
      title="Dashboard"
      subtitle="Welcome back, Luxe Apparel"
      breadcrumbs={[{ label: "Business", path: "/business/dashboard" }, { label: "Dashboard" }]}
    >
      <div className="space-y-6 animate-slide-up">
        {/* Hero Strip */}
        <div className="glass-card rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl gradient-primary flex items-center justify-center shadow-glow shrink-0">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Today's performance</p>
              <p className="text-base font-semibold text-foreground">
                Revenue is up <span className="text-gradient font-bold">+23%</span> compared to last week
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-36 bg-secondary/80 border-border h-9 text-xs rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="secondary" size="sm" className="h-9 gap-1.5 text-xs rounded-xl">
              <Download className="h-3.5 w-3.5" /> Export
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((kpi) => {
            const Icon = kpi.icon;
            const isPositive = kpi.changeType === "positive";
            return (
              <div key={kpi.title} className="glass-card rounded-2xl p-5 hover:shadow-elevated transition-all duration-300 group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className={`flex items-center gap-0.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${isPositive ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                    {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {kpi.change}
                  </div>
                </div>
                <p className="text-[28px] font-display font-bold text-foreground leading-none tracking-tight">{kpi.value}</p>
                <p className="text-xs font-medium text-muted-foreground mt-1.5">{kpi.title}</p>
                <p className="text-[11px] text-muted-foreground/70 mt-0.5">{kpi.subtitle}</p>
                {/* Mini sparkline */}
                <div className="mt-3 h-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={kpi.miniData.map((v, i) => ({ v, i }))}>
                      <defs>
                        <linearGradient id={`mini-${kpi.title.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"} strokeWidth={1.5} fill={`url(#mini-${kpi.title.replace(/\s/g, '')})`} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}
        </div>

        {/* Smart Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {smartInsights.map((insight, i) => {
            const Icon = insight.icon;
            const bgColor = insight.type === "success" ? "bg-success/10 border-success/20" : insight.type === "warning" ? "bg-warning/10 border-warning/20" : "bg-accent/10 border-accent/20";
            const iconColor = insight.type === "success" ? "text-success" : insight.type === "warning" ? "text-warning" : "text-accent";
            return (
              <div key={i} className={`rounded-2xl p-4 border ${bgColor} hover:shadow-card transition-all duration-300 cursor-pointer group`}>
                <div className="flex items-start gap-3">
                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${insight.type === "success" ? "bg-success/20" : insight.type === "warning" ? "bg-warning/20" : "bg-accent/20"}`}>
                    <Icon className={`h-4.5 w-4.5 ${iconColor}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{insight.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{insight.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions Bar */}
        <div className="glass-card rounded-2xl p-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap uppercase tracking-wider">Quick Actions</span>
            <div className="h-4 w-px bg-border shrink-0" />
            <Link to="/business/products">
              <Button size="sm" className="h-9 gap-2 text-xs rounded-xl gradient-primary text-primary-foreground whitespace-nowrap">
                <Plus className="h-3.5 w-3.5" /> Add Product
              </Button>
            </Link>
            <Link to="/business/livestreams">
              <Button size="sm" variant="secondary" className="h-9 gap-2 text-xs rounded-xl whitespace-nowrap">
                <Radio className="h-3.5 w-3.5 text-destructive" /> Request Live
              </Button>
            </Link>
            <Link to="/business/analytics">
              <Button size="sm" variant="secondary" className="h-9 gap-2 text-xs rounded-xl whitespace-nowrap">
                <FileText className="h-3.5 w-3.5" /> View Reports
              </Button>
            </Link>
            <Button size="sm" variant="secondary" className="h-9 gap-2 text-xs rounded-xl whitespace-nowrap">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> AI Insights
            </Button>
            <Button size="sm" variant="secondary" className="h-9 gap-2 text-xs rounded-xl whitespace-nowrap">
              <Megaphone className="h-3.5 w-3.5" /> Create Campaign
            </Button>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* Revenue Chart 70% */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-5 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground">Revenue Overview</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Weekly revenue trend</p>
              </div>
              <Select defaultValue="revenue">
                <SelectTrigger className="w-28 bg-secondary/80 border-border h-8 text-xs rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="orders">Orders</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="h-64 md:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      fontSize: "12px"
                    }}
                    formatter={(value: number) => [`$${value}`, "Revenue"]}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Breakdown 30% */}
          <div className="lg:col-span-3 glass-card rounded-2xl p-5 md:p-6">
            <h2 className="font-display text-lg font-semibold text-foreground mb-1">Sales Breakdown</h2>
            <p className="text-xs text-muted-foreground mb-4">By category</p>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                    {categoryBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }}
                    formatter={(value: number) => [`${value}%`, "Share"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2.5 mt-3">
              {categoryBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Grid: Orders + Activity + Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-5 md:p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-base font-semibold text-foreground">Recent Orders</h2>
              <Link to="/business/orders">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 text-xs gap-1">
                  View All <ChevronRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
            <div className="space-y-2.5">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                      <ShoppingCart className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.customer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-semibold text-foreground">{order.amount}</p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="lg:col-span-4 glass-card rounded-2xl p-5 md:p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-base font-semibold text-foreground">Activity Feed</h2>
              <Badge variant="secondary" className="text-[10px] font-semibold">Live</Badge>
            </div>
            <div className="space-y-1">
              {activityFeed.map((activity, i) => {
                const Icon = activity.icon;
                return (
                  <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-secondary/30 transition-colors cursor-pointer">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 bg-secondary/80`}>
                      <Icon className={`h-3.5 w-3.5 ${activity.color}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-foreground leading-relaxed">{activity.text}</p>
                      <p className="text-[11px] text-muted-foreground/60 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Side Column: Setup + Alerts */}
          <div className="lg:col-span-3 space-y-6">
            {/* Store Setup */}
            <div className="glass-card rounded-2xl p-5">
              <h2 className="font-display text-sm font-semibold text-foreground mb-3">Store Setup</h2>
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-bold text-foreground">{completedTasks}/{tasks.length}</span>
                </div>
                <Progress value={taskProgress} className="h-2" />
              </div>
              <div className="space-y-2">
                {tasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${task.completed ? 'bg-success text-success-foreground' : 'bg-secondary border border-border'}`}>
                      {task.completed && <CheckCircle className="h-3 w-3" />}
                    </div>
                    <span className={`text-[11px] ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground font-medium'}`}>
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <h2 className="font-display text-sm font-semibold text-foreground">Low Stock</h2>
              </div>
              <div className="space-y-2">
                {lowStockAlerts.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-warning/8 border border-warning/15">
                    <span className="text-[11px] text-foreground truncate mr-2">{item.name}</span>
                    <span className="text-[11px] font-bold text-warning whitespace-nowrap">{item.stock} left</span>
                  </div>
                ))}
              </div>
              <Link to="/business/products">
                <Button variant="secondary" size="sm" className="w-full mt-3 text-xs rounded-xl h-8">Manage Inventory</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </BusinessLayout>
  );
}
