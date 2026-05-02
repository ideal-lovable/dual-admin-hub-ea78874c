import { useState } from "react";
import { BusinessLayout } from "@/layouts/BusinessLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Store, Image, FileText, Users, Edit, Eye } from "lucide-react";
import { toast } from "sonner";
import storefrontBanner from "@/assets/restored/cinema-banner.jpg";
import storefrontLogo from "@/assets/restored/store-logo.jpg";
import theaterSeats from "@/assets/restored/theater-seats.jpg";
import projectorImage from "@/assets/restored/projector.jpg";
import djConsole from "@/assets/restored/dj-console.jpg";
import cassetteImage from "@/assets/restored/cassette.jpg";
import avatarWoman from "@/assets/restored/avatar-woman.jpg";
import avatarMan from "@/assets/restored/avatar-man.jpg";
import avatarCreator from "@/assets/restored/avatar-creator.jpg";

const initialCreators = [
  { name: "Sally M.", role: "Home Decor Enthusiast", avatar: avatarCreator },
  { name: "Jason T.", role: "Interior Designer", avatar: avatarWoman },
  { name: "Olivia K.", role: "Home Styling Tips", avatar: avatarMan },
];

const featuredImages = [theaterSeats, projectorImage, djConsole, cassetteImage];

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
    <BusinessLayout title="Storefront" subtitle="Manage your brand presence" breadcrumbs={[{ label: "Business", path: "/business/dashboard" }, { label: "Storefront" }]}>
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
          <div className="rounded-xl overflow-hidden border border-border bg-secondary/30">
            <div className="h-40 relative bg-cover bg-center" style={{ backgroundImage: `linear-gradient(90deg, hsl(var(--background) / 0.15), hsl(var(--background) / 0.15)), url(${storefrontBanner})` }}>
              <div className="absolute inset-x-0 bottom-0 h-16 bg-background/45 backdrop-blur-[1px]" />
              <div className="absolute bottom-4 left-4 flex items-end gap-4">
                <div className="h-20 w-20 rounded-xl overflow-hidden border border-border shadow-elevated bg-secondary"><img src={storefrontLogo} alt="Luxe Apparel storefront" className="h-full w-full object-cover" /></div>
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
                <div><Label className="text-foreground mb-3 block">Store Logo</Label><div className="flex items-center gap-4"><div className="h-24 w-24 rounded-xl overflow-hidden border border-border bg-secondary"><img src={storefrontLogo} alt="Store logo" className="h-full w-full object-cover" /></div><div><p className="text-sm text-muted-foreground mb-2">Square image, 512x512px recommended</p><Button variant="secondary" size="sm" onClick={() => toast.info("Logo upload dialog would open here")}>Replace Logo</Button></div></div></div>
                <div><Label className="text-foreground mb-3 block">Store Banner</Label><button type="button" className="h-24 w-full overflow-hidden rounded-lg border border-border bg-secondary text-left transition-colors hover:border-primary/50" onClick={() => toast.info("Banner upload dialog would open here")}><img src={storefrontBanner} alt="Store banner" className="h-full w-full object-cover" /></button></div>
              </div>
              <div className="mt-6"><Label className="text-foreground mb-3 block">Featured Images</Label><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{featuredImages.map((image, i) => (<button type="button" key={image} className="aspect-square overflow-hidden rounded-lg border border-border bg-secondary hover:border-primary/50 transition-colors cursor-pointer" onClick={() => toast.info(`Upload featured image ${i + 1}`)}><img src={image} alt={`Featured storefront ${i + 1}`} className="h-full w-full object-cover" /></button>))}</div></div>
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
                      <div className="h-12 w-12 rounded-full overflow-hidden border border-border bg-secondary"><img src={creator.avatar} alt={creator.name} className="h-full w-full object-cover" /></div>
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
                <div className="h-20 w-20 rounded-xl overflow-hidden border border-border bg-secondary"><img src={storefrontLogo} alt="Luxe Apparel storefront" className="h-full w-full object-cover" /></div>
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
              <div className="h-20 w-20 rounded-full overflow-hidden border border-border bg-secondary mx-auto mb-4"><img src={selectedCreator.avatar} alt={selectedCreator.name} className="h-full w-full object-cover" /></div>
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
    </BusinessLayout>
  );
}
