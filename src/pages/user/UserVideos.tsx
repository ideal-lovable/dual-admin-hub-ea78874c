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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Play, Eye, Clock, MoreHorizontal, Edit, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

interface Video {
  id: number;
  thumbnail: string;
  title: string;
  category: string;
  views: string;
  duration: string;
  uploadDate: string;
  status: "approved" | "pending" | "rejected" | "draft";
}

const initialVideos: Video[] = [
  { id: 1, thumbnail: "🎬", title: "Summer Collection Showcase", category: "Fashion", views: "2.3K", duration: "12:45", uploadDate: "Jan 10, 2026", status: "approved" },
  { id: 2, thumbnail: "🏠", title: "Home Decor Haul 2026", category: "Home & Living", views: "1.8K", duration: "18:30", uploadDate: "Jan 8, 2026", status: "approved" },
  { id: 3, thumbnail: "✨", title: "Behind The Scenes Tour", category: "Lifestyle", views: "—", duration: "8:15", uploadDate: "Jan 9, 2026", status: "pending" },
  { id: 4, thumbnail: "💄", title: "Beauty Routine Secrets", category: "Beauty", views: "—", duration: "15:20", uploadDate: "Jan 7, 2026", status: "pending" },
  { id: 5, thumbnail: "🎨", title: "DIY Room Makeover", category: "Home & Living", views: "945", duration: "22:10", uploadDate: "Jan 5, 2026", status: "approved" },
  { id: 6, thumbnail: "📱", title: "Tech Essentials Review", category: "Technology", views: "—", duration: "10:00", uploadDate: "Jan 3, 2026", status: "rejected" },
];

export default function UserVideos() {
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [newVideo, setNewVideo] = useState({ title: "", category: "Fashion" });

  const handleUpload = () => {
    const video: Video = {
      id: Date.now(),
      thumbnail: "🎥",
      title: newVideo.title,
      category: newVideo.category,
      views: "—",
      duration: "0:00",
      uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "pending",
    };
    setVideos([video, ...videos]);
    setIsUploadOpen(false);
    setNewVideo({ title: "", category: "Fashion" });
    toast.success("Video uploaded successfully! It will be reviewed shortly.");
  };

  const handleDelete = () => {
    if (selectedVideo) {
      setVideos(videos.filter(v => v.id !== selectedVideo.id));
      setIsDeleteOpen(false);
      setSelectedVideo(null);
      toast.success("Video deleted successfully.");
    }
  };

  const handleEdit = () => {
    if (selectedVideo) {
      setVideos(videos.map(v => v.id === selectedVideo.id ? selectedVideo : v));
      setIsEditOpen(false);
      toast.success("Video updated successfully.");
    }
  };

  const approvedVideos = videos.filter(v => v.status === "approved");
  const pendingVideos = videos.filter(v => v.status === "pending");
  const rejectedVideos = videos.filter(v => v.status === "rejected");

  const columns = [
    {
      key: "thumbnail",
      label: "Video",
      render: (item: Video) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-20 rounded-lg bg-secondary flex items-center justify-center text-2xl">{item.thumbnail}</div>
          <div>
            <p className="font-medium text-foreground">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.category}</p>
          </div>
        </div>
      ),
    },
    {
      key: "views", label: "Views",
      render: (item: Video) => (
        <div className="flex items-center gap-2"><Eye className="h-4 w-4 text-muted-foreground" /><span>{item.views}</span></div>
      ),
    },
    {
      key: "duration", label: "Duration",
      render: (item: Video) => (
        <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /><span>{item.duration}</span></div>
      ),
    },
    { key: "uploadDate", label: "Upload Date" },
    {
      key: "status", label: "Status",
      render: (item: Video) => <StatusBadge status={item.status} />,
    },
    {
      key: "actions", label: "",
      render: (item: Video) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover border-border">
            <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => { setSelectedVideo(item); setIsViewOpen(true); }}>
              <Eye className="h-4 w-4" /> View
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => { setSelectedVideo({ ...item }); setIsEditOpen(true); }}>
              <Edit className="h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer text-destructive" onClick={() => { setSelectedVideo(item); setIsDeleteOpen(true); }}>
              <Trash2 className="h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <AdminLayout type="user" title="My Videos" subtitle="Manage your video content">
      <div className="space-y-6 animate-slide-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
            <Play className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{videos.length} Videos</span>
          </div>
          <Button className="gradient-primary text-primary-foreground gap-2" onClick={() => setIsUploadOpen(true)}>
            <Plus className="h-4 w-4" /> Upload Video
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-secondary border border-border">
            <TabsTrigger value="all">All Videos ({videos.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedVideos.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingVideos.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedVideos.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6"><DataTable columns={columns} data={videos} /></TabsContent>
          <TabsContent value="approved" className="mt-6"><DataTable columns={columns} data={approvedVideos} /></TabsContent>
          <TabsContent value="pending" className="mt-6"><DataTable columns={columns} data={pendingVideos} emptyMessage="No pending videos" /></TabsContent>
          <TabsContent value="rejected" className="mt-6"><DataTable columns={columns} data={rejectedVideos} emptyMessage="No rejected videos" /></TabsContent>
        </Tabs>
      </div>

      {/* Upload Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Upload Video</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Drag & drop your video file here or click to browse</p>
              <p className="text-xs text-muted-foreground mt-1">MP4, MOV, AVI up to 2GB</p>
            </div>
            <div>
              <Label className="text-foreground">Title</Label>
              <Input value={newVideo.title} onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })} className="mt-2 bg-secondary border-border" placeholder="Enter video title..." />
            </div>
            <div>
              <Label className="text-foreground">Category</Label>
              <Select value={newVideo.category} onValueChange={(v) => setNewVideo({ ...newVideo, category: v })}>
                <SelectTrigger className="mt-2 bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {["Fashion", "Beauty", "Home & Living", "Lifestyle", "Technology"].map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
            <Button className="gradient-primary text-primary-foreground" onClick={handleUpload} disabled={!newVideo.title}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Video Details</DialogTitle></DialogHeader>
          {selectedVideo && (
            <div className="space-y-4 py-4">
              <div className="aspect-video rounded-xl bg-secondary flex items-center justify-center text-6xl">{selectedVideo.thumbnail}</div>
              <h3 className="font-display text-lg font-semibold text-foreground">{selectedVideo.title}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-muted-foreground">Category</p><p className="font-medium text-foreground">{selectedVideo.category}</p></div>
                <div><p className="text-sm text-muted-foreground">Status</p><StatusBadge status={selectedVideo.status} /></div>
                <div><p className="text-sm text-muted-foreground">Views</p><p className="font-medium text-foreground">{selectedVideo.views}</p></div>
                <div><p className="text-sm text-muted-foreground">Duration</p><p className="font-medium text-foreground">{selectedVideo.duration}</p></div>
                <div><p className="text-sm text-muted-foreground">Upload Date</p><p className="font-medium text-foreground">{selectedVideo.uploadDate}</p></div>
              </div>
            </div>
          )}
          <DialogFooter><DialogClose asChild><Button variant="secondary">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Edit Video</DialogTitle></DialogHeader>
          {selectedVideo && (
            <div className="space-y-4 py-4">
              <div><Label className="text-foreground">Title</Label><Input value={selectedVideo.title} onChange={(e) => setSelectedVideo({ ...selectedVideo, title: e.target.value })} className="mt-2 bg-secondary border-border" /></div>
              <div><Label className="text-foreground">Category</Label>
                <Select value={selectedVideo.category} onValueChange={(v) => setSelectedVideo({ ...selectedVideo, category: v })}>
                  <SelectTrigger className="mt-2 bg-secondary border-border"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {["Fashion", "Beauty", "Home & Living", "Lifestyle", "Technology"].map(c => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
            <Button className="gradient-primary text-primary-foreground" onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display text-destructive">Delete Video</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground py-4">Are you sure you want to delete "{selectedVideo?.title}"? This action cannot be undone.</p>
          <DialogFooter>
            <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
