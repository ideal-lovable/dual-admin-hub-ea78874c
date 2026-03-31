import { useState } from "react";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Mail, Zap, ClipboardList, AlertTriangle, Plus, Edit, Eye } from "lucide-react";
import { toast } from "sonner";

const emailTemplates = [
  { id: 1, name: "Welcome Email", trigger: "User signup", status: "active", lastSent: "2 min ago" },
  { id: 2, name: "Order Confirmation", trigger: "Order placed", status: "active", lastSent: "5 min ago" },
  { id: 3, name: "Content Approved", trigger: "Content approval", status: "active", lastSent: "1 hr ago" },
  { id: 4, name: "Account Suspended", trigger: "Admin action", status: "active", lastSent: "3 days ago" },
  { id: 5, name: "Payment Failed", trigger: "Payment failure", status: "inactive", lastSent: "N/A" },
];

const triggerRules = [
  { id: 1, name: "Auto-approve verified creators", condition: "User verified + 10+ videos", action: "Skip moderation queue", enabled: true },
  { id: 2, name: "Flag high-value refunds", condition: "Refund > $500", action: "Notify admin", enabled: true },
  { id: 3, name: "Suspend after 3 strikes", condition: "3 content flags", action: "Auto-suspend user", enabled: false },
  { id: 4, name: "Feature trending content", condition: "Views > 10K in 24h", action: "Add to trending", enabled: true },
];

const logs = [
  { id: 1, template: "Welcome Email", recipient: "jane@example.com", status: "delivered", time: "2 min ago" },
  { id: 2, template: "Order Confirmation", recipient: "mike@example.com", status: "delivered", time: "5 min ago" },
  { id: 3, template: "Payment Failed", recipient: "user@example.com", status: "failed", time: "1 hr ago" },
  { id: 4, template: "Content Approved", recipient: "creator@example.com", status: "delivered", time: "2 hr ago" },
];

export default function AdminAutomation() {
  const [showTemplate, setShowTemplate] = useState(false);

  return (
    <SuperAdminLayout
      title="Automation & Notifications"
      subtitle="Manage email templates, trigger rules, and delivery logs"
      breadcrumbs={[{ label: "Dashboard", path: "/admin/dashboard" }, { label: "Automation" }]}
    >
      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList className="bg-secondary border border-border">
          <TabsTrigger value="templates" className="gap-1.5"><Mail className="h-3.5 w-3.5" /> Email Templates</TabsTrigger>
          <TabsTrigger value="triggers" className="gap-1.5"><Zap className="h-3.5 w-3.5" /> Trigger Rules</TabsTrigger>
          <TabsTrigger value="logs" className="gap-1.5"><ClipboardList className="h-3.5 w-3.5" /> Delivery Logs</TabsTrigger>
          <TabsTrigger value="failed" className="gap-1.5"><AlertTriangle className="h-3.5 w-3.5" /> Failed</TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <div className="flex justify-end mb-4">
            <Button size="sm" className="gradient-primary text-primary-foreground gap-1.5" onClick={() => setShowTemplate(true)}>
              <Plus className="h-3.5 w-3.5" /> New Template
            </Button>
          </div>
          <div className="space-y-3">
            {emailTemplates.map(t => (
              <Card key={t.id} className="bg-card border-border">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">Trigger: {t.trigger} • Last sent: {t.lastSent}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={t.status === "active" ? "default" : "secondary"} className="text-xs">{t.status}</Badge>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setShowTemplate(true)}><Edit className="h-3.5 w-3.5" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="triggers">
          <div className="space-y-3">
            {triggerRules.map(r => (
              <Card key={r.id} className="bg-card border-border">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="h-4 w-4 text-accent" />
                    <div>
                      <p className="text-sm font-medium">{r.name}</p>
                      <p className="text-xs text-muted-foreground">If: {r.condition} → Then: {r.action}</p>
                    </div>
                  </div>
                  <Switch checked={r.enabled} onCheckedChange={() => toast.success("Rule toggled")} />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs">
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-xs">Template</TableHead>
                    <TableHead className="text-xs">Recipient</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map(l => (
                    <TableRow key={l.id} className="border-border">
                      <TableCell className="text-sm">{l.template}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{l.recipient}</TableCell>
                      <TableCell>
                        <Badge variant={l.status === "delivered" ? "default" : "destructive"} className="text-xs">{l.status}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{l.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="failed">
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-xs">Template</TableHead>
                    <TableHead className="text-xs">Recipient</TableHead>
                    <TableHead className="text-xs">Error</TableHead>
                    <TableHead className="text-xs">Time</TableHead>
                    <TableHead className="text-xs w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.filter(l => l.status === "failed").map(l => (
                    <TableRow key={l.id} className="border-border">
                      <TableCell className="text-sm">{l.template}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{l.recipient}</TableCell>
                      <TableCell className="text-xs text-destructive">SMTP timeout</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{l.time}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => toast.success("Retrying...")}>Retry</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showTemplate} onOpenChange={setShowTemplate}>
        <DialogContent>
          <DialogHeader><DialogTitle>Email Template</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Template Name</Label><Input className="mt-1.5" placeholder="e.g. Welcome Email" /></div>
            <div><Label>Subject Line</Label><Input className="mt-1.5" placeholder="Welcome to FVRD TV!" /></div>
            <div><Label>Body</Label><Textarea className="mt-1.5 min-h-[120px]" placeholder="Hi {{name}}, ..." /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTemplate(false)}>Cancel</Button>
            <Button className="gradient-primary text-primary-foreground" onClick={() => { toast.success("Template saved"); setShowTemplate(false); }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SuperAdminLayout>
  );
}
