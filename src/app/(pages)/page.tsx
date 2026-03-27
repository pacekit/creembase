import Link from "next/link";

import { getSupabaseUser } from "@/features/supabase/user";

import { Pricing } from "@/components/features/creem/Pricing";
import { CTA } from "@/components/pages/marketing/CTA";
import { Features } from "@/components/pages/marketing/Features";
import { Hero } from "@/components/pages/marketing/Hero";

const MarketingPage = async () => {
    const user = await getSupabaseUser();

    return (
        <div>
            <Hero />
            <Features />
            <section id="pricing" className="container py-16 md:px-12 md:py-20 lg:py-28 xl:px-24">
                <Pricing user={user} />
                <p className="mt-2 xl:mt-3">
                    For more information, view the full{" "}
                    <Link href="/payments/pricing" className="text-primary hover:underline">
                        pricing
                    </Link>
                </p>
            </section>
            <CTA />
        </div>
    );
};

export default MarketingPage;
