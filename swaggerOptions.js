export const options = {
  openapi: '3.0.0',
  info: {
    title: 'Posts API',
    version: '1.0.0',
    description: 'Simple Express Library API',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: '/',
      description: 'Local Dev '
    }
  ],
  produces: ['application/json'],
  paths: {
    '/api/posts': {
      get: {
        tags: ['Posts'],
        summary: 'Get all posts',
        responses: {
          200: {
            success: true
          }
        }
      },
      post: {
        tags: ['Posts'],

        summary: 'Post a post',
        requestBody: {
          name: 'React Course',
          description: 'Post Object',
          img: '',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/Post'
              }
            }
          }
        },
        produces: ['application/json'],
        responses: {
          200: {
            description: 'OK',
            schema: {
              $ref: '#/definitions/id'
            }
          },
          400: {
            description: 'Failed. Bad post data.'
          }
        }
      }
    }
  },
  definitions: {
    id: {
      type: 'string'
    },
    Post: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        img: {
          type: 'string'
        },
        category: {
          type: 'string'
        }
      }
    }
  }
}
