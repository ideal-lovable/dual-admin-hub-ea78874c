import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ShoppingCart, Search, MoreHorizontal, Eye, DollarSign, Package, Truck, Target, FileText } from "lucide-react";
import { toast } from "sonner";

const orders = [
  { id: "ORD-1001", customer: "Jane Doe", store: "Tech Haven", items: 3, total: "$299.99", status: "processing", date: "2024-06-03", payment: "paid" },
  { id: "ORD-1002", customer: "Mike Chen", store: "Urban Fits", items: 1, total: "$89.99", status: "shipped", date: "2024-06-02", payment: "paid" },
  { id: "ORD-1003", customer: "Amy Brooks", store: "Zen Beauty", items: 5, total: "$156.50", status: "delivered", date: "2024-05-28", payment: "paid" },
  { id: "ORD-1004", customer: "User #44012", store: "Sneaker World", items: 2, total: "$420.00", status: "refund_requested", date: "2024-06-01", payment: "disputed" },
  { id: "ORD-1005", customer: "Lisa Wang", store: "Home Vibes", items: 1, total: "$34.99", status: "cancelled", date: "2024-06-03", payment: "refunded" },
];

const transactions = [
  { id: "TXN-5001", order: "ORD-1001", amount: "$299.99", type: "payment", method: "Visa •••4242", status: "completed", date: "2024-06-03" },
  { id: "TXN-5002", order: "ORD-1002", amount: "$89.99", type: "payment", method: "PayPal", status: "completed", date: "2024-06-02" },
  { id: "TXN-5003", order: "ORD-1005", amount: "$34.99", type: "refund", method: "Visa •••1234", status: "processed", date: "2024-06-03" },
  { id: "TXN-5004", order: "ORD-1004", amount: "$420.00", type: "dispute", method: "MC •••8888", status: "pending", date: "2024-06-01" },
];

const payouts = [
  { store: "Tech Haven", amount: "$18,400", status: "paid", date: "2024-06-01", method: "Bank Transfer" },
  { store: "Urban Fits", amount: "$52,100", status: "paid", date: "2024-06-01", method: "Bank Transfer" },
  { store: "Zen Beauty", amount: "$8,200", status: "pending", date: "2024-06-08", method: "Bank Transfer" },
];

const pathToTab: Record<string, string> = {
  "/admin/commerce/orders": "orders",
  "/admin/commerce/transactions": "transactions",
  "/admin/commerce/refunds": "refunds",
  "/admin/commerce/payouts": "payouts",
  "/admin/commerce/conversion": "conversion",
};
const tabToPath: Record<string, string> = {
  orders: "/admin/commerce/orders",
  transactions: "/admin/commerce/transactions",
  refunds: "/admin/commerce/refunds",
  payouts: "/admin/commerce/payouts",
  conversion: "/admin/commerce/conversion",
};

const statusColor = (s: string) => {
  switch (s) {
    case "processing": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "shipped": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    case "delivered": case "completed": case "paid": case "processed": return "bg-green-500/10 text-green-400 border-green-500/20";
    case "refund_requested": case "pending": case "dispute": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    case "cancelled": case "disputed": case "refunded": return "bg-red-500/10 text-red-400 border-red-500/20";
    default: return "bg-muted text-muted-foreground";
  }
};

export default function AdminCommerceOrders() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = pathToTab[location.pathname] || "orders";
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState<typeof orders[0] | null>(null);

  const filtered = orders.filter(o => o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()));

  return (
    <SuperAdminLayout title="Commerce & Orders" subtitle="Manage orders, transactions, and refunds" breadcrumbs={[{ label: "Dashboard", path: "/admin/dashboard" }, { label: "Commerce" }]}>
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

      <Tabs value={activeTab} onValueChange={(v) => navigate(tabToPath[v])}>
        <TabsList>
          <TabsTrigger value="orders"><ShoppingCart className="h-3.5 w-3.5 mr-1" />Orders</TabsTrigger>
          <TabsTrigger value="transactions"><DollarSign className="h-3.5 w-3.5 mr-1" />Transactions</TabsTrigger>
          <TabsTrigger value="refunds"><FileText className="h-3.5 w-3.5 mr-1" />Refunds</TabsTrigger>
          <TabsTrigger value="payouts"><DollarSign className="h-3.5 w-3.5 mr-1" />Payouts</TabsTrigger>
          <TabsTrigger value="conversion"><Target className="h-3.5 w-3.5 mr-1" />Conversion</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
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
                      <TableCell><span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusColor(o.status)}`}>{o.status.replace("_", " ")}</span></TableCell>
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
        </TabsContent>

        <TabsContent value="transactions">
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-xs">TXN ID</TableHead>
                    <TableHead className="text-xs">Order</TableHead>
                    <TableHead className="text-xs">Amount</TableHead>
                    <TableHead className="text-xs">Type</TableHead>
                    <TableHead className="text-xs">Method</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map(t => (
                    <TableRow key={t.id} className="border-border hover:bg-secondary/30">
                      <TableCell className="text-sm font-mono">{t.id}</TableCell>
                      <TableCell className="text-sm font-mono text-muted-foreground">{t.order}</TableCell>
                      <TableCell className="text-sm font-medium">{t.amount}</TableCell>
                      <TableCell><Badge variant="outline" className="text-xs capitalize">{t.type}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{t.method}</TableCell>
                      <TableCell><span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusColor(t.status)}`}>{t.status}</span></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{t.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="refunds">
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-xs">Order</TableHead>
                    <TableHead className="text-xs">Customer</TableHead>
                    <TableHead className="text-xs">Amount</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs w-24"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.filter(o => o.status === "refund_requested" || o.payment === "refunded").map(o => (
                    <TableRow key={o.id} className="border-border hover:bg-secondary/30">
                      <TableCell className="text-sm font-mono">{o.id}</TableCell>
                      <TableCell className="text-sm">{o.customer}</TableCell>
                      <TableCell className="text-sm font-medium">{o.total}</TableCell>
                      <TableCell><span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusColor(o.status)}`}>{o.status.replace("_", " ")}</span></TableCell>
                      <TableCell><Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => toast.success("Refund processed")}>Process</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts">
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-xs">Store</TableHead>
                    <TableHead className="text-xs">Amount</TableHead>
                    <TableHead className="text-xs">Method</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payouts.map(p => (
                    <TableRow key={p.store} className="border-border hover:bg-secondary/30">
                      <TableCell className="text-sm font-medium">{p.store}</TableCell>
                      <TableCell className="text-sm font-bold">{p.amount}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.method}</TableCell>
                      <TableCell><span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusColor(p.status)}`}>{p.status}</span></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{p.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversion">
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-sm">Cart & Conversion Metrics</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Active Carts", value: "342" },
                  { label: "Abandoned Rate", value: "68%" },
                  { label: "Avg. Cart Value", value: "$87.40" },
                  { label: "Checkout Rate", value: "32%" },
                ].map(s => (
                  <div key={s.label} className="p-4 rounded-lg bg-secondary/30 text-center">
                    <p className="text-xl font-bold font-display">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!detail} onOpenChange={() => setDetail(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Order {detail?.id}</DialogTitle></DialogHeader>
          {detail && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-xs text-muted-foreground">Customer</p><p className="font-medium">{detail.customer}</p></div>
                <div><p className="text-xs text-muted-foreground">Store</p><p>{detail.store}</p></div>
                <div><p className="text-xs text-muted-foreground">Total</p><p className="font-bold">{detail.total}</p></div>
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
