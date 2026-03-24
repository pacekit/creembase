import Link from "next/link";

import { Links } from "@/lib/links";

export const AdminFooter = () => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-dashed px-8 py-2.5 xl:py-4">
            <p className="">
                Demo by{" "}
                <a href={Links.external.website} className="hover:underline" target="_blank">
                    PaceKit
                </a>
            </p>
            <div className="*:not-hover:text-muted-foreground flex items-center gap-4 *:transition-all">
                <Link href="#support">Support</Link>
                <Link href="#help">Help</Link>
                <Link href="#privacy">Privacy</Link>
            </div>
        </div>
    );
};
