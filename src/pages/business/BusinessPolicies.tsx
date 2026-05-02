import { useState } from "react";
import { BusinessLayout } from "@/layouts/BusinessLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { FileText, Truck, RefreshCw, Shield, Edit, Check, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface Policy {
  id: string; title: string; icon: typeof Truck; status: "complete" | "incomplete"; content: string;
}

const initialPolicies: Policy[] = [
  { id: "shipping", title: "Shipping Policy", icon: Truck, status: "complete", content: `All orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed the following business day.\n\nStandard Shipping: 5-7 business days ($5.99)\nExpress Shipping: 2-3 business days ($12.99)\nFree shipping on orders over $75.\n\nWe currently ship to all 50 US states. International shipping is not available at this time.` },
  { id: "returns", title: "Return Policy", icon: RefreshCw, status: "complete", content: `We accept returns within 30 days of purchase. Items must be unworn, unwashed, and in original condition with all tags attached.\n\nTo initiate a return:\n1. Contact us at returns@luxeapparel.com\n2. Receive your prepaid return label\n3. Ship items back within 14 days\n\nRefunds are processed within 5-7 business days after we receive your return.` },
  { id: "refund", title: "Refund Policy", icon: Shield, status: "incomplete", content: "" },
];

export default function BusinessPolicies() {
  const [policies, setPolicies] = useState<Policy[]>(initialPolicies);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);
  const [customTitle, setCustomTitle] = useState("");
  const [customContent, setCustomContent] = useState("");

  const handleEditOpen = (policy: Policy) => {
    setEditingPolicy({ ...policy });
    setIsEditOpen(true);
  };

  const handleSavePolicy = () => {
    if (editingPolicy) {
      setPolicies(policies.map(p => p.id === editingPolicy.id ? { ...editingPolicy, status: editingPolicy.content ? "complete" : "incomplete" } : p));
      setIsEditOpen(false);
      toast.success(`${editingPolicy.title} saved!`);
    }
  };

  const handleAddCustom = () => {
    if (!customTitle || !customContent) { toast.error("Please fill in both title and content"); return; }
    const newPolicy: Policy = { id: customTitle.toLowerCase().replace(/\s+/g, '-'), title: customTitle, icon: FileText, status: "complete", content: customContent };
    setPolicies([...policies, newPolicy]);
    setCustomTitle("");
    setCustomContent("");
    toast.success("Custom policy added!");
  };

  return (
    <BusinessLayout title="Policies" subtitle="Manage your store policies" breadcrumbs={[{ label: "Business", path: "/business/dashboard" }, { label: "Policies" }]}>
      <div className="space-y-6 animate-slide-up">
        <div className="glass-card rounded-xl p-6 border-l-4 border-primary">
          <div className="flex items-start gap-4">
            <FileText className="h-6 w-6 text-primary flex-shrink-0" />
            <div><h3 className="font-display font-semibold text-foreground mb-2">Store Policies</h3><p className="text-sm text-muted-foreground">Clear policies help build trust with your customers. All policies are displayed on your storefront and must be approved by FVRD TV before going live.</p></div>
          </div>
        </div>

        <div className="space-y-6">
          {policies.map((policy) => {
            const Icon = policy.icon;
            const isComplete = policy.status === "complete";
            return (
              <div key={policy.id} className="glass-card rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${isComplete ? "bg-success/10" : "bg-warning/10"}`}>
                      <Icon className={`h-5 w-5 ${isComplete ? "text-success" : "text-warning"}`} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{policy.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {isComplete ? (<><Check className="h-4 w-4 text-success" /><span className="text-sm text-success">Complete</span></>) : (<><AlertTriangle className="h-4 w-4 text-warning" /><span className="text-sm text-warning">Incomplete</span></>)}
                      </div>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" className="gap-2" onClick={() => handleEditOpen(policy)}>
                    <Edit className="h-4 w-4" /> {isComplete ? "Edit" : "Add"}
                  </Button>
                </div>
                <div className="p-6">
                  {isComplete ? (
                    <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans bg-transparent p-0 m-0">{policy.content}</pre>
                  ) : (
                    <div className="text-center py-8">
                      <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
                      <h4 className="font-medium text-foreground mb-2">Policy Not Set</h4>
                      <p className="text-sm text-muted-foreground mb-4">Add your {policy.title.toLowerCase()} to complete your store setup</p>
                      <Button className="gradient-primary text-primary-foreground" onClick={() => handleEditOpen(policy)}>Add Policy</Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="glass-card rounded-xl p-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Add Custom Policy</h3>
          <p className="text-sm text-muted-foreground mb-4">Need to add additional policies? Create a custom policy section for your storefront.</p>
          <div className="space-y-4">
            <div><Label htmlFor="policyTitle" className="text-foreground">Policy Title</Label><Input id="policyTitle" value={customTitle} onChange={(e) => setCustomTitle(e.target.value)} placeholder="e.g., Terms of Service, Privacy Policy" className="mt-2 bg-secondary border-border" /></div>
            <div><Label htmlFor="policyContent" className="text-foreground">Policy Content</Label><Textarea id="policyContent" rows={6} value={customContent} onChange={(e) => setCustomContent(e.target.value)} placeholder="Enter your policy details..." className="mt-2 bg-secondary border-border resize-none" /></div>
            <Button variant="secondary" onClick={handleAddCustom}>Add Custom Policy</Button>
          </div>
        </div>
      </div>

      {/* Edit Policy Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-card border-border sm:max-w-lg">
          <DialogHeader><DialogTitle className="font-display">{editingPolicy?.content ? "Edit" : "Add"} {editingPolicy?.title}</DialogTitle></DialogHeader>
          {editingPolicy && (
            <div className="py-4">
              <Label className="text-foreground">Policy Content</Label>
              <Textarea value={editingPolicy.content} onChange={(e) => setEditingPolicy({ ...editingPolicy, content: e.target.value })} rows={10} className="mt-2 bg-secondary border-border resize-none" placeholder="Enter your policy details..." />
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
            <Button className="gradient-primary text-primary-foreground" onClick={handleSavePolicy} disabled={!editingPolicy?.content}>Save Policy</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </BusinessLayout>
  );
}
