export const authSchemas = {
  AuthCredentials: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: "User's email address"
      },
      password: {
        type: 'string',
        format: 'password',
        description: "User's password"
      }
    }
  },
  AuthResponse: {
    type: 'object',
    properties: {
      token: {
        type: 'string',
        description: 'JWT token for authentication'
      }
    }
  }
}

export const authPaths = {
  '/auth/register': {
    post: {
      tags: ['Authentication'],
      summary: 'Register a new user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AuthCredentials'
            }
          }
        }
      },
      responses: {
        201: { description: 'User successfully registered' },
        400: { description: 'Invalid input data' },
        409: { description: 'User already exists' }
      }
    }
  },
  '/auth/login': {
    post: {
      tags: ['Authentication'],
      summary: 'Login user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AuthCredentials'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Successfully authenticated',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/AuthResponse'
              }
            }
          }
        },
        401: { description: 'Invalid credentials' }
      }
    }
  }
}
