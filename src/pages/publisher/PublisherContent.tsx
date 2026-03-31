import { useState } from "react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2, Film, Music, Gamepad2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface ContentItem {
  id: number; title: string; type: "Movie" | "TV Show" | "Music" | "Podcast" | "Game"; genre: string; submitted: string; views: string; status: "active" | "pending" | "draft";
}

const initialContent: ContentItem[] = [
  { id: 1, title: "The Lodge - Season 2", type: "TV Show", genre: "Thriller", submitted: "Jan 12, 2026", views: "12.4K", status: "active" },
  { id: 2, title: "Crossfire", type: "Movie", genre: "Action", submitted: "Feb 1, 2026", views: "—", status: "pending" },
  { id: 3, title: "Summer Beats Vol. 3", type: "Music", genre: "Pop/R&B", submitted: "Jan 28, 2026", views: "8.2K", status: "active" },
  { id: 4, title: "Tomorrow", type: "Movie", genre: "Drama", submitted: "Feb 10, 2026", views: "—", status: "pending" },
  { id: 5, title: "Murder at Castlewick", type: "TV Show", genre: "Mystery", submitted: "Dec 5, 2025", views: "22.1K", status: "active" },
  { id: 6, title: "Neon Nights EP", type: "Music", genre: "Electronic", submitted: "Feb 15, 2026", views: "—", status: "draft" },
  { id: 7, title: "Arena Clash", type: "Game", genre: "Action RPG", submitted: "Jan 20, 2026", views: "5.6K", status: "active" },
];

const typeIcons: Record<string, typeof Film> = { Movie: Film, "TV Show": Film, Music: Music, Podcast: Music, Game: Gamepad2 };

export default function PublisherContent() {
  const [contentItems, setContentItems] = useState<ContentItem[]>(initialContent);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [newItem, setNewItem] = useState({ title: "", type: "Movie" as ContentItem["type"], genre: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = () => {
    const item: ContentItem = { id: Date.now(), title: newItem.title, type: newItem.type, genre: newItem.genre, submitted: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), views: "—", status: "pending" };
    setContentItems([item, ...contentItems]);
    setIsSubmitOpen(false);
    setNewItem({ title: "", type: "Movie", genre: "" });
    toast.success("Content submitted for review!");
  };

  const handleEdit = () => {
    if (selectedItem) { setContentItems(contentItems.map(c => c.id === selectedItem.id ? selectedItem : c)); setIsEditOpen(false); toast.success("Content updated."); }
  };

  const handleDelete = () => {
    if (selectedItem) { setContentItems(contentItems.filter(c => c.id !== selectedItem.id)); setIsDeleteOpen(false); toast.success("Content removed."); }
  };

  const filtered = searchQuery ? contentItems.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase())) : contentItems;
  const active = filtered.filter(c => c.status === "active");
  const pending = filtered.filter(c => c.status === "pending");
  const drafts = filtered.filter(c => c.status === "draft");

  const columns = [
    { key: "content", label: "Content", render: (item: ContentItem) => {
      const Icon = typeIcons[item.type] || Film;
      return (<div className="flex items-center gap-3"><div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center"><Icon className="h-5 w-5 text-accent" /></div><div><p className="font-medium text-foreground">{item.title}</p><p className="text-sm text-muted-foreground">{item.type} · {item.genre}</p></div></div>);
    }},
    { key: "submitted", label: "Submitted" },
    { key: "views", label: "Views", render: (item: ContentItem) => <span className={item.views !== "—" ? "text-success" : "text-muted-foreground"}>{item.views}</span> },
    { key: "status", label: "Status", render: (item: ContentItem) => <StatusBadge status={item.status} /> },
    { key: "actions", label: "", render: (item: ContentItem) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-popover border-border">
          <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => { setSelectedItem(item); setIsViewOpen(true); }}><Eye className="h-4 w-4" /> View</DropdownMenuItem>
          <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => { setSelectedItem({ ...item }); setIsEditOpen(true); }}><Edit className="h-4 w-4" /> Edit</DropdownMenuItem>
          <DropdownMenuItem className="gap-2 cursor-pointer text-destructive" onClick={() => { setSelectedItem(item); setIsDeleteOpen(true); }}><Trash2 className="h-4 w-4" /> Remove</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )},
  ];

  return (
    <AdminLayout type="publisher" title="Content" subtitle="Manage your submitted content">
      <div className="space-y-6 animate-slide-up">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary"><Film className="h-4 w-4 text-primary" /><span className="text-sm font-medium">{contentItems.length} Titles</span></div>
          <div className="flex items-center gap-3">
            <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search content..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-64 pl-10 bg-secondary border-border" /></div>
            <Button className="gradient-primary text-primary-foreground gap-2" onClick={() => setIsSubmitOpen(true)}><Plus className="h-4 w-4" /> Submit Content</Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-secondary border border-border">
            <TabsTrigger value="all">All ({filtered.length})</TabsTrigger>
            <TabsTrigger value="active">Live ({active.length})</TabsTrigger>
            <TabsTrigger value="pending">In Review ({pending.length})</TabsTrigger>
            <TabsTrigger value="draft">Draft ({drafts.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6"><DataTable columns={columns} data={filtered} /></TabsContent>
          <TabsContent value="active" className="mt-6"><DataTable columns={columns} data={active} /></TabsContent>
          <TabsContent value="pending" className="mt-6"><DataTable columns={columns} data={pending} emptyMessage="No content in review" /></TabsContent>
          <TabsContent value="draft" className="mt-6"><DataTable columns={columns} data={drafts} emptyMessage="No drafts" /></TabsContent>
        </Tabs>
      </div>

      {/* Submit Dialog */}
      <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Submit Content</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div><Label className="text-foreground">Title</Label><Input value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} className="mt-2 bg-secondary border-border" placeholder="Enter content title..." /></div>
            <div><Label className="text-foreground">Type</Label>
              <Select value={newItem.type} onValueChange={(v: ContentItem["type"]) => setNewItem({ ...newItem, type: v })}>
                <SelectTrigger className="mt-2 bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-popover border-border">{["Movie", "TV Show", "Music", "Podcast", "Game"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label className="text-foreground">Genre</Label><Input value={newItem.genre} onChange={(e) => setNewItem({ ...newItem, genre: e.target.value })} className="mt-2 bg-secondary border-border" placeholder="e.g., Action, Drama, Pop" /></div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
            <Button className="gradient-primary text-primary-foreground" onClick={handleSubmit} disabled={!newItem.title || !newItem.genre}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Content Details</DialogTitle></DialogHeader>
          {selectedItem && (
            <div className="space-y-4 py-4">
              <div className="h-40 rounded-xl bg-secondary flex items-center justify-center"><Film className="h-16 w-16 text-muted-foreground/30" /></div>
              <h3 className="font-display text-lg font-semibold text-foreground">{selectedItem.title}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-muted-foreground">Type</p><p className="font-medium text-foreground">{selectedItem.type}</p></div>
                <div><p className="text-sm text-muted-foreground">Genre</p><p className="font-medium text-foreground">{selectedItem.genre}</p></div>
                <div><p className="text-sm text-muted-foreground">Views</p><p className="font-medium text-foreground">{selectedItem.views}</p></div>
                <div><p className="text-sm text-muted-foreground">Status</p><StatusBadge status={selectedItem.status} /></div>
                <div><p className="text-sm text-muted-foreground">Submitted</p><p className="font-medium text-foreground">{selectedItem.submitted}</p></div>
              </div>
            </div>
          )}
          <DialogFooter><DialogClose asChild><Button variant="secondary">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Edit Content</DialogTitle></DialogHeader>
          {selectedItem && (
            <div className="space-y-4 py-4">
              <div><Label className="text-foreground">Title</Label><Input value={selectedItem.title} onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value })} className="mt-2 bg-secondary border-border" /></div>
              <div><Label className="text-foreground">Type</Label>
                <Select value={selectedItem.type} onValueChange={(v: ContentItem["type"]) => setSelectedItem({ ...selectedItem, type: v })}>
                  <SelectTrigger className="mt-2 bg-secondary border-border"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover border-border">{["Movie", "TV Show", "Music", "Podcast", "Game"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label className="text-foreground">Genre</Label><Input value={selectedItem.genre} onChange={(e) => setSelectedItem({ ...selectedItem, genre: e.target.value })} className="mt-2 bg-secondary border-border" /></div>
            </div>
          )}
          <DialogFooter><DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose><Button className="gradient-primary text-primary-foreground" onClick={handleEdit}>Save Changes</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display text-destructive">Remove Content</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground py-4">Remove "{selectedItem?.title}" from your submitted content? This action cannot be undone.</p>
          <DialogFooter><DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose><Button variant="destructive" onClick={handleDelete}>Remove</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
