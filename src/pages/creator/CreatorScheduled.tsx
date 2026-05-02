import { CreatorLayout } from "@/layouts/CreatorLayout";
import { CalendarDays, Clock, Radio, PlayCircle } from "lucide-react";

const scheduled = [
  { id: 1, title: "Product Showcase - Spring", type: "livestream", date: "Apr 4, 2026", time: "8:00 PM EST" },
  { id: 2, title: "Sneaker Review Ep. 12", type: "video", date: "Apr 5, 2026", time: "12:00 PM EST" },
  { id: 3, title: "Q&A with Fans", type: "livestream", date: "Apr 7, 2026", time: "6:00 PM EST" },
  { id: 4, title: "Summer Lookbook Teaser", type: "video", date: "Apr 10, 2026", time: "3:00 PM EST" },
];

export default function CreatorScheduled() {
  return (
    <CreatorLayout
      title="Scheduled Content"
      subtitle="Your upcoming releases and streams."
      breadcrumbs={[{ label: "Creator Studio", path: "/creator/dashboard" }, { label: "Content" }, { label: "Scheduled" }]}
    >
      {scheduled.length > 0 ? (
        <div className="space-y-3">
          {scheduled.map(item => (
            <div key={item.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:bg-secondary/20 transition-colors">
              <div className="h-11 w-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                {item.type === "livestream" ? <Radio className="h-5 w-5 text-accent" /> : <PlayCircle className="h-5 w-5 text-primary" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-medium text-foreground flex items-center gap-1 justify-end">
                  <CalendarDays className="h-3 w-3 text-muted-foreground" /> {item.date}
                </p>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1 justify-end">
                  <Clock className="h-3 w-3" /> {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 rounded-xl border border-border bg-card">
          <CalendarDays className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm font-medium text-muted-foreground">No scheduled content</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Schedule a video or livestream to see it here</p>
        </div>
      )}
    </CreatorLayout>
  );
}
