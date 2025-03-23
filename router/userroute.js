import { Router } from "express";
import {
  loginUser,
  registerUser,
  updateUser,
} from "../controller/usercontroller.js";

const userRouter = Router();

// Define routes

userRouter.post("/users/login", loginUser);

userRouter.post("/users/signup", registerUser);

userRouter.patch("/users/:id", updateUser);

// Export router
export default userRouter;
