import { useState } from "react";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Search, UserPlus, MoreHorizontal, Eye, Ban, Shield, Download, CheckCircle, XCircle, Filter } from "lucide-react";
import { toast } from "sonner";

const allUsers = [
  { id: "U001", name: "Jane Doe", email: "jane@example.com", role: "creator", status: "active", joined: "2024-01-15", verified: true },
  { id: "U002", name: "John Smith", email: "john@example.com", role: "subscriber", status: "active", joined: "2024-02-20", verified: true },
  { id: "U003", name: "Urban Fits Co", email: "info@urbanfits.com", role: "business", status: "pending", joined: "2024-03-10", verified: false },
  { id: "U004", name: "Sarah Wilson", email: "sarah@example.com", role: "publisher", status: "active", joined: "2024-01-25", verified: true },
  { id: "U005", name: "Mike Chen", email: "mike@example.com", role: "admin", status: "active", joined: "2023-11-01", verified: true },
  { id: "U006", name: "Bad Actor 99", email: "bad@example.com", role: "creator", status: "suspended", joined: "2024-04-05", verified: false },
  { id: "U007", name: "Tech Haven LLC", email: "hello@techhaven.com", role: "business", status: "flagged", joined: "2024-03-18", verified: false },
];

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showInvite, setShowInvite] = useState(false);
  const [showProfile, setShowProfile] = useState<typeof allUsers[0] | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const filtered = allUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const statusColor = (s: string) => {
    switch (s) {
      case "active": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "pending": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "suspended": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "flagged": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <SuperAdminLayout title="User Management" subtitle="Manage all platform users" breadcrumbs={[{ label: "Dashboard", path: "/admin/dashboard" }, { label: "Users" }]}>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-40 bg-secondary border-border"><Filter className="h-3.5 w-3.5 mr-2 text-muted-foreground" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="subscriber">Subscribers</SelectItem>
            <SelectItem value="creator">Creators</SelectItem>
            <SelectItem value="business">Businesses</SelectItem>
            <SelectItem value="publisher">Publishers</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
          </SelectContent>
        </Select>
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

      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="w-10"><input type="checkbox" className="rounded" onChange={(e) => setSelectedUsers(e.target.checked ? filtered.map(u => u.id) : [])} /></TableHead>
                <TableHead className="text-xs">User</TableHead>
                <TableHead className="text-xs">Role</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs">Verified</TableHead>
                <TableHead className="text-xs">Joined</TableHead>
                <TableHead className="text-xs w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
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
              <div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => { toast.success("Role updated"); setShowProfile(null); }}>Change Role</Button><Button size="sm" variant="destructive" onClick={() => { toast.success("Suspended"); setShowProfile(null); }}>Suspend</Button></div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SuperAdminLayout>
  );
}
