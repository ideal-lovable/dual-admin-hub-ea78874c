import { useState } from "react";
import { BusinessLayout } from "@/layouts/BusinessLayout";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Plus, Radio, Calendar, Clock, Package, Users, Eye, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface Livestream {
  id: number; title: string; date: string; time: string; duration?: string; viewers?: string; revenue?: string; products: number; status: "scheduled" | "live" | "completed";
}

const initialStreams: Livestream[] = [
  { id: 1, title: "Spring Collection Launch", date: "Jan 15, 2026", time: "2:00 PM", products: 15, status: "scheduled" },
  { id: 2, title: "Flash Sale Friday", date: "Jan 17, 2026", time: "12:00 PM", products: 8, status: "scheduled" },
  { id: 3, title: "New Arrivals Showcase", date: "Jan 12, 2026", time: "3:00 PM", duration: "1h 30min", viewers: "2.8K", revenue: "$1,250", products: 12, status: "completed" },
  { id: 4, title: "Customer Q&A + Deals", date: "Jan 10, 2026", time: "4:00 PM", duration: "45 min", viewers: "1.5K", revenue: "$680", products: 6, status: "completed" },
  { id: 5, title: "Winter Clearance Sale", date: "Jan 8, 2026", time: "2:00 PM", duration: "2h", viewers: "4.2K", revenue: "$3,450", products: 20, status: "completed" },
];

export default function BusinessLivestreams() {
  const [streams, setStreams] = useState<Livestream[]>(initialStreams);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isGoLiveOpen, setIsGoLiveOpen] = useState(false);
  const [isReplayOpen, setIsReplayOpen] = useState(false);
  const [selectedStream, setSelectedStream] = useState<Livestream | null>(null);
  const [newStream, setNewStream] = useState({ title: "", date: "", time: "", products: 0 });

  const scheduled = streams.filter(l => l.status === "scheduled");
  const completed = streams.filter(l => l.status === "completed");
  const totalRevenue = completed.reduce((sum, l) => sum + parseFloat(l.revenue?.replace(/[$,]/g, '') || '0'), 0);

  const handleSchedule = () => {
    const stream: Livestream = { id: Date.now(), title: newStream.title, date: newStream.date || "TBD", time: newStream.time || "TBD", products: newStream.products, status: "scheduled" };
    setStreams([stream, ...streams]);
    setIsScheduleOpen(false);
    setNewStream({ title: "", date: "", time: "", products: 0 });
    toast.success("Live shopping event scheduled!");
  };

  const handleEdit = () => {
    if (selectedStream) { setStreams(streams.map(s => s.id === selectedStream.id ? selectedStream : s)); setIsEditOpen(false); toast.success("Livestream updated."); }
  };

  const handleGoLive = () => {
    if (selectedStream) { setIsGoLiveOpen(false); toast.success("Live request submitted for admin approval."); }
  };

  const renderCard = (stream: Livestream) => {
    const isScheduled = stream.status === "scheduled";
    return (
      <div key={stream.id} className="glass-card rounded-xl p-6 hover:shadow-elevated transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${stream.status === "live" ? "gradient-primary animate-pulse-glow" : "bg-primary/10"}`}>
            <Radio className={`h-5 w-5 ${stream.status === "live" ? "text-primary-foreground" : "text-primary"}`} />
          </div>
          <StatusBadge status={stream.status} />
        </div>
        <h3 className="font-display font-semibold text-foreground mb-3">{stream.title}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Calendar className="h-4 w-4" /><span>{stream.date}</span></div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4" /><span>{isScheduled ? `Starts at ${stream.time}` : stream.duration}</span></div>
          <div className="flex items-center gap-2 text-sm text-primary"><Package className="h-4 w-4" /><span>{stream.products} products</span></div>
          {stream.viewers && <div className="flex items-center gap-2 text-sm text-muted-foreground"><Users className="h-4 w-4" /><span>{stream.viewers} viewers</span></div>}
          {stream.revenue && <div className="flex items-center gap-2 text-sm text-success"><DollarSign className="h-4 w-4" /><span>{stream.revenue} revenue</span></div>}
        </div>
        <div className="flex gap-2">
          {isScheduled ? (
            <>
              <Button size="sm" variant="secondary" className="flex-1" onClick={() => { setSelectedStream({ ...stream }); setIsEditOpen(true); }}>Edit</Button>
              <Button size="sm" className="flex-1 gradient-primary text-primary-foreground" onClick={() => { setSelectedStream(stream); setIsGoLiveOpen(true); }}><Radio className="h-4 w-4 mr-1" /> Request Live</Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="secondary" className="flex-1" onClick={() => { setSelectedStream(stream); setIsReplayOpen(true); }}><Eye className="h-4 w-4 mr-1" /> Replay</Button>
              <Button size="sm" variant="secondary" className="flex-1" onClick={() => toast.info(`${stream.title}: ${stream.viewers} viewers, ${stream.revenue} revenue`)}>Analytics</Button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <BusinessLayout title="Livestreams" subtitle="Manage live shopping events" breadcrumbs={[{ label: "Business", path: "/business/dashboard" }, { label: "Livestreams" }]}>
      <div className="space-y-6 animate-slide-up">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card rounded-xl p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Scheduled</p><p className="text-2xl font-display font-bold text-foreground">{scheduled.length}</p></div><div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center"><Calendar className="h-5 w-5 text-accent" /></div></div></div>
          <div className="glass-card rounded-xl p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Completed</p><p className="text-2xl font-display font-bold text-foreground">{completed.length}</p></div><div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center"><Radio className="h-5 w-5 text-success" /></div></div></div>
          <div className="glass-card rounded-xl p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Total Revenue</p><p className="text-2xl font-display font-bold text-foreground">${totalRevenue.toLocaleString()}</p></div><div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center"><DollarSign className="h-5 w-5 text-primary" /></div></div></div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary"><Radio className="h-4 w-4 text-primary" /><span className="text-sm font-medium">{streams.length} Total Streams</span></div>
          <Button className="gradient-primary text-primary-foreground gap-2" onClick={() => setIsScheduleOpen(true)}><Plus className="h-4 w-4" /> Schedule Livestream</Button>
        </div>

        <Tabs defaultValue="scheduled" className="w-full">
          <TabsList className="bg-secondary border border-border"><TabsTrigger value="scheduled">Scheduled ({scheduled.length})</TabsTrigger><TabsTrigger value="completed">Past Streams ({completed.length})</TabsTrigger></TabsList>
          <TabsContent value="scheduled" className="mt-6">
            {scheduled.length === 0 ? (
              <div className="glass-card rounded-xl p-12 text-center"><Radio className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><h3 className="font-display text-lg font-semibold text-foreground mb-2">No Scheduled Livestreams</h3><p className="text-muted-foreground mb-4">Schedule your next live shopping event</p><Button className="gradient-primary text-primary-foreground" onClick={() => setIsScheduleOpen(true)}><Plus className="h-4 w-4 mr-2" /> Schedule Now</Button></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{scheduled.map(renderCard)}</div>
            )}
          </TabsContent>
          <TabsContent value="completed" className="mt-6"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{completed.map(renderCard)}</div></TabsContent>
        </Tabs>
      </div>

      {/* Schedule Dialog */}
      <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Schedule Live Shopping Event</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div><Label className="text-foreground">Event Title</Label><Input value={newStream.title} onChange={(e) => setNewStream({ ...newStream, title: e.target.value })} className="mt-2 bg-secondary border-border" placeholder="Enter event title..." /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-foreground">Date</Label><Input type="date" value={newStream.date} onChange={(e) => setNewStream({ ...newStream, date: e.target.value })} className="mt-2 bg-secondary border-border" /></div>
              <div><Label className="text-foreground">Time</Label><Input type="time" value={newStream.time} onChange={(e) => setNewStream({ ...newStream, time: e.target.value })} className="mt-2 bg-secondary border-border" /></div>
            </div>
            <div><Label className="text-foreground">Number of Products</Label><Input type="number" min={0} value={newStream.products} onChange={(e) => setNewStream({ ...newStream, products: parseInt(e.target.value) || 0 })} className="mt-2 bg-secondary border-border" /></div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
            <Button className="gradient-primary text-primary-foreground" onClick={handleSchedule} disabled={!newStream.title}>Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Edit Livestream</DialogTitle></DialogHeader>
          {selectedStream && (
            <div className="space-y-4 py-4">
              <div><Label className="text-foreground">Title</Label><Input value={selectedStream.title} onChange={(e) => setSelectedStream({ ...selectedStream, title: e.target.value })} className="mt-2 bg-secondary border-border" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-foreground">Date</Label><Input value={selectedStream.date} onChange={(e) => setSelectedStream({ ...selectedStream, date: e.target.value })} className="mt-2 bg-secondary border-border" /></div>
                <div><Label className="text-foreground">Time</Label><Input value={selectedStream.time} onChange={(e) => setSelectedStream({ ...selectedStream, time: e.target.value })} className="mt-2 bg-secondary border-border" /></div>
              </div>
              <div><Label className="text-foreground">Products</Label><Input type="number" min={0} value={selectedStream.products} onChange={(e) => setSelectedStream({ ...selectedStream, products: parseInt(e.target.value) || 0 })} className="mt-2 bg-secondary border-border" /></div>
            </div>
          )}
          <DialogFooter><DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose><Button className="gradient-primary text-primary-foreground" onClick={handleEdit}>Save Changes</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Go Live Confirmation */}
      <Dialog open={isGoLiveOpen} onOpenChange={setIsGoLiveOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Request Live Approval?</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground py-4">Submit "<span className="text-foreground font-medium">{selectedStream?.title}</span>" for approval and RTMP credentials?</p>
          <DialogFooter><DialogClose asChild><Button variant="secondary">Not Yet</Button></DialogClose><Button className="gradient-primary text-primary-foreground gap-2" onClick={handleGoLive}><Radio className="h-4 w-4" /> Request Approval</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Replay Dialog */}
      <Dialog open={isReplayOpen} onOpenChange={setIsReplayOpen}>
        <DialogContent className="bg-card border-border sm:max-w-lg">
          <DialogHeader><DialogTitle className="font-display">Stream Replay</DialogTitle></DialogHeader>
          {selectedStream && (
            <div className="space-y-4 py-4">
              <div className="aspect-video rounded-xl bg-secondary flex items-center justify-center"><Radio className="h-16 w-16 text-muted-foreground/30" /></div>
              <h3 className="font-display text-lg font-semibold text-foreground">{selectedStream.title}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-muted-foreground">Duration</p><p className="font-medium text-foreground">{selectedStream.duration}</p></div>
                <div><p className="text-sm text-muted-foreground">Viewers</p><p className="font-medium text-foreground">{selectedStream.viewers}</p></div>
                <div><p className="text-sm text-muted-foreground">Revenue</p><p className="font-medium text-success">{selectedStream.revenue}</p></div>
                <div><p className="text-sm text-muted-foreground">Products</p><p className="font-medium text-foreground">{selectedStream.products}</p></div>
              </div>
            </div>
          )}
          <DialogFooter><DialogClose asChild><Button variant="secondary">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>
    </BusinessLayout>
  );
}
