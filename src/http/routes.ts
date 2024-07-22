import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { validate } from "./controllers/validate";
import { getPublicProviders } from "./controllers/get-public-providers";
import { profile } from "./controllers/profile";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/validate", validate);
  app.post("/sessions", authenticate);
  app.get("/providers", getPublicProviders);

  app.get("/profile", profile);
}
