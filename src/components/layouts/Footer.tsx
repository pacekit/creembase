import Link from "next/link";

import { Links } from "@/lib/links";

import { DiscordButton } from "@/components/shared/socials/DiscordButton";
import { GithubButton } from "@/components/shared/socials/GithubButton";
import { TwitterButton } from "@/components/shared/socials/TwitterButton";

export const Footer = () => {
    return (
        <footer className="mt-auto">
            <div className="bg-muted/20 border-y border-dashed">
                <div className="container py-8 md:py-12 xl:py-16">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-12">
                        <div className="flex flex-col">
                            <p className="text-2xl font-semibold">CreemBase</p>
                            <p className="text-muted-foreground mt-4 max-w-xs text-sm leading-relaxed">
                                The complete Next.js, Supabase, and Creem boilerplate. Stop wrestling with auth and
                                payments, and launch your SaaS in record time.
                            </p>
                            <div className="mt-6 flex gap-3 xl:mt-8">
                                <GithubButton />
                                <DiscordButton />
                                <TwitterButton />
                            </div>
                        </div>
                        <div className="max-lg:hidden"></div>
                        <div>
                            <p className="text-lg font-medium">Product</p>
                            <div className="*:not-hover:text-muted-foreground mt-4 flex flex-col gap-3 text-sm *:transition-colors">
                                <a href="#features">Features</a>
                                <a href="#pricing">Pricing</a>
                                <Link href="#changelog">Changelog</Link>
                            </div>
                        </div>
                        <div>
                            <p className="text-lg font-medium">Resources</p>
                            <div className="*:not-hover:text-muted-foreground mt-4 flex flex-col gap-3 text-sm *:transition-colors">
                                <Link href="#docs">Documentation</Link>
                                <Link href="#license">License</Link>
                                <a href={Links.external.website} target="_blank">
                                    Support
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-6">
                <p className="text-muted-foreground text-center text-sm">
                    Built by{" "}
                    <a
                        href={Links.external.x}
                        className="text-foreground font-medium hover:underline"
                        target="_blank"
                        rel="noreferrer">
                        Den
                    </a>
                    . All rights reserved.
                </p>
            </div>
        </footer>
    );
};
