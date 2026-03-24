"use client";

import { ComponentProps } from "react";

import { Links } from "@/lib/links";

import { Button } from "@/components/ui/button";

export const GithubButton = (props: ComponentProps<"a">) => {
    return (
        <Button
            variant="outline"
            size="icon"
            nativeButton={false}
            render={
                <a href={Links.external.github} target="_blank" aria-label="Github" {...props}>
                    <img src="/images/logos/github.png" alt="Github" className="size-4.5 dark:invert" />
                </a>
            }></Button>
    );
};
