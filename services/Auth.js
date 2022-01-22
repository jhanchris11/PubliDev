import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Users from './Users.js'
import config from '../config/index.js'
import Email from './Email'

class Auth {
  users = new Users()
  email = new Email()
  async login(email, password) {
    const user = await this.users.getUser(email)

    if (user) {
      const comparePassword = await bcrypt.compare(password, user.password)

      if (comparePassword) {
        const token = jwt.sign(
          { email, rol: user.rol, id: user.id },
          config.JWT_SECRET,
          {
            expiresIn: '1d'
          }
        )
        return { token, user, success: true }
      }
    }
    return { success: false, message: 'Wrong credentails' }
  }

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  }

  async register(email, originPassword, name, provider) {
    const validate = await this.users.validateUser({
      email,
      password: originPassword,
      name
    })

    if (validate.success) {
      const password = await this.hashPassword(originPassword)
      const user = await this.users.createUser({ ...validate.data, password })

      jwt.sign(
        {
          user
        },
        config.JWT_SECRET,
        {
          expiresIn: '1d'
        },
        (err, emailToken) => {
          if (err) {
            throw new Error(err)
          }

          this.email.sendMail(email, emailToken)
        }
      )
    }

    return { success: false, ...validate }
  }

  async confirmedEmail(token) {
    try {
      const {
        user: { data }
      } = jwt.verify(token, config.JWT_SECRET)

      const confirmedData = { ...data, confirmed: true }

      return await this.users.updateConfirmedUser(confirmedData)
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default Auth
