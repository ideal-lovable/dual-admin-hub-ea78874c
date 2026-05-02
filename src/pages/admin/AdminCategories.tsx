import { useMemo, useState } from "react";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { SuperAdminLayout } from "@/layouts/SuperAdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminStore } from "@/lib/admin-store";
import { toast } from "sonner";

interface Row { name: string; usage: number; }

export default function AdminCategories() {
  const { categories, content, addCategory, updateCategory, deleteCategory } = useAdminStore();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [name, setName] = useState("");

  const rows = useMemo<Row[]>(() => categories.map((category) => ({
    name: category,
    usage: content.filter((item) => item.category === category).length,
  })).filter((row) => row.name.toLowerCase().includes(search.toLowerCase())), [categories, content, search]);

  const openNew = () => { setEditing(null); setName(""); setDialogOpen(true); };
  const openEdit = (category: string) => { setEditing(category); setName(category); setDialogOpen(true); };
  const save = () => {
    if (!name.trim()) return toast.error("Category name is required.");
    if (editing) { updateCategory(editing, name.trim()); } else { addCategory(name.trim()); }
    toast.success(editing ? "Category updated." : "Category added.");
    setDialogOpen(false);
  };
  const remove = (category: string) => {
    const ok = deleteCategory(category);
    if (ok) { toast.success("Category deleted."); } else { toast.error("Category is in use and cannot be deleted."); }
  };

  const columns = [
    { key: "name", label: "Category", render: (row: Row) => <span className="font-medium text-foreground">{row.name}</span> },
    { key: "usage", label: "Usage", render: (row: Row) => <span className="text-muted-foreground">{row.usage} items</span> },
    { key: "actions", label: "Actions", render: (row: Row) => <div className="flex gap-2"><Button variant="secondary" size="sm" onClick={() => openEdit(row.name)}><Edit className="h-3.5 w-3.5" /></Button><Button variant="ghost" size="sm" className="text-destructive" onClick={() => remove(row.name)}><Trash2 className="h-3.5 w-3.5" /></Button></div> },
  ];

  return (
    <SuperAdminLayout title="Categories" subtitle="Manage platform content categories" breadcrumbs={[{ label: "Dashboard", path: "/admin/dashboard" }, { label: "Content", path: "/admin/content" }, { label: "Categories" }]}> 
      <div className="space-y-6 animate-slide-up">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search categories..." className="pl-9 bg-secondary border-border" /></div>
          <Button onClick={openNew} className="gradient-primary text-primary-foreground"><Plus className="h-4 w-4 mr-2" />Add Category</Button>
        </div>
        <DataTable columns={columns} data={rows} />
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogContent><DialogHeader><DialogTitle>{editing ? "Edit Category" : "Add Category"}</DialogTitle></DialogHeader><div className="py-4"><Label>Name</Label><Input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 bg-secondary border-border" /></div><DialogFooter><Button variant="secondary" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={save} className="gradient-primary text-primary-foreground">Save</Button></DialogFooter></DialogContent></Dialog>
    </SuperAdminLayout>
  );
}
