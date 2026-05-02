import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutGrid, Users, Store, PlayCircle, ShoppingBag, CalendarDays,
  ShieldCheck, ChevronDown, ChevronRight, Activity, Wallet, Radio, Package,
  Film, Music, Headphones, Gamepad2, UserCheck, Flag, Layers, Tag,
  PanelLeftClose, PanelLeft, Clock, CircleDot, Star, FileText, DollarSign,
  Target, Compass, Sparkles, Settings, SlidersHorizontal, Mail, Search,
  Heart, Megaphone, Shield, UserX, CheckCircle, ClipboardList, Upload
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import fvrdLogo from "@/assets/fvrd-logo.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PanelSwitcher } from "@/components/PanelSwitcher";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavChild {
  label: string;
  path: string;
  icon?: any;
  children?: NavChild[];
}

interface NavSection {
  id: string;
  icon: any;
  label: string;
  path?: string;
  group?: "control" | "operations" | "analytics" | "system";
  children?: NavChild[];
}

const navSections: NavSection[] = [
  {
    id: "control-center",
    icon: LayoutGrid,
    label: "Control Center",
    group: "control",
    children: [
      { label: "Overview", path: "/admin/dashboard", icon: LayoutGrid },
      { label: "Platform Health", path: "/admin/dashboard/health", icon: Activity },
      { label: "Live Metrics", path: "/admin/dashboard/live", icon: Radio },
      { label: "Revenue Snapshot", path: "/admin/dashboard/revenue", icon: Wallet },
      { label: "Activity Feed", path: "/admin/dashboard/activity", icon: Clock },
    ],
  },
  {
    id: "approval",
    icon: UserCheck,
    label: "Approval Center",
    group: "control",
    children: [
      { label: "Content Review", path: "/admin/content/approval", icon: PlayCircle },
      { label: "Storefront Review", path: "/admin/storefronts/pending", icon: Store },
      { label: "Creator Verification", path: "/admin/users/verification", icon: Users },
    ],
  },
  {
    id: "moderation",
    icon: ShieldCheck,
    label: "Moderation",
    group: "control",
    children: [
      { label: "Flagged Content", path: "/admin/content/flagged", icon: Flag },
      { label: "Reports", path: "/admin/users/reports", icon: Flag },
      { label: "Policy Queue", path: "/admin/storefronts/compliance", icon: ShieldCheck },
    ],
  },
  {
    id: "users",
    icon: Users,
    label: "Users",
    group: "operations",
    children: [
      { label: "All Users", path: "/admin/users", icon: Users },
      { label: "Subscribers", path: "/admin/users/subscribers", icon: Heart },
      { label: "Creators", path: "/admin/users/creators", icon: Users },
      { label: "Businesses", path: "/admin/users/businesses", icon: Store },
      { label: "Publishers", path: "/admin/users/publishers", icon: Megaphone },
      { label: "Admins", path: "/admin/users/admins", icon: Shield },
      { label: "Flagged", path: "/admin/users/suspended", icon: UserX },
      { label: "Verification", path: "/admin/users/verification", icon: CheckCircle },
      { label: "Activity Logs", path: "/admin/users/logs", icon: ClipboardList },
      { label: "Reports", path: "/admin/users/reports", icon: Flag },
    ],
  },
  {
    id: "storefronts",
    icon: Store,
    label: "Storefronts",
    group: "operations",
    children: [
      { label: "All Storefronts", path: "/admin/storefronts", icon: Store },
      { label: "Pending", path: "/admin/storefronts/pending", icon: Clock },
      { label: "Featured", path: "/admin/storefronts/featured", icon: Star },
      { label: "Categories", path: "/admin/storefronts/categories", icon: Tag },
      { label: "Compliance", path: "/admin/storefronts/compliance", icon: FileText },
      { label: "Products", path: "/admin/storefronts/products", icon: Package },
      { label: "Refunds", path: "/admin/storefronts/refunds", icon: Wallet },
    ],
  },
  {
    id: "content",
    icon: PlayCircle,
    label: "Content",
    group: "operations",
    children: [
      { label: "All Content", path: "/admin/content", icon: PlayCircle },
      { label: "Upload Content", path: "/admin/content/new", icon: Upload },
      { label: "Movies", path: "/admin/content/movies", icon: Film },
      { label: "Series", path: "/admin/content/series", icon: Layers },
      { label: "Videos", path: "/admin/content/videos", icon: PlayCircle },
      { label: "Music", path: "/admin/content/music", icon: Music },
      { label: "Podcasts", path: "/admin/content/podcasts", icon: Headphones },
      { label: "Games", path: "/admin/content/games", icon: Gamepad2 },
      { label: "Livestreams", path: "/admin/content/livestreams", icon: Radio },
      { label: "Approvals", path: "/admin/content/approval", icon: UserCheck },
      { label: "Flagged", path: "/admin/content/flagged", icon: Flag },
      { label: "Categories", path: "/admin/content/categories", icon: Tag },
      { label: "Genres", path: "/admin/content/genres", icon: Tag },
    ],
  },
  {
    id: "commerce",
    icon: ShoppingBag,
    label: "Commerce",
    group: "operations",
    children: [
      { label: "Orders", path: "/admin/commerce/orders", icon: ShoppingBag },
      { label: "Transactions", path: "/admin/commerce/transactions", icon: DollarSign },
      { label: "Refunds", path: "/admin/commerce/refunds", icon: Wallet },
      { label: "Payouts", path: "/admin/commerce/payouts", icon: Wallet },
      { label: "Conversion", path: "/admin/commerce/conversion", icon: Target },
    ],
  },
  {
    id: "calendar",
    icon: CalendarDays,
    label: "Livestream Calendar",
    group: "operations",
    children: [
      { label: "Calendar View", path: "/admin/calendar", icon: CalendarDays },
      { label: "Scheduled", path: "/admin/calendar/scheduled", icon: Clock },
      { label: "Live Now", path: "/admin/calendar/live", icon: Radio },
      { label: "Conflicts", path: "/admin/calendar/conflicts", icon: Flag },
    ],
  },
  {
    id: "discover",
    icon: Compass,
    label: "Discover & Curation",
    group: "analytics",
    children: [
      { label: "Banners", path: "/admin/discover/banner", icon: Sparkles },
      { label: "Watch Rail", path: "/admin/discover/watch", icon: PlayCircle },
      { label: "Buy Rail", path: "/admin/discover/buy", icon: ShoppingBag },
      { label: "Trending", path: "/admin/discover/trending", icon: Activity },
      { label: "Creator Picks", path: "/admin/discover/picks", icon: Star },
      { label: "Events", path: "/admin/discover/events", icon: CalendarDays },
    ],
  },
  {
    id: "analytics",
    icon: Activity,
    label: "Analytics",
    group: "analytics",
    children: [
      { label: "Users", path: "/admin/analytics", icon: Users },
      { label: "Revenue", path: "/admin/analytics/revenue", icon: DollarSign },
      { label: "Content", path: "/admin/analytics/content", icon: PlayCircle },
      { label: "Livestreams", path: "/admin/analytics/livestreams", icon: Radio },
      { label: "Stores", path: "/admin/analytics/stores", icon: Store },
      { label: "Funnels", path: "/admin/analytics/funnels", icon: Target },
      { label: "Advanced", path: "/admin/analytics/advanced", icon: Activity },
    ],
  },
  {
    id: "mapping",
    icon: UserCheck,
    label: "Creator Mapping",
    group: "analytics",
    children: [
      { label: "Access", path: "/admin/mapping/access", icon: UserCheck },
      { label: "Permissions", path: "/admin/mapping/permissions", icon: ShieldCheck },
      { label: "Partnerships", path: "/admin/mapping/partnerships", icon: Store },
    ],
  },
  {
    id: "automation",
    icon: Mail,
    label: "Automation",
    group: "system",
    children: [
      { label: "Email Templates", path: "/admin/automation/emails", icon: Mail },
      { label: "Triggers", path: "/admin/automation/triggers", icon: Activity },
      { label: "Logs", path: "/admin/automation/logs", icon: ClipboardList },
      { label: "Failed Jobs", path: "/admin/automation/failed", icon: Flag },
    ],
  },
  {
    id: "controls",
    icon: ShieldCheck,
    label: "Admin Controls",
    group: "system",
    children: [
      { label: "Roles", path: "/admin/controls/roles", icon: Shield },
      { label: "Sub Admins", path: "/admin/controls/sub-admins", icon: Users },
      { label: "Audit Logs", path: "/admin/controls/audit", icon: ClipboardList },
      { label: "System", path: "/admin/controls/system", icon: Settings },
    ],
  },
  {
    id: "config",
    icon: SlidersHorizontal,
    label: "Platform Config",
    group: "system",
    children: [
      { label: "Categories", path: "/admin/config/categories", icon: Tag },
      { label: "Metadata", path: "/admin/config/metadata", icon: FileText },
      { label: "Tags", path: "/admin/config/tags", icon: Tag },
      { label: "Homepage", path: "/admin/config/homepage", icon: LayoutGrid },
      { label: "Discover", path: "/admin/config/discover", icon: Compass },
    ],
  },
  {
    id: "system-pages",
    icon: Settings,
    label: "System",
    group: "system",
    children: [
      { label: "Settings", path: "/admin/settings", icon: Settings },
      { label: "Reports & Flags", path: "/admin/reports", icon: Flag },
      { label: "Global Search", path: "/admin/dashboard/search", icon: Search },
    ],
  },
];

/* ─── Third-level nav item ─── */
function ThirdLevelItem({ item, collapsed }: { item: NavChild; collapsed: boolean }) {
  const location = useLocation();
  const isActive = location.pathname === item.path;
  if (collapsed) return null;

  return (
    <Link
      to={item.path}
      className={cn(
        "flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all duration-200 ml-10",
        isActive
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
      )}
    >
      <CircleDot className="h-2.5 w-2.5 opacity-40" />
      {item.label}
    </Link>
  );
}

/* ─── Second-level nav item ─── */
function SecondLevelItem({ item, collapsed }: { item: NavChild; collapsed: boolean }) {
  const location = useLocation();
  const isActive = location.pathname === item.path;
  const hasChildren = item.children && item.children.length > 0;
  const isChildActive = hasChildren && item.children!.some(c => location.pathname === c.path);
  const [open, setOpen] = useState(isChildActive);

  const Icon = item.icon;
  if (collapsed) return null;

  return (
    <div>
      <div className="flex items-center">
        <Link
          to={item.path}
          className={cn(
            "flex-1 flex items-center gap-2.5 rounded-lg px-3 py-[7px] text-[12px] font-medium transition-all duration-200 ml-5",
            isActive || isChildActive
              ? "text-primary bg-primary/10"
              : "text-muted-foreground/80 hover:text-foreground hover:bg-accent/10"
          )}
        >
          {Icon && <Icon className="h-3.5 w-3.5 opacity-70" />}
          <span className="truncate">{item.label}</span>
        </Link>
        {hasChildren && (
          <button
            onClick={(e) => { e.preventDefault(); setOpen(!open); }}
            className="p-1 mr-3 rounded text-muted-foreground/60 hover:text-foreground transition-colors"
          >
            <ChevronRight className={cn("h-3 w-3 transition-transform duration-200", open && "rotate-90")} />
          </button>
        )}
      </div>
      {open && hasChildren && (
        <div className="mt-0.5 space-y-0.5">
          {item.children!.map((child) => (
            <ThirdLevelItem key={child.path} item={child} collapsed={collapsed} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Top-level nav section ─── */
function NavSectionItem({ section, collapsed, openSection, onToggle }: {
  section: NavSection;
  collapsed: boolean;
  openSection: string | null;
  onToggle: (id: string) => void;
}) {
  const location = useLocation();
  const isOpen = openSection === section.id;
  const hasChildren = section.children && section.children.length > 0;

  const isChildActive = hasChildren && section.children!.some(
    c => location.pathname === c.path || location.pathname.startsWith(c.path + "/") || (c.children && c.children.some(gc => location.pathname === gc.path || location.pathname.startsWith(gc.path + "/")))
  );

  const Icon = section.icon;

  const trigger = (
    <button
      onClick={() => hasChildren ? onToggle(section.id) : undefined}
      className={cn(
        "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all duration-200 group",
        isOpen || isChildActive
          ? "bg-primary/10 text-foreground shadow-sm"
          : "text-muted-foreground hover:bg-accent/8 hover:text-foreground"
      )}
    >
      <div className={cn(
        "flex items-center justify-center h-8 w-8 rounded-lg shrink-0 transition-all duration-200",
        isOpen || isChildActive
          ? "bg-primary/15 text-primary shadow-sm"
          : "bg-secondary/60 text-muted-foreground group-hover:bg-secondary group-hover:text-foreground"
      )}>
        <Icon className="h-[18px] w-[18px]" />
      </div>
      {!collapsed && (
        <>
          <span className="flex-1 text-left truncate">{section.label}</span>
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
    <div>
      {collapsed ? (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            {section.path ? (
              <Link to={section.path}>{trigger}</Link>
            ) : (
              trigger
            )}
          </TooltipTrigger>
          <TooltipContent side="right" className="font-semibold text-xs">
            {section.label}
          </TooltipContent>
        </Tooltip>
      ) : (
        section.path && !hasChildren ? (
          <Link to={section.path}>{trigger}</Link>
        ) : (
          trigger
        )
      )}

      {(isOpen || isChildActive) && hasChildren && !collapsed && (
        <div className="mt-1.5 mb-1 space-y-0.5 animate-accordion-down">
          {section.children!.map((child) => (
            <SecondLevelItem key={child.path || child.label} item={child} collapsed={collapsed} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main Sidebar ─── */
export function SuperAdminSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const getActiveSection = (pathname: string) => {
    for (const section of navSections) {
      if (section.children?.some(c =>
        pathname === c.path ||
        pathname.startsWith(c.path + '/') ||
        c.children?.some(gc => pathname === gc.path || pathname.startsWith(gc.path + '/'))
      )) return section.id;
    }
    return "control-center";
  };

  const [openSection, setOpenSection] = useState<string | null>(getActiveSection(location.pathname));

  useEffect(() => {
    const active = getActiveSection(location.pathname);
    setOpenSection(active);
  }, [location.pathname]);

  const handleToggle = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  let currentGroup: NavSection["group"] | undefined;

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300",
      collapsed ? "w-[72px]" : "w-[280px]"
    )}>
      <div className="flex h-full flex-col">
        <div className={cn(
          "flex items-center shrink-0 border-b border-sidebar-border",
          collapsed ? "justify-center px-3 h-16" : "justify-between px-5 h-16"
        )}>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/15 flex items-center justify-center overflow-hidden shadow-sm">
              <img src={fvrdLogo} alt="FVRD TV" className="h-6 w-auto" />
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-bold text-foreground tracking-tight">FVRD TV</p>
                <p className="text-[10px] font-medium text-accent tracking-wide uppercase">Super Admin</p>
              </div>
            )}
          </div>
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

        <ScrollArea className="flex-1 py-4">
          <nav className={cn("space-y-1", collapsed ? "px-2" : "px-3")}>
            {navSections.map((section) => {
              const showGroup = !collapsed && section.group !== currentGroup;
              currentGroup = section.group;
              return (
                <div key={section.id}>
                  {showGroup && (
                    <p className="px-3 pb-2 pt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground/70 first:pt-0">
                      {section.group === "control"
                        ? "Control"
                        : section.group === "operations"
                          ? "Operations"
                          : section.group === "analytics"
                            ? "Analytics"
                            : "System"}
                    </p>
                  )}
                  <NavSectionItem
                    section={section}
                    collapsed={collapsed}
                    openSection={openSection}
                    onToggle={handleToggle}
                  />
                </div>
              );
            })}
          </nav>
        </ScrollArea>

        <PanelSwitcher collapsed={collapsed} />
      </div>
    </aside>
  );
}
