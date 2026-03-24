import { Metadata } from "next";
import { ReactNode } from "react";

import { Links } from "@/lib/links";

import { Providers } from "@/app/Providers";
import "@/styles/globals.css";

const config = {
    title: "CreemBase | Next.js, Supabase & Creem SaaS Boilerplate",
    description:
        "Launch your SaaS in days. The ultimate Next.js boilerplate featuring Supabase auth, secure databases, and complete Creem billing & subscription management out of the box.",
    keywords:
        "creem boilerplate, next.js creem template, saas starter kit creem, supabase creem integration, creem subscriptions, react saas with creem, creem billing starter, monetize with creem",
    url: "https://creembase.pacekit.dev",
    siteName: "CreemBase - Next.js & Creem Boilerplate",
    siteNameTwitter: Links.external.x,
    image: "/images/og-image.png",
    favicon: "/images/favicon-32.png",
};

export const metadata: Metadata = {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
        type: "website",
        title: config.title,
        description: config.description,
        images: [
            {
                url: config.image,
                alt: config.title,
            },
        ],
        url: config.url,
        siteName: config.siteName,
    },
    twitter: {
        card: "summary_large_image",
        title: config.title,
        description: config.description,
        site: config.siteNameTwitter,
        images: [
            {
                url: config.image,
                alt: config.title,
            },
        ],
    },
    icons: {
        icon: [{ url: config.favicon, type: "image/png", sizes: "32x32" }],
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased" suppressHydrationWarning>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
