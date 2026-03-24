import { type NextRequest, NextResponse } from "next/server";

import { getCurrentSubscription } from "@/features/creem/subscription";
import { getSupabaseUser } from "@/features/supabase/user";

export async function proxy(request: NextRequest) {
    const supabaseResponse = NextResponse.next({
        request,
    });

    if (request.nextUrl.pathname.startsWith("/admin")) {
        const user = await getSupabaseUser();

        if (!user) {
            const url = request.nextUrl.clone();
            url.pathname = "/sign-in";
            return NextResponse.redirect(url);
        }

        const { subscription } = await getCurrentSubscription();

        if (!subscription?.is_active) {
            const url = request.nextUrl.clone();
            url.pathname = "/payments/pricing";
            return NextResponse.redirect(url);
        }
    }

    return supabaseResponse;
}

export const config = {
    matcher: ["/admin/:path*"],
};
