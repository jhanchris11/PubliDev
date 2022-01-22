import express from 'express'
const router = express.Router()
import Email from '../services/Email'

const emailService = new Email()

router.post('/', async (req, res) => {
  const { to } = req.body

  let result = await emailService.sendMail(to)
  return res.status(200).json({ result })
})
export default router
