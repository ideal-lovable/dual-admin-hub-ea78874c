import { AdminLayout } from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Shield, Bell, Globe, Database, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminSettings() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [newUserRegistration, setNewUserRegistration] = useState(true);
  const [contentAutoApproval, setContentAutoApproval] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(false);
  const [maintenanceDialog, setMaintenanceDialog] = useState(false);
  const [dangerDialog, setDangerDialog] = useState(false);
  const [dangerAction, setDangerAction] = useState("");

  const handleSaveGeneral = () => toast.success("General settings saved");
  const handleSaveSecurity = () => toast.success("Security settings saved");
  const handleSaveNotifications = () => toast.success("Notification settings saved");

  const handleMaintenanceToggle = (checked: boolean) => {
    if (checked) {
      setMaintenanceDialog(true);
    } else {
      setMaintenanceMode(false);
      toast.success("Maintenance mode disabled");
    }
  };

  const confirmMaintenance = () => {
    setMaintenanceMode(true);
    setMaintenanceDialog(false);
    toast.warning("Maintenance mode enabled — users will see a maintenance page");
  };

  const handleDangerAction = (action: string) => {
    setDangerAction(action);
    setDangerDialog(true);
  };

  const confirmDangerAction = () => {
    toast.success(`${dangerAction} completed`);
    setDangerDialog(false);
  };

  return (
    <AdminLayout type="admin" title="Platform Settings" subtitle="Configure global platform settings">
      <div className="space-y-6 animate-slide-up">
        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general"><Settings className="h-4 w-4 mr-2" />General</TabsTrigger>
            <TabsTrigger value="security"><Shield className="h-4 w-4 mr-2" />Security</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-2" />Notifications</TabsTrigger>
            <TabsTrigger value="advanced"><Database className="h-4 w-4 mr-2" />Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="glass-card rounded-xl p-6 space-y-6">
              <h3 className="font-display text-lg font-semibold text-foreground">General Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Platform Name</Label>
                  <Input defaultValue="FVRD TV" className="mt-1 bg-secondary border-border" />
                </div>
                <div>
                  <Label>Support Email</Label>
                  <Input defaultValue="support@fvrd.tv" className="mt-1 bg-secondary border-border" />
                </div>
                <div>
                  <Label>Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="mt-1 bg-secondary border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger className="mt-1 bg-secondary border-border"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Platform Description</Label>
                <Textarea defaultValue="FVRD TV - The next generation streaming and commerce platform" className="mt-1 bg-secondary border-border" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                <div>
                  <p className="text-sm font-medium text-foreground">New User Registration</p>
                  <p className="text-xs text-muted-foreground">Allow new users to sign up</p>
                </div>
                <Switch checked={newUserRegistration} onCheckedChange={setNewUserRegistration} />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                <div>
                  <p className="text-sm font-medium text-foreground">Content Auto-Approval</p>
                  <p className="text-xs text-muted-foreground">Auto-approve content from verified creators</p>
                </div>
                <Switch checked={contentAutoApproval} onCheckedChange={setContentAutoApproval} />
              </div>
              <Button onClick={handleSaveGeneral} className="gradient-primary text-primary-foreground">Save General Settings</Button>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="glass-card rounded-xl p-6 space-y-6">
              <h3 className="font-display text-lg font-semibold text-foreground">Security Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Require 2FA for all admin accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">IP Rate Limiting</p>
                    <p className="text-xs text-muted-foreground">Limit API requests per IP address</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Label>Max Login Attempts</Label>
                  <Input type="number" defaultValue="5" className="mt-1 bg-secondary border-border max-w-[200px]" />
                </div>
                <div>
                  <Label>Session Timeout (minutes)</Label>
                  <Input type="number" defaultValue="60" className="mt-1 bg-secondary border-border max-w-[200px]" />
                </div>
              </div>
              <Button onClick={handleSaveSecurity} className="gradient-primary text-primary-foreground">Save Security Settings</Button>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="glass-card rounded-xl p-6 space-y-6">
              <h3 className="font-display text-lg font-semibold text-foreground">Notification Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Receive critical alerts via email</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">Slack Notifications</p>
                    <p className="text-xs text-muted-foreground">Send alerts to Slack channel</p>
                  </div>
                  <Switch checked={slackNotifications} onCheckedChange={setSlackNotifications} />
                </div>
                {slackNotifications && (
                  <div>
                    <Label>Slack Webhook URL</Label>
                    <Input placeholder="https://hooks.slack.com/services/..." className="mt-1 bg-secondary border-border" />
                  </div>
                )}
                <div>
                  <Label>Alert Email Recipients</Label>
                  <Input defaultValue="admin@fvrd.tv, ops@fvrd.tv" className="mt-1 bg-secondary border-border" />
                </div>
              </div>
              <Button onClick={handleSaveNotifications} className="gradient-primary text-primary-foreground">Save Notification Settings</Button>
            </div>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="space-y-6">
              <div className="glass-card rounded-xl p-6 space-y-6">
                <h3 className="font-display text-lg font-semibold text-foreground">Maintenance Mode</h3>
                <div className="flex items-center justify-between p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <div>
                    <p className="text-sm font-medium text-foreground">Enable Maintenance Mode</p>
                    <p className="text-xs text-muted-foreground">Temporarily disable platform access for users</p>
                  </div>
                  <Switch checked={maintenanceMode} onCheckedChange={handleMaintenanceToggle} />
                </div>
              </div>

              <div className="glass-card rounded-xl p-6 space-y-4">
                <h3 className="font-display text-lg font-semibold text-destructive">Danger Zone</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/20">
                    <div>
                      <p className="text-sm font-medium text-foreground">Clear All Cache</p>
                      <p className="text-xs text-muted-foreground">Clear platform-wide cache data</p>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => handleDangerAction("Clear cache")}><Trash2 className="h-4 w-4 mr-2" />Clear</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/20">
                    <div>
                      <p className="text-sm font-medium text-foreground">Reset Analytics Data</p>
                      <p className="text-xs text-muted-foreground">Reset all analytics counters</p>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => handleDangerAction("Reset analytics")}><Trash2 className="h-4 w-4 mr-2" />Reset</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/20">
                    <div>
                      <p className="text-sm font-medium text-foreground">Purge Flagged Content</p>
                      <p className="text-xs text-muted-foreground">Remove all flagged content permanently</p>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => handleDangerAction("Purge flagged content")}><Trash2 className="h-4 w-4 mr-2" />Purge</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Maintenance Confirmation */}
      <Dialog open={maintenanceDialog} onOpenChange={setMaintenanceDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Enable Maintenance Mode?</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">This will temporarily disable platform access for all non-admin users. They will see a maintenance page instead.</p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setMaintenanceDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmMaintenance}>Enable Maintenance Mode</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Danger Confirmation */}
      <Dialog open={dangerDialog} onOpenChange={setDangerDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Confirm Action</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Are you sure you want to <span className="text-destructive font-medium">{dangerAction.toLowerCase()}</span>? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDangerDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDangerAction}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
