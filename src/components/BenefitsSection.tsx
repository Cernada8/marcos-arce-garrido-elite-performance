import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Brain, HeartPulse, Shield, Zap, Users } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Mejora tu Rendimiento',
    description: 'Aumenta tu fuerza, velocidad y resistencia con entrenamientos científicamente diseñados.',
  },
  {
    icon: Brain,
    title: 'Disciplina Mental',
    description: 'Desarrolla fortaleza mental, concentración y autoconfianza que trascienden el gimnasio.',
  },
  {
    icon: HeartPulse,
    title: 'Transformación Saludable',
    description: 'Cambia tu composición corporal de forma sostenible, sin dietas extremas ni atajos.',
  },
  {
    icon: Shield,
    title: 'Defensa Personal',
    description: 'Aprende a protegerte y ganar confianza en cualquier situación del día a día.',
  },
  {
    icon: Zap,
    title: 'Más Energía',
    description: 'Siente un aumento significativo en tu vitalidad y energía para afrontar cada día.',
  },
  {
    icon: Users,
    title: 'Comunidad',
    description: 'Forma parte de un grupo de personas comprometidas con su mejora personal.',
  },
];

const BenefitsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="beneficios" className="section-light" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-primary font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Beneficios
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title text-foreground mb-6"
          >
            Resultados que transforman tu vida
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Más allá del físico, mi metodología integral impacta todas las áreas de tu vida.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="font-display text-2xl text-foreground mb-3">
                {benefit.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
