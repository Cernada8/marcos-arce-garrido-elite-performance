import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    
    const hash = window.location.hash;
    const hashParams = new URLSearchParams(hash.substring(1));
    const accessToken = hashParams.get('access_token');
    
    const finalToken = tokenFromUrl || accessToken;
    
    if (finalToken) {
      setToken(finalToken);
      setTokenValid(true);
    } else {
      setTokenValid(false);
      setError('Token de recuperación no encontrado. Por favor solicita un nuevo enlace.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!token) {
      setError('Token no válido. Por favor solicita un nuevo enlace.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('¡Contraseña actualizada exitosamente! Redirigiendo...');
        setNewPassword('');
        setConfirmPassword('');
        
        setTimeout(() => {
          window.location.href = '/inicio';
        }, 2000);
      } else {
        setError(data.message || 'Error al actualizar la contraseña');
      }
    } catch (err) {
      setError('Error de conexión. Por favor intenta de nuevo.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (tokenValid === null) {
    return (
      <div className="min-h-screen bg-hero flex items-center justify-center px-4">
        <div className="text-hero-foreground">Verificando token...</div>
      </div>
    );
  }

  if (tokenValid === false) {
    return (
      <div className="min-h-screen bg-hero flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-secondary/50 backdrop-blur-lg rounded-2xl p-8 border border-hero-foreground/10"
        >
          <div className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-display text-hero-foreground mb-4">
              Token Inválido
            </h2>
            <p className="text-hero-foreground/70 mb-6">
              {error}
            </p>
            <a href="/inicio" className="btn-primary inline-block">
              Volver al Inicio
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center px-4 py-12">
      <div className="hero-glow -top-48 -left-48 animate-pulse-glow fixed" />
      <div className="hero-glow -bottom-48 -right-48 animate-pulse-glow animation-delay-200 fixed" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-secondary/50 backdrop-blur-lg rounded-2xl p-8 border border-hero-foreground/10 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-display text-hero-foreground mb-2">
            Nueva Contraseña
          </h2>
          <p className="text-hero-foreground/60">
            Ingresa tu nueva contraseña
          </p>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-green-500 text-sm">{message}</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3"
          >
            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-500 text-sm">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-hero-foreground/80 mb-2">
              Nueva Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-hero-foreground/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-hero/50 border border-hero-foreground/20 rounded-lg pl-12 pr-12 py-3 text-hero-foreground placeholder:text-hero-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="Mínimo 6 caracteres"
                required
                disabled={loading}
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-hero-foreground/40 hover:text-hero-foreground/80 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-hero-foreground/80 mb-2">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-hero-foreground/40" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-hero/50 border border-hero-foreground/20 rounded-lg pl-12 pr-12 py-3 text-hero-foreground placeholder:text-hero-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="Repite la contraseña"
                required
                disabled={loading}
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-hero-foreground/40 hover:text-hero-foreground/80 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Actualizando...' : 'Cambiar Contraseña'}
          </button>

          <div className="text-center">
            <a href="/inicio" className="text-sm text-hero-foreground/60 hover:text-hero-foreground transition-colors">
              Volver al inicio
            </a>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;