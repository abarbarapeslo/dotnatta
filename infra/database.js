import { Client } from "pg";

async function getNewClient() {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        ssl: false,
    });

    await client.connect();

    return client;
}

async function query(queryObject) {
    const client = await getNewClient();

    try {
        const result = await client.query(queryObject);
        return result;
    } finally {
        await client.end();
    }
}

export default {
    query,
    getNewClient,
};
