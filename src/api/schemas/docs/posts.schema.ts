export const postSchemas = {
  Post: {
    type: 'object',
    required: ['title', 'content'],
    properties: {
      title: {
        type: 'string',
        description: 'Title of the post'
      },
      content: {
        type: 'string',
        description: 'Content of the post'
      }
    }
  }
}

export const postPaths = {
  '/posts': {
    post: {
      tags: ['Posts'],
      summary: 'Create a new post',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Post'
            }
          }
        }
      },
      responses: {
        201: { description: 'Post created successfully' },
        401: { description: 'Unauthorized' },
        400: { description: 'Invalid input data' }
      }
    },
    get: {
      tags: ['Posts'],
      summary: 'Get all posts',
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'List of posts',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Post'
                }
              }
            }
          }
        }
      }
    }
  },
  '/posts/{id}': {
    get: {
      tags: ['Posts'],
      summary: 'Get a post by ID',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' },
          description: 'Post ID'
        }
      ],
      responses: {
        200: {
          description: 'Post found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Post'
              }
            }
          }
        },
        404: { description: 'Post not found' }
      }
    },
    put: {
      tags: ['Posts'],
      summary: 'Update a post',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' },
          description: 'Post ID'
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Post'
            }
          }
        }
      },
      responses: {
        200: { description: 'Post updated successfully' },
        404: { description: 'Post not found' },
        401: { description: 'Unauthorized' }
      }
    },
    delete: {
      tags: ['Posts'],
      summary: 'Delete a post',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' },
          description: 'Post ID'
        }
      ],
      responses: {
        200: { description: 'Post deleted successfully' },
        404: { description: 'Post not found' },
        401: { description: 'Unauthorized' }
      }
    }
  }
}
