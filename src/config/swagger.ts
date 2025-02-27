import swaggerJsdoc from 'swagger-jsdoc'
import { authSchemas, authPaths } from '../api/schemas/docs/auth.schema'
import { postSchemas, postPaths } from '../api/schemas/docs/posts.schema'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node Backend API',
      version: '1.0.0',
      description: 'API documentation for Node Backend',
      contact: {
        name: 'API Support',
        email: 'aldikrasniqi5@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        ...authSchemas,
        ...postSchemas
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    paths: {
      ...authPaths,
      ...postPaths
    }
  },
  apis: [] // We're not using JSDoc comments anymore
}

export const swaggerSpec = swaggerJsdoc(options)
