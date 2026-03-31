import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Shield, UserCheck, ClipboardList, Settings, Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

const roles = [
  { id: 1, name: "Super Admin", permissions: "Full Access", users: 2, status: "active" },
  { id: 2, name: "Content Moderator", permissions: "Content, Users (read)", users: 5, status: "active" },
  { id: 3, name: "Commerce Manager", permissions: "Orders, Stores, Products", users: 3, status: "active" },
  { id: 4, name: "Analytics Viewer", permissions: "Analytics (read-only)", users: 8, status: "active" },
  { id: 5, name: "Support Agent", permissions: "Users, Reports", users: 12, status: "draft" },
];

const subAdmins = [
  { id: 1, name: "Mike Chen", email: "mike@fvrd.tv", role: "Super Admin", lastActive: "2 min ago", status: "active" },
  { id: 2, name: "Sarah Wilson", email: "sarah@fvrd.tv", role: "Content Moderator", lastActive: "1 hr ago", status: "active" },
  { id: 3, name: "Tom Davis", email: "tom@fvrd.tv", role: "Commerce Manager", lastActive: "3 hrs ago", status: "active" },
  { id: 4, name: "Amy Brooks", email: "amy@fvrd.tv", role: "Analytics Viewer", lastActive: "1 day ago", status: "inactive" },
];

const auditLogs = [
  { id: 1, admin: "Mike Chen", action: "Approved storefront 'Urban Fits'", category: "Storefronts", time: "2 min ago", ip: "192.168.1.1" },
  { id: 2, admin: "Sarah Wilson", action: "Rejected video #2841", category: "Content", time: "15 min ago", ip: "10.0.0.42" },
  { id: 3, admin: "Mike Chen", action: "Suspended user @bad_actor", category: "Users", time: "1 hr ago", ip: "192.168.1.1" },
  { id: 4, admin: "Tom Davis", action: "Processed refund ORD-1004", category: "Commerce", time: "2 hrs ago", ip: "172.16.0.5" },
  { id: 5, admin: "System", action: "Auto-approved 12 verified creator uploads", category: "Automation", time: "3 hrs ago", ip: "—" },
  { id: 6, admin: "Mike Chen", action: "Updated platform settings", category: "Settings", time: "5 hrs ago", ip: "192.168.1.1" },
];

const pathToTab: Record<string, string> = {
  "/admin/controls/roles": "roles",
  "/admin/controls/sub-admins": "sub-admins",
  "/admin/controls/audit": "audit",
  "/admin/controls/system": "system",
};

const tabToPath: Record<string, string> = {
  "roles": "/admin/controls/roles",
  "sub-admins": "/admin/controls/sub-admins",
  "audit": "/admin/controls/audit",
  "system": "/admin/controls/system",
};

export default function AdminControls() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = pathToTab[location.pathname] || "roles";
  const [showAddRole, setShowAddRole] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);

  return (
    <SuperAdminLayout
      title="Admin Controls"
      subtitle="Manage roles, permissions, sub-admins, and audit trails"
      breadcrumbs={[{ label: "Dashboard", path: "/admin/dashboard" }, { label: "Admin Controls" }]}
    >
      <Tabs value={activeTab} onValueChange={(v) => navigate(tabToPath[v])} className="space-y-4">
        <TabsList className="bg-secondary border border-border">
          <TabsTrigger value="roles" className="gap-1.5"><Shield className="h-3.5 w-3.5" /> Roles & Permissions</TabsTrigger>
          <TabsTrigger value="sub-admins" className="gap-1.5"><UserCheck className="h-3.5 w-3.5" /> Sub Admins</TabsTrigger>
          <TabsTrigger value="audit" className="gap-1.5"><ClipboardList className="h-3.5 w-3.5" /> Audit Logs</TabsTrigger>
          <TabsTrigger value="system" className="gap-1.5"><Settings className="h-3.5 w-3.5" /> System Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="roles">
          <div className="flex justify-end mb-4">
            <Button size="sm" className="gradient-primary text-primary-foreground gap-1.5" onClick={() => setShowAddRole(true)}>
              <Plus className="h-3.5 w-3.5" /> Create Role
            </Button>
          </div>
          <div className="grid gap-3">
            {roles.map(r => (
              <Card key={r.id} className="bg-card border-border">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.permissions} • {r.users} users</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={r.status === "active" ? "default" : "secondary"} className="text-xs">{r.status}</Badge>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => toast.success("Editing role")}><Edit className="h-3.5 w-3.5" /></Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => toast.success("Role removed")}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sub-admins">
          <div className="flex justify-end mb-4">
            <Button size="sm" className="gradient-primary text-primary-foreground gap-1.5" onClick={() => setShowAddAdmin(true)}>
              <Plus className="h-3.5 w-3.5" /> Invite Admin
            </Button>
          </div>
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-xs">Name</TableHead>
                    <TableHead className="text-xs">Email</TableHead>
                    <TableHead className="text-xs">Role</TableHead>
                    <TableHead className="text-xs">Last Active</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subAdmins.map(a => (
                    <TableRow key={a.id} className="border-border hover:bg-secondary/30">
                      <TableCell className="text-sm font-medium">{a.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{a.email}</TableCell>
                      <TableCell><Badge variant="outline" className="text-xs">{a.role}</Badge></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{a.lastActive}</TableCell>
                      <TableCell>
                        <Badge variant={a.status === "active" ? "default" : "secondary"} className="text-xs">{a.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toast.success("Editing admin")}>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => toast.success("Admin removed")}>Remove</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-xs">Admin</TableHead>
                    <TableHead className="text-xs">Action</TableHead>
                    <TableHead className="text-xs">Category</TableHead>
                    <TableHead className="text-xs">Time</TableHead>
                    <TableHead className="text-xs">IP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map(l => (
                    <TableRow key={l.id} className="border-border hover:bg-secondary/30">
                      <TableCell className="text-sm font-medium">{l.admin}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{l.action}</TableCell>
                      <TableCell><Badge variant="outline" className="text-xs">{l.category}</Badge></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{l.time}</TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">{l.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader><CardTitle className="text-sm">System Configuration</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">Require 2FA for Admins</p>
                    <p className="text-xs text-muted-foreground">All admin accounts must use two-factor authentication</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">Admin Session Timeout</p>
                    <p className="text-xs text-muted-foreground">Auto-logout after inactivity</p>
                  </div>
                  <Input type="number" defaultValue="60" className="w-24 bg-secondary border-border" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">IP Whitelisting</p>
                    <p className="text-xs text-muted-foreground">Restrict admin access to specific IPs</p>
                  </div>
                  <Switch />
                </div>
                <Button className="gradient-primary text-primary-foreground" onClick={() => toast.success("System settings saved")}>Save Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showAddRole} onOpenChange={setShowAddRole}>
        <DialogContent>
          <DialogHeader><DialogTitle>Create Role</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Role Name</Label><Input className="mt-1.5" placeholder="e.g. Content Moderator" /></div>
            <div><Label>Permissions</Label><Input className="mt-1.5" placeholder="e.g. Content, Users (read)" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddRole(false)}>Cancel</Button>
            <Button className="gradient-primary text-primary-foreground" onClick={() => { toast.success("Role created"); setShowAddRole(false); }}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddAdmin} onOpenChange={setShowAddAdmin}>
        <DialogContent>
          <DialogHeader><DialogTitle>Invite Admin</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Email</Label><Input className="mt-1.5" placeholder="admin@fvrd.tv" /></div>
            <div><Label>Role</Label><Input className="mt-1.5" placeholder="Select role..." /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddAdmin(false)}>Cancel</Button>
            <Button className="gradient-primary text-primary-foreground" onClick={() => { toast.success("Invite sent"); setShowAddAdmin(false); }}>Send Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SuperAdminLayout>
  );
}
