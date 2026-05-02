import { AdminLayout } from "@/layouts/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { Eye, Video, Radio, Star, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Link } from "react-router-dom";

const recentActivity = [
  { id: 1, action: "Video uploaded", title: "Summer Collection Showcase", time: "2 hours ago", status: "pending" as const },
  { id: 2, action: "Livestream completed", title: "Weekly Q&A Session", time: "1 day ago", status: "completed" as const },
  { id: 3, action: "Creator Pick added", title: "Home Decor Essentials", time: "2 days ago", status: "approved" as const },
  { id: 4, action: "Video approved", title: "Behind The Scenes Tour", time: "3 days ago", status: "approved" as const },
];

const upcomingLivestreams = [
  { id: 1, title: "Product Showcase Live", date: "Jan 15, 2026", time: "2:00 PM", products: 8 },
  { id: 2, title: "Q&A with Followers", date: "Jan 18, 2026", time: "4:00 PM", products: 0 },
];

export default function UserDashboard() {
  return (
    <AdminLayout type="user" title="Creator Dashboard" subtitle="Welcome back, Sarah!">
      <div className="space-y-6 animate-slide-up">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Views" value="24.5K" change="+12% from last month" changeType="positive" icon={Eye} />
          <StatCard title="Videos" value="18" change="3 pending approval" changeType="neutral" icon={Video} />
          <StatCard title="Livestreams" value="12" change="2 scheduled" changeType="neutral" icon={Radio} />
          <StatCard title="Creator Picks" value="45" change="+8 this month" changeType="positive" icon={Star} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-semibold text-foreground">Recent Activity</h2>
              <Link to="/user/videos">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">View All</Button>
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.action}</p>
                      <p className="text-sm text-muted-foreground">{item.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={item.status} />
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Livestreams */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-semibold text-foreground">Upcoming Livestreams</h2>
              <Link to="/user/livestreams">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">+ New</Button>
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingLivestreams.map((stream) => (
                <div key={stream.id} className="p-4 rounded-lg border border-border bg-secondary/20 hover:border-primary/30 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                      <Radio className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <StatusBadge status="scheduled" />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">{stream.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{stream.date} at {stream.time}</span>
                  </div>
                  {stream.products > 0 && (
                    <p className="mt-2 text-xs text-primary">{stream.products} products attached</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/user/videos">
              <Button className="w-full h-auto py-4 flex-col gap-2 gradient-primary text-primary-foreground hover:opacity-90">
                <Video className="h-5 w-5" />
                <span>Upload Video</span>
              </Button>
            </Link>
            <Link to="/user/livestreams">
              <Button variant="secondary" className="w-full h-auto py-4 flex-col gap-2">
                <Radio className="h-5 w-5" />
                <span>Schedule Live</span>
              </Button>
            </Link>
            <Link to="/user/picks">
              <Button variant="secondary" className="w-full h-auto py-4 flex-col gap-2">
                <Star className="h-5 w-5" />
                <span>Add Creator Pick</span>
              </Button>
            </Link>
            <Link to="/user/analytics">
              <Button variant="secondary" className="w-full h-auto py-4 flex-col gap-2">
                <TrendingUp className="h-5 w-5" />
                <span>View Analytics</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
