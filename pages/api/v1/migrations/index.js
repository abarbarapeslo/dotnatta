import { join } from "node:path";
import { runner as migrationRunner } from "node-pg-migrate";
import database from "../../../../infra/database.js";

const defaultRunnerOptions = {
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
};

function toMigrationList(migrations) {
    return migrations.map((migration) => ({
        name: migration.name,
    }));
}

async function getAppliedMigrations(dbClient) {
    try {
        const result = await dbClient.query({
            text: "SELECT name FROM pgmigrations ORDER BY run_on ASC, id ASC",
        });

        return result.rows.map((row) => ({
            name: row.name,
        }));
    } catch {
        return [];
    }
}

async function migrations(request, response) {
    if (request.method !== "GET" && request.method !== "POST") {
        return response.status(405).json({
            error: `Method "${request.method}" not allowed`,
        });
    }

    let dbClient;

    try {
        dbClient = await database.getNewClient();

        const runnerMigrations = await migrationRunner({
            ...defaultRunnerOptions,
            dbClient,
            dryRun: request.method === "GET",
        });

        if (request.method === "GET") {
            return response.status(200).json({
                pending_migrations: toMigrationList(runnerMigrations),
                applied_migrations: await getAppliedMigrations(dbClient),
            });
        }

        const appliedNow = toMigrationList(runnerMigrations);
        const statusCode = appliedNow.length > 0 ? 201 : 200;

        return response.status(statusCode).json({
            applied_migrations: appliedNow,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Internal server error" });
    } finally {
        await dbClient?.end();
    }
}

export default migrations;
