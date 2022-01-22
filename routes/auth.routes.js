import Auth from '../services/Auth.js'
import { Router } from 'express'

const router = Router()

const authService = new Auth()

router.post('/signin', async (req, res) => {
  const { email, password } = req.body

  const result = await authService.login(email, password)
  if (!result.user.confirmed) {
    return res.status(403).json({
      message: 'Please confirm your email to login'
    })
  }

  let date = new Date().setDate(new Date().getDate() + 7)
  if (result.success) {
    return res
      .cookie('token', result.token, {
        httpOnly: true,
        sameSite: 'none',
        expires: new Date(date),
        secure: false
      })
      .json({ name: result.user.name })
  }
  return res.status(404).json(result)
})

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body
  const result = await authService.register(email, password, name)
  return res.status(result.success ? 201 : 400).json(result)
})

router.get('/confirmation/:token', async (req, res) => {
  const token = req.params.token

  const result = await authService.confirmedEmail(token)

  return res.status(result.success ? 201 : 400).json(result)
})

export default router
