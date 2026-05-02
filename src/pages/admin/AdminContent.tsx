import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContentItem, ContentStatus, ContentType, useAdminStore } from "@/lib/admin-store";
import { Eye, Edit, Plus, Search, SlidersHorizontal, Trash2 } from "lucide-react";

const pageMeta: Record<string, { title: string; subtitle: string; button: string }> = {
  all: { title: "Content", subtitle: "All content on the platform — manage titles, status, and metadata.", button: "New Content" },
  movies: { title: "Movies", subtitle: "All movies on the platform — manage titles, status, and metadata.", button: "New Movie" },
  series: { title: "Series", subtitle: "Manage web series, seasons, release dates, and status.", button: "New Series" },
  videos: { title: "Videos", subtitle: "Manage videos, creator uploads, moderation, and metadata.", button: "New Video" },
  music: { title: "Music", subtitle: "Manage music releases, albums, tracks, and metadata.", button: "New Music" },
  podcasts: { title: "Podcasts", subtitle: "Manage podcasts, episodes, hosts, and publishing status.", button: "New Podcast" },
  games: { title: "Games", subtitle: "Manage game entries, artwork, categories, and release state.", button: "New Game" },
  livestreams: { title: "Livestreams", subtitle: "Review livestream content, scheduled sessions, and replays.", button: "New Stream" },
  approval: { title: "Content Review", subtitle: "Review pending uploads before they appear on the platform.", button: "Submit Content" },
  flagged: { title: "Flagged Content", subtitle: "Investigate rejected and flagged content reports.", button: "New Content" },
};

const pathToType: Record<string, string> = {
  "/admin/content": "all",
  "/admin/content/movies": "movies",
  "/admin/content/series": "series",
  "/admin/content/videos": "videos",
  "/admin/content/music": "music",
  "/admin/content/podcasts": "podcasts",
  "/admin/content/games": "games",
  "/admin/content/livestreams": "livestreams",
  "/admin/content/approval": "approval",
  "/admin/content/flagged": "flagged",
};

const routeTypeToContentType: Record<string, ContentType> = {
  movies: "movie",
  series: "web_series",
  videos: "video",
  music: "music",
  podcasts: "podcast",
  games: "game",
};

const contentTypeToRoute: Record<ContentType, string> = {
  movie: "movies",
  web_series: "series",
  video: "videos",
  music: "music",
  podcast: "podcasts",
  game: "games",
};

const statusLabel: Record<ContentStatus, string> = {
  approved: "Published",
  active: "Published",
  pending: "In Review",
  draft: "Draft",
  scheduled: "Scheduled",
  rejected: "Rejected",
  flagged: "Flagged",
};

function StatusPill({ status }: { status: ContentStatus }) {
  const label = statusLabel[status] ?? status;
  const className = status === "approved" || status === "active"
    ? "bg-success/15 text-success border-success/30"
    : status === "pending"
      ? "bg-warning/15 text-warning border-warning/30"
      : status === "scheduled"
        ? "bg-accent/15 text-accent border-accent/30"
        : status === "flagged" || status === "rejected"
          ? "bg-destructive/15 text-destructive border-destructive/30"
        : "bg-secondary text-muted-foreground border-border";
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase ${className}`}>{label}</span>;
}

export default function AdminContent() {
  const location = useLocation();
  const { content, deleteContent } = useAdminStore();
  const activeType = pathToType[location.pathname] || "all";
  const meta = pageMeta[activeType] || pageMeta.all;
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");

  const rows = useMemo(() => content.filter((row) => {
    const typeMatches = activeType === "all"
      || activeType === "livestreams"
      || activeType === "approval"
      || activeType === "flagged"
      || row.type === routeTypeToContentType[activeType];
    const routeStatusMatches = activeType === "approval"
      ? row.status === "pending"
      : activeType === "flagged"
        ? row.status === "flagged" || row.status === "rejected"
        : true;
    const searchMatches = [row.title, row.description, row.category, row.status].join(" ").toLowerCase().includes(searchQuery.toLowerCase());
    const statusMatches = status === "all" || row.status === status || statusLabel[row.status].toLowerCase().replace(" ", "-") === status;
    const categoryMatches = category === "all" || row.category.toLowerCase() === category;
    return typeMatches && routeStatusMatches && searchMatches && statusMatches && categoryMatches;
  }), [activeType, category, content, searchQuery, status]);

  const columns = [
    {
      key: "title",
      label: "Title ↕",
      render: (row: ContentItem) => (
        <div className="flex min-w-[310px] items-center gap-4">
          <div className="h-10 w-16 overflow-hidden rounded-md bg-secondary">
            <img src={row.landscapeImage || row.posterImage || row.squareImage} alt={row.title} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-foreground">{row.title}</p>
            <p className="text-xs text-muted-foreground truncate">{row.description}</p>
          </div>
        </div>
      ),
    },
    { key: "category", label: "Category ↕", render: (row: ContentItem) => <span className="text-sm text-muted-foreground">{row.category}</span> },
    { key: "status", label: "Status ↕", render: (row: ContentItem) => <StatusPill status={row.status} /> },
    { key: "views", label: "Views ↕", render: (row: ContentItem) => <span className="text-sm font-semibold text-foreground">{row.views}</span> },
    { key: "created", label: "Created ↕", render: (row: ContentItem) => <span className="text-sm text-muted-foreground">{row.sortingDate || row.submitted}</span> },
    {
      key: "actions",
      label: "",
      render: (row: ContentItem) => (
        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild><Link to={`/admin/content/preview/${row.id}`}><Eye className="h-4 w-4" /></Link></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild><Link to={`/admin/content/${contentTypeToRoute[row.type]}/${row.id}/edit`}><Edit className="h-4 w-4" /></Link></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => deleteContent(row.id)}><Trash2 className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ];

  return (
    <SuperAdminLayout title={meta.title} subtitle={meta.subtitle} breadcrumbs={[{ label: "Content" }, { label: meta.title }]}> 
      <div className="space-y-6 animate-slide-up">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="h-10 pl-9 bg-background border-border rounded-xl" />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="h-10 w-full md:w-36 bg-background border-border rounded-xl"><SelectValue placeholder="All statuses" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-10 w-full md:w-40 bg-background border-border rounded-xl"><SelectValue placeholder="All categories" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                <SelectItem value="movies">Movies</SelectItem>
                <SelectItem value="series">Series</SelectItem>
                <SelectItem value="videos">Videos</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="podcasts">Podcasts</SelectItem>
                <SelectItem value="games">Games</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col items-stretch gap-3 sm:items-end">
            <Button className="h-10 rounded-xl gradient-primary text-primary-foreground" asChild><Link to={routeTypeToContentType[activeType] ? `/admin/content/${activeType}/new` : "/admin/content/new"}><Plus className="h-4 w-4 mr-2" />{meta.button}</Link></Button>
            <Button variant="ghost" size="sm" className="justify-start gap-2 text-muted-foreground sm:justify-end"><SlidersHorizontal className="h-4 w-4" />Columns</Button>
          </div>
        </div>

        <DataTable columns={columns} data={rows} emptyMessage={`No ${meta.title.toLowerCase()} found`} />
      </div>
    </SuperAdminLayout>
  );
}
