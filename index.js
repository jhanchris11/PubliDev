import express from 'express'
import cookie from 'cookie-parser'
import expresssession from 'express-session'

import userRoutes from './routes/users.routes'
import emailRoutes from './routes/email.routes'
import authRoutes from './routes/auth.routes'
import postRoutes from './routes/posts.routes'

import { connection } from './config/db'
import config from './config'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import { options } from './swaggerOptions'
const app = express()

app.use(cookie())
app.use(express.json())
app.use(
  expresssession({
    secret: process.env.SESSION_SECRET
  })
)
connection()

// const specs = swaggerJsDoc(options)
app.use('/api/email', emailRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/auth', authRoutes)

app.use('/docs', swaggerUI.serve, swaggerUI.setup(options))

app.listen(config.PORT, () => {
  console.log('server running 🔥')
})

process.on('unhandledRejection', (err, promise) => {
  console.log('Error', err.message)
  server.close(() => process.exit(1))
})
