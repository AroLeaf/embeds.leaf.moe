import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import pug from 'pug';
import path from 'path';
import 'dotenv/config.js';

import Database from './db/index.js';
import api from './routes/api.js';
import JWT from './lib/jwt.js';
import views from './routes/views.js';


const server = fastify({
  ignoreTrailingSlash: true,
  ajv: { customOptions: {
    coerceTypes: false,
    removeAdditional: true,
  } },
});


server.register(fastifyCookie);
server.register(fastifyCors);
server.register(fastifyStatic, {
  root: path.resolve('frontend/public'),
  prefix: '/public',
});
server.register(fastifyView, {
  engine: { pug },
  root: path.resolve('frontend/views'),
});

server.register(api, { prefix: '/api' });
server.register(views);


server.decorate('db', new Database(process.env.MONGO));
server.decorate('jwt', new JWT(process.env.JWT_SECRET));

server.decorateRequest('auth', async function () {
  const user = server.jwt.verify(this.headers.authorization || this.cookies.token);
  return user && {
    id: user.id,
    name: user.nm,
    avatar: user.av,
  }
});

server.decorateReply('error', function (code, message) {
  return this.code(code).send(new Error(message));
});


server.listen({
  port: process.env.PORT,
}).then(() => console.log('ready!'));