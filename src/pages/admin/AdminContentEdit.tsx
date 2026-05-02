import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, PencilLine } from "lucide-react";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { Button } from "@/components/ui/button";
import { RichContentDraft, RichEditForm, blankContentDraft } from "@/components/admin/RichEditForm";
import { ContentType, useAdminStore } from "@/lib/admin-store";
import { toast } from "sonner";

const routeTypeToDraft: Record<string, { type: ContentType; category: string }> = {
  movies: { type: "movie", category: "Movies" },
  videos: { type: "video", category: "Videos" },
  series: { type: "web_series", category: "Web Series" },
  music: { type: "music", category: "Music" },
  podcasts: { type: "podcast", category: "Podcasts" },
  games: { type: "game", category: "Games" },
};

const contentTypeToRoute: Record<ContentType, string> = {
  movie: "movies",
  video: "videos",
  web_series: "series",
  music: "music",
  podcast: "podcasts",
  game: "games",
};

export default function AdminContentEdit() {
  const { id, type } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { content, addContent, updateContent } = useAdminStore();
  const existing = useMemo(() => content.find((item) => item.id === id), [content, id]);
  const isNew = !id || id === "new";
  const isViewMode = !isNew && !location.pathname.endsWith("/edit");
  const routeDefaults = type ? routeTypeToDraft[type] : undefined;

  const buildDraft = (): RichContentDraft => existing ? {
    title: existing.title,
    type: existing.type,
    creator: existing.creator,
    status: existing.status,
    category: existing.category,
    genres: existing.genres,
    language: existing.language,
    publishedYear: existing.publishedYear,
    sortingDate: existing.sortingDate,
    isAdult: existing.isAdult,
    description: existing.description,
    tags: existing.tags,
    uploadUrl: existing.uploadUrl,
    trailerUrl: existing.trailerUrl,
    posterImage: existing.posterImage,
    portraitImage: existing.portraitImage,
    landscapeImage: existing.landscapeImage,
    squareImage: existing.squareImage,
  } : { ...blankContentDraft, ...(routeDefaults ?? {}) };

  const [draft, setDraft] = useState<RichContentDraft>(buildDraft);

  useEffect(() => {
    setDraft(buildDraft());
  }, [existing, type, id]);

  const handleSubmit = () => {
    if (isViewMode && existing) {
      navigate(`/admin/content/${contentTypeToRoute[existing.type]}/${existing.id}/edit`);
      return;
    }

    if (!draft.title.trim()) {
      toast.error("Please enter a title before saving.");
      return;
    }

    if (isNew) {
      const created = addContent(draft);
      toast.success("Content created with rich metadata.");
      navigate(`/admin/content/${contentTypeToRoute[created.type]}/${created.id}/edit`);
      return;
    }

    if (existing) {
      updateContent(existing.id, draft);
      toast.success("Content updated.");
      navigate("/admin/content");
    }
  };

  if (!isNew && !existing) {
    return (
      <SuperAdminLayout
        title="Content Not Found"
        subtitle="The selected content record is unavailable."
        breadcrumbs={[{ label: "Dashboard", path: "/admin/dashboard" }, { label: "Content", path: "/admin/content" }, { label: "Not Found" }]}
      >
        <div className="space-y-6 animate-slide-up">
          <Button variant="secondary" size="sm" asChild>
            <Link to="/admin/content"><ArrowLeft className="h-4 w-4 mr-2" />Back to Content</Link>
          </Button>
        </div>
      </SuperAdminLayout>
    );
  }

  return (
    <SuperAdminLayout
      title={isNew ? "Create Content" : isViewMode ? existing?.title ?? "View Content" : `Edit ${existing?.title ?? "Content"}`}
      subtitle={isViewMode ? "View content metadata, taxonomy, media URLs, and artwork" : "Full metadata, taxonomy, upload URLs, and multi-ratio artwork"}
      breadcrumbs={[{ label: "Dashboard", path: "/admin/dashboard" }, { label: "Content", path: "/admin/content" }, { label: isNew ? "Create" : isViewMode ? "View" : "Edit" }]}
    >
      <div className="space-y-6 animate-slide-up">
        <Button variant="secondary" size="sm" asChild>
          <Link to="/admin/content"><ArrowLeft className="h-4 w-4 mr-2" />Back to Content</Link>
        </Button>
        <RichEditForm value={draft} onChange={setDraft} onSubmit={handleSubmit} submitLabel={isViewMode ? "Edit Content" : isNew ? "Create Content" : "Save Changes"} readOnly={isViewMode} />
        {isViewMode && existing && (
          <div className="flex justify-end">
            <Button asChild className="gradient-primary text-primary-foreground">
              <Link to={`/admin/content/${contentTypeToRoute[existing.type]}/${existing.id}/edit`}><PencilLine className="h-4 w-4 mr-2" />Open Edit Mode</Link>
            </Button>
          </div>
        )}
      </div>
    </SuperAdminLayout>
  );
}
