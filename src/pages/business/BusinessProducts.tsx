import { useState } from "react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Package, Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface Product {
  id: number; image: string; name: string; category: string; price: string; stock: number; sales: number; status: "active" | "draft" | "pending";
}

const initialProducts: Product[] = [
  { id: 1, image: "👗", name: "Summer Dress - Floral", category: "Dresses", price: "$89.99", stock: 24, sales: 156, status: "active" },
  { id: 2, image: "👜", name: "Leather Tote Bag", category: "Accessories", price: "$145.00", stock: 12, sales: 89, status: "active" },
  { id: 3, image: "👠", name: "Classic Heels - Black", category: "Shoes", price: "$120.00", stock: 8, sales: 234, status: "active" },
  { id: 4, image: "🧥", name: "Denim Jacket", category: "Outerwear", price: "$75.00", stock: 3, sales: 67, status: "active" },
  { id: 5, image: "👚", name: "Silk Blouse - White", category: "Tops", price: "$65.00", stock: 45, sales: 123, status: "active" },
  { id: 6, image: "👖", name: "High-Waist Jeans", category: "Bottoms", price: "$85.00", stock: 0, sales: 198, status: "draft" },
  { id: 7, image: "💍", name: "Gold Hoop Earrings", category: "Jewelry", price: "$35.00", stock: 50, sales: 312, status: "pending" },
  { id: 8, image: "🧣", name: "Cashmere Scarf", category: "Accessories", price: "$95.00", stock: 18, sales: 45, status: "active" },
];

export default function BusinessProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({ name: "", category: "Dresses", price: "", stock: 0 });
  const [searchQuery, setSearchQuery] = useState("");

  const handleAdd = () => {
    const product: Product = { id: Date.now(), image: "📦", name: newProduct.name, category: newProduct.category, price: newProduct.price, stock: newProduct.stock, sales: 0, status: "pending" };
    setProducts([product, ...products]);
    setIsAddOpen(false);
    setNewProduct({ name: "", category: "Dresses", price: "", stock: 0 });
    toast.success("Product added successfully!");
  };

  const handleEdit = () => {
    if (selectedProduct) {
      setProducts(products.map(p => p.id === selectedProduct.id ? selectedProduct : p));
      setIsEditOpen(false);
      toast.success("Product updated.");
    }
  };

  const handleDelete = () => {
    if (selectedProduct) {
      setProducts(products.filter(p => p.id !== selectedProduct.id));
      setIsDeleteOpen(false);
      toast.success("Product deleted.");
    }
  };

  const filtered = searchQuery ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())) : products;
  const activeProducts = filtered.filter(p => p.status === "active");
  const draftProducts = filtered.filter(p => p.status === "draft");
  const pendingProducts = filtered.filter(p => p.status === "pending");
  const lowStockProducts = products.filter(p => p.stock <= 5 && p.stock > 0);

  const columns = [
    { key: "product", label: "Product", render: (item: Product) => (
      <div className="flex items-center gap-3"><div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center text-2xl">{item.image}</div><div><p className="font-medium text-foreground">{item.name}</p><p className="text-sm text-muted-foreground">{item.category}</p></div></div>
    )},
    { key: "price", label: "Price" },
    { key: "stock", label: "Stock", render: (item: Product) => <span className={item.stock <= 5 ? "text-warning font-medium" : ""}>{item.stock === 0 ? "Out of stock" : item.stock}</span> },
    { key: "sales", label: "Sales", render: (item: Product) => <span className="text-success">{item.sales}</span> },
    { key: "status", label: "Status", render: (item: Product) => <StatusBadge status={item.status} /> },
    { key: "actions", label: "", render: (item: Product) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-popover border-border">
          <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => { setSelectedProduct(item); setIsViewOpen(true); }}><Eye className="h-4 w-4" /> View</DropdownMenuItem>
          <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => { setSelectedProduct({ ...item }); setIsEditOpen(true); }}><Edit className="h-4 w-4" /> Edit</DropdownMenuItem>
          <DropdownMenuItem className="gap-2 cursor-pointer text-destructive" onClick={() => { setSelectedProduct(item); setIsDeleteOpen(true); }}><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )},
  ];

  return (
    <AdminLayout type="business" title="Products" subtitle="Manage your product catalog">
      <div className="space-y-6 animate-slide-up">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary"><Package className="h-4 w-4 text-primary" /><span className="text-sm font-medium">{products.length} Products</span></div>
            {lowStockProducts.length > 0 && <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-warning/10 border border-warning/20"><span className="text-sm font-medium text-warning">{lowStockProducts.length} Low Stock</span></div>}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-64 pl-10 bg-secondary border-border" /></div>
            <Button className="gradient-primary text-primary-foreground gap-2" onClick={() => setIsAddOpen(true)}><Plus className="h-4 w-4" /> Add Product</Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-secondary border border-border">
            <TabsTrigger value="all">All ({filtered.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeProducts.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingProducts.length})</TabsTrigger>
            <TabsTrigger value="draft">Draft ({draftProducts.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6"><DataTable columns={columns} data={filtered} /></TabsContent>
          <TabsContent value="active" className="mt-6"><DataTable columns={columns} data={activeProducts} /></TabsContent>
          <TabsContent value="pending" className="mt-6"><DataTable columns={columns} data={pendingProducts} emptyMessage="No pending products" /></TabsContent>
          <TabsContent value="draft" className="mt-6"><DataTable columns={columns} data={draftProducts} emptyMessage="No draft products" /></TabsContent>
        </Tabs>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Add Product</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div><Label className="text-foreground">Product Name</Label><Input value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="mt-2 bg-secondary border-border" placeholder="Enter product name..." /></div>
            <div><Label className="text-foreground">Category</Label>
              <Select value={newProduct.category} onValueChange={(v) => setNewProduct({ ...newProduct, category: v })}>
                <SelectTrigger className="mt-2 bg-secondary border-border"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-popover border-border">{["Dresses", "Accessories", "Shoes", "Outerwear", "Tops", "Bottoms", "Jewelry"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-foreground">Price</Label><Input value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="mt-2 bg-secondary border-border" placeholder="$0.00" /></div>
              <div><Label className="text-foreground">Stock</Label><Input type="number" min={0} value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })} className="mt-2 bg-secondary border-border" /></div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
            <Button className="gradient-primary text-primary-foreground" onClick={handleAdd} disabled={!newProduct.name || !newProduct.price}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Product */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Product Details</DialogTitle></DialogHeader>
          {selectedProduct && (
            <div className="space-y-4 py-4">
              <div className="h-40 rounded-xl bg-secondary flex items-center justify-center text-6xl">{selectedProduct.image}</div>
              <h3 className="font-display text-lg font-semibold text-foreground">{selectedProduct.name}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-muted-foreground">Category</p><p className="font-medium text-foreground">{selectedProduct.category}</p></div>
                <div><p className="text-sm text-muted-foreground">Price</p><p className="font-medium text-foreground">{selectedProduct.price}</p></div>
                <div><p className="text-sm text-muted-foreground">Stock</p><p className="font-medium text-foreground">{selectedProduct.stock}</p></div>
                <div><p className="text-sm text-muted-foreground">Sales</p><p className="font-medium text-success">{selectedProduct.sales}</p></div>
                <div><p className="text-sm text-muted-foreground">Status</p><StatusBadge status={selectedProduct.status} /></div>
              </div>
            </div>
          )}
          <DialogFooter><DialogClose asChild><Button variant="secondary">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Edit Product</DialogTitle></DialogHeader>
          {selectedProduct && (
            <div className="space-y-4 py-4">
              <div><Label className="text-foreground">Name</Label><Input value={selectedProduct.name} onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })} className="mt-2 bg-secondary border-border" /></div>
              <div><Label className="text-foreground">Category</Label>
                <Select value={selectedProduct.category} onValueChange={(v) => setSelectedProduct({ ...selectedProduct, category: v })}>
                  <SelectTrigger className="mt-2 bg-secondary border-border"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover border-border">{["Dresses", "Accessories", "Shoes", "Outerwear", "Tops", "Bottoms", "Jewelry"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-foreground">Price</Label><Input value={selectedProduct.price} onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })} className="mt-2 bg-secondary border-border" /></div>
                <div><Label className="text-foreground">Stock</Label><Input type="number" value={selectedProduct.stock} onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: parseInt(e.target.value) || 0 })} className="mt-2 bg-secondary border-border" /></div>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
            <Button className="gradient-primary text-primary-foreground" onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display text-destructive">Delete Product</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground py-4">Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be undone.</p>
          <DialogFooter>
            <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
