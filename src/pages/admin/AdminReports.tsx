import { AdminLayout } from "@/layouts/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Search, MoreHorizontal, AlertTriangle, CheckCircle, XCircle, Eye, Ban, MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Report {
  id: number;
  type: "content" | "user" | "business" | "copyright";
  subject: string;
  reportedBy: string;
  reason: string;
  status: "open" | "investigating" | "resolved" | "dismissed";
  severity: "low" | "medium" | "high" | "critical";
  date: string;
}

const initialReports: Report[] = [
  { id: 1, type: "content", subject: "Inappropriate video #4521", reportedBy: "user_42", reason: "Explicit content not marked", status: "open", severity: "high", date: "10 min ago" },
  { id: 2, type: "user", subject: "Spam account: spambot_99", reportedBy: "creator_12", reason: "Mass commenting spam links", status: "investigating", severity: "medium", date: "1 hour ago" },
  { id: 3, type: "copyright", subject: "Music in video #3892", reportedBy: "label_records", reason: "Unauthorized use of copyrighted music", status: "open", severity: "high", date: "3 hours ago" },
  { id: 4, type: "business", subject: "Fake products: SketchyShop", reportedBy: "buyer_88", reason: "Counterfeit items being sold", status: "open", severity: "critical", date: "5 hours ago" },
  { id: 5, type: "content", subject: "Misleading livestream title", reportedBy: "viewer_55", reason: "Clickbait/misleading content", status: "resolved", severity: "low", date: "1 day ago" },
  { id: 6, type: "user", subject: "Harassment by user_666", reportedBy: "creator_03", reason: "Targeted harassment in comments", status: "investigating", severity: "high", date: "2 days ago" },
];

const severityColors: Record<string, string> = { low: "bg-muted text-muted-foreground", medium: "bg-warning/20 text-warning", high: "bg-destructive/20 text-destructive", critical: "bg-destructive text-destructive-foreground" };
const statusColors: Record<string, string> = { open: "bg-primary/20 text-primary", investigating: "bg-warning/20 text-warning", resolved: "bg-success/20 text-success", dismissed: "bg-muted text-muted-foreground" };

export default function AdminReports() {
  const [reports, setReports] = useState(initialReports);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [detailDialog, setDetailDialog] = useState(false);
  const [responseDialog, setResponseDialog] = useState(false);
  const [responseText, setResponseText] = useState("");

  const handleResolve = (r: Report) => { setReports(reports.map(x => x.id === r.id ? { ...x, status: "resolved" } : x)); toast.success(`Resolved: ${r.subject}`); };
  const handleDismiss = (r: Report) => { setReports(reports.map(x => x.id === r.id ? { ...x, status: "dismissed" } : x)); toast.info(`Dismissed: ${r.subject}`); };
  const handleInvestigate = (r: Report) => { setReports(reports.map(x => x.id === r.id ? { ...x, status: "investigating" } : x)); toast.info(`Investigating: ${r.subject}`); };

  const columns = [
    {
      key: "subject" as const, label: "Report",
      render: (r: Report) => (<div><p className="font-medium text-foreground">{r.subject}</p><p className="text-xs text-muted-foreground capitalize">{r.type} report • by {r.reportedBy}</p></div>),
    },
    { key: "severity" as const, label: "Severity", render: (r: Report) => <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${severityColors[r.severity]}`}>{r.severity}</span> },
    { key: "status" as const, label: "Status", render: (r: Report) => <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusColors[r.status]}`}>{r.status}</span> },
    { key: "date" as const, label: "Date" },
    {
      key: "id" as const, label: "Actions",
      render: (r: Report) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => { setSelectedReport(r); setDetailDialog(true); }}><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleInvestigate(r)}><AlertTriangle className="h-4 w-4 mr-2" />Investigate</DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setSelectedReport(r); setResponseDialog(true); }}><MessageSquare className="h-4 w-4 mr-2" />Respond</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleResolve(r)}><CheckCircle className="h-4 w-4 mr-2" />Resolve</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDismiss(r)}><XCircle className="h-4 w-4 mr-2" />Dismiss</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={() => toast.success("User banned")}><Ban className="h-4 w-4 mr-2" />Ban User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const filtered = reports.filter(r => r.subject.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <AdminLayout type="admin" title="Reports & Flags" subtitle="Handle user reports, content flags, and copyright claims">
      <div className="space-y-6 animate-slide-up">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search reports..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 bg-secondary border-border" />
        </div>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All ({filtered.length})</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="investigating">Investigating</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          <TabsContent value="all"><DataTable columns={columns} data={filtered} /></TabsContent>
          <TabsContent value="open"><DataTable columns={columns} data={filtered.filter(r => r.status === "open")} /></TabsContent>
          <TabsContent value="investigating"><DataTable columns={columns} data={filtered.filter(r => r.status === "investigating")} /></TabsContent>
          <TabsContent value="resolved"><DataTable columns={columns} data={filtered.filter(r => r.status === "resolved" || r.status === "dismissed")} /></TabsContent>
        </Tabs>
      </div>

      <Dialog open={detailDialog} onOpenChange={setDetailDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Report Details</DialogTitle></DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/30">
                <h3 className="font-medium text-foreground mb-2">{selectedReport.subject}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-muted-foreground">Type: <span className="text-foreground capitalize">{selectedReport.type}</span></p>
                  <p className="text-muted-foreground">Severity: <span className={selectedReport.severity === "high" || selectedReport.severity === "critical" ? "text-destructive" : "text-foreground"}>{selectedReport.severity}</span></p>
                  <p className="text-muted-foreground">Reporter: <span className="text-foreground">{selectedReport.reportedBy}</span></p>
                  <p className="text-muted-foreground">Date: <span className="text-foreground">{selectedReport.date}</span></p>
                </div>
              </div>
              <div className="p-4 rounded-lg border border-border"><p className="text-xs text-muted-foreground mb-1">Reason</p><p className="text-sm text-foreground">{selectedReport.reason}</p></div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => { if (selectedReport) handleDismiss(selectedReport); setDetailDialog(false); }}>Dismiss</Button>
            <Button variant="destructive" onClick={() => { toast.success("User banned"); setDetailDialog(false); }}>Ban User</Button>
            <Button onClick={() => { if (selectedReport) handleResolve(selectedReport); setDetailDialog(false); }} className="gradient-primary text-primary-foreground">Resolve</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={responseDialog} onOpenChange={setResponseDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Send Response</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Responding to: <span className="text-foreground">{selectedReport?.reportedBy}</span></p>
            <Textarea placeholder="Type your response..." value={responseText} onChange={(e) => setResponseText(e.target.value)} className="bg-secondary border-border min-h-[120px]" />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setResponseDialog(false)}>Cancel</Button>
            <Button onClick={() => { toast.success("Response sent"); setResponseDialog(false); setResponseText(""); }} className="gradient-primary text-primary-foreground">Send Response</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
