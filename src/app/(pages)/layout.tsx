import { ReactNode } from "react";

import { getSupabaseUser } from "@/features/supabase/user";

import { Footer } from "@/components/layouts/Footer";
import { Topbar } from "@/components/layouts/Topbar";

const PaymentLayout = async ({ children }: { children: ReactNode }) => {
    const user = await getSupabaseUser();

    return (
        <main className="flex min-w-0 grow flex-col">
            <Topbar user={user} />
            <div className="container h-full grow p-6">{children}</div>
            <Footer />
        </main>
    );
};

export default PaymentLayout;
