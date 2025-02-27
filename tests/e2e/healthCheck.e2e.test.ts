import request from 'supertest'
import express from 'express'
import loaders from '../../src/loaders'

describe('Health Check API End-to-End Test', () => {
  let app: express.Application

  beforeAll(async () => {
    app = express()
    await loaders.init({ expressApp: app })
  })

  describe('Health Check Endpoint', () => {
    it('should be available and return 200 OK', async () => {
      const response = await request(app).get('/health')
      expect(response.status).toBe(200)
      expect(response.text).toBe('OK')
    })

    it('should handle multiple consecutive requests', async () => {
      // Make 5 consecutive requests to simulate load
      const requests = Array(5)
        .fill(null)
        .map(() => request(app).get('/health'))

      const responses = await Promise.all(requests)

      responses.forEach((response) => {
        expect(response.status).toBe(200)
        expect(response.text).toBe('OK')
      })
    })

    it('should respond quickly (under 200ms)', async () => {
      const startTime = Date.now()

      await request(app).get('/health')

      const endTime = Date.now()
      const responseTime = endTime - startTime

      expect(responseTime).toBeLessThan(200)
    })

    it('should return correct headers', async () => {
      const response = await request(app).get('/health')

      expect(response.headers['content-type']).toContain('text/html')
      expect(response.headers).toHaveProperty('x-powered-by', 'Express')
    })
  })
})
