import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Home, Users, Store, Video, ShoppingCart, BarChart3, Calendar,
  Star, Handshake, Bell, Shield, Settings, ChevronDown, ChevronRight,
  Activity, DollarSign, Radio, Eye, Package, FileText, TrendingUp,
  UserCheck, UserX, Flag, Layers, LayoutGrid, Megaphone, Mail,
  Zap, Lock, ClipboardList, Tag, PanelLeftClose, PanelLeft,
  BarChart, PieChart, Target, Clock, Heart, MapPin, Flame
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import fvrdLogo from "@/assets/fvrd-logo.png";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  children?: NavChild[];
}

const navSections: NavSection[] = [
  {
    id: "dashboard",
    icon: Home,
    label: "Dashboard",
    children: [
      { label: "Overview", path: "/admin/dashboard", icon: LayoutGrid },
      { label: "Platform Health", path: "/admin/dashboard/health", icon: Activity },
      { label: "Live Metrics", path: "/admin/dashboard/live", icon: Radio },
      { label: "Revenue Snapshot", path: "/admin/dashboard/revenue", icon: DollarSign },
      { label: "Activity Feed", path: "/admin/dashboard/activity", icon: Clock },
    ],
  },
  {
    id: "users",
    icon: Users,
    label: "User Management",
    children: [
      { label: "All Users", path: "/admin/users", icon: Users },
      { label: "Subscribers", path: "/admin/users/subscribers", icon: Heart },
      { label: "Creators", path: "/admin/users/creators", icon: Star },
      { label: "Businesses", path: "/admin/users/businesses", icon: Store },
      { label: "Publishers", path: "/admin/users/publishers", icon: Megaphone },
      { label: "Admins", path: "/admin/users/admins", icon: Shield },
      {
        label: "Suspended / Flagged",
        path: "/admin/users/suspended",
        icon: UserX,
        children: [
          { label: "Verification Requests", path: "/admin/users/verification" },
          { label: "Activity Logs", path: "/admin/users/logs" },
          { label: "Reports & Flags", path: "/admin/users/reports" },
        ],
      },
    ],
  },
  {
    id: "storefronts",
    icon: Store,
    label: "Storefront Management",
    children: [
      { label: "All Storefronts", path: "/admin/storefronts", icon: Store },
      { label: "Pending Approval", path: "/admin/storefronts/pending", icon: Clock },
      { label: "Featured Stores", path: "/admin/storefronts/featured", icon: Star },
      { label: "Categories", path: "/admin/storefronts/categories", icon: Tag },
      { label: "Policy Compliance", path: "/admin/storefronts/compliance", icon: FileText },
      {
        label: "Products & Inventory",
        path: "/admin/storefronts/products",
        icon: Package,
        children: [
          { label: "Refund / Return Logs", path: "/admin/storefronts/refunds" },
        ],
      },
    ],
  },
  {
    id: "content",
    icon: Video,
    label: "Content Management",
    children: [
      { label: "Videos (On-demand)", path: "/admin/content", icon: Video },
      { label: "Livestreams", path: "/admin/content/livestreams", icon: Radio },
      { label: "Scheduled Streams", path: "/admin/content/scheduled", icon: Calendar },
      { label: "Approval Queue", path: "/admin/content/approval", icon: UserCheck },
      { label: "Flagged Content", path: "/admin/content/flagged", icon: Flag },
      {
        label: "Content Tools",
        path: "/admin/content/tools",
        icon: Layers,
        children: [
          { label: "Attach Products", path: "/admin/content/attach-products" },
          { label: "Content Analytics", path: "/admin/content/analytics" },
        ],
      },
    ],
  },
  {
    id: "commerce",
    icon: ShoppingCart,
    label: "Commerce & Orders",
    children: [
      { label: "Orders", path: "/admin/commerce/orders", icon: ShoppingCart },
      { label: "Transactions", path: "/admin/commerce/transactions", icon: DollarSign },
      { label: "Refunds", path: "/admin/commerce/refunds", icon: FileText },
      { label: "Payouts", path: "/admin/commerce/payouts", icon: DollarSign },
      { label: "Cart / Conversion", path: "/admin/commerce/conversion", icon: Target },
    ],
  },
  {
    id: "analytics",
    icon: BarChart3,
    label: "Analytics",
    children: [
      { label: "User Analytics", path: "/admin/analytics", icon: Users },
      { label: "Revenue Analytics", path: "/admin/analytics/revenue", icon: DollarSign },
      { label: "Content Performance", path: "/admin/analytics/content", icon: TrendingUp },
      { label: "Livestream Performance", path: "/admin/analytics/livestreams", icon: Radio },
      { label: "Store Performance", path: "/admin/analytics/stores", icon: Store },
      { label: "Conversion Funnels", path: "/admin/analytics/funnels", icon: Target },
      {
        label: "Advanced",
        path: "/admin/analytics/advanced",
        icon: PieChart,
        children: [
          { label: "Cohort Analysis", path: "/admin/analytics/cohorts" },
          { label: "Retention", path: "/admin/analytics/retention" },
          { label: "Engagement Heatmaps", path: "/admin/analytics/heatmaps" },
        ],
      },
    ],
  },
  {
    id: "calendar",
    icon: Calendar,
    label: "Livestream Calendar",
    children: [
      { label: "Calendar View", path: "/admin/calendar", icon: Calendar },
      { label: "Scheduled Streams", path: "/admin/calendar/scheduled", icon: Clock },
      { label: "Live Now", path: "/admin/calendar/live", icon: Flame },
      { label: "Conflicts / Overlaps", path: "/admin/calendar/conflicts", icon: Flag },
    ],
  },
  {
    id: "discover",
    icon: Eye,
    label: "Discover & Curation",
    children: [
      { label: "Featured Banner", path: "/admin/discover/banner", icon: Megaphone },
      { label: "What to Watch", path: "/admin/discover/watch", icon: Video },
      { label: "What to Buy", path: "/admin/discover/buy", icon: ShoppingCart },
      { label: "Trending", path: "/admin/discover/trending", icon: TrendingUp },
      { label: "Creator Picks", path: "/admin/discover/picks", icon: Star },
      { label: "Events", path: "/admin/discover/events", icon: Calendar },
    ],
  },
  {
    id: "mapping",
    icon: Handshake,
    label: "Creator–Business",
    children: [
      { label: "Creator Access Control", path: "/admin/mapping/access", icon: Lock },
      { label: "Product Permissions", path: "/admin/mapping/permissions", icon: Package },
      { label: "Brand Partnerships", path: "/admin/mapping/partnerships", icon: Handshake },
    ],
  },
  {
    id: "automation",
    icon: Zap,
    label: "Automation & Notifications",
    children: [
      { label: "Email Templates", path: "/admin/automation/emails", icon: Mail },
      { label: "Trigger Rules", path: "/admin/automation/triggers", icon: Zap },
      { label: "Logs", path: "/admin/automation/logs", icon: ClipboardList },
      { label: "Failed Deliveries", path: "/admin/automation/failed", icon: Flag },
    ],
  },
  {
    id: "controls",
    icon: Shield,
    label: "Admin Controls",
    children: [
      { label: "Roles & Permissions", path: "/admin/controls/roles", icon: Shield },
      { label: "Sub Admins", path: "/admin/controls/sub-admins", icon: UserCheck },
      { label: "Audit Logs", path: "/admin/controls/audit", icon: ClipboardList },
      { label: "System Settings", path: "/admin/controls/system", icon: Settings },
    ],
  },
  {
    id: "config",
    icon: Settings,
    label: "Platform Config",
    children: [
      { label: "Categories", path: "/admin/config/categories", icon: Tag },
      { label: "Metadata", path: "/admin/config/metadata", icon: FileText },
      { label: "Tags", path: "/admin/config/tags", icon: Tag },
      { label: "Homepage Layout", path: "/admin/config/homepage", icon: LayoutGrid },
      { label: "Discover Layout", path: "/admin/config/discover", icon: Eye },
    ],
  },
];

function ThirdLevelItem({ item, collapsed }: { item: NavChild; collapsed: boolean }) {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  if (collapsed) return null;

  return (
    <Link
      to={item.path}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs transition-colors ml-9",
        isActive
          ? "text-primary bg-primary/5 font-medium"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
      )}
    >
      <span className="h-1 w-1 rounded-full bg-current opacity-50" />
      {item.label}
    </Link>
  );
}

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
            "flex-1 flex items-center gap-2.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ml-4",
            isActive || isChildActive
              ? "text-primary bg-primary/5"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          )}
        >
          {Icon && <Icon className="h-3.5 w-3.5" />}
          {item.label}
        </Link>
        {hasChildren && (
          <button
            onClick={(e) => { e.preventDefault(); setOpen(!open); }}
            className="p-1 mr-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronRight className={cn("h-3 w-3 transition-transform", open && "rotate-90")} />
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
    c => location.pathname === c.path || (c.children && c.children.some(gc => location.pathname === gc.path))
  );

  const Icon = section.icon;

  const trigger = (
    <button
      onClick={() => hasChildren ? onToggle(section.id) : undefined}
      className={cn(
        "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all group",
        isOpen || isChildActive
          ? "bg-primary/8 text-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className={cn(
        "h-4.5 w-4.5 shrink-0",
        isOpen || isChildActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
      )} />
      {!collapsed && (
        <>
          <span className="flex-1 text-left truncate">{section.label}</span>
          {hasChildren && (
            <ChevronDown className={cn(
              "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )} />
          )}
        </>
      )}
      {isChildActive && !collapsed && (
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
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
          <TooltipContent side="right" className="font-medium">
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

      {isOpen && hasChildren && !collapsed && (
        <div className="mt-1 space-y-0.5 animate-accordion-down">
          {section.children!.map((child) => (
            <SecondLevelItem key={child.path || child.label} item={child} collapsed={collapsed} />
          ))}
        </div>
      )}
    </div>
  );
}

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
    return "dashboard";
  };

  const [openSection, setOpenSection] = useState<string | null>(getActiveSection(location.pathname));

  useEffect(() => {
    const active = getActiveSection(location.pathname);
    setOpenSection(active);
  }, [location.pathname]);

  const handleToggle = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300",
      collapsed ? "w-16" : "w-[272px]"
    )}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className={cn(
          "flex h-14 items-center border-b border-sidebar-border shrink-0",
          collapsed ? "justify-center px-2" : "justify-between px-4"
        )}>
          <div className="flex items-center gap-2.5">
            <img src={fvrdLogo} alt="FVRD TV" className="h-7 w-auto" />
            {!collapsed && (
              <div>
                <p className="text-xs font-semibold text-foreground tracking-wide">Super Admin</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          )}
        </div>

        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="mx-auto mt-3 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        )}

        {/* Nav */}
        <ScrollArea className="flex-1 py-3">
          <nav className={cn("space-y-0.5", collapsed ? "px-2" : "px-3")}>
            {navSections.map((section) => (
              <NavSectionItem
                key={section.id}
                section={section}
                collapsed={collapsed}
                openSection={openSection}
                onToggle={handleToggle}
              />
            ))}
          </nav>
        </ScrollArea>

        {/* Footer Panel Switcher */}
        {!collapsed && (
          <div className="border-t border-sidebar-border p-3">
            <p className="mb-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
              Switch Panel
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { label: "Creator", path: "/user/dashboard", icon: Star },
                { label: "Business", path: "/business/dashboard", icon: Store },
                { label: "Publisher", path: "/publisher/dashboard", icon: Megaphone },
              ].map((p) => (
                <Link
                  key={p.label}
                  to={p.path}
                  className="flex flex-col items-center gap-1 rounded-lg py-2 text-[10px] font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                >
                  <p.icon className="h-3.5 w-3.5" />
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
