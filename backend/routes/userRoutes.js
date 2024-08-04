import express from "express";
import {
  getUsers,
  signIn,
  signUp,
  UpdateProfile,
} from "../Controllers/userController.js";
import userAuthentication from "../authentication/authentication.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/bulk", userAuthentication, getUsers); // IMPORTANT ROUTE ---> dynamically checks the user based on its substring
router.post("/updateprofile", userAuthentication, UpdateProfile);

export default router;
