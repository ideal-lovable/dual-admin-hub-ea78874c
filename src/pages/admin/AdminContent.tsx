import { AdminLayout } from "@/layouts/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Eye, CheckCircle, XCircle, Flag, Video, Radio, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Content {
  id: number;
  title: string;
  type: "video" | "livestream" | "creator_pick";
  creator: string;
  status: "pending" | "approved" | "rejected" | "flagged";
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
];

const typeIcons: Record<string, React.ElementType> = { video: Video, livestream: Radio, creator_pick: Star };

export default function AdminContent() {
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
    <AdminLayout type="admin" title="Content Moderation" subtitle="Review and moderate all platform content">
      <div className="space-y-6 animate-slide-up">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search content..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 bg-secondary border-border" />
          </div>
          <Button variant="secondary" size="sm" onClick={() => { content.filter(c => c.status === "pending").forEach(c => handleApprove(c)); }}><CheckCircle className="h-4 w-4 mr-2" />Approve All Pending</Button>
        </div>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All ({filtered.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="flagged">Flagged</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          <TabsContent value="all"><DataTable columns={columns} data={filtered} /></TabsContent>
          <TabsContent value="pending"><DataTable columns={columns} data={filtered.filter(c => c.status === "pending")} /></TabsContent>
          <TabsContent value="flagged"><DataTable columns={columns} data={filtered.filter(c => c.status === "flagged")} /></TabsContent>
          <TabsContent value="approved"><DataTable columns={columns} data={filtered.filter(c => c.status === "approved")} /></TabsContent>
          <TabsContent value="rejected"><DataTable columns={columns} data={filtered.filter(c => c.status === "rejected")} /></TabsContent>
        </Tabs>
      </div>

      <Dialog open={previewDialog} onOpenChange={setPreviewDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Content Preview</DialogTitle></DialogHeader>
          {selectedContent && (
            <div className="space-y-4">
              <div className="aspect-video rounded-lg bg-secondary/50 flex items-center justify-center"><Video className="h-12 w-12 text-muted-foreground" /></div>
              <div><h3 className="font-semibold text-foreground">{selectedContent.title}</h3><p className="text-sm text-muted-foreground">By {selectedContent.creator} • {selectedContent.submitted}</p></div>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-secondary/30 text-center"><p className="text-xs text-muted-foreground">Type</p><p className="text-sm font-medium text-foreground capitalize">{selectedContent.type.replace("_", " ")}</p></div>
                <div className="p-3 rounded-lg bg-secondary/30 text-center"><p className="text-xs text-muted-foreground">Status</p><StatusBadge status={selectedContent.status as any} /></div>
                <div className="p-3 rounded-lg bg-secondary/30 text-center"><p className="text-xs text-muted-foreground">Views</p><p className="text-sm font-medium text-foreground">{selectedContent.views}</p></div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="destructive" onClick={() => { if (selectedContent) handleReject(selectedContent); setPreviewDialog(false); }}>Reject</Button>
            <Button variant="secondary" onClick={() => { if (selectedContent) handleFlag(selectedContent); setPreviewDialog(false); }}>Flag</Button>
            <Button onClick={() => { if (selectedContent) handleApprove(selectedContent); setPreviewDialog(false); }} className="gradient-primary text-primary-foreground">Approve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
