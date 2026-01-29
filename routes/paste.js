import express from "express"
import { getPaste, createNewPaste } from "../controllers/paste.js"
import { checkPasteID } from "../middlewares/checkId.js";

const pasteRoute = express.Router();

pasteRoute.route("/").post(createNewPaste);
pasteRoute.route("/:id").get(checkPasteID, getPaste);

export { pasteRoute };

