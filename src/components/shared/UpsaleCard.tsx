import { ShoppingCartIcon } from "lucide-react";

import { Links } from "@/lib/links";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export const UpsaleCard = () => {
    return (
        <Card className="gap-2 py-3 text-center shadow-md">
            <CardHeader className="px-3 max-md:hidden">
                <CardTitle className="font-semibold">Reclaim 200+ Hours</CardTitle>
            </CardHeader>
            <CardContent className="px-3">
                <p>Skip weeks of setup and ship your project quickly</p>
            </CardContent>
            <CardFooter className="px-3 text-center">
                <Button
                    className="w-full gap-2.5 text-base"
                    nativeButton={false}
                    size="lg"
                    render={
                        <a href={Links.external.buy} target="_blank">
                            <ShoppingCartIcon className="size-4.5" />
                            Unlock Access
                        </a>
                    }></Button>
            </CardFooter>
        </Card>
    );
};
