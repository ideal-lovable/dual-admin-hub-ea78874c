import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const libraryImages = [
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
];

interface ThumbnailPickerProps {
  label: string;
  hint: string;
  ratioClass: string;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

export function ThumbnailPicker({ label, hint, ratioClass, value, onChange, readOnly = false }: ThumbnailPickerProps) {
  return (
    <div className="rounded-xl border border-border bg-secondary/20 p-3 space-y-3">
      <div>
        <Label className="text-xs font-semibold text-foreground">{label}</Label>
        <p className="text-[11px] text-muted-foreground mt-0.5">{hint}</p>
      </div>

      <div className={cn("overflow-hidden rounded-lg border border-border bg-muted", ratioClass)}>
        {value ? (
          <img src={value} alt={`${label} preview`} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <ImagePlus className="h-6 w-6" />
          </div>
        )}
      </div>

      <Input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Paste image URL" className="h-8 bg-background text-xs" disabled={readOnly} />

      <div className="grid grid-cols-4 gap-1.5">
        {libraryImages.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => onChange(image)}
            disabled={readOnly}
            className="aspect-square overflow-hidden rounded-md border border-border hover:border-primary transition-colors"
          >
            <img src={image} alt="Library option" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <Button type="button" size="sm" variant="secondary" className="h-8 w-full text-xs" onClick={() => onChange(libraryImages[0])} disabled={readOnly}>
        <ImagePlus className="h-3.5 w-3.5 mr-1.5" /> Pick from library
      </Button>
    </div>
  );
}
