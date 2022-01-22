import { Router } from 'express'
import { getFileStream } from '../libs/s3'
import { upload } from '../libs/upload'
import { verifyToken } from '../middlewares/authValidation'
import Posts from '../services/Posts'

const router = Router()

const postService = new Posts()

router.get('/', verifyToken, async (req, res) => {
  const result = await postService.getPosts()
  return res.status(200).json(result)
})

router.get('/me', verifyToken, async (req, res) => {
  const { id } = req.user

  const result = await postService.getPostByUser(id)
  res.status(200).json(result)
})

router.post('/', verifyToken, upload.single('img'), async (req, res) => {
  const { id } = req.user
  const { file, body: data } = req
  console.log(file, data)
  const result = await postService.createPosts({ ...data, idUser: id }, file)
  return res.status(200).json(result)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const result = await postService.getPostById(id)
  res.status(200).json(result)
})

router.get('/img/:key', (req, res) => {
  const key = req.params.key
  const readStream = getFileStream(key)
  //enviar los datos de la imagen directamente al cliente
  readStream.pipe(res)
})

router.put('/:id', verifyToken, async (req, res) => {
  const id = req.params.id
  const data = req.body
  const user = req.user

  const result = await postService.updatePosts(id, data, user)
  return res.status(200).json(result)
})

router.delete('/:id', verifyToken, async (req, res) => {
  const id = req.params.id
  const result = await postService.deletePost(id)
  return res.status(200).json(result)
})

export default router
