import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/features/supabase/server";

import { Links } from "@/lib/links";

export async function GET(req: Request) {
    const supabase = createSupabaseServerClient();

    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "Missing OAuth code" }, { status: 400 });
    }

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    redirect(Links.admin);
}
