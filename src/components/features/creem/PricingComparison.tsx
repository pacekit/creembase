import { Fragment } from "react";

import { CheckIcon, MinusIcon } from "lucide-react";

import { CREEM_PLANS } from "@/features/creem/plans";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const COMPARISON_FEATURES = [
    {
        name: "Core Features",
        features: [
            {
                name: "Team Members",
                hobby: "1 Member",
                startup: "5 Members",
                enterprise: "Unlimited",
            },
            {
                name: "API Requests /mo",
                hobby: "10,000",
                startup: "100,000",
                enterprise: "Unlimited",
            },
            {
                name: "Storage",
                hobby: "5GB",
                startup: "50GB",
                enterprise: "500GB",
            },
            {
                name: "Custom Domains",
                hobby: false,
                startup: true,
                enterprise: true,
            },
        ],
    },
    {
        name: "Security & Support",
        features: [
            {
                name: "Support Tier",
                hobby: "Community",
                startup: "Email",
                enterprise: "24/7 Priority",
            },
            {
                name: "SLA Guarantee",
                hobby: false,
                startup: "99.9%",
                enterprise: "99.99%",
            },
            {
                name: "SSO / SAML",
                hobby: false,
                startup: false,
                enterprise: true,
            },
            {
                name: "Data Retention",
                hobby: "30 Days",
                startup: "1 Year",
                enterprise: "Unlimited",
            },
        ],
    },
];

export const PricingComparison = () => {
    return (
        <section className="mt-24 space-y-12">
            <div className="mx-auto flex max-w-232 flex-col items-center space-y-4 text-center">
                <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Compare Plan Features</h2>
                <p className="text-muted-foreground max-w-[85%] sm:text-lg">
                    A detailed breakdown to help you choose the right tier for your needs.
                </p>
            </div>

            <div className="border-border grid overflow-hidden rounded-xl border">
                <Table className="min-w-200">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="sticky left-0 z-9 w-1/4 px-6 py-6 font-semibold shadow-[1px_0_0_0_var(--border)]">
                                Feature
                            </TableHead>
                            {CREEM_PLANS.map((plan) => (
                                <TableHead key={plan.key} className="w-1/4 px-6 py-6 text-center whitespace-normal">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-base font-medium">{plan.name}</span>
                                        <span className="text-muted-foreground max-w-64 text-xs whitespace-normal">
                                            {plan.description}
                                        </span>
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {COMPARISON_FEATURES.map((category) => (
                            <Fragment key={category.name}>
                                <TableRow key={category.name} className="bg-muted/50 border-none">
                                    <TableCell className="bg-muted/50 text-muted-foreground sticky left-0 z-10 px-6 py-3 text-xs font-semibold tracking-wider uppercase shadow-[1px_0_0_0_var(--border)]">
                                        {category.name}
                                    </TableCell>
                                    <TableCell className="bg-muted/50"></TableCell>
                                    <TableCell className="bg-muted/50"></TableCell>
                                    <TableCell className="bg-muted/50"></TableCell>
                                </TableRow>
                                {category.features.map((feature) => (
                                    <TableRow key={feature.name} className="hover:bg-transparent">
                                        <TableCell className="bg-background sticky left-0 z-10 px-6 py-4 font-medium shadow-[1px_0_0_0_var(--border)]">
                                            {feature.name}
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-center">
                                            {renderFeatureValue(feature.hobby)}
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-center">
                                            {renderFeatureValue(feature.startup)}
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-center">
                                            {renderFeatureValue(feature.enterprise)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </Fragment>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
};

const renderFeatureValue = (value: string | boolean) => {
    if (typeof value === "boolean") {
        return value ? (
            <CheckIcon className="text-success mx-auto size-5" />
        ) : (
            <MinusIcon className="text-muted-foreground mx-auto size-5" />
        );
    }
    return <span className="text-foreground text-sm">{value}</span>;
};
