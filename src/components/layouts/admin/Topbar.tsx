"use client";

import Link from "next/link";

import { User } from "@supabase/auth-js";
import { DollarSignIcon, LogOutIcon, SearchIcon } from "lucide-react";

import { Links } from "@/lib/links";

import { ThemeManager } from "@/components/shared/ThemeManager";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const AdminTopbar = ({ user }: { user?: User | null }) => {
    return (
        <>
            <div className="bg-background/90 sticky top-0 flex h-15 min-h-15 w-full items-center justify-between border-b px-4 backdrop-blur-xs">
                <div className="flex items-center gap-2">
                    <SidebarTrigger size="icon" />
                    <div className="relative w-36 sm:w-44">
                        <SearchIcon className="text-muted-foreground absolute start-3 top-1/2 size-4 -translate-y-1/2" />
                        <Input className="ps-10" placeholder="Search..." />
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    <ThemeManager />
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarFallback>D</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-42">
                            <div className="p-2">
                                <p className="text-foreground text-sm/none font-medium">
                                    {(user?.user_metadata as { full_name?: string } | undefined)?.full_name ?? "Den"}
                                </p>
                                <p className="text-muted-foreground mt-0.5 text-xs/none">User</p>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                render={
                                    <Link href="/admin/billing">
                                        <DollarSignIcon className="size-4" />
                                        Billing
                                    </Link>
                                }></DropdownMenuItem>
                            <DropdownMenuItem
                                variant="destructive"
                                render={
                                    <Link href={Links.auth.signOut}>
                                        <LogOutIcon className="size-4" />
                                        <p>Logout</p>
                                    </Link>
                                }></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </>
    );
};
