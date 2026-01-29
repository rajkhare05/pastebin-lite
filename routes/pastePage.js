import express from "express"
import { getPastePage } from "../controllers/pastePage.js"
import { checkPasteID } from "../middlewares/checkId.js";

const pastePageRoute = express.Router();

pastePageRoute.route("/:id").get(checkPasteID, getPastePage);

export { pastePageRoute };

