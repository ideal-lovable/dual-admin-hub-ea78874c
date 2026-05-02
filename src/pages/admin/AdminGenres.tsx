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

export default function AdminGenres() {
  const { genres, content, addGenre, updateGenre, deleteGenre } = useAdminStore();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [name, setName] = useState("");

  const rows = useMemo<Row[]>(() => genres.map((genre) => ({
    name: genre,
    usage: content.filter((item) => item.genres.includes(genre)).length,
  })).filter((row) => row.name.toLowerCase().includes(search.toLowerCase())), [genres, content, search]);

  const openNew = () => { setEditing(null); setName(""); setDialogOpen(true); };
  const openEdit = (genre: string) => { setEditing(genre); setName(genre); setDialogOpen(true); };
  const save = () => {
    if (!name.trim()) return toast.error("Genre name is required.");
    if (editing) { updateGenre(editing, name.trim()); } else { addGenre(name.trim()); }
    toast.success(editing ? "Genre updated." : "Genre added.");
    setDialogOpen(false);
  };
  const remove = (genre: string) => {
    const ok = deleteGenre(genre);
    if (ok) { toast.success("Genre deleted."); } else { toast.error("Genre is in use and cannot be deleted."); }
  };

  const columns = [
    { key: "name", label: "Genre", render: (row: Row) => <span className="font-medium text-foreground">{row.name}</span> },
    { key: "usage", label: "Usage", render: (row: Row) => <span className="text-muted-foreground">{row.usage} items</span> },
    { key: "actions", label: "Actions", render: (row: Row) => <div className="flex gap-2"><Button variant="secondary" size="sm" onClick={() => openEdit(row.name)}><Edit className="h-3.5 w-3.5" /></Button><Button variant="ghost" size="sm" className="text-destructive" onClick={() => remove(row.name)}><Trash2 className="h-3.5 w-3.5" /></Button></div> },
  ];

  return (
    <SuperAdminLayout title="Genres" subtitle="Manage content genres for movies, music, podcasts, and series" breadcrumbs={[{ label: "Dashboard", path: "/admin/dashboard" }, { label: "Content", path: "/admin/content" }, { label: "Genres" }]}> 
      <div className="space-y-6 animate-slide-up">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search genres..." className="pl-9 bg-secondary border-border" /></div>
          <Button onClick={openNew} className="gradient-primary text-primary-foreground"><Plus className="h-4 w-4 mr-2" />Add Genre</Button>
        </div>
        <DataTable columns={columns} data={rows} />
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogContent><DialogHeader><DialogTitle>{editing ? "Edit Genre" : "Add Genre"}</DialogTitle></DialogHeader><div className="py-4"><Label>Name</Label><Input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 bg-secondary border-border" /></div><DialogFooter><Button variant="secondary" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={save} className="gradient-primary text-primary-foreground">Save</Button></DialogFooter></DialogContent></Dialog>
    </SuperAdminLayout>
  );
}
