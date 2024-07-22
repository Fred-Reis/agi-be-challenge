import { User } from "@prisma/client";
import { hash } from "bcryptjs";

import { UsersRepository } from "@/repositories/users-repository";
import { CompaniesRepository } from "@/repositories/companies-repository";

import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { SendEmailUseCase } from "./send-email";

interface RegisterUseCaseRequest {
  email: string;
  fullName: string;
  password: string;
  phoneNumber: string;
  role: string;
  fromWhere: string;
  companyName: string;
  companyField: string;
  companySize: string;
  department: string[];
  url: string;
  color?: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private companiesRepository: CompaniesRepository
  ) {}

  async execute({
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
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const company = await this.companiesRepository.findByName(companyName);
    let newCompany;

    if (!company) {
      newCompany = await this.companiesRepository.create({
        company_name: companyName,
        company_field: companyField,
        company_size: companySize,
        department,
        url,
        color,
      });
    }

    const user = await this.usersRepository.create({
      email,
      full_name: fullName,
      password_hash,
      phone_number: phoneNumber,
      role,
      from_where: fromWhere,
      company_id: company?.id ?? newCompany?.id ?? "",
    });

    const sendEmail = new SendEmailUseCase();

    sendEmail.execute({
      email,
      validation_id: user.validation_id ?? "",
    });

    return {
      user,
    };
  }
}
