import { Router } from 'express'
import { verifyTokenAdmin } from '../middlewares/authValidation'
import Users from '../services/Users'

const router = Router()
const userService = new Users()

router.get('/', verifyTokenAdmin, async (req, res) => {
  const result = await userService.getUsers()
  res.status(200).json(result)
})

router.get('/profile', (req, res) => {
  res.send('hola')
})

export default router
