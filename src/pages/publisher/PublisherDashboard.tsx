import { AdminLayout } from "@/layouts/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { Eye, MousePointer, Film, Music, BarChart3, Clock, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBanner from "@/assets/restored/cinema-banner.jpg";

const recentContent = [
  { title: "The Lodge - Season 2", type: "TV Show", status: "Live", views: "12.4K" },
  { title: "Crossfire", type: "Movie", status: "In Review", views: "—" },
  { title: "Summer Beats Vol. 3", type: "Music Album", status: "Live", views: "8.2K" },
  { title: "Tomorrow", type: "Movie", status: "Pending", views: "—" },
];

const creatorPicks = [
  { creator: "Alex Rivera", content: "The Lodge", type: "TV Show" },
  { creator: "Maya Chen", content: "Summer Beats Vol. 3", type: "Music" },
];

export default function PublisherDashboard() {
  return (
    <AdminLayout type="publisher" title="Studio" subtitle="Your content performance at a glance">
      <div className="space-y-6 animate-slide-up">
        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-8 md:p-10">
          <img src={heroBanner} alt="Featured publisher title" className="absolute inset-0 h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20" />
          <div className="relative max-w-2xl space-y-4">
            <span className="inline-flex rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent">Featured · Live now</span>
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">Murder at Castlewick</h2>
              <p className="mt-2 text-sm text-muted-foreground">Your top-performing title — 22.1K views this month, +18% growth.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button className="gradient-primary text-primary-foreground" asChild><Link to="/publisher/analytics"><BarChart3 className="mr-2 h-4 w-4" />See insights</Link></Button>
              <Button variant="secondary" asChild><Link to="/publisher/distribution">Distribution</Link></Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Views" value="45.2K" change="+12%" icon={Eye} />
          <StatCard title="Total Clicks" value="3.8K" change="+8%" icon={MousePointer} />
          <StatCard title="Active Titles" value="14" change="+2" icon={Film} />
          <StatCard title="Avg Watch Time" value="42m" change="+5%" icon={Clock} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Content */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Recent Content</h3>
              <Link to="/publisher/content">
                <Button variant="secondary" size="sm">View All</Button>
              </Link>
            </div>
            <div className="space-y-3">
              {recentContent.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      {item.type === "Music Album" ? (
                        <Music className="h-4 w-4 text-primary" />
                      ) : (
                        <Film className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.status === "Live" ? "bg-success/10 text-success" :
                      item.status === "In Review" ? "bg-warning/10 text-warning" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {item.status}
                    </span>
                    {item.views !== "—" && (
                      <p className="text-xs text-muted-foreground mt-1">{item.views} views</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Creator Picks & Quick Actions */}
          <div className="space-y-6">
            {/* Creator Picks for Publisher */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">Creator Picks Featuring You</h3>
              {creatorPicks.length > 0 ? (
                <div className="space-y-3">
                  {creatorPicks.map((pick, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div>
                        <p className="text-sm font-medium text-foreground">{pick.creator}</p>
                        <p className="text-xs text-muted-foreground">Promoting: {pick.content}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{pick.type}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No creators are currently promoting your content.</p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/publisher/content">
                  <Button variant="secondary" className="w-full gap-2 justify-start">
                    <Upload className="h-4 w-4" /> Submit Content
                  </Button>
                </Link>
                <Link to="/publisher/analytics">
                  <Button variant="secondary" className="w-full gap-2 justify-start">
                    <BarChart3 className="h-4 w-4" /> View Analytics
                  </Button>
                </Link>
                <Link to="/publisher/settings">
                  <Button variant="secondary" className="w-full gap-2 justify-start">
                    <FileText className="h-4 w-4" /> Edit Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
