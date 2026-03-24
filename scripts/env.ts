import dotenv from "dotenv";

dotenv.config({ path: process.env.ENV_FILE ?? ".env.local" });

export const requiredEnv = (name: string) => {
    const value = process.env[name];
    if (!value) throw new Error(`Missing required env var: ${name}`);
    return value;
};
