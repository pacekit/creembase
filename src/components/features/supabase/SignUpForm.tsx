"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { MailIcon, UserIcon, UserPlusIcon } from "lucide-react";
import { toast } from "sonner";

import { signUpAction, startOAuthAction } from "@/features/supabase/auth";
import { SignUpSchema, signUpSchema } from "@/features/supabase/schema";

import { FormInput, FormPasswordInput, setFieldError } from "@/components/shared/forms";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export const SignUpForm = () => {
    const router = useRouter();
    const [oauthLoading, setOauthLoading] = useState<string | null>(null);

    const signUpMutation = useMutation({
        mutationFn: async (value: SignUpSchema) => {
            const { redirectTo, error } = await signUpAction(value);
            if (!error && redirectTo) {
                return router.replace(redirectTo);
            }
            if (error == "email_already_in_use") {
                setFieldError(form, "email", "Email already in use");
            } else if (error == "email_address_invalid") {
                setFieldError(form, "email", "Invalid email");
            } else {
                toast.error(error ?? "Sign up failed");
            }
        },
    });

    const form = useForm({
        defaultValues: {} as SignUpSchema,
        validationLogic: revalidateLogic(),
        validators: {
            onDynamic: signUpSchema,
        },
        onSubmit: ({ value }) => {
            signUpMutation.mutate(value);
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
                label="Full Name"
                form={form}
                name="name"
                className="mt-1"
                placeholder="Full Name"
                prefix={<UserIcon className="text-muted-foreground size-4.5" />}
            />
            <div className="mt-3">
                <FormInput
                    label="Email Address"
                    form={form}
                    name="email"
                    className="mt-1"
                    placeholder="Enter Email"
                    prefix={<MailIcon className="text-muted-foreground size-4.5" />}
                />
            </div>
            <div className="mt-3">
                <FormPasswordInput
                    form={form}
                    name="password"
                    className="mt-1"
                    placeholder="Password"
                    label="Password"
                />
            </div>

            <div className="mt-6 flex flex-col items-center justify-center gap-4">
                <Button
                    type="submit"
                    className="cursor-pointer gap-2"
                    disabled={signUpMutation.isPending}
                    aria-label="Sign Up">
                    {signUpMutation.isPending ? <Spinner /> : <UserPlusIcon className="size-4" />}
                    Create an Account
                </Button>
                <div className="flex justify-end">
                    <Link href="/sign-in" className="not-hover:text-muted-foreground text-sm transition-all">
                        Already have an account? Sign In
                    </Link>
                </div>
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
