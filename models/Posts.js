import { moongose } from '../config/db.js'
const { Schema } = moongose

const postsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'The name is required'],
      maxlength: [50, 'The maximum size is 30 characters'],
      trim: true
    },
    description: {
      type: String,
      maxlength: 200,
      trim: true
    },
    img: String,
    category: String,
    idUser: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const productModel = moongose.model('Posts', postsSchema)

export default productModel
