import { useState } from "react";
import { AdminLayout } from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Building2, Globe, Mail, Phone, User, CreditCard, Shield } from "lucide-react";
import { toast } from "sonner";

export default function PublisherSettings() {
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <AdminLayout type="publisher" title="Settings" subtitle="Manage your publisher profile">
      <div className="space-y-6 animate-slide-up max-w-3xl">
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6"><Building2 className="h-5 w-5 text-primary" /><h3 className="font-display font-semibold text-foreground">Company Information</h3></div>
          <div className="grid gap-4 md:grid-cols-2">
            <div><Label className="text-foreground">Company Name</Label><Input defaultValue="Stellar Entertainment" className="mt-2 bg-secondary border-border" /></div>
            <div><Label className="text-foreground">Publisher Type</Label><Input defaultValue="Film & Television" className="mt-2 bg-secondary border-border" /></div>
            <div><Label className="text-foreground">Content Type</Label><Input defaultValue="Movies, TV Shows" className="mt-2 bg-secondary border-border" /></div>
            <div><Label className="text-foreground">Website</Label><div className="relative mt-2"><Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input defaultValue="stellarent.com" className="pl-10 bg-secondary border-border" /></div></div>
            <div className="md:col-span-2"><Label className="text-foreground">Company Description</Label><Textarea defaultValue="Stellar Entertainment is an independent film and television production company specializing in thriller and drama content." className="mt-2 bg-secondary border-border resize-none" rows={3} /></div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6"><User className="h-5 w-5 text-primary" /><h3 className="font-display font-semibold text-foreground">Contact Person</h3></div>
          <div className="grid gap-4 md:grid-cols-2">
            <div><Label className="text-foreground">Full Name</Label><Input defaultValue="Alex Johnson" className="mt-2 bg-secondary border-border" /></div>
            <div><Label className="text-foreground">Role / Title</Label><Input defaultValue="Content Director" className="mt-2 bg-secondary border-border" /></div>
            <div><Label className="text-foreground">Email</Label><div className="relative mt-2"><Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input defaultValue="alex@stellarent.com" className="pl-10 bg-secondary border-border" /></div></div>
            <div><Label className="text-foreground">Phone</Label><div className="relative mt-2"><Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input defaultValue="(555) 123-4567" className="pl-10 bg-secondary border-border" /></div></div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6"><CreditCard className="h-5 w-5 text-primary" /><h3 className="font-display font-semibold text-foreground">Subscription & Billing</h3></div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 mb-4">
            <div><p className="font-medium text-foreground">Publisher Plan</p><p className="text-sm text-muted-foreground">$3.99/month · Renews Mar 15, 2026</p></div>
            <Button variant="secondary" size="sm" onClick={() => setIsPlanOpen(true)}>Change Plan</Button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
            <div><p className="font-medium text-foreground">Payment Method</p><p className="text-sm text-muted-foreground">Visa •••• 5678 · Exp 08/27</p></div>
            <Button variant="secondary" size="sm" onClick={() => setIsPaymentOpen(true)}>Update</Button>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4"><Shield className="h-5 w-5 text-primary" /><h3 className="font-display font-semibold text-foreground">Privacy & Terms</h3></div>
          <div className="space-y-3">
            <Button variant="link" className="text-primary p-0 h-auto" onClick={() => setIsPrivacyOpen(true)}>View Privacy Policy</Button><br />
            <Button variant="link" className="text-primary p-0 h-auto" onClick={() => setIsTermsOpen(true)}>View Terms of Service</Button><br />
            <Button variant="link" className="text-destructive p-0 h-auto" onClick={() => setIsDeleteOpen(true)}>Delete Account</Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="gradient-primary text-primary-foreground" onClick={() => toast.success("Settings saved successfully!")}>Save Changes</Button>
        </div>
      </div>

      {/* Change Plan */}
      <Dialog open={isPlanOpen} onOpenChange={setIsPlanOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display">Change Plan</DialogTitle></DialogHeader>
          <div className="py-4 space-y-4">
            {[
              { name: "Basic Publisher", price: "$1.99/mo", features: "Up to 5 titles, basic analytics" },
              { name: "Publisher", price: "$3.99/mo", features: "Up to 25 titles, full analytics, priority review", current: true },
              { name: "Enterprise Publisher", price: "$14.99/mo", features: "Unlimited titles, dedicated support, API access" },
            ].map(plan => (
              <div key={plan.name} className={`p-4 rounded-lg border ${plan.current ? "border-primary bg-primary/5" : "border-border"} cursor-pointer hover:border-primary/50 transition-colors`} onClick={() => { setIsPlanOpen(false); toast.success(`Switched to ${plan.name}!`); }}>
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

      {/* Privacy Policy */}
      <Dialog open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen}>
        <DialogContent className="bg-card border-border sm:max-w-lg">
          <DialogHeader><DialogTitle className="font-display">Privacy Policy</DialogTitle></DialogHeader>
          <div className="py-4 max-h-96 overflow-y-auto">
            <p className="text-sm text-muted-foreground whitespace-pre-line">FVRD TV Privacy Policy{"\n\n"}Last updated: February 2026{"\n\n"}1. Information We Collect{"\n"}We collect information you provide directly, including name, email, company details, and payment information.{"\n\n"}2. How We Use Your Information{"\n"}We use your data to provide and improve our services, process payments, and communicate updates.{"\n\n"}3. Data Security{"\n"}We implement industry-standard security measures to protect your personal information.{"\n\n"}4. Contact{"\n"}For questions about this policy, email privacy@fvrd.tv</p>
          </div>
          <DialogFooter><DialogClose asChild><Button variant="secondary">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Terms of Service */}
      <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
        <DialogContent className="bg-card border-border sm:max-w-lg">
          <DialogHeader><DialogTitle className="font-display">Terms of Service</DialogTitle></DialogHeader>
          <div className="py-4 max-h-96 overflow-y-auto">
            <p className="text-sm text-muted-foreground whitespace-pre-line">FVRD TV Terms of Service{"\n\n"}Last updated: February 2026{"\n\n"}1. Acceptance of Terms{"\n"}By using FVRD TV, you agree to be bound by these terms.{"\n\n"}2. Publisher Responsibilities{"\n"}Publishers must ensure all submitted content is properly licensed and does not infringe on third-party rights.{"\n\n"}3. Content Guidelines{"\n"}All content must comply with FVRD TV content standards and applicable laws.{"\n\n"}4. Payments{"\n"}Revenue sharing and payment terms are outlined in your publisher agreement.</p>
          </div>
          <DialogFooter><DialogClose asChild><Button variant="secondary">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="font-display text-destructive">Delete Account</DialogTitle></DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">This action is permanent. All your content, analytics data, and publisher profile will be permanently deleted.</p>
            <div><Label className="text-foreground">Type "DELETE" to confirm</Label><Input className="mt-2 bg-secondary border-border" placeholder="DELETE" /></div>
          </div>
          <DialogFooter><DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose><Button variant="destructive" onClick={() => { setIsDeleteOpen(false); toast.error("Account deletion initiated."); }}>Delete Account</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
