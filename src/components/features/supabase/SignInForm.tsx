"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitEvent } from "react";
import { useState } from "react";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { LogInIcon, MailIcon } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { signInAction, startOAuthAction } from "@/features/supabase/auth";
import { demoUser } from "@/features/supabase/demo-user";

import { setFieldError } from "@/components/shared/forms";
import { FormInput } from "@/components/shared/forms/FormInput";
import { FormPasswordInput } from "@/components/shared/forms/FormPasswordInput";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const schema = z.object({
    email: z.email("Please enter a valid email address."),
    password: z.string("Please create a password.").min(8, "Password must be at least 8 characters long."),
});

type Schema = z.infer<typeof schema>;

export const SignInForm = () => {
    const router = useRouter();
    const [oauthLoading, setOauthLoading] = useState<string | null>(null);

    const signInMutation = useMutation({
        mutationFn: async (value: Schema) => {
            const { redirectTo, error } = await signInAction(value);
            if (!error && redirectTo) {
                return router.replace(redirectTo);
            }
            if (error == "invalid_credentials") {
                setFieldError(form, "password", "Invalid password");
            } else {
                toast.error("Sign in failed");
            }
        },
    });

    const form = useForm({
        defaultValues: demoUser as Schema,
        validationLogic: revalidateLogic(),
        validators: {
            onDynamic: schema,
        },
        onSubmit: ({ value }) => {
            signInMutation.mutate(value);
        },
    });

    const onSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        form.handleSubmit();
    };

    const startOAuth = async (provider: string) => {
        try {
            setOauthLoading(provider);
            const { url } = await startOAuthAction({ provider });
            window.location.href = url;
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "OAuth failed");
        } finally {
            setOauthLoading(null);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <FormInput
                label="Email Address"
                form={form}
                name="email"
                className="mt-1"
                placeholder="Enter Email"
                prefix={<MailIcon className="text-muted-foreground size-4.5" />}
            />
            <div className="mt-2">
                <FormPasswordInput form={form} name="password" placeholder="Password" label="Password" />
            </div>
            <div className="mt-6 flex items-center justify-center">
                <Button disabled={signInMutation.isPending} type="submit" className="cursor-pointer">
                    {signInMutation.isPending ? <Spinner /> : <LogInIcon className="size-4" />}
                    Sign In
                </Button>
            </div>
            <div className="mt-4 flex justify-center">
                <Link href="/sign-up" className="not-hover:text-muted-foreground text-sm transition-all">
                    New here? Create an Account
                </Link>
            </div>

            <div className="mt-6 flex flex-col items-stretch justify-center gap-2">
                <div className="text-muted-foreground text-center text-sm">Or continue with</div>
                <Button
                    type="button"
                    variant="outline"
                    disabled={oauthLoading !== null}
                    onClick={() => startOAuth("google")}
                    className="w-full cursor-pointer">
                    {oauthLoading === "google" ? <Spinner /> : "Google"}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    disabled={oauthLoading !== null}
                    onClick={() => startOAuth("github")}
                    className="w-full cursor-pointer">
                    {oauthLoading === "github" ? <Spinner /> : "GitHub"}
                </Button>
            </div>
        </form>
    );
};
