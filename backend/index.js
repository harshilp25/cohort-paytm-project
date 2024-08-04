import express from "express";
import accountRoutes from "./routes/accountRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./db/db.js";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json()); // returns the middleware which parses the thebody in the json , only if the incoming requesthas the headeras content type application-json

connectDB();

app.use("/user", userRoutes);
app.use("/account", accountRoutes);

app.listen(3000, () => {
  console.log("listening at port 3000");
});
