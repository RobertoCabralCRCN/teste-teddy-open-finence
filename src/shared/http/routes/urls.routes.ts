import { Router } from "express";

import { CreateUrlController } from "@modules/urls/controllers/CreateUrlController";
import { DeleteUrlController } from "@modules/urls/controllers/DeleteUrlController";
import { GetByUrlController } from "@modules/urls/controllers/GetByUrlController";
import { ListUrlsController } from "@modules/urls/controllers/ListUrlsController";
import { UpdateUrlController } from "@modules/urls/controllers/UpdateUrlController";
import {} from "@modules/urls/controllers/GetByShortUrlController";
import isAuthenticated from "@shared/middlewares/isAuthenticated";

const urlsRoutes = Router();

urlsRoutes.post("/", CreateUrlController.handler);
urlsRoutes.delete("/:id", isAuthenticated, DeleteUrlController.handler);
urlsRoutes.get("/:id", isAuthenticated, GetByUrlController.handler);
urlsRoutes.get("/:email", isAuthenticated, ListUrlsController.handler);
urlsRoutes.put("/:id", isAuthenticated, UpdateUrlController.handler);
urlsRoutes.get("/", isAuthenticated);

export { urlsRoutes };
