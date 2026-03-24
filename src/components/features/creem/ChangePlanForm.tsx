"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { CheckIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

import { cancelPlanAction, changePlanAction } from "@/features/creem/billing";
import { formatCurrency } from "@/features/creem/helpers";
import { CREEM_PLANS } from "@/features/creem/plans";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

export const ChangePlanForm = ({ currentProductId }: { currentProductId: string | null }) => {
    const router = useRouter();

    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

    const ensureFreshDataAfterWebhook = () => {
        // First refresh for a quick update, second one to ensure delayed webhook changes are reflected
        setTimeout(() => router.refresh(), 3000);
        setTimeout(() => router.refresh(), 10000);
    };

    const changePlanMutation = useMutation({
        mutationFn: async ({ planKey }: { planKey: string }) => {
            return changePlanAction({ planKey });
        },
        onSuccess: () => {
            toast.success("Plan change requested successfully.");
            ensureFreshDataAfterWebhook();
        },
        onError: (err) => {
            toast.error(err instanceof Error ? err.message : "Failed to change plan");
        },
    });

    const cancelPlanMutation = useMutation({
        mutationFn: async () => {
            return cancelPlanAction();
        },
        onSuccess: () => {
            toast.success("Your subscription has been canceled.");
            setIsCancelDialogOpen(false);
            ensureFreshDataAfterWebhook();
        },
        onError: (err) => {
            toast.error(err instanceof Error ? err.message : "Failed to cancel plan");
        },
    });

    const isAnySubmitting = changePlanMutation.isPending || cancelPlanMutation.isPending;

    return (
        <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {CREEM_PLANS.map((plan) => {
                    const isCurrentPlan = currentProductId === plan.productId;
                    const isThisPlanSubmitting =
                        changePlanMutation.isPending && changePlanMutation.variables?.planKey === plan.key;

                    return (
                        <Card key={plan.key} className="relative overflow-visible">
                            <CardHeader>
                                <div className="flex items-center justify-between gap-3">
                                    <CardTitle>{plan.name}</CardTitle>
                                    {plan.mostPopular ? (
                                        <Badge
                                            variant="default"
                                            className="absolute inset-s-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                                            Most popular
                                        </Badge>
                                    ) : null}
                                </div>
                                <div className="mt-2 flex items-baseline gap-1">
                                    <p className="text-3xl font-semibold">{formatCurrency(plan.priceCents)}</p>
                                    <p className="text-muted-foreground">/month</p>
                                </div>
                                <p className="text-muted-foreground mt-2">{plan.description}</p>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-1.5">
                                    {plan.features?.included.map((feature, index) => (
                                        <div key={`included-${index}`} className="flex items-center gap-2 text-sm">
                                            <CheckIcon className="text-success size-4" />
                                            {feature}
                                        </div>
                                    ))}
                                    {plan.features?.excluded.map((feature, index) => (
                                        <div key={`included-${index}`} className="flex items-center gap-2 text-sm">
                                            <XIcon className="text-destructive size-4" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="mt-auto">
                                {isCurrentPlan ? (
                                    <div className="flex w-full gap-2">
                                        <Button variant="secondary" disabled className="grow">
                                            Current Plan
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() => setIsCancelDialogOpen(true)}
                                            className="cursor-pointer"
                                            disabled={isAnySubmitting}>
                                            <XIcon />
                                            <p>Cancel</p>
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        variant="default"
                                        disabled={isAnySubmitting}
                                        onClick={() => changePlanMutation.mutate({ planKey: plan.key })}
                                        className="grow cursor-pointer">
                                        {isThisPlanSubmitting ? <Spinner /> : "Select Plan"}
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>

            <p className="text-muted-foreground text-center text-sm">Proration is handled automatically by Creem.</p>

            <Dialog
                open={isCancelDialogOpen}
                onOpenChange={(open) => {
                    if (!cancelPlanMutation.isPending) {
                        setIsCancelDialogOpen(open);
                    }
                }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cancel Subscription?</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to cancel your subscription? You will retain access to your premium
                            features until the end of your current billing cycle.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4 gap-3">
                        <Button
                            variant="ghost"
                            className="cursor-pointer"
                            onClick={() => setIsCancelDialogOpen(false)}
                            disabled={cancelPlanMutation.isPending}>
                            Keep Plan
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => cancelPlanMutation.mutate()}
                            className="cursor-pointer"
                            disabled={cancelPlanMutation.isPending}>
                            {cancelPlanMutation.isPending ? <Spinner className="mr-2" /> : null}
                            {cancelPlanMutation.isPending ? "Canceling..." : "Confirm Cancellation"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
