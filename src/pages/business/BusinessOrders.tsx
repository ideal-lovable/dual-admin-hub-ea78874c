import { useState } from "react";
import { BusinessLayout } from "@/layouts/BusinessLayout";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { ShoppingCart, Search, MoreHorizontal, Eye, Truck, Package, RefreshCw } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface Order {
  id: string; customer: string; email: string; items: number; total: string; date: string; status: "pending" | "approved" | "completed" | "rejected";
}

const initialOrders: Order[] = [
  { id: "#12350", customer: "Emma Wilson", email: "emma@email.com", items: 3, total: "$245.00", date: "Jan 9, 2026", status: "pending" },
  { id: "#12349", customer: "John Smith", email: "john@email.com", items: 2, total: "$124.99", date: "Jan 9, 2026", status: "pending" },
  { id: "#12348", customer: "Emily Davis", email: "emily@email.com", items: 1, total: "$89.50", date: "Jan 8, 2026", status: "approved" },
  { id: "#12347", customer: "Michael Chen", email: "michael@email.com", items: 3, total: "$245.00", date: "Jan 8, 2026", status: "approved" },
  { id: "#12346", customer: "Sarah Johnson", email: "sarah@email.com", items: 1, total: "$67.25", date: "Jan 7, 2026", status: "completed" },
  { id: "#12345", customer: "David Brown", email: "david@email.com", items: 2, total: "$178.00", date: "Jan 7, 2026", status: "completed" },
  { id: "#12344", customer: "Lisa Anderson", email: "lisa@email.com", items: 1, total: "$95.00", date: "Jan 6, 2026", status: "completed" },
  { id: "#12343", customer: "James Taylor", email: "james@email.com", items: 4, total: "$312.50", date: "Jan 5, 2026", status: "rejected" },
];

export default function BusinessOrders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isShipOpen, setIsShipOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isRefundOpen, setIsRefundOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleShip = () => {
    if (selectedOrder) {
      setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status: "approved" as const } : o));
      setIsShipOpen(false);
      toast.success(`Order ${selectedOrder.id} marked as shipped!`);
    }
  };

  const handleRefund = () => {
    if (selectedOrder) {
      setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status: "rejected" as const } : o));
      setIsRefundOpen(false);
      toast.success(`Refund processed for order ${selectedOrder.id}`);
    }
  };

  const filtered = searchQuery ? orders.filter(o => o.customer.toLowerCase().includes(searchQuery.toLowerCase()) || o.id.includes(searchQuery)) : orders;
  const pendingOrders = filtered.filter(o => o.status === "pending");
  const processingOrders = filtered.filter(o => o.status === "approved");
  const completedOrders = filtered.filter(o => o.status === "completed");

  const columns = [
    { key: "id", label: "Order ID", render: (item: Order) => <span className="font-medium text-foreground">{item.id}</span> },
    { key: "customer", label: "Customer", render: (item: Order) => (<div><p className="font-medium text-foreground">{item.customer}</p><p className="text-sm text-muted-foreground">{item.email}</p></div>) },
    { key: "items", label: "Items", render: (item: Order) => <span>{item.items} items</span> },
    { key: "total", label: "Total", render: (item: Order) => <span className="font-medium text-foreground">{item.total}</span> },
    { key: "date", label: "Date" },
    { key: "status", label: "Status", render: (item: Order) => <StatusBadge status={item.status} /> },
    { key: "actions", label: "", render: (item: Order) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-popover border-border">
          <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => { setSelectedOrder(item); setIsViewOpen(true); }}><Eye className="h-4 w-4" /> View Details</DropdownMenuItem>
          {item.status === "pending" && <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => { setSelectedOrder(item); setIsShipOpen(true); }}><Package className="h-4 w-4" /> Mark as Shipped</DropdownMenuItem>}
          {item.status === "approved" && <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => { setSelectedOrder(item); setIsTrackingOpen(true); }}><Truck className="h-4 w-4" /> Update Tracking</DropdownMenuItem>}
          <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => { setSelectedOrder(item); setIsRefundOpen(true); }}><RefreshCw className="h-4 w-4" /> Process Refund</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )},
  ];

  return (
    <BusinessLayout title="Orders" subtitle="Manage customer orders" breadcrumbs={[{ label: "Business", path: "/business/dashboard" }, { label: "Orders" }]}>
      <div className="space-y-6 animate-slide-up">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-card rounded-xl p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Pending</p><p className="text-2xl font-display font-bold text-foreground">{orders.filter(o => o.status === "pending").length}</p></div><div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center"><ShoppingCart className="h-5 w-5 text-warning" /></div></div></div>
          <div className="glass-card rounded-xl p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Processing</p><p className="text-2xl font-display font-bold text-foreground">{orders.filter(o => o.status === "approved").length}</p></div><div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center"><Truck className="h-5 w-5 text-accent" /></div></div></div>
          <div className="glass-card rounded-xl p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Completed</p><p className="text-2xl font-display font-bold text-foreground">{orders.filter(o => o.status === "completed").length}</p></div><div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center"><Package className="h-5 w-5 text-success" /></div></div></div>
          <div className="glass-card rounded-xl p-4"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Total Revenue</p><p className="text-2xl font-display font-bold text-foreground">$1,357</p></div><div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center"><span className="text-primary font-bold">$</span></div></div></div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary"><ShoppingCart className="h-4 w-4 text-primary" /><span className="text-sm font-medium">{orders.length} Total Orders</span></div>
          <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search orders..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-64 pl-10 bg-secondary border-border" /></div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-secondary border border-border">
            <TabsTrigger value="all">All Orders ({filtered.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
            <TabsTrigger value="processing">Processing ({processingOrders.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedOrders.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6"><DataTable columns={columns} data={filtered} /></TabsContent>
          <TabsContent value="pending" className="mt-6"><DataTable columns={columns} data={pendingOrders} emptyMessage="No pending orders" /></TabsContent>
          <TabsContent value="processing" className="mt-6"><DataTable columns={columns} data={processingOrders} emptyMessage="No orders in processing" /></TabsContent>
          <TabsContent value="completed" className="mt-6"><DataTable columns={columns} data={completedOrders} emptyMessage="No completed orders" /></TabsContent>
        </Tabs>
      </div>

      {/* View Order */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Order Details</DialogTitle></DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-muted-foreground">Order ID</p><p className="font-medium text-foreground">{selectedOrder.id}</p></div>
                <div><p className="text-sm text-muted-foreground">Status</p><StatusBadge status={selectedOrder.status} /></div>
                <div><p className="text-sm text-muted-foreground">Customer</p><p className="font-medium text-foreground">{selectedOrder.customer}</p></div>
                <div><p className="text-sm text-muted-foreground">Email</p><p className="font-medium text-foreground">{selectedOrder.email}</p></div>
                <div><p className="text-sm text-muted-foreground">Items</p><p className="font-medium text-foreground">{selectedOrder.items} items</p></div>
                <div><p className="text-sm text-muted-foreground">Total</p><p className="font-medium text-foreground">{selectedOrder.total}</p></div>
                <div><p className="text-sm text-muted-foreground">Date</p><p className="font-medium text-foreground">{selectedOrder.date}</p></div>
              </div>
            </div>
          )}
          <DialogFooter><DialogClose asChild><Button variant="secondary">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ship Confirmation */}
      <Dialog open={isShipOpen} onOpenChange={setIsShipOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Mark as Shipped</DialogTitle></DialogHeader>
          <div className="py-4 space-y-4">
            <p className="text-sm text-muted-foreground">Mark order {selectedOrder?.id} for {selectedOrder?.customer} as shipped?</p>
            <div><Label className="text-foreground">Tracking Number (optional)</Label><Input className="mt-2 bg-secondary border-border" placeholder="Enter tracking number..." /></div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
            <Button className="gradient-primary text-primary-foreground" onClick={handleShip}>Confirm Shipment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Tracking */}
      <Dialog open={isTrackingOpen} onOpenChange={setIsTrackingOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Update Tracking</DialogTitle></DialogHeader>
          <div className="py-4 space-y-4">
            <div><Label className="text-foreground">Tracking Number</Label><Input className="mt-2 bg-secondary border-border" placeholder="Enter tracking number..." /></div>
            <div><Label className="text-foreground">Carrier</Label><Input className="mt-2 bg-secondary border-border" placeholder="e.g., USPS, FedEx, UPS" /></div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
            <Button className="gradient-primary text-primary-foreground" onClick={() => { setIsTrackingOpen(false); toast.success("Tracking info updated!"); }}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Process Refund */}
      <Dialog open={isRefundOpen} onOpenChange={setIsRefundOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display text-destructive">Process Refund</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground py-4">Process a refund of {selectedOrder?.total} for order {selectedOrder?.id}? The customer will be notified via email.</p>
          <DialogFooter>
            <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
            <Button variant="destructive" onClick={handleRefund}>Process Refund</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </BusinessLayout>
  );
}
