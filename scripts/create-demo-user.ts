import { createClient } from "@supabase/supabase-js";

import { demoUser } from "@/features/supabase/demo-user";

import { requiredEnv } from "./env";

const SUPABASE_URL = requiredEnv("NEXT_PUBLIC_SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = requiredEnv("SUPABASE_SERVICE_ROLE_KEY");

const ensureDemoUser = async () => {
    type CreateUserParams = {
        email: string;
        password: string;
        email_confirm?: boolean;
        data?: Record<string, unknown>;
    };

    type SupabaseAdminClient = {
        auth: {
            admin: {
                createUser: (params: CreateUserParams) => Promise<{ error: { message?: string } | null }>;
            };
        };
    };

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) as unknown as SupabaseAdminClient;

    try {
        const { error } = await supabaseAdmin.auth.admin.createUser({
            email: demoUser.email,
            password: demoUser.password,
            email_confirm: true,
            data: { full_name: demoUser.fullName },
        });

        if (error) {
            const message = error?.message ?? "";
            if (/already registered|duplicate|already exists/i.test(message)) {
                console.log(`Demo user already exists: ${demoUser.email}`);
                return;
            }
            throw error;
        }

        console.log(`Demo user created: ${demoUser.email}`);
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        if (/already registered|duplicate|already exists/i.test(message)) {
            console.log(`Demo user already exists: ${demoUser.email}`);
            return;
        }
        throw err;
    }
};

const main = async () => {
    console.log("Ensuring demo user exists ...");
    await ensureDemoUser();
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
