import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contacto" className="section-light relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              ¿Listo para empezar?
            </p>
            
            <h2 className="section-title text-foreground mb-6">
              Tu transformación comienza con una decisión
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              No esperes al lunes. No esperes al año nuevo. El momento perfecto es ahora. 
              Reserva tu primera sesión y descubre cómo puedo ayudarte a alcanzar tus objetivos.
            </p>
            
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Teléfono</p>
                  <p className="font-semibold text-foreground">+34 600 123 456</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold text-foreground">marcosarcegarrido@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ubicación</p>
                  <p className="font-semibold text-foreground">Madrid, España</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="p-8 md:p-12 rounded-3xl bg-hero text-hero-foreground relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <h3 className="font-display text-3xl md:text-4xl mb-4">
                  Primera sesión <span className="text-primary">GRATIS</span>
                </h3>
                
                <p className="text-hero-foreground/70 mb-8">
                  Evaluación inicial completa sin compromiso. Analizamos tus objetivos 
                  y diseñamos un plan a tu medida.
                </p>
                
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full px-6 py-4 rounded-xl bg-secondary/50 border border-hero-foreground/10 text-hero-foreground placeholder:text-hero-foreground/40 focus:outline-none focus:border-primary transition-colors"
                  />
                  
                  <input
                    type="email"
                    placeholder="Tu email"
                    className="w-full px-6 py-4 rounded-xl bg-secondary/50 border border-hero-foreground/10 text-hero-foreground placeholder:text-hero-foreground/40 focus:outline-none focus:border-primary transition-colors"
                  />
                  
                  <input
                    type="tel"
                    placeholder="Tu teléfono"
                    className="w-full px-6 py-4 rounded-xl bg-secondary/50 border border-hero-foreground/10 text-hero-foreground placeholder:text-hero-foreground/40 focus:outline-none focus:border-primary transition-colors"
                  />
                  
                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center gap-2 group"
                  >
                    Reservar Mi Sesión Gratis
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
                
                <p className="text-xs text-hero-foreground/50 mt-4 text-center">
                  Sin compromiso. Respuesta en menos de 24h.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
