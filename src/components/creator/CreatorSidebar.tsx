import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, PlayCircle, Radio, CalendarDays, ShoppingBag,
  BarChart3, Bell, Settings, ChevronDown, PanelLeftClose, PanelLeft,
  Upload, Clock, TrendingUp, Package
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import fvrdLogo from "@/assets/fvrd-logo.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PanelSwitcher } from "@/components/PanelSwitcher";
import {
  Tooltip, TooltipContent, TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  id: string;
  icon: any;
  label: string;
  path?: string;
  children?: { label: string; path: string; icon?: any }[];
}

const navItems: NavItem[] = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/creator/dashboard" },
  {
    id: "content", icon: PlayCircle, label: "My Content",
    children: [
      { label: "Videos", path: "/creator/content/videos", icon: PlayCircle },
      { label: "Livestreams", path: "/creator/content/livestreams", icon: Radio },
      { label: "Scheduled", path: "/creator/content/scheduled", icon: Clock },
    ],
  },
  {
    id: "livestreams", icon: Radio, label: "Live Requests",
    children: [
      { label: "Request Live", path: "/creator/live/create", icon: Radio },
      { label: "Schedule", path: "/creator/live/schedule", icon: CalendarDays },
    ],
  },
  {
    id: "products", icon: ShoppingBag, label: "Products",
    children: [
      { label: "Assigned Products", path: "/creator/products/assigned", icon: Package },
      { label: "Performance", path: "/creator/products/performance", icon: TrendingUp },
    ],
  },
  { id: "analytics", icon: BarChart3, label: "Analytics", path: "/creator/analytics" },
  { id: "notifications", icon: Bell, label: "Notifications", path: "/creator/notifications" },
  { id: "settings", icon: Settings, label: "Settings", path: "/creator/settings" },
];

export function CreatorSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const getActiveSection = (pathname: string) => {
    for (const item of navItems) {
      if (item.path && pathname === item.path) return item.id;
      if (item.children?.some(c => pathname === c.path || pathname.startsWith(c.path + "/"))) return item.id;
    }
    return "dashboard";
  };

  const [openSection, setOpenSection] = useState<string | null>(getActiveSection(location.pathname));

  useEffect(() => {
    setOpenSection(getActiveSection(location.pathname));
  }, [location.pathname]);

  const handleToggle = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300",
      collapsed ? "w-[72px]" : "w-[270px]"
    )}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className={cn(
          "flex items-center shrink-0 border-b border-sidebar-border",
          collapsed ? "justify-center px-3 h-16" : "justify-between px-5 h-16"
        )}>
          <Link to="/creator/dashboard" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/15 flex items-center justify-center overflow-hidden shadow-sm">
              <img src={fvrdLogo} alt="FVRD TV" className="h-6 w-auto" />
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-bold text-foreground tracking-tight">FVRD TV</p>
                <p className="text-[10px] font-medium text-primary tracking-wide uppercase">Creator Studio</p>
              </div>
            )}
          </Link>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="p-2 rounded-lg text-muted-foreground/60 hover:text-foreground hover:bg-secondary/60 transition-all duration-200"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          )}
        </div>

        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="mx-auto mt-4 p-2 rounded-lg text-muted-foreground/60 hover:text-foreground hover:bg-secondary/60 transition-all duration-200"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        )}

        {/* Quick Actions */}
        {!collapsed && (
          <div className="px-4 py-3 border-b border-sidebar-border">
            <div className="flex gap-2">
              <Link
                to="/creator/content/videos"
                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-primary/15 text-primary text-[11px] font-semibold py-2 hover:bg-primary/25 transition-colors"
              >
                <Upload className="h-3.5 w-3.5" />
                Upload
              </Link>
              <Link
                to="/creator/live/create"
                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-destructive/15 text-destructive text-[11px] font-semibold py-2 hover:bg-destructive/25 transition-colors"
              >
                <Radio className="h-3.5 w-3.5" />
                Request Live
              </Link>
            </div>
          </div>
        )}

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav className={cn("space-y-1", collapsed ? "px-2" : "px-3")}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isOpen = openSection === item.id;
              const hasChildren = !!item.children?.length;
              const isActive = item.path
                ? location.pathname === item.path
                : item.children?.some(c => location.pathname === c.path) || false;

              const trigger = (
                <button
                  onClick={() => hasChildren ? handleToggle(item.id) : undefined}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all duration-200 group",
                    isActive || isOpen
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:bg-accent/8 hover:text-foreground"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center h-8 w-8 rounded-lg shrink-0 transition-all duration-200",
                    isActive || isOpen
                      ? "bg-primary/15 text-primary shadow-sm"
                      : "bg-secondary/60 text-muted-foreground group-hover:bg-secondary group-hover:text-foreground"
                  )}>
                    <Icon className="h-[18px] w-[18px]" />
                  </div>
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      {hasChildren && (
                        <ChevronDown className={cn(
                          "h-3.5 w-3.5 text-muted-foreground/50 transition-transform duration-300",
                          isOpen && "rotate-180"
                        )} />
                      )}
                    </>
                  )}
                </button>
              );

              return (
                <div key={item.id}>
                  {collapsed ? (
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        {item.path ? <Link to={item.path}>{trigger}</Link> : trigger}
                      </TooltipTrigger>
                      <TooltipContent side="right" className="font-semibold text-xs">
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    item.path ? <Link to={item.path}>{trigger}</Link> : trigger
                  )}

                  {isOpen && hasChildren && !collapsed && (
                    <div className="mt-1.5 mb-1 space-y-0.5 animate-accordion-down">
                      {item.children!.map((child) => {
                        const ChildIcon = child.icon;
                        const childActive = location.pathname === child.path;
                        return (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={cn(
                              "flex items-center gap-2.5 rounded-lg px-3 py-[7px] text-[12px] font-medium transition-all duration-200 ml-5",
                              childActive
                                ? "text-primary bg-primary/10"
                                : "text-muted-foreground/80 hover:text-foreground hover:bg-accent/10"
                            )}
                          >
                            {ChildIcon && <ChildIcon className="h-3.5 w-3.5 opacity-70" />}
                            <span className="truncate">{child.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <PanelSwitcher collapsed={collapsed} />
      </div>
    </aside>
  );
}
