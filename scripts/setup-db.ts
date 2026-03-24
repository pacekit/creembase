import fs from "node:fs";
import path from "node:path";
import { Client as PgClient } from "pg";

import { requiredEnv } from "./env";

const SUPABASE_DB_URL = requiredEnv("SUPABASE_DB_URL");

const collectSqlFiles = () => {
    const dir = path.join(process.cwd(), "src/features/supabase/migrations");
    if (!fs.existsSync(dir)) return [];

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const sqlFiles: string[] = [];

    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isFile() && entry.name.endsWith(".sql")) {
            sqlFiles.push(full);
        }
    }
    return sqlFiles.sort((a, b) => a.localeCompare(b));
};

const runSqlFiles = async (client: PgClient, sqlFiles: string[]) => {
    for (const file of sqlFiles) {
        const sql = fs.readFileSync(file, "utf8");
        if (!sql.trim()) continue;
        console.log(`Executing: ${path.relative(process.cwd(), file)}`);
        await client.query(sql);
    }
};

const main = async () => {
    console.log("Setting up database schema from supabase/migrations ...");

    const sqlFiles = collectSqlFiles();
    if (sqlFiles.length === 0) {
        throw new Error("No SQL files found in supabase/migrations. Check the folder paths.");
    }

    const pg = new PgClient({ connectionString: SUPABASE_DB_URL });
    await pg.connect();
    try {
        await runSqlFiles(pg, sqlFiles);
    } finally {
        await pg.end();
    }

    console.log("Done.");
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
