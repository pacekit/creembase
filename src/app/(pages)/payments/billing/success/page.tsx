import { redirect } from "next/navigation";

import { getCurrentSubscription } from "@/features/creem/subscription";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BillingSuccessPage = async () => {
    const { subscription } = await getCurrentSubscription();

    if (subscription?.is_active) {
        redirect("/admin");
    }

    return (
        <div className="mx-auto max-w-2xl px-4 py-12">
            <Card>
                <CardHeader>
                    <CardTitle>Payment received</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                        We&apos;re verifying your subscription and updating your account. This should take a moment.
                    </p>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Button
                            size="lg"
                            variant="default"
                            nativeButton={false}
                            render={<a href="/admin">Go to Dashboard</a>}
                        />
                        <Button
                            size="lg"
                            variant="outline"
                            nativeButton={false}
                            render={<a href="/payments/pricing">Back to Pricing</a>}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default BillingSuccessPage;
