import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    fullName: z.string(),
    password: z.string(),
    phoneNumber: z.string(),
    role: z.string(),
    fromWhere: z.string(),
    validate: z.string().optional(),
    companyName: z.string(),
    companyField: z.string(),
    companySize: z.string(),
    department: z.array(z.string()),
    url: z.string(),
    color: z.string().optional(),
  });

  const {
    email,
    fullName,
    password,
    phoneNumber,
    role,
    fromWhere,
    companyName,
    companyField,
    companySize,
    department,
    url,
    color,
  } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      email,
      fullName,
      password,
      phoneNumber,
      role,
      fromWhere,
      companyName,
      companyField,
      companySize,
      department,
      url,
      color,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      });
    }

    throw error;
  }

  return reply.status(201).send();
}
