import Joi from 'joi'

const usersSchema = Joi.object({
  name: Joi.string()
    .required()
    .max(200)
    .message('El nombre es requerido y menor a 200 caracteres'),
  email: Joi.string()
    .email()
    .required()
    .max(200)
    .message(
      'El correo debe ser válido, es requerido y menos a 200 caracteres'
    ),
  password: Joi.string()
    .required()
    .min(6)
    .alphanum()
    .message('El password debe tener como minimo 6 digitos'),
  // provider: Joi.string()
  confirmed: Joi.boolean().default(false)
})

const productsSchema = Joi.object({
  name: Joi.string()
    .required()
    .max(30)
    .message('The name is required and less than 30 characters'),
  category: Joi.string().max(100),
  description: Joi.string().max(200),
  img: Joi.string(),
  idUser: Joi.string()
})

export { usersSchema, productsSchema }
