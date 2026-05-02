import { AdminLayout } from "@/layouts/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, Radio, Star, TrendingUp, Users, Eye } from "lucide-react";

const placements = [
  { title: "The Lodge - Season 2", channel: "Featured in Discover", status: "Live", reach: "18.2K", icon: Compass },
  { title: "Summer Beats Vol. 3", channel: "Creator Picks", status: "Promoted", reach: "8.7K", icon: Star },
  { title: "Murder at Castlewick", channel: "Livestream Showcase", status: "Scheduled", reach: "—", icon: Radio },
];

const creatorPerformance = [
  { creator: "Maya Chen", content: "Summer Beats Vol. 3", views: "4.8K", clicks: "620" },
  { creator: "Alex Rivera", content: "The Lodge - Season 2", views: "7.1K", clicks: "940" },
  { creator: "Noah Brooks", content: "Arena Clash", views: "2.3K", clicks: "280" },
];

export default function PublisherDistribution() {
  return (
    <AdminLayout type="publisher" title="Distribution" subtitle="Track where your content is featured and promoted">
      <div className="space-y-6 animate-slide-up">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Active Placements" value="12" change="+3 this week" icon={Compass} />
          <StatCard title="Creator Promotions" value="8" change="+2 active" icon={Users} />
          <StatCard title="Distribution Views" value="31.4K" change="+18%" icon={Eye} />
          <StatCard title="Trending Titles" value="4" change="+1" icon={TrendingUp} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="glass-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display">Current Placements</CardTitle>
              <Button variant="secondary" size="sm">Export</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {placements.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-center justify-between rounded-xl bg-secondary/50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.channel}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{item.status}</Badge>
                      <p className="mt-1 text-xs text-muted-foreground">{item.reach} reach</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="glass-card border-border">
            <CardHeader><CardTitle className="font-display">Creator Performance</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {creatorPerformance.map((item) => (
                <div key={`${item.creator}-${item.content}`} className="rounded-xl bg-secondary/50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-foreground">{item.creator}</p>
                      <p className="text-sm text-muted-foreground">{item.content}</p>
                    </div>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/10">Read-only</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg bg-background/60 p-3"><span className="text-muted-foreground">Views</span><p className="font-semibold text-foreground">{item.views}</p></div>
                    <div className="rounded-lg bg-background/60 p-3"><span className="text-muted-foreground">Clicks</span><p className="font-semibold text-foreground">{item.clicks}</p></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}