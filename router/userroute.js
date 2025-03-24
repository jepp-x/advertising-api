import { Router } from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
  updateUser,
} from "../controller/usercontroller.js";

const userRouter = Router();

// Define routes

userRouter.post("/users/login", loginUser);

userRouter.post("/users/signup", registerUser);

userRouter.patch("/users/:id", updateUser);
userRouter.get("/users", getAllUsers);

// Export router
export default userRouter;
