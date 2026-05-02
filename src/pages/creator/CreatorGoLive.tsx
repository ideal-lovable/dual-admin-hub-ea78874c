import { CreatorLayout } from "@/layouts/CreatorLayout";
import { Radio, Video, Mic, Settings, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreatorGoLive() {
  return (
    <CreatorLayout
      title="Request Live"
      subtitle="Submit a livestream request for approval and RTMP credentials."
      breadcrumbs={[{ label: "Creator Studio", path: "/creator/dashboard" }, { label: "Live Requests" }, { label: "Request" }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Preview */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="aspect-video bg-secondary/40 flex flex-col items-center justify-center gap-3">
              <Monitor className="h-12 w-12 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">Camera preview will appear here</p>
            </div>
            <div className="flex items-center justify-between p-4 border-t border-border">
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs">
                  <Video className="h-3.5 w-3.5" /> Camera
                </Button>
                <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs">
                  <Mic className="h-3.5 w-3.5" /> Microphone
                </Button>
                <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs">
                  <Settings className="h-3.5 w-3.5" /> Settings
                </Button>
              </div>
              <Button size="sm" className="h-9 px-6 gap-1.5 bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold">
                <Radio className="h-4 w-4" /> Request Approval
              </Button>
            </div>
          </div>
        </div>

        {/* Stream Settings */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Stream Settings</h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Title</label>
              <Input placeholder="Enter stream title..." className="h-9 text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Description</label>
              <Textarea placeholder="Describe your stream..." className="text-sm min-h-[80px]" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Category</label>
              <Input placeholder="e.g. Shopping, Tech, Fashion" className="h-9 text-sm" />
            </div>
          </div>
        </div>
      </div>
    </CreatorLayout>
  );
}
