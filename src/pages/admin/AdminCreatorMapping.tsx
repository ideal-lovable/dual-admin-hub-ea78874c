import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Lock, Package, Handshake, Plus, MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const accessControl = [
  { id: 1, creator: "Jane Doe", store: "Urban Fits", access: "full", products: 42, status: "active" },
  { id: 2, creator: "Mike Tech", store: "Tech Haven", access: "limited", products: 12, status: "active" },
  { id: 3, creator: "ChefAmy", store: "Kitchen Pro", access: "pending", products: 0, status: "pending" },
];
const partnerships = [
  { id: 1, creator: "Jane Doe", brand: "Urban Fits Co", type: "Ambassador", startDate: "2024-01-15", status: "active", revenue: "$12,400" },
  { id: 2, creator: "beats_live", brand: "SoundWave Audio", type: "Sponsored", startDate: "2024-03-01", status: "active", revenue: "$8,200" },
  { id: 3, creator: "ZenSarah", brand: "Zen Beauty", type: "Affiliate", startDate: "2024-04-10", status: "paused", revenue: "$3,100" },
];

const pathToTab: Record<string, string> = {
  "/admin/mapping/access": "access",
  "/admin/mapping/permissions": "permissions",
  "/admin/mapping/partnerships": "partnerships",
};
const tabToPath: Record<string, string> = {
  access: "/admin/mapping/access",
  permissions: "/admin/mapping/permissions",
  partnerships: "/admin/mapping/partnerships",
};

export default function AdminCreatorMapping() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = pathToTab[location.pathname] || "access";
  const [showGrant, setShowGrant] = useState(false);

  return (
    <SuperAdminLayout title="Creator–Business Mapping" subtitle="Manage creator access, product permissions, and brand partnerships" breadcrumbs={[{ label: "Dashboard", path: "/admin/dashboard" }, { label: "Creator–Business" }]}>
      <Tabs value={activeTab} onValueChange={(v) => navigate(tabToPath[v])} className="space-y-4">
        <TabsList className="bg-secondary border border-border">
          <TabsTrigger value="access" className="gap-1.5"><Lock className="h-3.5 w-3.5" /> Access Control</TabsTrigger>
          <TabsTrigger value="permissions" className="gap-1.5"><Package className="h-3.5 w-3.5" /> Product Permissions</TabsTrigger>
          <TabsTrigger value="partnerships" className="gap-1.5"><Handshake className="h-3.5 w-3.5" /> Brand Partnerships</TabsTrigger>
        </TabsList>

        <TabsContent value="access">
          <div className="flex justify-end mb-4"><Button size="sm" className="gradient-primary text-primary-foreground gap-1.5" onClick={() => setShowGrant(true)}><Plus className="h-3.5 w-3.5" /> Grant Access</Button></div>
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <Table>
                <TableHeader><TableRow className="border-border"><TableHead className="text-xs">Creator</TableHead><TableHead className="text-xs">Store</TableHead><TableHead className="text-xs">Access Level</TableHead><TableHead className="text-xs">Products</TableHead><TableHead className="text-xs">Status</TableHead><TableHead className="text-xs w-16"></TableHead></TableRow></TableHeader>
                <TableBody>
                  {accessControl.map(a => (
                    <TableRow key={a.id} className="border-border hover:bg-secondary/30">
                      <TableCell className="text-sm font-medium">{a.creator}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{a.store}</TableCell>
                      <TableCell><Badge variant="outline" className="text-xs">{a.access}</Badge></TableCell>
                      <TableCell className="text-sm">{a.products}</TableCell>
                      <TableCell><Badge variant={a.status === "active" ? "default" : "secondary"} className="text-xs">{a.status}</Badge></TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toast.success("Approved")}><CheckCircle className="h-3.5 w-3.5 mr-2" /> Approve</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => toast.success("Revoked")}><XCircle className="h-3.5 w-3.5 mr-2" /> Revoke</DropdownMenuItem>
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

        <TabsContent value="permissions">
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-sm">Product permission rules define which products creators can feature in their content.</p>
              <Button size="sm" className="mt-3 gradient-primary text-primary-foreground" onClick={() => toast.success("Permission rule created")}><Plus className="h-3.5 w-3.5 mr-1" /> Create Rule</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partnerships">
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <Table>
                <TableHeader><TableRow className="border-border"><TableHead className="text-xs">Creator</TableHead><TableHead className="text-xs">Brand</TableHead><TableHead className="text-xs">Type</TableHead><TableHead className="text-xs">Start Date</TableHead><TableHead className="text-xs">Revenue</TableHead><TableHead className="text-xs">Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  {partnerships.map(p => (
                    <TableRow key={p.id} className="border-border hover:bg-secondary/30">
                      <TableCell className="text-sm font-medium">{p.creator}</TableCell>
                      <TableCell className="text-sm">{p.brand}</TableCell>
                      <TableCell><Badge variant="outline" className="text-xs">{p.type}</Badge></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{p.startDate}</TableCell>
                      <TableCell className="text-sm font-medium">{p.revenue}</TableCell>
                      <TableCell><Badge variant={p.status === "active" ? "default" : "secondary"} className="text-xs">{p.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showGrant} onOpenChange={setShowGrant}>
        <DialogContent>
          <DialogHeader><DialogTitle>Grant Creator Access</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Creator</Label><Input className="mt-1.5" placeholder="Search creator..." /></div>
            <div><Label>Store</Label><Input className="mt-1.5" placeholder="Search store..." /></div>
            <div><Label>Access Level</Label><Input className="mt-1.5" placeholder="full / limited / read-only" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGrant(false)}>Cancel</Button>
            <Button className="gradient-primary text-primary-foreground" onClick={() => { toast.success("Access granted"); setShowGrant(false); }}>Grant Access</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SuperAdminLayout>
  );
}
