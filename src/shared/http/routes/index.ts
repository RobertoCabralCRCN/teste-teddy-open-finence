import { Router } from "express";
import { urlsRoutes } from "@shared/http/routes/urls.routes";
import { usersRoutes } from "./users.routes";
import { sessionsRoutes } from "./sessions.routes";

const routes = Router();

routes.use("/urls", urlsRoutes);
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);

routes.get("/", (request, response) => {
  return response.json({ message: "Hello Dev!" });
});

export default routes;
