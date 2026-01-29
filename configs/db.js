import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({ connectionString: process.env.DB_URL });

pool.connect().then(
    (client) => {
        client.release();
    })
    .catch(err => {
        console.error("Error connecting to DB:", err);
    });

export { pool };

