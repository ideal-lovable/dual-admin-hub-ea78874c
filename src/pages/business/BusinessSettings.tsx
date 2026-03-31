import { useState } from "react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Store, CreditCard, Bell, Users, Trash2 } from "lucide-react";
import { toast } from "sonner";

const initialTeam = [
  { name: "Sarah Lopez", email: "sarah@luxeapparel.com", role: "Owner", avatar: "SL" },
  { name: "Mike Chen", email: "mike@luxeapparel.com", role: "Manager", avatar: "MC" },
  { name: "Emily Ross", email: "emily@luxeapparel.com", role: "Staff", avatar: "ER" },
];

export default function BusinessSettings() {
  const [teamMembers, setTeamMembers] = useState(initialTeam);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isCloseOpen, setIsCloseOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<typeof initialTeam[0] | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleInvite = () => {
    if (inviteEmail) {
      const name = inviteEmail.split('@')[0];
      setTeamMembers([...teamMembers, { name: name.charAt(0).toUpperCase() + name.slice(1), email: inviteEmail, role: "Staff", avatar: name.slice(0, 2).toUpperCase() }]);
      setIsInviteOpen(false);
      setInviteEmail("");
      toast.success("Team member invited!");
    }
  };

  const handleRemoveMember = () => {
    if (selectedMember) {
      setTeamMembers(teamMembers.filter(m => m.email !== selectedMember.email));
      setIsRemoveOpen(false);
      toast.success(`${selectedMember.name} removed from team.`);
    }
  };

  return (
    <AdminLayout type="business" title="Settings" subtitle="Manage your business settings">
      <div className="space-y-6 animate-slide-up max-w-4xl">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="bg-secondary border border-border">
            <TabsTrigger value="general" className="gap-2"><Store className="h-4 w-4" /> General</TabsTrigger>
            <TabsTrigger value="billing" className="gap-2"><CreditCard className="h-4 w-4" /> Billing</TabsTrigger>
            <TabsTrigger value="team" className="gap-2"><Users className="h-4 w-4" /> Team</TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">Business Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><Label htmlFor="businessName" className="text-foreground">Business Name</Label><Input id="businessName" defaultValue="Luxe Apparel LLC" className="mt-2 bg-secondary border-border" /></div>
                <div><Label htmlFor="businessEmail" className="text-foreground">Business Email</Label><Input id="businessEmail" type="email" defaultValue="hello@luxeapparel.com" className="mt-2 bg-secondary border-border" /></div>
                <div><Label htmlFor="phone" className="text-foreground">Phone Number</Label><Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="mt-2 bg-secondary border-border" /></div>
                <div><Label htmlFor="website" className="text-foreground">Website</Label><Input id="website" defaultValue="www.luxeapparel.com" className="mt-2 bg-secondary border-border" /></div>
                <div className="md:col-span-2"><Label htmlFor="address" className="text-foreground">Business Address</Label><Input id="address" defaultValue="123 Fashion Ave, Suite 400, Dallas, TX 75201" className="mt-2 bg-secondary border-border" /></div>
              </div>
              <div className="flex justify-end mt-6"><Button className="gradient-primary text-primary-foreground" onClick={() => toast.success("Business settings saved!")}>Save Changes</Button></div>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="mt-6">
            <div className="space-y-6">
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-6">Subscription Plan</h3>
                <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div><h4 className="font-semibold text-foreground">Small Business Plan</h4><p className="text-sm text-muted-foreground">$6.99/month • Renews Jan 15, 2026</p></div>
                  <Button variant="secondary" onClick={() => setIsPlanOpen(true)}>Change Plan</Button>
                </div>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-6">Payment Method</h3>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-4"><div className="h-10 w-14 rounded bg-secondary flex items-center justify-center"><CreditCard className="h-5 w-5 text-muted-foreground" /></div><div><p className="font-medium text-foreground">Visa ending in 4242</p><p className="text-sm text-muted-foreground">Expires 04/27</p></div></div>
                  <Button variant="secondary" size="sm" onClick={() => setIsPaymentOpen(true)}>Update</Button>
                </div>
              </div>
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-6">Payout Settings</h3>
                <div className="space-y-4">
                  <div><Label htmlFor="payoutAccount" className="text-foreground">Bank Account</Label><Input id="payoutAccount" defaultValue="**** **** **** 8765" className="mt-2 bg-secondary border-border" disabled /></div>
                  <div className="flex items-center justify-between"><div><p className="font-medium text-foreground">Automatic Payouts</p><p className="text-sm text-muted-foreground">Receive payouts weekly on Fridays</p></div><Switch defaultChecked onCheckedChange={(v) => toast.success(v ? "Automatic payouts enabled" : "Automatic payouts disabled")} /></div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="team" className="mt-6">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div><h3 className="font-display text-lg font-semibold text-foreground">Team Members</h3><p className="text-sm text-muted-foreground">Manage who has access to your business dashboard</p></div>
                <Button variant="secondary" onClick={() => setIsInviteOpen(true)}>Invite Member</Button>
              </div>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-4"><div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">{member.avatar}</div><div><p className="font-medium text-foreground">{member.name}</p><p className="text-sm text-muted-foreground">{member.email}</p></div></div>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 rounded-full bg-secondary text-sm font-medium text-muted-foreground">{member.role}</span>
                      {member.role !== "Owner" && <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => { setSelectedMember(member); setIsRemoveOpen(true); }}><Trash2 className="h-4 w-4" /></Button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">Notification Preferences</h3>
              <div className="space-y-6">
                {[
                  { title: "New Orders", description: "Get notified when you receive new orders" },
                  { title: "Low Stock Alerts", description: "Receive alerts when products are running low" },
                  { title: "Refund Requests", description: "Get notified when customers request refunds" },
                  { title: "Livestream Reminders", description: "Receive reminders before scheduled livestreams" },
                  { title: "Weekly Reports", description: "Receive weekly performance summaries" },
                  { title: "Policy Updates", description: "Get notified about policy approval status" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                    <div><h4 className="font-medium text-foreground">{item.title}</h4><p className="text-sm text-muted-foreground">{item.description}</p></div>
                    <Switch defaultChecked={index < 4} onCheckedChange={(checked) => toast.success(`${item.title} ${checked ? "enabled" : "disabled"}`)} />
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-xl p-6 mt-6 border border-destructive/20">
              <h3 className="font-display text-lg font-semibold text-destructive mb-4">Danger Zone</h3>
              <div className="p-4 rounded-lg bg-destructive/10">
                <h4 className="font-medium text-foreground mb-2">Close Store</h4>
                <p className="text-sm text-muted-foreground mb-4">Permanently close your store and remove all products. This action cannot be undone.</p>
                <Button variant="destructive" onClick={() => setIsCloseOpen(true)}>Close Store</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Invite Dialog */}
      <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Invite Team Member</DialogTitle></DialogHeader>
          <div className="py-4 space-y-4">
            <div><Label className="text-foreground">Email Address</Label><Input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} className="mt-2 bg-secondary border-border" placeholder="Enter email address..." /></div>
          </div>
          <DialogFooter><DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose><Button className="gradient-primary text-primary-foreground" onClick={handleInvite} disabled={!inviteEmail}>Send Invitation</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Member */}
      <Dialog open={isRemoveOpen} onOpenChange={setIsRemoveOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display text-destructive">Remove Team Member</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground py-4">Remove {selectedMember?.name} ({selectedMember?.email}) from the team? They will lose access to the business dashboard.</p>
          <DialogFooter><DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose><Button variant="destructive" onClick={handleRemoveMember}>Remove</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Plan */}
      <Dialog open={isPlanOpen} onOpenChange={setIsPlanOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Change Plan</DialogTitle></DialogHeader>
          <div className="py-4 space-y-4">
            {[
              { name: "Starter", price: "$3.99/mo", features: "Up to 20 products, basic analytics" },
              { name: "Small Business", price: "$6.99/mo", features: "Up to 100 products, livestreams, full analytics", current: true },
              { name: "Enterprise", price: "$19.99/mo", features: "Unlimited products, priority support, team access" },
            ].map(plan => (
              <div key={plan.name} className={`p-4 rounded-lg border ${plan.current ? "border-primary bg-primary/5" : "border-border"} cursor-pointer hover:border-primary/50 transition-colors`} onClick={() => { setIsPlanOpen(false); toast.success(`Switched to ${plan.name} plan!`); }}>
                <div className="flex items-center justify-between"><h4 className="font-medium text-foreground">{plan.name}</h4><span className="font-semibold text-primary">{plan.price}</span></div>
                <p className="text-sm text-muted-foreground mt-1">{plan.features}</p>
                {plan.current && <span className="text-xs text-primary font-medium">Current Plan</span>}
              </div>
            ))}
          </div>
          <DialogFooter><DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Payment */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Update Payment Method</DialogTitle></DialogHeader>
          <div className="py-4 space-y-4">
            <div><Label className="text-foreground">Card Number</Label><Input className="mt-2 bg-secondary border-border" placeholder="1234 5678 9012 3456" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label className="text-foreground">Expiry</Label><Input className="mt-2 bg-secondary border-border" placeholder="MM/YY" /></div>
              <div><Label className="text-foreground">CVV</Label><Input className="mt-2 bg-secondary border-border" placeholder="123" /></div>
            </div>
          </div>
          <DialogFooter><DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose><Button className="gradient-primary text-primary-foreground" onClick={() => { setIsPaymentOpen(false); toast.success("Payment method updated!"); }}>Update</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Close Store */}
      <Dialog open={isCloseOpen} onOpenChange={setIsCloseOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display text-destructive">Close Store</DialogTitle></DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">This action is permanent. All products, orders, and store data will be permanently deleted.</p>
            <div><Label className="text-foreground">Type "CLOSE STORE" to confirm</Label><Input className="mt-2 bg-secondary border-border" placeholder="CLOSE STORE" /></div>
          </div>
          <DialogFooter><DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose><Button variant="destructive" onClick={() => { setIsCloseOpen(false); toast.error("Store closure initiated. You will receive a confirmation email."); }}>Close Store Permanently</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
