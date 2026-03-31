import { useState } from "react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { User, Camera, Link, Bell, Shield } from "lucide-react";
import { toast } from "sonner";

export default function UserSettings() {
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  return (
    <AdminLayout type="user" title="Profile Settings" subtitle="Manage your creator profile">
      <div className="space-y-6 animate-slide-up max-w-4xl">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="bg-secondary border border-border">
            <TabsTrigger value="profile" className="gap-2"><User className="h-4 w-4" /> Profile</TabsTrigger>
            <TabsTrigger value="social" className="gap-2"><Link className="h-4 w-4" /> Social Links</TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2"><Shield className="h-4 w-4" /> Privacy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">Profile Information</h3>
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full gradient-primary flex items-center justify-center text-3xl font-bold text-primary-foreground">SM</div>
                  <button className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center hover:bg-secondary/80 transition-colors" onClick={() => toast.info("Photo upload dialog would open here")}>
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Profile Photo</h4>
                  <p className="text-sm text-muted-foreground mb-2">JPG, PNG or GIF. Max 2MB.</p>
                  <Button variant="secondary" size="sm" onClick={() => toast.info("Photo upload dialog would open here")}>Upload New Photo</Button>
                </div>
              </div>
              <div className="mb-8">
                <Label className="text-foreground mb-2 block">Banner Image</Label>
                <div className="h-32 rounded-lg bg-secondary border-2 border-dashed border-border flex items-center justify-center hover:border-primary/50 transition-colors cursor-pointer" onClick={() => toast.info("Banner upload dialog would open here")}>
                  <div className="text-center"><Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" /><p className="text-sm text-muted-foreground">Click to upload banner (1200x300)</p></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><Label htmlFor="name" className="text-foreground">Creator Name</Label><Input id="name" defaultValue="Sarah Martinez" className="mt-2 bg-secondary border-border" /></div>
                <div><Label htmlFor="tagline" className="text-foreground">Tagline</Label><Input id="tagline" defaultValue="Home Decor Enthusiast" className="mt-2 bg-secondary border-border" /></div>
                <div className="md:col-span-2"><Label htmlFor="bio" className="text-foreground">Bio</Label><Textarea id="bio" rows={4} defaultValue="Passionate about creating beautiful spaces. I share my favorite home decor finds, styling tips, and behind-the-scenes looks at room transformations." className="mt-2 bg-secondary border-border resize-none" /></div>
                <div><Label htmlFor="email" className="text-foreground">Email</Label><Input id="email" type="email" defaultValue="sarah@example.com" className="mt-2 bg-secondary border-border" /></div>
                <div><Label htmlFor="phone" className="text-foreground">Phone</Label><Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="mt-2 bg-secondary border-border" /></div>
              </div>
              <div className="flex justify-end mt-8">
                <Button className="gradient-primary text-primary-foreground" onClick={() => toast.success("Profile saved successfully!")}>Save Changes</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="social" className="mt-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">Social Links</h3>
              <div className="space-y-4">
                {["Instagram", "Twitter/X", "TikTok", "YouTube", "Website"].map((platform) => (
                  <div key={platform}><Label htmlFor={platform.toLowerCase()} className="text-foreground">{platform}</Label><Input id={platform.toLowerCase()} placeholder={`Your ${platform} URL`} className="mt-2 bg-secondary border-border" /></div>
                ))}
              </div>
              <div className="flex justify-end mt-8">
                <Button className="gradient-primary text-primary-foreground" onClick={() => toast.success("Social links saved!")}>Save Links</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">Notification Preferences</h3>
              <div className="space-y-6">
                {[
                  { title: "Content Approvals", description: "Get notified when your content is approved or needs changes" },
                  { title: "Livestream Reminders", description: "Receive reminders before your scheduled livestreams" },
                  { title: "Follower Activity", description: "Notifications when users interact with your content" },
                  { title: "Weekly Analytics", description: "Receive weekly performance summaries via email" },
                  { title: "New Product Access", description: "Get notified when new products are assigned to you" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                    <div><h4 className="font-medium text-foreground">{item.title}</h4><p className="text-sm text-muted-foreground">{item.description}</p></div>
                    <Switch defaultChecked={index < 3} onCheckedChange={(checked) => toast.success(`${item.title} ${checked ? "enabled" : "disabled"}`)} />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="mt-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">Privacy & Security</h3>
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-secondary/30">
                  <h4 className="font-medium text-foreground mb-2">Change Password</h4>
                  <p className="text-sm text-muted-foreground mb-4">Update your password regularly to keep your account secure</p>
                  <Button variant="secondary" onClick={() => setIsPasswordOpen(true)}>Change Password</Button>
                </div>
                <div className="p-4 rounded-lg bg-secondary/30">
                  <h4 className="font-medium text-foreground mb-2">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to your account</p>
                  <div className="flex items-center gap-4">
                    <Switch checked={is2FAEnabled} onCheckedChange={(v) => { setIs2FAEnabled(v); toast.success(v ? "2FA enabled!" : "2FA disabled"); }} />
                    <span className="text-sm text-muted-foreground">{is2FAEnabled ? "Enabled" : "Not enabled"}</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <h4 className="font-medium text-destructive mb-2">Delete Account</h4>
                  <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all associated data</p>
                  <Button variant="destructive" onClick={() => setIsDeleteOpen(true)}>Delete Account</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={isPasswordOpen} onOpenChange={setIsPasswordOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Change Password</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div><Label className="text-foreground">Current Password</Label><Input type="password" className="mt-2 bg-secondary border-border" placeholder="Enter current password" /></div>
            <div><Label className="text-foreground">New Password</Label><Input type="password" className="mt-2 bg-secondary border-border" placeholder="Enter new password" /></div>
            <div><Label className="text-foreground">Confirm New Password</Label><Input type="password" className="mt-2 bg-secondary border-border" placeholder="Confirm new password" /></div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
            <Button className="gradient-primary text-primary-foreground" onClick={() => { setIsPasswordOpen(false); toast.success("Password changed successfully!"); }}>Update Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Confirmation */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display text-destructive">Delete Account</DialogTitle></DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">This action is permanent and cannot be undone. All your videos, livestreams, creator picks, and profile data will be permanently deleted.</p>
            <div><Label className="text-foreground">Type "DELETE" to confirm</Label><Input className="mt-2 bg-secondary border-border" placeholder="DELETE" /></div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
            <Button variant="destructive" onClick={() => { setIsDeleteOpen(false); toast.error("Account deletion initiated. You will receive a confirmation email."); }}>Delete My Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
