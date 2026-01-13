import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '../../src/lib/supabase';
import { verifyToken, extractTokenFromHeader } from '../../src/lib/jwt';
import type { UserProfile } from '../../src/types/auth';

interface MeResponse {
  success: boolean;
  user?: UserProfile;
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MeResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const token = extractTokenFromHeader(req.headers.authorization);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado'
      });
    }

    const payload = verifyToken(token);

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido o expirado'
      });
    }

    const { data: profile, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', payload.userId)
      .single();

    if (error || !profile) {
      console.error('Error al obtener usuario:', error);
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      user: profile
    });

  } catch (error) {
    console.error('Error en /me:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}