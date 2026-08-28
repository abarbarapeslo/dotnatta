//testar se o endpoint ta funcionando

test("GET ao endpoint /status", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    expect(response.status).toBe(200);
});
