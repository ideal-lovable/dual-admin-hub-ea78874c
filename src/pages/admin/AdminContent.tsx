import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Eye, CheckCircle, XCircle, Flag, Video, Radio, Star, Calendar, Layers, BarChart3, Package } from "lucide-react";
import { toast } from "sonner";

interface Content {
  id: number;
  title: string;
  type: "video" | "livestream" | "creator_pick";
  creator: string;
  status: "pending" | "approved" | "rejected" | "flagged" | "scheduled";
  submitted: string;
  views: string;
}

const initialContent: Content[] = [
  { id: 1, title: "Summer Fashion Haul 2026", type: "video", creator: "Sarah Johnson", status: "pending", submitted: "2 hours ago", views: "0" },
  { id: 2, title: "Live Cooking Show", type: "livestream", creator: "Chef Mike", status: "approved", submitted: "1 day ago", views: "2.4K" },
  { id: 3, title: "Best Running Shoes", type: "creator_pick", creator: "FitGuru", status: "pending", submitted: "5 hours ago", views: "0" },
  { id: 4, title: "Tech Review: New Laptop", type: "video", creator: "TechBro", status: "flagged", submitted: "3 days ago", views: "15K" },
  { id: 5, title: "Morning Yoga Session", type: "livestream", creator: "YogaLife", status: "approved", submitted: "2 days ago", views: "890" },
  { id: 6, title: "Skincare Routine", type: "video", creator: "BeautyQueen", status: "rejected", submitted: "4 days ago", views: "0" },
  { id: 7, title: "Top 10 Board Games", type: "creator_pick", creator: "GameNight", status: "approved", submitted: "1 week ago", views: "1.2K" },
  { id: 8, title: "DIY Home Decor", type: "video", creator: "CraftMaster", status: "pending", submitted: "6 hours ago", views: "0" },
  { id: 9, title: "Evening Jazz Live", type: "livestream", creator: "JazzCat", status: "scheduled", submitted: "Tomorrow 8 PM", views: "0" },
  { id: 10, title: "Workout Wednesday", type: "livestream", creator: "FitGuru", status: "scheduled", submitted: "Wed 6 PM", views: "0" },
];

const typeIcons: Record<string, React.ElementType> = { video: Video, livestream: Radio, creator_pick: Star };

const pathToTab: Record<string, string> = {
  "/admin/content": "all",
  "/admin/content/livestreams": "livestreams",
  "/admin/content/scheduled": "scheduled",
  "/admin/content/approval": "pending",
  "/admin/content/flagged": "flagged",
  "/admin/content/tools": "tools",
  "/admin/content/attach-products": "tools",
  "/admin/content/analytics": "analytics",
};
const tabToPath: Record<string, string> = {
  "all": "/admin/content",
  "livestreams": "/admin/content/livestreams",
  "scheduled": "/admin/content/scheduled",
  "pending": "/admin/content/approval",
  "flagged": "/admin/content/flagged",
  "tools": "/admin/content/tools",
  "analytics": "/admin/content/analytics",
};

export default function AdminContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = pathToTab[location.pathname] || "all";
  const [content, setContent] = useState(initialContent);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [previewDialog, setPreviewDialog] = useState(false);

  const handleApprove = (item: Content) => { setContent(content.map(c => c.id === item.id ? { ...c, status: "approved" } : c)); toast.success(`Approved: ${item.title}`); };
  const handleReject = (item: Content) => { setContent(content.map(c => c.id === item.id ? { ...c, status: "rejected" } : c)); toast.error(`Rejected: ${item.title}`); };
  const handleFlag = (item: Content) => { setContent(content.map(c => c.id === item.id ? { ...c, status: "flagged" } : c)); toast.warning(`Flagged: ${item.title}`); };

  const columns = [
    {
      key: "title" as const, label: "Content",
      render: (item: Content) => {
        const Icon = typeIcons[item.type];
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center"><Icon className="h-5 w-5 text-primary" /></div>
            <div><p className="font-medium text-foreground">{item.title}</p><p className="text-xs text-muted-foreground capitalize">{item.type.replace("_", " ")}</p></div>
          </div>
        );
      },
    },
    { key: "creator" as const, label: "Creator" },
    { key: "status" as const, label: "Status", render: (item: Content) => <StatusBadge status={item.status as any} /> },
    { key: "submitted" as const, label: "Submitted" },
    { key: "views" as const, label: "Views" },
    {
      key: "id" as const, label: "Actions",
      render: (item: Content) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => { setSelectedContent(item); setPreviewDialog(true); }}><Eye className="h-4 w-4 mr-2" />Preview</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleApprove(item)}><CheckCircle className="h-4 w-4 mr-2" />Approve</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleReject(item)}><XCircle className="h-4 w-4 mr-2" />Reject</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleFlag(item)} className="text-warning"><Flag className="h-4 w-4 mr-2" />Flag</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const filtered = content.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.creator.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <SuperAdminLayout title="Content Management" subtitle="Review and moderate all platform content" breadcrumbs={[{ label: "Dashboard", path: "/admin/dashboard" }, { label: "Content" }]}>
      <div className="space-y-6 animate-slide-up">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search content..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 bg-secondary border-border" />
          </div>
          <Button variant="secondary" size="sm" onClick={() => { content.filter(c => c.status === "pending").forEach(c => handleApprove(c)); }}><CheckCircle className="h-4 w-4 mr-2" />Approve All Pending</Button>
        </div>
        <Tabs value={activeTab} onValueChange={(v) => navigate(tabToPath[v])}>
          <TabsList>
            <TabsTrigger value="all"><Video className="h-3.5 w-3.5 mr-1" />Videos ({filtered.filter(c => c.type === "video").length})</TabsTrigger>
            <TabsTrigger value="livestreams"><Radio className="h-3.5 w-3.5 mr-1" />Livestreams</TabsTrigger>
            <TabsTrigger value="scheduled"><Calendar className="h-3.5 w-3.5 mr-1" />Scheduled</TabsTrigger>
            <TabsTrigger value="pending"><CheckCircle className="h-3.5 w-3.5 mr-1" />Approval Queue</TabsTrigger>
            <TabsTrigger value="flagged"><Flag className="h-3.5 w-3.5 mr-1" />Flagged</TabsTrigger>
            <TabsTrigger value="tools"><Layers className="h-3.5 w-3.5 mr-1" />Tools</TabsTrigger>
            <TabsTrigger value="analytics"><BarChart3 className="h-3.5 w-3.5 mr-1" />Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="all"><DataTable columns={columns} data={filtered.filter(c => c.type === "video")} /></TabsContent>
          <TabsContent value="livestreams"><DataTable columns={columns} data={filtered.filter(c => c.type === "livestream")} /></TabsContent>
          <TabsContent value="scheduled"><DataTable columns={columns} data={filtered.filter(c => c.status === "scheduled")} emptyMessage="No scheduled content" /></TabsContent>
          <TabsContent value="pending"><DataTable columns={columns} data={filtered.filter(c => c.status === "pending")} emptyMessage="No pending approvals" /></TabsContent>
          <TabsContent value="flagged"><DataTable columns={columns} data={filtered.filter(c => c.status === "flagged")} emptyMessage="No flagged content" /></TabsContent>
          <TabsContent value="tools">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-card border-border hover:border-primary/20 transition-colors cursor-pointer" onClick={() => navigate("/admin/content/attach-products")}>
                <CardContent className="p-6 text-center">
                  <Package className="h-10 w-10 mx-auto text-primary mb-3" />
                  <p className="text-sm font-medium">Attach Products</p>
                  <p className="text-xs text-muted-foreground mt-1">Link products to videos and livestreams</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border hover:border-primary/20 transition-colors cursor-pointer" onClick={() => navigate("/admin/content/analytics")}>
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-10 w-10 mx-auto text-accent mb-3" />
                  <p className="text-sm font-medium">Content Analytics</p>
                  <p className="text-xs text-muted-foreground mt-1">View performance metrics for all content</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics">
            <Card className="bg-card border-border">
              <CardHeader><CardTitle className="text-sm">Content Performance Overview</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Total Videos", value: "1,580" },
                    { label: "Total Livestreams", value: "380" },
                    { label: "Avg. Views", value: "2.4K" },
                    { label: "Engagement Rate", value: "4.8%" },
                  ].map(s => (
                    <div key={s.label} className="p-4 rounded-lg bg-secondary/30 text-center">
                      <p className="text-xl font-bold font-display">{s.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={previewDialog} onOpenChange={setPreviewDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Content Preview</DialogTitle></DialogHeader>
          {selectedContent && (
            <div className="space-y-4">
              <div className="aspect-video rounded-lg bg-secondary/50 flex items-center justify-center"><Video className="h-12 w-12 text-muted-foreground" /></div>
              <div><h3 className="font-semibold text-foreground">{selectedContent.title}</h3><p className="text-sm text-muted-foreground">By {selectedContent.creator} • {selectedContent.submitted}</p></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="destructive" onClick={() => { if (selectedContent) handleReject(selectedContent); setPreviewDialog(false); }}>Reject</Button>
            <Button variant="secondary" onClick={() => { if (selectedContent) handleFlag(selectedContent); setPreviewDialog(false); }}>Flag</Button>
            <Button onClick={() => { if (selectedContent) handleApprove(selectedContent); setPreviewDialog(false); }} className="gradient-primary text-primary-foreground">Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SuperAdminLayout>
  );
}
