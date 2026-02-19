import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

interface ForgotPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

const ForgotPassword = ({ isOpen, onClose, onBackToLogin }: ForgotPasswordProps) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || 'Error al enviar el email');
      }
    } catch (err) {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-700"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-primary/20 to-purple-600/20 p-8 border-b border-slate-700">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-3xl font-bold text-white mb-2">
                ¿Olvidaste tu contraseña?
              </h2>
              <p className="text-slate-300 text-sm">
                Te enviaremos un enlace para resetearla
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-4"
                >
                  <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-green-400" size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">
                      ¡Email enviado!
                    </h3>
                    <p className="text-slate-300 text-sm">
                      Si el email existe en nuestro sistema, recibirás un enlace para resetear tu contraseña.
                    </p>
                    <p className="text-slate-400 text-xs mt-4">
                      Revisa tu bandeja de entrada y spam
                    </p>
                  </div>
                  <button
                    onClick={onBackToLogin}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 mt-6"
                  >
                    <ArrowLeft size={20} />
                    Volver al login
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 text-sm"
                    >
                      <AlertCircle size={18} />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="forgot-email" className="text-sm font-medium text-slate-300">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        id="forgot-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        required
                        className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Enviando...' : 'Enviar enlace de recuperación'}
                  </button>

                  {/* Back to Login */}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={onBackToLogin}
                      className="text-slate-400 hover:text-primary text-sm transition-colors inline-flex items-center gap-2"
                    >
                      <ArrowLeft size={16} />
                      Volver al login
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ForgotPassword;