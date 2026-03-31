import { useState } from "react";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tag, FileText, LayoutGrid, Eye, Plus, Edit, Trash2, GripVertical } from "lucide-react";
import { toast } from "sonner";

const categories = [
  { id: 1, name: "Fashion", slug: "fashion", items: 4200, status: "active" },
  { id: 2, name: "Electronics", slug: "electronics", items: 2800, status: "active" },
  { id: 3, name: "Beauty", slug: "beauty", items: 1900, status: "active" },
  { id: 4, name: "Food & Drink", slug: "food-drink", items: 1200, status: "active" },
  { id: 5, name: "Fitness", slug: "fitness", items: 890, status: "active" },
  { id: 6, name: "Gaming", slug: "gaming", items: 2100, status: "draft" },
];

const tags = ["trending", "new-arrival", "sale", "limited-edition", "creator-pick", "bestseller", "eco-friendly", "handmade"];

const homepageSections = [
  { id: 1, name: "Hero Banner", visible: true, position: 1 },
  { id: 2, name: "Trending Now", visible: true, position: 2 },
  { id: 3, name: "Featured Creators", visible: true, position: 3 },
  { id: 4, name: "What to Buy", visible: true, position: 4 },
  { id: 5, name: "Live Now", visible: true, position: 5 },
  { id: 6, name: "New Arrivals", visible: false, position: 6 },
];

export default function AdminPlatformConfig() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <SuperAdminLayout
      title="Platform Configuration"
      subtitle="Manage categories, tags, metadata, and layout controls"
      breadcrumbs={[{ label: "Dashboard", path: "/admin/dashboard" }, { label: "Platform Config" }]}
    >
      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList className="bg-secondary border border-border">
          <TabsTrigger value="categories" className="gap-1.5"><Tag className="h-3.5 w-3.5" /> Categories</TabsTrigger>
          <TabsTrigger value="tags" className="gap-1.5"><Tag className="h-3.5 w-3.5" /> Tags</TabsTrigger>
          <TabsTrigger value="metadata" className="gap-1.5"><FileText className="h-3.5 w-3.5" /> Metadata</TabsTrigger>
          <TabsTrigger value="homepage" className="gap-1.5"><LayoutGrid className="h-3.5 w-3.5" /> Homepage Layout</TabsTrigger>
          <TabsTrigger value="discover" className="gap-1.5"><Eye className="h-3.5 w-3.5" /> Discover Layout</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <div className="flex justify-end mb-4">
            <Button size="sm" className="gradient-primary text-primary-foreground gap-1.5" onClick={() => setShowAdd(true)}>
              <Plus className="h-3.5 w-3.5" /> Add Category
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {categories.map(c => (
              <Card key={c.id} className="bg-card border-border">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">/{c.slug} • {c.items.toLocaleString()} items</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={c.status === "active" ? "default" : "secondary"} className="text-xs">{c.status}</Badge>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => toast.success("Editing category")}><Edit className="h-3.5 w-3.5" /></Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => toast.success("Category removed")}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tags">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Platform Tags</CardTitle>
                <Button size="sm" className="gradient-primary text-primary-foreground gap-1.5" onClick={() => setShowAdd(true)}>
                  <Plus className="h-3.5 w-3.5" /> Add Tag
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs py-1.5 px-3 gap-1.5 hover:bg-secondary/50 cursor-pointer">
                    {tag}
                    <button className="text-muted-foreground hover:text-destructive" onClick={() => toast.success(`Tag "${tag}" removed`)}>×</button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metadata">
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-sm">SEO & Metadata</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Site Title</Label><Input defaultValue="FVRD TV - Live Shopping & Creator Platform" className="mt-1.5 bg-secondary border-border" /></div>
              <div><Label>Meta Description</Label><Input defaultValue="Discover, shop, and engage with creators on FVRD TV" className="mt-1.5 bg-secondary border-border" /></div>
              <div><Label>OG Image URL</Label><Input defaultValue="https://fvrd.tv/og-image.jpg" className="mt-1.5 bg-secondary border-border" /></div>
              <Button className="gradient-primary text-primary-foreground" onClick={() => toast.success("Metadata saved")}>Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="homepage">
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-sm">Homepage Section Order</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {homepageSections.map(s => (
                <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    <span className="text-sm font-medium">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={s.visible ? "default" : "secondary"} className="text-xs">{s.visible ? "Visible" : "Hidden"}</Badge>
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => toast.success(`${s.name} toggled`)}>
                      {s.visible ? "Hide" : "Show"}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discover">
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center text-muted-foreground">
              <Eye className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-sm">Discover page layout configuration coming soon.</p>
              <p className="text-xs mt-1">Drag-and-drop section ordering will be available in the next update.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add New Item</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Name</Label><Input className="mt-1.5" placeholder="Enter name..." /></div>
            <div><Label>Slug</Label><Input className="mt-1.5" placeholder="auto-generated" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button className="gradient-primary text-primary-foreground" onClick={() => { toast.success("Item created"); setShowAdd(false); }}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SuperAdminLayout>
  );
}
