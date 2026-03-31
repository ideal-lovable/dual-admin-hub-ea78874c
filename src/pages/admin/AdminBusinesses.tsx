import { AdminLayout } from "@/layouts/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MoreHorizontal, Eye, Ban, CheckCircle, Store } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Business {
  id: number;
  name: string;
  owner: string;
  status: "active" | "suspended" | "pending" | "verified";
  products: number;
  orders: number;
  revenue: string;
  joined: string;
}

const initialBusinesses: Business[] = [
  { id: 1, name: "TechStore Inc.", owner: "Mike Davis", status: "verified", products: 45, orders: 312, revenue: "$24,500", joined: "Oct 2025" },
  { id: 2, name: "FashionHub", owner: "Lisa Park", status: "active", products: 128, orders: 891, revenue: "$67,200", joined: "Sep 2025" },
  { id: 3, name: "HomeGoods Co.", owner: "Tom Wilson", status: "pending", products: 0, orders: 0, revenue: "$0", joined: "Jan 2026" },
  { id: 4, name: "SportZone", owner: "Amy Chen", status: "verified", products: 67, orders: 445, revenue: "$31,800", joined: "Nov 2025" },
  { id: 5, name: "BeautyBox", owner: "Nina Lopez", status: "suspended", products: 23, orders: 89, revenue: "$5,400", joined: "Dec 2025" },
  { id: 6, name: "GadgetWorld", owner: "Sam Brown", status: "active", products: 89, orders: 234, revenue: "$18,900", joined: "Aug 2025" },
];

export default function AdminBusinesses() {
  const [businesses, setBusinesses] = useState(initialBusinesses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBiz, setSelectedBiz] = useState<Business | null>(null);
  const [viewDialog, setViewDialog] = useState(false);

  const handleVerify = (biz: Business) => { setBusinesses(businesses.map(b => b.id === biz.id ? { ...b, status: "verified" } : b)); toast.success(`Verified: ${biz.name}`); };
  const handleSuspend = (biz: Business) => { setBusinesses(businesses.map(b => b.id === biz.id ? { ...b, status: b.status === "suspended" ? "active" : "suspended" } : b)); toast.success(`${biz.status === "suspended" ? "Unsuspended" : "Suspended"}: ${biz.name}`); };

  const columns = [
    {
      key: "name" as const, label: "Business",
      render: (biz: Business) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center"><Store className="h-5 w-5 text-accent" /></div>
          <div><p className="font-medium text-foreground">{biz.name}</p><p className="text-xs text-muted-foreground">Owner: {biz.owner}</p></div>
        </div>
      ),
    },
    { key: "status" as const, label: "Status", render: (biz: Business) => <StatusBadge status={biz.status as any} /> },
    { key: "products" as const, label: "Products" },
    { key: "orders" as const, label: "Orders" },
    { key: "revenue" as const, label: "Revenue" },
    {
      key: "id" as const, label: "Actions",
      render: (biz: Business) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => { setSelectedBiz(biz); setViewDialog(true); }}><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleVerify(biz)}><CheckCircle className="h-4 w-4 mr-2" />Verify</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSuspend(biz)} className="text-destructive"><Ban className="h-4 w-4 mr-2" />{biz.status === "suspended" ? "Unsuspend" : "Suspend"}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const filtered = businesses.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <AdminLayout type="admin" title="Business Management" subtitle="Oversee all business accounts and storefronts">
      <div className="space-y-6 animate-slide-up">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search businesses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 bg-secondary border-border" />
        </div>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All ({filtered.length})</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="suspended">Suspended</TabsTrigger>
          </TabsList>
          <TabsContent value="all"><DataTable columns={columns} data={filtered} /></TabsContent>
          <TabsContent value="verified"><DataTable columns={columns} data={filtered.filter(b => b.status === "verified")} /></TabsContent>
          <TabsContent value="pending"><DataTable columns={columns} data={filtered.filter(b => b.status === "pending")} /></TabsContent>
          <TabsContent value="suspended"><DataTable columns={columns} data={filtered.filter(b => b.status === "suspended")} /></TabsContent>
        </Tabs>
      </div>

      <Dialog open={viewDialog} onOpenChange={setViewDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Business Details</DialogTitle></DialogHeader>
          {selectedBiz && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-xl bg-accent/10 flex items-center justify-center"><Store className="h-8 w-8 text-accent" /></div>
                <div><h3 className="font-semibold text-foreground text-lg">{selectedBiz.name}</h3><p className="text-sm text-muted-foreground">Owner: {selectedBiz.owner}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-secondary/30"><p className="text-xs text-muted-foreground">Products</p><p className="text-lg font-bold text-foreground">{selectedBiz.products}</p></div>
                <div className="p-3 rounded-lg bg-secondary/30"><p className="text-xs text-muted-foreground">Orders</p><p className="text-lg font-bold text-foreground">{selectedBiz.orders}</p></div>
                <div className="p-3 rounded-lg bg-secondary/30"><p className="text-xs text-muted-foreground">Revenue</p><p className="text-lg font-bold text-foreground">{selectedBiz.revenue}</p></div>
                <div className="p-3 rounded-lg bg-secondary/30"><p className="text-xs text-muted-foreground">Joined</p><p className="text-lg font-bold text-foreground">{selectedBiz.joined}</p></div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setViewDialog(false)}>Close</Button>
            <Button onClick={() => { if (selectedBiz) handleVerify(selectedBiz); setViewDialog(false); }} className="gradient-primary text-primary-foreground">Verify Business</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
