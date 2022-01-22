import jwt from 'jsonwebtoken'
import config from '../config/index.js'

const roles = {
  ADMIN: 'admin',
  EDIT: 'editor',
  REGULAR: 'regular'
}

const verifyRol = (token, rol_type, req, res, next) => {
  if (!token) {
    return res.status(403).json({ message: 'Token is needed to access' })
  }

  try {
    const decodedToken = jwt.verify(token, config.JWT_SECRET)
    const { rol } = decodedToken

    if (rol_type === roles['REGULAR']) {
      req.user = decodedToken
      return next()
    } else if (rol_type === roles['EDIT'] && rol === rol_type) {
      req.user = decodedToken
      return next()
    } else if (rol_type === roles['ADMIN'] && rol === rol_type) {
      req.user = decodedToken
      return next()
    }
  } catch (error) {
    return res.status(401).json({ message: 'Token invalid' })
  }
  return res
    .status(403)
    .json({ message: 'You do not have the necessary permissions' })
}
const verifyToken = (req, res, next) => {
  const { token } = req.cookies
  return verifyRol(token, roles['REGULAR'], req, res, next)
}

const verifyTokenEditor = (req, res, next) => {
  const { token } = req.cookies
  return verifyRol(token, roles['EDIT'], req, res, next)
}

const verifyTokenAdmin = (req, res, next) => {
  const { token } = req.cookies

  return verifyRol(token, roles['ADMIN'], req, res, next)
}

export { verifyToken, verifyTokenEditor, verifyTokenAdmin }
