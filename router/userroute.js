import { Router } from "express";
import {
  loginUser,
  registerUser,
  updateUser,
} from "../controller/usercontroller.js";

// create user [sign ups]
// Create user router
const userRouter = Router();

// Define routes

userRouter.post("/users/login", loginUser);

userRouter.post("/users/signup", registerUser);

userRouter.patch("/users/:id", updateUser);

// Export router
export default userRouter;
