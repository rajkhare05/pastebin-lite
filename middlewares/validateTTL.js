import { isValidNumber } from "../utils/checkValidNumber.js";

const validateTTL = async (req, res, next) => {
    const { ttl_seconds } = req.body;
    if (isValidNumber(ttl_seconds)) {
        const expires_at = getPasteExpiry(created_at, ttl_seconds);
        if (isPasteExpired(currentTime, expires_at)) {
            return res.status(404).render("404", { messsage: "Paste expired !" });
        }
    }
    next();
}

export { validateTTL };

