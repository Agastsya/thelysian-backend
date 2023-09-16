import { config } from "dotenv";
import { ConnectDB } from "./data/database.js";
import { User } from "./models/user.js";
import userRouter from "./routes/userRouter.js";

import express from "express";
const app = express();
const router = express.Router();

//MIDDLEWARES
app.use(express.json());
app.use("/user", userRouter);

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
