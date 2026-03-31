import { useState } from "react";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ShoppingCart, Search, MoreHorizontal, Eye, DollarSign, Package, Truck } from "lucide-react";
import { toast } from "sonner";

const orders = [
  { id: "ORD-1001", customer: "Jane Doe", store: "Tech Haven", items: 3, total: "$299.99", status: "processing", date: "2024-06-03", payment: "paid" },
  { id: "ORD-1002", customer: "Mike Chen", store: "Urban Fits", items: 1, total: "$89.99", status: "shipped", date: "2024-06-02", payment: "paid" },
  { id: "ORD-1003", customer: "Amy Brooks", store: "Zen Beauty", items: 5, total: "$156.50", status: "delivered", date: "2024-05-28", payment: "paid" },
  { id: "ORD-1004", customer: "User #44012", store: "Sneaker World", items: 2, total: "$420.00", status: "refund_requested", date: "2024-06-01", payment: "disputed" },
  { id: "ORD-1005", customer: "Lisa Wang", store: "Home Vibes", items: 1, total: "$34.99", status: "cancelled", date: "2024-06-03", payment: "refunded" },
];

export default function AdminCommerceOrders() {
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState<typeof orders[0] | null>(null);

  const filtered = orders.filter(o => o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()));

  const statusColor = (s: string) => {
    switch (s) {
      case "processing": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "shipped": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "delivered": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "refund_requested": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "cancelled": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <SuperAdminLayout
      title="Commerce & Orders"
      subtitle="Manage orders, transactions, and refunds"
      breadcrumbs={[{ label: "Dashboard", path: "/admin/dashboard" }, { label: "Commerce" }, { label: "Orders" }]}
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Orders", value: "22,100", icon: ShoppingCart },
          { label: "Revenue (MTD)", value: "$892,450", icon: DollarSign },
          { label: "Pending Refunds", value: "42", icon: Package },
          { label: "In Transit", value: "1,205", icon: Truck },
        ].map(s => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-4">
              <s.icon className="h-4 w-4 text-primary mb-2" />
              <p className="text-xl font-bold font-display">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-xs">Order ID</TableHead>
                <TableHead className="text-xs">Customer</TableHead>
                <TableHead className="text-xs">Store</TableHead>
                <TableHead className="text-xs">Items</TableHead>
                <TableHead className="text-xs">Total</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs">Payment</TableHead>
                <TableHead className="text-xs w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(o => (
                <TableRow key={o.id} className="border-border hover:bg-secondary/30">
                  <TableCell className="text-sm font-mono font-medium">{o.id}</TableCell>
                  <TableCell className="text-sm">{o.customer}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{o.store}</TableCell>
                  <TableCell className="text-sm">{o.items}</TableCell>
                  <TableCell className="text-sm font-medium">{o.total}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusColor(o.status)}`}>
                      {o.status.replace("_", " ")}
                    </span>
                  </TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{o.payment}</Badge></TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setDetail(o)}><Eye className="h-3.5 w-3.5 mr-2" /> View</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success("Refund processed")}>Process Refund</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success("Marked as shipped")}>Mark Shipped</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!detail} onOpenChange={() => setDetail(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Order {detail?.id}</DialogTitle></DialogHeader>
          {detail && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-xs text-muted-foreground">Customer</p><p className="font-medium">{detail.customer}</p></div>
                <div><p className="text-xs text-muted-foreground">Store</p><p>{detail.store}</p></div>
                <div><p className="text-xs text-muted-foreground">Total</p><p className="font-bold">{detail.total}</p></div>
                <div><p className="text-xs text-muted-foreground">Items</p><p>{detail.items}</p></div>
                <div><p className="text-xs text-muted-foreground">Status</p><span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusColor(detail.status)}`}>{detail.status.replace("_", " ")}</span></div>
                <div><p className="text-xs text-muted-foreground">Date</p><p>{detail.date}</p></div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="gradient-primary text-primary-foreground" onClick={() => { toast.success("Shipped"); setDetail(null); }}>Mark Shipped</Button>
                <Button size="sm" variant="outline" onClick={() => { toast.success("Refund processed"); setDetail(null); }}>Refund</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SuperAdminLayout>
  );
}
