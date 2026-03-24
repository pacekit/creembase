import Link from "next/link";

import { ArrowRightIcon, TerminalIcon } from "lucide-react";

import { Links } from "@/lib/links";

import { Button } from "@/components/ui/button";

export const Hero = () => {
    return (
        <div className="relative container py-6 md:py-8 lg:py-12 xl:py-16 2xl:py-24">
            <div className="relative flex justify-center">
                <div className="flex flex-col items-center text-center">
                    <a
                        className="bg-card hover:bg-muted/50 flex items-center gap-2 rounded-xl border px-4 py-1 text-sm font-medium shadow-xs"
                        target="_blank"
                        href={Links.external.buy}>
                        Supabase & Creem Integration
                    </a>

                    <h1 className="mt-6 text-4xl leading-tight font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl lg:mt-8 2xl:text-7xl">
                        Ship your SaaS in <br className="hidden sm:block" />
                        days, not months
                    </h1>

                    <h2 className="text-muted-foreground mt-4 max-w-3xl text-base text-balance sm:mt-6 sm:text-lg md:text-xl lg:mt-8">
                        The ultimate Next.js boilerplate. Start with a production ready foundation featuring
                        <span className="text-foreground font-semibold"> Supabase Auth & DB</span> and
                        <span className="text-foreground font-semibold"> Creem Subscriptions</span> so you can focus on
                        building your actual product.
                    </h2>

                    <div className="mt-8 flex flex-wrap justify-center gap-3 max-sm:items-center sm:mt-10 xl:mt-12">
                        <Button
                            size="lg"
                            className="h-12 gap-2.5 px-8 text-base shadow-lg"
                            nativeButton={false}
                            render={
                                <Link href={Links.admin}>
                                    Get Started
                                    <ArrowRightIcon className="size-4" />
                                </Link>
                            }
                        />
                        <Button
                            size="lg"
                            variant="secondary"
                            className="bg-background h-12 gap-2.5 px-8 text-base"
                            nativeButton={false}
                            render={
                                <Link href={Links.external.buy} target="_blank">
                                    <TerminalIcon className="size-4.5 sm:size-5" />
                                    Get the Boilerplate
                                </Link>
                            }
                        />
                    </div>

                    <p className="text-muted-foreground mt-12 text-sm font-semibold tracking-wider uppercase sm:mt-16 xl:mt-20">
                        Powered by modern tools
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-6 xl:mt-8 xl:gap-10 2xl:gap-12">
                        <img src="https://cdn.simpleicons.org/nextdotjs" className="h-10 dark:invert" alt="Next.js" />
                        <img src="https://cdn.simpleicons.org/supabase/3ECF8E" className="h-10" alt="Supabase" />

                        <img
                            src="https://creem.io/favicon.ico"
                            className="h-10 rounded-sm dark:invert"
                            alt="Creem icon"
                        />
                        <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" className="h-10" alt="Tailwind CSS" />
                        <img src="https://cdn.simpleicons.org/vercel" className="h-10 dark:invert" alt="Vercel" />
                    </div>
                </div>
            </div>
        </div>
    );
};
