import { getPasteById } from "../models/paste.js";
import { isValidNumber } from "../utils/checkValidNumber.js";
import { getPasteExpiry, isPasteExpired } from "../utils/checkExpiry.js";
import { updateAndGetRemainingViews } from "../utils/updateViews.js";

const getPastePage = async (req, res) => {
    try {

        let currentTime = new Date();
        const testMode = process.env.TEST_MODE == 1;

        // when TEST_MODE = 1, use epoch from the header
        if (testMode) {
            const epoch = req.headers["x-test-now-ms"];
            if (epoch != null && !isNaN(parseInt(epoch, 10)) && isFinite(epoch)) {
                currentTime = new Date(parseInt(epoch, 10));
            }
        }

        const { id } = req.params;

        // (Security) TODO: Sanitize the id input
        const paste = await getPasteById(id); 

        if (paste) {
            const { content, views, max_views, ttl_seconds, created_at } = paste;

            // handle paste expiration
            if (isValidNumber(ttl_seconds)) {
                const expires_at = getPasteExpiry(created_at, ttl_seconds);
                if (isPasteExpired(currentTime, expires_at)) {
                    return res.status(404).render("404", { message: "Paste expired !" });
                }
            }

            // handle max view limit
            if (isValidNumber(max_views)) {
                const remainingViews = await updateAndGetRemainingViews(id, max_views, views+1);
                if (remainingViews != null && remainingViews == -1) {
                    return res.status(404).render("404", { message: "Paste view limit reached!" });
                }
            }
            return res.render("paste", { title: `Paste ${id}`, content });
        }
        return res.render("404", { message: "Paste not found!" });

    } catch(err) {
        console.error("An error occurred !", err);
        // Invalid id string
        if (err.code == "22P02") {
            return res.render("404", { message: "Paste not found!" });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { getPastePage };

