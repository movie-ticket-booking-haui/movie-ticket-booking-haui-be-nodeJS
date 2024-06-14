import express, { Express, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { routers } from "./routes/api/v1/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const port = 3000;
const app: Express = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors()); // Use the CORS middleware

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", routers);
app.use("/uploads", express.static(path.join(__dirname, "../uploads/")));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
