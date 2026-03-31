import { AdminLayout } from "@/layouts/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { DollarSign, ShoppingCart, Eye, TrendingUp, BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const revenueData = [
  { name: "Jan 1", revenue: 1200, orders: 8 },
  { name: "Jan 2", revenue: 1800, orders: 12 },
  { name: "Jan 3", revenue: 1400, orders: 9 },
  { name: "Jan 4", revenue: 2200, orders: 15 },
  { name: "Jan 5", revenue: 2800, orders: 18 },
  { name: "Jan 6", revenue: 2400, orders: 14 },
  { name: "Jan 7", revenue: 3100, orders: 22 },
];

const categoryData = [
  { name: "Dresses", value: 35, color: "hsl(var(--primary))" },
  { name: "Accessories", value: 25, color: "hsl(var(--accent))" },
  { name: "Shoes", value: 20, color: "hsl(var(--success))" },
  { name: "Tops", value: 12, color: "hsl(var(--warning))" },
  { name: "Other", value: 8, color: "hsl(var(--muted))" },
];

const topProducts = [
  { name: "Classic Heels - Black", sales: 234, revenue: "$28,080", growth: 18 },
  { name: "Summer Dress - Floral", sales: 156, revenue: "$14,039", growth: 12 },
  { name: "Leather Tote Bag", sales: 89, revenue: "$12,905", growth: -5 },
  { name: "Silk Blouse - White", sales: 123, revenue: "$7,995", growth: 22 },
  { name: "High-Waist Jeans", sales: 198, revenue: "$16,830", growth: 8 },
];

const trafficSources = [
  { source: "FVRD Homepage", visits: 1250, conversion: "4.2%" },
  { source: "Creator Recommendations", visits: 890, conversion: "6.8%" },
  { source: "Livestreams", visits: 620, conversion: "12.5%" },
  { source: "Direct Search", visits: 340, conversion: "3.1%" },
];

export default function BusinessAnalytics() {
  return (
    <AdminLayout type="business" title="Analytics" subtitle="Track your business performance">
      <div className="space-y-6 animate-slide-up">
        {/* Date Range */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Business Performance</span>
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
            title="Total Revenue" 
            value="$14,900" 
            change="+23.5% vs last period"
            changeType="positive"
            icon={DollarSign}
          />
          <StatCard 
            title="Orders" 
            value="98" 
            change="+18.2% vs last period"
            changeType="positive"
            icon={ShoppingCart}
          />
          <StatCard 
            title="Store Views" 
            value="3,100" 
            change="+12.8% vs last period"
            changeType="positive"
            icon={Eye}
          />
          <StatCard 
            title="Conversion Rate" 
            value="5.2%" 
            change="-0.3% vs last period"
            changeType="negative"
            icon={TrendingUp}
          />
        </div>

        {/* Charts */}
        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="bg-secondary border border-border">
            <TabsTrigger value="revenue">Revenue & Orders</TabsTrigger>
            <TabsTrigger value="products">Product Performance</TabsTrigger>
            <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Revenue Chart */}
              <div className="lg:col-span-2 glass-card rounded-xl p-6">
                <h3 className="font-display font-semibold text-foreground mb-6">Revenue Over Time</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
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
                        formatter={(value: number) => [`$${value}`, "Revenue"]}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-display font-semibold text-foreground mb-6">Sales by Category</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--popover))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                        formatter={(value: number) => [`${value}%`, "Share"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {categoryData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="products" className="mt-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display font-semibold text-foreground mb-6">Top Performing Products</h3>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                        {index + 1}
                      </span>
                      <span className="font-medium text-foreground">{product.name}</span>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{product.sales}</p>
                        <p className="text-xs text-muted-foreground">sales</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{product.revenue}</p>
                        <p className="text-xs text-muted-foreground">revenue</p>
                      </div>
                      <div className="flex items-center gap-1 w-16">
                        {product.growth >= 0 ? (
                          <>
                            <ArrowUpRight className="h-4 w-4 text-success" />
                            <span className="text-sm text-success">+{product.growth}%</span>
                          </>
                        ) : (
                          <>
                            <ArrowDownRight className="h-4 w-4 text-destructive" />
                            <span className="text-sm text-destructive">{product.growth}%</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="traffic" className="mt-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display font-semibold text-foreground mb-6">Traffic Sources</h3>
              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Eye className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{source.source}</span>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{source.visits.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">visits</p>
                      </div>
                      <div className="text-right w-20">
                        <p className="text-sm font-medium text-success">{source.conversion}</p>
                        <p className="text-xs text-muted-foreground">conversion</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
