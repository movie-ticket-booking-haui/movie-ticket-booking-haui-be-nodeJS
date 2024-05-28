import express, { Express, Request, Response } from "express";
import "dotenv/config";
import { routers } from "./routes/index.js";
const port = 3000;
const app: Express = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/", routers);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
