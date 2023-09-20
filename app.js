import { config } from "dotenv";
import { ConnectDB } from "./data/database.js";
import { User } from "./models/user.js";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import express from "express";
const app = express();
const router = express.Router();

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api/v1/user", userRouter);

config({
  path: "./data/config.env",
});

app.get("/", (req, res) => {
  res.send(process.env.FRONTEND_URL);
});

ConnectDB();

app.listen(process.env.PORT, () => {
  console.log("The server is up and running".bgMagenta.white);
});
