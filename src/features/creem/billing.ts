"use server";

import { Creem } from "creem";
import { z } from "zod";

import { CREEM_PLANS } from "@/features/creem/plans";
import { getCurrentSubscription } from "@/features/creem/subscription";
import { getSupabaseUser } from "@/features/supabase/user";

const schema = z.object({
    planKey: z.string().min(1),
});

export async function changePlanAction(input: unknown) {
    const parsed = schema.safeParse(input);
    if (!parsed.success) throw new Error("Invalid plan change payload");

    const user = await getSupabaseUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const { subscription } = await getCurrentSubscription();

    if (!subscription) {
        throw new Error("No subscription found");
    }

    if (!subscription.is_active || !subscription.creem_subscription_id) {
        throw new Error("No active subscription");
    }

    const requestedPlan = CREEM_PLANS.find((p) => p.key === parsed.data.planKey);
    if (!requestedPlan) {
        throw new Error("Invalid plan");
    }

    if (requestedPlan.productId === subscription.creem_product_id) {
        throw new Error("You're already on this plan");
    }

    const currentPlan = CREEM_PLANS.find((p) => p.productId === subscription.creem_product_id);
    const currentPrice = currentPlan?.priceCents ?? 0;
    const nextPrice = requestedPlan.priceCents;

    const updateBehavior = nextPrice > currentPrice ? "proration-charge-immediately" : "proration-charge";

    const creem = new Creem({
        apiKey: process.env.CREEM_API_KEY!,
        serverIdx: process.env.CREEM_TEST_MODE === "true" ? 1 : 0,
    });

    await creem.subscriptions.upgrade(subscription.creem_subscription_id, {
        productId: requestedPlan.productId,
        updateBehavior,
    });
    return { ok: true };
}

export async function cancelPlanAction() {
    const user = await getSupabaseUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const { subscription } = await getCurrentSubscription();

    if (!subscription) {
        throw new Error("No subscription found");
    }

    if (!subscription.is_active || !subscription.creem_subscription_id) {
        throw new Error("No active subscription to cancel");
    }

    const creem = new Creem({
        apiKey: process.env.CREEM_API_KEY!,
        serverIdx: process.env.CREEM_TEST_MODE === "true" ? 1 : 0,
    });

    await creem.subscriptions.cancel(subscription.creem_subscription_id, {});

    return { ok: true };
}
