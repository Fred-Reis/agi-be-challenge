import fastifyJwt from "@fastify/jwt";
import { ZodError } from "zod";
import fastify from "fastify";
import cors from "@fastify/cors";

import { appRoutes } from "./http/routes";
import { env } from "./env";

export const app = fastify();

app.register(cors);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({
    message: "Internal server error.",
  });
});
