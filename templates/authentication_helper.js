import jsonwebtoken from 'jsonwebtoken'
import { JWT_CONFIG } from '.'

export const createToken = (data) => jsonwebtoken.sign(data, JWT_CONFIG.SECRET, { expiresIn: JWT_CONFIG.TOKEN_VALIDITY })

export const isJWTRevoked = async (req, payload, done) => {
  /* const token = req.headers.authorization.replace('Bearer ', '')
  const isRevoked = // logic for revoked tokens
  done(null, !!isRevoked) */
}
