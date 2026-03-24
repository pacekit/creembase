import { CreditCard, Database, FileCode2, LayoutTemplate, Lock, Zap } from "lucide-react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

const features = [
    {
        name: "Supabase Authentication",
        description:
            "Secure user login built-in. Supports email/password, magic links, and OAuth providers (Google, GitHub) out of the box.",
        icon: Lock,
    },
    {
        name: "Creem Billing & Subscriptions",
        description:
            "Monetize your app instantly. Pre-configured pricing pages, checkout flows, and secure customer portal management.",
        icon: CreditCard,
    },
    {
        name: "PostgreSQL Database",
        description:
            "Fully configured Supabase DB with Row Level Security (RLS) policies set up to keep your user data completely secure.",
        icon: Database,
    },
    {
        name: "Beautiful UI Components",
        description:
            "Built with Tailwind CSS and Base-UI. Accessible, customizable, and visually stunning components ready to drop in.",
        icon: LayoutTemplate,
    },
    {
        name: "Next.js App Router",
        description:
            "Leverage the latest Next.js features including Server Components, Server Actions, and optimal SEO meta tagging.",
        icon: Zap,
    },
    {
        name: "100% TypeScript",
        description:
            "Strictly typed from the database schema up to the UI components. Catch errors before they hit production.",
        icon: FileCode2,
    },
];

export const Features = () => {
    return (
        <section id="features" className="container py-16 md:py-20 lg:py-28">
            <div className="mx-auto flex max-w-232 flex-col items-center space-y-4 text-center">
                <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Everything you need to launch</h2>
                <p className="text-muted-foreground max-w-[85%] sm:text-lg">
                    Skip the tedious setup phase. This boilerplate handles the foundational architecture so you can
                    focus entirely on your business logic.
                </p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3 md:px-12 xl:px-24">
                {features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                        <Card key={feature.name}>
                            <CardContent>
                                <div className="flex items-center gap-4">
                                    <div className="bg-muted rounded-md p-2">
                                        <Icon className="text-primary size-6" />
                                    </div>
                                    <CardTitle className="text-base font-medium">{feature.name}</CardTitle>
                                </div>
                                <p className="text-muted-foreground mt-4 text-sm">{feature.description}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
};
