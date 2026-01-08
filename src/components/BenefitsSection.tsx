import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { TrendingUp, Brain, HeartPulse, Shield, Zap, Users } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Mejora tu Rendimiento',
    description: 'Aumenta tu fuerza, velocidad y resistencia con entrenamientos científicamente diseñados.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: Brain,
    title: 'Disciplina Mental',
    description: 'Desarrolla fortaleza mental, concentración y autoconfianza que trascienden el gimnasio.',
    color: 'from-purple-500 to-pink-600',
  },
  {
    icon: HeartPulse,
    title: 'Transformación Saludable',
    description: 'Cambia tu composición corporal de forma sostenible, sin dietas extremas ni atajos.',
    color: 'from-red-500 to-rose-600',
  },
  {
    icon: Shield,
    title: 'Defensa Personal',
    description: 'Aprende a protegerte y ganar confianza en cualquier situación del día a día.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Zap,
    title: 'Más Energía',
    description: 'Siente un aumento significativo en tu vitalidad y energía para afrontar cada día.',
    color: 'from-yellow-500 to-amber-600',
  },
  {
    icon: Users,
    title: 'Comunidad',
    description: 'Forma parte de un grupo de personas comprometidas con su mejora personal.',
    color: 'from-green-500 to-emerald-600',
  },
];

const BenefitsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="beneficios" className="section-light relative overflow-hidden" ref={ref}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
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
            <BenefitCard key={benefit.title} benefit={benefit} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BenefitCard = ({ benefit, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      {/* Glow effect on hover */}
      <motion.div
        className={`absolute -inset-0.5 bg-gradient-to-r ${benefit.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main card */}
      <motion.div
        className="relative p-8 rounded-2xl bg-card border border-border overflow-hidden"
        animate={{
          y: isHovered ? -8 : 0,
          borderColor: isHovered ? 'rgba(var(--primary), 0.3)' : 'rgba(var(--border), 1)',
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Animated background gradient on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0`}
          animate={{
            opacity: isHovered ? 0.05 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
          animate={{
            x: isHovered ? ['-100%', '200%'] : '-100%',
            opacity: isHovered ? [0, 0.1, 0] : 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        />

        {/* Icon container */}
        <motion.div
          className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 overflow-hidden`}
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? [0, -5, 5, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          {/* Icon background pulse */}
          <motion.div
            className="absolute inset-0 bg-white"
            animate={{
              scale: isHovered ? [1, 1.5] : 1,
              opacity: isHovered ? [0.3, 0] : 0.3,
            }}
            transition={{
              duration: 0.6,
              repeat: isHovered ? Infinity : 0,
            }}
          />
          
          <motion.div
            animate={{
              y: isHovered ? [0, -3, 0] : 0,
            }}
            transition={{
              duration: 0.6,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <benefit.icon className="w-7 h-7 text-white relative z-10" />
          </motion.div>
        </motion.div>
        
        {/* Title */}
        <motion.h3
          className="relative font-display text-2xl text-foreground mb-3"
          animate={{
            x: isHovered ? 4 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {benefit.title}
        </motion.h3>
        
        {/* Description */}
        <motion.p
          className="relative text-muted-foreground leading-relaxed"
          animate={{
            x: isHovered ? 4 : 0,
          }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          {benefit.description}
        </motion.p>

        {/* Decorative corner elements */}
        <motion.div
          className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary/0 rounded-tr-2xl"
          animate={{
            borderColor: isHovered ? 'rgba(var(--primary), 0.3)' : 'rgba(var(--primary), 0)',
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary/0 rounded-bl-2xl"
          animate={{
            borderColor: isHovered ? 'rgba(var(--primary), 0.3)' : 'rgba(var(--primary), 0)',
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating particles effect */}
        {isHovered && (
          <>
            <motion.div
              className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${benefit.color}`}
              initial={{ x: '20%', y: '80%', opacity: 0 }}
              animate={{
                x: ['20%', '80%'],
                y: ['80%', '20%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${benefit.color}`}
              initial={{ x: '80%', y: '20%', opacity: 0 }}
              animate={{
                x: ['80%', '20%'],
                y: ['20%', '80%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BenefitsSection;