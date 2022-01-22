import { getFileStream, uploadFile } from '../libs/s3'
import { productsSchema } from '../libs/schema.validator'
import PostModel from '../models/Posts'

class Posts {
  async getPosts() {
    try {
      return (await PostModel.find()) || []
    } catch (error) {
      throw new Error(error)
    }
  }

  async getPostById(id) {
    try {
      return (await PostModel.findById(id)) || []
    } catch (error) {
      throw new Error(error)
    }
  }
  async getPostByUser(idUser) {
    try {
      return await PostModel.find({ idUser: idUser })
    } catch (error) {
      throw new Error(error)
    }
  }

  async createPosts(data, img) {
    const validation = productsSchema.validate(data)

    if (!validation.error) {
      const result = img && (await uploadFile(img.buffer, img.originalname))

      const newData = { ...data, img: result?.Location || '' }
      const postWithImage = await PostModel.create(newData)
      return {
        data: postWithImage,
        success: true,
        message: 'Post create succcessfully'
      }
    }
    return {
      data: validation.value,
      success: false,
      message: validation.error.details[0].message
    }
  }
  async updatePosts(id, data, user) {
    const post = await this.getPostById(id)

    if (post.idUser === user.id || user.role === 'admin') {
      let postUpdated = await PostModel.findByIdAndUpdate(id, data)
      return {
        updated: true,
        post: postUpdated,
        message: 'The post is updated successfully'
      }
    }
    return {
      updated: false,
      message: 'Not permissions to modify the post'
    }
  }

  async deletePost(id) {
    const postDeleted = await PostModel.findByIdAndDelete(id)
    return {
      deleted: true,
      postDeleted
    }
  }
}
export default Posts
