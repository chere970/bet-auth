// e.g. /lib/db.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

await client.connect();

const db = client.db();  // or specify name

export { client, db };
