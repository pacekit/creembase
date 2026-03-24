"use client";

import { ComponentProps } from "react";

import { Links } from "@/lib/links";

import { Button } from "@/components/ui/button";

export const TwitterButton = (props: ComponentProps<"a">) => {
    return (
        <Button
            variant="outline"
            size="icon"
            nativeButton={false}
            render={
                <a href={Links.external.x} target="_blank" aria-label="X (Twitter)" {...props}>
                    <img src="/images/logos/x.png" alt="X (Twitter)" className="size-4 dark:invert" />
                </a>
            }></Button>
    );
};
