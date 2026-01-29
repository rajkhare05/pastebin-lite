import { pool } from "../configs/db.js";

const getPasteById = async (id) => {
    try {
        const raw = await pool.query("SELECT * FROM pastes WHERE id = $1;", [id]);
        if (raw.rowCount != null && raw.rowCount == 1) {
            const paste = raw.rows[0];
            return paste;
        }
        return null;

    } catch(err) {
        return null;
    }
}

const createPaste = async (paste) => {
    try {
        const raw = await pool.query("INSERT INTO pastes(content, ttl_seconds, max_views) VALUES($1, $2, $3) RETURNING id;", paste);
        if (raw.rowCount != null && raw.rowCount ==1) {
            const newPaste = raw.rows[0];
            return newPaste;
        }
        return null;
    } catch(err) {
        return null;
    }
}

const updatePasteViewById = async (id) => {
    try {
        const raw = await pool.query("UPDATE pastes SET views = views+1 WHERE id = $1 RETURNING view;", [id]);
        if (raw.rowCount != null && raw.rowCount == 1) {
            const paste = raw.rows[0];
            return paste.views;
        }
        return null;

    } catch(err) {
        return null;
    }
}

export { getPasteById, createPaste, updatePasteViewById };

