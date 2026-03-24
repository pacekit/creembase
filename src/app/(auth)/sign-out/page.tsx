"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { signOutAction } from "@/features/supabase/auth";

import { Links } from "@/lib/links";

const SignOutPage = () => {
    const router = useRouter();

    useEffect(() => {
        const performSignOut = async () => {
            try {
                await signOutAction();
            } catch {
                // Ignore network errors; user will still be redirected.
            }
            router.replace(Links.home);
        };
        performSignOut();
    }, [router]);

    return <p>Ending your session...</p>;
};

export default SignOutPage;
