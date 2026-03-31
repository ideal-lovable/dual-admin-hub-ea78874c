import { cn } from "@/lib/utils";

type StatusType = "active" | "pending" | "approved" | "rejected" | "live" | "scheduled" | "completed" | "draft";

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

const statusStyles: Record<StatusType, string> = {
  active: "bg-success/20 text-success border-success/30",
  pending: "bg-warning/20 text-warning border-warning/30",
  approved: "bg-success/20 text-success border-success/30",
  rejected: "bg-destructive/20 text-destructive border-destructive/30",
  live: "bg-destructive/20 text-destructive border-destructive/30 animate-pulse",
  scheduled: "bg-accent/20 text-accent border-accent/30",
  completed: "bg-muted text-muted-foreground border-muted",
  draft: "bg-secondary text-secondary-foreground border-secondary",
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium capitalize",
      statusStyles[status]
    )}>
      {status === "live" && (
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      )}
      {label || status}
    </span>
  );
}
