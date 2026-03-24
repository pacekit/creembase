"use client";

import { ComponentProps } from "react";

import { Links } from "@/lib/links";

import { Button } from "@/components/ui/button";

export const DiscordButton = (props: ComponentProps<"a">) => {
    return (
        <Button
            variant="outline"
            size="icon"
            nativeButton={false}
            render={
                <a href={Links.external.discord} target="_blank" aria-label="Discord" {...props}>
                    <img src="/images/logos/discord.png" alt="Github" className="w-4.5 dark:invert" />
                </a>
            }></Button>
    );
};
