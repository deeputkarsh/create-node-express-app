import debug from 'debug'
import { httpStatus } from '../constants'

const log = debug('app:error')

export const errorHandler = (err, req, res, next) => {
  log(req.originalUrl)
  log(err)

  if (err.name === 'AppError') return res.status(err.status || 500).json({ error: err.message })

  if (err.name === 'UnauthorizedError') return res.status(httpStatus.UNAUTHORIZED).json({ error: err.message })

  // Default handle error
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message || 'Something broke !' })
}
