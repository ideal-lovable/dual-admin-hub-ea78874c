import { ReactNode, useState, useEffect, useCallback } from "react";
import { SuperAdminSidebar } from "@/components/admin/SuperAdminSidebar";
import { Link, useLocation } from "react-router-dom";
import {
  Search, Bell, User, Plus, UserPlus, CheckCircle, Video, Store as StoreIcon,
  Command as CommandIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

interface SuperAdminLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; path?: string }[];
}

const quickSearchItems = [
  { group: "Pages", items: [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "All Users", path: "/admin/users" },
    { label: "Content Moderation", path: "/admin/content" },
    { label: "All Storefronts", path: "/admin/storefronts" },
    { label: "Orders", path: "/admin/commerce/orders" },
    { label: "Analytics", path: "/admin/analytics" },
    { label: "Livestream Calendar", path: "/admin/calendar" },
    { label: "Discover & Curation", path: "/admin/discover/banner" },
    { label: "Automation", path: "/admin/automation/emails" },
    { label: "Roles & Permissions", path: "/admin/controls/roles" },
    { label: "Platform Config", path: "/admin/config/categories" },
  ]},
  { group: "Actions", items: [
    { label: "Add User", path: "/admin/users" },
    { label: "Approve Content", path: "/admin/content/approval" },
    { label: "Create Livestream", path: "/admin/calendar" },
    { label: "Add Storefront", path: "/admin/storefronts" },
  ]},
];

const alerts = [
  { text: "5 livestreams pending approval", type: "secondary" as const, badge: "WARN" },
  { text: "3 stores flagged for review", type: "destructive" as const, badge: "CRIT" },
  { text: "Payment failures increased 12%", type: "destructive" as const, badge: "CRIT" },
  { text: "New creator verification requests (8)", type: "default" as const, badge: "INFO" },
];

export function SuperAdminLayout({ children, title, subtitle, breadcrumbs }: SuperAdminLayoutProps) {
  const [cmdOpen, setCmdOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCmdOpen(o => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SuperAdminSidebar />

      <div className="ml-[272px] transition-all duration-300">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-6">
          <div className="flex items-center gap-4">
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav className="flex items-center gap-1 text-sm">
                {breadcrumbs.map((crumb, i) => (
                  <span key={i} className="flex items-center gap-1">
                    {i > 0 && <span className="text-muted-foreground/50 mx-1">/</span>}
                    {crumb.path ? (
                      <Link to={crumb.path} className="text-muted-foreground hover:text-foreground transition-colors">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-foreground font-medium">{crumb.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Command Palette Trigger */}
            <button
              onClick={() => setCmdOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Search...</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                <CommandIcon className="h-2.5 w-2.5" />K
              </kbd>
            </button>

            {/* Quick Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="h-8 gap-1.5 gradient-primary text-primary-foreground shadow-glow text-xs">
                  <Plus className="h-3.5 w-3.5" />
                  Quick Action
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="text-xs">Quick Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to="/admin/users" className="flex items-center gap-2"><UserPlus className="h-3.5 w-3.5" /> Add User</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/admin/content/approval" className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5" /> Approve Content</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/admin/calendar" className="flex items-center gap-2"><Video className="h-3.5 w-3.5" /> Create Livestream</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/admin/storefronts" className="flex items-center gap-2"><StoreIcon className="h-3.5 w-3.5" /> Add Storefront</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Alerts */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-8 w-8">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground flex items-center justify-center">
                    {alerts.length}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel className="text-xs">Alerts</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {alerts.map((a, i) => (
                  <DropdownMenuItem key={i} className="flex items-start gap-2 py-2">
                    <Badge variant={a.type} className="text-[10px] shrink-0 mt-0.5">{a.badge}</Badge>
                    <span className="text-xs">{a.text}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile */}
            <button className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center">
              <User className="h-3.5 w-3.5 text-primary-foreground" />
            </button>
          </div>
        </header>

        {/* Page Header */}
        <div className="px-6 pt-6 pb-4">
          <h1 className="font-display text-2xl font-bold text-foreground">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>

        {/* Content */}
        <main className="px-6 pb-8">
          {children}
        </main>
      </div>

      {/* Command Palette */}
      <Dialog open={cmdOpen} onOpenChange={setCmdOpen}>
        <DialogContent className="p-0 max-w-lg overflow-hidden border-border">
          <Command className="bg-popover">
            <CommandInput placeholder="Search pages, users, stores, content, orders..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {quickSearchItems.map((group) => (
                <CommandGroup key={group.group} heading={group.group}>
                  {group.items.map((item) => (
                    <CommandItem key={item.label} asChild onSelect={() => setCmdOpen(false)}>
                      <Link to={item.path} className="flex items-center gap-2 cursor-pointer">
                        {item.label}
                      </Link>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
}
