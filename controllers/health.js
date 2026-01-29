import { pool } from "../configs/db.js";

const healthCheck = async (_, res) => {
    try {
        // check db is up and accessable
        await pool.query("SELECT 1;");
        return res.status(200).json({ ok: true });

    } catch(err) {
        console.error("An error has occurred!", err);
        return res.status(500).json({ message: "Error accessing persistence layer!" });
    }
}

export { healthCheck };

