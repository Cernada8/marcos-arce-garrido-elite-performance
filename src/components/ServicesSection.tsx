import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Swords, Dumbbell, Apple, Laptop, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Swords,
    title: 'Artes Marciales',
    description: 'Entrenamiento en disciplinas de combate como boxeo, kickboxing, MMA y defensa personal. Mejora tu técnica, agilidad y confianza.',
    features: ['Técnicas de combate', 'Defensa personal', 'Preparación competitiva'],
  },
  {
    icon: Dumbbell,
    title: 'Entrenamiento Físico',
    description: 'Programas de entrenamiento personalizados para ganar fuerza, resistencia y mejorar tu composición corporal de forma efectiva.',
    features: ['Fuerza y potencia', 'Acondicionamiento', 'Entrenamiento funcional'],
  },
  {
    icon: Apple,
    title: 'Nutrición y Dietas',
    description: 'Planes nutricionales adaptados a tus objetivos, ya sea pérdida de grasa, ganancia muscular o mejora del rendimiento deportivo.',
    features: ['Planes personalizados', 'Suplementación', 'Seguimiento continuo'],
  },
  {
    icon: Laptop,
    title: 'Entrenamiento Online',
    description: 'Entrena desde cualquier lugar con programas online, videollamadas en directo y seguimiento personalizado a distancia.',
    features: ['Programas digitales', 'Sesiones en vivo', 'Flexibilidad total'],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicios" className="section-dark relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-primary font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Servicios
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title text-hero-foreground mb-6"
          >
            Entrenamiento integral para resultados reales
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-hero-foreground/60 text-lg"
          >
            Programas diseñados para potenciar tu rendimiento físico y mental, 
            adaptados a tus objetivos personales.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="service-card group"
            >
              <div className="flex items-start gap-5">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-display text-2xl text-hero-foreground mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-hero-foreground/60 mb-5 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-hero-foreground/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <a 
                    href="#contacto" 
                    className="inline-flex items-center gap-2 text-primary font-medium text-sm group/link"
                  >
                    Más información
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
