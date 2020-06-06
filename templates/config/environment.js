const {
  MONGO_URI,
  MONGO_DEBUG,
  MONGO_SSL_CA,
  MONGO_SSL_CERT,
  MONGO_SSL_KEY,
  JWT_SECRET,
  TOKEN_VALIDITY,
  ALLOW_CORS_ORIGIN,
  ALLOW_CORS_METHODS
} = process.env

export const MONGO_CONFIG = {
  URI: MONGO_URI,
  DEBUG: MONGO_DEBUG,
  SSl_CA: MONGO_SSL_CA,
  SSl_CERT: MONGO_SSL_CERT,
  SSl_KEY: MONGO_SSL_KEY
}

export const JWT_CONFIG = {
  SECRET: JWT_SECRET,
  TOKEN_VALIDITY,
  NO_AUTH_PATHS: [
    new RegExp('^/api/.*'),
    '/user/signup',
    '/user/login'
  ]
}

export const CORS_OPTIONS = ALLOW_CORS_ORIGIN === '*' ? undefined : {
  origin: ALLOW_CORS_ORIGIN.includes(',') ? ALLOW_CORS_ORIGIN.split(',') : ALLOW_CORS_ORIGIN,
  methods: ALLOW_CORS_METHODS,
  optionsSuccessStatus: 200
}
