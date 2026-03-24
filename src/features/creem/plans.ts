export type CreemPlan = {
    key: string;
    name: string;
    productId: string;
    priceCents: number;
    description: string;
    mostPopular?: boolean;
    features?: {
        included: string[];
        excluded: string[];
    };
};

export const CREEM_PLANS: CreemPlan[] = [
    {
        key: "hobby",
        name: "Hobby",
        productId: "prod_6uiihKbh2Z7e945l5ECCfx",
        priceCents: 2900,
        description: "Perfect for side projects and individual developers launching new ideas",
        features: {
            included: ["Up to 1 Team Member", "10,000 API requests/mo", "5GB Storage"],
            excluded: ["Custom Domains", "24/7 Priority Support"],
        },
    },
    {
        key: "startup",
        name: "Startup",
        productId: "prod_5YCdk0CGbvXEHRiu0krKIR",
        priceCents: 4900,
        mostPopular: true,
        description: "Everything you need to collaborate and scale your MVP faster with confidence",
        features: {
            included: ["Up to 5 Team Members", "100,000 API requests/mo", "50GB Storage", "Custom Domains"],
            excluded: ["24/7 Priority Support"],
        },
    },
    {
        key: "enterprise",
        name: "Enterprise",
        productId: "prod_1nTAoCUoWBf54TOvfaWyyt",
        priceCents: 19900,
        description: "Advanced security, unlimited scale, and dedicated support for growing teams",
        features: {
            included: [
                "Unlimited Team Members",
                "Unlimited API requests",
                "500GB Storage",
                "Custom Domains",
                "24/7 Priority Support",
            ],
            excluded: [],
        },
    },
];
