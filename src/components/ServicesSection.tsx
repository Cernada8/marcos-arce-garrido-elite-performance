import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Apple, Dumbbell, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Apple,
    title: 'Dietas Personalizadas',
    description: 'Planes nutricionales adaptados a tus objetivos: pérdida de grasa, ganancia muscular o rendimiento deportivo. Diseñados específicamente para ti.',
    href: '/dietas',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
  },
  {
    icon: Dumbbell,
    title: 'Rutinas de Entrenamiento',
    description: 'Programas de entrenamiento personalizados para todos los niveles. Desde principiantes hasta atletas de competición.',
    href: '/rutinas',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
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
            Elige tu camino hacia el éxito
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-hero-foreground/60 text-lg"
          >
            Programas diseñados para potenciar tu rendimiento físico, 
            adaptados a tus objetivos personales.
          </motion.p>
        </div>

        {/* Services Grid - 2 Large Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
            >
              <Link 
                to={service.href}
                className="group block relative h-[450px] rounded-3xl overflow-hidden"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-hero via-hero/60 to-transparent" />
                
                {/* Red glow on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
                
                {/* Border */}
                <div className="absolute inset-0 rounded-3xl border border-hero-foreground/10 group-hover:border-primary/50 transition-colors duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    
                    <h3 className="font-display text-4xl md:text-5xl text-hero-foreground mb-4">
                      {service.title}
                    </h3>
                    
                    <p className="text-hero-foreground/70 text-lg mb-6 max-w-md">
                      {service.description}
                    </p>
                    
                    <div className="inline-flex items-center gap-3 text-primary font-semibold group/cta">
                      <span>Ver planes</span>
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover/cta:bg-primary/30 transition-all">
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
