import { cn } from "@/lib/utils";
import { 
  Home, 
  Video, 
  Radio, 
  Star, 
  BarChart3, 
  Settings, 
  Store,
  Package,
  ShoppingCart,
  FileText,
  Users,
  MessageSquare,
  Film,
  BookOpen,
  Flag,
  Eye
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import fvrdLogo from "@/assets/fvrd-logo.png";
import { PanelSwitcher } from "@/components/PanelSwitcher";

type AdminType = "user" | "business" | "publisher" | "admin";

interface AdminSidebarProps {
  type: AdminType;
}

const userNavItems = [
  { icon: Home, label: "Dashboard", path: "/user/dashboard" },
  { icon: Video, label: "My Videos", path: "/user/videos" },
  { icon: Radio, label: "Livestreams", path: "/user/livestreams" },
  { icon: Star, label: "Creator Picks", path: "/user/picks" },
  { icon: BarChart3, label: "Analytics", path: "/user/analytics" },
  { icon: BookOpen, label: "Guidelines", path: "/user/guidelines" },
  { icon: Settings, label: "Profile Settings", path: "/user/settings" },
];

const businessNavItems = [
  { icon: Home, label: "Dashboard", path: "/business/dashboard" },
  { icon: Store, label: "Storefront", path: "/business/storefront" },
  { icon: Package, label: "Products", path: "/business/products" },
  { icon: ShoppingCart, label: "Orders", path: "/business/orders" },
  { icon: Radio, label: "Livestreams", path: "/business/livestreams" },
  { icon: BarChart3, label: "Analytics", path: "/business/analytics" },
  { icon: FileText, label: "Policies", path: "/business/policies" },
  { icon: MessageSquare, label: "Messages", path: "/business/messages" },
  { icon: Settings, label: "Settings", path: "/business/settings" },
];

const publisherNavItems = [
  { icon: Home, label: "Dashboard", path: "/publisher/dashboard" },
  { icon: Film, label: "Content Library", path: "/publisher/content" },
  { icon: BarChart3, label: "Analytics", path: "/publisher/analytics" },
  { icon: Star, label: "Distribution", path: "/publisher/distribution" },
  { icon: MessageSquare, label: "Notifications", path: "/publisher/notifications" },
  { icon: Settings, label: "Settings", path: "/publisher/settings" },
];

const adminNavItems = [
  { icon: Home, label: "Dashboard", path: "/admin/dashboard" },
  { icon: Users, label: "Users", path: "/admin/users" },
  { icon: Eye, label: "Content Moderation", path: "/admin/content" },
  { icon: Store, label: "Businesses", path: "/admin/businesses" },
  { icon: Flag, label: "Reports & Flags", path: "/admin/reports" },
  { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export function AdminSidebar({ type }: AdminSidebarProps) {
  const location = useLocation();
  const navItems = type === "user" ? userNavItems : type === "business" ? businessNavItems : type === "admin" ? adminNavItems : publisherNavItems;
  
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <img src={fvrdLogo} alt="FVRD TV" className="h-8 w-auto" />
          <p className="text-xs text-muted-foreground capitalize">{type} Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                {item.label}
                {isActive && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-primary animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        <PanelSwitcher />
      </div>
    </aside>
  );
}
