import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '../src/lib/supabase';
import { generateToken } from '../src/lib/jwt';
import type { AuthResponse, LoginRequest } from '../src/types/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const { email, password }: LoginRequest = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y password son requeridos'
      });
    }

    // Autenticar con Supabase
    const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password
    });

    if (authError || !authData.user) {
      console.error('Error en login:', authError);
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Verificar que el perfil exista
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !profile) {
      console.error('Error al obtener profile:', profileError);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener datos del usuario'
      });
    }

    // Generar JWT
    const token = generateToken({
      userId: authData.user.id,
      email: authData.user.email!
    });

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: authData.user.id,
        email: authData.user.email!
      },
      message: 'Login exitoso'
    });

  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}