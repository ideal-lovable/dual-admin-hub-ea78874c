import { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

type AdminType = "user" | "business" | "publisher" | "admin";

interface AdminLayoutProps {
  children: ReactNode;
  type: AdminType;
  title: string;
  subtitle?: string;
}

export function AdminLayout({ children, type, title, subtitle }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar type={type} />
      <div className="ml-64">
        <AdminHeader title={title} subtitle={subtitle} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
