import Link from "next/link";

import { CreemCheckout } from "@creem_io/nextjs";
import { User } from "@supabase/auth-js";
import { CheckIcon, XIcon } from "lucide-react";

import { formatCurrency } from "@/features/creem/helpers";
import { CREEM_PLANS } from "@/features/creem/plans";

import { Links } from "@/lib/links";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Pricing = ({ user }: { user?: User | null }) => {
    return (
        <div>
            <div className="mx-auto flex max-w-232 flex-col items-center space-y-4 text-center">
                <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Pricing</h2>
                <p className="text-muted-foreground max-w-[85%] sm:text-lg">
                    Choose a plan and start managing your subscription through Creem.
                </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {CREEM_PLANS.map((plan) => (
                    <Card key={plan.key} className="relative overflow-visible">
                        <CardHeader>
                            <div className="flex items-center justify-between gap-3">
                                <CardTitle className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                                    {plan.name}
                                </CardTitle>
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
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
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

                            <div className="mt-6">
                                {user ? (
                                    <Button
                                        nativeButton={false}
                                        size="lg"
                                        className="w-full cursor-pointer"
                                        render={
                                            <CreemCheckout
                                                checkoutPath="/payments/checkout"
                                                productId={plan.productId}
                                                units={1}
                                                referenceId={user.id}
                                                customer={{
                                                    email: user.email ?? undefined,
                                                    name:
                                                        (
                                                            user.user_metadata as unknown as {
                                                                full_name?: string;
                                                            }
                                                        )?.full_name ?? undefined,
                                                }}
                                                successUrl="/payments/billing/success"
                                                metadata={{ referenceId: user.id }}>
                                                Subscribe
                                            </CreemCheckout>
                                        }></Button>
                                ) : (
                                    <Button
                                        nativeButton={false}
                                        size="lg"
                                        className="w-full cursor-pointer"
                                        render={<Link href={Links.auth.signIn}>Sign in to subscribe</Link>}
                                    />
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
