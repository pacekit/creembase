import { cookies } from "next/headers";

import { createServerClient } from "@supabase/ssr";

export const createSupabaseServerClient = () => {
    const cookieStore = cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll: async () => {
                    const store = await cookieStore;
                    return store.getAll();
                },
                setAll: async (cookiesToSet) => {
                    const store = await cookieStore;
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            store.set({ name, value, ...options });
                        });
                    } catch {}
                },
            },
        },
    );
};
