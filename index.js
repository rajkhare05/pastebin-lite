import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import { healthRoute } from "./routes/health.js"
import { pasteRoute } from "./routes/paste.js"
import { pastePageRoute } from "./routes/pastePage.js"

dotenv.config();

// Server port
const PORT = process.env.EXPRESS_PORT || 3000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.set("json spaces", 1);
app.set("view engine", "pug");

// GET /
app.get("/", (_, res) => {
    try {
        return res.render("index");
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error !" });
    }
});

app.use("/api/healthz", healthRoute);
app.use("/api/pastes", pasteRoute);
app.use("/p", pastePageRoute);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

