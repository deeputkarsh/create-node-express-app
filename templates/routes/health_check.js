import express from 'express'

const router = express.Router()

// Health check route
router.get('/health', (req, res, next) => {
  return res.json({ message: 'Healthy!!' })
})

export default router
