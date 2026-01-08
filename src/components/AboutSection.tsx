import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Award, Target, Users, Flame } from 'lucide-react';
import marcosImage from '../assets/Marcos-pic.jpeg';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  const highlights = [
    { icon: Award, label: 'Certificaciones Internacionales' },
    { icon: Target, label: 'Enfoque en Resultados' },
    { icon: Users, label: 'Atención Personalizada' },
    { icon: Flame, label: 'Metodología Propia' },
  ];

  return (
    <section id="sobre-mi" className="section-dark" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image/Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative cursor-pointer">
              {/* Gradient overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10"
                animate={{
                  opacity: isHovered ? 0.5 : 1
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Image container */}
              <motion.div 
                className="w-full h-full relative overflow-hidden"
                animate={{
                  scale: isHovered ? 1.05 : 1
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <img 
                  src={marcosImage} 
                  alt="Marcos Arce Garrido - Entrenador Personal"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>

              {/* Hover border effect */}
              <motion.div
                className="absolute inset-0 border-4 border-primary rounded-2xl pointer-events-none"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0.95
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Corner accent on hover */}
              <motion.div
                className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-primary rounded-tr-2xl pointer-events-none"
                initial={{ opacity: 0, x: -10, y: 10 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  x: isHovered ? 0 : -10,
                  y: isHovered ? 0 : 10
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-primary rounded-bl-2xl pointer-events-none"
                initial={{ opacity: 0, x: 10, y: -10 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  x: isHovered ? 0 : 10,
                  y: isHovered ? 0 : -10
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Floating accents */}
            <motion.div 
              className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-2xl -z-10"
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0
              }}
              transition={{ duration: 0.4 }}
            />
            <motion.div 
              className="absolute -top-6 -left-6 w-32 h-32 border-2 border-primary/30 rounded-2xl -z-10"
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? -5 : 0
              }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              Sobre Mí
            </p>
            
            <h2 className="section-title text-hero-foreground mb-6">
              Más de una década formando campeones
            </h2>
            
            <div className="space-y-4 text-hero-foreground/70 mb-8">
              <p>
                Soy <strong className="text-hero-foreground">Marcos Arce Garrido</strong>, 
                entrenador personal especializado en artes marciales, preparación física de alto 
                rendimiento y nutrición deportiva. Mi pasión es ayudar a personas como tú a 
                superar sus límites.
              </p>
              <p>
                Con más de 10 años de experiencia, he desarrollado un método integral que combina 
                técnicas de combate, entrenamiento funcional y planes nutricionales personalizados 
                para lograr transformaciones reales y duraderas.
              </p>
              <p>
                Ya sea que busques mejorar tu condición física, aprender defensa personal, o 
                competir a nivel profesional, diseño programas adaptados a tus objetivos y 
                nivel actual.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50"
                >
                  <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-hero-foreground/80">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;