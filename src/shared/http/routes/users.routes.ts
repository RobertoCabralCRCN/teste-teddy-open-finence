import { Router } from "express";

import { CreateUsersController } from "@modules/users/controllers/CreateUsersController";
import { GetByUserController } from "@modules/users/controllers/GetByUserController";
import { ListUsersController } from "@modules/users/controllers/ListUsersController";
import { DeleteUserController } from "@modules/users/controllers/DeleteUserController";
import { UpdateUserController } from "@modules/users/controllers/UpdateUserController";
import { UpdateUserAvatarController } from "@modules/users/controllers/UpdateUserAvatarController";
import isAuthenticated from "@shared/middlewares/isAuthenticated";
import multer from "multer";
import uploadConfig from "@config/upload";

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post("/", CreateUsersController.handler);
usersRoutes.get("/:id", isAuthenticated, GetByUserController.handler);
usersRoutes.get("/", ListUsersController.handler);
usersRoutes.delete("/:id", isAuthenticated, DeleteUserController.handler);
usersRoutes.put("/:id", isAuthenticated, UpdateUserController.handler);
usersRoutes.patch(
  "avatar",
  isAuthenticated,
  upload.single("avatar"),
  UpdateUserAvatarController.handler
);

export { usersRoutes };
