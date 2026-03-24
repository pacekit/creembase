"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export type NavItem = {
    title: string;
    icon?: LucideIcon;
} & ({ href: string; items?: never } | { items: NavItem[]; href?: never });

export const SidebarNavContent = ({ items }: { items: NavItem[] }) => {
    const pathname = usePathname();
    return (
        <SidebarContent>
            <SidebarMenu className={cn("gap-0.5", !items[0]?.items && "pt-3")}>
                {items.map((item, index) => {
                    if (item.items) {
                        return (
                            <SidebarGroup key={index}>
                                <SidebarGroupLabel className="text-sm">{item.title}</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {item.items.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton
                                                    isActive={pathname === item.href}
                                                    render={
                                                        <Link
                                                            href={item.href ?? ""}
                                                            target={
                                                                item.href?.startsWith("http") ? "_blank" : undefined
                                                            }>
                                                            {item.icon && <item.icon className="size-4.5!" />}
                                                            <span className="text-base">{item.title}</span>
                                                        </Link>
                                                    }></SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        );
                    }
                    return (
                        <SidebarMenuItem key={index} className="px-2">
                            <SidebarMenuButton
                                isActive={pathname === item.href}
                                render={
                                    <Link href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined}>
                                        {item.icon && <item.icon className="size-4.5!" />}
                                        <span className="text-base">{item.title}</span>
                                    </Link>
                                }></SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarContent>
    );
};
