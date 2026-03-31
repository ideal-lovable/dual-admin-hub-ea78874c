import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Search, UserPlus, MoreHorizontal, Eye, Ban, Shield, Download, CheckCircle, XCircle, Users, Heart, Star, Store, Megaphone, UserX, FileText, ClipboardList, Flag } from "lucide-react";
import { toast } from "sonner";

const allUsers = [
  { id: "U001", name: "Jane Doe", email: "jane@example.com", role: "creator", status: "active", joined: "2024-01-15", verified: true },
  { id: "U002", name: "John Smith", email: "john@example.com", role: "subscriber", status: "active", joined: "2024-02-20", verified: true },
  { id: "U003", name: "Urban Fits Co", email: "info@urbanfits.com", role: "business", status: "pending", joined: "2024-03-10", verified: false },
  { id: "U004", name: "Sarah Wilson", email: "sarah@example.com", role: "publisher", status: "active", joined: "2024-01-25", verified: true },
  { id: "U005", name: "Mike Chen", email: "mike@example.com", role: "admin", status: "active", joined: "2023-11-01", verified: true },
  { id: "U006", name: "Bad Actor 99", email: "bad@example.com", role: "creator", status: "suspended", joined: "2024-04-05", verified: false },
  { id: "U007", name: "Tech Haven LLC", email: "hello@techhaven.com", role: "business", status: "flagged", joined: "2024-03-18", verified: false },
  { id: "U008", name: "Amy Brooks", email: "amy@example.com", role: "subscriber", status: "active", joined: "2024-05-01", verified: true },
  { id: "U009", name: "Creator Pro", email: "pro@example.com", role: "creator", status: "active", joined: "2024-02-10", verified: true },
  { id: "U010", name: "News Daily", email: "news@example.com", role: "publisher", status: "pending", joined: "2024-06-01", verified: false },
];

const pathToTab: Record<string, string> = {
  "/admin/users": "all",
  "/admin/users/subscribers": "subscriber",
  "/admin/users/creators": "creator",
  "/admin/users/businesses": "business",
  "/admin/users/publishers": "publisher",
  "/admin/users/admins": "admin",
  "/admin/users/suspended": "suspended",
  "/admin/users/verification": "verification",
  "/admin/users/logs": "logs",
  "/admin/users/reports": "reports",
};
const tabToPath: Record<string, string> = {
  all: "/admin/users",
  subscriber: "/admin/users/subscribers",
  creator: "/admin/users/creators",
  business: "/admin/users/businesses",
  publisher: "/admin/users/publishers",
  admin: "/admin/users/admins",
  suspended: "/admin/users/suspended",
  verification: "/admin/users/verification",
  logs: "/admin/users/logs",
  reports: "/admin/users/reports",
};

export default function AdminUsers() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = pathToTab[location.pathname] || "all";
  const [search, setSearch] = useState("");
  const [showInvite, setShowInvite] = useState(false);
  const [showProfile, setShowProfile] = useState<typeof allUsers[0] | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const statusColor = (s: string) => {
    switch (s) {
      case "active": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "pending": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "suspended": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "flagged": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getFilteredUsers = () => {
    let users = allUsers.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    );
    if (activeTab !== "all" && activeTab !== "suspended" && activeTab !== "verification" && activeTab !== "logs" && activeTab !== "reports") {
      users = users.filter(u => u.role === activeTab);
    }
    if (activeTab === "suspended") {
      users = users.filter(u => u.status === "suspended" || u.status === "flagged");
    }
    return users;
  };

  const filtered = getFilteredUsers();

  const renderUserTable = (users: typeof allUsers) => (
    <Card className="bg-card border-border">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-10"><input type="checkbox" className="rounded" onChange={(e) => setSelectedUsers(e.target.checked ? users.map(u => u.id) : [])} /></TableHead>
              <TableHead className="text-xs">User</TableHead>
              <TableHead className="text-xs">Role</TableHead>
              <TableHead className="text-xs">Status</TableHead>
              <TableHead className="text-xs">Verified</TableHead>
              <TableHead className="text-xs">Joined</TableHead>
              <TableHead className="text-xs w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="h-32 text-center text-muted-foreground">No users found</TableCell></TableRow>
            ) : users.map(user => (
              <TableRow key={user.id} className="border-border hover:bg-secondary/30">
                <TableCell><input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => setSelectedUsers(prev => prev.includes(user.id) ? prev.filter(x => x !== user.id) : [...prev, user.id])} className="rounded" /></TableCell>
                <TableCell><p className="text-sm font-medium">{user.name}</p><p className="text-xs text-muted-foreground">{user.email}</p></TableCell>
                <TableCell><Badge variant="outline" className="text-xs capitalize">{user.role}</Badge></TableCell>
                <TableCell><span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusColor(user.status)}`}>{user.status}</span></TableCell>
                <TableCell>{user.verified ? <CheckCircle className="h-4 w-4 text-green-400" /> : <XCircle className="h-4 w-4 text-muted-foreground" />}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{user.joined}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setShowProfile(user)}><Eye className="h-3.5 w-3.5 mr-2" /> View</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.success("Role updated")}><Shield className="h-3.5 w-3.5 mr-2" /> Change Role</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => toast.success("Suspended")}><Ban className="h-3.5 w-3.5 mr-2" /> Suspend</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <SuperAdminLayout title="User Management" subtitle="Manage all platform users" breadcrumbs={[{ label: "Dashboard", path: "/admin/dashboard" }, { label: "Users" }]}>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
        </div>
        {selectedUsers.length > 0 && (
          <Button size="sm" variant="destructive" className="h-8 text-xs" onClick={() => { toast.success(`${selectedUsers.length} users suspended`); setSelectedUsers([]); }}>
            <Ban className="h-3.5 w-3.5 mr-1" /> Suspend ({selectedUsers.length})
          </Button>
        )}
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 text-xs gap-1.5" onClick={() => toast.success("Exported")}><Download className="h-3.5 w-3.5" /> Export</Button>
          <Button size="sm" className="h-8 text-xs gap-1.5 gradient-primary text-primary-foreground" onClick={() => setShowInvite(true)}><UserPlus className="h-3.5 w-3.5" /> Add User</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => navigate(tabToPath[v])}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="all"><Users className="h-3.5 w-3.5 mr-1" />All</TabsTrigger>
          <TabsTrigger value="subscriber"><Heart className="h-3.5 w-3.5 mr-1" />Subscribers</TabsTrigger>
          <TabsTrigger value="creator"><Star className="h-3.5 w-3.5 mr-1" />Creators</TabsTrigger>
          <TabsTrigger value="business"><Store className="h-3.5 w-3.5 mr-1" />Businesses</TabsTrigger>
          <TabsTrigger value="publisher"><Megaphone className="h-3.5 w-3.5 mr-1" />Publishers</TabsTrigger>
          <TabsTrigger value="admin"><Shield className="h-3.5 w-3.5 mr-1" />Admins</TabsTrigger>
          <TabsTrigger value="suspended"><UserX className="h-3.5 w-3.5 mr-1" />Flagged</TabsTrigger>
          <TabsTrigger value="verification"><CheckCircle className="h-3.5 w-3.5 mr-1" />Verification</TabsTrigger>
          <TabsTrigger value="logs"><ClipboardList className="h-3.5 w-3.5 mr-1" />Logs</TabsTrigger>
          <TabsTrigger value="reports"><Flag className="h-3.5 w-3.5 mr-1" />Reports</TabsTrigger>
        </TabsList>

        {["all", "subscriber", "creator", "business", "publisher", "admin", "suspended"].map(tab => (
          <TabsContent key={tab} value={tab}>{renderUserTable(filtered)}</TabsContent>
        ))}

        <TabsContent value="verification">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold mb-4">Pending Verification Requests</h3>
              <div className="space-y-3">
                {allUsers.filter(u => !u.verified).map(u => (
                  <div key={u.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <div><p className="text-sm font-medium">{u.name}</p><p className="text-xs text-muted-foreground">{u.email} • {u.role}</p></div>
                    <div className="flex gap-2">
                      <Button size="sm" className="h-7 text-xs gradient-primary text-primary-foreground" onClick={() => toast.success("Verified!")}><CheckCircle className="h-3 w-3 mr-1" /> Verify</Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => toast.success("Rejected")}><XCircle className="h-3 w-3 mr-1" /> Reject</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold mb-4">User Activity Logs</h3>
              <div className="space-y-2">
                {[
                  { user: "Jane Doe", action: "Uploaded new video", time: "2 min ago" },
                  { user: "Mike Chen", action: "Changed role settings", time: "15 min ago" },
                  { user: "Bad Actor 99", action: "Account suspended", time: "1 hr ago" },
                  { user: "Urban Fits Co", action: "Submitted for verification", time: "2 hrs ago" },
                  { user: "John Smith", action: "Updated profile", time: "5 hrs ago" },
                ].map((l, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded text-sm border-b border-border last:border-0">
                    <div><span className="font-medium">{l.user}</span> <span className="text-muted-foreground">{l.action}</span></div>
                    <span className="text-xs text-muted-foreground">{l.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold mb-4">User Reports & Flags</h3>
              <div className="space-y-3">
                {[
                  { reporter: "John Smith", target: "Bad Actor 99", reason: "Spam content", time: "1 hr ago", severity: "high" },
                  { reporter: "Amy Brooks", target: "Tech Haven LLC", reason: "Misleading products", time: "3 hrs ago", severity: "medium" },
                ].map((r, i) => (
                  <div key={i} className="p-3 rounded-lg bg-secondary/30 flex items-center justify-between">
                    <div>
                      <p className="text-sm"><span className="font-medium">{r.reporter}</span> reported <span className="font-medium text-destructive">{r.target}</span></p>
                      <p className="text-xs text-muted-foreground">{r.reason} • {r.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={r.severity === "high" ? "destructive" : "secondary"} className="text-xs">{r.severity}</Badge>
                      <Button size="sm" variant="outline" className="h-7 text-xs">Review</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showInvite} onOpenChange={setShowInvite}>
        <DialogContent>
          <DialogHeader><DialogTitle>Invite User</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Email</Label><Input placeholder="user@example.com" className="mt-1.5" /></div>
            <div><Label>Role</Label><Select defaultValue="subscriber"><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="subscriber">Subscriber</SelectItem><SelectItem value="creator">Creator</SelectItem><SelectItem value="business">Business</SelectItem><SelectItem value="publisher">Publisher</SelectItem><SelectItem value="admin">Admin</SelectItem></SelectContent></Select></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowInvite(false)}>Cancel</Button><Button className="gradient-primary text-primary-foreground" onClick={() => { toast.success("Invite sent!"); setShowInvite(false); }}>Send Invite</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!showProfile} onOpenChange={() => setShowProfile(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>User Profile</DialogTitle></DialogHeader>
          {showProfile && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-muted-foreground text-xs">Name</p><p className="font-medium">{showProfile.name}</p></div>
                <div><p className="text-muted-foreground text-xs">Email</p><p className="font-medium">{showProfile.email}</p></div>
                <div><p className="text-muted-foreground text-xs">Role</p><Badge variant="outline" className="capitalize">{showProfile.role}</Badge></div>
                <div><p className="text-muted-foreground text-xs">Status</p><span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusColor(showProfile.status)}`}>{showProfile.status}</span></div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => { toast.success("Role updated"); setShowProfile(null); }}>Change Role</Button>
                <Button size="sm" variant="destructive" onClick={() => { toast.success("Suspended"); setShowProfile(null); }}>Suspend</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SuperAdminLayout>
  );
}
