import { type FlatSubscriptionEvent, Webhook } from "@creem_io/nextjs";

import { createSupabaseAdminClient } from "@/features/supabase/admin";

type MetadataWithReferenceId = {
    referenceId?: string | number | null;
};

const toIsoOrNull = (value: Date | string | null | undefined) => {
    if (!value) return null;
    if (typeof value === "string") return new Date(value).toISOString();
    return value.toISOString();
};

const handleSubscriptionEvent = async (event: FlatSubscriptionEvent<string>) => {
    const userId = (event.metadata as MetadataWithReferenceId | undefined)?.referenceId;
    if (!userId) return;

    const supabase = createSupabaseAdminClient();
    const isCanceled = event.status === "canceled" || event.webhookEventType === "subscription.canceled";

    await supabase.from("subscriptions").upsert(
        {
            user_id: String(userId),
            status: event.status,
            creem_customer_id: event.customer.id,
            creem_subscription_id: event.id,
            creem_product_id: event.product.id,
            current_period_end: toIsoOrNull(event.current_period_end_date),
            canceled_at: toIsoOrNull(event.canceled_at) ?? (isCanceled ? new Date().toISOString() : null),
            cancel_at_period_end: isCanceled ? true : event.canceled_at !== null,
        },
        { onConflict: "user_id" },
    );
};

export const POST = Webhook({
    webhookSecret: process.env.CREEM_WEBHOOK_SECRET!,

    onCheckoutCompleted: async ({ subscription, metadata }) => {
        const userId = (metadata as MetadataWithReferenceId | undefined)?.referenceId;
        if (!userId) return;

        const subscriptionId = typeof subscription === "object" && subscription ? subscription.id : undefined;
        const productId = typeof subscription === "object" && subscription?.product ? subscription.product : undefined;

        const supabase = createSupabaseAdminClient();

        await supabase.from("subscriptions").upsert(
            {
                user_id: String(userId),
                status: typeof subscription === "object" && subscription ? String(subscription.status) : "unpaid",
                creem_subscription_id: subscriptionId ?? null,
                creem_product_id: productId ?? null,
                current_period_end:
                    typeof subscription === "object" && subscription
                        ? toIsoOrNull(subscription.current_period_end_date)
                        : null,
                canceled_at:
                    typeof subscription === "object" && subscription ? toIsoOrNull(subscription.canceled_at) : null,
                cancel_at_period_end:
                    typeof subscription === "object" && subscription ? subscription.canceled_at !== null : false,
            },
            { onConflict: "user_id" },
        );
    },

    onGrantAccess: async ({ product, customer, metadata, current_period_end_date, canceled_at, status, id }) => {
        const userId = (metadata as MetadataWithReferenceId | undefined)?.referenceId;
        if (!userId) return;

        const supabase = createSupabaseAdminClient();
        const isActive = true;

        await supabase.from("subscriptions").upsert(
            {
                user_id: String(userId),
                is_active: isActive,
                status,
                creem_customer_id: customer.id,
                creem_subscription_id: id,
                creem_product_id: product.id,
                current_period_end: toIsoOrNull(current_period_end_date),
                canceled_at: toIsoOrNull(canceled_at),
                cancel_at_period_end: canceled_at !== null,
            },
            { onConflict: "user_id" },
        );
    },

    onRevokeAccess: async ({ product, customer, metadata, current_period_end_date, canceled_at, status, id }) => {
        const userId = (metadata as MetadataWithReferenceId | undefined)?.referenceId;
        if (!userId) return;

        const supabase = createSupabaseAdminClient();

        await supabase.from("subscriptions").upsert(
            {
                user_id: String(userId),
                is_active: false,
                status,
                creem_customer_id: customer.id,
                creem_subscription_id: id,
                creem_product_id: product.id,
                current_period_end: toIsoOrNull(current_period_end_date),
                canceled_at: toIsoOrNull(canceled_at),
                cancel_at_period_end: canceled_at !== null,
            },
            { onConflict: "user_id" },
        );
    },

    onSubscriptionUpdate: handleSubscriptionEvent,
    onSubscriptionCanceled: handleSubscriptionEvent,
    onSubscriptionActive: handleSubscriptionEvent,
    onSubscriptionTrialing: handleSubscriptionEvent,
    onSubscriptionPaid: handleSubscriptionEvent,
    onSubscriptionExpired: handleSubscriptionEvent,
    onSubscriptionUnpaid: handleSubscriptionEvent,
    onSubscriptionPastDue: handleSubscriptionEvent,
    onSubscriptionPaused: handleSubscriptionEvent,

    onRefundCreated: async (event) => {
        console.log(
            `[Webhook] Refund created for transaction ${event.transaction?.id}: amounts ${event.refund_amount} ${event.refund_currency}`,
        );
        // Can add logic to store refunds or revoke immediate custom tracking
    },

    onDisputeCreated: async (event) => {
        console.log(
            `[Webhook] Dispute created for transaction ${event.transaction?.id}: amounts ${event.amount} ${event.currency}`,
        );
        // Handle dispute logically if required
    },
});
