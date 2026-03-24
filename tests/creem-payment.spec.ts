import { expect, test } from "@playwright/test";

import { demoUser } from "@/features/supabase/demo-user";

test.describe("Creem Payment Flow", () => {
    test("should navigate to Creem checkout after clicking subscribe", async ({ page }) => {
        // 1. Navigate to Sign In page
        await page.goto("/sign-in");

        // 2. Fill in the demo user credentials
        await page.getByLabel("Email Address").fill(demoUser.email);
        await page.getByLabel("Password").fill(demoUser.password);

        // 3. Click Sign In
        await page.getByRole("button", { name: "Sign In", exact: true }).click();

        // 4. Wait for successful login (wait until URL leaves the /sign-in page)
        await page.waitForURL((url) => !url.pathname.includes("/sign-in"), { timeout: 10000 });

        // 5. Navigate explicitly to the pricing page if the middleware didn't already redirect us there
        if (!page.url().includes("/payments/pricing")) {
            await page.goto("/payments/pricing");
        }

        // 6. Verify we are on the pricing page mapping correctly
        await expect(page.getByRole("heading", { name: /Pricing/i })).toBeVisible();

        // 7. Click on the first "Subscribe" button
        // The Subscribe button triggers a CreemCheckout component.
        const subscribeButton = page.getByRole("button", { name: "Subscribe" }).first();
        await expect(subscribeButton).toBeVisible();

        // We can intercept the request or check the URL change, but since CreemCheckout
        // transitions to an external link, we might want to just assert the button click behavior.
        // Let's create a Promise to wait for the page to navigate to something else

        await subscribeButton.click();

        // Wait until the URL changes to the creem checkout
        await page.waitForURL("**/checkout/**", { timeout: 15000 });

        // Check that the URL is the checkout page
        expect(page.url()).toContain("checkout");

        // Wait for 2 seconds to let the Creem checkout page fully load its contents
        await page.waitForTimeout(4000);

        // Take a screenshot of the checkout page
        await page.screenshot({ path: "playwright-report/creem-checkout-page.png", fullPage: true });
    });
});
