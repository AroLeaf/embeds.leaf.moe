export default function(fastify, _options, done) {
  fastify.post('/', async (request, reply) => {
    const user = await request.auth();
    if (!user) return reply.error(401, 'You are not logged in');
    
    const doc = await fastify.db.createDocument({
      ...request.body,
      author: user.id,
    });
    
    return doc
      ? reply.code(201).send()
      : reply.error(409, 'Document already exists');
  });


  fastify.get('/:name', async (request, reply) => {
    const doc = await fastify.db.getDocument(request.params.name);
    if (!doc) return reply.error(404, 'Document not found');
    
    if (!doc.public) {
      const user = await request.auth();
      if (!user) return reply.error(401, 'You are not logged in');
      if (user.id !== doc.author) return reply.error(403, 'You are not allowed to view this document');
    }
    
    return reply.send({
      name: doc.name,
      author: doc.author,
      public: doc.public,
      markdown: doc.markdown,
    });
  });

  fastify.get('/:name/markdown.md', async (request, reply) => {
    const doc = await fastify.db.getDocument(request.params.name);
    if (!doc) return reply.error(404, 'Document not found');
    
    if (!doc.public) {
      const user = await request.auth();
      if (!user) return reply.error(401, 'You are not logged in');
      if (user.id !== doc.author) return reply.error(403, 'You are not allowed to view this document');
    }
    
    return reply.send(doc.markdown);
  });

  fastify.get('/:name/available', async (request, reply) => {
    const user = await request.auth();
    const doc = await fastify.db.getDocument(request.params.name);
    return reply.send({
      available: !doc,
      yours: doc && doc?.author === user?.id,
    });
  });


  fastify.patch('/:name', async (request, reply) => {
    const doc = await fastify.db.getDocument(request.params.name);
    if (!doc) return reply.error(404, 'Document not found');

    const user = await request.auth();
    if (!user) return reply.error(401, 'You are not logged in');
    if (user.id !== doc.author) return reply.error(403, 'You are not allowed to edit this document');

    const updated = await fastify.db.updateDocument(request.params.name, request.body);

    return reply.send({
      name: updated.name,
      author: updated.author,
      public: updated.public,
      markdown: updated.markdown,
    });
  });

  fastify.put('/:name/markdown.md', async (request, reply) => {
    const doc = await fastify.db.getDocument(request.params.name);
    const user = await request.auth();
    if (!user) return reply.error(401, 'You are not logged in');
    if (doc && user.id !== doc.author) return reply.error(403, 'You are not allowed to edit this document');
    
    doc
      ? await fastify.db.updateDocument(request.params.name, { markdown: request.body })
      : await fastify.db.createDocument({
        name: request.params.name,
        author: user.id,
        public: !!request.query.public,
        markdown: request.body,
      });

    return reply.code(doc ? 204 : 201).send();
  });


  fastify.delete('/:name', async (request, reply) => {
    const doc = await fastify.db.getDocument(request.params.name);
    if (!doc) return reply.error(404, 'Document not found');
    
    const user = await request.auth();
    if (!user) return reply.error(401, 'You are not logged in');
    if (user.id !== doc.author) return reply.error(403, 'You are not allowed to remove this document');

    await fastify.db.deleteDocument(request.params.name);

    return reply.send({
      name: doc.name,
      author: doc.author,
      public: doc.public,
      markdown: doc.markdown,
    });
  });

  fastify.delete('/:name/markdown.md', async (request, reply) => {
    const doc = await fastify.db.getDocument(request.params.name);
    if (!doc) return reply.error(404, 'Document not found');
    
    const user = await request.auth();
    if (!user) return reply.error(401, 'You are not logged in');
    if (user.id !== doc.author) return reply.error(403, 'You are not allowed to remove this document');

    await fastify.db.deleteDocument(request.params.name);

    return reply.send(doc.markdown);
  });


  done();
}