"use client";

import { useEffect } from "react";

import { CheckIcon, MonitorIcon, MoonIcon, PaletteIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useLocalStorage } from "usehooks-ts";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const palettes = [
    {
        title: "Brand",
        slug: "brand",
    },
    {
        title: "Natural",
        slug: "natural",
    },
] as const;

type Palette = (typeof palettes)[number]["slug"];

const ThemePreview = ({ theme }: { theme?: string }) => {
    return (
        <div className="relative size-4.5 overflow-hidden rounded-sm" data-palette={theme}>
            <div className="absolute inset-s-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 rotate-45 flex-col gap-px">
                <div className="flex gap-px">
                    <div className="bg-primary size-5"></div>
                    <div className="bg-secondary size-5"></div>
                </div>
                <div className="flex gap-px">
                    <div className="bg-success size-5"></div>
                    <div className="bg-destructive size-5"></div>
                </div>
            </div>
        </div>
    );
};

export const ThemeManager = () => {
    const { setTheme, theme } = useTheme();
    const [selectedPalette, setSelectedPalette] = useLocalStorage<Palette>("_creembase_theme_manager_v0.1_", "brand");

    useEffect(() => {
        document.documentElement.setAttribute("data-palette", selectedPalette);
    }, [selectedPalette]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button variant="ghost" size="icon" className="cursor-pointer">
                        <PaletteIcon className="size-4.5" />
                        <span className="sr-only">Theme</span>
                    </Button>
                }></DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Theme</DropdownMenuLabel>
                    <ButtonGroup className="ps-2 pb-2">
                        <Button
                            variant="outline"
                            size="icon-sm"
                            aria-label="Light theme"
                            onClick={() => setTheme("light")}
                            className={cn("cursor-pointer", { "bg-accent": theme == "light" })}>
                            <SunIcon />
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setTheme("dark")}
                            size="icon-sm"
                            aria-label="Dark theme"
                            className={cn("cursor-pointer", { "bg-accent": theme == "dark" })}>
                            <MoonIcon />
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setTheme("system")}
                            size="icon-sm"
                            aria-label="System theme"
                            className={cn("cursor-pointer", { "bg-accent": theme == "system" })}>
                            <MonitorIcon />
                        </Button>
                    </ButtonGroup>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Palette</DropdownMenuLabel>
                    {palettes.map((palette, index) => (
                        <DropdownMenuItem
                            key={index}
                            onClick={() => setSelectedPalette(palette.slug)}
                            closeOnClick={false}
                            className="cursor-pointer">
                            <ThemePreview theme={palette.slug} />
                            <p className="grow">{palette.title}</p>
                            {selectedPalette == palette.slug && <CheckIcon />}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
