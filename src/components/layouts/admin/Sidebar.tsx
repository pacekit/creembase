"use client";

import Link from "next/link";

import { DollarSignIcon, LayoutDashboardIcon, MailsIcon, UsersIcon } from "lucide-react";

import { Links } from "@/lib/links";

import { NavItem, SidebarNavContent } from "@/components/layouts/SidebarNavContent";
import { Logo } from "@/components/shared/Logo";
import { UpsaleCard } from "@/components/shared/UpsaleCard";
import { Sidebar, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";

const items: NavItem[] = [
    {
        title: "Navigation",
        items: [
            {
                title: "Dashboard",
                href: "/admin",
                icon: LayoutDashboardIcon,
            },
            {
                title: "Billing",
                href: "/admin/billing",
                icon: DollarSignIcon,
            },
        ],
    },
    {
        title: "Manage",
        items: [
            {
                title: "Item 1",
                href: "#item1",
                icon: UsersIcon,
            },
            {
                title: "Item 2",
                href: "#item2",
                icon: MailsIcon,
            },
        ],
    },
];

export const AdminSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader className="ps-4 pt-4 pb-0">
                <div className="flex items-center gap-2.5">
                    <Link href={Links.home}>
                        <Logo />
                    </Link>
                    <div className="bg-border h-5 w-px"></div>
                    <p className="text-muted-foreground font-medium">Admin</p>
                </div>
            </SidebarHeader>
            <SidebarNavContent items={items} />
            <SidebarFooter>
                <UpsaleCard />
            </SidebarFooter>
        </Sidebar>
    );
};
