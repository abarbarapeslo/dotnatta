const AUTH_MIGRATION = "20260913203300_create-auth-tables";

test("GET ao endpoint /migrations", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations");
    expect(response.status).toBe(200);

    const responseBody = await response.json();

    expect(Array.isArray(responseBody.pending_migrations)).toBe(true);
    expect(Array.isArray(responseBody.applied_migrations)).toBe(true);

    const migrationNames = [
        ...responseBody.pending_migrations,
        ...responseBody.applied_migrations,
    ].map((migration) => migration.name);

    expect(migrationNames).toContain(AUTH_MIGRATION);
});
