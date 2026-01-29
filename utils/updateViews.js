import { pool } from "../configs/db.js";

const updateAndGetRemainingViews = async (pasteID, maxViews, views) => {
    if (maxViews != null) {
        if (views <= maxViews) {
            try {
                await pool.query("UPDATE pastes SET views = views+1 WHERE id = $1", [pasteID]);
                return maxViews - views;

            } catch(err) {
                throw err;
            }
        }
        return -1;
    }
    // return null if no view constraint is set.
    return null;
}

export { updateAndGetRemainingViews };

