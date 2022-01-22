import { usersSchema } from '../libs/schema.validator.js'
import UserModel from '../models/Users.js'

class Users {
  async getUser(email) {
    return await UserModel.findOne({ email }).exec()
  }

  async validateUser(data) {
    const validate = usersSchema.validate(data)

    if (validate.error) {
      return {
        data: validate.value,
        success: false,
        message: validate.error.details[0].message
      }
    }
    const userExist = await this.getUser(data.email)
    if (userExist) {
      return {
        data: validate.value,
        success: false,
        message: 'El correo esta en uso'
      }
    }
    return {
      data: validate.value,
      success: true,
      message: 'Datos validos'
    }
  }

  async createUser(data) {
    const user = await UserModel.create(data)
    return { data: user, success: true, message: 'User created successfully' }
  }

  async updateConfirmedUser(data) {
    const updateUserConfirmed = await UserModel.findByIdAndUpdate(
      data._id,
      data
    )

    return {
      success: true,
      post: updateUserConfirmed,
      message: 'The user has confirmed his email'
    }
  }
  async getUsers() {
    return (await UserModel.find()) || []
  }
}

export default Users
