import express from "express";
import { getBalance, sendMoney } from "../Controllers/accountHandler.js";
import userAuthentication from "../authentication/authentication.js";

const router = express.Router();

router.post("/get/balance", userAuthentication, getBalance);
router.post("/sendmoney", userAuthentication, sendMoney);

export default router;
