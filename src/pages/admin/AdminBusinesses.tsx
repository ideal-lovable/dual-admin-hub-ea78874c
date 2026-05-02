import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MoreHorizontal, Eye, Ban, CheckCircle, Store, Clock, Star, Tag, FileText, Package, Plus } from "lucide-react";
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
  category: string;
  featured: boolean;
}

const initialBusinesses: Business[] = [
  { id: 1, name: "TechStore Inc.", owner: "Mike Davis", status: "verified", products: 45, orders: 312, revenue: "$24,500", joined: "Oct 2025", category: "Electronics", featured: true },
  { id: 2, name: "FashionHub", owner: "Lisa Park", status: "active", products: 128, orders: 891, revenue: "$67,200", joined: "Sep 2025", category: "Fashion", featured: true },
  { id: 3, name: "HomeGoods Co.", owner: "Tom Wilson", status: "pending", products: 0, orders: 0, revenue: "$0", joined: "Jan 2026", category: "Home", featured: false },
  { id: 4, name: "SportZone", owner: "Amy Chen", status: "verified", products: 67, orders: 445, revenue: "$31,800", joined: "Nov 2025", category: "Sports", featured: false },
  { id: 5, name: "BeautyBox", owner: "Nina Lopez", status: "suspended", products: 23, orders: 89, revenue: "$5,400", joined: "Dec 2025", category: "Beauty", featured: false },
  { id: 6, name: "GadgetWorld", owner: "Sam Brown", status: "active", products: 89, orders: 234, revenue: "$18,900", joined: "Aug 2025", category: "Electronics", featured: true },
];

const storeCategories = [
  { name: "Fashion", count: 842, status: "active" },
  { name: "Electronics", count: 456, status: "active" },
  { name: "Beauty", count: 312, status: "active" },
  { name: "Home & Living", count: 228, status: "active" },
  { name: "Sports", count: 189, status: "active" },
  { name: "Food & Drink", count: 134, status: "draft" },
];

const pathToTab: Record<string, string> = {
  "/admin/storefronts": "all",
  "/admin/storefronts/pending": "pending",
  "/admin/storefronts/featured": "featured",
  "/admin/storefronts/categories": "categories",
  "/admin/storefronts/compliance": "compliance",
  "/admin/storefronts/products": "products",
  "/admin/storefronts/refunds": "refunds",
};

const tabToPath: Record<string, string> = {
  "all": "/admin/storefronts",
  "pending": "/admin/storefronts/pending",
  "featured": "/admin/storefronts/featured",
  "categories": "/admin/storefronts/categories",
  "compliance": "/admin/storefronts/compliance",
  "products": "/admin/storefronts/products",
  "refunds": "/admin/storefronts/refunds",
};

export default function AdminBusinesses() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = pathToTab[location.pathname] || "all";
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
    { key: "category" as const, label: "Category", render: (biz: Business) => <Badge variant="outline" className="text-xs">{biz.category}</Badge> },
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
    <SuperAdminLayout title="Storefront Management" subtitle="Oversee all business accounts and storefronts" breadcrumbs={[{ label: "Dashboard", path: "/admin/dashboard" }, { label: "Storefronts" }]}>
      <div className="space-y-6 animate-slide-up">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search storefronts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 bg-secondary border-border" />
        </div>
        <Tabs value={activeTab} onValueChange={(v) => navigate(tabToPath[v])}>
          <TabsList>
            <TabsTrigger value="all"><Store className="h-3.5 w-3.5 mr-1" />All ({filtered.length})</TabsTrigger>
            <TabsTrigger value="pending"><Clock className="h-3.5 w-3.5 mr-1" />Pending</TabsTrigger>
            <TabsTrigger value="featured"><Star className="h-3.5 w-3.5 mr-1" />Featured</TabsTrigger>
            <TabsTrigger value="categories"><Tag className="h-3.5 w-3.5 mr-1" />Categories</TabsTrigger>
            <TabsTrigger value="compliance"><FileText className="h-3.5 w-3.5 mr-1" />Compliance</TabsTrigger>
            <TabsTrigger value="products"><Package className="h-3.5 w-3.5 mr-1" />Products</TabsTrigger>
            <TabsTrigger value="refunds">Refunds</TabsTrigger>
          </TabsList>
          <TabsContent value="all"><DataTable columns={columns} data={filtered} /></TabsContent>
          <TabsContent value="pending"><DataTable columns={columns} data={filtered.filter(b => b.status === "pending")} emptyMessage="No pending storefronts" /></TabsContent>
          <TabsContent value="featured"><DataTable columns={columns} data={filtered.filter(b => b.featured)} emptyMessage="No featured storefronts" /></TabsContent>
          <TabsContent value="categories">
            <div className="flex justify-end mb-4">
              <Button size="sm" className="gradient-primary text-primary-foreground gap-1.5"><Plus className="h-3.5 w-3.5" /> Add Category</Button>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {storeCategories.map(c => (
                <Card key={c.name} className="bg-card border-border">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div><p className="text-sm font-medium">{c.name}</p><p className="text-xs text-muted-foreground">{c.count} stores</p></div>
                    <Badge variant={c.status === "active" ? "default" : "secondary"} className="text-xs">{c.status}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="compliance">
            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-sm">All storefronts are currently compliant with platform policies.</p>
                <p className="text-xs mt-1">Flagged compliance issues will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="products">
            <Card className="bg-card border-border">
              <CardHeader><CardTitle className="text-sm">Products & Inventory Overview</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {filtered.filter(b => b.products > 0).map(b => (
                  <div key={b.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <Package className="h-4 w-4 text-primary" />
                      <div><p className="text-sm font-medium">{b.name}</p><p className="text-xs text-muted-foreground">{b.products} products • {b.orders} orders</p></div>
                    </div>
                    <Button size="sm" variant="outline" className="h-7 text-xs">View Products</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="refunds">
            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center text-muted-foreground">
                <p className="text-sm">No pending refund or return requests.</p>
              </CardContent>
            </Card>
          </TabsContent>
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
    </SuperAdminLayout>
  );
}
