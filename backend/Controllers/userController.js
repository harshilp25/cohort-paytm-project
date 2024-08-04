import tokenGeneration from "../authentication/tokenGeneration.js";
import { Account } from "../models/accountModel.js";
import { User } from "../models/userModel.js";
import { z } from "zod";

const validator = z.object({
  firstname: z.string().email(),
  lastname: z.string(),
  password: z.string(),
});
export const signUp = async (req, res) => {
  const { firstname, lastname, password } = req.body;
  const validated = validator.safeParse({ firstname, lastname, password });
  try {
    if (!validated.success) {
      return res.status(404).json({ validated });
    }
    const user = await User.findOne({ firstname });
    if (user) return res.status(404).json({ error: "user already exists" });

    const newUser = new User({
      firstname,
      lastname,
      password,
    });
    await Account.create({
      userId: newUser._id,
      balanace: Math.random() * 1000,
    });
    if (newUser) {
      await newUser.save();
      const token = tokenGeneration(newUser._id, req);
      return res
        .status(200)
        .json({ success: "successfully created  new user", token });
    } else {
      return res.status(404).json({ error: "something went wrong" });
    }
  } catch (error) {
    console.error("error occured at signup route handler " + error.message);
    return res.status(404).json(error);
  }
};

const signinvalidator = z.object({
  firstname: z.string().email(),
  password: z.string(),
});

export const signIn = async (req, res) => {
  const { firstname, password } = req.body;
  const validated = signinvalidator.safeParse({ firstname, password });
  try {
    if (!validated.success) {
      return res.status(404).json({ error: "invalid input fields", validated });
    }
    const user = await User.findOne({ firstname });
    if (!user) {
      return res.status(404).send("unauthorize");
    }
    if (user.password != password) {
      return res.status(404).send("unauthorize");
    }

    const token = tokenGeneration(user._id, req);
    return res.json({ success: "sucessfully signedin ", token });
  } catch (error) {
    console.error("error occured at signin route handler " + error.message);
    return res.status(404).json(error);
  }
};

const updateInputs = z.object({
  firstname: z.string().email(),
  lastname: z.string(),
  password: z.string(),
});

export const UpdateProfile = async (req, res) => {
  const { firstname, lastname, password } = req.body;
  const { success } = updateInputs.safeParse({ firstname, lastname, password });
  const { userid } = req.user;
  try {
    if (!success) return res.status(404).json({ error: "bad inputs" });
    const user = await User.findById(userid);
    if (!user) {
      return res.status(411).json({ error: "unauthorize" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userid,
      {
        $set: { firstname, lastname, password },
      },
      { new: true }
    ); // in this method we don't need to to run .save() bcz it automatically uddates the document and return the new document if we have added new:true as a option otherwse return the old document
    if (updatedUser) {
      return res.json({ success: "updated" });
    } else {
      return res.status(404).json({ error: "something went wrong" });
    }
  } catch (error) {
    console.error(
      "error occured at UpdateProfile route handler " + error.message
    );
    return res.status(404).json(error);
  }
};

export const getUsers = async (req, res) => {
  const { userid } = req.user;
  const filter = req.query.filter ?? " ";
  try {
    let users = await User.find({
      $or: [
        {
          firstname: {
            $regex: filter,
          },
          lastname: {
            $regex: filter,
          },
        },
      ],
    });

    users = users.filter((user) => user._id.toString() !== userid);
    return res.json({
      users,
    });
  } catch (error) {
    console.error("error occured at getUsers route handler " + error.message);
    return res.status(404).json(error);
  }
};
