import nodemailer from 'nodemailer'
import config from '../config'
import { v4 as uuidv4 } from 'uuid'
class Email {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.EMAIL_HOST,
      port: config.EMAIL_PORT,
      secure: config.EMAIL_SECURE,
      auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    })
  }

  async sendMail(to, emailToken) {
    // console.log('aa', emailToken)
    const currentUrl = `http:localhost:5000/auth/confirmation/${emailToken}`

    await this.transporter.sendMail({
      from: 'jccmunac.97@gmail.com',
      to,
      subject: 'Verificación de correo ',
      // text,
      html: `<p>Verificar su correo electrónico para completar el registro y logearse en su cuenta</p>
      <p>Este enlace <b>expira en 2horas</b> .</p><p>Presione aqui <a href="${currentUrl}">${currentUrl}</a></p>
      `
    })

    return { success: true }
  }
}
export default Email
