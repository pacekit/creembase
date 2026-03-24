import Link from "next/link";

import { CreemPortal } from "@creem_io/nextjs";
import { AlertCircleIcon } from "lucide-react";

import { getCurrentSubscription } from "@/features/creem/subscription";

import { ChangePlanForm } from "@/components/features/creem/ChangePlanForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BillingPage = async () => {
    const { subscription } = await getCurrentSubscription();

    if (!subscription) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    const periodEndLabel = subscription.current_period_end
        ? new Date(subscription.current_period_end).toLocaleDateString()
        : null;

    return (
        <div>
            <div className="space-y-1.5">
                <h1 className="text-2xl font-semibold">Billing</h1>
                <p className="text-muted-foreground text-base">Manage your subscription status and billing details.</p>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-xl">Current Plan</CardTitle>
                        <CardDescription>An overview of your current active product.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="flex flex-col space-y-1.5">
                                <span className="text-muted-foreground text-sm font-medium">Product ID</span>
                                <span className="text-lg font-medium">{subscription.creem_product_id ?? "—"}</span>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <span className="text-muted-foreground text-sm font-medium">Status</span>
                                <span className="text-lg font-medium capitalize">{subscription.status}</span>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <span className="text-muted-foreground text-sm font-medium">Renews / Ends</span>
                                <span className="text-lg font-medium">{periodEndLabel ?? "—"}</span>
                            </div>
                            {subscription.canceled_at && (
                                <div className="flex flex-col space-y-1.5">
                                    <span className="text-muted-foreground text-sm font-medium">Canceled At</span>
                                    <span className="text-destructive text-lg font-semibold">
                                        {new Date(subscription.canceled_at).toLocaleDateString()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-xl">Billing</CardTitle>
                        <CardDescription>Update payment info and view invoices.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col justify-between space-y-6">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Securely manage your billing, payment methods, and cancellations through the Creem portal.
                        </p>
                        {subscription.creem_customer_id ? (
                            <CreemPortal customerId={subscription.creem_customer_id} portalPath="/payments/portal">
                                <Button className="w-full cursor-pointer">Manage Billing</Button>
                            </CreemPortal>
                        ) : (
                            <Skeleton className="h-10 w-full" />
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6">
                {subscription.status == "canceled" ? (
                    <div className="flex gap-3">
                        <AlertCircleIcon className="text-muted-foreground mt-1 h-5 w-5" />

                        <div>
                            <h2 className="text-lg font-medium">Subscription cancelled</h2>
                            <p className="text-muted-foreground mt-0.5 text-sm">
                                Your subscription is no longer active. You can restart it anytime from the Creem portal.
                            </p>

                            <Button
                                className="mt-2"
                                nativeButton={false}
                                render={<Link href="/payments/pricing">Restart subscription</Link>}
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <div>
                            <h2 className="text-lg font-medium">Plan Changes</h2>
                            <p className="text-muted-foreground mt-0.5 text-sm">
                                Upgrade or downgrade your subscription tier.
                            </p>
                        </div>

                        <div className="mt-6">
                            <ChangePlanForm currentProductId={subscription.creem_product_id} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BillingPage;
