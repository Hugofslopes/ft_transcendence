import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'path';

import { fileURLToPath } from 'url';
import { userRoutes } from './routes/user.js';
import { tournamentRoutes } from './routes/tournamentRoutes.js';
import { hacktivistRoutes } from './routes/hacktivistsRoutes.js';
import { bugBusterRoutes } from './routes/bugBusterRoutes.js';
import { logicLeagueRoutes } from './routes/logicLeagueRoutes.js';
import { codeAllienceRoutes } from './routes/codeAllienceRoutes.js';

import '../backend/db/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({ logger: true });

fastify.register(fastifyCors, {
  origin: true,
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'frontend'),
  prefix: '/',
});

fastify.get('/', async (_request, reply) => {
  return reply.sendFile('index.html');
});

fastify.register(userRoutes);
fastify.register(tournamentRoutes);
fastify.register(hacktivistRoutes);
fastify.register(bugBusterRoutes);
fastify.register(logicLeagueRoutes);
fastify.register(codeAllienceRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server running at http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};


start();
