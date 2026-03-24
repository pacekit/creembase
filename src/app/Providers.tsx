"use client";

import { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider attribute={["class", "data-theme"]}>
            <Toaster />
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            <Analytics />
        </ThemeProvider>
    );
};
