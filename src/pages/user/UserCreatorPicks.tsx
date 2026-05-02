import { useState } from "react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Star, Film, ShoppingBag, Store, Gamepad2, Ticket, Trash2, Edit, MoreHorizontal, Search } from "lucide-react";

interface CreatorPick {
  id: number;
  title: string;
  type: "movie" | "show" | "product" | "storefront" | "game" | "event";
  image: string;
  description: string;
  dateAdded: string;
  status: "active" | "pending";
}

const initialPicks: CreatorPick[] = [
  { id: 1, title: "The Lodge", type: "movie", image: "🎬", description: "A thrilling mystery drama", dateAdded: "Jan 10, 2026", status: "active" },
  { id: 2, title: "City Lights Season 3", type: "show", image: "📺", description: "Award-winning drama series", dateAdded: "Jan 9, 2026", status: "active" },
  { id: 3, title: "Pendant Lamp Collection", type: "product", image: "💡", description: "Modern lighting by Luxe Home", dateAdded: "Jan 8, 2026", status: "active" },
  { id: 4, title: "Glow & Co.", type: "storefront", image: "🏪", description: "Premium beauty products", dateAdded: "Jan 7, 2026", status: "active" },
  { id: 5, title: "Neon Riders", type: "game", image: "🎮", description: "Arcade racing adventure", dateAdded: "Jan 6, 2026", status: "pending" },
  { id: 6, title: "Fashion Week Live", type: "event", image: "🎪", description: "Exclusive streaming event", dateAdded: "Jan 5, 2026", status: "active" },
];

const typeIcons = {
  movie: Film,
  show: Film,
  product: ShoppingBag,
  storefront: Store,
  game: Gamepad2,
  event: Ticket,
};

const typeColors = {
  movie: "bg-accent/20 text-accent",
  show: "bg-accent/20 text-accent",
  product: "bg-primary/20 text-primary",
  storefront: "bg-success/20 text-success",
  game: "bg-warning/20 text-warning",
  event: "bg-destructive/20 text-destructive",
};

const typeEmojis: Record<string, string> = {
  movie: "🎬",
  show: "📺",
  product: "💡",
  storefront: "🏪",
  game: "🎮",
  event: "🎪",
};

export default function UserCreatorPicks() {
  const [picks, setPicks] = useState<CreatorPick[]>(initialPicks);
  const [editingPick, setEditingPick] = useState<CreatorPick | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const movies = picks.filter(p => p.type === "movie" || p.type === "show");
  const products = picks.filter(p => p.type === "product" || p.type === "storefront");
  const others = picks.filter(p => p.type === "game" || p.type === "event");

  const filteredPicks = picks.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (pick: CreatorPick) => {
    setEditingPick({ ...pick });
    setIsAddMode(false);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingPick({
      id: Date.now(),
      title: "",
      type: "movie",
      image: "🎬",
      description: "",
      dateAdded: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "pending",
    });
    setIsAddMode(true);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!editingPick) return;
    
    if (isAddMode) {
      setPicks([editingPick, ...picks]);
    } else {
      setPicks(picks.map(p => p.id === editingPick.id ? editingPick : p));
    }
    setIsDialogOpen(false);
    setEditingPick(null);
  };

  const handleDelete = (id: number) => {
    setPicks(picks.filter(p => p.id !== id));
  };

  const columns = [
    {
      key: "item",
      label: "Item",
      render: (item: CreatorPick) => {
        const Icon = typeIcons[item.type];
        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-xl">
              {item.image}
            </div>
            <div>
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: "type",
      label: "Type",
      render: (item: CreatorPick) => {
        const Icon = typeIcons[item.type];
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${typeColors[item.type]}`}>
            <Icon className="h-3 w-3" />
            {item.type}
          </span>
        );
      },
    },
    { key: "dateAdded", label: "Date Added" },
    {
      key: "status",
      label: "Status",
      render: (item: CreatorPick) => <StatusBadge status={item.status} />,
    },
    {
      key: "actions",
      label: "",
      render: (item: CreatorPick) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover border-border">
            <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => handleEdit(item)}>
              <Edit className="h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer text-destructive" onClick={() => handleDelete(item.id)}>
              <Trash2 className="h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const renderTable = (data: CreatorPick[]) => (
    <DataTable 
      columns={columns} 
      data={data} 
      emptyMessage="No creator picks found" 
    />
  );

  return (
    <AdminLayout type="user" title="Creator Picks" subtitle="Curate your recommendations">
      <div className="space-y-6 animate-slide-up">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{picks.length} Total Picks</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search picks..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 bg-secondary border-border"
              />
            </div>
            <Button className="gradient-primary text-primary-foreground gap-2" onClick={handleAdd}>
              <Plus className="h-4 w-4" />
              Add Creator Pick
            </Button>
          </div>
        </div>

        {/* Info Card */}
        <div className="glass-card rounded-xl p-6 border-l-4 border-primary">
          <h3 className="font-display font-semibold text-foreground mb-2">What are Creator Picks?</h3>
          <p className="text-sm text-muted-foreground">
            Creator Picks are your personal recommendations that appear across the Discover tab, your profile, 
            storefront Creator sections, and Publisher dashboards. Recommend your favorite movies, products, 
            storefronts, games, and events to your audience.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-secondary border border-border">
            <TabsTrigger value="all">All ({picks.length})</TabsTrigger>
            <TabsTrigger value="movies">Movies & Shows ({movies.length})</TabsTrigger>
            <TabsTrigger value="products">Products & Stores ({products.length})</TabsTrigger>
            <TabsTrigger value="others">Games & Events ({others.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            {renderTable(searchQuery ? filteredPicks : picks)}
          </TabsContent>
          
          <TabsContent value="movies" className="mt-6">
            {renderTable(movies)}
          </TabsContent>
          
          <TabsContent value="products" className="mt-6">
            {renderTable(products)}
          </TabsContent>
          
          <TabsContent value="others" className="mt-6">
            {renderTable(others)}
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit/Add Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-lg">
              {isAddMode ? "Add Creator Pick" : "Edit Creator Pick"}
            </DialogTitle>
          </DialogHeader>
          
          {editingPick && (
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="title" className="text-foreground">Title</Label>
                <Input 
                  id="title"
                  value={editingPick.title}
                  onChange={(e) => setEditingPick({ ...editingPick, title: e.target.value })}
                  className="mt-2 bg-secondary border-border"
                  placeholder="Enter title..."
                />
              </div>
              
              <div>
                <Label htmlFor="type" className="text-foreground">Type</Label>
                <Select 
                  value={editingPick.type} 
                  onValueChange={(value: CreatorPick["type"]) => setEditingPick({ 
                    ...editingPick, 
                    type: value,
                    image: typeEmojis[value]
                  })}
                >
                  <SelectTrigger className="mt-2 bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="movie">🎬 Movie</SelectItem>
                    <SelectItem value="show">📺 Show</SelectItem>
                    <SelectItem value="product">💡 Product</SelectItem>
                    <SelectItem value="storefront">🏪 Storefront</SelectItem>
                    <SelectItem value="game">🎮 Game</SelectItem>
                    <SelectItem value="event">🎪 Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="description" className="text-foreground">Description</Label>
                <Input 
                  id="description"
                  value={editingPick.description}
                  onChange={(e) => setEditingPick({ ...editingPick, description: e.target.value })}
                  className="mt-2 bg-secondary border-border"
                  placeholder="Short description..."
                />
              </div>

              <div>
                <Label htmlFor="status" className="text-foreground">Status</Label>
                <Select 
                  value={editingPick.status} 
                  onValueChange={(value: "active" | "pending") => setEditingPick({ ...editingPick, status: value })}
                >
                  <SelectTrigger className="mt-2 bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button 
              className="gradient-primary text-primary-foreground" 
              onClick={handleSave}
              disabled={!editingPick?.title}
            >
              {isAddMode ? "Add Pick" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
