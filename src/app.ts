import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.route";
import bodyParser from "body-parser";

dotenv.config();
export const app = express();

// Middleware
const corsOption = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOption));
app.use(express.json({ limit: "1mb" }));
// app.use(bodyParser.json());
app.use("/auth", authRouter);
