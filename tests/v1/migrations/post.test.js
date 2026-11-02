test("POST ao endpoint /migrations", async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "POST",
    });

    const responseBody = await response.json();

    expect(Array.isArray(responseBody.applied_migrations)).toBe(true);

    if (response.status === 201) {
        expect(responseBody.applied_migrations.length).toBeGreaterThan(0);
        expect(responseBody.applied_migrations[0]).toHaveProperty("name");
        return;
    }

    expect(response.status).toBe(200);
    expect(responseBody.applied_migrations.length).toBe(0);
});
