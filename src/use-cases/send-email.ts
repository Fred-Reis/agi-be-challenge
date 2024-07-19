import nodemailer from 'nodemailer'
import { env } from '@/env'

interface SendEmailUseCaseRequest {
  email: string
  validation_id: string
}
export class SendEmailUseCase {
  constructor() {}

  execute({ email, validation_id }: SendEmailUseCaseRequest): void {
    const transponder = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.NODEMAILER_USER,
        pass: env.NODEMAILER_PASS,
      },
    })

    const mailOptions = {
      from: env.NODEMAILER_USER,
      to: email,
      subject: 'Email de confirmação',
      html: `<h3>Clique no link abaixo para confirmar seu email</h3>
      <a href="${env.FRONTEND_URL}/validate?token=${validation_id}">Clique aqui para confirmar seu email</a>`,
    }

    transponder.sendMail(mailOptions, (error) => {
      if (error) {
        throw error
      }
    })
  }
}
