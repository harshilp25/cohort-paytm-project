import { User } from "../models/userModel.js";
import { Account } from "../models/accountModel.js";
import mongoose from "mongoose";
import { z } from "zod";

export const getBalance = async (req, res) => {
  const { userid } = req.user;
  try {
    const user = await Account.findOne({ userId: userid });
    if (!user) {
      return res.status(404).json({ error: "no user found" });
    }
    return res.json({ balanace: user.balanace });
  } catch (error) {
    return res.status(404).json({ error: "something went wrong" });
  }
};

const checkdedInput = z.object({
  to: z.string(),
  amount: z.string(),
});

export const sendMoney = async (req, res) => {
  const { to, amount } = req.body;
  const session = await mongoose.startSession();
  const { userid } = req.user;
  const { success } = checkdedInput.safeParse({ to, amount });

  session.startTransaction();
  try {
    if (!success) {
      await session.abortTransaction();
      return res.status(404).send("bad inputs");
    }
    const receiver = await Account.findOne({ userId: to });
    const sender = await Account.findOne({ userId: userid });
    //prechecks
    if (!receiver || !sender) {
      await session.abortTransaction();
      return res.status(404).json({ error: " uunauthorize" });
    }
    if (amount > sender.balanace) {
      await session.abortTransaction();
      return res.status(404).send("out of wallet");
    }
    // now both user as well as receiver's account are exists and blanace is sudfieient
    // so simply send the txa if no conflict and sever or db is on
    await Account.updateOne(
      { userId: userid },
      { $inc: { balanace: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: receiver.userId },
      { $inc: { balanace: amount } }
    ).session(session);

    await session.commitTransaction();
    return res.json({ succeed: "successful transaction" });
  } catch (error) {
    await session.abortTransaction();
    console.error(`transaction failed : ${error.message}`);
    return res.status(404).send("transaction failed");
  } finally {
    await session.endSession();
  }
};
