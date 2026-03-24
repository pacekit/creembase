import Link from "next/link";
import { ReactNode } from "react";

import { Links } from "@/lib/links";

import { Logo } from "@/components/shared/Logo";
import { ThemeManager } from "@/components/shared/ThemeManager";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="bg-accent/10 flex h-screen items-center justify-center gap-6">
            <div className="w-xs space-y-4 sm:w-sm">
                <div className="flex items-center justify-between gap-4">
                    <Link href={Links.home}>
                        <Logo />
                    </Link>
                    <ThemeManager />
                </div>
                {children}
                <p className="text-muted-foreground text-center text-sm">
                    Powered by{" "}
                    <a className="hover:text-foreground hover:underline" href="https://supabase.com" target="_blank">
                        Supabase
                    </a>
                </p>
            </div>
        </div>
    );
};

export default AuthLayout;
