import auth from './auth.js';
import documents from './documents.js';

export default function(fastify, _options, done) {
  fastify.register(auth, { prefix: '/auth' });
  fastify.register(documents, { prefix: '/docs' });
  done();
}