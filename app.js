import { config } from "dotenv";
import { ConnectDB } from "./data/database.js";

import express from "express";
const app = express();

//MIDDLEWARES
app.use(express.json());

config({
  path: "./data/config.env",
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

ConnectDB();

app.listen(process.env.PORT, () => {
  console.log("The server is up and running".bgMagenta.white);
});
