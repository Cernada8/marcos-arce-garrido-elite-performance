import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken, extractTokenFromHeader } from './jwt';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    userId: string;
    email: string;
  };
}

export const withAuth = (
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>
) => {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      const token = extractTokenFromHeader(req.headers.authorization);

      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'No autorizado - Token no proporcionado'
        });
      }

      const payload = verifyToken(token);

      if (!payload) {
        return res.status(401).json({
          success: false,
          message: 'No autorizado - Token inválido'
        });
      }

      req.user = {
        userId: payload.userId,
        email: payload.email
      };

      return handler(req, res);
    } catch (error) {
      console.error('Error en middleware de autenticación:', error);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  };
};