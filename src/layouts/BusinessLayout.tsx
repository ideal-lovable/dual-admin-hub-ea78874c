import { ReactNode, useState } from "react";
import { BusinessSidebar } from "@/components/business/BusinessSidebar";
import { Link } from "react-router-dom";
import { Bell, User, Plus, Radio, Search, X, ShoppingCart, Package, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";

interface BusinessLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; path?: string }[];
  actions?: ReactNode;
}

const notifications = [
  { id: 1, icon: ShoppingCart, text: "New order #12350 from Emma Wilson", time: "2 min ago", type: "order" as const, read: false },
  { id: 2, icon: AlertTriangle, text: "Low stock: Area Rug - Beige (2 left)", time: "1 hour ago", type: "warning" as const, read: false },
  { id: 3, icon: Package, text: "Order #12348 shipped successfully", time: "2 hours ago", type: "success" as const, read: true },
  { id: 4, icon: CheckCircle, text: "Return policy approved by FVRD TV", time: "5 hours ago", type: "success" as const, read: true },
];

export function BusinessLayout({ children, title, subtitle, breadcrumbs, actions }: BusinessLayoutProps) {
  const isMobile = useIsMobile();
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <BusinessSidebar />

      <div className={isMobile ? "ml-0" : "ml-[270px] transition-all duration-300"}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-4 md:px-6">
          <div className="flex items-center gap-4">
            {isMobile && <div className="w-9" />}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav className="flex items-center gap-1 text-sm">
                {breadcrumbs.map((crumb, i) => (
                  <span key={i} className="flex items-center gap-1">
                    {i > 0 && <span className="text-muted-foreground/40 mx-1">/</span>}
                    {crumb.path ? (
                      <Link to={crumb.path} className="text-muted-foreground hover:text-foreground transition-colors text-xs">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-foreground font-medium text-xs">{crumb.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-1.5 md:gap-2">
            {/* Search */}
            {searchOpen ? (
              <div className="flex items-center gap-2 animate-scale-in">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search..." className="w-48 md:w-64 pl-9 h-8 bg-secondary border-border text-xs rounded-xl" autoFocus />
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSearchOpen(false)}>
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl text-muted-foreground hover:text-foreground" onClick={() => setSearchOpen(true)}>
                <Search className="h-4 w-4" />
              </Button>
            )}

            {actions || (
              <>
                <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs hidden sm:flex rounded-xl" asChild>
                  <Link to="/business/products">
                    <Plus className="h-3.5 w-3.5" />
                    Add Product
                  </Link>
                </Button>
                <Button size="sm" className="h-8 gap-1.5 text-xs bg-destructive hover:bg-destructive/90 text-destructive-foreground hidden sm:flex rounded-xl" asChild>
                  <Link to="/business/livestreams">
                    <Radio className="h-3.5 w-3.5" />
                    Request Live
                  </Link>
                </Button>
              </>
            )}

            {/* Notifications */}
            <div className="relative">
              <button
                className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                onClick={() => setNotifOpen(!notifOpen)}
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive animate-pulse" />
                )}
              </button>

              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 z-50 w-80 md:w-96 glass-card rounded-2xl border border-border shadow-elevated animate-scale-in overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b border-border">
                      <h3 className="font-display text-sm font-semibold text-foreground">Notifications</h3>
                      {unreadCount > 0 && (
                        <Badge variant="secondary" className="text-[10px]">{unreadCount} new</Badge>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notif) => {
                        const Icon = notif.icon;
                        return (
                          <div
                            key={notif.id}
                            className={`flex items-start gap-3 p-3.5 hover:bg-secondary/30 transition-colors cursor-pointer border-b border-border/50 last:border-0 ${!notif.read ? "bg-primary/5" : ""}`}
                          >
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                              notif.type === "warning" ? "bg-warning/15" : notif.type === "success" ? "bg-success/15" : "bg-primary/15"
                            }`}>
                              <Icon className={`h-3.5 w-3.5 ${
                                notif.type === "warning" ? "text-warning" : notif.type === "success" ? "text-success" : "text-primary"
                              }`} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-foreground leading-relaxed">{notif.text}</p>
                              <p className="text-[11px] text-muted-foreground/60 mt-0.5">{notif.time}</p>
                            </div>
                            {!notif.read && <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                          </div>
                        );
                      })}
                    </div>
                    <div className="p-3 border-t border-border">
                      <Link to="/business/messages" onClick={() => setNotifOpen(false)}>
                        <Button variant="ghost" size="sm" className="w-full text-xs text-primary">View All Notifications</Button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile */}
            <button className="h-8 w-8 rounded-xl gradient-primary flex items-center justify-center shadow-sm hover:shadow-glow transition-shadow">
              <User className="h-3.5 w-3.5 text-primary-foreground" />
            </button>
          </div>
        </header>

        {/* Page Header */}
        <div className="px-4 md:px-6 pt-6 pb-4">
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>

        {/* Content */}
        <main className="px-4 md:px-6 pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}
