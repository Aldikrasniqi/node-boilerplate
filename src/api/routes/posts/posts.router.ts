import { Router } from 'express'

const router = Router()

router.post('/', (req, res) => {
  res.json({ message: 'Create a post' })
})

router.get('/', (req, res) => {
  res.json({ message: 'Get all posts' })
})

router.get('/:id', (req, res) => {
  res.json({ message: 'Get a post by id' })
})

router.put('/:id', (req, res) => {
  res.json({ message: 'Update a post by id' })
})

router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete a post by id' })
})

export default router
