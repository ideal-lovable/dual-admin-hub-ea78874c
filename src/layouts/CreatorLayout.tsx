import { ReactNode } from "react";
import { CreatorSidebar } from "@/components/creator/CreatorSidebar";
import { Link } from "react-router-dom";
import { Bell, User, Upload, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CreatorLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; path?: string }[];
  actions?: ReactNode;
}

export function CreatorLayout({ children, title, subtitle, breadcrumbs, actions }: CreatorLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <CreatorSidebar />

      <div className="ml-[270px] transition-all duration-300">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-6">
          <div className="flex items-center gap-4">
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
            {actions || (
              <>
                <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs" asChild>
                  <Link to="/creator/content/videos">
                    <Upload className="h-3.5 w-3.5" />
                    Upload
                  </Link>
                </Button>
                <Button size="sm" className="h-8 gap-1.5 text-xs bg-destructive hover:bg-destructive/90 text-destructive-foreground" asChild>
                  <Link to="/creator/live/create">
                    <Radio className="h-3.5 w-3.5" />
                    Request Live
                  </Link>
                </Button>
              </>
            )}
            <Link to="/creator/notifications" className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
            </Link>
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
    </div>
  );
}
