import { createPaste, getPasteById, updateAndGetRemainingViews } from "../models/paste.js";
import { getPasteExpiry, isPasteExpired } from "../utils/checkExpiry.js";
import { isValidNumber } from "../utils/checkValidNumber.js";

const getPaste = async (req, res) => {
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
        const paste = await getPasteById(id);

        if (paste) {
            const { content, ttl_seconds, max_views, views, created_at } = paste;

            // handle paste expiration
            let expires_at = null;
            if (isValidNumber(ttl_seconds)) {
                expires_at = getPasteExpiry(created_at, ttl_seconds);
                if (isPasteExpired(currentTime, expires_at)) {
                    return res.status(404).json({ messsage: "Paste expired !" });
                }
            }

            // handle max view limit
            let remaining_views = null;
            if (isValidNumber(max_views)) {
                remaining_views = await updateAndGetRemainingViews(id, max_views, views+1);
                if (remaining_views != null && remaining_views == -1) {
                    return res.status(404).json({ message: "Paste view limit reached!" });
                }
            }

            return res.json({ content, remaining_views, expires_at });
        }

        return res.status(404).json({ message: "Paste not found!" });

    } catch (err) {
        console.error("An error occurred !", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const createNewPaste = async (req, res) => {
    try {
        const { content, ttl_seconds, max_views } = req.body;

        if (content == null) {
            return res.status(400).json({ message: "content is required !" });
        }

        // (Security) TODO: Sanitize the content
        let fields = [ content ];

        // Validate ttl_seconds: check if it is number
        if (ttl_seconds != null) {
            if (isValidNumber(ttl_seconds) && ttl_seconds >= 1)
                fields.push(ttl_seconds);
            else
                return res.status(400).json({ messsage: "Invalid ttl_seconds!" });

        } else {
            fields.push(null);
        }

        // Validate max_views
        if (max_views != null) {
            if (isValidNumber(max_views) && max_views >= 1)
                fields.push(max_views);
            else
                return res.status(400).json({ messsage: "Invalid max_views!" });
        } else {
            fields.push(null);
        }

        const paste = await createPaste(fields);
        if (paste) {
            const { id } = paste;
            const url = req.protocol + "://" + req.host + "/p" + `/${id}`
            return res.status(201).json({ id, url });
        }
        return res.status(400).json({ message: "Error while creating new paste!" });

    } catch (err) {
        console.error("An error occurred !", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { getPaste, createNewPaste };

