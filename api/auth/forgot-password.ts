import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'El email es requerido'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email inválido'
      });
    }

    // AQUÍ ESTÁ LA CORRECCIÓN - Agrega /reset-password a la URL
    const redirectUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://marcos-arce-garrido-elite-performan.vercel.app'}/reset-password`;

    const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (error) {
      console.error('Error al enviar email de recuperación:', error);
      return res.status(200).json({
        success: true,
        message: 'Si el email existe en nuestro sistema, recibirás un enlace de recuperación'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Si el email existe en nuestro sistema, recibirás un enlace de recuperación'
    });

  } catch (error) {
    console.error('Error en forgot-password:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}