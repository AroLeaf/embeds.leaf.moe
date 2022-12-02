import oauth from '../lib/oauth.js';

export default function(fastify, _options, done) {
  fastify.get('/', async (request, reply) => {
    if (!request.query.code) return reply.redirect(oauth.getURL({
      id: process.env.DISCORD_ID,
      redirect: process.env.DISCORD_REDIRECT,
      state: request.query.redirect,
    }));

    const tokens = await oauth.token({
      client_id: process.env.DISCORD_ID,
      client_secret: process.env.DISCORD_SECRET,
      code: request.query.code,
      redirect_uri: process.env.DISCORD_REDIRECT,
    }).catch(console.error);
    if (!tokens) return reply.code(401).send();
    
    const user = await oauth.user(tokens).catch(console.error);
    if (!user) return reply.code(401).send();

    const jwt = fastify.jwt.sign({
      id: user.id,
      av: user.avatar,
      nm: `${user.username}#${user.discriminator}`,
    });

    reply.setCookie('token', jwt, { path: '/' });
    return reply.redirect(request.query.state || '/');
  });

  fastify.get('/logout', async (request, reply) => {
    reply.clearCookie('token', { path: '/' });
    return reply.redirect(request.query.redirect || '/');
  });

  done();
}