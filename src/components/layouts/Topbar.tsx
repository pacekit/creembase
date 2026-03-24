import Link from "next/link";

import { User } from "@supabase/auth-js";
import { DollarSignIcon, LogOutIcon } from "lucide-react";

import { Links } from "@/lib/links";

import { Logo } from "@/components/shared/Logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ThemeManager } from "../shared/ThemeManager";
import { HorizontalMenu } from "./HorizontalMenu";

export const Topbar = ({ user }: { user?: User | null }) => {
    return (
        <div className="bg-background/85 sticky top-0 z-10 border-b border-dashed backdrop-blur-sm">
            <div className="container flex h-15 min-h-15 items-center justify-between gap-3">
                <div className="flex items-center justify-between gap-2">
                    <Link href={Links.home}>
                        <Logo />
                    </Link>
                </div>

                <HorizontalMenu />
                <div className="flex items-center gap-1.5">
                    <ThemeManager />
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                nativeButton={false}
                                render={
                                    <Avatar>
                                        <AvatarFallback>D</AvatarFallback>
                                    </Avatar>
                                }></DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-42">
                                <div className="p-2">
                                    <p className="text-foreground text-sm/none font-medium">Den N.</p>
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
                    ) : (
                        <Button nativeButton={false} render={<Link href={Links.auth.signIn}>Sign In</Link>}></Button>
                    )}
                </div>
            </div>
        </div>
    );
};
