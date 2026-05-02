import { CreatorLayout } from "@/layouts/CreatorLayout";
import { CalendarDays, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreatorScheduleStream() {
  return (
    <CreatorLayout
      title="Schedule Stream"
      subtitle="Plan your upcoming livestreams."
      breadcrumbs={[{ label: "Creator Studio", path: "/creator/dashboard" }, { label: "Live Requests" }, { label: "Schedule" }]}
    >
      <div className="max-w-2xl">
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          <h2 className="text-sm font-semibold text-foreground">New Scheduled Stream</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Stream Title</label>
              <Input placeholder="Enter stream title..." className="h-9 text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Description</label>
              <Textarea placeholder="What's this stream about?" className="text-sm min-h-[80px]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" /> Date
                </label>
                <Input type="date" className="h-9 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Time
                </label>
                <Input type="time" className="h-9 text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Category</label>
              <Input placeholder="e.g. Shopping, Gaming, Music" className="h-9 text-sm" />
            </div>
          </div>
          <Button className="h-9 gap-1.5 gradient-primary text-primary-foreground">
            <Plus className="h-3.5 w-3.5" /> Schedule Stream
          </Button>
        </div>
      </div>
    </CreatorLayout>
  );
}
