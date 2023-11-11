import { Router } from "express";
import { userController } from "./controller";

const userRouter = Router();

userRouter.get("/", userController.getUsers);
userRouter.post("/signup", userController.addUser);
userRouter.get("/:id", userController.getUserById);
userRouter.get("/email/:email", userController.getUserByEmail);
userRouter.delete("/:id", userController.deleteUser);
userRouter.put("/:id", userController.updateUser);
userRouter.post("/login", userController.loginUser);
userRouter.put("/type/:id", userController.updateUserType);

export default userRouter;
