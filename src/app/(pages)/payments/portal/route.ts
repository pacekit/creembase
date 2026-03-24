import { Portal } from "@creem_io/nextjs";

export const GET = Portal({
    apiKey: process.env.CREEM_API_KEY!,
    testMode: process.env.CREEM_TEST_MODE === "true",
});
