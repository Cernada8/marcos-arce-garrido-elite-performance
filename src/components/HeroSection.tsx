import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  return (
    <section className="hero-section" id="inicio">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-hero via-hero/80 to-hero/40" />
      <div className="hero-overlay" />
      
      {/* Red glow effect */}
      <div className="hero-glow -top-48 -left-48 animate-pulse-glow" />
      <div className="hero-glow -bottom-48 -right-48 animate-pulse-glow animation-delay-200" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-primary font-semibold text-sm md:text-base uppercase tracking-widest mb-6"
          >
            Entrenador Personal de Alto Rendimiento
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="display-title text-hero-foreground mb-6 leading-none"
          >
            Transforma tu cuerpo y mente con{' '}
            <span className="text-primary">Marcos Arce Garrido</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-hero-foreground/70 max-w-2xl mb-10 leading-relaxed"
          >
            Especialista en artes marciales, entrenamiento físico personalizado y planes de nutrición. 
            Alcanza tu máximo potencial con un método probado y resultados reales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#contacto" className="btn-primary">
              Empieza Hoy
            </a>
            <a href="#servicios" className="btn-outline">
              Ver Servicios
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-hero-foreground/10"
          >
            {[
              { number: '10+', label: 'Años de Experiencia' },
              { number: '500+', label: 'Clientes Satisfechos' },
              { number: '100%', label: 'Compromiso' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl md:text-4xl text-primary">{stat.number}</p>
                <p className="text-sm text-hero-foreground/60">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#sobre-mi" className="flex flex-col items-center gap-2 text-hero-foreground/50 hover:text-primary transition-colors">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
