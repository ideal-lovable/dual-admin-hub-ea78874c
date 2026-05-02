import { CreatorLayout } from "@/layouts/CreatorLayout";
import { PlayCircle, Search, MoreHorizontal, Eye, ThumbsUp, Upload } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const videos = [
  { id: 1, title: "Summer Collection Lookbook", views: "42.1K", likes: "3.2K", status: "approved", date: "Mar 28, 2026" },
  { id: 2, title: "BTS: Studio Session", views: "28.7K", likes: "2.1K", status: "approved", date: "Mar 25, 2026" },
  { id: 3, title: "Product Review: Tech Gadgets", views: "19.3K", likes: "1.4K", status: "pending", date: "Mar 22, 2026" },
  { id: 4, title: "Morning Routine 2026", views: "15.8K", likes: "1.1K", status: "approved", date: "Mar 18, 2026" },
  { id: 5, title: "Collaboration with Brand X", views: "8.2K", likes: "620", status: "rejected", date: "Mar 15, 2026" },
];

export default function CreatorVideos() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = videos.filter(v =>
    v.title.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "all" || v.status === filter)
  );

  return (
    <CreatorLayout
      title="My Videos"
      subtitle="Manage and track your video content."
      breadcrumbs={[{ label: "Creator Studio", path: "/creator/dashboard" }, { label: "Content" }, { label: "Videos" }]}
    >
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search videos..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9 text-sm" />
        </div>
        <div className="flex gap-2">
          {["all", "approved", "pending", "rejected"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize",
                filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <Button size="sm" className="h-9 gap-1.5 gradient-primary text-primary-foreground">
          <Upload className="h-3.5 w-3.5" /> Upload Video
        </Button>
      </div>

      {filtered.length > 0 ? (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Video</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Views</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Likes</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Date</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(v => (
                <tr key={v.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-14 rounded-lg bg-secondary/60 flex items-center justify-center shrink-0">
                        <PlayCircle className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <span className="font-medium text-foreground text-sm">{v.title}</span>
                    </div>
                  </td>
                  <td className="text-right px-4 py-3 text-muted-foreground text-xs">
                    <span className="flex items-center justify-end gap-1"><Eye className="h-3 w-3" />{v.views}</span>
                  </td>
                  <td className="text-right px-4 py-3 text-muted-foreground text-xs">
                    <span className="flex items-center justify-end gap-1"><ThumbsUp className="h-3 w-3" />{v.likes}</span>
                  </td>
                  <td className="text-center px-4 py-3">
                    <span className={cn(
                      "text-[10px] font-semibold px-2.5 py-1 rounded-full capitalize",
                      v.status === "approved" && "bg-success/15 text-success",
                      v.status === "pending" && "bg-warning/15 text-warning",
                      v.status === "rejected" && "bg-destructive/15 text-destructive"
                    )}>{v.status}</span>
                  </td>
                  <td className="text-right px-4 py-3 text-xs text-muted-foreground">{v.date}</td>
                  <td className="px-2">
                    <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-16 rounded-xl border border-border bg-card">
          <Upload className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm font-medium text-muted-foreground">No videos found</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Upload your first video to get started</p>
        </div>
      )}
    </CreatorLayout>
  );
}
