import { getSupabaseUser } from "@/features/supabase/user";

import { Pricing } from "@/components/features/creem/Pricing";

const PricingPage = async () => {
    const user = await getSupabaseUser();

    return (
        <div className="md:py-12 xl:py-20">
            <Pricing user={user} />
        </div>
    );
};

export default PricingPage;
