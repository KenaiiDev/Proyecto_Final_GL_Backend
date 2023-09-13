import ROLES from '../helpers/roles.js'
import HTTP_STATUS from '../helpers/httpStatus.js'
import jwt from 'jsonwebtoken'
import prisma from '../database/prisma.js'

export const authReviews  = async (req, res, next) => {
  const headers = req.headers
  const { authorization } = headers
  const token = authorization.split(' ')[1]

  const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
  const { role, id } = decodedToken
  const review = await prisma.Reviews.findUnique({
    where: {id: req.params.id}
  })
  if (review.authorId !== id || role.name !== ROLES.ADMIN) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Unautorized User'
      })     
  }

  next()
}