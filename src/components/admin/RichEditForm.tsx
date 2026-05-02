import { ContentItem, ContentStatus, ContentType, useAdminStore } from "@/lib/admin-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ThumbnailPicker } from "@/components/admin/ThumbnailPicker";
import { cn } from "@/lib/utils";

export type RichContentDraft = Omit<ContentItem, "id" | "submitted" | "views">;

export const blankContentDraft: RichContentDraft = {
  title: "",
  type: "movie",
  creator: "FVRD Admin",
  status: "draft",
  category: "Movies",
  genres: [],
  language: "English",
  publishedYear: "2026",
  sortingDate: new Date().toISOString().slice(0, 10),
  isAdult: false,
  description: "",
  tags: [],
  uploadUrl: "",
  trailerUrl: "",
  posterImage: "",
  portraitImage: "",
  landscapeImage: "",
  squareImage: "",
};

const contentTypes: { label: string; value: ContentType }[] = [
  { label: "Movie", value: "movie" },
  { label: "Video", value: "video" },
  { label: "Web Series", value: "web_series" },
  { label: "Music", value: "music" },
  { label: "Podcast", value: "podcast" },
  { label: "Game", value: "game" },
];

const statuses: ContentStatus[] = ["draft", "pending", "approved", "rejected", "flagged", "scheduled", "active"];

function RichRow({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-4 border-b border-border/60 py-5 lg:grid-cols-[240px_1fr]">
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function splitTags(value: string) {
  return value.split(",").map((tag) => tag.trim()).filter(Boolean);
}

interface RichEditFormProps {
  value: RichContentDraft;
  onChange: (value: RichContentDraft) => void;
  onSubmit: () => void;
  submitLabel: string;
  readOnly?: boolean;
}

export function RichEditForm({ value, onChange, onSubmit, submitLabel, readOnly = false }: RichEditFormProps) {
  const { categories, genres } = useAdminStore();
  const update = <K extends keyof RichContentDraft>(key: K, next: RichContentDraft[K]) => onChange({ ...value, [key]: next });

  return (
    <div className="glass-card rounded-xl p-5 md:p-6">
      <RichRow title="Core details" description="Title, format, status, publisher/creator, and searchable description shown across admin panels.">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label>Title</Label>
            <Input value={value.title} onChange={(event) => update("title", event.target.value)} className="mt-2 bg-secondary border-border" placeholder="Enter content title" disabled={readOnly} />
          </div>
          <div>
            <Label>Content Type</Label>
            <Select value={value.type} onValueChange={(next: ContentType) => update("type", next)} disabled={readOnly}>
              <SelectTrigger className="mt-2 bg-secondary border-border"><SelectValue /></SelectTrigger>
              <SelectContent>{contentTypes.map((type) => <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label>Status</Label>
            <Select value={value.status} onValueChange={(next: ContentStatus) => update("status", next)} disabled={readOnly}>
              <SelectTrigger className="mt-2 bg-secondary border-border"><SelectValue /></SelectTrigger>
              <SelectContent>{statuses.map((status) => <SelectItem key={status} value={status} className="capitalize">{status}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label>Publisher / Creator</Label>
            <Input value={value.creator} onChange={(event) => update("creator", event.target.value)} className="mt-2 bg-secondary border-border" disabled={readOnly} />
          </div>
          <div>
            <Label>Language</Label>
            <Input value={value.language} onChange={(event) => update("language", event.target.value)} className="mt-2 bg-secondary border-border" disabled={readOnly} />
          </div>
          <div className="md:col-span-2">
            <Label>Description <span className="text-muted-foreground">({value.description.length}/500)</span></Label>
            <Textarea value={value.description} maxLength={500} onChange={(event) => update("description", event.target.value)} className="mt-2 min-h-28 bg-secondary border-border" disabled={readOnly} />
          </div>
        </div>
      </RichRow>

      <RichRow title="Taxonomy" description="Manage categories and genres for movies, music, podcasts, web series, games, and videos.">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Category</Label>
            <Select value={value.category} onValueChange={(next) => update("category", next)} disabled={readOnly}>
              <SelectTrigger className="mt-2 bg-secondary border-border"><SelectValue /></SelectTrigger>
              <SelectContent>{categories.map((category) => <SelectItem key={category} value={category}>{category}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label>Tags</Label>
            <Input value={value.tags.join(", ")} onChange={(event) => update("tags", splitTags(event.target.value))} className="mt-2 bg-secondary border-border" placeholder="featured, original, trending" disabled={readOnly} />
          </div>
        </div>
        <div>
          <Label>Genres</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {genres.map((genre) => {
              const active = value.genres.includes(genre);
              return (
                <button
                  key={genre}
                  type="button"
                  onClick={() => update("genres", active ? value.genres.filter((item) => item !== genre) : [...value.genres, genre])}
                  disabled={readOnly}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    active ? "border-primary/50 bg-primary/15 text-primary" : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {genre}
                </button>
              );
            })}
          </div>
        </div>
      </RichRow>

      <RichRow title="Release settings" description="Publishing year, sorting date, age restriction, source file URL, and trailer/audio preview URL.">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Published Year</Label>
            <Input value={value.publishedYear} onChange={(event) => update("publishedYear", event.target.value)} className="mt-2 bg-secondary border-border" disabled={readOnly} />
          </div>
          <div>
            <Label>Sorting Date</Label>
            <Input type="date" value={value.sortingDate} onChange={(event) => update("sortingDate", event.target.value)} className="mt-2 bg-secondary border-border" disabled={readOnly} />
          </div>
          <div className="md:col-span-2 flex items-center justify-between rounded-xl border border-border bg-secondary/20 p-4">
            <div>
              <Label>Is Adult</Label>
              <p className="text-xs text-muted-foreground mt-1">Restrict visibility for mature titles and explicit podcasts/music.</p>
            </div>
            <Switch checked={value.isAdult} onCheckedChange={(checked) => update("isAdult", checked)} disabled={readOnly} />
          </div>
          <div>
            <Label>Upload URL</Label>
            <Input value={value.uploadUrl} onChange={(event) => update("uploadUrl", event.target.value)} className="mt-2 bg-secondary border-border" placeholder="Movie/music/podcast file URL" disabled={readOnly} />
          </div>
          <div>
            <Label>Trailer / Preview URL</Label>
            <Input value={value.trailerUrl} onChange={(event) => update("trailerUrl", event.target.value)} className="mt-2 bg-secondary border-border" placeholder="Trailer or preview URL" disabled={readOnly} />
          </div>
        </div>
      </RichRow>

      <div className="py-5">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">Artwork & thumbnails</p>
            <p className="mt-1 text-xs text-muted-foreground">Set all required surfaces: wide poster, portrait card, landscape player, and square tile.</p>
          </div>
          <Badge variant="secondary" className="w-fit">URL + library picker</Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <ThumbnailPicker label="Poster" hint="16:4 hero banner" ratioClass="aspect-[16/4]" value={value.posterImage} onChange={(next) => update("posterImage", next)} readOnly={readOnly} />
          <ThumbnailPicker label="Portrait" hint="2:3 vertical card" ratioClass="aspect-[2/3]" value={value.portraitImage} onChange={(next) => update("portraitImage", next)} readOnly={readOnly} />
          <ThumbnailPicker label="Landscape" hint="16:9 video card" ratioClass="aspect-video" value={value.landscapeImage} onChange={(next) => update("landscapeImage", next)} readOnly={readOnly} />
          <ThumbnailPicker label="Square" hint="1:1 music/podcast tile" ratioClass="aspect-square" value={value.squareImage} onChange={(next) => update("squareImage", next)} readOnly={readOnly} />
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-border pt-5">
        {!readOnly && <Button variant="secondary" type="button">Save Draft</Button>}
        <Button type="button" onClick={onSubmit} className="gradient-primary text-primary-foreground">{submitLabel}</Button>
      </div>
    </div>
  );
}
