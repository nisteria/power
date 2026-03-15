// Auth Middleware - JWT Protection
import { FastifyRequest, FastifyReply } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      customerId: string;
      email: string;
    };
  }
}

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Check for Authorization header
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.code(401).send({
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authorization header required',
        },
      });
    }
    
    // Verify token
    const token = authHeader.substring(7);
    const decoded = await request.server.jwt.verify(token);
    
    // Attach user to request
    request.user = {
      customerId: decoded.customerId,
      email: decoded.email,
    };
    
  } catch (error) {
    return reply.code(401).send({
      error: {
        code: 'UNAUTHORIZED',
        message: 'Invalid or expired token',
      },
    });
  }
}

// Optional auth - doesn't fail if no token
export async function optionalAuthMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = await request.server.jwt.verify(token);
      
      request.user = {
        customerId: decoded.customerId,
        email: decoded.email,
      };
    }
  } catch {
    // Ignore errors for optional auth
  }
}

// Role-based access control
export function requireRole(...roles: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.user) {
      return reply.code(401).send({
        error: { code: 'UNAUTHORIZED', message: 'Authentication required' },
      });
    }
    
    // For now, all authenticated users have full access
    // In production: check user roles from database
  };
}

// Rate limiting by customer
export async function customerRateLimit(request: FastifyRequest, reply: FastifyReply) {
  const customerId = request.user?.customerId || request.ip;
  
  // In production: implement with Redis
  // const key = `rate:${customerId}`;
  // const count = await redis.incr(key);
  // if (count > limit) return reply.code(429).send({ error: 'Rate limit exceeded' });
}
