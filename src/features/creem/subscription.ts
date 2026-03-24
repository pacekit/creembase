"use server";

import { createSupabaseServerClient } from "@/features/supabase/server";

export type SubscriptionRow = {
    user_id: string;
    is_active: boolean;
    status: string;
    creem_customer_id: string | null;
    creem_subscription_id: string | null;
    creem_product_id: string | null;
    current_period_end: string | null;
    cancel_at_period_end: boolean;
    canceled_at: string | null;
    created_at: string;
    updated_at: string;
};

export const getCurrentSubscription = async () => {
    const supabase = createSupabaseServerClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return { user: null, subscription: null as SubscriptionRow | null };
    }

    const { data: subscription, error: subError } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

    if (subError) {
        return { user, subscription: null as SubscriptionRow | null };
    }

    return { user, subscription: subscription as SubscriptionRow | null };
};
