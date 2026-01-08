import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '../src/lib/supabase';
import { generateToken } from '../src/lib/jwt';
import type { AuthResponse, RegisterRequest } from '../src/types/auth';

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
    const { email, password }: RegisterRequest = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y password son requeridos'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña debe tener al menos 6 caracteres'
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email inválido'
      });
    }

    // Registrar usuario en Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (authError) {
      console.error('Error al crear usuario:', authError);
      
      if (authError.message.includes('already registered')) {
        return res.status(409).json({
          success: false,
          message: 'Este email ya está registrado'
        });
      }

      return res.status(400).json({
        success: false,
        message: authError.message
      });
    }

    if (!authData.user) {
      return res.status(500).json({
        success: false,
        message: 'Error al crear usuario'
      });
    }

    // Verificar que se haya creado el profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      console.error('Error al verificar profile:', profileError);
    }

    // Generar JWT
    const token = generateToken({
      userId: authData.user.id,
      email: authData.user.email!
    });

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: authData.user.id,
        email: authData.user.email!
      },
      message: 'Usuario registrado exitosamente'
    });

  } catch (error) {
    console.error('Error en register:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}