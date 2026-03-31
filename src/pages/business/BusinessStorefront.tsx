import { useState } from "react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Store, Image, FileText, Users, Edit, Eye, Camera } from "lucide-react";
import { toast } from "sonner";

const initialCreators = [
  { name: "Sally M.", role: "Home Decor Enthusiast", avatar: "SM" },
  { name: "Jason T.", role: "Interior Designer", avatar: "JT" },
  { name: "Olivia K.", role: "Home Styling Tips", avatar: "OK" },
];

export default function BusinessStorefront() {
  const [featuredCreators, setFeaturedCreators] = useState(initialCreators);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<typeof initialCreators[0] | null>(null);
  const [requestName, setRequestName] = useState("");

  const handleRemove = () => {
    if (selectedCreator) {
      setFeaturedCreators(featuredCreators.filter(c => c.name !== selectedCreator.name));
      setIsRemoveOpen(false);
      toast.success(`${selectedCreator.name} removed from featured creators.`);
    }
  };

  const handleRequest = () => {
    if (requestName) {
      setIsRequestOpen(false);
      setRequestName("");
      toast.success("Creator request submitted! FVRD TV will review and approve.");
    }
  };

  return (
    <AdminLayout type="business" title="Storefront" subtitle="Manage your brand presence">
      <div className="space-y-6 animate-slide-up">
        {/* Preview Banner */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-foreground">Storefront Preview</h2>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="gap-2" onClick={() => setIsPreviewOpen(true)}><Eye className="h-4 w-4" /> Preview</Button>
              <Button className="gradient-primary text-primary-foreground gap-2" size="sm" onClick={() => toast.info("Edit mode enabled")}><Edit className="h-4 w-4" /> Edit</Button>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border border-border">
            <div className="h-40 bg-gradient-to-r from-primary/20 to-accent/20 relative">
              <div className="absolute bottom-4 left-4 flex items-end gap-4">
                <div className="h-20 w-20 rounded-xl gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-elevated">LA</div>
                <div><h3 className="font-display text-xl font-bold text-foreground">Luxe Apparel</h3><p className="text-sm text-muted-foreground">Fashion & Lifestyle</p></div>
              </div>
            </div>
            <div className="p-4 bg-secondary/30">
              <div className="flex gap-4 text-sm"><span className="text-muted-foreground">45 Products</span><span className="text-muted-foreground">•</span><span className="text-muted-foreground">3 Creators</span><span className="text-muted-foreground">•</span><span className="text-success">Active</span></div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-secondary border border-border">
            <TabsTrigger value="overview" className="gap-2"><Store className="h-4 w-4" /> Overview</TabsTrigger>
            <TabsTrigger value="branding" className="gap-2"><Image className="h-4 w-4" /> Branding</TabsTrigger>
            <TabsTrigger value="about" className="gap-2"><FileText className="h-4 w-4" /> About</TabsTrigger>
            <TabsTrigger value="creators" className="gap-2"><Users className="h-4 w-4" /> Creators</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">Store Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><Label htmlFor="storeName" className="text-foreground">Store Name</Label><Input id="storeName" defaultValue="Luxe Apparel" className="mt-2 bg-secondary border-border" /></div>
                <div><Label htmlFor="category" className="text-foreground">Category</Label><Input id="category" defaultValue="Fashion & Lifestyle" className="mt-2 bg-secondary border-border" /></div>
                <div><Label htmlFor="owner" className="text-foreground">Owner Name</Label><Input id="owner" defaultValue="Sarah Lopez" className="mt-2 bg-secondary border-border" /></div>
                <div><Label htmlFor="location" className="text-foreground">City/State</Label><Input id="location" defaultValue="Dallas, TX" className="mt-2 bg-secondary border-border" /></div>
                <div className="md:col-span-2"><Label htmlFor="tagline" className="text-foreground">Tagline</Label><Input id="tagline" defaultValue="Timeless, modern women's fashion" className="mt-2 bg-secondary border-border" /></div>
              </div>
              <div className="flex justify-end mt-6"><Button className="gradient-primary text-primary-foreground" onClick={() => toast.success("Store information saved!")}>Save Changes</Button></div>
            </div>
          </TabsContent>

          <TabsContent value="branding" className="mt-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">Brand Assets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><Label className="text-foreground mb-3 block">Store Logo</Label><div className="flex items-center gap-4"><div className="h-24 w-24 rounded-xl gradient-primary flex items-center justify-center text-3xl font-bold text-primary-foreground">LA</div><div><p className="text-sm text-muted-foreground mb-2">Square image, 512x512px recommended</p><Button variant="secondary" size="sm" onClick={() => toast.info("Logo upload dialog would open here")}>Upload Logo</Button></div></div></div>
                <div><Label className="text-foreground mb-3 block">Store Banner</Label><div className="h-24 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-dashed border-border flex items-center justify-center hover:border-primary/50 transition-colors cursor-pointer" onClick={() => toast.info("Banner upload dialog would open here")}><div className="text-center"><Camera className="h-6 w-6 text-muted-foreground mx-auto mb-1" /><p className="text-xs text-muted-foreground">1200x300px</p></div></div></div>
              </div>
              <div className="mt-6"><Label className="text-foreground mb-3 block">Featured Images</Label><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{[1,2,3,4].map((i) => (<div key={i} className="aspect-square rounded-lg bg-secondary border-2 border-dashed border-border flex items-center justify-center hover:border-primary/50 transition-colors cursor-pointer" onClick={() => toast.info(`Upload featured image ${i}`)}><Camera className="h-6 w-6 text-muted-foreground" /></div>))}</div></div>
              <div className="flex justify-end mt-6"><Button className="gradient-primary text-primary-foreground" onClick={() => toast.success("Branding saved!")}>Save Branding</Button></div>
            </div>
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">Brand Story</h3>
              <div className="space-y-6">
                <div><Label htmlFor="story" className="text-foreground">Your Story</Label><Textarea id="story" rows={6} defaultValue="Luxe Apparel is a curated boutique specializing in timeless, modern women's fashion. Owned and designed by Sarah Lopez, our mission is to bring effortless everyday style through high-quality wardrobe essentials.

Each collection is thoughtfully sourced, ethically selected, and crafted to last. We focus on clean silhouettes, neutral tones, and pieces that make you feel confident." className="mt-2 bg-secondary border-border resize-none" /></div>
                <div><Label htmlFor="established" className="text-foreground">Established</Label><Input id="established" defaultValue="2022" className="mt-2 bg-secondary border-border w-40" /></div>
              </div>
              <div className="flex justify-end mt-6"><Button className="gradient-primary text-primary-foreground" onClick={() => toast.success("Brand story saved!")}>Save Story</Button></div>
            </div>
          </TabsContent>

          <TabsContent value="creators" className="mt-6">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div><h3 className="font-display text-lg font-semibold text-foreground">Featured Creators</h3><p className="text-sm text-muted-foreground">Creators approved to promote your products</p></div>
                <Button variant="secondary" size="sm" onClick={() => setIsRequestOpen(true)}>Request Creator</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuredCreators.map((creator, index) => (
                  <div key={index} className="p-4 rounded-lg bg-secondary/30 border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-12 w-12 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">{creator.avatar}</div>
                      <div><h4 className="font-medium text-foreground">{creator.name}</h4><p className="text-sm text-muted-foreground">{creator.role}</p></div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" className="flex-1" onClick={() => { setSelectedCreator(creator); setIsProfileOpen(true); }}>View Profile</Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={() => { setSelectedCreator(creator); setIsRemoveOpen(true); }}>Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted-foreground">Note: To add new creators to your storefront, please contact FVRD TV support with your collaboration agreement.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="bg-card border-border sm:max-w-2xl">
          <DialogHeader><DialogTitle className="font-display">Storefront Preview</DialogTitle></DialogHeader>
          <div className="py-4">
            <div className="rounded-xl overflow-hidden border border-border">
              <div className="h-48 bg-gradient-to-r from-primary/20 to-accent/20 relative">
                <div className="absolute bottom-4 left-4 flex items-end gap-4">
                  <div className="h-20 w-20 rounded-xl gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">LA</div>
                  <div><h3 className="font-display text-xl font-bold text-foreground">Luxe Apparel</h3><p className="text-sm text-muted-foreground">Fashion & Lifestyle · Dallas, TX</p></div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground">Timeless, modern women's fashion. Curated boutique specializing in high-quality wardrobe essentials.</p>
                <div className="flex gap-4 text-sm"><span className="text-foreground font-medium">45 Products</span><span className="text-foreground font-medium">3 Creators</span><span className="text-success font-medium">Active</span></div>
              </div>
            </div>
          </div>
          <DialogFooter><DialogClose asChild><Button variant="secondary">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Creator Profile */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Creator Profile</DialogTitle></DialogHeader>
          {selectedCreator && (
            <div className="py-4 text-center">
              <div className="h-20 w-20 rounded-full gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">{selectedCreator.avatar}</div>
              <h3 className="font-display text-lg font-semibold text-foreground">{selectedCreator.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{selectedCreator.role}</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div><p className="text-lg font-bold text-foreground">12</p><p className="text-xs text-muted-foreground">Videos</p></div>
                <div><p className="text-lg font-bold text-foreground">3.2K</p><p className="text-xs text-muted-foreground">Followers</p></div>
                <div><p className="text-lg font-bold text-foreground">8</p><p className="text-xs text-muted-foreground">Products</p></div>
              </div>
            </div>
          )}
          <DialogFooter><DialogClose asChild><Button variant="secondary">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Creator */}
      <Dialog open={isRemoveOpen} onOpenChange={setIsRemoveOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display text-destructive">Remove Creator</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground py-4">Remove {selectedCreator?.name} from your featured creators? They will no longer be able to promote your products.</p>
          <DialogFooter>
            <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
            <Button variant="destructive" onClick={handleRemove}>Remove</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Creator */}
      <Dialog open={isRequestOpen} onOpenChange={setIsRequestOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Request Creator</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div><Label className="text-foreground">Creator Name or Username</Label><Input value={requestName} onChange={(e) => setRequestName(e.target.value)} className="mt-2 bg-secondary border-border" placeholder="Enter creator name..." /></div>
            <p className="text-xs text-muted-foreground">FVRD TV will review your request and match you with the creator based on your collaboration agreement.</p>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
            <Button className="gradient-primary text-primary-foreground" onClick={handleRequest} disabled={!requestName}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
