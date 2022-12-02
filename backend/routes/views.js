export default function(fastify, _options, done) {
  fastify.get('/', async (request, reply) => {
    const user = await request.auth();
    return reply.view('index.pug', { user });
  });

  fastify.get('/:name', async (request, reply) => {
    const user = await request.auth();
    const document = await fastify.db.getDocument(request.params.name);
    if (!document) return reply.redirect('/');
    
    if (!document.public) {
      if (!user) return reply.error(401, 'You are not logged in');
      if (user.id !== document.author) return reply.error(403, 'You are not allowed to view this document');
    }

    return reply.view('index.pug', { user, document });
  });

  done();
}