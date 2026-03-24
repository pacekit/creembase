import Link from "next/link";

import { ArrowLeftIcon } from "lucide-react";

import { Links } from "@/lib/links";

import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
    return (
        <>
            <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
                <p className="text-4xl font-semibold">Page Not Found</p>
                <p className="text-muted-foreground max-w-lg">
                    Sorry, we couldn&#39;t find the page you&#39;re looking for.
                </p>
                <Button
                    className="gap-2"
                    size="lg"
                    nativeButton={false}
                    render={
                        <Link href={Links.home}>
                            <ArrowLeftIcon />
                            Back to Home
                        </Link>
                    }></Button>
            </div>
        </>
    );
};

export default NotFoundPage;
