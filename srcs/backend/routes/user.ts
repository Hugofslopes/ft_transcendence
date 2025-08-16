import { FastifyInstance } from 'fastify';
import { createUser, getAllUsers, deleteUser, loginUser } from '../services/services.js'; // Import loginUser

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/users', async (request, reply) => {
    const { name, username, team, password } = request.body as {
      name: string;
      username: string;
      team: string;
      password: string;
    };

    if (!name || !username || !team || !password) {
      return reply.status(400).send({ error: 'Missing fields' });
    }

    try {
      await createUser(name, username, team, password);
      return reply.status(201).send({ message: 'User created' });
    } catch (err) {
      console.error('Error:', err);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  fastify.get('/users', async (_request, reply) => {
    const users = await getAllUsers();
    return reply.send(users);
  });

  fastify.delete('/users/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      await deleteUser(Number(id));
      return reply.send({ message: `User ${id} deleted` });
    } catch (err) {
      console.error('Delete error:', err);
      return reply.status(500).send({ error: 'Failed to delete user' });
    }
  });

  // Login route
  fastify.post('/login', async (request, reply) => {
    const { username, password } = request.body as {
      username: string;
      password: string;
    };

    if (!username || !password) {
      return reply.status(400).send({ error: 'Username and password are required' });
    }

    try {
      const user = await loginUser(username, password);
      if (!user) {
        return reply.status(401).send({ error: 'Invalid username or password' });
      }

      return reply.status(200).send({ 
        message: 'Login successful', 
        user: { 
          id: user.id, 
          name: user.name, 
          username: user.username, 
          team: user.team 
        } 
      });
    } catch (err) {
      console.error('Login error:', err);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
}
