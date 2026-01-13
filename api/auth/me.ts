import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

interface UserProfile {
  id: string;
  email: string;
  created_at?: string;
  updated_at?: string;
  full_name?: string;
  avatar_url?: string;
}

interface MeResponse {
  success: boolean;
  user?: UserProfile;
  message?: string;
}

// Inicializar Supabase Admin
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Extraer token del header Authorization
const extractTokenFromHeader = (authHeader?: string): string | null => {
  if (!authHeader) return null;
  
  // Formato: "Bearer TOKEN"
  const parts = authHeader.split(' ');
  if (parts.length === 2 && parts[0] === 'Bearer') {
    return parts[1];
  }
  
  return null;
};

// Verificar token JWT
const verifyToken = (token: string): { userId: string; email: string } | null => {
  try {
    const jwtSecret = process.env.JWT_SECRET || 'tu-secret-super-seguro-cambiar';
    const payload = jwt.verify(token, jwtSecret) as { userId: string; email: string };
    return payload;
  } catch (error) {
    console.error('Error al verificar token:', error);
    return null;
  }
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const token = extractTokenFromHeader(req.headers.authorization as string);

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
      user: profile as UserProfile
    });

  } catch (error) {
    console.error('Error en /me:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}