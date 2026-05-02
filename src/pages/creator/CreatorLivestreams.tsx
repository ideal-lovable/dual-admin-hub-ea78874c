import { CreatorLayout } from "@/layouts/CreatorLayout";
import { Radio, Clock, CalendarDays, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const streams = [
  { id: 1, title: "Friday Night Live Shopping", status: "live", viewers: "1.2K", date: "Now" },
  { id: 2, title: "Product Showcase - Spring", status: "scheduled", viewers: "-", date: "Apr 4, 2026" },
  { id: 3, title: "Q&A with Fans", status: "scheduled", viewers: "-", date: "Apr 7, 2026" },
  { id: 4, title: "Unboxing Marathon", status: "completed", viewers: "3.4K", date: "Mar 28, 2026" },
  { id: 5, title: "Cooking Stream", status: "completed", viewers: "2.1K", date: "Mar 21, 2026" },
];

export default function CreatorLivestreams() {
  return (
    <CreatorLayout
      title="Livestreams"
      subtitle="View and manage your live content."
      breadcrumbs={[{ label: "Creator Studio", path: "/creator/dashboard" }, { label: "Content" }, { label: "Livestreams" }]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {streams.map(s => (
          <div key={s.id} className="rounded-xl border border-border bg-card p-5 hover:-translate-y-0.5 hover:shadow-elevated transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className={cn(
                "text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide flex items-center gap-1",
                s.status === "live" && "bg-destructive/15 text-destructive",
                s.status === "scheduled" && "bg-accent/15 text-accent",
                s.status === "completed" && "bg-secondary text-muted-foreground"
              )}>
                {s.status === "live" && <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />}
                {s.status}
              </span>
              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                {s.status === "live" ? <Clock className="h-3 w-3" /> : <CalendarDays className="h-3 w-3" />}
                {s.date}
              </span>
            </div>
            <div className="h-28 rounded-lg bg-secondary/40 flex items-center justify-center mb-3">
              <Radio className={cn("h-8 w-8", s.status === "live" ? "text-destructive" : "text-muted-foreground/30")} />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{s.title}</h3>
            {s.viewers !== "-" && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Eye className="h-3 w-3" /> {s.viewers} viewers
              </p>
            )}
          </div>
        ))}
      </div>
    </CreatorLayout>
  );
}
