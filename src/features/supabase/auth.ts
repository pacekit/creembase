"use server";

import { z } from "zod";

import { createSupabaseServerClient } from "@/features/supabase/server";

import { Links } from "@/lib/links";

import { SignInSchema, SignUpSchema, signInSchema, signUpSchema } from "./schema";

const oauthProviderSchema = z.enum(["google", "github"]);

export async function signInAction(input: SignInSchema) {
    const parsed = signInSchema.safeParse(input);
    if (!parsed.success) return { error: "Invalid sign-in payload" };

    const supabase = createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    if (error) return { error: error.code };

    return { redirectTo: Links.admin };
}

export async function signUpAction(input: SignUpSchema) {
    const parsed = signUpSchema.safeParse(input);
    if (!parsed.success) return { error: "Invalid sign-in payload" };

    const supabase = createSupabaseServerClient();
    const { error } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: {
            data: { full_name: parsed.data.name },
        },
    });

    if (error) return { error: error.code };
    return { redirectTo: Links.admin };
}

export async function startOAuthAction(input: { provider?: string }) {
    const parsed = oauthProviderSchema.safeParse(input?.provider);
    if (!parsed.success) throw new Error("Invalid OAuth provider");

    const supabase = createSupabaseServerClient();

    const redirectTo = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: parsed.data,
        options: { redirectTo },
    });

    if (error) throw new Error(error.message);
    return { url: data.url };
}

export async function signOutAction() {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}
