import { CreatorLayout } from "@/layouts/CreatorLayout";
import { Package, Eye, ShoppingBag } from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const products = [
  { id: 1, name: "Wireless Earbuds Pro", brand: "TechCo", clicks: 1240, conversions: 89, revenue: "$890", status: "active" },
  { id: 2, name: "Smart Watch Series X", brand: "WristTech", clicks: 980, conversions: 62, revenue: "$620", status: "active" },
  { id: 3, name: "Yoga Mat Premium", brand: "FitLife", clicks: 560, conversions: 34, revenue: "$170", status: "active" },
  { id: 4, name: "Organic Face Cream", brand: "GlowUp", clicks: 320, conversions: 18, revenue: "$144", status: "paused" },
];

export default function CreatorProducts() {
  const location = useLocation();
  const isPerformance = location.pathname.includes("/performance");

  return (
    <CreatorLayout
      title={isPerformance ? "Product Performance" : "Assigned Products"}
      subtitle={isPerformance ? "Track how products are performing." : "Products assigned to you by brands."}
      breadcrumbs={[
        { label: "Creator Studio", path: "/creator/dashboard" },
        { label: "Products" },
        { label: isPerformance ? "Performance" : "Assigned" }
      ]}
    >
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Product</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Brand</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Clicks</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Conversions</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Revenue</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" /> {p.name}
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{p.brand}</td>
                <td className="text-right px-4 py-3 text-xs text-muted-foreground flex items-center justify-end gap-1">
                  <Eye className="h-3 w-3" /> {p.clicks.toLocaleString()}
                </td>
                <td className="text-right px-4 py-3 text-xs text-muted-foreground">
                  <span className="flex items-center justify-end gap-1"><ShoppingBag className="h-3 w-3" /> {p.conversions}</span>
                </td>
                <td className="text-right px-4 py-3 text-xs font-semibold text-success">{p.revenue}</td>
                <td className="text-center px-4 py-3">
                  <span className={cn(
                    "text-[10px] font-semibold px-2.5 py-1 rounded-full capitalize",
                    p.status === "active" ? "bg-success/15 text-success" : "bg-secondary text-muted-foreground"
                  )}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CreatorLayout>
  );
}
