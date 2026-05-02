import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Check, ChevronDown, Film, Shield, Sparkles, Store } from "lucide-react";
import { cn } from "@/lib/utils";

const panels = [
  {
    id: "admin",
    label: "Super Admin",
    description: "Platform control center",
    path: "/admin/dashboard",
    match: "/admin",
    icon: Shield,
    iconClass: "bg-destructive/15 text-destructive",
  },
  {
    id: "business",
    label: "Business Hub",
    description: "Storefront & commerce",
    path: "/business/dashboard",
    match: "/business",
    icon: Store,
    iconClass: "bg-primary/15 text-primary",
  },
  {
    id: "creator",
    label: "Creator Studio",
    description: "Content & livestreams",
    path: "/creator/dashboard",
    match: "/creator",
    icon: Sparkles,
    iconClass: "bg-accent/15 text-accent",
  },
  {
    id: "publisher",
    label: "Publisher Studio",
    description: "Submit & track content",
    path: "/publisher/dashboard",
    match: "/publisher",
    icon: Film,
    iconClass: "bg-warning/15 text-warning",
  },
];

interface PanelSwitcherProps {
  collapsed?: boolean;
}

export function PanelSwitcher({ collapsed = false }: PanelSwitcherProps) {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const activePanel = panels.find((panel) =>
    location.pathname.startsWith(panel.match) || (panel.id === "creator" && location.pathname.startsWith("/user"))
  ) ?? panels[0];

  if (collapsed) {
    const Icon = activePanel.icon;

    return (
      <div className="border-t border-sidebar-border p-3">
        <Link
          to={activePanel.path}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/70 text-primary hover:bg-secondary transition-colors"
          aria-label={`Current panel: ${activePanel.label}`}
        >
          <Icon className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const ActiveIcon = activePanel.icon;

  return (
    <div className="border-t border-sidebar-border p-4">
      <p className="mb-3 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.15em]">
        Switch Panel
      </p>
      <div className="rounded-xl border border-sidebar-border bg-secondary/20 p-1.5">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="group flex w-full items-center gap-3 rounded-lg bg-primary/10 px-2.5 py-2.5 text-left text-foreground shadow-sm transition-all duration-200 hover:bg-primary/15"
          aria-expanded={expanded}
        >
          <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", activePanel.iconClass)}>
            <ActiveIcon className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-bold leading-tight">{activePanel.label}</span>
            <span className="mt-0.5 block truncate text-[10px] font-medium text-muted-foreground">{activePanel.description}</span>
          </span>
          <ChevronDown className={cn("h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200", expanded && "rotate-180")} />
        </button>

        {expanded && (
          <div className="mt-1.5 space-y-1.5 border-t border-sidebar-border pt-1.5">
            {panels.filter((p) => p.id !== activePanel.id).map((panel) => {
              const Icon = panel.icon;
              return (
                <Link
                  key={panel.id}
                  to={panel.path}
                  onClick={() => setExpanded(false)}
                  className="group flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-left text-muted-foreground transition-all duration-200 hover:bg-secondary/70 hover:text-foreground"
                >
                  <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", panel.iconClass)}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-bold leading-tight">{panel.label}</span>
                    <span className="mt-0.5 block truncate text-[10px] font-medium text-muted-foreground">{panel.description}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
