import request from 'supertest'
import express from 'express'
import loaders from '../../src/loaders'

describe('Health Check API Integration Test', () => {
  let app: express.Application

  beforeAll(async () => {
    app = express()
    await loaders.init({ expressApp: app })
  })

  it('should return 200 OK', async () => {
    const response = await request(app).get('/health')
    expect(response.status).toBe(200)
    expect(response.text).toBe('OK')
  })
})
