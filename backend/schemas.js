export const documents = {
  post: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        markdown: { type: 'string' },
        public: { type: 'boolean' },
      },
      additionalProperties: false,
      required: [],
    }
  },

  patch: {
    body: {
      type: 'object',
      properties: {
        markdown: { type: 'string' },
        public: { type: 'boolean' },
      },
      additionalProperties: false,
      required: [],
    }
  },

  put: {
    headers: {
      type: 'object',
      properties: {
        'Content-Type': { type: 'string', pattern: '^text/plain$' },
      }
    },
  }
}