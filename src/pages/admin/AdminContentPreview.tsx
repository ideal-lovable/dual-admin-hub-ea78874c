import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock3, Eye, Film, Globe, PencilLine, PlayCircle, Tags } from "lucide-react";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAdminStore, type ContentItem, type ContentStatus } from "@/lib/admin-store";

const statusLabel: Record<ContentStatus, string> = {
  approved: "Approved",
  active: "Published",
  pending: "In Review",
  draft: "Draft",
  scheduled: "Scheduled",
  rejected: "Rejected",
  flagged: "Flagged",
};

function typeLabel(item: ContentItem) {
  if (item.type === "movie") return "Movie";
  if (item.type === "web_series") return "Web Series";
  return item.type.charAt(0).toUpperCase() + item.type.slice(1);
}

function contentRoute(type: ContentItem["type"]) {
  if (type === "movie") return "movies";
  if (type === "web_series") return "series";
  if (type === "video") return "videos";
  if (type === "music") return "music";
  if (type === "podcast") return "podcasts";
  return "games";
}

function InfoBlock({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-xl bg-secondary/80 p-2.5">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
        <p className="mt-1 text-lg font-semibold text-foreground">{value || "-"}</p>
      </div>
    </div>
  );
}

export default function AdminContentPreview() {
  const { id } = useParams();
  const { content } = useAdminStore();
  const item = content.find((entry) => entry.id === id);

  if (!item) {
    return (
      <SuperAdminLayout
        title="Content Not Found"
        subtitle="The selected preview record is unavailable."
        breadcrumbs={[{ label: "Content", path: "/admin/content" }, { label: "Preview" }]}
      >
        <Button variant="secondary" size="sm" asChild>
          <Link to="/admin/content"><ArrowLeft className="mr-2 h-4 w-4" />Back</Link>
        </Button>
      </SuperAdminLayout>
    );
  }

  const displayType = typeLabel(item);
  const heroImage = item.landscapeImage || item.posterImage || item.squareImage;

  return (
    <SuperAdminLayout
      title={item.title}
      subtitle={`${displayType} preview - ${item.creator}`}
      breadcrumbs={[
        { label: "Content", path: "/admin/content" },
        { label: displayType, path: `/admin/content/${contentRoute(item.type)}` },
        { label: "Preview" },
      ]}
    >
      <div className="space-y-6 animate-slide-up">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="secondary" size="sm" asChild>
            <Link to="/admin/content"><ArrowLeft className="mr-2 h-4 w-4" />Back</Link>
          </Button>
          <div className="flex flex-wrap items-center gap-3">
            {item.trailerUrl && (
              <Button variant="outline" className="rounded-xl" asChild>
                <a href={item.trailerUrl} target="_blank" rel="noreferrer">
                  <PlayCircle className="mr-2 h-4 w-4" />Play trailer
                </a>
              </Button>
            )}
            <Button className="rounded-xl gradient-primary text-primary-foreground" asChild>
              <Link to={`/admin/content/${contentRoute(item.type)}/${item.id}/edit`}>
                <PencilLine className="mr-2 h-4 w-4" />Edit
              </Link>
            </Button>
          </div>
        </div>

        <section className="overflow-hidden rounded-3xl border border-border bg-card">
          <div
            className="relative min-h-[380px] bg-cover bg-center"
            style={{ backgroundImage: `linear-gradient(180deg, rgba(4,7,12,0.18) 0%, rgba(4,7,12,0.78) 58%, rgba(4,7,12,0.96) 100%), url(${heroImage})` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-primary p-5 shadow-lg shadow-primary/30">
                <PlayCircle className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="border-primary/30 bg-primary/15 text-primary">{displayType}</Badge>
                <Badge variant="secondary">{item.category}</Badge>
                <Badge variant="secondary">{statusLabel[item.status] ?? item.status}</Badge>
              </div>
              <h2 className="text-4xl font-black tracking-tight text-white">{item.title}</h2>
              <p className="mt-4 max-w-3xl text-lg text-white/80">{item.description}</p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <section className="rounded-3xl border border-border bg-card p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Details</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <InfoBlock icon={CalendarDays} label="Released" value={item.publishedYear} />
              <InfoBlock icon={Clock3} label="Sort Date" value={item.sortingDate} />
              <InfoBlock icon={Globe} label="Language" value={item.language} />
              <InfoBlock icon={Eye} label="Views" value={item.views} />
              <InfoBlock icon={CalendarDays} label="Submitted" value={item.submitted} />
              <InfoBlock icon={Film} label="Type" value={displayType} />
            </div>

            <div className="mt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Genres</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.genres.map((genre) => (
                  <Badge key={genre} variant="outline" className="rounded-full px-3 py-1 text-sm">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Tags</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="rounded-full px-3 py-1 text-sm">
                    <Tags className="mr-1.5 h-3.5 w-3.5" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Artwork</p>
            <div className="mt-5 space-y-5">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Poster</p>
                <img src={item.posterImage || heroImage} alt={`${item.title} poster`} className="aspect-[4/5] w-full rounded-2xl object-cover" />
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Portrait</p>
                <img src={item.portraitImage || heroImage} alt={`${item.title} portrait`} className="aspect-[4/5] w-full rounded-2xl object-cover" />
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Square</p>
                <img src={item.squareImage || heroImage} alt={`${item.title} square`} className="aspect-square w-full rounded-2xl object-cover" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
