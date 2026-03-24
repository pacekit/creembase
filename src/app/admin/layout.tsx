import { redirect } from "next/navigation";
import { ReactNode } from "react";

import { getCurrentSubscription } from "@/features/creem/subscription";
import { getSupabaseUser } from "@/features/supabase/user";

import { Links } from "@/lib/links";

import { AdminFooter } from "@/components/layouts/admin/Footer";
import { AdminSidebar } from "@/components/layouts/admin/Sidebar";
import { AdminTopbar } from "@/components/layouts/admin/Topbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const ProtectedLayout = async ({ children }: { children: ReactNode }) => {
    const { user, subscription } = await getCurrentSubscription();

    if (!user) redirect(Links.auth.signIn);
    if (!subscription?.is_active) redirect("/payments/pricing");

    const supabaseUser = await getSupabaseUser();

    return (
        <SidebarProvider>
            <AdminSidebar />
            <SidebarInset>
                <main className="flex min-w-0 grow flex-col">
                    <AdminTopbar user={supabaseUser} />
                    <div className="h-full grow p-6">{children}</div>
                    <AdminFooter />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default ProtectedLayout;
