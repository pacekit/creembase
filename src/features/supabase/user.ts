"use server";

import { createSupabaseServerClient } from "@/features/supabase/server";

export const getSupabaseUser = async () => {
    const supabase = createSupabaseServerClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user;
};
