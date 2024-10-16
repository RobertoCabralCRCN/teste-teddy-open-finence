import { Router } from "express";

import { CreateSessionsController } from "@modules/users/controllers/CreateSessionsController";

const sessionsRoutes = Router();

sessionsRoutes.post("/", CreateSessionsController.handler);

export { sessionsRoutes };
