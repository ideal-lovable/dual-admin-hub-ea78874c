import { AdminLayout } from "@/layouts/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { DollarSign, ShoppingCart, Eye, Package, TrendingUp, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

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

export default function BusinessDashboard() {
  const completedTasks = tasks.filter(t => t.completed).length;
  const taskProgress = (completedTasks / tasks.length) * 100;

  return (
    <AdminLayout type="business" title="Business Dashboard" subtitle="Welcome back, Luxe Apparel!">
      <div className="space-y-6 animate-slide-up">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Revenue" value="$12,450" change="+23% from last month" changeType="positive" icon={DollarSign} />
          <StatCard title="Active Orders" value="18" change="3 pending fulfillment" changeType="neutral" icon={ShoppingCart} />
          <StatCard title="Store Views" value="2.5K" change="+15% from last week" changeType="positive" icon={Eye} />
          <StatCard title="Products" value="45" change="3 low stock alerts" changeType="negative" icon={Package} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-semibold text-foreground">Recent Orders</h2>
              <Link to="/business/orders">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">View All</Button>
              </Link>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ShoppingCart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{order.amount}</p>
                      <p className="text-xs text-muted-foreground">{order.items} items</p>
                    </div>
                    <StatusBadge status={order.status} />
                    <span className="text-xs text-muted-foreground w-20 text-right">{order.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Column */}
          <div className="space-y-6">
            {/* Setup Progress */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">Complete Your Store</h2>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{completedTasks}/{tasks.length}</span>
                </div>
                <Progress value={taskProgress} className="h-2" />
              </div>
              <div className="space-y-3">
                {tasks.map((task, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                      task.completed ? 'bg-success text-success-foreground' : 'bg-secondary'
                    }`}>
                      {task.completed && <CheckCircle className="h-3 w-3" />}
                    </div>
                    <span className={`text-sm ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <h2 className="font-display text-lg font-semibold text-foreground">Low Stock Alerts</h2>
              </div>
              <div className="space-y-3">
                {lowStockAlerts.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-warning/10 border border-warning/20">
                    <span className="text-sm text-foreground">{item.name}</span>
                    <span className="text-sm font-medium text-warning">{item.stock} left</span>
                  </div>
                ))}
              </div>
              <Link to="/business/products">
                <Button variant="secondary" size="sm" className="w-full mt-4">Manage Inventory</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/business/products">
              <Button className="w-full h-auto py-4 flex-col gap-2 gradient-primary text-primary-foreground hover:opacity-90">
                <Package className="h-5 w-5" />
                <span>Add Product</span>
              </Button>
            </Link>
            <Link to="/business/orders">
              <Button variant="secondary" className="w-full h-auto py-4 flex-col gap-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Process Orders</span>
              </Button>
            </Link>
            <Link to="/business/analytics">
              <Button variant="secondary" className="w-full h-auto py-4 flex-col gap-2">
                <TrendingUp className="h-5 w-5" />
                <span>View Analytics</span>
              </Button>
            </Link>
            <Link to="/business/livestreams">
              <Button variant="secondary" className="w-full h-auto py-4 flex-col gap-2">
                <Clock className="h-5 w-5" />
                <span>Schedule Live</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
