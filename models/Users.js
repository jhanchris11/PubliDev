import { moongose } from '../config/db.js'
const { Schema } = moongose
const usersSchema = new Schema(
  {
    name: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    confirmed: {
      type: Boolean,
      defaultValue: false
    },
    rol: {
      type: String,
      trim: true
    }
    // provider: {
    //   type: String,
    //   trim: true
    // }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const UserModel = moongose.model('Users', usersSchema)

export default UserModel
