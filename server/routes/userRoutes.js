import express from "express"
import { checkAuth, login, signup, updateProfile, logout} from "../controllers/userControllers.js";
import { protectRoute } from "../middleware/auth.js";
const userRouter =express.Router();
console.log("Auth route hit");

userRouter.post("/signup",signup);
userRouter.post("/login",login);
userRouter.put("/update-profile",protectRoute, updateProfile);
userRouter.get("/check",protectRoute, checkAuth);
userRouter.post("/logout",logout);

export default userRouter;

