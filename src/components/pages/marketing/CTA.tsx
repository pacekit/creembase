import Link from "next/link";

import { ArrowRightIcon } from "lucide-react";

import { Links } from "@/lib/links";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const CTA = () => {
    return (
        <section className="container py-16 md:py-24">
            <Card className="relative px-6 py-16 text-center sm:px-16 sm:py-24">
                <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-balance sm:text-4xl md:text-5xl">
                    Stop building from scratch.
                </h2>
                <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg leading-8">
                    Save hundreds of hours of development time. Grab the boilerplate today, connect your API keys, and
                    start working on what makes your app unique.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center">
                    <Button
                        size="lg"
                        className="h-12 px-6"
                        nativeButton={false}
                        render={
                            <Link href={Links.admin}>
                                Get Started Now
                                <ArrowRightIcon className="size-4" />
                            </Link>
                        }
                    />
                </div>
            </Card>
        </section>
    );
};
