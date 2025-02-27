import authRouter from './auth/auth.router'
import postsRouter from './posts/posts.router'
import { Router } from 'express'

const router = Router()

router.use('/auth', authRouter)
router.use('/posts', postsRouter)

export default router
