export const asyncMiddleware = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).then(_ => next()).catch(next)
