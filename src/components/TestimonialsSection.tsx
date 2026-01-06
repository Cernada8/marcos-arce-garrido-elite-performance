import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Carlos Martínez',
    role: 'Atleta Amateur',
    content: 'Marcos me ayudó a prepararme para mi primera competición de MMA. Su conocimiento técnico y su capacidad para motivar son excepcionales. Conseguí resultados que nunca imaginé.',
    rating: 5,
  },
  {
    name: 'Laura Sánchez',
    role: 'Empresaria',
    content: 'Buscaba un entrenador que entendiera mi falta de tiempo. Marcos diseñó un programa eficiente que se adapta a mi agenda. He perdido 15kg y me siento con más energía que nunca.',
    rating: 5,
  },
  {
    name: 'Miguel Fernández',
    role: 'Profesional de IT',
    content: 'El enfoque integral de Marcos marcó la diferencia. No solo entreno mejor, también como mejor y duermo mejor. Es una transformación completa de estilo de vida.',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonios" className="section-dark relative overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-primary font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Testimonios
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title text-hero-foreground mb-6"
          >
            Lo que dicen mis clientes
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-hero-foreground/60 text-lg"
          >
            Historias reales de personas que han transformado su vida con mi metodología.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="testimonial-card relative"
              itemScope
              itemType="https://schema.org/Review"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-foreground/80 mb-6 leading-relaxed relative z-10" itemProp="reviewBody">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4" itemProp="author" itemScope itemType="https://schema.org/Person">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <span className="font-display text-lg text-primary-foreground">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground" itemProp="name">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
