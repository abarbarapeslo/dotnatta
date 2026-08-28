//testar se o endpoint ta funcionando

test("GET ao endpoint /", async () => {
    const response = await fetch("http://localhost:3000/");
    expect(response.status).toBe(200);
});
