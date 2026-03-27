import { getSupabaseUser } from "@/features/supabase/user";

import { Pricing } from "@/components/features/creem/Pricing";
import { PricingComparison } from "@/components/features/creem/PricingComparison";
import { PricingFaqs } from "@/components/features/creem/PricingFaqs";

const PricingPage = async () => {
    const user = await getSupabaseUser();

    return (
        <div className="md:py-12 xl:py-20">
            <Pricing user={user} />
            <PricingComparison />
            <PricingFaqs />
        </div>
    );
};

export default PricingPage;
