import request from 'supertest'
import express from 'express'
import loaders from '../../src/loaders'

const app = express()

beforeAll(async () => {
  await loaders.init({ expressApp: app })
})

describe('Health Check API', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/health')
    expect(response.status).toBe(200)
    expect(response.text).toBe('OK')
  })
})
