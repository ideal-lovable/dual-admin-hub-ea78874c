import { useState } from "react";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Megaphone, Video, ShoppingCart, TrendingUp, Star, Calendar, Plus, GripVertical, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";

const featuredBanners = [
  { id: 1, title: "Summer Sale 2024", type: "banner", status: "active", position: 1 },
  { id: 2, title: "New Creator Spotlight", type: "banner", status: "active", position: 2 },
  { id: 3, title: "Live Shopping Event", type: "banner", status: "scheduled", position: 3 },
];

const trendingItems = [
  { id: 1, title: "Street Style Haul", type: "video", views: "124K", creator: "JaneDoe" },
  { id: 2, title: "Wireless Earbuds Pro", type: "product", views: "89K", creator: "Tech Haven" },
  { id: 3, title: "Morning Yoga", type: "video", views: "67K", creator: "ZenSarah" },
  { id: 4, title: "Summer Dress Collection", type: "product", views: "54K", creator: "Urban Fits" },
];

const creatorPicks = [
  { id: 1, creator: "Jane Doe", product: "Summer Dress", store: "Urban Fits", status: "active" },
  { id: 2, creator: "Mike Tech", product: "Wireless Mouse", store: "Tech Haven", status: "active" },
  { id: 3, creator: "ChefAmy", product: "Chef Knife Set", store: "Kitchen Pro", status: "pending" },
];

export default function AdminDiscover() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <SuperAdminLayout
      title="Discover & Curation"
      subtitle="Manage featured content, banners, and trending sections"
      breadcrumbs={[{ label: "Dashboard", path: "/admin/dashboard" }, { label: "Discover & Curation" }]}
    >
      <Tabs defaultValue="banners" className="space-y-4">
        <TabsList className="bg-secondary border border-border">
          <TabsTrigger value="banners" className="gap-1.5"><Megaphone className="h-3.5 w-3.5" /> Banners</TabsTrigger>
          <TabsTrigger value="watch" className="gap-1.5"><Video className="h-3.5 w-3.5" /> What to Watch</TabsTrigger>
          <TabsTrigger value="buy" className="gap-1.5"><ShoppingCart className="h-3.5 w-3.5" /> What to Buy</TabsTrigger>
          <TabsTrigger value="trending" className="gap-1.5"><TrendingUp className="h-3.5 w-3.5" /> Trending</TabsTrigger>
          <TabsTrigger value="picks" className="gap-1.5"><Star className="h-3.5 w-3.5" /> Creator Picks</TabsTrigger>
          <TabsTrigger value="events" className="gap-1.5"><Calendar className="h-3.5 w-3.5" /> Events</TabsTrigger>
        </TabsList>

        <TabsContent value="banners">
          <div className="flex justify-end mb-4">
            <Button size="sm" className="gradient-primary text-primary-foreground gap-1.5" onClick={() => setShowAdd(true)}>
              <Plus className="h-3.5 w-3.5" /> Add Banner
            </Button>
          </div>
          <div className="space-y-3">
            {featuredBanners.map((b) => (
              <Card key={b.id} className="bg-card border-border">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    <div className="h-10 w-16 rounded bg-primary/10 flex items-center justify-center">
                      <Megaphone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{b.title}</p>
                      <p className="text-xs text-muted-foreground">Position: {b.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={b.status === "active" ? "default" : "secondary"} className="text-xs">{b.status}</Badge>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => toast.success("Editing banner")}><Edit className="h-3.5 w-3.5" /></Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => toast.success("Banner removed")}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="watch">
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-sm">What to Watch - Curated Videos</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {trendingItems.filter(i => i.type === "video").map(item => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <Video className="h-4 w-4 text-primary" />
                    <div><p className="text-sm font-medium">{item.title}</p><p className="text-xs text-muted-foreground">by {item.creator} • {item.views} views</p></div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => toast.success("Featured!")}>Feature</Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive" onClick={() => toast.success("Removed")}>Remove</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="buy">
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-sm">What to Buy - Featured Products</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {trendingItems.filter(i => i.type === "product").map(item => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="h-4 w-4 text-accent" />
                    <div><p className="text-sm font-medium">{item.title}</p><p className="text-xs text-muted-foreground">by {item.creator} • {item.views} views</p></div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => toast.success("Featured!")}>Feature</Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive" onClick={() => toast.success("Removed")}>Remove</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trending">
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-sm">Trending Now</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {trendingItems.map((item, i) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-primary w-6">#{i + 1}</span>
                    <div><p className="text-sm font-medium">{item.title}</p><p className="text-xs text-muted-foreground">{item.views} views</p></div>
                  </div>
                  <Badge variant="outline" className="text-xs">{item.type}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="picks">
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-sm">Creator Picks</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {creatorPicks.map(pick => (
                <div key={pick.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <div>
                      <p className="text-sm font-medium">{pick.creator} → {pick.product}</p>
                      <p className="text-xs text-muted-foreground">Store: {pick.store}</p>
                    </div>
                  </div>
                  <Badge variant={pick.status === "active" ? "default" : "secondary"} className="text-xs">{pick.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card className="bg-card border-border">
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">No upcoming events. Create one to promote on the Discover page.</p>
              <Button size="sm" className="mt-3 gradient-primary text-primary-foreground" onClick={() => setShowAdd(true)}>
                <Plus className="h-3.5 w-3.5 mr-1" /> Create Event
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add New Item</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Title</Label><Input className="mt-1.5" placeholder="Enter title..." /></div>
            <div><Label>Type</Label><Input className="mt-1.5" placeholder="banner / event / featured" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button className="gradient-primary text-primary-foreground" onClick={() => { toast.success("Item added"); setShowAdd(false); }}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SuperAdminLayout>
  );
}
