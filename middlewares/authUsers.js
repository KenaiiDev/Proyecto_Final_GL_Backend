import ROLES from '../helpers/roles.js'
import HTTP_STATUS from '../helpers/httpStatus.js'
import jwt from 'jsonwebtoken'

export const authUsers = (req, res, next) => {
  const headers = req.headers
  const { authorization } = headers
  const token = authorization.split(' ')[1]

  const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
  const { role, id } = decodedToken

  if (role.name !== ROLES.ADMIN || id !== req.params.id) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Unautorized User'
    })
  }

  next()
}