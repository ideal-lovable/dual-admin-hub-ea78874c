import { useState } from "react";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Radio, Clock, Calendar, AlertTriangle, Eye, Users } from "lucide-react";

const scheduledStreams = [
  { id: 1, title: "Summer Fashion Show", creator: "Jane Doe", date: "2024-06-05", time: "7:00 PM", status: "scheduled", viewers: 0, category: "Fashion" },
  { id: 2, title: "Tech Unboxing Marathon", creator: "Mike Tech", date: "2024-06-05", time: "8:00 PM", status: "scheduled", viewers: 0, category: "Tech" },
  { id: 3, title: "DJ Night Session", creator: "beats_live", date: "2024-06-06", time: "9:00 PM", status: "scheduled", viewers: 0, category: "Music" },
  { id: 4, title: "Cook Along: Thai Cuisine", creator: "ChefAmy", date: "2024-06-06", time: "6:00 PM", status: "scheduled", viewers: 0, category: "Food" },
];

const liveNow = [
  { id: 5, title: "Morning Yoga Flow", creator: "ZenSarah", viewers: 1420, duration: "1h 23m", category: "Fitness" },
  { id: 6, title: "Gaming: Final Boss", creator: "ProGamer42", viewers: 8900, duration: "3h 05m", category: "Gaming" },
  { id: 7, title: "Art & Chill", creator: "PaintQueen", viewers: 620, duration: "45m", category: "Art" },
];

const conflicts = [
  { streams: ["Summer Fashion Show", "Tech Unboxing Marathon"], date: "2024-06-05", time: "7:00 PM - 8:00 PM", overlap: "1 hour", severity: "low" },
];

const calendarDays = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const events = scheduledStreams.filter(s => s.date === `2024-06-${String(day).padStart(2, '0')}`);
  return { day, events, hasLive: day === 4 };
});

export default function AdminCalendar() {
  const [detail, setDetail] = useState<any>(null);

  return (
    <SuperAdminLayout
      title="Livestream Calendar"
      subtitle="View and manage scheduled livestreams"
      breadcrumbs={[{ label: "Dashboard", path: "/admin/dashboard" }, { label: "Livestream Calendar" }]}
    >
      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList className="bg-secondary border border-border">
          <TabsTrigger value="calendar" className="gap-1.5"><Calendar className="h-3.5 w-3.5" /> Calendar</TabsTrigger>
          <TabsTrigger value="live" className="gap-1.5"><Radio className="h-3.5 w-3.5 animate-pulse" /> Live Now ({liveNow.length})</TabsTrigger>
          <TabsTrigger value="scheduled" className="gap-1.5"><Clock className="h-3.5 w-3.5" /> Scheduled</TabsTrigger>
          <TabsTrigger value="conflicts" className="gap-1.5"><AlertTriangle className="h-3.5 w-3.5" /> Conflicts ({conflicts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">June 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                  <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {/* Offset for June 2024 starting on Saturday */}
                {Array.from({ length: 6 }, (_, i) => <div key={`empty-${i}`} />)}
                {calendarDays.map(({ day, events, hasLive }) => (
                  <div
                    key={day}
                    className={`min-h-[80px] rounded-lg border p-1.5 text-xs transition-colors ${
                      events.length > 0 ? "border-primary/30 bg-primary/5" : hasLive ? "border-accent/30 bg-accent/5" : "border-border bg-secondary/20"
                    } hover:bg-secondary/40 cursor-pointer`}
                    onClick={() => events.length > 0 && setDetail(events[0])}
                  >
                    <span className="font-medium text-foreground">{day}</span>
                    {events.map(e => (
                      <div key={e.id} className="mt-1 rounded bg-primary/20 px-1 py-0.5 text-[9px] text-primary truncate">
                        {e.title}
                      </div>
                    ))}
                    {hasLive && <div className="mt-1 rounded bg-accent/20 px-1 py-0.5 text-[9px] text-accent">● LIVE</div>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="live">
          <div className="grid gap-4 md:grid-cols-3">
            {liveNow.map((stream) => (
              <Card key={stream.id} className="bg-card border-border hover:border-accent/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Radio className="h-4 w-4 text-red-400 animate-pulse" />
                    <Badge variant="destructive" className="text-[9px]">LIVE</Badge>
                  </div>
                  <h3 className="font-medium text-sm mb-1">{stream.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">by {stream.creator}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {stream.viewers.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {stream.duration}</span>
                    <Badge variant="outline" className="text-[9px]">{stream.category}</Badge>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-3 text-xs" onClick={() => setDetail(stream)}>
                    <Eye className="h-3 w-3 mr-1" /> Monitor
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <div className="grid gap-3">
            {scheduledStreams.map((stream) => (
              <Card key={stream.id} className="bg-card border-border hover:bg-secondary/20 transition-colors cursor-pointer" onClick={() => setDetail(stream)}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">{stream.title}</h3>
                      <p className="text-xs text-muted-foreground">by {stream.creator}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{stream.date}</span>
                    <span>{stream.time}</span>
                    <Badge variant="outline" className="text-[9px]">{stream.category}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="conflicts">
          {conflicts.length > 0 ? (
            <div className="space-y-3">
              {conflicts.map((c, i) => (
                <Card key={i} className="bg-card border-orange-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400" />
                      <span className="text-sm font-medium">Schedule Overlap</span>
                      <Badge variant="outline" className="text-[9px] border-orange-500/30 text-orange-400">{c.severity}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      <span className="font-medium text-foreground">{c.streams.join(" & ")}</span> overlap on {c.date}
                    </p>
                    <p className="text-xs text-muted-foreground">Time: {c.time} • Overlap: {c.overlap}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center text-muted-foreground text-sm">No scheduling conflicts detected.</CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={!!detail} onOpenChange={() => setDetail(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{detail?.title}</DialogTitle></DialogHeader>
          {detail && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-xs text-muted-foreground">Creator</p><p className="font-medium">{detail.creator}</p></div>
                <div><p className="text-xs text-muted-foreground">Category</p><p>{detail.category}</p></div>
                {detail.date && <div><p className="text-xs text-muted-foreground">Date</p><p>{detail.date}</p></div>}
                {detail.time && <div><p className="text-xs text-muted-foreground">Time</p><p>{detail.time}</p></div>}
                {detail.viewers !== undefined && <div><p className="text-xs text-muted-foreground">Viewers</p><p>{detail.viewers.toLocaleString()}</p></div>}
                {detail.duration && <div><p className="text-xs text-muted-foreground">Duration</p><p>{detail.duration}</p></div>}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SuperAdminLayout>
  );
}
