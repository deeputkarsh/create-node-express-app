import HealthCheckRouter from './health_check'
import { httpStatus } from '../constants'
import { AppError } from '../utils'

const RouteData = [
  { path: '/', router: HealthCheckRouter }
]

export const Routes = (app) => {
  // Setting application routes
  RouteData.forEach((route) => app.use(route.path, route.router))

  // If not found 404 route
  app.use(function (req, res, next) {
    throw new AppError('No route found', httpStatus.NOT_FOUND)
  })
}
