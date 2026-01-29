import express from "express"
import { healthCheck } from "../controllers/health.js"

const healthRoute = express.Router();

healthRoute.route("/").get(healthCheck);

export { healthRoute };

