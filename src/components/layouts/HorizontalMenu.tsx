"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { DollarSignIcon, HomeIcon, ShieldUserIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { NavItem } from "./SidebarNavContent";

const items: NavItem[] = [
    {
        title: "Home",
        href: "/",
        icon: HomeIcon,
    },

    {
        title: "Pricing",
        href: "/#pricing",
        icon: DollarSignIcon,
    },
    {
        title: "Admin",
        href: "/admin",
        icon: ShieldUserIcon,
    },
];
export const HorizontalMenu = () => {
    const pathname = usePathname();

    return (
        <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-0.5">
                {items.map((item, index) => {
                    if (item.items == null) {
                        return (
                            <NavigationMenuItem key={index}>
                                <NavigationMenuLink
                                    className={navigationMenuTriggerStyle({ className: "bg-transparent" })}
                                    render={
                                        <Link
                                            href={item.href}
                                            target={item.href?.includes("http") ? "_blank" : undefined}>
                                            {item.title}
                                        </Link>
                                    }></NavigationMenuLink>
                            </NavigationMenuItem>
                        );
                    }
                    return (
                        <NavigationMenuItem key={index}>
                            <NavigationMenuTrigger className="bg-transparent">{item.title}</NavigationMenuTrigger>
                            <NavigationMenuContent className="w-48 gap-4 space-y-0.5">
                                {item.items?.map((item, index) => (
                                    <NavigationMenuLink
                                        key={index}
                                        className={cn({
                                            "bg-accent": pathname === item.href,
                                        })}
                                        render={
                                            <Link
                                                href={item.href ?? ""}
                                                target={item.href?.includes("http") ? "_blank" : undefined}>
                                                {item.icon && <item.icon />}
                                                {item.title}
                                            </Link>
                                        }></NavigationMenuLink>
                                ))}
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    );
                })}
            </NavigationMenuList>
        </NavigationMenu>
    );
};
